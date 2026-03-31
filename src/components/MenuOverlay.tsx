import React from 'react';
import { X, MapPin, MessageCircle } from 'lucide-react';
import { I18nString, LangId } from '../types';
import { UIStrings } from '../data/strings';
import { trackOfficeLocationClick, trackFeedbackClick } from '../analytics';

interface Props {
  t: (obj: I18nString) => string;
  lang: LangId;
  onClose: () => void;
  onFeedback: () => void;
}

const MenuOverlay: React.FC<Props> = ({ t, lang, onClose, onFeedback }) => (
  <>
    {/* 딤 배경 */}
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 animate-fade-in"
      onClick={onClose}
    />

    {/* 사이드 패널 — 앱 셸(max-w-md) 안에서 오른쪽에 부착 */}
    <div className="fixed top-0 right-0 sm:right-auto sm:left-1/2 sm:-translate-x-[calc(50%-11rem)] h-full w-72 bg-gusring-surface z-50 shadow-card-lg px-6 py-7 sm:px-8 sm:py-8 rounded-l-5xl safe-top safe-bottom flex flex-col"
      style={{ animation: 'slideUpFade 0.32s cubic-bezier(0.34,1.2,0.64,1) both' }}
    >
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-black text-2xl text-gusring-text">Menu</h2>
        <button
          onClick={onClose}
          className="btn-press w-10 h-10 rounded-full bg-gusring-bg flex items-center justify-center text-gusring-text-sub hover:bg-gusring-yellow-soft transition-colors"
          aria-label="메뉴 닫기"
        >
          <X size={18} />
        </button>
      </div>

      {/* 컨텐츠 */}
      <div className="space-y-4 flex-1">
        {/* 소개 카드 */}
        <div className="toss-card p-5 rounded-3xl text-[13px] text-gusring-text-sub font-medium leading-relaxed">
          금천구의 행정 서비스를 모국어로 쉽고 편하게 이용하세요.<br />
          <span className="text-amber-600 font-bold">'구스링'</span>은 리빙랩 활동으로 제작되었습니다.
        </div>

        {/* 메뉴 버튼들 */}
        <button
          className="btn-press w-full flex items-center gap-4 p-4 font-bold text-gusring-text hover:bg-gusring-bg rounded-2xl transition-colors text-left"
          onClick={() => trackOfficeLocationClick(lang)}
        >
          <div className="w-9 h-9 bg-gusring-yellow-soft rounded-xl flex items-center justify-center">
            <MapPin size={18} className="text-amber-600" />
          </div>
          <span className="text-[14px]">{t(UIStrings.guroOffice)}</span>
        </button>

        <button
          className="btn-press w-full flex items-center gap-4 p-4 font-bold text-amber-700 bg-gusring-yellow-soft hover:bg-gusring-yellow rounded-2xl transition-colors text-left border border-amber-100"
          onClick={() => { trackFeedbackClick(lang); onFeedback(); }}
        >
          <div className="w-9 h-9 bg-gusring-yellow rounded-xl flex items-center justify-center">
            <MessageCircle size={18} className="text-amber-900" />
          </div>
          <span className="text-[14px]">{t(UIStrings.feedback)}</span>
        </button>
      </div>

      {/* 푸터 */}
      <p className="text-[10px] text-gusring-text-hint font-medium text-center pt-4">
        © 2026 Team EL. Geumcheon-gu Living Lab Project.
      </p>
    </div>
  </>
);

export default MenuOverlay;
