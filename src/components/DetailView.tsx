import React, { useState, useRef } from 'react';
import { ChevronDown, Download, MessageCircle, Plus } from 'lucide-react';
import { categories } from '../data/categories';
import { UIStrings } from '../data/strings';
import { FormItem, I18nString, LangId } from '../types';
import FormViewer from './FormViewer';
import { trackFeedbackClick } from '../analytics';

interface Props {
  form: FormItem;
  t: (obj: I18nString) => string;
  lang: LangId;
}

// ── 가로 스와이프 이미지 캐러셀 ────────────────────────────────
const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const goTo = (idx: number) => setCurrent(Math.max(0, Math.min(images.length - 1, idx)));

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
    isDragging.current = false;
  };

  return (
    <div className="select-none">
      {/* 이미지 슬라이드 */}
      <div
        className="overflow-hidden rounded-2xl"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`guide ${idx + 1}`}
              className="w-full flex-shrink-0 object-contain bg-white"
              draggable={false}
            />
          ))}
        </div>
      </div>

      {/* 페이지 인디케이터 + 카운터 */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`transition-all duration-200 rounded-full
                ${current === idx
                  ? 'w-5 h-2 bg-gusring-text'
                  : 'w-2 h-2 bg-gusring-border-strong hover:bg-gusring-yellow'
                }`}
            />
          ))}
          <span className="ml-1 text-[11px] font-bold text-gusring-text-hint">
            {current + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
};

// ── 아코디언 섹션 ──────────────────────────────────────────────
const AccordionSection: React.FC<{
  index: number;
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ index, label, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-3xl border border-gusring-border bg-gusring-surface shadow-card overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left btn-press"
      >
        <div className="w-8 h-8 bg-gusring-yellow text-amber-950 rounded-full flex items-center justify-center text-sm font-black shrink-0">
          {index}
        </div>
        <span className="flex-1 font-black text-[15px] text-gusring-text">{label}</span>
        <ChevronDown
          size={18}
          className={`text-gusring-text-hint transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`transition-all duration-300 ease-out overflow-hidden ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 pb-5">
          {children}
        </div>
      </div>
    </div>
  );
};

// ── 메인 DetailView ────────────────────────────────────────────
const DetailView: React.FC<Props> = ({ form, t, lang }) => {
  const guideImages = form.guideImages?.[lang] ?? [];

  return (
    <div className="animate-slide-up pb-32">

      {/* 서류명 + 카테고리 */}
      <div className="px-5 pt-5 pb-5">
        <span className="inline-flex items-center bg-gusring-yellow-soft text-amber-700 text-[10px] font-black px-2.5 py-1 rounded-full mb-2.5 uppercase tracking-tight">
          {t(categories[form.cat])}
        </span>
        <h2 className="text-xl sm:text-2xl font-black text-gusring-text tracking-tight leading-tight mb-1.5">
          {t(form.title)}
        </h2>
        <p className="text-[13px] text-gusring-text-sub leading-relaxed">
          {t(form.desc)}
        </p>
      </div>

      {/* 아코디언 섹션들 */}
      <div className="px-4 space-y-3">

        {/* 1. 양식 보기 */}
        <AccordionSection index={1} label={t(UIStrings.viewForm)}>
          <FormViewer form={form} t={t} lang={lang} />
        </AccordionSection>

        {/* 2. 안내사항 보기 */}
        <AccordionSection index={2} label={t(UIStrings.viewGuide)}>
          {guideImages.length > 0 ? (
            <ImageCarousel images={guideImages} />
          ) : (
            <p className="text-center text-[13px] text-gusring-text-hint py-6">
              {t(UIStrings.noGuide)}
            </p>
          )}
        </AccordionSection>

        {/* 3. 행정 정보 (수수료, 준비물 등) */}
        {(form.fee || form.requirements || form.notes) && (
          <AccordionSection index={3} label={t({ ko: '행정 정보 안내', en: 'Administrative Info', zh: '行政信息', ja: '行政情報', vi: 'Thông tin hành chính' })}>
            <div className="space-y-4 py-2">
              {form.fee && (
                <div>
                  <h4 className="text-[13px] font-bold text-gusring-text mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gusring-yellow rounded-full"></span>
                    {t({ ko: '수수료', en: 'Fee', zh: '费用', ja: '手数料', vi: 'Lệ phí' })}
                  </h4>
                  <p className="text-[13px] text-gusring-text-sub ml-3.5">{t(form.fee as I18nString)}</p>
                </div>
              )}
              {form.requirements && (
                <div>
                  <h4 className="text-[13px] font-bold text-gusring-text mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gusring-yellow rounded-full"></span>
                    {t({ ko: '준비물', en: 'Requirements', zh: '准备물', ja: '準備物', vi: 'Yêu cầu' })}
                  </h4>
                  <p className="text-[13px] text-gusring-text-sub ml-3.5">{t(form.requirements as I18nString)}</p>
                </div>
              )}
              {form.notes && (
                <div className="bg-gusring-bg/50 p-3 rounded-2xl border border-gusring-border">
                  <h4 className="text-[12px] font-bold text-gusring-text-sub mb-1 flex items-center gap-1.5">
                    💡 {t({ ko: '참고사항', en: 'Notes', zh: '注意事项', ja: '注意事項', vi: 'Lưu ý' })}
                  </h4>
                  <p className="text-[12px] text-gusring-text-hint leading-relaxed">{t(form.notes as I18nString)}</p>
                </div>
              )}
            </div>
          </AccordionSection>
        )}

      </div>
    </div>
  );
};

