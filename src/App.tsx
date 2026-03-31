import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';

import { languages }   from './data/languages';
import { formsList }   from './data/forms';
import { useTranslate } from './hooks/useTranslate';

import Header        from './components/Header';
import MenuOverlay   from './components/MenuOverlay';
import LandingView   from './components/LandingView';
import ListView      from './components/ListView';
import DetailView, { DetailViewBottomBar } from './components/DetailView';
import FeedbackThread  from './components/FeedbackThread';

import { FormItem, LangId, ViewName } from './types';
import {
  trackLandingView,
  trackListView,
  trackDetailView,
  trackLanguageSelect,
  trackFormDownload,
  trackTimeOnDetail,
} from './analytics';

const App: React.FC = () => {
  // ── 전역 상태 ──────────────────────────────────────────────
  const [currentLang, setCurrentLang]           = useState<LangId>('ko');
  const [view, setView]                         = useState<ViewName>('landing');
  const [selectedForm, setSelectedForm]         = useState<FormItem | null>(null);
  const [searchTerm, setSearchTerm]             = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isMenuOpen, setIsMenuOpen]             = useState(false);
  const [isDownloading, setIsDownloading]       = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen]     = useState(false);
  const detailEnterTimeRef                      = useRef<number | null>(null);

  // ── 번역 함수 ───────────────────────────────────────────────
  const t = useTranslate(currentLang);

  // ── 서식 필터링 ─────────────────────────────────────────────
  const filteredForms = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return formsList.filter((form) => {
      const matchesSearch =
        t(form.title).toLowerCase().includes(query) ||
        form.title.ko.includes(searchTerm);
      const matchesCategory =
        selectedCategory === 'ALL' || form.cat === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, t]);

  // ── 네비게이션 (메뉴 자동 닫기 포함) ───────────────────────
  const navigateTo = useCallback((nextView: ViewName) => {
    setIsMenuOpen(false);
    setView(nextView);
  }, []);

  // ── 페이지 뷰 & 체류 시간 트래킹 ───────────────────────────
  useEffect(() => {
    if (view === 'landing') {
      trackLandingView();
    } else if (view === 'list') {
      trackListView(currentLang);
    } else if (view === 'detail' && selectedForm) {
      trackDetailView({
        formId:    selectedForm.id,
        formTitle: selectedForm.title[currentLang] ?? selectedForm.title.ko,
        category:  selectedForm.cat,
        lang:      currentLang,
      });
      detailEnterTimeRef.current = Date.now();
    }

    // 상세에서 벗어날 때 체류 시간 기록
    return () => {
      if (view === 'detail' && selectedForm && detailEnterTimeRef.current) {
        const durationSec = Math.round((Date.now() - detailEnterTimeRef.current) / 1000);
        if (durationSec > 2) {
          trackTimeOnDetail({
            formId:      selectedForm.id,
            formTitle:   selectedForm.title[currentLang] ?? selectedForm.title.ko,
            durationSec,
            lang:        currentLang,
          });
        }
        detailEnterTimeRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, selectedForm]);

  // ── 디테일 진입 시 스크롤 상단 복원 ────────────────────────
  useEffect(() => {
    if (view === 'detail') window.scrollTo({ top: 0, behavior: 'auto' });
  }, [view, selectedForm]);

  // ── 다운로드 ──────────────────────────────────────────────
  const handleDownload = useCallback(async () => {
    if (isDownloading || !selectedForm) return;

    // ko는 PNG 없으므로 en 폴백
    const lang = currentLang === 'ko' ? 'en' : currentLang;
    const imageUrl = selectedForm.images?.[lang] ?? selectedForm.images?.['en'];
    if (!imageUrl) return;

    trackFormDownload({
      formId:    selectedForm.id,
      formTitle: selectedForm.title[currentLang] ?? selectedForm.title.ko,
      category:  selectedForm.cat,
      lang:      currentLang,
    });

    setIsDownloading(true);
    try {
      const res  = await fetch(imageUrl);
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `${selectedForm.title[currentLang] ?? selectedForm.title.ko}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  }, [isDownloading, selectedForm, currentLang]);

  // ── 언어 선택 (Landing → List) ─────────────────────────────
  const handleLangSelect = useCallback((lang: LangId) => {
    trackLanguageSelect(lang);
    setCurrentLang(lang);
    navigateTo('list');
  }, [navigateTo]);

  // ── 서식 선택 (List → Detail) ──────────────────────────────
  const handleFormSelect = useCallback((form: FormItem) => {
    setSelectedForm(form);
    navigateTo('detail');
  }, [navigateTo]);

  // ── Landing View ────────────────────────────────────────────
  if (view === 'landing') {
    return (
      <div className="min-h-screen sm:flex sm:items-start sm:justify-center">
        <div className="w-full sm:max-w-md sm:min-h-screen sm:shadow-2xl">
          <LandingView languages={languages} onSelect={handleLangSelect} />
        </div>
      </div>
    );
  }

  // ── App Shell (List / Detail) ───────────────────────────────
  return (
    <div className="sm:flex sm:items-start sm:justify-center sm:min-h-screen">
    <div className="min-h-screen bg-gusring-bg flex flex-col font-sans w-full sm:max-w-md sm:shadow-2xl relative overflow-x-hidden">
      <Header
        view={view}
        currentLang={currentLang}
        languages={languages}
        onBack={() => navigateTo('list')}
        onLanding={() => navigateTo('landing')}
        onMenuOpen={() => setIsMenuOpen(true)}
      />

      {isMenuOpen && (
        <MenuOverlay
          t={t}
          lang={currentLang}
          onClose={() => setIsMenuOpen(false)}
          onFeedback={() => { setIsMenuOpen(false); setIsFeedbackOpen(true); }}
        />
      )}

      {isFeedbackOpen && (
        <FeedbackThread lang={currentLang} onClose={() => setIsFeedbackOpen(false)} />
      )}

      <main className="flex-1">
        {view === 'list' ? (
          <ListView
            t={t}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            filteredForms={filteredForms}
            onFormSelect={handleFormSelect}
            lang={currentLang}
          />
        ) : selectedForm ? (
          <DetailView
            form={selectedForm}
            t={t}
            lang={currentLang}
            isDownloading={isDownloading}
            onDownload={handleDownload}
            onFeedback={() => setIsFeedbackOpen(true)}
          />
        ) : null}
      </main>

      {/* 상세 화면 하단 고정 버튼 바 */}
      {view === 'detail' && selectedForm && (
        <DetailViewBottomBar
          t={t}
          lang={currentLang}
          isDownloading={isDownloading}
          onDownload={handleDownload}
          onFeedback={() => setIsFeedbackOpen(true)}
        />
      )}

    </div>
    </div>
  );
};

export default App;
