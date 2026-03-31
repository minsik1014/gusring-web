import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  Globe,
  FileText,
  ChevronRight,
  ArrowLeft,
  Info,
  Search,
  MessageCircle,
  MapPin,
  Menu,
  X,
  Download,
  Share2
} from 'lucide-react';

// 다국어 언어 설정
const languages = [
  { id: 'ko', label: '한국어', icon: '🇰🇷' },
  { id: 'en', label: 'English', icon: '🇺🇸' },
  { id: 'zh', label: '中文', icon: '🇨🇳' },
  { id: 'ja', label: '日本語', icon: '🇯🇵' },
  { id: 'vi', label: 'Tiếng Việt', icon: '🇻🇳' },
];

// 카테고리 설정
const categories = {
  FAMILY: { ko: '가족관계', en: 'Family', zh: '家庭', ja: '家族', vi: 'Gia đình' },
  CERT: { ko: '증명서', en: 'Certificates', zh: '证明', ja: '証明', vi: 'Chứng nhận' },
  RESIDENCE: { ko: '체류/주거', en: 'Residence', zh: '居住', ja: '居住', vi: 'Cư trú' },
  ID_SEAL: { ko: '신분/인감', en: 'ID/Seal', zh: '身份', ja: '身分', vi: 'Căn cước' },
  VEHICLE: { ko: '차량/이륜차', en: 'Vehicle', zh: '车辆', ja: '車両', vi: 'Xe cộ' }
};

