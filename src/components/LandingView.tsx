import React from 'react';
import { Language, LangId } from '../types';

interface Props {
  languages: Language[];
  onSelect: (lang: LangId) => void;
}

const LandingView: React.FC<Props> = ({ languages, onSelect }) => {
  // 홀수면 마지막 항목을 full-width로 분리
  const isOdd = languages.length % 2 !== 0;
  const gridLangs = isOdd ? languages.slice(0, -1) : languages;
  const lastLang  = isOdd ? languages[languages.length - 1] : null;

  return (
    <div className="relative min-h-screen bg-gusring-bg flex flex-col items-center justify-between overflow-hidden safe-top safe-bottom">

      {/* 배경 데코 — 연한 브랜드 원형 */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(254,219,2,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-20 w-56 h-56 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(254,219,2,0.08) 0%, transparent 70%)' }}
      />

      {/* ── 상단: 로고 ─────────────────────────────────────── */}
      <div className="flex flex-col items-center justify-center flex-1 px-8 pt-10 pb-4 w-full">
        {/* 로고 */}
        <div className="animate-scale-in" style={{ animationDelay: '0ms' }}>
          <img
            src="/gusring_logo.png"
            alt="Gusring"
            className="w-44 sm:w-52 h-auto object-contain"
            style={{ mixBlendMode: 'multiply' }}
          />
        </div>

        {/* 마스코트 */}
        <div className="animate-scale-in" style={{ animationDelay: '80ms' }}>
          <img
            src="/waving.png"
            alt="mascot"
            className="w-28 sm:w-32 h-auto object-contain animate-bounce-soft"
          />
        </div>

        {/* 브랜드 구분선 */}
        <div
          className="mt-6 mb-8 w-10 h-[3px] rounded-full animate-fade-in"
          style={{ background: '#fedb02', animationDelay: '150ms' }}
        />

        {/* ── 언어 그리드 ────────────────────────────────── */}
        <div className="w-full max-w-xs sm:max-w-sm space-y-3">

          {/* 2-column 그리드 */}
          <div className="grid grid-cols-2 gap-3">
            {gridLangs.map((lang, idx) => (
              <button
                key={lang.id}
                onClick={() => onSelect(lang.id)}
                className="bg-gusring-surface rounded-[28px] pt-6 pb-5 px-3
                           flex flex-col items-center gap-2
                           btn-press shadow-card
                           hover:-translate-y-1.5 hover:shadow-card-md
                           transition-all duration-200 ease-spring animate-scale-in"
                style={{ animationDelay: `${180 + idx * 60}ms` }}
              >
                <span className="text-[42px] leading-none">{lang.icon}</span>
                <span className="font-black text-gusring-text text-[15px] tracking-tight">
                  {lang.label}
                </span>
              </button>
            ))}
          </div>

          {/* 홀수일 때 마지막 항목 — full-width */}
          {lastLang && (
            <button
              onClick={() => onSelect(lastLang.id)}
              className="w-full bg-gusring-surface rounded-[28px] py-4 px-6
                         flex items-center justify-center gap-4
                         btn-press shadow-card
                         hover:-translate-y-1.5 hover:shadow-card-md
                         transition-all duration-200 ease-spring animate-scale-in"
              style={{ animationDelay: `${180 + gridLangs.length * 60}ms` }}
            >
              <span className="text-[36px] leading-none">{lastLang.icon}</span>
              <span className="font-black text-gusring-text text-[15px] tracking-tight">
                {lastLang.label}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* ── 푸터 ──────────────────────────────────────────── */}
      <p
        className="text-[10px] text-gusring-text-hint font-medium pb-8 tracking-wide animate-fade-in"
        style={{ animationDelay: '600ms' }}
      >
        © 2026 Team EL · Geumcheon-gu Living Lab
      </p>
    </div>
  );
};

export default LandingView;
