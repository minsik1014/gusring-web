import { GuideStep, I18nString } from '../types';

// ── UI 문자열 ───────────────────────────────────────────────
export const UIStrings: Record<string, I18nString> = {
  landing:          { ko: '언어를 선택해주세요',                  en: 'Select your language',               zh: '请选择语言',         ja: '言語を選択してください',       vi: 'Vui lòng chọn ngôn ngữ'           },
  welcome:          { ko: '금천구 다국어 민원 가이드',            en: 'Geumcheon Multilingual Guide',       zh: '衿川多语种指南',     ja: '衿川多言語ガイド',             vi: 'Hướng dẫn Geumcheon'              },
  subWelcome:       { ko: '41종의 행정 서식을 모국어로 안내합니다.', en: '41 administrative forms in your language.', zh: '用母语提供41种行政表格。', ja: '41種類の行政書類を母国語で案内。', vi: '41 mẫu đơn bằng tiếng mẹ đẻ.'   },
  searchPlaceholder:{ ko: '서식 명칭 검색...',                   en: 'Search forms...',                    zh: '搜索表格...',       ja: '書類検索...',                  vi: 'Tìm kiếm mẫu đơn...'              },
  catAll:           { ko: '전체',                               en: 'All',                                zh: '全部',             ja: '全て',                         vi: 'Tất cả'                           },
  instructionTitle: { ko: '작성 안내',                           en: 'Instructions',                       zh: '指南',             ja: '案内',                         vi: 'Hướng dẫn'                        },
  viewForm:         { ko: '양식 보기',                           en: 'View Form',                          zh: '查看表格',          ja: '様式を見る',                   vi: 'Xem mẫu đơn'                      },
  viewGuide:        { ko: '안내사항 보기',                       en: 'View Instructions',                  zh: '查看说明',          ja: '案内事項を見る',               vi: 'Xem hướng dẫn'                    },
  noGuide:          { ko: '이 언어의 안내 이미지가 없습니다.',   en: 'No guide images for this language.',  zh: '此语言没有说明图片。', ja: 'この言語のガイド画像はありません。', vi: 'Không có hình hướng dẫn cho ngôn ngữ này.' },
  feedback:         { ko: '피드백 보내기',                       en: 'Feedback',                           zh: '反馈',             ja: '感想',                         vi: 'Phản hồi'                         },
  download:         { ko: '서류 양식 다운로드',                  en: 'Download Form',                      zh: '下载表格',          ja: '書類をダウンロード',            vi: 'Tải xuống mẫu đơn'               },
  downloading:      { ko: '다운로드 중...',                      en: 'Downloading...',                     zh: '正在下载...',       ja: 'ダウンロード中...',            vi: 'Đang tải xuống...'               },
  noResult:         { ko: '검색 결과가 없습니다.',               en: 'No results found.',                  zh: '无结果。',          ja: '結果がありません。',            vi: 'Không có kết quả.'               },
  guroOffice:       { ko: '금천구청 민원실 위치',                en: 'Geumcheon-gu Office',                zh: '衿川区厅',          ja: '衿川区役所',                   vi: 'Văn phòng Geumcheon'              },
  aiConsult:        { ko: '상담 AI 연결',                        en: 'Chat with AI',                       zh: '咨询 AI',           ja: 'AI相談',                       vi: 'Tư vấn AI'                        },
  formPreview:      { ko: '서류 미리보기',                       en: 'Form Preview',                       zh: '表格预览',          ja: '書類プレビュー',               vi: 'Xem trước mẫu đơn'               },
  formPreviewNote:  { ko: '예시 이미지입니다 · 실제 서류와 다를 수 있습니다', en: 'Sample preview · Actual form may differ', zh: '仅供参考 · 实际表格可能有差异', ja: 'サンプル表示 · 実際と異なる場合があります', vi: 'Hình mẫu · Mẫu thực tế có thể khác' },
  zoomHint:         { ko: '번호를 탭하면 작성 방법을 볼 수 있어요', en: 'Tap a number to see how to fill in',    zh: '点击编号查看填写方法',  ja: '番号をタップすると記入方法を見られます', vi: 'Nhấn số để xem cách điền'           },
  zoomHintReset:    { ko: '두 번 탭하면 원래 크기로',               en: 'Double-tap to reset zoom',             zh: '双击恢复原始大小',     ja: 'ダブルタップで元のサイズに',           vi: 'Nhấn đúp để đặt lại thu phóng'      },
  zoomReset:        { ko: '초기화',                                en: 'Reset',                                zh: '重置',               ja: 'リセット',                            vi: 'Đặt lại'                             },
  prevItem:         { ko: '이전 항목',                             en: 'Previous',                             zh: '上一项',             ja: '前の項目',                            vi: 'Mục trước'                           },
  nextItem:         { ko: '다음 항목',                             en: 'Next',                                 zh: '下一项',             ja: '次の項目',                            vi: 'Mục tiếp theo'                       },
  guideView:        { ko: '작성 안내사항 보기',                    en: 'View Instructions',                    zh: '查看填写说明',        ja: '記入案内を見る',                       vi: 'Xem hướng dẫn điền'                 },
  fbTitle:          { ko: '피드백',                               en: 'Feedback',                             zh: '反馈',               ja: 'フィードバック',                       vi: 'Phản hồi'                            },
  fbLoading:        { ko: '불러오는 중...',                       en: 'Loading...',                           zh: '加载中...',          ja: '読み込み中...',                        vi: 'Đang tải...'                         },
  fbConnected:      { ko: '연결됨',                               en: 'Connected',                            zh: '已连接',             ja: '接続済み',                            vi: 'Đã kết nối'                          },
  fbDisconnected:   { ko: '미연결',                               en: 'Not connected',                        zh: '未连接',             ja: '未接続',                              vi: 'Chưa kết nối'                        },
  fbEmpty:          { ko: '첫 번째 메시지를 남겨보세요',          en: 'Be the first to leave a message',      zh: '快来留下第一条消息',  ja: '最初のメッセージを残しましょう',       vi: 'Hãy để lại tin nhắn đầu tiên'       },
  fbEmptyDesc:      { ko: '여러분의 솔직한 피드백이 서비스 개선에 큰 힘이 돼요.', en: 'Your honest feedback helps us improve the service.', zh: '您的反馈是我们改进服务的动力。', ja: 'あなたのフィードバックがサービス改善に役立ちます。', vi: 'Phản hồi của bạn giúp chúng tôi cải thiện dịch vụ.' },
  fbWritingIn:      { ko: '로 작성 중',                           en: 'writing in',                           zh: '语撰写中',           ja: 'で作成中',                            vi: 'đang viết bằng'                      },
  fbAnonymous:      { ko: '익명으로 전송됩니다',                  en: 'Sent anonymously',                     zh: '匿名发送',           ja: '匿名で送信されます',                   vi: 'Gửi ẩn danh'                         },
  fbSendHint:       { ko: 'Cmd+Enter로 전송',                    en: 'Cmd+Enter to send',                    zh: 'Cmd+Enter 发送',     ja: 'Cmd+Enterで送信',                      vi: 'Cmd+Enter để gửi'                    },
  fbToday:          { ko: '오늘',                                 en: 'Today',                                zh: '今天',               ja: '今日',                                vi: 'Hôm nay'                             },
  fbYesterday:      { ko: '어제',                                 en: 'Yesterday',                            zh: '昨天',               ja: '昨日',                                vi: 'Hôm qua'                             },
  fbJustNow:        { ko: '방금 전',                              en: 'Just now',                             zh: '刚刚',               ja: 'たった今',                            vi: 'Vừa xong'                            },
};

