import React from 'react';
import { Globe } from 'lucide-react';
import { UIStrings } from '../data/strings';
import { I18nString, LangId } from '../types';
import { trackAiConsultClick } from '../analytics';

interface Props {
  t: (obj: I18nString) => string;
  lang: LangId;
}

const FloatingBanner: React.FC<Props> = ({ t, lang }) => (
  <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 sm:px-5 pb-5 sm:pb-6 pointer-events-none safe-bottom">
    <div
      className="glass-dark text-white rounded-4xl p-4 flex items-center justify-between pointer-events-auto shadow-card-lg animate-slide-up border border-white/10"
      style={{ animationDelay: '200ms' }}
    >
      {/* 아이콘 + 텍스트 */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-gusring-yellow rounded-2xl flex items-center justify-center shadow-yellow animate-bounce-soft shrink-0">
          <Globe size={22} className="text-amber-950" />
        </div>
        <div>
          <p className="text-[10px] font-black text-gusring-yellow tracking-[0.1em] uppercase mb-0.5">
            Geumcheon Smart Ring
          </p>
          <p className="text-[13px] font-bold text-white/90 tracking-tight">
            행정 도움이 필요하신가요?
          </p>
        </div>
      </div>

      {/* CTA 버튼 */}
      <button
        className="btn-press btn-primary px-4 py-2.5 rounded-2xl text-[12px] font-black text-amber-950 shrink-0"
        onClick={() => trackAiConsultClick(lang)}
      >
        {t(UIStrings.aiConsult)}
      </button>
    </div>
  </div>
);

export default FloatingBanner;