// ─────────────────────────────────────────────────────────────
// 41종 서식 데이터베이스
// 수정 사항:
//   - 일본어 설명 마침표: 데바나가리 문자(।) → 일본어 마침표(。)
//   - id 4  zh 설명: 말미 '개인정보' 제거
//   - id 5  ja 설명: 한국어 조사 '를' → 'を'
//   - id 5  vi 설명: 한국어 '및' → 'và'
//   - id 13 vi 설명: 한국어 '및' → 'và'
//   - id 17 ja 제목: 한국어 '기본' → '基本'
//   - id 20 vi 설명: 한국어 '및' → 'và'
// ─────────────────────────────────────────────────────────────
const formsList = [
  {
    id: 1, cat: 'FAMILY',
    title: { ko: '가족관계등록 창설신고서', en: 'Family Register Creation Report', zh: '家族关系登记创立申报书', ja: '家族関係登録創設届', vi: 'Đơn báo cáo lập đăng ký quan hệ gia đình' },
    desc:  { ko: '가족관계등록부가 없는 사람이 새로 등록을 만들 때 사용합니다.', en: 'Used to create a new family register.', zh: '没有家族关系登记簿的人重新登记时使用。', ja: '家族関係登録簿がない人が新しく登録を作る時に使用します。', vi: 'Sử dụng cho người chưa có sổ đăng ký quan hệ gia đình để lập mới.' }
  },
  {
    id: 2, cat: 'FAMILY',
    title: { ko: '사망신고서', en: 'Death Report', zh: '死亡申报书', ja: '死亡届', vi: 'Giấy báo tử' },
    desc:  { ko: '가족이나 친족이 사망했을 때 관할 기관에 알리는 서류입니다.', en: "A document to notify authorities of a family member's death.", zh: '家属或亲属死亡时向管辖机构报告的文件。', ja: '家族や親族が死亡した時に管轄機関に知らせる書類です。', vi: 'Văn bản thông báo khi có thành viên trong gia đình qua đời.' }
  },
  {
    id: 3, cat: 'FAMILY',
    title: { ko: '인지(친권자 지정)신고서', en: 'Acknowledgment Report', zh: '认知申报书', ja: '認知届', vi: 'Đơn báo cáo nhận con' },
    desc:  { ko: '혼인 외의 자녀를 자신의 자식으로 인정할 때 제출합니다.', en: "Submitted to acknowledge a child born out of wedlock as one's own.", zh: '承认婚姻以外的子女为自己的子女时提交。', ja: '婚姻外の子を自分の子として認める時に提出します。', vi: 'Nộp để công nhận con ngoài giá thú là con của mình.' }
  },
  {
    id: 4, cat: 'FAMILY',
    title: { ko: '출생신고서', en: 'Birth Report', zh: '出生申报书', ja: '出生届', vi: 'Giấy khai sinh' },
    // [수정] zh 설명 말미의 '개인정보' 제거
    desc:  { ko: '자녀가 태어난 후 법적 등록을 위해 작성하는 신고서입니다.', en: 'A report to legally register a child after birth.', zh: '孩子出生后为了法律登记而填写的申报书。', ja: '子供が生まれた後、法的登録のために作成する届出書です。', vi: 'Đơn đăng ký hợp pháp cho trẻ sau khi sinh.' }
  },
  {
    id: 5, cat: 'FAMILY',
    title: { ko: '파양신고서', en: 'Dissolution of Adoption', zh: '罢养申报书', ja: '離縁届', vi: 'Đơn báo cáo chấm dứt nhận nuôi' },
    // [수정] ja '를' → 'を' / vi '및' → 'và'
    desc:  { ko: '입양된 자녀와 양부모 사이의 법적 관계를 해소할 때 사용합니다.', en: 'Used to terminate the legal relationship of adoption.', zh: '解除领养子女与养父母之间的法律关系时使用。', ja: '養子と養親の間の法的関係を解消する時に使用します。', vi: 'Dùng để chấm dứt quan hệ pháp lý giữa con nuôi và cha mẹ nuôi.' }
  },
  {
    id: 6, cat: 'FAMILY',
    title: { ko: '개명신고서', en: 'Name Change Report', zh: '改名申报书', ja: '改名届', vi: 'Đơn báo cáo đổi tên' },
    desc:  { ko: '법원의 허가를 받아 이름을 공식적으로 바꿀 때 제출합니다.', en: "Submitted to officially change one's name with court approval.", zh: '获得法院许可正式改名时提交。', ja: '裁判所の許可を得て名前を公式に変える時に提出します。', vi: 'Nộp để chính thức đổi tên sau khi được tòa án cho phép.' }
  },
  {
    id: 7, cat: 'FAMILY',
    title: { ko: '성본 변경 신고서', en: 'Surname Change Report', zh: '姓本变更申报书', ja: '姓本変更届', vi: 'Đơn báo cáo thay đổi họ' },
    desc:  { ko: '자녀의 성과 본을 변경하기 위해 작성하는 서류입니다.', en: "Document to change a child's surname and origin.", zh: '为了变更子女的姓和本而填写的材料。', ja: '子の氏と本を変更するために作成する書類です。', vi: 'Văn bản dùng để thay đổi họ và nguồn gốc của con.' }
  },
  {
    id: 8, cat: 'FAMILY',
    title: { ko: '입양신고서', en: 'Adoption Report', zh: '收养申报书', ja: '養子縁組届', vi: 'Giấy đăng ký nhận con nuôi' },
    desc:  { ko: '법적으로 자녀를 입양하여 부모-자식 관계를 맺을 때 사용합니다.', en: 'Used to legally adopt a child.', zh: '法律上收养子女并建立父母子女关系时使用。', ja: '法的に子を養子にし、親子関係を結ぶ時に使用します。', vi: 'Sử dụng khi nhận con nuôi hợp pháp.' }
  },
  {
    id: 9, cat: 'FAMILY',
    title: { ko: '친양자 파양신고서', en: 'Full Adoption Dissolution', zh: '亲养子罢养申报书', ja: '特別養子離縁届', vi: 'Đơn chấm dứt nhận nuôi đặc biệt' },
    desc:  { ko: '친양자 관계를 법적으로 해소하기 위해 작성합니다.', en: 'Written to legally dissolve a full adoption relationship.', zh: '为了法律上解除亲养子关系而填写。', ja: '特別養子関係を法的に解消するために作成します。', vi: 'Dùng để chấm dứt quan hệ con nuôi đặc biệt về mặt pháp lý.' }
  },
  {
    id: 10, cat: 'FAMILY',
    title: { ko: '혼인신고서', en: 'Marriage Report', zh: '婚姻申报书', ja: '婚姻届', vi: 'Giấy đăng ký kết hôn' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '법적으로 부부가 되었음을 공인받기 위해 제출하는 서류입니다.', en: 'Submitted to be officially recognized as a married couple.', zh: '为了获得法律上成为夫妇的公认而提交的文件。', ja: '法的に夫婦になったことを公認されるために提出する書類です。', vi: 'Văn bản nộp để được công nhận là vợ chồng hợp pháp.' }
  },
  {
    id: 11, cat: 'FAMILY',
    title: { ko: '등록부정정신청서', en: 'Register Correction', zh: '登记簿更正申请', ja: '登録簿訂正申請', vi: 'Đơn xin đính chính đăng ký' },
    desc:  { ko: '가족관계등록부의 잘못된 기재 내용을 수정할 때 사용합니다.', en: 'Used to correct errors in the register.', zh: '修正家族关系登记簿中错误的记载内容时使用。', ja: '家族関係登録簿の誤った記載内容を修正する時に使用します。', vi: 'Sử dụng để sửa các nội dung ghi sai trong sổ đăng ký.' }
  },
  {
    id: 12, cat: 'FAMILY',
    title: { ko: '이혼신고서', en: 'Divorce Report', zh: '离婚申报书', ja: '離婚届', vi: 'Giấy báo ly hôn' },
    desc:  { ko: '법적 혼인 관계를 해소했음을 신고하는 서류입니다.', en: 'Document reporting the dissolution of a legal marriage.', zh: '申报法律婚姻关系已解除的文件。', ja: '法的婚姻関係を解消したことを届け出る書類です。', vi: 'Văn bản báo cáo việc chấm dứt quan hệ hôn nhân hợp pháp.' }
  },
  {
    id: 13, cat: 'FAMILY',
    title: { ko: '창성신고서', en: 'Surname Creation', zh: '创姓申报书', ja: '創姓届', vi: 'Đơn báo cáo lập họ' },
    // [수정] vi '및' → 'và'
    desc:  { ko: '새로운 성(姓)을 만들어 등록할 때 제출합니다.', en: 'Submitted when creating and registering a new surname.', zh: '创立并登记新姓氏时提交。', ja: '新しい氏を作って登録する時に提出します。', vi: 'Nộp khi tạo và đăng ký một họ mới.' }
  },
  {
    id: 14, cat: 'FAMILY',
    title: { ko: '친양자 입양신고서', en: 'Full Adoption Report', zh: '亲养子收养申报', ja: '特別養子縁組届', vi: 'Đăng ký nhận con nuôi đặc biệt' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '친생자와 동일한 권리를 갖는 친양자를 입양할 때 사용합니다.', en: 'Used for full adoption giving same rights as biological children.', zh: '收养与亲生子女具有相同法律权利的亲养子时使用。', ja: '実子と同一の法的権利を持つ特別養子を縁組する時に使用します。', vi: 'Sử dụng khi nhận con nuôi đặc biệt.' }
  },
  {
    id: 15, cat: 'FAMILY',
    title: { ko: '혼인신고시 자녀의 성과 본 협의', en: 'Agreement on Child Surname', zh: '婚姻申报时姓本协议', ja: '婚姻届出時の氏本協議', vi: 'Thỏa thuận về họ của con' },
    desc:  { ko: '혼인 시 장래 자녀의 성을 어머니의 성으로 따르기로 할 때 작성합니다.', en: "Agreed to follow the mother's surname for future children.", zh: '结婚时协议未来子女随母姓时填写。', ja: '婚姻時、将来の子の氏を母の氏に従うことに合意した時に作成します。', vi: 'Lập khi kết hôn nếu thỏa thuận con cái sẽ theo họ mẹ.' }
  },
  {
    id: 16, cat: 'CERT',
    title: { ko: '가족관계증명서', en: 'Family Relation Certificate', zh: '家族关系证明书', ja: '家族関係証明書', vi: 'Giấy chứng nhận quan hệ gia đình' },
    desc:  { ko: '부모, 배우자, 자녀 등 가족 구성원을 증명하는 서류입니다.', en: 'Proves family members (parents, spouse, children).', zh: '证明父母、配偶、子女等家庭成员的文件。', ja: '両親、配偶者、子供など家族構成員を証明する書類です。', vi: 'Giấy tờ chứng minh các thành viên trong gia đình.' }
  },
  {
    id: 17, cat: 'CERT',
    // [수정] ja 제목 '기본証明書' → '基本証明書'
    title: { ko: '기본증명서', en: 'Basic Certificate', zh: '基本证明书', ja: '基本証明書', vi: 'Giấy chứng nhận cơ bản' },
    desc:  { ko: '본인의 출생, 개명 등 기본적인 사항을 증명합니다.', en: 'Proves basic personal info such as birth and name change.', zh: '证明本人出生、改名等基本身份事项的文件。', ja: '本人の出生、改名など基本的な身分事項を証明する書類です。', vi: 'Giấy tờ chứng minh ngày sinh, đổi tên.' }
  },
  {
    id: 18, cat: 'CERT',
    title: { ko: '입양관계증명서', en: 'Adoption Certificate', zh: '收养关系证明书', ja: '養子縁組関係証明書', vi: 'Giấy chứng nhận quan hệ nuôi con' },
    desc:  { ko: '일반 입양 사실을 증명하는 서류를 신청할 때 사용합니다.', en: 'Used to prove general adoption facts.', zh: '证明一般收养事实的文件。', ja: '一般養子縁組の事実を証明する書類です。', vi: 'Giấy tờ chứng minh việc nhận con nuôi thông thường.' }
  },
  {
    id: 19, cat: 'CERT',
    title: { ko: '친양자입양관계증명서', en: 'Full Adoption Certificate', zh: '亲养子收养证明书', ja: '特別養子縁組証明書', vi: 'Giấy chứng nhận nuôi con đặc biệt' },
    desc:  { ko: '친양자 입양 사실을 증명하는 서류를 신청합니다.', en: 'Proves full adoption facts.', zh: '证明亲养子收养事实的文件。', ja: '特別養子縁組の事実を証明する書類です。', vi: 'Giấy tờ chứng minh việc nhận con nuôi đặc biệt.' }
  },
  {
    id: 20, cat: 'CERT',
    title: { ko: '혼인관계증명서', en: 'Marriage Certificate', zh: '婚姻关系证明书', ja: '婚姻関係証明書', vi: 'Giấy chứng nhận quan hệ hôn nhân' },
    // [수정] ja 마침표 '।' → '。' / vi '및' → 'và'
    desc:  { ko: '본인의 혼인 및 이혼 여부를 증명하는 서류입니다.', en: 'Proves marriage or divorce status.', zh: '证明本人婚姻及离婚情况的文件。', ja: '本人の婚姻および離婚の有無を証明する書類です。', vi: 'Giấy tờ chứng minh tình trạng hôn nhân và ly hôn.' }
  },
  {
    id: 21, cat: 'RESIDENCE',
    title: { ko: '국내거소이전신고서', en: 'Residence Change Report', zh: '国内住所转移申报', ja: '国内居所移転届', vi: 'Báo cáo chuyển nơi cư trú' },
    desc:  { ko: '국내 거주지를 옮겼을 때 새로운 주소지를 신고합니다.', en: 'Report a new address when moving within Korea.', zh: '国内居住地搬迁时申报新住所。', ja: '国内の居住地を移した時に新しい住所地を届け出ます。', vi: 'Báo cáo địa chỉ mới khi chuyển nơi cư trú trong nước.' }
  },
  {
    id: 22, cat: 'ID_SEAL',
    title: { ko: '인감보호신청/해제신청서', en: 'Seal Protection/Release', zh: '印章保护申请/解除', ja: '印鑑保護申請/解除', vi: 'Đơn xin bảo hộ/hủy ấn dấu' },
    desc:  { ko: '인감 도용 방지를 위해 본인 외 발급을 제한하거나 해제합니다.', en: 'Restrict or release seal issuance to others.', zh: '为防止印章被盗用, 限制或解除发放。', ja: '印鑑の盗用防止のために発行を制限したり解除したりします。', vi: 'Hạn chế hoặc hủy bỏ việc cấp ấn dấu cho người khác.' }
  },
  {
    id: 23, cat: 'FAMILY',
    title: { ko: '정정신고서', en: 'Correction Report', zh: '更正申报书', ja: '訂正届', vi: 'Đơn báo cáo đính chính' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '기존 신고 내용의 오류를 수정할 때 작성합니다.', en: 'Written to correct errors in previous reports.', zh: '之前申报的内容有误需要修正时填写。', ja: '以前の届出内容に誤りがあり、修正が必要な時に作成します。', vi: 'Lập khi cần sửa đổi sai sót trong báo cáo trước đó.' }
  },
  {
    id: 24, cat: 'ID_SEAL',
    title: { ko: '인감(변경)신고서(서면)', en: 'Seal Registration', zh: '印章(变更)申报', ja: '印鑑(変更)届', vi: 'Báo cáo thay đổi ấn dấu' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '새로운 인감을 등록하거나 기존 인감을 변경할 때 사용합니다.', en: 'Used to register or change a personal seal.', zh: '登记新印章或变更现有印章时使用。', ja: '新しい印鑑を登録したり既存の印鑑を変更する時に使用します。', vi: 'Sử dụng khi đăng ký ấn dấu mới.' }
  },
  {
    id: 25, cat: 'ID_SEAL',
    title: { ko: '인감증명 위임장', en: 'POA for Seal Certificate', zh: '印章证明委托书', ja: '印鑑証明委任状', vi: 'Giấy ủy quyền ấn dấu' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '대리인이 인감증명을 발급받을 때 작성합니다.', en: 'Written when a representative gets a seal certificate.', zh: '由代理人领取印章证明时填写。', ja: '代理人が印鑑証明を受け取る時に作成します。', vi: 'Lập khi người đại diện đi lấy chứng nhận ấn dấu.' }
  },
  {
    id: 26, cat: 'ID_SEAL',
    title: { ko: '인감 상태 변경 신고서', en: 'Seal Status Change', zh: '印章状态变更', ja: '印鑑状態変更', vi: 'Báo cáo trạng thái ấn dấu' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '인감의 말소, 부활, 사망 신고 등을 할 때 제출합니다.', en: 'Submitted for cancellation or restoration of a seal.', zh: '进行印章的注销、恢复、死亡申报等。', ja: '印鑑の抹消、復活、死亡届などをする時に提出します。', vi: 'Nộp khi báo cáo hủy hoặc khôi phục ấn dấu.' }
  },
  {
    id: 27, cat: 'RESIDENCE',
    title: { ko: '체류지변경신고서', en: 'Change of Residence', zh: '滞留地变更申报', ja: '滞留地変更届', vi: 'Thay đổi nơi tạm trú' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '외국인이 국내 체류지를 변경했을 때 신고하는 서류입니다.', en: 'For foreigners reporting change of residence in Korea.', zh: '外国人在国内变更滞留地时申报的文件。', ja: '外国人が国内の滞留地を変更した時に届け出る書類です。', vi: 'Báo cáo khi người nước ngoài thay đổi nơi tạm trú.' }
  },
  {
    id: 28, cat: 'RESIDENCE',
    title: { ko: '체류지변경 위임장', en: 'POA for Residence Change', zh: '住所转移委托书', ja: '居所移転委任状', vi: 'Ủy quyền thay đổi cư trú' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '체류지 변경 신고를 대리인에게 위임할 때 작성합니다.', en: 'To delegate residence change reporting to a rep.', zh: '将滞留地变更申报委托给代理人。', ja: '滞留地変更届を代理人に委任する時に作成します。', vi: 'Lập khi ủy quyền báo cáo thay đổi nơi tạm trú.' }
  },
  {
    id: 29, cat: 'CERT',
    title: { ko: '출입국사실증명서', en: 'Entry/Exit Certificate', zh: '出入境事实证明', ja: '出入国事実証明', vi: 'Giấy chứng nhận xuất nhập cảnh' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '일정 기간 동안의 출입국 기록을 증명받기 위해 신청합니다.', en: 'Request to prove entry/exit records.', zh: '证明一定期间内的出入境记录。', ja: '一定期間の出入国記録を証明してもらうために申請します。', vi: 'Xác nhận lịch sử xuất nhập cảnh.' }
  },
  {
    id: 30, cat: 'RESIDENCE',
    title: { ko: '출입국사실증명 위임장', en: 'POA for Entry/Exit Cert', zh: '出入境证明委托', ja: '出入国証明委任', vi: 'Ủy quyền cấp giấy XNC' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '출입국 사실증명서 발급을 대리인에게 맡길 때 작성합니다.', en: 'To delegate entry/exit certificate issuance.', zh: '将出入境事实证明书的发放交给代理人。', ja: '出入国事実証明書の発行を代理人に任せる時に作成します。', vi: 'Ủy quyền lấy giấy chứng nhận xuất nhập cảnh.' }
  },
  {
    id: 31, cat: 'RESIDENCE',
    title: { ko: '주민등록표 신청서', en: 'Resident Register App', zh: '居民登记表申请', ja: '住民登録票申請', vi: 'Đơn cấp bản sao sổ hộ khẩu' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '주민등록 등본이나 초본을 발급받기 위해 신청합니다.', en: 'Request to issue a resident register copy.', zh: '领取居民登记誊本或抄本。', ja: '住民登録の謄本や抄本を発行してもらうために申請します。', vi: 'Đăng ký lấy bản sao sổ hộ khẩu.' }
  },
  {
    id: 32, cat: 'RESIDENCE',
    title: { ko: '주민등록신고서', en: 'Resident Registration', zh: '居民登记申报', ja: '住民登録届', vi: 'Báo cáo đăng ký cư trú' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '전입, 전출 등 주민등록 사항을 신고할 때 사용합니다.', en: 'Used for resident registration like moving in/out.', zh: '申报迁入、迁出等居民登记事项。', ja: '転入、転出など住民登録事項を届け出る時に使用します。', vi: 'Báo cáo các vấn đề đăng ký cư trú.' }
  },
  {
    id: 33, cat: 'ID_SEAL',
    title: { ko: '주민등록증 분실신고서', en: 'Lost ID Card Report', zh: '居民身份证丢失申报', ja: '住民登録証紛失届', vi: 'Báo cáo mất thẻ căn cước' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '주민등록증을 잃어버렸을 때 도용 방지를 위해 신고합니다.', en: 'Report a lost ID card to prevent misuse.', zh: '丢失居民身份证时为防止被盗用而申报。', ja: '住民登録証を紛失した時、盗用防止のために届け出ます。', vi: 'Báo cáo khi mất thẻ căn cước.' }
  },
  {
    id: 34, cat: 'RESIDENCE',
    title: { ko: '주민등록표 발급 위임장', en: 'POA for Resident Register', zh: '居民登记表委托', ja: '住民登録票委任状', vi: 'Ủy quyền cấp sổ hộ khẩu' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '주민등록 등·초본 발급을 대리인에게 위임할 때 작성합니다.', en: 'To delegate resident register issuance.', zh: '将居民登记誊·抄本发放委托给代理人。', ja: '住民登録謄・抄本の発行を代理人に委任する時に作成します。', vi: 'Ủy quyền lấy bản sao sổ hộ khẩu.' }
  },
  {
    id: 35, cat: 'ID_SEAL',
    title: { ko: '주민등록증 발급 신청서', en: 'ID Issuance Application', zh: '居民身份证发放申请', ja: '住民登録証発行申請', vi: 'Đơn xin cấp thẻ căn cước' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '만 17세가 되어 처음 주민등록증을 만들 때 신청합니다.', en: 'Apply for the first ID card at age 17.', zh: '满17岁第一次制作居民身份证时申请。', ja: '満17歳になり、初めて住民登録証を作る時に申請します。', vi: 'Làm thẻ căn cước lần đầu khi đủ 17 tuổi.' }
  },
  {
    id: 36, cat: 'ID_SEAL',
    title: { ko: '주민등록증 재발급 신청서', en: 'ID Re-issuance App', zh: '身份证再发放申请', ja: '住民登録証再発行申請', vi: 'Đơn cấp lại thẻ căn cước' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '분실, 훼손 등으로 주민등록증을 다시 만들 때 신청합니다.', en: 'Apply for ID card re-issuance.', zh: '因丢失、损坏等重新制作居民身份证。', ja: '紛失、毀損などで住民登録証を作り直す時に申請します。', vi: 'Đăng ký làm lại thẻ căn cước.' }
  },
  {
    id: 37, cat: 'VEHICLE',
    title: { ko: '이륜자동차사용신고서', en: 'Motorcycle Registration', zh: '二轮汽车使用申报', ja: '二輪自動車使用届', vi: 'Báo cáo sử dụng xe máy' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '오토바이를 새로 구입하여 신고할 때 제출합니다.', en: 'Submitted to register a new motorcycle.', zh: '新购买摩托车进行使用申报。', ja: 'バイクを新しく購入して使用届を出す時に提出します。', vi: 'Đăng ký sử dụng xe máy mới.' }
  },
  {
    id: 38, cat: 'VEHICLE',
    title: { ko: '이륜자동차사용폐지신고서', en: 'Motorcycle Disuse Report', zh: '二轮汽车废止申报', ja: '二輪自動車使用廃止届', vi: 'Hủy sử dụng xe máy' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '오토바이 사용을 중단하거나 폐기할 때 신고합니다.', en: 'Report stopping or scrapping a motorcycle.', zh: '停止使用或报废摩托车时申报。', ja: 'バイクの使用を中断したり廃棄したりする時に届け出ます。', vi: 'Báo cáo hủy sử dụng xe máy.' }
  },
  {
    id: 39, cat: 'VEHICLE',
    title: { ko: '이륜자동차변경신청서', en: 'Motorcycle Change App', zh: '二轮汽车变更申请', ja: '二輪自動車変更申請', vi: 'Thay đổi báo cáo xe máy' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '오토바이 소유자 정보 등 변경 사항이 있을 때 신청합니다.', en: 'Apply when there are changes in owner info.', zh: '摩托车所有者地址等有变更事项。', ja: 'バイクの所有者の住所など変更がある時に申請します。', vi: 'Thay đổi thông tin báo cáo xe máy.' }
  },
  {
    id: 40, cat: 'VEHICLE',
    title: { ko: '자동차양도증명서', en: 'Vehicle Transfer', zh: '汽车让渡证明', ja: '自動車譲渡証明', vi: 'Chuyển nhượng xe' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '차량을 팔거나 넘길 때 작성하는 계약 서류입니다.', en: 'A contract for selling or transferring a vehicle.', zh: '转让车辆时填写的合同。', ja: '車両を売ったり譲ったりする時に作成する書類です。', vi: 'Hợp đồng chuyển nhượng xe.' }
  },
  {
    id: 41, cat: 'VEHICLE',
    title: { ko: '이륜자동차증서 재교부신청서', en: 'Motorcycle Cert Re-issuance', zh: '二轮汽车证件再交付', ja: '二輪自動車証書再交付', vi: 'Cấp lại giấy xe máy' },
    // [수정] ja 마침표 '।' → '。'
    desc:  { ko: '오토바이 사용신고필증을 잃어버렸을 때 사용합니다.', en: 'Used to re-issue lost registration certificate.', zh: '丢失摩托车证件重新领取。', ja: 'バイクの証書を紛失して再発行してもらう時に使用します。', vi: 'Cấp lại giấy chứng nhận xe máy.' }
  },
];

