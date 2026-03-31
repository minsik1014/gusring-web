// ─────────────────────────────────────────────────────────────
// 공통 타입 정의
// ─────────────────────────────────────────────────────────────

export type LangId = 'ko' | 'en' | 'zh' | 'ja' | 'vi';

export type CategoryKey = 'FAMILY' | 'CERT' | 'RESIDENCE' | 'ID_SEAL' | 'VEHICLE';

export type ViewName = 'landing' | 'list' | 'detail';

/** 다국어 문자열 객체 */
export type I18nString = Record<LangId, string>;

export interface Language {
  id: LangId;
  label: string;
  icon: string;
}

export interface FormItem {
  id: number;
  cat: CategoryKey;
  title: I18nString;
  desc: I18nString;
  /** 언어별 PNG 경로 (예: /forms/en/1.png). 없으면 목업 UI 표시 */
  images?: Partial<Record<LangId, string>>;
}

export interface GuideStep {
  title: I18nString;
  desc: I18nString;
}

export interface FeedbackEntry {
  id:        string;
  lang:      LangId;
  text:      string;
  createdAt: Date | null;
}
