import React from 'react';
import { FileText, Download, Share2, Info, MessageCircle } from 'lucide-react';
import { categories } from '../data/categories';
import { UIStrings, guideSteps } from '../data/strings';
import { FormItem, I18nString, LangId } from '../types';
import FormViewer from './FormViewer';
import { trackFormShare, trackFeedbackClick } from '../analytics';

interface Props {
  form: FormItem;
  t: (obj: I18nString) => string;
  lang: LangId;
  isDownloading: boolean;
  onDownload: () => void;
  onFeedback: () => void;
}

const DetailView: React.FC<Props> = ({ form, t, lang, isDownloading, onDownload, onFeedback }) => (
  <div className="animate-slide-up">

    {/* 히어로 영역 — 작은 폰: 3:4, 큰 폰: 4:5 */}
    <div className="w-full aspect-[3/4] sm:aspect-[4/5] bg-gusring-yellow-soft relative overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <FileText size={120} className="text-gusring-yellow opacity-40" />
      </div>
      <div className="absolute top-10 right-8 w-20 h-20 bg-gusring-yellow/30 rounded-5xl rotate-12" />
      <div className="absolute bottom-20 left-6 w-14 h-14 bg-gusring-yellow/20 rounded-4xl -rotate-6" />

      {/* 텍스트 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent flex flex-col justify-end p-7">
        <div className="bg-gusring-yellow text-amber-950 text-[10px] font-black px-3 py-1 rounded-full w-fit mb-3 uppercase tracking-tight shadow-sm">
          {t(categories[form.cat])}
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">{t(form.title)}</h2>
        <p className="text-white/80 text-xs sm:text-[13px] mb-5 sm:mb-6 leading-relaxed font-medium line-clamp-2">
          {t(form.desc)}
        </p>

        {/* 액션 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={onDownload}
            disabled={isDownloading}
            className="flex-1 py-4 btn-primary rounded-3xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <><span className="inline-block animate-spin">⏳</span> {t(UIStrings.downloading)}</>
            ) : (
              <><Download size={18} /> {t(UIStrings.download)}</>
            )}
          </button>
          <button
            className="btn-press p-4 glass rounded-3xl text-white border border-white/20 active:scale-95 transition-all"
            onClick={() => trackFormShare({ formId: form.id, formTitle: form.title[lang] ?? form.title.ko })}
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </div>

    {/* 흰 카드 바디 */}
    <div className="bg-gusring-surface px-5 py-6 sm:px-7 sm:py-7 rounded-t-5xl -mt-10 relative z-10 shadow-card-lg min-h-[400px] sm:min-h-[500px]">
      {/* 드래그 핸들 */}
      <div className="drag-handle mx-auto mb-7" />

      {/* 서류 인터랙티브 뷰어 */}
      <div className="mb-9">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gusring-bg rounded-2xl flex items-center justify-center text-gusring-text-sub">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="font-black text-lg text-gusring-text">{t(UIStrings.formPreview)}</h3>
            <p className="text-[11px] text-gusring-text-hint font-medium">{t(UIStrings.formPreviewNote)}</p>
          </div>
        </div>
        <FormViewer form={form} t={t} />
      </div>

      {/* 작성 안내 섹션 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gusring-yellow-soft rounded-2xl flex items-center justify-center text-amber-600">
          <Info size={20} />
        </div>
        <h3 className="font-black text-lg sm:text-xl text-gusring-text tracking-tight">{t(UIStrings.instructionTitle)}</h3>
      </div>

      <div className="space-y-4 mb-10">
        {guideSteps.map((step, idx) => (
          <div
            key={idx}
            className="toss-card flex gap-4 p-5 rounded-4xl border border-amber-50 hover:border-gusring-yellow transition-colors"
          >
            <div className="w-8 h-8 bg-gusring-yellow text-amber-950 rounded-full flex items-center justify-center text-sm font-black shrink-0 shadow-sm">
              {idx + 1}
            </div>
            <div>
              <p className="text-gusring-text text-[15px] font-black mb-1">{t(step.title)}</p>
              <p className="text-gusring-text-sub text-[13px] leading-relaxed font-medium">{t(step.desc)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 피드백 버튼 */}
      <button
        className="btn-press w-full py-5 bg-gusring-text text-white rounded-4xl font-black text-base flex items-center justify-center gap-3 shadow-card-lg active:scale-[0.98] transition-all"
        onClick={() => { trackFeedbackClick(lang); onFeedback(); }}
      >
        <MessageCircle size={20} className="text-gusring-yellow" />
        {t(UIStrings.feedback)}
      </button>

      <div className="safe-bottom" />
    </div>
  </div>
);

export default DetailView;
