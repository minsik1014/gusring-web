/**
 * analytics.ts — Gusring GA4 이벤트 트래킹
 *
 * 측정 ID 변경 방법:
 *   1. analytics.google.com → 속성 만들기 → 측정 ID 발급 (G-XXXXXXXXXX)
 *   2. public/index.html 의 'G-XXXXXXXXXX' 두 곳을 실제 ID로 교체
 */

// ── gtag 타입 선언 ───────────────────────────────────────────
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** gtag가 로드됐는지 확인 후 이벤트 전송 */
function send(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

// ── 페이지 뷰 ────────────────────────────────────────────────

/** 랜딩(언어선택) 화면 진입 */
export function trackLandingView(): void {
  send('page_view', {
    page_title:    '언어 선택',
    page_location: window.location.href,
    page_path:     '/landing',
  });
}

/** 서식 목록 화면 진입 */
export function trackListView(lang: string): void {
  send('page_view', {
    page_title:    '서식 목록',
    page_location: window.location.href,
    page_path:     '/list',
    language:      lang,
  });
}

/** 서식 상세 화면 진입 */
export function trackDetailView(params: {
  formId:    number;
  formTitle: string;
  category:  string;
  lang:      string;
}): void {
  send('page_view', {
    page_title:    `서식: ${params.formTitle}`,
    page_location: window.location.href,
    page_path:     `/detail/${params.formId}`,
    form_id:       params.formId,
    form_title:    params.formTitle,
    category:      params.category,
    language:      params.lang,
  });
}

// ── 언어 선택 ────────────────────────────────────────────────

/** 언어 선택 */
export function trackLanguageSelect(lang: string): void {
  send('language_select', { language: lang });
}

// ── 서식 관련 ────────────────────────────────────────────────

/** 서식 다운로드 버튼 클릭 */
export function trackFormDownload(params: {
  formId:    number;
  formTitle: string;
  category:  string;
  lang:      string;
}): void {
  send('form_download', {
    form_id:    params.formId,
    form_title: params.formTitle,
    category:   params.category,
    language:   params.lang,
  });
}

/** 공유 버튼 클릭 */
export function trackFormShare(params: {
  formId:    number;
  formTitle: string;
}): void {
  send('form_share', {
    form_id:    params.formId,
    form_title: params.formTitle,
  });
}

// ── 검색 & 필터 ──────────────────────────────────────────────

/** 검색 입력 (300ms debounce 권장) */
export function trackSearch(params: {
  term:         string;
  resultCount:  number;
  lang:         string;
}): void {
  if (!params.term.trim()) return;
  send('search', {
    search_term:   params.term,
    result_count:  params.resultCount,
    language:      params.lang,
  });
}

/** 카테고리 필터 선택 */
export function trackCategoryFilter(category: string, lang: string): void {
  send('category_filter', { category, language: lang });
}

// ── 버튼 클릭 ────────────────────────────────────────────────

/** AI 상담 버튼 클릭 */
export function trackAiConsultClick(lang: string): void {
  send('ai_consult_click', { language: lang });
}

/** 피드백 버튼 클릭 */
export function trackFeedbackClick(lang: string): void {
  send('feedback_click', { language: lang });
}

/** 구청 위치 버튼 클릭 */
export function trackOfficeLocationClick(lang: string): void {
  send('office_location_click', { language: lang });
}

// ── 체류 시간 ────────────────────────────────────────────────

/** 서식 상세 화면 체류 시간 기록 (초 단위) */
export function trackTimeOnDetail(params: {
  formId:      number;
  formTitle:   string;
  durationSec: number;
  lang:        string;
}): void {
  send('time_on_detail', {
    form_id:      params.formId,
    form_title:   params.formTitle,
    duration_sec: params.durationSec,
    language:     params.lang,
  });
}
