import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { X, Send, MessageCircle, Wifi, WifiOff } from 'lucide-react';
import { LangId, FeedbackEntry } from '../types';
import {
  db, collection, addDoc, onSnapshot,
  query, orderBy, serverTimestamp,
  isFirebaseConfigured, Timestamp,
} from '../firebase';

// ── 언어별 스타일 ────────────────────────────────────────────
const LANG_META: Record<LangId, { flag: string; label: string; bg: string; badge: string }> = {
  ko: { flag: '🇰🇷', label: '한국어',      bg: 'bg-slate-50 border-slate-100',   badge: 'bg-slate-200 text-slate-700'   },
  en: { flag: '🇺🇸', label: 'English',     bg: 'bg-sky-50 border-sky-100',       badge: 'bg-sky-200 text-sky-800'       },
  zh: { flag: '🇨🇳', label: '中文',         bg: 'bg-red-50 border-red-100',       badge: 'bg-red-200 text-red-800'       },
  ja: { flag: '🇯🇵', label: '日本語',       bg: 'bg-pink-50 border-pink-100',     badge: 'bg-pink-200 text-pink-800'     },
  vi: { flag: '🇻🇳', label: 'Tiếng Việt',  bg: 'bg-emerald-50 border-emerald-100', badge: 'bg-emerald-200 text-emerald-800' },
};

// ── 입력창 플레이스홀더 ──────────────────────────────────────
const PLACEHOLDER: Record<LangId, string> = {
  ko: '서비스 이용 후 느낀 점을 자유롭게 적어주세요.',
  en: 'Share your experience with this service.',
  zh: '请分享您使用本服务的感受。',
  ja: 'サービスをご利用いただいた感想を自由にお書きください。',
  vi: 'Chia sẻ cảm nhận của bạn về dịch vụ này.',
};

// ── 시간 포매터 ──────────────────────────────────────────────
function timeAgo(date: Date | null): string {
  if (!date) return '방금 전';
  const diffMs  = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr  = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);
  if (diffMin < 1)  return '방금 전';
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHr  < 24) return `${diffHr}시간 전`;
  if (diffDay < 30) return `${diffDay}일 전`;
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

// ── 스켈레톤 ────────────────────────────────────────────────
const SkeletonMessage: React.FC<{ wide?: boolean }> = ({ wide }) => (
  <div className="flex flex-col gap-2 p-4 rounded-3xl border bg-slate-50 border-slate-100">
    <div className={`h-3 skeleton rounded-full ${wide ? 'w-20' : 'w-16'}`} />
    <div className="h-3.5 skeleton rounded-full w-full" />
    <div className="h-3.5 skeleton rounded-full w-4/5" />
    <div className="h-2.5 skeleton rounded-full w-12 self-end" />
  </div>
);

// ── 미설정 안내 ──────────────────────────────────────────────
const NotConfiguredBanner: React.FC = () => (
  <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 text-center gap-4">
    <div className="w-16 h-16 bg-amber-50 rounded-3xl flex items-center justify-center">
      <WifiOff size={28} className="text-amber-400" />
    </div>
    <div>
      <p className="font-black text-gusring-text text-base mb-1">Firebase 연결 필요</p>
      <p className="text-gusring-text-sub text-sm leading-relaxed">
        <code className="bg-gusring-bg px-1.5 py-0.5 rounded-lg text-xs font-mono">src/firebase.ts</code>에<br />
        Firebase 설정값을 입력하면 실시간 피드백 스레드가 활성화돼요.
      </p>
    </div>
    <div className="bg-gusring-bg rounded-2xl px-4 py-3 text-left w-full">
      <p className="text-[11px] font-black text-gusring-text-sub uppercase tracking-widest mb-2">설정 순서</p>
      {['firebase.google.com 접속', '새 프로젝트 만들기', 'Firestore 데이터베이스 생성', 'npm install firebase', 'firebase.ts 에 config 입력'].map((step, i) => (
        <div key={i} className="flex items-start gap-2.5 py-1">
          <div className="w-5 h-5 bg-gusring-yellow rounded-full flex items-center justify-center text-[10px] font-black text-amber-900 shrink-0 mt-0.5">
            {i + 1}
          </div>
          <p className="text-[12px] font-medium text-gusring-text-sub">{step}</p>
        </div>
      ))}
    </div>
  </div>
);

