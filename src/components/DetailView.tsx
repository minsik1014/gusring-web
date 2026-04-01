import React, { useState, useRef } from 'react';
import { ChevronDown, Download, MessageCircle, X, Plus } from 'lucide-react';
import { categories } from '../data/categories';
import { UIStrings } from '../data/strings';
import { FormItem, I18nString, LangId } from '../types';
import FormViewer from './FormViewer';
import { trackFeedbackClick } from '../analytics';

interface Props {
  form: FormItem;
  t: (obj: I18nString) => string;
  lang: LangId;
  isDownloading: boolean;
  onDownload: () => void;
  onFeedback: () => void;
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

  return (
    <div
      className="fixed z-30 flex flex-col items-end gap-3"
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)',
        right: '1.25rem',
      }}
    >
      {/* 서브 버튼들 (펼쳐질 때) */}
      <div className={`flex flex-col items-end gap-2.5 transition-all duration-200 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {/* 피드백 */}
        <button
          onClick={() => { setOpen(false); trackFeedbackClick(lang); onFeedback(); }}
          className="flex items-center gap-2.5 btn-press shadow-card-lg active:scale-95 transition-all"
        >
          <span className="bg-gusring-surface text-gusring-text text-[12px] font-black px-3 py-1.5 rounded-2xl shadow-card border border-gusring-border">
            {t(UIStrings.feedback)}
          </span>
          <div className="w-12 h-12 bg-gusring-text rounded-2xl flex items-center justify-center shadow-card-lg">
            <MessageCircle size={20} className="text-gusring-yellow" />
          </div>
        </button>

        {/* 다운로드 */}
        <button
          onClick={() => { setOpen(false); onDownload(); }}
          disabled={isDownloading}
          className="flex items-center gap-2.5 btn-press shadow-card-lg active:scale-95 transition-all disabled:opacity-60"
        >
          <span className="bg-gusring-surface text-gusring-text text-[12px] font-black px-3 py-1.5 rounded-2xl shadow-card border border-gusring-border">
            {isDownloading ? t(UIStrings.downloading) : t(UIStrings.download)}
          </span>
          <div className="w-12 h-12 btn-primary rounded-2xl flex items-center justify-center shadow-yellow">
            <Download size={20} className="text-amber-950" />
          </div>
        </button>
      </div>

      {/* 메인 FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 btn-primary rounded-2xl flex items-center justify-center shadow-yellow btn-press active:scale-95 transition-all"
      >
        {open
          ? <X size={22} className="text-amber-950" />
          : <Plus size={22} className="text-amber-950" />
        }
      </button>
    </div>
  );
};

export default DetailView;
