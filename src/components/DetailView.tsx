import React, { useState } from 'react';
import { Download, Info, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { categories } from '../data/categories';
import { UIStrings, guideSteps } from '../data/strings';
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

const DetailView: React.FC<Props> = ({ form, t, lang, isDownloading, onDownload, onFeedback }) => {
  const [guideOpen, setGuideOpen] = useState(false);
  const guideImgs = form.guideImages?.[lang] ?? [];

  return (
  <div className="animate-slide-up pb-28">

    {/* ── 서류명 + 카테고리 ── */}
    <div className="px-5 pt-5 pb-4">
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

    {/* ── 서식 뷰어 (핀치줌 + 핫스팟) ── */}
    <div className="px-4 mb-5">
      <FormViewer form={form} t={t} lang={lang} />
    </div>

    {/* ── 안내사항 (접기/펼치기) ── */}
    {guideImgs.length > 0 && (
      <div className="px-4 mb-5">
        <button
          onClick={() => setGuideOpen(o => !o)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gusring-bg rounded-2xl border border-gusring-border"
        >
          <div className="flex items-center gap-2">
            <Info size={15} className="text-amber-600" />
            <span className="text-[13px] font-black text-gusring-text">
              {t(UIStrings.guideView)} ({guideImgs.length})
            </span>
          </div>
          {guideOpen ? <ChevronUp size={16} className="text-gusring-text-sub" /> : <ChevronDown size={16} className="text-gusring-text-sub" />}
        </button>
        {guideOpen && (
          <div className="mt-2 space-y-2">
            {guideImgs.map((src, i) => (
              <img key={i} src={src} alt={`안내사항 ${i + 1}`} className="w-full rounded-2xl border border-gusring-border" />
            ))}
          </div>
        )}
      </div>
    )}

    {/* ── 작성 안내 ── */}
    <div className="px-5">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 bg-gusring-yellow-soft rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
          <Info size={18} />
        </div>
        <h3 className="font-black text-[17px] text-gusring-text tracking-tight">
          {t(UIStrings.instructionTitle)}
        </h3>
      </div>

      <div className="space-y-3">
        {guideSteps.map((step, idx) => (
          <div
            key={idx}
            className="toss-card flex gap-3.5 p-4 rounded-3xl border border-amber-50 hover:border-gusring-yellow transition-colors"
          >
            <div className="w-7 h-7 bg-gusring-yellow text-amber-950 rounded-full flex items-center justify-center text-xs font-black shrink-0 shadow-yellow-sm mt-0.5">
              {idx + 1}
            </div>
            <div>
              <p className="text-gusring-text text-[14px] font-black mb-0.5">{t(step.title)}</p>
              <p className="text-gusring-text-sub text-[12px] leading-relaxed">{t(step.desc)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  </div>
  );
};

/* ── 하단 고정 버튼 바 ── */
export const DetailViewBottomBar: React.FC<{
  t: (obj: I18nString) => string;
  lang: LangId;
  isDownloading: boolean;
  onDownload: () => void;
  onFeedback: () => void;
}> = ({ t, lang, isDownloading, onDownload, onFeedback }) => (
  <div
    className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pt-3 bg-gusring-surface/95 backdrop-blur-md border-t border-gusring-border z-20"
    style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.25rem)' }}
  >
    <div className="flex gap-2.5">
      <button
        onClick={onDownload}
        disabled={isDownloading}
        className="flex-1 py-3.5 btn-primary rounded-2xl font-black text-[13px] flex items-center justify-center gap-1.5 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isDownloading ? (
          <><span className="inline-block animate-spin">⏳</span> {t(UIStrings.downloading)}</>
        ) : (
          <><Download size={17} /> {t(UIStrings.download)}</>
        )}
      </button>
      <button
        onClick={() => { trackFeedbackClick(lang); onFeedback(); }}
        className="flex-1 py-3.5 bg-gusring-text text-white rounded-2xl font-black text-[13px] flex items-center justify-center gap-1.5 active:scale-95 transition-all"
      >
        <MessageCircle size={17} className="text-gusring-yellow" />
        {t(UIStrings.feedback)}
      </button>
    </div>
  </div>
);

export default DetailView;