// ── 메인 컴포넌트 ────────────────────────────────────────────
interface Props {
  lang: LangId;
  onClose: () => void;
}

const FeedbackThread: React.FC<Props> = ({ lang, onClose }) => {
  const [entries,  setEntries]  = useState<FeedbackEntry[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [text,     setText]     = useState('');
  const [sending,  setSending]  = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);
  const listRef                 = useRef<HTMLDivElement>(null);
  const MAX = 200;

  // ── Firestore 실시간 구독 ─────────────────────────────────
  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'feedback'),
      orderBy('createdAt', 'asc'),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unsub = onSnapshot(q, (snapshot: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const docs: FeedbackEntry[] = snapshot.docs.map((doc: any) => {
        const data = doc.data();
        const ts   = data.createdAt as Timestamp | null;
        return {
          id:        doc.id,
          lang:      data.lang as LangId,
          text:      data.text as string,
          createdAt: ts ? ts.toDate() : null,
        };
      });
      setEntries(docs);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // ── 새 메시지 도착 시 스크롤 하단 유지 ───────────────────
  const isAtBottom = useCallback(() => {
    const el = listRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 60;
  }, []);

  useEffect(() => {
    if (isAtBottom()) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [entries, isAtBottom]);

  // ── 전송 ─────────────────────────────────────────────────
  const handleSend = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed || sending || !db) return;
    setSending(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        lang,
        text:      trimmed,
        createdAt: serverTimestamp(),
      });
      setText('');
    } catch (err) {
      console.error('피드백 전송 오류:', err);
    } finally {
      setSending(false);
    }
  }, [text, sending, lang]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSend();
  };

  // ── 언어별 날짜 그루핑 (날짜 구분선) ─────────────────────
  const renderDateDivider = (entry: FeedbackEntry, prev: FeedbackEntry | null) => {
    if (!entry.createdAt) return null;
    const day  = entry.createdAt.toDateString();
    const prev_day = prev?.createdAt?.toDateString();
    if (day === prev_day) return null;
    const label = (() => {
      const diffDay = Math.floor((Date.now() - entry.createdAt.getTime()) / 86400000);
      if (diffDay === 0) return '오늘';
      if (diffDay === 1) return '어제';
      return `${entry.createdAt.getMonth() + 1}월 ${entry.createdAt.getDate()}일`;
    })();
    return (
      <div key={`div-${entry.id}`} className="flex items-center gap-3 my-2">
        <div className="flex-1 h-px bg-gusring-border" />
        <span className="text-[10px] font-bold text-gusring-text-hint">{label}</span>
        <div className="flex-1 h-px bg-gusring-border" />
      </div>
    );
  };

  const meta = LANG_META[lang];

  return (
    /* 딤 배경 */
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* 패널 */}
      <div
        className="relative w-full sm:max-w-md sm:mx-auto bg-gusring-surface rounded-t-5xl flex flex-col animate-slide-up shadow-card-lg"
        style={{ maxHeight: '90dvh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* 드래그 핸들 */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="drag-handle" />
        </div>

        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gusring-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gusring-yellow rounded-2xl flex items-center justify-center">
              <MessageCircle size={18} className="text-amber-900" />
            </div>
            <div>
              <h2 className="font-black text-gusring-text text-base leading-tight">피드백</h2>
              <p className="text-[11px] text-gusring-text-hint font-medium">
                {loading ? '불러오는 중...' : `${entries.length}개의 메시지`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Firebase 연결 상태 */}
            <div className={`flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-bold ${isFirebaseConfigured ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
              {isFirebaseConfigured
                ? <><Wifi size={11} /> 연결됨</>
                : <><WifiOff size={11} /> 미연결</>
              }
            </div>
            <button
              className="btn-press w-8 h-8 rounded-full bg-gusring-bg flex items-center justify-center text-gusring-text-sub"
              onClick={onClose}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* 메시지 목록 */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3 overscroll-contain"
          style={{ minHeight: 0 }}
        >
          {/* Firebase 미설정 */}
          {!isFirebaseConfigured && <NotConfiguredBanner />}

          {/* 로딩 스켈레톤 */}
          {isFirebaseConfigured && loading && (
            <div className="space-y-3">
              <SkeletonMessage />
              <SkeletonMessage wide />
              <SkeletonMessage />
            </div>
          )}

          {/* 빈 상태 */}
          {isFirebaseConfigured && !loading && entries.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
              <div className="text-5xl">💬</div>
              <p className="font-black text-gusring-text text-base">첫 번째 메시지를 남겨보세요</p>
              <p className="text-gusring-text-sub text-sm">
                여러분의 솔직한 피드백이<br />서비스 개선에 큰 힘이 돼요.
              </p>
            </div>
          )}

          {/* 메시지 스레드 */}
          {isFirebaseConfigured && !loading && entries.map((entry, idx) => {
            const m    = LANG_META[entry.lang] ?? LANG_META.ko;
            const prev = idx > 0 ? entries[idx - 1] : null;
            return (
              <React.Fragment key={entry.id}>
                {renderDateDivider(entry, prev)}
                <div className={`flex flex-col gap-1.5 p-4 rounded-3xl border ${m.bg} animate-slide-up`}
                  style={{ animationDelay: `${Math.min(idx * 30, 300)}ms` }}
                >
                  {/* 언어 뱃지 */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{m.flag}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${m.badge}`}>
                      {m.label}
                    </span>
                  </div>
                  {/* 메시지 본문 */}
                  <p className="text-gusring-text text-[14px] leading-relaxed font-medium">
                    {entry.text}
                  </p>
                  {/* 시간 */}
                  <p className="text-gusring-text-hint text-[11px] font-medium self-end">
                    {timeAgo(entry.createdAt)}
                  </p>
                </div>
              </React.Fragment>
            );
          })}

          <div ref={bottomRef} />
        </div>

        {/* 입력 영역 */}
        {isFirebaseConfigured && (
          <div className="border-t border-gusring-border px-4 py-4 safe-bottom space-y-2">
            {/* 현재 언어 표시 */}
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{meta.flag}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${meta.badge}`}>
                {meta.label}로 작성 중
              </span>
            </div>

            {/* 텍스트 입력 + 전송 */}
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <textarea
                  className="toss-input resize-none py-3 pr-4 leading-relaxed text-sm"
                  style={{ minHeight: 48, maxHeight: 120 }}
                  rows={2}
                  placeholder={PLACEHOLDER[lang]}
                  value={text}
                  maxLength={MAX}
                  onChange={e => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <span
                  className={`absolute bottom-2 right-3 text-[10px] font-bold
                    ${text.length > MAX * 0.85 ? 'text-amber-500' : 'text-gusring-text-hint'}`}
                >
                  {text.length}/{MAX}
                </span>
              </div>

              <button
                className={`btn-press shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all
                  ${text.trim() && !sending
                    ? 'bg-gusring-yellow text-amber-900 shadow-yellow-sm'
                    : 'bg-gusring-bg text-gusring-text-hint'
                  }`}
                disabled={!text.trim() || sending}
                onClick={handleSend}
              >
                {sending
                  ? <span className="w-4 h-4 border-2 border-amber-900/30 border-t-amber-900 rounded-full animate-spin" />
                  : <Send size={18} />
                }
              </button>
            </div>

            <p className="text-[10px] text-gusring-text-hint text-center font-medium">
              익명으로 전송됩니다 · Cmd+Enter로 전송
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackThread;