// ── FAB (우하단 플로팅 액션 버튼) ─────────────────────────────
export const DetailViewFAB: React.FC<{
  t: (obj: I18nString) => string;
  lang: LangId;
  isDownloading: boolean;
  onDownload: () => void;
  onFeedback: () => void;
}> = ({ t, lang, isDownloading, onDownload, onFeedback }) => {
  const [open, setOpen] = useState(false);

  const fabPos: React.CSSProperties = {
    bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)',
    right:  'max(1.25rem, calc((100vw - 448px) / 2 + 1.25rem))',
  };

  const subBtn = (delay: number): React.CSSProperties => ({
    transition: 'opacity 220ms ease, transform 280ms cubic-bezier(0.34,1.4,0.64,1)',
    transitionDelay: open ? `${delay}ms` : '0ms',
    opacity:   open ? 1 : 0,
    transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.88)',
    pointerEvents: open ? 'auto' : 'none',
  });

  return (
    <>
      {/* 딤 배경 */}
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-20 transition-opacity duration-200"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', background: 'rgba(0,0,0,0.18)' }}
      />

      <div className="fixed z-30 flex flex-col items-end gap-2.5" style={fabPos}>

        {/* 피드백 버튼 */}
        <button
          style={subBtn(60)}
          onClick={() => { setOpen(false); trackFeedbackClick(lang); onFeedback(); }}
          className="flex items-center gap-3 pl-4 pr-3 py-3 bg-gusring-text rounded-2xl shadow-card-lg
                     active:scale-95 active:brightness-110
                     transition-[transform,filter] duration-150"
        >
          <span className="text-white text-[13px] font-black tracking-tight whitespace-nowrap">
            {t(UIStrings.feedback)}
          </span>
          <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
            <MessageCircle size={16} className="text-gusring-yellow" />
          </div>
        </button>

        {/* 다운로드 버튼 */}
        <button
          style={subBtn(20)}
          onClick={() => { setOpen(false); onDownload(); }}
          disabled={isDownloading}
          className="flex items-center gap-3 pl-4 pr-3 py-3 btn-primary rounded-2xl shadow-yellow
                     active:scale-95 active:brightness-105
                     transition-[transform,filter] duration-150 disabled:opacity-60"
        >
          <span className="text-amber-950 text-[13px] font-black tracking-tight whitespace-nowrap">
            {isDownloading ? t(UIStrings.downloading) : t(UIStrings.download)}
          </span>
          <div className="w-8 h-8 bg-amber-900/10 rounded-xl flex items-center justify-center">
            {isDownloading
              ? <span className="text-sm animate-spin inline-block">⏳</span>
              : <Download size={16} className="text-amber-950" />
            }
          </div>
        </button>

        {/* 메인 FAB */}
        <button
          onClick={() => setOpen(o => !o)}
          className="w-14 h-14 btn-primary rounded-2xl flex items-center justify-center shadow-yellow
                     active:scale-90 transition-transform duration-150"
          style={{ transform: open ? 'scale(0.94)' : 'scale(1)' }}
        >
          <Plus
            size={24}
            className="text-amber-950 transition-transform duration-300"
            style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
          />
        </button>
      </div>
    </>
  );
};

export default DetailView;
