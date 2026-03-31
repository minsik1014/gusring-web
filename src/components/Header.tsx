import React from 'react';
import { ArrowLeft, Menu } from 'lucide-react';
import { Language, LangId, ViewName } from '../types';

interface Props {
  view: ViewName;
  currentLang: LangId;
  languages: Language[];
  onBack: () => void;
  onLanding: () => void;
  onMenuOpen: () => void;
}

const Header: React.FC<Props> = ({ view, currentLang, languages, onBack, onLanding, onMenuOpen }) => {
  const currentLanguage = languages.find(l => l.id === currentLang);

  return (
    <header className="sticky top-0 z-30 glass border-b border-gusring-border safe-top">
      <div className="px-5 h-14 flex items-center justify-between">
        {/* 왼쪽: 뒤로가기 or 로고 */}
        <div className="flex items-center gap-3">
          {view === 'detail' ? (
            <button
              onClick={onBack}
              className="btn-press p-2 -ml-2 rounded-2xl hover:bg-gusring-yellow-soft text-amber-600 transition-colors"
              aria-label="뒤로가기"
            >
              <ArrowLeft size={22} />
            </button>
          ) : (
            <button onClick={onLanding} className="btn-press" aria-label="홈으로">
              <img
                src="/gusring_logo.png"
                alt="Gusring"
                className="h-9 w-auto object-contain rounded-xl"
              />
            </button>
          )}
        </div>

        {/* 오른쪽: 언어 + 메뉴 */}
        <div className="flex items-center gap-2">
          <button
            onClick={onLanding}
            className="btn-press h-9 px-3 bg-gusring-yellow-soft rounded-xl text-[11px] font-black text-amber-800 border border-amber-100 shadow-card active:scale-95 transition-transform"
          >
            {currentLanguage?.icon} {currentLang.toUpperCase()}
          </button>
          <button
            onClick={onMenuOpen}
            className="btn-press w-9 h-9 flex items-center justify-center rounded-2xl hover:bg-gusring-bg text-gusring-text-sub transition-colors"
            aria-label="메뉴 열기"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
