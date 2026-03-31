import { FormItem } from '../types';

/**
 * 41종 행정 서식 데이터베이스
 *
 * 수정 이력:
 *   - 일본어 설명 마침표: 데바나가리 문자(।) → 일본어 마침표(。)
 *   - id  4 zh 설명: 말미 '개인정보' 제거
 *   - id  5 ja 설명: 한국어 조사 '를' → 'を'
 *   - id  5 vi 설명: 한국어 '및' → 'và'
 *   - id 13 vi 설명: 한국어 '및' → 'và'
 *   - id 17 ja 제목: 한국어 '기본' → '基本'
 *   - id 20 vi 설명: 한국어 '및' → 'và'
 */
export const formsList: FormItem[] = [
  // ── 가족관계 (FAMILY) ──────────────────────────────────────
  {
    id: 1, cat: 'FAMILY',
    title: { ko: '가족관계등록 창설신고서', en: 'Family Register Creation Report', zh: '家族关系登记创立申报书', ja: '家族関係登録創設届', vi: 'Đơn báo cáo lập đăng ký quan hệ gia đình' },
    desc:  { ko: '가족관계등록부가 없는 사람이 새로 등록을 만들 때 사용합니다.', en: 'Used to create a new family register.', zh: '没有家族关系登记簿的人重新登记时使用。', ja: '家族関係登録簿がない人が新しく登録を作る時に使用します。', vi: 'Sử dụng cho người chưa có sổ đăng ký quan hệ gia đình để lập mới.' },
    images: { 'en': '/forms/en/1.png', 'zh': '/forms/zh/1.png', 'ja': '/forms/ja/1.png', 'vi': '/forms/vi/1.png' },
    guideImages: { 'en': ['/forms/en/1_guide1.png', '/forms/en/1_guide2.png', '/forms/en/1_guide3.png'], 'zh': ['/forms/zh/1_guide1.png', '/forms/zh/1_guide2.png', '/forms/zh/1_guide3.png'], 'ja': ['/forms/ja/1_guide1.png', '/forms/ja/1_guide2.png', '/forms/ja/1_guide3.png'], 'vi': ['/forms/vi/1_guide1.png', '/forms/vi/1_guide2.png', '/forms/vi/1_guide3.png'] },
  },
  {
    id: 2, cat: 'FAMILY',
    title: { ko: '사망신고서', en: 'Death Report', zh: '死亡申报书', ja: '死亡届', vi: 'Giấy báo tử' },
    desc:  { ko: '가족이나 친족이 사망했을 때 관할 기관에 알리는 서류입니다.', en: "A document to notify authorities of a family member's death.", zh: '家属或亲属死亡时向管辖机构报告的文件。', ja: '家族や親族が死亡した時に管轄機関に知らせる書類です。', vi: 'Văn bản thông báo khi có thành viên trong gia đình qua đời.' },
    images: { 'en': '/forms/en/2.png', 'zh': '/forms/zh/2.png', 'ja': '/forms/ja/2.png', 'vi': '/forms/vi/2.png' },
    guideImages: { 'en': ['/forms/en/2_guide1.png', '/forms/en/2_guide2.png', '/forms/en/2_guide3.png', '/forms/en/2_guide4.png', '/forms/en/2_guide5.png', '/forms/en/2_guide6.png', '/forms/en/2_guide7.png', '/forms/en/2_guide8.png'], 'zh': ['/forms/zh/2_guide1.png'], 'ja': ['/forms/ja/2_guide1.png', '/forms/ja/2_guide2.png', '/forms/ja/2_guide3.png', '/forms/ja/2_guide4.png', '/forms/ja/2_guide5.png', '/forms/ja/2_guide6.png', '/forms/ja/2_guide7.png', '/forms/ja/2_guide8.png'], 'vi': ['/forms/vi/2_guide1.png', '/forms/vi/2_guide2.png', '/forms/vi/2_guide3.png', '/forms/vi/2_guide4.png', '/forms/vi/2_guide5.png', '/forms/vi/2_guide6.png', '/forms/vi/2_guide7.png'] },
  },
  {
    id: 3, cat: 'FAMILY',
    title: { ko: '인지(친권자 지정)신고서', en: 'Acknowledgment Report', zh: '认知申报书', ja: '認知届', vi: 'Đơn báo cáo nhận con' },
    desc:  { ko: '혼인 외의 자녀를 자신의 자식으로 인정할 때 제출합니다.', en: "Submitted to acknowledge a child born out of wedlock as one's own.", zh: '承认婚姻以外的子女为自己的子女时提交。', ja: '婚姻外の子を自分の子として認める時に提出します。', vi: 'Nộp để công nhận con ngoài giá thú là con của mình.' },
    images: { 'en': '/forms/en/3.png', 'zh': '/forms/zh/3.png', 'ja': '/forms/ja/3.png', 'vi': '/forms/vi/3.png' },
    guideImages: { 'ja': ['/forms/ja/3_guide1.png', '/forms/ja/3_guide2.png', '/forms/ja/3_guide3.png', '/forms/ja/3_guide4.png', '/forms/ja/3_guide5.png', '/forms/ja/3_guide6.png'], 'vi': ['/forms/vi/3_guide1.png', '/forms/vi/3_guide2.png', '/forms/vi/3_guide3.png', '/forms/vi/3_guide4.png', '/forms/vi/3_guide5.png', '/forms/vi/3_guide6.png'] },
  },
  {
    id: 4, cat: 'FAMILY',
    title: { ko: '출생신고서', en: 'Birth Report', zh: '出生申报书', ja: '出生届', vi: 'Giấy khai sinh' },
    desc:  { ko: '자녀가 태어난 후 법적 등록을 위해 작성하는 신고서입니다.', en: 'A report to legally register a child after birth.', zh: '孩子出生后为了法律登记而填写的申报书。', ja: '子供が生まれた後、法的登録のために作成する届出書です。', vi: 'Đơn đăng ký hợp pháp cho trẻ sau khi sinh.' },
    images: { 'en': '/forms/en/4.png', 'zh': '/forms/zh/4.png', 'ja': '/forms/ja/4.png', 'vi': '/forms/vi/4.png' },
    guideImages: { 'en': ['/forms/en/4_guide1.png', '/forms/en/4_guide2.png', '/forms/en/4_guide3.png', '/forms/en/4_guide4.png', '/forms/en/4_guide5.png', '/forms/en/4_guide6.png', '/forms/en/4_guide7.png', '/forms/en/4_guide8.png'], 'zh': ['/forms/zh/4_guide1.png'], 'ja': ['/forms/ja/4_guide1.png', '/forms/ja/4_guide2.png', '/forms/ja/4_guide3.png', '/forms/ja/4_guide4.png', '/forms/ja/4_guide5.png', '/forms/ja/4_guide6.png', '/forms/ja/4_guide7.png'], 'vi': ['/forms/vi/4_guide1.png', '/forms/vi/4_guide2.png', '/forms/vi/4_guide3.png', '/forms/vi/4_guide4.png', '/forms/vi/4_guide5.png', '/forms/vi/4_guide6.png', '/forms/vi/4_guide7.png'] },
  },
  {
    id: 5, cat: 'FAMILY',
    title: { ko: '파양신고서', en: 'Dissolution of Adoption', zh: '罢养申报书', ja: '離縁届', vi: 'Đơn báo cáo chấm dứt nhận nuôi' },
    desc:  { ko: '입양된 자녀와 양부모 사이의 법적 관계를 해소할 때 사용합니다.', en: 'Used to terminate the legal relationship of adoption.', zh: '解除领养子女与养父母之间的法律关系时使用。', ja: '養子と養親の間の法的関係を解消する時に使用します。', vi: 'Dùng để chấm dứt quan hệ pháp lý giữa con nuôi và cha mẹ nuôi.' },
    images: { 'en': '/forms/en/5.png', 'zh': '/forms/zh/5.png', 'ja': '/forms/ja/5.png', 'vi': '/forms/vi/5.png' },
    guideImages: { 'en': ['/forms/en/5_guide1.png', '/forms/en/5_guide2.png', '/forms/en/5_guide3.png', '/forms/en/5_guide4.png', '/forms/en/5_guide5.png', '/forms/en/5_guide6.png', '/forms/en/5_guide7.png', '/forms/en/5_guide8.png'], 'zh': ['/forms/zh/5_guide1.png'], 'ja': ['/forms/ja/5_guide1.png', '/forms/ja/5_guide2.png', '/forms/ja/5_guide3.png', '/forms/ja/5_guide4.png', '/forms/ja/5_guide5.png', '/forms/ja/5_guide6.png'], 'vi': ['/forms/vi/5_guide1.png', '/forms/vi/5_guide2.png', '/forms/vi/5_guide3.png', '/forms/vi/5_guide4.png', '/forms/vi/5_guide5.png', '/forms/vi/5_guide6.png'] },
  },
  {
    id: 6, cat: 'FAMILY',
    title: { ko: '개명신고서', en: 'Name Change Report', zh: '改名申报书', ja: '改名届', vi: 'Đơn báo cáo đổi tên' },
    desc:  { ko: '법원의 허가를 받아 이름을 공식적으로 바꿀 때 제출합니다.', en: "Submitted to officially change one's name with court approval.", zh: '获得法院许可正式改名时提交。', ja: '裁判所の許可を得て名前を公式に変える時に提出します。', vi: 'Nộp để chính thức đổi tên sau khi được tòa án cho phép.' },
    images: { 'en': '/forms/en/6.png', 'zh': '/forms/zh/6.png', 'ja': '/forms/ja/6.png', 'vi': '/forms/vi/6.png' },
    guideImages: { 'en': ['/forms/en/6_guide1.png', '/forms/en/6_guide2.png', '/forms/en/6_guide3.png'], 'ja': ['/forms/ja/6_guide1.png', '/forms/ja/6_guide2.png', '/forms/ja/6_guide3.png'], 'vi': ['/forms/vi/6_guide1.png', '/forms/vi/6_guide2.png'] },
  },
  {
    id: 7, cat: 'FAMILY',
    title: { ko: '성본 변경 신고서', en: 'Surname Change Report', zh: '姓本变更申报书', ja: '姓本変更届', vi: 'Đơn báo cáo thay đổi họ' },
    desc:  { ko: '자녀의 성과 본을 변경하기 위해 작성하는 서류입니다.', en: "Document to change a child's surname and origin.", zh: '为了变更子女的姓和本而填写的材料。', ja: '子の氏と本を変更するために作成する書類です。', vi: 'Văn bản dùng để thay đổi họ và nguồn gốc của con.' },
    images: { 'en': '/forms/en/7.png', 'zh': '/forms/zh/7.png', 'ja': '/forms/ja/7.png', 'vi': '/forms/vi/7.png' },
    guideImages: { 'zh': ['/forms/zh/7_guide1.png', '/forms/zh/7_guide2.png', '/forms/zh/7_guide3.png'], 'vi': ['/forms/vi/7_guide1.png', '/forms/vi/7_guide2.png'] },
  },
  {
    id: 8, cat: 'FAMILY',
    title: { ko: '입양신고서', en: 'Adoption Report', zh: '收养申报书', ja: '養子縁組届', vi: 'Giấy đăng ký nhận con nuôi' },
    desc:  { ko: '법적으로 자녀를 입양하여 부모-자식 관계를 맺을 때 사용합니다.', en: 'Used to legally adopt a child.', zh: '法律上收养子女并建立父母子女关系时使用。', ja: '法的に子を養子にし、親子関係を結ぶ時に使用します。', vi: 'Sử dụng khi nhận con nuôi hợp pháp.' },
    images: { 'en': '/forms/en/8.png', 'zh': '/forms/zh/8.png', 'ja': '/forms/ja/8.png', 'vi': '/forms/vi/8.png' },
    guideImages: { 'en': ['/forms/en/8_guide1.png', '/forms/en/8_guide2.png', '/forms/en/8_guide3.png', '/forms/en/8_guide4.png', '/forms/en/8_guide5.png', '/forms/en/8_guide6.png', '/forms/en/8_guide7.png', '/forms/en/8_guide8.png', '/forms/en/8_guide9.png'], 'zh': ['/forms/zh/8_guide1.png'], 'ja': ['/forms/ja/8_guide1.png', '/forms/ja/8_guide2.png', '/forms/ja/8_guide3.png', '/forms/ja/8_guide4.png', '/forms/ja/8_guide5.png', '/forms/ja/8_guide6.png'], 'vi': ['/forms/vi/8_guide1.png', '/forms/vi/8_guide2.png', '/forms/vi/8_guide3.png', '/forms/vi/8_guide4.png', '/forms/vi/8_guide5.png', '/forms/vi/8_guide6.png'] },
  },
  {
    id: 9, cat: 'FAMILY',
    title: { ko: '친양자 파양신고서', en: 'Full Adoption Dissolution', zh: '亲养子罢养申报书', ja: '特別養子離縁届', vi: 'Đơn chấm dứt nhận nuôi đặc biệt' },
    desc:  { ko: '친양자 관계를 법적으로 해소하기 위해 작성합니다.', en: 'Written to legally dissolve a full adoption relationship.', zh: '为了法律上解除亲养子关系而填写。', ja: '特別養子関係を法的に解消するために作成します。', vi: 'Dùng để chấm dứt quan hệ con nuôi đặc biệt về mặt pháp lý.' },
    images: { 'en': '/forms/en/9.png', 'zh': '/forms/zh/9.png', 'ja': '/forms/ja/9.png', 'vi': '/forms/vi/9.png' },
    guideImages: { 'en': ['/forms/en/9_guide1.png', '/forms/en/9_guide2.png', '/forms/en/9_guide3.png', '/forms/en/9_guide4.png'], 'ja': ['/forms/ja/9_guide1.png', '/forms/ja/9_guide2.png', '/forms/ja/9_guide3.png'], 'vi': ['/forms/vi/9_guide1.png', '/forms/vi/9_guide2.png', '/forms/vi/9_guide3.png'] },
  },
  {
    id: 10, cat: 'FAMILY',
    title: { ko: '혼인신고서', en: 'Marriage Report', zh: '婚姻申报书', ja: '婚姻届', vi: 'Giấy đăng ký kết hôn' },
    desc:  { ko: '법적으로 부부가 되었음을 공인받기 위해 제출하는 서류입니다.', en: 'Submitted to be officially recognized as a married couple.', zh: '为了获得法律上成为夫妇的公认而提交的文件。', ja: '法的に夫婦になったことを公認されるために提出する書類です。', vi: 'Văn bản nộp để được công nhận là vợ chồng hợp pháp.' },
    images: { 'en': '/forms/en/10.png', 'zh': '/forms/zh/10.png', 'ja': '/forms/ja/10.png', 'vi': '/forms/vi/10.png' },
    guideImages: { 'en': ['/forms/en/10_guide1.png', '/forms/en/10_guide2.png', '/forms/en/10_guide3.png', '/forms/en/10_guide4.png', '/forms/en/10_guide5.png', '/forms/en/10_guide6.png', '/forms/en/10_guide7.png', '/forms/en/10_guide8.png'], 'zh': ['/forms/zh/10_guide1.png'], 'ja': ['/forms/ja/10_guide1.png', '/forms/ja/10_guide2.png', '/forms/ja/10_guide3.png', '/forms/ja/10_guide4.png', '/forms/ja/10_guide5.png', '/forms/ja/10_guide6.png', '/forms/ja/10_guide7.png', '/forms/ja/10_guide8.png'], 'vi': ['/forms/vi/10_guide1.png', '/forms/vi/10_guide2.png', '/forms/vi/10_guide3.png', '/forms/vi/10_guide4.png', '/forms/vi/10_guide5.png', '/forms/vi/10_guide6.png', '/forms/vi/10_guide7.png'] },
  },
  {
    id: 11, cat: 'FAMILY',
    title: { ko: '등록부정정신청서', en: 'Register Correction', zh: '登记簿更正申请', ja: '登録簿訂正申請', vi: 'Đơn xin đính chính đăng ký' },
    desc:  { ko: '가족관계등록부의 잘못된 기재 내용을 수정할 때 사용합니다.', en: 'Used to correct errors in the register.', zh: '修正家族关系登记簿中错误的记载内容时使用。', ja: '家族関係登録簿の誤った記載内容を修正する時に使用します。', vi: 'Sử dụng để sửa các nội dung ghi sai trong sổ đăng ký.' },
    images: { 'en': '/forms/en/11.png', 'zh': '/forms/zh/11.png', 'ja': '/forms/ja/11.png', 'vi': '/forms/vi/11.png' },
  },
  {
    id: 12, cat: 'FAMILY',
    title: { ko: '이혼신고서', en: 'Divorce Report', zh: '离婚申报书', ja: '離婚届', vi: 'Giấy báo ly hôn' },
    desc:  { ko: '법적 혼인 관계를 해소했음을 신고하는 서류입니다.', en: 'Document reporting the dissolution of a legal marriage.', zh: '申报法律婚姻关系已解除的文件。', ja: '法的婚姻関係を解消したことを届け出る書類です。', vi: 'Văn bản báo cáo việc chấm dứt quan hệ hôn nhân hợp pháp.' },
    images: { 'en': '/forms/en/12.png', 'zh': '/forms/zh/12.png', 'ja': '/forms/ja/12.png', 'vi': '/forms/vi/12.png' },
    guideImages: { 'en': ['/forms/en/12_guide1.png', '/forms/en/12_guide2.png', '/forms/en/12_guide3.png', '/forms/en/12_guide4.png', '/forms/en/12_guide5.png', '/forms/en/12_guide6.png', '/forms/en/12_guide7.png', '/forms/en/12_guide8.png', '/forms/en/12_guide9.png'], 'zh': ['/forms/zh/12_guide1.png'], 'ja': ['/forms/ja/12_guide1.png', '/forms/ja/12_guide2.png', '/forms/ja/12_guide3.png', '/forms/ja/12_guide4.png', '/forms/ja/12_guide5.png', '/forms/ja/12_guide6.png', '/forms/ja/12_guide7.png', '/forms/ja/12_guide8.png', '/forms/ja/12_guide9.png'], 'vi': ['/forms/vi/12_guide1.png', '/forms/vi/12_guide2.png', '/forms/vi/12_guide3.png', '/forms/vi/12_guide4.png', '/forms/vi/12_guide5.png', '/forms/vi/12_guide6.png', '/forms/vi/12_guide7.png'] },
  },
  {
    id: 13, cat: 'FAMILY',
    title: { ko: '창성신고서', en: 'Surname Creation', zh: '创姓申报书', ja: '創姓届', vi: 'Đơn báo cáo lập họ' },
    desc:  { ko: '새로운 성(姓)을 만들어 등록할 때 제출합니다.', en: 'Submitted when creating and registering a new surname.', zh: '创立并登记新姓氏时提交。', ja: '新しい氏を作って登録する時に提出します。', vi: 'Nộp khi tạo và đăng ký một họ mới.' },
    images: { 'en': '/forms/en/13.png', 'zh': '/forms/zh/13.png', 'ja': '/forms/ja/13.png', 'vi': '/forms/vi/13.png' },
    guideImages: { 'en': ['/forms/en/13_guide1.png', '/forms/en/13_guide2.png', '/forms/en/13_guide3.png'], 'ja': ['/forms/ja/13_guide1.png', '/forms/ja/13_guide2.png', '/forms/ja/13_guide3.png'], 'vi': ['/forms/vi/13_guide1.png', '/forms/vi/13_guide2.png'] },
  },
  {
    id: 14, cat: 'FAMILY',
    title: { ko: '친양자 입양신고서', en: 'Full Adoption Report', zh: '亲养子收养申报', ja: '特別養子縁組届', vi: 'Đăng ký nhận con nuôi đặc biệt' },
    desc:  { ko: '친생자와 동일한 권리를 갖는 친양자를 입양할 때 사용합니다.', en: 'Used for full adoption giving same rights as biological children.', zh: '收养与亲生子女具有相同法律权利的亲养子时使用。', ja: '実子と同一の法的権利を持つ特別養子を縁組する時に使用します。', vi: 'Sử dụng khi nhận con nuôi đặc biệt.' },
    images: { 'en': '/forms/en/14.png', 'zh': '/forms/zh/14.png', 'ja': '/forms/ja/14.png', 'vi': '/forms/vi/14.png' },
  },
  {
    id: 15, cat: 'FAMILY',
    title: { ko: '혼인신고시 자녀의 성과 본 협의', en: 'Agreement on Child Surname', zh: '婚姻申报时姓本协议', ja: '婚姻届出時の氏本協議', vi: 'Thỏa thuận về họ của con' },
    desc:  { ko: '혼인 시 장래 자녀의 성을 어머니의 성으로 따르기로 할 때 작성합니다.', en: "Agreed to follow the mother's surname for future children.", zh: '结婚时协议未来子女随母姓时填写。', ja: '婚姻時、将来の子の氏を母の氏に従うことに合意した時に作成します。', vi: 'Lập khi kết hôn nếu thỏa thuận con cái sẽ theo họ mẹ.' },
    images: { 'en': '/forms/en/15.png', 'zh': '/forms/zh/15.png', 'ja': '/forms/ja/15.png', 'vi': '/forms/vi/15.png' },
  },
  {
    id: 23, cat: 'FAMILY',
    title: { ko: '정정신고서', en: 'Correction Report', zh: '更正申报书', ja: '訂正届', vi: 'Đơn báo cáo đính chính' },
    desc:  { ko: '기존 신고 내용의 오류를 수정할 때 작성합니다.', en: 'Written to correct errors in previous reports.', zh: '之前申报的内容有误需要修正时填写。', ja: '以前の届出内容に誤りがあり、修正が必要な時に作成します。', vi: 'Lập khi cần sửa đổi sai sót trong báo cáo trước đó.' },
    images: { 'en': '/forms/en/23.png', 'zh': '/forms/zh/23.png', 'ja': '/forms/ja/23.png', 'vi': '/forms/vi/23.png' },
    guideImages: { 'en': ['/forms/en/23_guide1.png'], 'ja': ['/forms/ja/23_guide1.png', '/forms/ja/23_guide2.png'], 'vi': ['/forms/vi/23_guide1.png'] },
  },

  // ── 증명서 (CERT) ──────────────────────────────────────────
  {
    id: 16, cat: 'CERT',
    title: { ko: '가족관계증명서', en: 'Family Relation Certificate', zh: '家族关系证明书', ja: '家族関係証明書', vi: 'Giấy chứng nhận quan hệ gia đình' },
    desc:  { ko: '부모, 배우자, 자녀 등 가족 구성원을 증명하는 서류입니다.', en: 'Proves family members (parents, spouse, children).', zh: '证明父母、配偶、子女等家庭成员的文件。', ja: '両親、配偶者、子供など家族構成員を証明する書類です。', vi: 'Giấy tờ chứng minh các thành viên trong gia đình.' },
    images: { 'en': '/forms/en/16.png', 'zh': '/forms/zh/16.png', 'ja': '/forms/ja/16.png', 'vi': '/forms/vi/16.png' },
  },
  {
    id: 17, cat: 'CERT',
    title: { ko: '기본증명서', en: 'Basic Certificate', zh: '基本证明书', ja: '基本証明書', vi: 'Giấy chứng nhận cơ bản' },
    desc:  { ko: '본인의 출생, 개명 등 기본적인 사항을 증명합니다.', en: 'Proves basic personal info such as birth and name change.', zh: '证明本人出生、改名等基本身份事项的文件。', ja: '本人の出生、改名など基本的な身分事項を証明する書類です。', vi: 'Giấy tờ chứng minh ngày sinh, đổi tên.' },
    images: { 'en': '/forms/en/17.png', 'zh': '/forms/zh/17.png', 'ja': '/forms/ja/17.png', 'vi': '/forms/vi/17.png' },
  },
  {
    id: 18, cat: 'CERT',
    title: { ko: '입양관계증명서', en: 'Adoption Certificate', zh: '收养关系证明书', ja: '養子縁組関係証明書', vi: 'Giấy chứng nhận quan hệ nuôi con' },
    desc:  { ko: '일반 입양 사실을 증명하는 서류를 신청할 때 사용합니다.', en: 'Used to prove general adoption facts.', zh: '证明一般收养事实的文件。', ja: '一般養子縁組の事実を証明する書類です。', vi: 'Giấy tờ chứng minh việc nhận con nuôi thông thường.' },
    images: { 'en': '/forms/en/18.png', 'zh': '/forms/zh/18.png', 'ja': '/forms/ja/18.png', 'vi': '/forms/vi/18.png' },
  },
  {
    id: 19, cat: 'CERT',
    title: { ko: '친양자입양관계증명서', en: 'Full Adoption Certificate', zh: '亲养子收养证明书', ja: '特別養子縁組証明書', vi: 'Giấy chứng nhận nuôi con đặc biệt' },
    desc:  { ko: '친양자 입양 사실을 증명하는 서류를 신청합니다.', en: 'Proves full adoption facts.', zh: '证明亲养子收养事实的文件。', ja: '特別養子縁組の事実を証明する書類です。', vi: 'Giấy tờ chứng minh việc nhận con nuôi đặc biệt.' },
    images: { 'en': '/forms/en/19.png', 'zh': '/forms/zh/19.png', 'ja': '/forms/ja/19.png', 'vi': '/forms/vi/19.png' },
  },
  {
    id: 20, cat: 'CERT',
    title: { ko: '혼인관계증명서', en: 'Marriage Certificate', zh: '婚姻关系证明书', ja: '婚姻関係証明書', vi: 'Giấy chứng nhận quan hệ hôn nhân' },
    desc:  { ko: '본인의 혼인 및 이혼 여부를 증명하는 서류입니다.', en: 'Proves marriage or divorce status.', zh: '证明本人婚姻及离婚情况的文件。', ja: '本人の婚姻および離婚の有無を証明する書類です。', vi: 'Giấy tờ chứng minh tình trạng hôn nhân và ly hôn.' },
    images: { 'en': '/forms/en/20.png', 'zh': '/forms/zh/20.png', 'ja': '/forms/ja/20.png', 'vi': '/forms/vi/20.png' },
  },
  {
    id: 29, cat: 'CERT',
    title: { ko: '출입국사실증명서', en: 'Entry/Exit Certificate', zh: '出入境事实证明', ja: '出入国事実証明', vi: 'Giấy chứng nhận xuất nhập cảnh' },
    desc:  { ko: '일정 기간 동안의 출입국 기록을 증명받기 위해 신청합니다.', en: 'Request to prove entry/exit records.', zh: '证明一定期间内的出入境记录。', ja: '一定期間の出入国記録を証明してもらうために申請します。', vi: 'Xác nhận lịch sử xuất nhập cảnh.' },
    images: { 'en': '/forms/en/29.png', 'zh': '/forms/zh/29.png', 'ja': '/forms/ja/29.png', 'vi': '/forms/vi/29.png' },
    guideImages: { 'en': ['/forms/en/29_guide1.png', '/forms/en/29_guide2.png'], 'vi': ['/forms/vi/29_guide1.png', '/forms/vi/29_guide2.png'] },
  },

  // ── 체류/주거 (RESIDENCE) ──────────────────────────────────
  {
    id: 21, cat: 'RESIDENCE',
    title: { ko: '국내거소이전신고서', en: 'Residence Change Report', zh: '国内住所转移申报', ja: '国内居所移転届', vi: 'Báo cáo chuyển nơi cư trú' },
    desc:  { ko: '국내 거주지를 옮겼을 때 새로운 주소지를 신고합니다.', en: 'Report a new address when moving within Korea.', zh: '国内居住地搬迁时申报新住所。', ja: '国内の居住地を移した時に新しい住所地を届け出ます。', vi: 'Báo cáo địa chỉ mới khi chuyển nơi cư trú trong nước.' },
    images: { 'en': '/forms/en/21.png', 'zh': '/forms/zh/21.png', 'ja': '/forms/ja/21.png', 'vi': '/forms/vi/21.png' },
    guideImages: { 'en': ['/forms/en/21_guide1.png'], 'ja': ['/forms/ja/21_guide1.png', '/forms/ja/21_guide2.png'], 'vi': ['/forms/vi/21_guide1.png'] },
  },
  {
    id: 27, cat: 'RESIDENCE',
    title: { ko: '체류지변경신고서', en: 'Change of Residence', zh: '滞留地变更申报', ja: '滞留地変更届', vi: 'Thay đổi nơi tạm trú' },
    desc:  { ko: '외국인이 국내 체류지를 변경했을 때 신고하는 서류입니다.', en: 'For foreigners reporting change of residence in Korea.', zh: '外国人在国内变更滞留地时申报的文件。', ja: '外国人が国内の滞留地を変更した時に届け出る書類です。', vi: 'Báo cáo khi người nước ngoài thay đổi nơi tạm trú.' },
    images: { 'en': '/forms/en/27.png', 'zh': '/forms/zh/27.png', 'ja': '/forms/ja/27.png', 'vi': '/forms/vi/27.png' },
    guideImages: { 'en': ['/forms/en/27_guide1.png'], 'ja': ['/forms/ja/27_guide1.png', '/forms/ja/27_guide2.png'], 'vi': ['/forms/vi/27_guide1.png'] },
  },
  {
    id: 28, cat: 'RESIDENCE',
    title: { ko: '체류지변경 위임장', en: 'POA for Residence Change', zh: '住所转移委托书', ja: '居所移転委任状', vi: 'Ủy quyền thay đổi cư trú' },
    desc:  { ko: '체류지 변경 신고를 대리인에게 위임할 때 작성합니다.', en: 'To delegate residence change reporting to a rep.', zh: '将滞留地变更申报委托给代理人。', ja: '滞留地変更届を代理人に委任する時に作成します。', vi: 'Lập khi ủy quyền báo cáo thay đổi nơi tạm trú.' },
    images: { 'en': '/forms/en/28.png', 'zh': '/forms/zh/28.png', 'ja': '/forms/ja/28.png', 'vi': '/forms/vi/28.png' },
  },
  {
    id: 30, cat: 'RESIDENCE',
    title: { ko: '출입국사실증명 위임장', en: 'POA for Entry/Exit Cert', zh: '出入境证明委托', ja: '出入国証明委任', vi: 'Ủy quyền cấp giấy XNC' },
    desc:  { ko: '출입국 사실증명서 발급을 대리인에게 맡길 때 작성합니다.', en: 'To delegate entry/exit certificate issuance.', zh: '将出入境事实证明书的发放交给代理人。', ja: '出入国事実証明書の発行を代理人に任せる時に作成します。', vi: 'Ủy quyền lấy giấy chứng nhận xuất nhập cảnh.' },
    images: { 'en': '/forms/en/30.png', 'zh': '/forms/zh/30.png', 'ja': '/forms/ja/30.png', 'vi': '/forms/vi/30.png' },
    guideImages: { 'ja': ['/forms/ja/30_guide1.png', '/forms/ja/30_guide2.png', '/forms/ja/30_guide3.png'], 'vi': ['/forms/vi/30_guide1.png', '/forms/vi/30_guide2.png'] },
  },
  {
    id: 31, cat: 'RESIDENCE',
    title: { ko: '주민등록표 신청서', en: 'Resident Register App', zh: '居民登记表申请', ja: '住民登録票申請', vi: 'Đơn cấp bản sao sổ hộ khẩu' },
    desc:  { ko: '주민등록 등본이나 초본을 발급받기 위해 신청합니다.', en: 'Request to issue a resident register copy.', zh: '领取居民登记誊本或抄本。', ja: '住民登録の謄本や抄本を発行してもらうために申請します。', vi: 'Đăng ký lấy bản sao sổ hộ khẩu.' },
    images: { 'en': '/forms/en/31.png', 'zh': '/forms/zh/31.png', 'ja': '/forms/ja/31.png', 'vi': '/forms/vi/31.png' },
    guideImages: { 'en': ['/forms/en/31_guide1.png', '/forms/en/31_guide2.png', '/forms/en/31_guide3.png', '/forms/en/31_guide4.png', '/forms/en/31_guide5.png', '/forms/en/31_guide6.png'], 'zh': ['/forms/zh/31_guide1.png'], 'vi': ['/forms/vi/31_guide1.png', '/forms/vi/31_guide2.png', '/forms/vi/31_guide3.png', '/forms/vi/31_guide4.png', '/forms/vi/31_guide5.png', '/forms/vi/31_guide6.png'] },
  },
  {
    id: 32, cat: 'RESIDENCE',
    title: { ko: '주민등록신고서', en: 'Resident Registration', zh: '居民登记申报', ja: '住民登録届', vi: 'Báo cáo đăng ký cư trú' },
    desc:  { ko: '전입, 전출 등 주민등록 사항을 신고할 때 사용합니다.', en: 'Used for resident registration like moving in/out.', zh: '申报迁入、迁出等居民登记事项。', ja: '転入、転出など住民登録事項を届け出る時に使用します。', vi: 'Báo cáo các vấn đề đăng ký cư trú.' },
    images: { 'en': '/forms/en/32.png', 'zh': '/forms/zh/32.png', 'ja': '/forms/ja/32.png', 'vi': '/forms/vi/32.png' },
    guideImages: { 'en': ['/forms/en/32_guide1.png', '/forms/en/32_guide2.png', '/forms/en/32_guide3.png'], 'ja': ['/forms/ja/32_guide1.png', '/forms/ja/32_guide2.png'], 'vi': ['/forms/vi/32_guide1.png', '/forms/vi/32_guide2.png'] },
  },
  {
    id: 34, cat: 'RESIDENCE',
    title: { ko: '주민등록표 발급 위임장', en: 'POA for Resident Register', zh: '居民登记表委托', ja: '住民登録票委任状', vi: 'Ủy quyền cấp sổ hộ khẩu' },
    desc:  { ko: '주민등록 등·초본 발급을 대리인에게 위임할 때 작성합니다.', en: 'To delegate resident register issuance.', zh: '将居民登记誊·抄本发放委托给代理人。', ja: '住民登録謄・抄本の発行を代理人に委任する時に作成します。', vi: 'Ủy quyền lấy bản sao sổ hộ khẩu.' },
    images: { 'en': '/forms/en/34.png', 'zh': '/forms/zh/34.png', 'ja': '/forms/ja/34.png', 'vi': '/forms/vi/34.png' },
    guideImages: { 'en': ['/forms/en/34_guide1.png', '/forms/en/34_guide2.png', '/forms/en/34_guide3.png', '/forms/en/34_guide4.png', '/forms/en/34_guide5.png', '/forms/en/34_guide6.png'], 'zh': ['/forms/zh/34_guide1.png'], 'ja': ['/forms/ja/34_guide1.png', '/forms/ja/34_guide2.png', '/forms/ja/34_guide3.png', '/forms/ja/34_guide4.png', '/forms/ja/34_guide5.png', '/forms/ja/34_guide6.png'], 'vi': ['/forms/vi/34_guide1.png', '/forms/vi/34_guide2.png', '/forms/vi/34_guide3.png', '/forms/vi/34_guide4.png', '/forms/vi/34_guide5.png'] },
  },

  // ── 신분/인감 (ID_SEAL) ────────────────────────────────────
  {
    id: 22, cat: 'ID_SEAL',
    title: { ko: '인감보호신청/해제신청서', en: 'Seal Protection/Release', zh: '印章保护申请/解除', ja: '印鑑保護申請/解除', vi: 'Đơn xin bảo hộ/hủy ấn dấu' },
    desc:  { ko: '인감 도용 방지를 위해 본인 외 발급을 제한하거나 해제합니다.', en: 'Restrict or release seal issuance to others.', zh: '为防止印章被盗用, 限制或解除发放。', ja: '印鑑の盗用防止のために発行を制限したり解除したりします。', vi: 'Hạn chế hoặc hủy bỏ việc cấp ấn dấu cho người khác.' },
    images: { 'en': '/forms/en/22.png', 'zh': '/forms/zh/22.png', 'ja': '/forms/ja/22.png', 'vi': '/forms/vi/22.png' },
  },
  {
    id: 24, cat: 'ID_SEAL',
    title: { ko: '인감(변경)신고서(서면)', en: 'Seal Registration', zh: '印章(变更)申报', ja: '印鑑(変更)届', vi: 'Báo cáo thay đổi ấn dấu' },
    desc:  { ko: '새로운 인감을 등록하거나 기존 인감을 변경할 때 사용합니다.', en: 'Used to register or change a personal seal.', zh: '登记新印章或变更现有印章时使用。', ja: '新しい印鑑を登録したり既存の印鑑を変更する時に使用します。', vi: 'Sử dụng khi đăng ký ấn dấu mới.' },
    images: { 'en': '/forms/en/24.png', 'zh': '/forms/zh/24.png', 'ja': '/forms/ja/24.png', 'vi': '/forms/vi/24.png' },
    guideImages: { 'en': ['/forms/en/24_guide1.png', '/forms/en/24_guide2.png', '/forms/en/24_guide3.png', '/forms/en/24_guide4.png', '/forms/en/24_guide5.png'], 'zh': ['/forms/zh/24_guide1.png'], 'ja': ['/forms/ja/24_guide1.png', '/forms/ja/24_guide2.png', '/forms/ja/24_guide3.png', '/forms/ja/24_guide4.png', '/forms/ja/24_guide5.png'], 'vi': ['/forms/vi/24_guide1.png', '/forms/vi/24_guide2.png', '/forms/vi/24_guide3.png', '/forms/vi/24_guide4.png', '/forms/vi/24_guide5.png', '/forms/vi/24_guide6.png', '/forms/vi/24_guide7.png'] },
  },
  {
    id: 25, cat: 'ID_SEAL',
    title: { ko: '인감증명 위임장', en: 'POA for Seal Certificate', zh: '印章证明委托书', ja: '印鑑証明委任状', vi: 'Giấy ủy quyền ấn dấu' },
    desc:  { ko: '대리인이 인감증명을 발급받을 때 작성합니다.', en: 'Written when a representative gets a seal certificate.', zh: '由代理人领取印章证明时填写。', ja: '代理人が印鑑証明を受け取る時に作成します。', vi: 'Lập khi người đại diện đi lấy chứng nhận ấn dấu.' },
    images: { 'en': '/forms/en/25.png', 'zh': '/forms/zh/25.png', 'ja': '/forms/ja/25.png', 'vi': '/forms/vi/25.png' },
  },
  {
    id: 26, cat: 'ID_SEAL',
    title: { ko: '인감 상태 변경 신고서', en: 'Seal Status Change', zh: '印章状态变更', ja: '印鑑状態変更', vi: 'Báo cáo trạng thái ấn dấu' },
    desc:  { ko: '인감의 말소, 부활, 사망 신고 등을 할 때 제출합니다.', en: 'Submitted for cancellation or restoration of a seal.', zh: '进行印章的注销、恢复、死亡申报等。', ja: '印鑑の抹消、復活、死亡届などをする時に提出します。', vi: 'Nộp khi báo cáo hủy hoặc khôi phục ấn dấu.' },
    images: { 'en': '/forms/en/26.png', 'zh': '/forms/zh/26.png', 'ja': '/forms/ja/26.png', 'vi': '/forms/vi/26.png' },
  },
  {
    id: 33, cat: 'ID_SEAL',
    title: { ko: '주민등록증 분실신고서', en: 'Lost ID Card Report', zh: '居民身份证丢失申报', ja: '住民登録証紛失届', vi: 'Báo cáo mất thẻ căn cước' },
    desc:  { ko: '주민등록증을 잃어버렸을 때 도용 방지를 위해 신고합니다.', en: 'Report a lost ID card to prevent misuse.', zh: '丢失居民身份证时为防止被盗用而申报。', ja: '住民登録証を紛失した時、盗用防止のために届け出ます。', vi: 'Báo cáo khi mất thẻ căn cước.' },
    images: { 'en': '/forms/en/33.png', 'zh': '/forms/zh/33.png', 'ja': '/forms/ja/33.png', 'vi': '/forms/vi/33.png' },
    guideImages: { 'en': ['/forms/en/33_guide1.png', '/forms/en/33_guide2.png'], 'vi': ['/forms/vi/33_guide1.png', '/forms/vi/33_guide2.png'] },
  },
  {
    id: 35, cat: 'ID_SEAL',
    title: { ko: '주민등록증 발급 신청서', en: 'ID Issuance Application', zh: '居民身份证发放申请', ja: '住民登録証発行申請', vi: 'Đơn xin cấp thẻ căn cước' },
    desc:  { ko: '만 17세가 되어 처음 주민등록증을 만들 때 신청합니다.', en: 'Apply for the first ID card at age 17.', zh: '满17岁第一次制作居民身份证时申请。', ja: '満17歳になり、初めて住民登録証を作る時に申請します。', vi: 'Làm thẻ căn cước lần đầu khi đủ 17 tuổi.' },
    images: { 'en': '/forms/en/35.png', 'zh': '/forms/zh/35.png', 'ja': '/forms/ja/35.png', 'vi': '/forms/vi/35.png' },
    guideImages: { 'en': ['/forms/en/35_guide1.png', '/forms/en/35_guide2.png', '/forms/en/35_guide3.png', '/forms/en/35_guide4.png', '/forms/en/35_guide5.png'], 'zh': ['/forms/zh/35_guide1.png'], 'ja': ['/forms/ja/35_guide1.png'], 'vi': ['/forms/vi/35_guide1.png', '/forms/vi/35_guide2.png', '/forms/vi/35_guide3.png', '/forms/vi/35_guide4.png'] },
  },
  {
    id: 36, cat: 'ID_SEAL',
    title: { ko: '주민등록증 재발급 신청서', en: 'ID Re-issuance App', zh: '身份证再发放申请', ja: '住民登録証再発行申請', vi: 'Đơn cấp lại thẻ căn cước' },
    desc:  { ko: '분실, 훼손 등으로 주민등록증을 다시 만들 때 신청합니다.', en: 'Apply for ID card re-issuance.', zh: '因丢失、损坏等重新制作居民身份证。', ja: '紛失、毀損などで住民登録証を作り直す時に申請します。', vi: 'Đăng ký làm lại thẻ căn cước.' },
    images: { 'en': '/forms/en/36.png', 'zh': '/forms/zh/36.png', 'ja': '/forms/ja/36.png', 'vi': '/forms/vi/36.png' },
    guideImages: { 'en': ['/forms/en/36_guide1.png', '/forms/en/36_guide2.png', '/forms/en/36_guide3.png', '/forms/en/36_guide4.png'], 'vi': ['/forms/vi/36_guide1.png', '/forms/vi/36_guide2.png', '/forms/vi/36_guide3.png'] },
  },

  // ── 차량/이륜차 (VEHICLE) ──────────────────────────────────
  {
    id: 37, cat: 'VEHICLE',
    title: { ko: '이륜자동차사용신고서', en: 'Motorcycle Registration', zh: '二轮汽车使用申报', ja: '二輪自動車使用届', vi: 'Báo cáo sử dụng xe máy' },
    desc:  { ko: '오토바이를 새로 구입하여 신고할 때 제출합니다.', en: 'Submitted to register a new motorcycle.', zh: '新购买摩托车进行使用申报。', ja: 'バイクを新しく購入して使用届を出す時に提出します。', vi: 'Đăng ký sử dụng xe máy mới.' },
    images: { 'en': '/forms/en/37.png', 'zh': '/forms/zh/37.png', 'ja': '/forms/ja/37.png', 'vi': '/forms/vi/37.png' },
    guideImages: { 'en': ['/forms/en/37_guide1.png', '/forms/en/37_guide2.png'], 'vi': ['/forms/vi/37_guide1.png', '/forms/vi/37_guide2.png', '/forms/vi/37_guide3.png', '/forms/vi/37_guide4.png', '/forms/vi/37_guide5.png', '/forms/vi/37_guide6.png'] },
  },
  {
    id: 38, cat: 'VEHICLE',
    title: { ko: '이륜자동차사용폐지신고서', en: 'Motorcycle Disuse Report', zh: '二轮汽车废止申报', ja: '二輪自動車使用廃止届', vi: 'Hủy sử dụng xe máy' },
    desc:  { ko: '오토바이 사용을 중단하거나 폐기할 때 신고합니다.', en: 'Report stopping or scrapping a motorcycle.', zh: '停止使用或报废摩托车时申报。', ja: 'バイクの使用を中断したり廃棄したりする時に届け出ます。', vi: 'Báo cáo hủy sử dụng xe máy.' },
    images: { 'en': '/forms/en/38.png', 'zh': '/forms/zh/38.png', 'ja': '/forms/ja/38.png', 'vi': '/forms/vi/38.png' },
    guideImages: { 'en': ['/forms/en/38_guide1.png', '/forms/en/38_guide2.png'], 'ja': ['/forms/ja/38_guide1.png'], 'vi': ['/forms/vi/38_guide1.png'] },
  },
  {
    id: 39, cat: 'VEHICLE',
    title: { ko: '이륜자동차변경신청서', en: 'Motorcycle Change App', zh: '二轮汽车变更申请', ja: '二輪自動車変更申請', vi: 'Thay đổi báo cáo xe máy' },
    desc:  { ko: '오토바이 소유자 정보 등 변경 사항이 있을 때 신청합니다.', en: 'Apply when there are changes in owner info.', zh: '摩托车所有者地址等有变更事项。', ja: 'バイクの所有者の住所など変更がある時に申請します。', vi: 'Thay đổi thông tin báo cáo xe máy.' },
    images: { 'en': '/forms/en/39.png', 'zh': '/forms/zh/39.png', 'ja': '/forms/ja/39.png', 'vi': '/forms/vi/39.png' },
    guideImages: { 'en': ['/forms/en/39_guide1.png', '/forms/en/39_guide2.png'], 'vi': ['/forms/vi/39_guide1.png', '/forms/vi/39_guide2.png'] },
  },
  {
    id: 40, cat: 'VEHICLE',
    title: { ko: '자동차양도증명서', en: 'Vehicle Transfer', zh: '汽车让渡证明', ja: '自動車譲渡証明', vi: 'Chuyển nhượng xe' },
    desc:  { ko: '차량을 팔거나 넘길 때 작성하는 계약 서류입니다.', en: 'A contract for selling or transferring a vehicle.', zh: '转让车辆时填写的合同。', ja: '車両を売ったり譲ったりする時に作成する書類です。', vi: 'Hợp đồng chuyển nhượng xe.' },
    images: { 'en': '/forms/en/40.png', 'zh': '/forms/zh/40.png', 'ja': '/forms/ja/40.png', 'vi': '/forms/vi/40.png' },
  },
  {
    id: 41, cat: 'VEHICLE',
    title: { ko: '이륜자동차증서 재교부신청서', en: 'Motorcycle Cert Re-issuance', zh: '二轮汽车证件再交付', ja: '二輪自動車証書再交付', vi: 'Cấp lại giấy xe máy' },
    desc:  { ko: '오토바이 사용신고필증을 잃어버렸을 때 사용합니다.', en: 'Used to re-issue lost registration certificate.', zh: '丢失摩托车证件重新领取。', ja: 'バイクの証書を紛失して再発行してもらう時に使用します。', vi: 'Cấp lại giấy chứng nhận xe máy.' },
    images: { 'en': '/forms/en/41.png', 'zh': '/forms/zh/41.png', 'ja': '/forms/ja/41.png', 'vi': '/forms/vi/41.png' },
    guideImages: { 'en': ['/forms/en/41_guide1.png'], 'ja': ['/forms/ja/41_guide1.png'], 'vi': ['/forms/vi/41_guide1.png'] },
  },
];
