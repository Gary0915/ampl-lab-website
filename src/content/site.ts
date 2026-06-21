export type Locale = 'zh-Hant' | 'en';
export type Localized<T = string> = Record<Locale, T>;
export const routes = ['about', 'research', 'members', 'publications', 'facilities', 'news', 'join-us', 'contact'] as const;
export type Route = (typeof routes)[number];
export const lab = {
  abbreviation: 'AMPL', chineseName: '尖端材料及製程實驗室', englishName: 'Advanced Material and Processing Lab',
  professor: { 'zh-Hant': '施士塵教授', en: 'Prof. Shih-Chen Shi' },
  department: { 'zh-Hant': '國立成功大學機械工程學系', en: 'Department of Mechanical Engineering, National Cheng Kung University' },
  email: 'scshi@mail.ncku.edu.tw',
  facultyProfileUrl: 'https://www.me.ncku.edu.tw/content_teacher_detail.php?teacher_rkey=Y48CKD4137',
  personalWebsiteUrl: 'https://ampl.me.ncku.edu.tw/',
  campusMapUrl: 'https://nckumap.ncku.edu.tw/map.php',
  rooms: {
    professorOffice: { 'zh-Hant': '7樓720室', en: '7F, Room 720' },
    laboratory: { 'zh-Hant': '10樓A06室', en: '10F, Room A06' },
    studentDiscussionRoom: { 'zh-Hant': '9樓908B室', en: '9F, Room 908B' },
  },
  phones: {
    professorOffice: '62176',
    laboratory: '62159-72',
  },
  education: {
    'zh-Hant': [
      '國立交通大學材料科學與工程博士',
      '國立成功大學機械工程碩士',
      '國立成功大學機械工程學士',
    ],
    en: [
      'Ph.D. in Materials Science and Engineering, National Chiao Tung University',
      'M.S. in Mechanical Engineering, National Cheng Kung University',
      'B.S. in Mechanical Engineering, National Cheng Kung University',
    ],
  },
  selectedExperience: {
    'zh-Hant': [
      '2014–至今　國立成功大學機械工程學系',
      '2013–2014　財團法人金屬工業研究發展中心',
      '2012–2013　新一代生技有限公司｜產品經理',
      '2007–2012　億光電子工業股份有限公司｜研發部副理',
    ],
    en: [
      '2014–present · Department of Mechanical Engineering, National Cheng Kung University',
      '2013–2014 · Metal Industries Research & Development Centre',
      '2012–2013 · Product Manager, New Generation Biotech Co., Ltd.',
      '2007–2012 · R&D Deputy Manager, Everlight Electronics Co., Ltd.',
    ],
  },
  researchExpertise: {
    'zh-Hant': [
      '雷射表面加工',
      '奈米材料／生物高分子／高分子複合材料',
      '金屬材料製程及特性分析',
      '陶瓷製程及材料設計／熱電材料',
      '磨潤技術',
      '破損分析',
      '抗腐蝕工藝',
      '綠能科技／負碳技藝',
    ],
    en: [
      'Laser surface processing',
      'Nanomaterials, biopolymers, and polymer composites',
      'Metal material processing and characterization',
      'Ceramic processing, material design, and thermoelectric materials',
      'Tribology',
      'Failure analysis',
      'Corrosion-resistant processes',
      'Green energy and negative-carbon technology',
    ],
  },
};
export const labels: Record<Locale, Record<Route | 'home', string>> = {
  'zh-Hant': { home:'首頁', about:'關於實驗室', research:'研究領域', members:'成員', publications:'出版品', facilities:'實驗設施', news:'最新消息', 'join-us':'加入我們', contact:'聯絡資訊' },
  en: { home:'Home', about:'About', research:'Research', members:'Members', publications:'Publications', facilities:'Facilities', news:'News', 'join-us':'Join Us', contact:'Contact' },
};
export const localeCopy: Localized<{readMore:string; contact:string; research:string; join:string; secondaryIdentity:string}> = {
  'zh-Hant': { readMore:'了解更多', contact:'聯絡資訊', research:'探索研究領域', join:'加入我們', secondaryIdentity:lab.englishName },
  en: { readMore:'Learn more', contact:'Contact', research:'Explore research', join:'Join us', secondaryIdentity:lab.chineseName },
};
