import { lab, type Localized } from './site';

export interface PublicationRecord {
  year: string;
  date: string;
  title: string;
  authors: string;
  journal: string;
  citation: string;
  indexStatus?: string;
  professorRole?: Localized<string>;
  tags: Localized<string[]>;
}

export interface OfficialProfileLink {
  label: Localized<string>;
  href: string;
}

export const publicationCopy: Localized<{
  previewEyebrow: string;
  previewTitle: string;
  previewDescription: string;
  previewCta: string;
  pageEyebrow: string;
  pageTitle: string;
  pageDescription: string;
  completeNote: string;
  yearGroupLabel: string;
}> = {
  'zh-Hant': {
    previewEyebrow: 'Selected recent publications',
    previewTitle: '近期精選期刊論文',
    previewDescription: '依成大機械系官方教師頁整理，精選近期與 AMPL 研究方向相關之期刊論文。',
    previewCta: '查看出版品',
    pageEyebrow: 'Official research records',
    pageTitle: '近期精選期刊論文',
    pageDescription: '以下收錄成大機械系官方教師頁前 5 筆近期期刊論文，作為 AMPL 網站的正式研究紀錄摘要。',
    completeNote: '完整書目將依官方資料持續整理與確認。',
    yearGroupLabel: '年度',
  },
  en: {
    previewEyebrow: 'Selected recent publications',
    previewTitle: 'Selected Recent Publications',
    previewDescription: 'A concise preview of recent journal articles curated from the official NCKU faculty profile.',
    previewCta: 'View publications',
    pageEyebrow: 'Official research records',
    pageTitle: 'Selected Recent Publications',
    pageDescription: 'The first five recent journal articles listed on the official NCKU faculty profile are presented as verified AMPL research records.',
    completeNote: 'Complete bibliographic records will continue to be organized and verified using official sources.',
    yearGroupLabel: 'Year',
  },
};

export const officialProfileLinks: OfficialProfileLink[] = [
  {
    label: {
      'zh-Hant': '成大機械系官方教師頁',
      en: 'Official NCKU Faculty Profile',
    },
    href: lab.facultyProfileUrl,
  },
  {
    label: {
      'zh-Hant': '個人網站',
      en: 'Professor Website',
    },
    href: lab.personalWebsiteUrl,
  },
];

export const selectedPublications: PublicationRecord[] = [
  {
    year: '2026',
    date: '2026/06/12',
    title: 'Laser Sintering of Ceramic Coatings on 304 Stainless Steel: Effects of Energy Input on Microstructure, Hardness, and Wear',
    authors: 'Shih-Chen Shi*, Po-Chun Wang, Guan-Yu Chen',
    journal: 'Sensors and Materials',
    citation: '2026, 38 (6), 3133-3142',
    indexStatus: 'SCI',
    professorRole: {
      'zh-Hant': '施士塵為第一作者及通訊作者',
      en: 'Prof. Shih-Chen Shi is listed as first author and corresponding author.',
    },
    tags: {
      'zh-Hant': ['表面工程', '磨耗', '功能塗層'],
      en: ['Surface Engineering', 'Tribology / Wear', 'Functional Materials'],
    },
  },
  {
    year: '2026',
    date: '2026/06/12',
    title: 'AI-enabled Welding Defect Detection and Resistivity Validation for Sustainable Manufacturing',
    authors: 'Alvin Anderson, Guan-Yu Chen, and Shih-Chen Shi*',
    journal: 'Sensors and Materials',
    citation: '2026, 38 (6), 3069-3076',
    indexStatus: 'SCI',
    professorRole: {
      'zh-Hant': '施士塵為通訊作者',
      en: 'Prof. Shih-Chen Shi is listed as corresponding author.',
    },
    tags: {
      'zh-Hant': ['永續製造', '製程檢測', '材料分析'],
      en: ['Sustainable Manufacturing', 'Process Analysis', 'Functional Materials'],
    },
  },
  {
    year: '2026',
    date: '2026/06/12',
    title: 'Bio-based Multi-filler Poly(methyl methacrylate) Composites for Sustainable UV-protective and Low-loss Microwave Sensor Applications',
    authors: 'Dieter Rahmadiawan, Shih-Chen Shi*, Du-Yi Wang',
    journal: 'Sensors and Materials',
    citation: '2026, 38 (6), 3041-3050',
    indexStatus: 'SCI',
    professorRole: {
      'zh-Hant': '施士塵為通訊作者',
      en: 'Prof. Shih-Chen Shi is listed as corresponding author.',
    },
    tags: {
      'zh-Hant': ['生質複材', '感測材料', '功能材料'],
      en: ['Bio-based Composites', 'Sensing Materials', 'Functional Materials'],
    },
  },
  {
    year: '2026',
    date: '2026/06/12',
    title: 'Ni–Fe Layered Double Hydroxide @ Nickel Foam Electrode with Electrochemical Impedance Spectroscopy-based Performance Monitoring for Efficient Water Splitting',
    authors: 'Hao-Ming Deng, Guan-Yu Chen, Shih-Chen Shi*',
    journal: 'Sensors and Materials',
    citation: '2026, 38 (6), 3007-3014',
    indexStatus: 'SCI',
    professorRole: {
      'zh-Hant': '施士塵為通訊作者',
      en: 'Prof. Shih-Chen Shi is listed as corresponding author.',
    },
    tags: {
      'zh-Hant': ['電化學感測', '綠能材料', '功能材料'],
      en: ['Electrochemical Sensing', 'Functional Materials', 'Sustainable Manufacturing'],
    },
  },
  {
    year: '2026',
    date: '2026/05/14',
    title: 'Functionalized porous PVA/SiO₂ composite films for multi-gas adsorption and selective SO₂ and HCHO sensing',
    authors: 'Yung-Tai Hsu, Dieter Rahmadiawan, Shih-Chen Shi*',
    journal: 'Materials Research Express',
    citation: '2026, 13, 105501',
    indexStatus: 'SCI',
    professorRole: {
      'zh-Hant': '施士塵為通訊作者',
      en: 'Prof. Shih-Chen Shi is listed as corresponding author.',
    },
    tags: {
      'zh-Hant': ['氣體感測', '環境材料', '功能薄膜'],
      en: ['Gas Sensing', 'Environmental Materials', 'Functional Materials'],
    },
  },
];
