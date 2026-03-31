import React, {
  useState, useRef, useCallback, useEffect,
} from 'react';
import { ZoomOut, Info, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { FormItem, I18nString } from '../types';
import FormMockPreview from './FormMockPreview';
import { hotspotsByCategory } from '../data/hotspots';

interface Props {
  form: FormItem;
  t: (obj: I18nString) => string;
}

// ── 유틸 ──────────────────────────────────────────────────────
const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

const getTouchDist = (t1: React.Touch, t2: React.Touch) => {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
};

// ── 컴포넌트 ─────────────────────────────────────────────────
const FormViewer: React.FC<Props> = ({ form, t }) => {
  const hotspots = hotspotsByCategory[form.cat] ?? [];

  // 줌 / 패닝 상태
  const [scale, setScale]         = useState(1);
  const [pan, setPan]             = useState({ x: 0, y: 0 });

  // 선택된 핫스팟
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // 핀치 제스처 refs
  const initDist  = useRef(0);
  const initScale = useRef(1);
  const initPan   = useRef({ x: 0, y: 0 });
  const lastPan   = useRef({ x: 0, y: 0 });
  const lastTap   = useRef(0);

  // 컨테이너 ref
  const containerRef = useRef<HTMLDivElement>(null);

  // 폼 바뀌면 초기화
  useEffect(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
    setActiveIdx(null);
  }, [form.id]);

  // ── 터치 핸들러 ─────────────────────────────────────────────
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      initDist.current  = getTouchDist(e.touches[0], e.touches[1]);
      initScale.current = scale;
      initPan.current   = { ...pan };
    } else if (e.touches.length === 1) {
      lastPan.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      // 더블탭 → 줌 토글
      const now = Date.now();
      if (now - lastTap.current < 280) {
        if (scale > 1.2) {
          setScale(1); setPan({ x: 0, y: 0 });
        } else {
          setScale(2.5);
        }
      }
      lastTap.current = now;
    }
  }, [scale, pan]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      const dist     = getTouchDist(e.touches[0], e.touches[1]);
      const newScale = clamp(initScale.current * (dist / initDist.current), 1, 4);
      setScale(newScale);
    } else if (e.touches.length === 1 && scale > 1.05) {
      const dx = e.touches[0].clientX - lastPan.current.x;
      const dy = e.touches[0].clientY - lastPan.current.y;
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      lastPan.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, [scale]);

  const handleTouchEnd = useCallback(() => {
    if (scale < 1.08) { setScale(1); setPan({ x: 0, y: 0 }); }
  }, [scale]);

  const resetZoom = () => { setScale(1); setPan({ x: 0, y: 0 }); };

  // ── 핫스팟 모달 ─────────────────────────────────────────────
  const goNext = () => setActiveIdx(i => i !== null ? (i + 1) % hotspots.length : 0);
  const goPrev = () => setActiveIdx(i => i !== null ? (i - 1 + hotspots.length) % hotspots.length : 0);

  const active = activeIdx !== null ? hotspots[activeIdx] : null;

  return (
    <div className="rounded-3xl overflow-hidden border border-gusring-border bg-white shadow-card">

      {/* ── 상단 힌트 바 ── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gusring-bg border-b border-gusring-border">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gusring-yellow rounded-full flex items-center justify-center">
            <Info size={11} className="text-amber-900" />
          </div>
          <span className="text-[11px] font-bold text-gusring-text-sub">
            {scale > 1.1
              ? '두 번 탭하면 원래 크기로'
              : '번호를 탭하면 작성 방법을 볼 수 있어요'}
          </span>
        </div>
        {scale > 1.1 && (
          <button
            onClick={resetZoom}
            className="btn-press flex items-center gap-1 px-2.5 py-1 bg-white rounded-xl text-[11px] font-bold text-amber-600 border border-amber-100"
          >
            <ZoomOut size={12} /> 초기화
          </button>
        )}
      </div>

      {/* ── 줌어블 서식 영역 ── */}
      <div
        ref={containerRef}
        className="relative overflow-hidden touch-none select-none cursor-grab active:cursor-grabbing"
        style={{ minHeight: 260 }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 서식 내용 (스케일 + 팬 적용) */}
        <div
          style={{
            transform: `scale(${scale}) translate(${pan.x / scale}px, ${pan.y / scale}px)`,
            transformOrigin: 'top center',
            transition: scale === 1 ? 'transform 0.32s cubic-bezier(0.34,1.2,0.64,1)' : 'none',
            willChange: 'transform',
          }}
        >
          <FormMockPreview form={form} t={t} />
        </div>

        {/* ── 핫스팟 뱃지 오버레이 ── */}
        {scale < 1.6 && hotspots.map((hs, idx) => (
          <button
            key={hs.id}
            className={`absolute z-10 w-7 h-7 rounded-full border-2 border-white
              flex items-center justify-center text-[11px] font-black
              shadow-yellow-sm btn-press transition-all duration-200
              ${activeIdx === idx
                ? 'bg-gusring-text text-white scale-110'
                : 'bg-gusring-yellow text-amber-900 hover:scale-110'
              }`}
            style={{
              left: `${hs.x}%`,
              top:  `${hs.y}%`,
              transform: `translate(-50%, -50%) scale(${activeIdx === idx ? 1.1 : 1})`,
              opacity: scale < 1.6 ? 1 : 0,
              transition: 'opacity 0.2s, background 0.15s, transform 0.15s',
            }}
            onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* ── 핫스팟 상세 패널 ── */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out`}
        style={{ maxHeight: active ? 280 : 0, opacity: active ? 1 : 0 }}
      >
        {active && (
          <div className="border-t border-gusring-border bg-white px-5 py-5">
            {/* 헤더 */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 bg-gusring-yellow rounded-full flex items-center justify-center text-sm font-black text-amber-900 shrink-0 shadow-yellow-sm">
                  {activeIdx! + 1}
                </div>
                <h4 className="font-black text-gusring-text text-[15px] leading-snug pt-0.5">
                  {t(active.title)}
                </h4>
              </div>
              <button
                className="btn-press w-7 h-7 rounded-full bg-gusring-bg flex items-center justify-center text-gusring-text-sub shrink-0"
                onClick={() => setActiveIdx(null)}
              >
                <X size={14} />
              </button>
            </div>

            {/* 설명 */}
            <p className="text-gusring-text-sub text-[13px] leading-relaxed font-medium pl-11 mb-4">
              {t(active.desc)}
            </p>

            {/* 이전/다음 네비게이션 */}
            {hotspots.length > 1 && (
              <div className="flex items-center justify-between pl-11">
                <button
                  className="btn-press flex items-center gap-1.5 px-3 py-2 bg-gusring-bg rounded-2xl text-[12px] font-bold text-gusring-text-sub"
                  onClick={goPrev}
                >
                  <ChevronLeft size={14} /> 이전 항목
                </button>
                <span className="text-[11px] font-bold text-gusring-text-hint">
                  {activeIdx! + 1} / {hotspots.length}
                </span>
                <button
                  className="btn-press flex items-center gap-1.5 px-3 py-2 bg-gusring-yellow rounded-2xl text-[12px] font-bold text-amber-900"
                  onClick={goNext}
                >
                  다음 항목 <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── 하단: 전체 보기 버튼 ── */}
      {!active && (
        <div className="flex items-center justify-center gap-1.5 py-3 bg-gusring-bg border-t border-gusring-border">
          {hotspots.map((_, idx) => (
            <button
              key={idx}
              className={`btn-press transition-all duration-200
                ${activeIdx === idx
                  ? 'w-6 h-2 bg-gusring-text rounded-full'
                  : 'w-2 h-2 bg-gusring-border-strong rounded-full hover:bg-gusring-yellow'
                }`}
              onClick={() => setActiveIdx(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FormViewer;
