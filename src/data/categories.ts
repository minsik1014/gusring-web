import { CategoryKey, I18nString } from '../types';

export const categories: Record<CategoryKey, I18nString> = {
  FAMILY:    { ko: '가족관계', en: 'Family',       zh: '家庭', ja: '家族', vi: 'Gia đình'   },
  CERT:      { ko: '증명서',   en: 'Certificates', zh: '证明', ja: '証明', vi: 'Chứng nhận' },
  RESIDENCE: { ko: '체류/주거', en: 'Residence',   zh: '居住', ja: '居住', vi: 'Cư trú'     },
  ID_SEAL:   { ko: '신분/인감', en: 'ID/Seal',     zh: '身份', ja: '身分', vi: 'Căn cước'   },
  VEHICLE:   { ko: '차량/이륜차', en: 'Vehicle',   zh: '车辆', ja: '車両', vi: 'Xe cộ'      },
};