const guideSteps = {
  step1: {
    title: { ko: '인적사항 기재', en: 'Personal Information', zh: '填写个人信息', ja: '人的事項の記入', vi: 'Thông tin cá nhân' },
    desc: {
      ko: '성명은 반드시 신분증(외국인등록증 또는 여권)에 기재된 영문과 한글을 동일하게 작성하세요.',
      en: 'Enter your name exactly as it appears on your ID in English and Korean.',
      zh: '姓名必须与身份证上记载的英文和韩文一致。',
      ja: '姓名は必ず身分証に記載された英文とハングルを同一に記入してください。',
      vi: 'Tên phải được viết giống hệt như trên thẻ căn cước.'
    }
  },
  step2: {
    title: { ko: '주소지 확인', en: 'Address Verification', zh: '确认住所地', ja: '住所地の確認', vi: 'Xác nhận địa chỉ' },
    desc: {
      ko: '현재 거주 중인 구로구 관내 주소를 도로명 주소로 기재해 주세요.',
      en: 'Please provide your current road name address within Guro-gu.',
      zh: '请用道路名地址填写目前居住的九老区管辖内的地址。',
      ja: '現在居住している九老区管内の住所を道路名住所で記入してください。',
      vi: 'Vui lòng ghi địa chỉ cư trú hiện tại trong quận Guro.'
    }
  },
  step3: {
    title: { ko: '제출 서류 체크', en: 'Required Documents', zh: '检查提交材料', ja: '提出書類のチェック', vi: 'Kiểm tra hồ sơ' },
    desc: {
      ko: '작성 완료 후 외국인등록증 사본 등 필요한 구비서류가 모두 있는지 확인하세요.',
      en: 'Check if you have all required documents after completion.',
      zh: '填写完成后, 请确认所需必备材料是否齐全。',
      ja: '作成完了後、必要な書類がすべて揃っているか確認してください。',
      vi: 'Kiểm tra xem bạn đã có đầy đủ các giấy tờ cần thiết chưa.'
    }
  }
};

