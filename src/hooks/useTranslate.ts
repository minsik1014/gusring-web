import { useCallback } from 'react';
import { I18nString, LangId } from '../types';

/**
 * 현재 언어에 맞는 번역 함수를 반환하는 훅.
 * 선택 언어 → 영어 → 한국어 순으로 폴백.
 */
export function useTranslate(currentLang: LangId) {
  return useCallback(
    (obj: I18nString | undefined): string =>
      obj ? (obj[currentLang] ?? obj['en'] ?? obj['ko'] ?? '') : '',
    [currentLang],
  );
}
