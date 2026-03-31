import React from 'react';
import { Globe, ChevronRight } from 'lucide-react';
import { Language, LangId } from '../types';
import { UIStrings } from '../data/strings';

interface Props {
  languages: Language[];
  onSelect: (lang: LangId) => void;
}

const LandingView: React.FC<Props> = ({ languages, onSelect }) => (
  <div className="min-h-screen bg-gusring-bg flex flex-col items-center justify-center px-5 py-8 sm:px-8 font-sans safe-top safe-bottom">
    <div className="w-full max-w-sm sm:max-w-md text-center space-y-7 sm:space-y-8">

      {/* 로고 */}
      <div className="flex flex-col items-center animate-slide-up" style={{ animationDelay: '0ms' }}>
        <div className="relative mb-4 sm:mb-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gusring-yellow rounded-[28px] sm:rounded-[32px] flex items-center justify-center text-amber-900 shadow-yellow border-4 border-white rotate-3 btn-press cursor-default">
            <Globe size={42} className="animate-bounce-soft sm:w-12 sm:h-12" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-2xl flex items-center justify-center shadow-card border border-gusring-border">
            <span className="text-base">🇰🇷</span>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gusring-text tracking-tight">Gusring</h1>
        <div className="px-4 py-1.5 bg-gusring-yellow-soft text-amber-800 text-[11px] font-black rounded-full mt-2 uppercase tracking-widest shadow-card border border-amber-100">
          Geumcheon Smart Ring
        </div>
      </div>

      {/* 언어 선택 */}
      <div
        className="grid grid-cols-1 gap-3 w-full animate-slide-up"
        style={{ animationDelay: '80ms' }}
      >
        <p className="text-gusring-text-sub font-bold mb-1 text-sm">{UIStrings.landing.ko}</p>

        {languages.map((lang, idx) => (
          <button
            key={lang.id}
            onClick={() => onSelect(lang.id)}
            className="toss-card btn-press flex items-center justify-between p-4 sm:p-5 rounded-4xl text-left group"
            style={{ animationDelay: `${120 + idx * 50}ms` }}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl filter drop-shadow-sm">{lang.icon}</span>
              <span className="font-extrabold text-gusring-text text-lg sm:text-xl group-hover:text-amber-700 transition-colors">
                {lang.label}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gusring-bg flex items-center justify-center group-hover:bg-gusring-yellow transition-colors duration-200">
              <ChevronRight size={18} className="text-gusring-text-hint group-hover:text-amber-900 transition-colors" />
            </div>
          </button>
        ))}
      </div>

      <p
        className="text-[10px] text-gusring-text-hint font-medium animate-fade-in"
        style={{ animationDelay: '500ms' }}
      >
        © 2026 Team EL. Geumcheon-gu Living Lab Project.
      </p>
    </div>
  </div>
);

export default LandingView;