const UIStrings = {
  landing:          { ko: '언어를 선택해주세요', en: 'Select your language', zh: '请选择语言', ja: '言語を選択してください', vi: 'Vui lòng chọn ngôn ngữ' },
  welcome:          { ko: '구로구 다국어 민원 가이드', en: 'Guro Multilingual Guide', zh: '九老多语种指南', ja: '九老多言語ガイド', vi: 'Hướng dẫn Guro' },
  subWelcome:       { ko: '41종의 행정 서식을 모국어로 안내합니다.', en: '41 administrative forms in your language.', zh: '用母语提供41种行政表格。', ja: '41種類の行政書類を母国語で案内。', vi: '41 mẫu đơn bằng tiếng mẹ đẻ.' },
  searchPlaceholder:{ ko: '서식 명칭 검색...', en: 'Search forms...', zh: '搜索表格...', ja: '書類検索...', vi: 'Tìm kiếm mẫu đơn...' },
  catAll:           { ko: '전체', en: 'All', zh: '全部', ja: '全て', vi: 'Tất cả' },
  instructionTitle: { ko: '작성 안내', en: 'Instructions', zh: '指南', ja: '案内', vi: 'Hướng dẫn' },
  feedback:         { ko: '피드백 보내기', en: 'Feedback', zh: '反馈', ja: '感想', vi: 'Phản hồi' },
  download:         { ko: '서류 양식 다운로드', en: 'Download Form', zh: '下载表格', ja: '書類をダウンロード', vi: 'Tải xuống mẫu đơn' },
  downloading:      { ko: '다운로드 중...', en: 'Downloading...', zh: '正在下载...', ja: 'ダウンロード中...', vi: 'Đang tải xuống...' },
  noResult:         { ko: '검색 결과가 없습니다.', en: 'No results found.', zh: '无结果。', ja: '結果がありません。', vi: 'Không có kết quả.' },
  guroOffice:       { ko: '구로구청 민원실 위치', en: 'Guro-gu Office', zh: '九老区厅', ja: '九老区役所', vi: 'Văn phòng Guro' },
  aiConsult:        { ko: '상담 AI 연결', en: 'Chat with AI', zh: '咨询 AI', ja: 'AI相談', vi: 'Tư vấn AI' },
  formPreview:      { ko: '서류 미리보기', en: 'Form Preview', zh: '表格预览', ja: '書類プレビュー', vi: 'Xem trước mẫu đơn' },
  formPreviewNote:  { ko: '예시 이미지입니다 · 실제 서류와 다를 수 있습니다', en: 'Sample preview · Actual form may differ', zh: '仅供参考 · 实际表格可能有差异', ja: 'サンプル表示 · 実際と異なる場合があります', vi: 'Hình mẫu · Mẫu thực tế có thể khác' }
};

