import React, { useEffect, useRef } from 'react';
import { Search, FileText, ChevronRight } from 'lucide-react';
import { categories } from '../data/categories';
import { UIStrings } from '../data/strings';
import { FormItem, I18nString, LangId } from '../types';
import { trackSearch, trackCategoryFilter } from '../analytics';

interface Props {
  t: (obj: I18nString) => string;
  lang: LangId;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  filteredForms: FormItem[];
  onFormSelect: (form: FormItem) => void;
}

const ListView: React.FC<Props> = ({
  t, lang, searchTerm, onSearchChange,
  selectedCategory, onCategoryChange,
  filteredForms, onFormSelect,
}) => {
  // 검색어 300ms debounce 후 GA 전송
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      trackSearch({ term: searchTerm, resultCount: filteredForms.length, lang });
    }, 300);
    return () => { if (searchTimerRef.current) clearTimeout(searchTimerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, filteredForms.length]);

  const handleCategoryChange = (cat: string) => {
    trackCategoryFilter(cat, lang);
    onCategoryChange(cat);
  };

  return (
  <div className="px-4 py-5 sm:px-5 space-y-5">

    {/* 페이지 타이틀 */}
    <div className="py-1 animate-slide-up">
      <h2 className="text-xl sm:text-2xl font-black text-gusring-text leading-tight mb-1">
        {t(UIStrings.welcome)}
      </h2>
      <p className="text-gusring-text-sub text-[13px] font-medium">
        {t(UIStrings.subWelcome)}
      </p>
    </div>

    {/* 검색 + 카테고리 필터 (sticky) */}
    <div className="sticky z-20 bg-gusring-bg/90 backdrop-blur-sm pt-1 pb-4 space-y-3"
         style={{ top: 'var(--header-h)' }}>

      {/* 검색창 */}
      <div className="relative group animate-slide-up" style={{ animationDelay: '60ms' }}>
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-gusring-text-hint group-focus-within:text-gusring-yellow transition-colors"
          size={18}
        />
        <input
          type="text"
          placeholder={t(UIStrings.searchPlaceholder)}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="toss-input pl-14"
        />
      </div>

      {/* 카테고리 칩 */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <button
          onClick={() => handleCategoryChange('ALL')}
          className={`toss-chip ${selectedCategory === 'ALL' ? 'active' : ''}`}
        >
          {t(UIStrings.catAll)}
        </button>

        {(Object.keys(categories) as Array<keyof typeof categories>).map((catKey) => (
          <button
            key={catKey}
            onClick={() => handleCategoryChange(catKey)}
            className={`toss-chip ${selectedCategory === catKey ? 'active' : ''}`}
          >
            {t(categories[catKey])}
          </button>
        ))}
      </div>
    </div>

    {/* 서식 목록 */}
    <div className="grid grid-cols-1 gap-3 pb-28">
      {/* 카운터 */}
      <div className="text-[10px] text-amber-600 font-black px-1 uppercase tracking-[0.15em]">
        {selectedCategory === 'ALL'
          ? t(UIStrings.catAll)
          : t(categories[selectedCategory as keyof typeof categories])}{' '}
        ({filteredForms.length})
      </div>

      {/* 카드 목록 */}
      {filteredForms.map((form, idx) => (
        <button
          key={form.id}
          onClick={() => onFormSelect(form)}
          className="toss-card btn-press flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-4xl text-left group animate-slide-up"
          style={{ animationDelay: `${idx * 30}ms` }}
        >
          {/* 아이콘 */}
          <div className="w-12 h-12 bg-gusring-yellow-soft group-hover:bg-gusring-yellow rounded-[18px] flex items-center justify-center text-amber-400 group-hover:text-amber-900 shrink-0 transition-all duration-200 shadow-inset-sm">
            <FileText size={22} />
          </div>

          {/* 텍스트 */}
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-black text-amber-500 uppercase mb-1 tracking-wider">
              {t(categories[form.cat])}
            </p>
            <h3 className="font-bold text-gusring-text text-[15px] leading-snug truncate">
              {t(form.title)}
            </h3>
            <p className="text-[11px] text-gusring-text-hint truncate mt-0.5 leading-relaxed font-medium group-hover:text-gusring-text-sub transition-colors">
              {t(form.desc)}
            </p>
          </div>

          <ChevronRight size={16} className="text-gusring-border-strong group-hover:text-amber-500 shrink-0 transition-colors" />
        </button>
      ))}

      {/* 결과 없음 */}
      {filteredForms.length === 0 && (
        <div className="text-center py-20 bg-gusring-surface rounded-5xl border-4 border-dashed border-gusring-border animate-fade-in">
          <p className="text-gusring-text-hint text-sm font-bold">{t(UIStrings.noResult)}</p>
        </div>
      )}
    </div>
  </div>
  );
};

export default ListView;
