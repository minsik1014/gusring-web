import { CategoryKey, I18nString } from '../types';

/**
 * 서식 핫스팟 정의
 * x, y: FormMockPreview 컨테이너 기준 % 좌표
 * 실제 PNG 연동 시 좌표만 교체하면 됩니다.
 */
export interface Hotspot {
  id: number;
  x: number;   // 왼쪽에서 %
  y: number;   // 위쪽에서 %
  title: I18nString;
  desc:  I18nString;
}

export const hotspotsByCategory: Record<CategoryKey, Hotspot[]> = {

  FAMILY: [
    {
      id: 1, x: 72, y: 24,
      title: { ko: '성명 (Name)', en: 'Name', zh: '姓名', ja: '氏名', vi: 'Họ và tên' },
      desc: {
        ko: '신분증(외국인등록증 또는 여권)에 기재된 영문·한글 성명을 동일하게 작성하세요.',
        en: 'Write your name exactly as shown on your ID (alien registration card or passport) in English and Korean.',
        zh: '请与身份证（外国人登录证或护照）上记载的英文、韩文姓名完全一致。',
        ja: '身分証（外国人登録証またはパスポート）に記載された英文・ハングルの氏名を同じように記入してください。',
        vi: 'Viết tên bằng tiếng Anh và tiếng Hàn giống hệt như trên thẻ căn cước hoặc hộ chiếu.',
      },
    },
    {
      id: 2, x: 72, y: 38,
      title: { ko: '생년월일 (Date of Birth)', en: 'Date of Birth', zh: '出生年月日', ja: '生年月日', vi: 'Ngày sinh' },
      desc: {
        ko: '주민등록번호 앞 6자리가 생년월일입니다. 외국인은 외국인등록번호를 기재하세요.',
        en: 'The first 6 digits of your resident registration number indicate your date of birth. Foreigners should write their alien registration number.',
        zh: '居民登记号前6位为出生年月日。外国人请填写外国人登记号。',
        ja: '住民登録番号の最初の6桁が生年月日です。外国人は外国人登録番号を記入してください。',
        vi: '6 chữ số đầu của số đăng ký thường trú là ngày sinh. Người nước ngoài ghi số đăng ký người nước ngoài.',
      },
    },
    {
      id: 3, x: 72, y: 52,
      title: { ko: '등록기준지', en: 'Permanent Domicile', zh: '登记基准地', ja: '登録基準地', vi: 'Địa chỉ đăng ký gốc' },
      desc: {
        ko: '가족관계등록부상의 등록기준지를 기재합니다. 처음 창설하는 경우 본인이 원하는 주소를 기재할 수 있습니다.',
        en: 'Write the permanent domicile address on your family register. For a new register, you may choose any address.',
        zh: '填写家庭关系登记上的登记基准地。首次创建时，可填写本人希望的地址。',
        ja: '家族関係登録簿上の登録基準地を記入します。新規創設の場合は、ご本人が希望する住所を記入できます。',
        vi: 'Ghi địa chỉ đăng ký gốc trong sổ hộ tịch. Khi lập mới, có thể ghi địa chỉ mong muốn.',
      },
    },
    {
      id: 4, x: 72, y: 66,
      title: { ko: '주소 (Address)', en: 'Current Address', zh: '现住所', ja: '現住所', vi: 'Địa chỉ hiện tại' },
      desc: {
        ko: '현재 거주 중인 도로명 주소를 기재하세요. 금천구 관내 주소인지 확인하세요.',
        en: 'Write your current road-name address. Make sure it is within Geumcheon-gu.',
        zh: '请填写目前居住的道路名地址。请确认是否为衿川区管辖内地址。',
        ja: '現在居住している道路名住所を記入してください。衿川区管内の住所であることを確認してください。',
        vi: 'Ghi địa chỉ theo tên đường hiện tại. Kiểm tra xem có trong phạm vi quận Geumcheon không.',
      },
    },
    {
      id: 5, x: 72, y: 84,
      title: { ko: '신고인 (Declarer)', en: 'Declarer', zh: '申报人', ja: '申告人', vi: 'Người khai báo' },
      desc: {
        ko: '신고인의 성명을 쓰고 서명 또는 날인하세요. 신고인 자격(본인/배우자/직계혈족 등)을 체크하세요.',
        en: 'Write the declarer\'s name and sign or stamp. Check the declarer\'s qualification (self/spouse/lineal blood relation, etc.).',
        zh: '填写申报人姓名并签名或盖章。请勾选申报人资格（本人/配偶/直系血亲等）。',
        ja: '申告人の氏名を記入し、署名または押印してください。申告人の資格（本人/配偶者/直系血族など）をチェックしてください。',
        vi: 'Viết tên người khai báo và ký tên hoặc đóng dấu. Đánh dấu tư cách người khai báo (bản thân/vợ chồng/huyết thống trực hệ, v.v.).',
      },
    },
  ],

  CERT: [
    {
      id: 1, x: 70, y: 22,
      title: { ko: '신청인 성명', en: 'Applicant Name', zh: '申请人姓名', ja: '申請人氏名', vi: 'Tên người nộp đơn' },
      desc: {
        ko: '신분증에 기재된 성명을 정확히 기재하세요.',
        en: 'Write your name exactly as it appears on your ID.',
        zh: '请准确填写身份证上的姓名。',
        ja: '身分証に記載された氏名を正確に記入してください。',
        vi: 'Ghi chính xác tên như trên thẻ căn cước.',
      },
    },
    {
      id: 2, x: 70, y: 38,
      title: { ko: '주민등록번호', en: 'Resident Registration No.', zh: '居民登记号', ja: '住民登録番号', vi: 'Số đăng ký thường trú' },
      desc: {
        ko: '주민등록번호 또는 외국인등록번호를 기재하세요. 앞 6자리-뒤 7자리 형식으로 작성합니다.',
        en: 'Write your resident or alien registration number in the format: 6 digits - 7 digits.',
        zh: '请填写居民登记号或外国人登记号。格式为前6位-后7位。',
        ja: '住民登録番号または外国人登録番号を記入してください。前6桁-後7桁の形式で記入します。',
        vi: 'Ghi số đăng ký thường trú hoặc số đăng ký người nước ngoài. Định dạng: 6 chữ số - 7 chữ số.',
      },
    },
    {
      id: 3, x: 70, y: 54,
      title: { ko: '신청목적', en: 'Purpose', zh: '申请目的', ja: '申請目的', vi: 'Mục đích' },
      desc: {
        ko: '증명서 발급 목적을 간략히 기재하세요. (예: 금융기관 제출, 비자 신청 등)',
        en: 'Briefly state the purpose of the certificate. (e.g., submission to financial institution, visa application)',
        zh: '请简要填写证明书发行目的。（例：提交金融机构、申请签证等）',
        ja: '証明書発行目的を簡単に記入してください。（例：金融機関提出、ビザ申請など）',
        vi: 'Ghi ngắn gọn mục đích cấp giấy chứng nhận. (Ví dụ: nộp cho tổ chức tài chính, xin visa, v.v.)',
      },
    },
    {
      id: 4, x: 70, y: 70,
      title: { ko: '발급 통수', en: 'No. of Copies', zh: '份数', ja: '発行通数', vi: 'Số bản' },
      desc: {
        ko: '필요한 부수를 숫자로 기재하세요. 1통 이상 신청 가능합니다.',
        en: 'Write the number of copies needed. You may request more than one.',
        zh: '请用数字填写所需份数。可申请1份以上。',
        ja: '必要な部数を数字で記入してください。1部以上申請可能です。',
        vi: 'Ghi số bản cần thiết bằng số. Có thể yêu cầu từ 1 bản trở lên.',
      },
    },
  ],

  RESIDENCE: [
    {
      id: 1, x: 70, y: 22,
      title: { ko: '성명 (Name)', en: 'Name', zh: '姓名', ja: '氏名', vi: 'Họ và tên' },
      desc: {
        ko: '신분증에 기재된 성명을 기재하세요.',
        en: 'Write your name as shown on your ID.',
        zh: '填写身份证上的姓名。',
        ja: '身分証に記載された氏名を記入してください。',
        vi: 'Ghi tên như trên thẻ căn cước.',
      },
    },
    {
      id: 2, x: 70, y: 36,
      title: { ko: '현 주소 (Current Address)', en: 'Current Address', zh: '现住所', ja: '現住所', vi: 'Địa chỉ hiện tại' },
      desc: {
        ko: '현재 거주 중인 도로명 주소 전체를 기재하세요. (동·호수 포함)',
        en: 'Write your full current road-name address including unit number.',
        zh: '请填写目前居住的完整道路名地址（包括门牌号）。',
        ja: '現在居住している道路名住所の全体を記入してください。（部屋番号含む）',
        vi: 'Ghi đầy đủ địa chỉ theo tên đường hiện tại, kể cả số phòng.',
      },
    },
    {
      id: 3, x: 70, y: 50,
      title: { ko: '이전 주소 (Previous Address)', en: 'Previous Address', zh: '原住所', ja: '旧住所', vi: 'Địa chỉ cũ' },
      desc: {
        ko: '이사 전 살았던 주소를 기재하세요. 전입 이전의 주소를 도로명 주소로 기재합니다.',
        en: 'Write the address where you previously lived using the road-name address format.',
        zh: '填写搬家前居住的地址，使用道路名地址格式。',
        ja: '引越し前に住んでいた住所を道路名住所で記入してください。',
        vi: 'Ghi địa chỉ đã sống trước khi chuyển đến, theo định dạng địa chỉ tên đường.',
      },
    },
    {
      id: 4, x: 70, y: 64,
      title: { ko: '이전일자 (Move-in Date)', en: 'Move-in Date', zh: '迁入日期', ja: '転入日', vi: 'Ngày chuyển đến' },
      desc: {
        ko: '실제로 이사한 날짜를 기재하세요. 전입신고는 이사한 날로부터 14일 이내에 해야 합니다.',
        en: 'Write the actual date you moved in. You must report within 14 days of moving.',
        zh: '填写实际搬家的日期。迁入申报须在搬家之日起14日内完成。',
        ja: '実際に引越した日付を記入してください。転入届は引越し日から14日以内に行う必要があります。',
        vi: 'Ghi ngày thực tế chuyển đến. Phải khai báo trong vòng 14 ngày kể từ ngày chuyển đến.',
      },
    },
    {
      id: 5, x: 70, y: 78,
      title: { ko: '세대주 (Head of Household)', en: 'Head of Household', zh: '户主', ja: '世帯主', vi: 'Chủ hộ' },
      desc: {
        ko: '해당 주소의 세대주 성명과 신고인과의 관계를 기재하세요.',
        en: 'Write the name of the head of household at that address and your relationship to them.',
        zh: '填写该地址户主的姓名及与申报人的关系。',
        ja: 'その住所の世帯主氏名と申告人との関係を記入してください。',
        vi: 'Ghi tên chủ hộ tại địa chỉ đó và mối quan hệ với người khai báo.',
      },
    },
  ],

  ID_SEAL: [
    {
      id: 1, x: 70, y: 22,
      title: { ko: '성명 (Name)', en: 'Name', zh: '姓名', ja: '氏名', vi: 'Họ và tên' },
      desc: {
        ko: '주민등록증에 기재된 성명을 정확히 기재하세요.',
        en: 'Write your name exactly as shown on your resident registration card.',
        zh: '请准确填写居民登录证上的姓名。',
        ja: '住民登録証に記載された氏名を正確に記入してください。',
        vi: 'Ghi chính xác tên như trên thẻ đăng ký thường trú.',
      },
    },
    {
      id: 2, x: 70, y: 36,
      title: { ko: '주민등록번호', en: 'Resident Registration No.', zh: '居民登记号', ja: '住民登録番号', vi: 'Số ĐKTT' },
      desc: {
        ko: '주민등록번호 13자리를 기재하세요. 외국인의 경우 외국인등록번호를 기재합니다.',
        en: 'Write your 13-digit resident registration number. Foreigners write their alien registration number.',
        zh: '请填写13位居民登记号。外国人填写外国人登记号。',
        ja: '住民登録番号13桁を記入してください。外国人は外国人登録番号を記入します。',
        vi: 'Ghi số đăng ký thường trú 13 chữ số. Người nước ngoài ghi số đăng ký người nước ngoài.',
      },
    },
    {
      id: 3, x: 70, y: 50,
      title: { ko: '신고사유 (Reason)', en: 'Reason for Report', zh: '申报原因', ja: '申告事由', vi: 'Lý do khai báo' },
      desc: {
        ko: '인감 신고/변경/분실 등 사유를 구체적으로 기재하세요.',
        en: 'Specifically state the reason: new registration, change, or loss of seal.',
        zh: '请具体填写印鉴申报/变更/遗失等原因。',
        ja: '印鑑申告/変更/紛失などの事由を具体的に記入してください。',
        vi: 'Ghi cụ thể lý do: đăng ký mới, thay đổi, hoặc mất con dấu.',
      },
    },
    {
      id: 4, x: 70, y: 64,
      title: { ko: '인감날인', en: 'Seal Impression', zh: '印鉴盖章', ja: '印鑑押印', vi: 'Đóng dấu' },
      desc: {
        ko: '등록하려는 인감을 해당 칸에 선명하게 날인하세요. 번지거나 흐릿한 경우 재작성해야 합니다.',
        en: 'Clearly stamp the seal you wish to register. Smudged or unclear impressions must be redone.',
        zh: '请在指定栏内清晰地盖上要登记的印鉴。如有模糊须重新填写。',
        ja: '登録したい印鑑を該当欄に鮮明に押印してください。にじんだり不鮮明な場合は再作成が必要です。',
        vi: 'Đóng dấu rõ ràng vào ô quy định. Nếu bị nhòe hoặc mờ, phải làm lại.',
      },
    },
  ],

  VEHICLE: [
    {
      id: 1, x: 70, y: 22,
      title: { ko: '차종 (Vehicle Type)', en: 'Vehicle Type', zh: '车种', ja: '車種', vi: 'Loại xe' },
      desc: {
        ko: '차량 등록증에 기재된 차종을 기재하세요. (예: 승용차, 승합차, 화물차)',
        en: 'Write the vehicle type as shown on the vehicle registration. (e.g., sedan, van, truck)',
        zh: '填写车辆登记证上的车种。（例：轿车、厢式货车、卡车）',
        ja: '車両登録証に記載された車種を記入してください。（例：乗用車、バン、トラック）',
        vi: 'Ghi loại xe như trên giấy đăng ký xe. (Ví dụ: xe con, xe van, xe tải)',
      },
    },
    {
      id: 2, x: 70, y: 36,
      title: { ko: '차량번호 (License Plate)', en: 'License Plate No.', zh: '车牌号', ja: 'ナンバープレート', vi: 'Biển số xe' },
      desc: {
        ko: '차량번호판에 표시된 번호를 정확히 기재하세요.',
        en: 'Write the license plate number exactly as shown on the plate.',
        zh: '请准确填写车牌上显示的号码。',
        ja: 'ナンバープレートに表示された番号を正確に記入してください。',
        vi: 'Ghi chính xác số trên biển số xe.',
      },
    },
    {
      id: 3, x: 70, y: 50,
      title: { ko: '소유자 (Owner)', en: 'Owner', zh: '所有人', ja: '所有者', vi: 'Chủ sở hữu' },
      desc: {
        ko: '차량 등록증상 소유자 성명과 주민등록번호를 기재하세요.',
        en: 'Write the owner\'s name and resident registration number as shown on the vehicle registration.',
        zh: '填写车辆登记证上所有人的姓名和居民登记号。',
        ja: '車両登録証に記載された所有者氏名と住民登録番号を記入してください。',
        vi: 'Ghi tên chủ sở hữu và số đăng ký thường trú như trên giấy đăng ký xe.',
      },
    },
    {
      id: 4, x: 70, y: 64,
      title: { ko: '양도일자 (Transfer Date)', en: 'Transfer Date', zh: '转让日期', ja: '譲渡日', vi: 'Ngày chuyển nhượng' },
      desc: {
        ko: '실제 차량을 양도한 날짜를 기재하세요. 양도일로부터 15일 이내에 신고해야 합니다.',
        en: 'Write the actual date of vehicle transfer. You must report within 15 days.',
        zh: '填写实际转让车辆的日期。须在转让之日起15日内申报。',
        ja: '実際に車両を譲渡した日付を記入してください。譲渡日から15日以内に申告する必要があります。',
        vi: 'Ghi ngày thực tế chuyển nhượng xe. Phải khai báo trong vòng 15 ngày.',
      },
    },
    {
      id: 5, x: 70, y: 78,
      title: { ko: '서명 (Signature)', en: 'Signature', zh: '签名', ja: '署名', vi: 'Chữ ký' },
      desc: {
        ko: '양도인과 양수인 모두 서명 또는 날인해야 합니다.',
        en: 'Both the transferor and transferee must sign or stamp.',
        zh: '转让人和受让人均须签名或盖章。',
        ja: '譲渡人と譲受人の両方が署名または押印する必要があります。',
        vi: 'Cả người chuyển nhượng và người nhận đều phải ký tên hoặc đóng dấu.',
      },
    },
  ],
};