// ─────────────────────────────────────────────────────────────
// 서류 미리보기 예시 컴포넌트
// (실제 PNG 파일 연동 전 임시 목업)
// ─────────────────────────────────────────────────────────────
const catFields = {
  FAMILY:    [['성명 (Name)', 80], ['생년월일 (D.O.B)', 80], ['등록기준지', 80], ['주소 (Address)', 80], ['신고인 (Reporter)', 80]],
  CERT:      [['신청인 성명 (Name)', 80], ['주민등록번호', 80], ['신청목적 (Purpose)', 80], ['발급 통수', 40]],
  RESIDENCE: [['성명 (Name)', 80], ['현주소 (Current)', 80], ['이전 주소 (Previous)', 80], ['이전일자 (Date)', 60], ['세대주 (HOH)', 60]],
  ID_SEAL:   [['성명 (Name)', 80], ['주민등록번호', 80], ['주소 (Address)', 80], ['신고사유 (Reason)', 80], ['인감날인 (Seal)', 60]],
  VEHICLE:   [['차종 (Type)', 60], ['차량번호 (Plate No.)', 80], ['소유자 (Owner)', 80], ['양도일자 (Date)', 60], ['서명 (Signature)', 60]],
};

const FormMockPreview = ({ form, t }) => {
  const fields = catFields[form.cat] || catFields.FAMILY;

  return (
    <div className="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden shadow-md text-[11px]">
      {/* 관인 헤더 */}
      <div className="flex items-stretch border-b-2 border-slate-200">
        <div className="w-14 border-r-2 border-slate-200 flex flex-col items-center justify-center py-3 bg-slate-50 shrink-0">
          <div className="w-9 h-9 rounded-full border-2 border-slate-300 flex items-center justify-center">
            <span style={{ fontSize: 7, lineHeight: 1.2 }} className="text-slate-400 text-center leading-tight font-bold">관<br/>인</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center py-3 px-2 bg-slate-50">
          <p style={{ fontSize: 8 }} className="text-slate-400 tracking-widest mb-1 font-medium">대한민국 행정 서식</p>
          <p style={{ fontSize: 13 }} className="font-black text-slate-800 text-center leading-tight">{t(form.title)}</p>
        </div>
        <div className="w-14 border-l-2 border-slate-200 flex flex-col items-center justify-center py-2 bg-slate-50 shrink-0 gap-1">
          <p style={{ fontSize: 7 }} className="text-slate-400 font-bold">처리기간</p>
          <p style={{ fontSize: 9 }} className="text-slate-700 font-black">즉시</p>
        </div>
      </div>

      {/* 서식번호 & 카테고리 바 */}
      <div className="flex justify-between items-center px-4 py-1.5 bg-amber-50 border-b border-amber-100">
        <span style={{ fontSize: 9 }} className="text-amber-700 font-bold">서식 No. {String(form.id).padStart(3, '0')}</span>
        <span style={{ fontSize: 9 }} className="text-amber-600 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
          {form.cat}
        </span>
      </div>

      {/* 필드 목록 */}
      <div className="px-4 py-4 space-y-3">
        {fields.map(([label, width], i) => (
          <div key={i} className="flex items-end gap-3">
            <span
              style={{ fontSize: 10, minWidth: `${Math.max(width, 64)}px` }}
              className="text-slate-600 font-bold shrink-0 pb-1 leading-tight"
            >
              {label}
            </span>
            <div className="flex-1 border-b-2 border-slate-200" />
          </div>
        ))}

        {/* 날인 구역 */}
        <div className="flex justify-between items-end mt-4 pt-3 border-t-2 border-dashed border-slate-100">
          <p style={{ fontSize: 9 }} className="text-slate-400">
            위와 같이 신고합니다.<br />
            <span className="text-slate-500 font-bold">구로구청장 귀중</span>
          </p>
          <div className="flex gap-3">
            {['신고인', '대리인'].map((label) => (
              <div key={label} className="text-center">
                <div className="w-11 h-11 border-2 border-dashed border-slate-200 rounded-full flex items-center justify-center mb-1 bg-slate-50">
                  <span style={{ fontSize: 8 }} className="text-slate-300 font-bold">날인</span>
                </div>
                <p style={{ fontSize: 8 }} className="text-slate-400 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 담당자 기재란 */}
      <div className="border-t-2 border-slate-200 bg-slate-50">
        <div className="flex">
          {['접수', '담당', '확인', '결재'].map((label) => (
            <div key={label} className="flex-1 border-r border-slate-200 last:border-r-0 py-2 text-center">
              <p style={{ fontSize: 8 }} className="text-slate-400 font-bold mb-1">{label}</p>
              <div className="h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
const App = () => {
  const [currentLang, setCurrentLang]       = useState('ko');
  const [view, setView]                     = useState('landing');
  const [selectedForm, setSelectedForm]     = useState(null);
  const [searchTerm, setSearchTerm]         = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isMenuOpen, setIsMenuOpen]         = useState(false);
  // [수정] DOM 직접 조작 대신 React 상태로 다운로드 로딩 관리
  const [isDownloading, setIsDownloading]   = useState(false);
  const downloadTimerRef                    = useRef(null);

  const t = useCallback(
    (obj) => (obj ? obj[currentLang] || obj['en'] || obj['ko'] || '' : ''),
    [currentLang]
  );

  const filteredForms = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return formsList.filter(form => {
      const matchesSearch =
        t(form.title).toLowerCase().includes(query) ||
        form.title.ko.includes(searchTerm);
      const matchesCategory =
        selectedCategory === 'ALL' || form.cat === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, t]);

  // [수정] 화면 전환 시 메뉴를 자동으로 닫기
  const navigateTo = useCallback((nextView) => {
    setIsMenuOpen(false);
    setView(nextView);
  }, []);

  // [수정] 디테일 진입 시 스크롤 상단 이동을 useEffect로 처리
  useEffect(() => {
    if (view === 'detail') window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view, selectedForm]);

  // [수정] DOM 직접 조작 제거 → 상태 기반 다운로드 처리
  const handleDownload = useCallback(() => {
    if (isDownloading) return;
    setIsDownloading(true);
    downloadTimerRef.current = setTimeout(() => {
      setIsDownloading(false);
      alert(`[${t(selectedForm?.title)}] ${t(UIStrings.download)} 완료`);
    }, 1500);
  }, [isDownloading, selectedForm, t]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (downloadTimerRef.current) clearTimeout(downloadTimerRef.current);
    };
  }, []);

  // ── Landing View ─────────────────────────────────────────
  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md text-center space-y-8 animate-in fade-in duration-700">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-yellow-400 rounded-[36px] flex items-center justify-center text-amber-900 mb-4 shadow-[0_15px_30px_-5px_rgba(250,204,21,0.5)] rotate-3 border-4 border-white">
              <Globe size={48} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Gusring</h1>
            <div className="px-4 py-1.5 bg-yellow-200 text-amber-800 text-[11px] font-black rounded-full mt-2 uppercase tracking-widest shadow-sm">
              Guro Smart Ring
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 w-full">
            <p className="text-slate-600 font-bold mb-1">{UIStrings.landing.ko}</p>
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => { setCurrentLang(lang.id); navigateTo('list'); }}
                className="flex items-center justify-between p-5 bg-white border-2 border-transparent rounded-[24px] shadow-md hover:border-yellow-400 hover:bg-yellow-50 transition-all active:scale-95 group"
              >
                <div className="flex items-center gap-5">
                  <span className="text-3xl filter drop-shadow-sm">{lang.icon}</span>
                  <span className="font-extrabold text-slate-800 text-xl group-hover:text-amber-700">{lang.label}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                  <ChevronRight className="text-slate-300 group-hover:text-amber-600" />
                </div>
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 font-medium">© 2026 Team EL. Guro-gu Living Lab Project.</p>
        </div>
      </div>
    );
  }

  // ── App Shell ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans max-w-md mx-auto shadow-2xl relative overflow-x-hidden">

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-yellow-100 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* [수정] 뒤로가기 버튼과 타이틀 클릭 영역을 분리 */}
          {view === 'detail' ? (
            <button
              onClick={() => navigateTo('list')}
              className="p-2 -ml-2 rounded-xl hover:bg-yellow-50 text-amber-600 transition-colors"
              aria-label="Back"
            >
              <ArrowLeft size={24} />
            </button>
          ) : (
            <div className="w-9 h-9 bg-yellow-400 rounded-xl flex items-center justify-center text-amber-900 shadow-sm border-2 border-white">
              <Globe size={20} />
            </div>
          )}
          <span className="font-black text-xl text-slate-900 tracking-tight">Gusring</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('landing')}
            className="px-3 py-1.5 bg-yellow-100 rounded-xl text-[11px] font-black text-amber-800 border border-yellow-200 shadow-sm active:scale-95 transition-transform"
          >
            {languages.find(l => l.id === currentLang)?.icon} {currentLang.toUpperCase()}
          </button>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-xl hover:bg-yellow-50 text-slate-600"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl p-8 animate-in slide-in-from-right duration-300 rounded-l-[40px]">
            <div className="flex justify-between items-center mb-10">
              <h2 className="font-black text-2xl text-slate-900">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"
                aria-label="Close menu"
              >
                <X />
              </button>
            </div>
            <div className="space-y-5">
              <div className="p-5 bg-amber-50 rounded-[28px] text-[13px] text-amber-900 font-medium leading-relaxed border border-amber-100">
                구로구의 행정 서비스를 모국어로 쉽고 편하게 이용하세요. '구스링'은 리빙랩 활동으로 제작되었습니다.
              </div>
              <button className="w-full flex items-center gap-4 p-4 font-bold text-slate-700 hover:bg-yellow-50 rounded-2xl transition-colors">
                <MapPin size={22} className="text-yellow-500" /> {t(UIStrings.guroOffice)}
              </button>
              <button className="w-full flex items-center gap-4 p-4 font-bold text-amber-700 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
                <MessageCircle size={22} /> {t(UIStrings.feedback)}
              </button>
            </div>
          </div>
        </>
      )}

      <main className="flex-1">
        {/* ── List View ── */}
        {view === 'list' ? (
          <div className="p-5 space-y-6">
            <div className="py-1">
              <h2 className="text-2xl font-black text-slate-900 leading-tight mb-1">{t(UIStrings.welcome)}</h2>
              <p className="text-slate-500 text-[13px] font-medium">{t(UIStrings.subWelcome)}</p>
            </div>

            <div className="sticky top-[74px] z-20 bg-slate-50/90 backdrop-blur-sm pt-1 pb-4 space-y-4">
              <div className="relative group">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-yellow-500 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder={t(UIStrings.searchPlaceholder)}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border-2 border-slate-100 rounded-[24px] py-4 pl-14 pr-6 focus:ring-4 focus:ring-yellow-400/20 focus:border-yellow-400 shadow-sm text-sm font-bold transition-all"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                <button
                  onClick={() => setSelectedCategory('ALL')}
                  className={`shrink-0 px-6 py-2 rounded-full text-xs font-black transition-all border-2 ${
                    selectedCategory === 'ALL'
                      ? 'bg-yellow-400 border-yellow-400 text-amber-900 shadow-md scale-105'
                      : 'bg-white border-slate-100 text-slate-500'
                  }`}
                >
                  {t(UIStrings.catAll)}
                </button>
                {Object.keys(categories).map(catKey => (
                  <button
                    key={catKey}
                    onClick={() => setSelectedCategory(catKey)}
                    className={`shrink-0 px-6 py-2 rounded-full text-xs font-black transition-all border-2 ${
                      selectedCategory === catKey
                        ? 'bg-yellow-400 border-yellow-400 text-amber-900 shadow-md scale-105'
                        : 'bg-white border-slate-100 text-slate-500'
                    }`}
                  >
                    {t(categories[catKey])}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 pb-28">
              <div className="text-[10px] text-amber-600 font-black px-2 uppercase tracking-[0.2em]">
                {selectedCategory === 'ALL' ? t(UIStrings.catAll) : t(categories[selectedCategory])} ({filteredForms.length})
              </div>

              {filteredForms.map((form) => (
                <button
                  key={form.id}
                  onClick={() => { setSelectedForm(form); navigateTo('detail'); }}
                  className="group bg-white border-2 border-slate-50 p-5 rounded-[32px] flex items-center gap-5 hover:border-yellow-300 hover:shadow-xl hover:shadow-yellow-100 transition-all active:scale-[0.97] text-left shadow-sm"
                >
                  <div className="w-12 h-12 bg-amber-50 group-hover:bg-yellow-400 rounded-[18px] flex items-center justify-center text-amber-400 group-hover:text-amber-900 shrink-0 transition-all duration-300 shadow-inner">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black text-amber-500 uppercase mb-1 tracking-wider">
                      {t(categories[form.cat])}
                    </p>
                    <h3 className="font-bold text-slate-800 text-[15px] leading-snug truncate">{t(form.title)}</h3>
                    <p className="text-[11px] text-slate-400 truncate mt-1 leading-relaxed font-medium group-hover:text-slate-500">
                      {t(form.desc)}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-amber-600" />
                </button>
              ))}

              {filteredForms.length === 0 && (
                <div className="text-center py-24 bg-white rounded-[40px] border-4 border-dashed border-slate-100">
                  <p className="text-slate-400 text-sm font-bold">{t(UIStrings.noResult)}</p>
                </div>
              )}
            </div>
          </div>

        ) : (
          /* ── Detail View ── */
          <div className="animate-in slide-in-from-bottom-10 duration-500">
            <div className="w-full aspect-[4/5] bg-yellow-100 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-yellow-50">
                <div className="text-center">
                  <FileText size={80} className="mx-auto mb-3 text-yellow-200 opacity-60" />
                  <p className="text-sm font-black text-yellow-300 uppercase tracking-widest">
                    [ {t(categories[selectedForm.cat])} ]
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-8">
                <div className="bg-yellow-400 text-amber-950 text-[10px] font-black px-3 py-1 rounded-full w-fit mb-3 uppercase tracking-tighter shadow-sm">
                  Guide Preview
                </div>
                <h2 className="text-3xl font-black text-white leading-tight mb-3">{t(selectedForm.title)}</h2>
                <p className="text-white/90 text-[13px] mb-6 leading-relaxed font-medium line-clamp-2">
                  {t(selectedForm.desc)}
                </p>

                <div className="flex gap-3">
                  {/* [수정] DOM 직접 조작 제거 → disabled + 상태 기반 렌더링 */}
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex-1 py-4 bg-yellow-400 text-amber-950 rounded-[20px] font-black text-sm flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg border-b-4 border-amber-500 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isDownloading ? (
                      <><span className="animate-spin inline-block">⏳</span> {t(UIStrings.downloading)}</>
                    ) : (
                      <><Download size={18} /> {t(UIStrings.download)}</>
                    )}
                  </button>
                  <button className="p-4 bg-white/10 backdrop-blur-xl text-white rounded-[20px] active:scale-95 border border-white/20">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-t-[48px] -mt-10 relative z-10 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.15)] min-h-[500px]">
              <div className="w-16 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />

              {/* ── 서류 미리보기 섹션 ── */}
              <div className="mb-10">
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-3 bg-slate-100 rounded-2xl text-slate-600 shrink-0">
                    <FileText size={22} />
                  </div>
                  <div>
                    <h3 className="font-black text-xl text-slate-900">{t(UIStrings.formPreview)}</h3>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">{t(UIStrings.formPreviewNote)}</p>
                  </div>
                </div>
                <FormMockPreview form={selectedForm} t={t} />
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-yellow-100 rounded-2xl text-amber-600">
                  <Info size={24} />
                </div>
                <h3 className="font-black text-2xl text-slate-900 tracking-tight">{t(UIStrings.instructionTitle)}</h3>
              </div>

              <div className="space-y-5 mb-12">
                {[guideSteps.step1, guideSteps.step2, guideSteps.step3].map((step, idx) => (
                  <div
                    key={idx}
                    className="flex gap-5 p-6 bg-amber-50/50 rounded-[32px] border-2 border-amber-50 hover:border-yellow-200 transition-colors"
                  >
                    <div className="w-8 h-8 bg-yellow-400 text-amber-950 rounded-full flex items-center justify-center text-sm font-black shrink-0 shadow-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-slate-900 text-[15px] font-black mb-1.5">{t(step.title)}</p>
                      <p className="text-slate-600 text-[13px] leading-relaxed font-medium">{t(step.desc)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full py-5 bg-slate-900 text-white rounded-[28px] font-black text-base flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all">
                <MessageCircle size={22} className="text-yellow-400" /> {t(UIStrings.feedback)}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom Banner */}
      {view === 'list' && (
        <div className="fixed bottom-0 left-0 right-0 p-6 max-w-md mx-auto pointer-events-none">
          <div className="bg-slate-900 text-white rounded-[32px] p-5 flex items-center justify-between shadow-2xl pointer-events-auto border border-white/5 ring-1 ring-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center animate-bounce shadow-lg">
                <Globe size={24} className="text-amber-950" />
              </div>
              <div>
                <p className="text-[10px] font-black text-yellow-400 tracking-[0.1em] uppercase mb-0.5">Guro Smart Ring</p>
                <p className="text-sm font-bold tracking-tight text-white/90">행정 도움이 필요하신가요?</p>
              </div>
            </div>
            <button className="px-5 py-3 bg-yellow-400 text-amber-950 rounded-2xl text-[13px] font-black hover:bg-yellow-300 transition-all shadow-lg active:scale-95 border-b-2 border-amber-600">
              {t(UIStrings.aiConsult)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