// ── 작성 안내 단계 ──────────────────────────────────────────
export const guideSteps: GuideStep[] = [
  {
    title: { ko: '인적사항 기재',   en: 'Personal Information', zh: '填写个人信息',  ja: '人的事項の記入',   vi: 'Thông tin cá nhân' },
    desc: {
      ko: '성명은 반드시 신분증(외국인등록증 또는 여권)에 기재된 영문과 한글을 동일하게 작성하세요.',
      en: 'Enter your name exactly as it appears on your ID in English and Korean.',
      zh: '姓名必须与身份证上记载的英文和韩文一致。',
      ja: '姓名は必ず身分証に記載された英文とハングルを同一に記入してください。',
      vi: 'Tên phải được viết giống hệt như trên thẻ căn cước.',
    },
  },
  {
    title: { ko: '주소지 확인',    en: 'Address Verification', zh: '确认住所地',    ja: '住所地の確認',     vi: 'Xác nhận địa chỉ' },
    desc: {
      ko: '현재 거주 중인 금천구 관내 주소를 도로명 주소로 기재해 주세요.',
      en: 'Please provide your current road name address within Geumcheon-gu.',
      zh: '请用道路名地址填写目前居住的衿川区管辖内的地址。',
      ja: '現在居住している衿川区管内の住所を道路名住所で記入してください。',
      vi: 'Vui lòng ghi địa chỉ cư trú hiện tại trong quận Geumcheon.',
    },
  },
  {
    title: { ko: '제출 서류 체크', en: 'Required Documents',   zh: '检查提交材料',  ja: '提出書類のチェック', vi: 'Kiểm tra hồ sơ' },
    desc: {
      ko: '작성 완료 후 외국인등록증 사본 등 필요한 구비서류가 모두 있는지 확인하세요.',
      en: 'Check if you have all required documents after completion.',
      zh: '填写完成后, 请确认所需必备材料是否齐全。',
      ja: '作成完了後、必要な書類がすべて揃っているか確認してください。',
      vi: 'Kiểm tra xem bạn đã có đầy đủ các giấy tờ cần thiết chưa.',
    },
  },
];
