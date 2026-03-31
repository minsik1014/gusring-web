import React from 'react';
import { CategoryKey, FormItem, I18nString } from '../types';

// 카테고리별 폼 필드 정의 [레이블, 최소 너비(px)]
const catFields: Record<CategoryKey, [string, number][]> = {
  FAMILY:    [['성명 (Name)', 80], ['생년월일 (D.O.B)', 80], ['등록기준지', 80], ['주소 (Address)', 80], ['신고인 (Reporter)', 80]],
  CERT:      [['신청인 성명 (Name)', 80], ['주민등록번호', 80], ['신청목적 (Purpose)', 80], ['발급 통수', 40]],
  RESIDENCE: [['성명 (Name)', 80], ['현주소 (Current)', 80], ['이전 주소 (Previous)', 80], ['이전일자 (Date)', 60], ['세대주 (HOH)', 60]],
  ID_SEAL:   [['성명 (Name)', 80], ['주민등록번호', 80], ['주소 (Address)', 80], ['신고사유 (Reason)', 80], ['인감날인 (Seal)', 60]],
  VEHICLE:   [['차종 (Type)', 60], ['차량번호 (Plate No.)', 80], ['소유자 (Owner)', 80], ['양도일자 (Date)', 60], ['서명 (Signature)', 60]],
};

interface Props {
  form: FormItem;
  t: (obj: I18nString) => string;
}

/**
 * 서류 미리보기 목업 컴포넌트.
 * 실제 PNG 파일 연동 전 임시 목업으로,
 * 나중에 <img src={formPngUrl} /> 로 교체 예정.
 */
const FormMockPreview: React.FC<Props> = ({ form, t }) => {
  const fields = catFields[form.cat] ?? catFields.FAMILY;

  return (
    <div className="bg-gusring-surface border border-gusring-border rounded-3xl overflow-hidden shadow-card text-[11px]">

      {/* 관인 헤더 */}
      <div className="flex items-stretch border-b border-gusring-border">
        <div className="w-14 border-r border-gusring-border flex flex-col items-center justify-center py-3 bg-gusring-bg shrink-0">
          <div className="w-9 h-9 rounded-full border-2 border-gusring-border-strong flex items-center justify-center">
            <span style={{ fontSize: 7, lineHeight: 1.2 }} className="text-gusring-text-hint text-center font-bold">
              관<br />인
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center py-3 px-2 bg-gusring-bg">
          <p style={{ fontSize: 8 }} className="text-gusring-text-hint tracking-widest mb-1 font-medium">대한민국 행정 서식</p>
          <p style={{ fontSize: 13 }} className="font-black text-gusring-text text-center leading-tight">{t(form.title)}</p>
        </div>
        <div className="w-14 border-l border-gusring-border flex flex-col items-center justify-center py-2 bg-gusring-bg shrink-0 gap-1">
          <p style={{ fontSize: 7 }} className="text-gusring-text-hint font-bold">처리기간</p>
          <p style={{ fontSize: 9 }} className="text-gusring-text font-black">즉시</p>
        </div>
      </div>

      {/* 서식번호 & 카테고리 뱃지 */}
      <div className="flex justify-between items-center px-4 py-1.5 bg-gusring-yellow-soft border-b border-amber-100">
        <span style={{ fontSize: 9 }} className="text-amber-700 font-bold">
          서식 No. {String(form.id).padStart(3, '0')}
        </span>
        <span style={{ fontSize: 9 }} className="text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
          {form.cat}
        </span>
      </div>

      {/* 입력 필드 */}
      <div className="px-4 py-4 space-y-3">
        {fields.map(([label, minWidth], i) => (
          <div key={i} className="flex items-end gap-3">
            <span
              style={{ fontSize: 10, minWidth: `${Math.max(minWidth, 64)}px` }}
              className="text-gusring-text-sub font-bold shrink-0 pb-1 leading-tight"
            >
              {label}
            </span>
            <div className="flex-1 border-b border-gusring-border-strong" />
          </div>
        ))}

        {/* 날인 구역 */}
        <div className="flex justify-between items-end mt-4 pt-3 border-t border-dashed border-gusring-border">
          <p style={{ fontSize: 9 }} className="text-gusring-text-hint">
            위와 같이 신고합니다.<br />
            <span className="text-gusring-text-sub font-bold">금천구청장 귀중</span>
          </p>
          <div className="flex gap-3">
            {(['신고인', '대리인'] as const).map((label) => (
              <div key={label} className="text-center">
                <div className="w-11 h-11 border-2 border-dashed border-gusring-border rounded-full flex items-center justify-center mb-1 bg-gusring-bg">
                  <span style={{ fontSize: 8 }} className="text-gusring-text-hint font-bold">날인</span>
                </div>
                <p style={{ fontSize: 8 }} className="text-gusring-text-hint font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 담당자 결재란 */}
      <div className="border-t border-gusring-border bg-gusring-bg">
        <div className="flex">
          {(['접수', '담당', '확인', '결재'] as const).map((label) => (
            <div key={label} className="flex-1 border-r border-gusring-border last:border-r-0 py-2 text-center">
              <p style={{ fontSize: 8 }} className="text-gusring-text-hint font-bold mb-1">{label}</p>
              <div className="h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormMockPreview;
