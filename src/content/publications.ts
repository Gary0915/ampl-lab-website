import { lab, type Localized } from './site';

export interface PublicationRecord {
  year: string;
  date: string;
  title: string;
  authors: string;
  journal: string;
  citation?: string;
  indexStatus?: string;
  professorRole?: Localized<string>;
  tags: Localized<string[]>;
  sourceNote?: Localized<string>;
  needsReview?: boolean;
}

export interface OfficialProfileLink {
  label: Localized<string>;
  href: string;
}

const officialSourceNote: Localized<string> = {
  'zh-Hant': '資料來源：國立成功大學機械工程學系官方教師頁。',
  en: 'Source: official NCKU Department of Mechanical Engineering faculty profile.',
};

const correspondingAuthor: Localized<string> = {
  'zh-Hant': '施士塵教授為通訊作者。',
  en: 'Prof. Shih-Chen Shi is listed as corresponding author.',
};

const firstAndCorrespondingAuthor: Localized<string> = {
  'zh-Hant': '施士塵教授為第一作者及通訊作者。',
  en: 'Prof. Shih-Chen Shi is listed as first author and corresponding author.',
};

const soleCorrespondingAuthor: Localized<string> = {
  'zh-Hant': '施士塵教授為唯一通訊作者。',
  en: 'Prof. Shih-Chen Shi is listed as sole corresponding author.',
};

const soleFirstAndCorrespondingAuthor: Localized<string> = {
  'zh-Hant': '施士塵教授為第一作者及唯一通訊作者。',
  en: 'Prof. Shih-Chen Shi is listed as first author and sole corresponding author.',
};

export const publicationCopy: Localized<{
  previewEyebrow: string;
  previewTitle: string;
  previewDescription: string;
  previewCta: string;
  pageEyebrow: string;
  pageTitle: string;
  pageDescription: string;
  explorerEyebrow: string;
  explorerTitle: string;
  explorerDescription: string;
  completeNote: string;
  yearGroupLabel: string;
}> = {
  'zh-Hant': {
    previewEyebrow: 'Selected recent publications',
    previewTitle: '近期精選期刊論文',
    previewDescription: '依成大機械系官方教師頁整理，精選近期與 AMPL 研究方向相關之期刊論文。',
    previewCta: '查看出版品',
    pageEyebrow: 'Featured recent publications',
    pageTitle: '重點近期期刊論文',
    pageDescription: '以下以較完整的卡片呈現官方教師頁最新 5 筆期刊論文，作為 AMPL 近期研究成果的入口。',
    explorerEyebrow: 'Recent journal publications',
    explorerTitle: '近兩年期刊論文',
    explorerDescription: '承載 2026 與 2025 官方期刊紀錄，使用精簡列式資訊、年份與主題篩選維持閱讀節奏。',
    completeNote: '完整書目將依官方資料持續整理與確認；本頁目前聚焦 2026 與 2025 年官方期刊論文紀錄。',
    yearGroupLabel: '年度',
  },
  en: {
    previewEyebrow: 'Selected recent publications',
    previewTitle: 'Selected Recent Publications',
    previewDescription: 'A concise preview of recent journal articles curated from the official NCKU faculty profile.',
    previewCta: 'View publications',
    pageEyebrow: 'Featured recent publications',
    pageTitle: 'Featured Recent Publications',
    pageDescription: 'The five newest official journal records are presented as featured AMPL publication cards.',
    explorerEyebrow: 'Recent journal publications',
    explorerTitle: 'Recent Journal Publications',
    explorerDescription: 'Official 2026 and 2025 journal records are organized as compact citation rows with real year and topic filtering.',
    completeNote: 'Complete bibliographic records will continue to be organized and verified using official sources; this page currently focuses on official 2026 and 2025 journal records.',
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

export const recentJournalPublications: PublicationRecord[] = [
  {
    year: '2026',
    date: '2026/06/30',
    title: 'AI-Driven Intelligent Grinding Automation for Precision Motorcycle Camshaft Manufacturing',
    authors: 'Shih-Chen Shi*, Jun-Han Lin, Guan-Yu Chen',
    journal: 'Journal of the Chinese Society of Mechanical Engineers',
    citation: '2026, 47 (3), 221-226',
    indexStatus: 'SCI',
    professorRole: firstAndCorrespondingAuthor,
    tags: {
      'zh-Hant': ['永續製造', '製程最佳化', '工程應用'],
      en: ['Sustainable Manufacturing', 'Process Optimization', 'Engineering Applications'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2026',
    date: '2026/06/30',
    title: 'Circularity and sustainability in high-performance composite engineering',
    authors: 'Caroliny M. Santos, Vishnu Vijay Kumar, Bahati Shabani Nzeyimana, Shuchi Tiwari, Dieter Rahmadiawan, Thiago F. Santos, Shih-Chen Shi',
    journal: 'Composites Part A',
    indexStatus: 'SCI',
    tags: {
      'zh-Hant': ['循環經濟', '生質複材', '功能材料'],
      en: ['Circular Economy', 'Bio-based Composites', 'Functional Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2026',
    date: '2026/06/27',
    title: 'Simple latex-route preparation of vulcanized nitrile butadiene rubber composite films reinforced with cellulose nanocrystals and tannic acid',
    authors: 'Dieter Rahmadiawan, Shih-Chen Shi*',
    journal: 'Polymer Testing',
    indexStatus: 'SCI',
    professorRole: correspondingAuthor,
    tags: {
      'zh-Hant': ['生質複材', '奈米材料', '功能材料'],
      en: ['Bio-based Composites', 'Nanomaterials', 'Functional Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2026',
    date: '2026/06/12',
    title: 'Laser Sintering of Ceramic Coatings on 304 Stainless Steel: Effects of Energy Input on Microstructure, Hardness, and Wear',
    authors: 'Shih-Chen Shi*, Po-Chun Wang, Guan-Yu Chen',
    journal: 'Sensors and Materials',
    citation: '2026, 38 (6), 3133-3142',
    indexStatus: 'SCI',
    professorRole: firstAndCorrespondingAuthor,
    tags: {
      'zh-Hant': ['表面工程', '磨耗', '功能材料'],
      en: ['Surface Engineering', 'Tribology / Wear', 'Functional Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2026',
    date: '2026/06/12',
    title: 'AI-enabled Welding Defect Detection and Resistivity Validation for Sustainable Manufacturing',
    authors: 'Alvin Anderson, Guan-Yu Chen, and Shih-Chen Shi*',
    journal: 'Sensors and Materials',
    citation: '2026, 38 (6), 3069-3076',
    indexStatus: 'SCI',
    professorRole: correspondingAuthor,
    tags: {
      'zh-Hant': ['永續製造', '焊接製程', '製程最佳化'],
      en: ['Sustainable Manufacturing', 'Welding / Joining', 'Process Optimization'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2026',
    date: '2026/06/12',
    title: 'Bio-based Multi-filler Poly(methyl methacrylate) Composites for Sustainable UV-protective and Low-loss Microwave Sensor Applications',
    authors: 'Dieter Rahmadiawan, Shih-Chen Shi*, Du-Yi Wang',
    journal: 'Sensors and Materials',
    citation: '2026, 38 (6), 3041-3050',
    indexStatus: 'SCI',
    professorRole: correspondingAuthor,
    tags: {
      'zh-Hant': ['生質複材', '感測材料', '功能材料'],
      en: ['Bio-based Composites', 'Sensing Materials', 'Functional Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2026',
    date: '2026/06/12',
    title: 'Ni–Fe Layered Double Hydroxide @ Nickel Foam Electrode with Electrochemical Impedance Spectroscopy-based Performance Monitoring for Efficient Water Splitting',
    authors: 'Hao-Ming Deng, Guan-Yu Chen, Shih-Chen Shi*',
    journal: 'Sensors and Materials',
    citation: '2026, 38 (6), 3007-3014',
    indexStatus: 'SCI',
    professorRole: correspondingAuthor,
    tags: {
      'zh-Hant': ['電化學感測', '功能材料', '永續製造'],
      en: ['Electrochemical Sensing', 'Functional Materials', 'Sustainable Manufacturing'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2026',
    date: '2026/05/14',
    title: 'Functionalized porous PVA/SiO₂ composite films for multi-gas adsorption and selective SO₂ and HCHO sensing',
    authors: 'Yung-Tai Hsu, Dieter Rahmadiawan, Shih-Chen Shi*',
    journal: 'Materials Research Express',
    citation: '2026, 13, 105501',
    indexStatus: 'SCI',
    professorRole: correspondingAuthor,
    tags: {
      'zh-Hant': ['氣體感測', '環境材料', '功能材料'],
      en: ['Gas Sensing', 'Environmental Materials', 'Functional Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2026',
    date: '2026/03/21',
    title: 'Valorization of Gambir Leaf Residues and Sago Starch into Functional PVA-Based Biofilms for Sustainable Bio-Based Products in Southeast Asia',
    authors: 'Dieter Rahmadiawan, Akmal, Hairul Abral, Stivan Kharisma Mukti, Dian Handayani, Upik Tadzkia Khairani, Dilla Ghania Putri, Shih-Chen Shi, R.A. Ilyas, Thiago F Santos',
    journal: 'Biomass and Bioenergy',
    indexStatus: 'SCI, Q1',
    tags: {
      'zh-Hant': ['循環經濟', '生質複材', '永續材料'],
      en: ['Circular Economy', 'Bio-based Composites', 'Sustainable Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2026',
    date: '2026/02/27',
    title: 'Enhanced tribological and corrosion resistance of PMMA-based composite coatings reinforced with SiO2, CNC, and lignin: Towards durable biomedical materials',
    authors: 'Shih-Chen Shi*, Dieter Rahmadiawan, Chun-Wei Kang',
    journal: 'Heliyon',
    indexStatus: 'SCI, Q1',
    professorRole: firstAndCorrespondingAuthor,
    tags: {
      'zh-Hant': ['磨耗', '抗腐蝕', '生醫材料'],
      en: ['Tribology / Wear', 'Corrosion Protection', 'Biomedical Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2026',
    date: '2026/01/22',
    title: 'Thirty Years of Borophene: Origins, Scientific Progress, and Future Directions',
    authors: 'Thiago F. Santos, Ihsan Boustani, Caroliny M. Santos, Dieter Rahmadiawan*, Shih-Chen Shi, Jose Heriberto Oliveira Nascimento',
    journal: 'ACS Applied Materials & Interfaces',
    indexStatus: 'SCI',
    tags: {
      'zh-Hant': ['奈米材料', '功能材料', '綜述論文'],
      en: ['Nanomaterials', 'Functional Materials', 'Materials Review'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2026',
    date: '2026/01/20',
    title: 'One-step fabrication of Chitosan–Copper SERS nanocomposites for pesticide and microplastic detection',
    authors: 'Shih-Chen Shi*, Si-Chi Chen, Dieter Rahmadiawan',
    journal: 'Materials Chemistry and Physics',
    indexStatus: 'SCI',
    professorRole: firstAndCorrespondingAuthor,
    tags: {
      'zh-Hant': ['感測材料', '奈米材料', '環境材料'],
      en: ['Sensing Materials', 'Nanomaterials', 'Environmental Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2026',
    date: '2026/01/14',
    title: 'Conductivity Enhancement and Strain Gauge Optimization for Accurate and Stable Flexible Wearable Motion Sensors',
    authors: 'Yen-Kai Huang, Shih-Chen Shi*, Dieter Rahmadiawan, Guan-Yu Chen',
    journal: 'ACS Omega',
    indexStatus: 'SCI',
    professorRole: correspondingAuthor,
    tags: {
      'zh-Hant': ['感測材料', '柔性電子', '功能材料'],
      en: ['Sensing Materials', 'Flexible Electronics', 'Functional Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2025',
    date: '2025/12/30',
    title: 'Sustainable High-Performance Particleboard from Corn Husk Fibers and Chitosan Adhesive Materials',
    authors: 'Shih-Chen Shi*, Ming-Hao Xue and Dieter Rahmadiawan',
    journal: 'Journal of the Chinese Society of Mechanical Engineers',
    indexStatus: 'SCI',
    professorRole: firstAndCorrespondingAuthor,
    tags: {
      'zh-Hant': ['循環經濟', '生質複材', '永續材料'],
      en: ['Circular Economy', 'Bio-based Composites', 'Sustainable Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2025',
    date: '2025/12/19',
    title: 'Sol–Gel Derived SiO₂/PMMA Composite Coatings with Tunable Dispersion for Corrosion Protection of Ti-6Al-4V',
    authors: 'Cheng-En Jiang, Guan-Yu Chen and Shih-Chen Shi*',
    journal: 'Journal of the Chinese Society of Mechanical Engineers',
    indexStatus: 'SCI',
    professorRole: correspondingAuthor,
    tags: {
      'zh-Hant': ['表面工程', '抗腐蝕', '功能材料'],
      en: ['Surface Engineering', 'Corrosion Protection', 'Functional Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2025',
    date: '2025/10/21',
    title: 'Quantifying Adhesion and Stability in Aluminum-coated Flexible Substrates for Sensor Applications via Buckling Delamination Mechanism',
    authors: 'Shih-Chen Shi,*Jyun-Wei Chen, Dieter Rahmadiawan',
    journal: 'Sensors and Materials',
    indexStatus: 'SCI',
    professorRole: soleCorrespondingAuthor,
    tags: {
      'zh-Hant': ['表面工程', '感測材料', '柔性電子'],
      en: ['Surface Engineering', 'Sensing Materials', 'Flexible Electronics'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2025',
    date: '2025/10/21',
    title: 'Dimethyl Sulfoxide–Enhanced Poly(3,4-ethylenedioxythiophene): Poly(styrenesulfonate) Hydrogels for Flexible and Conductive Sensors',
    authors: 'Yen-Kai Huang, Shih-Chen Shi,* Guan-Yu Chen, Dieter Rahmadiawan',
    journal: 'Sensors and Materials',
    indexStatus: 'SCI',
    professorRole: soleCorrespondingAuthor,
    tags: {
      'zh-Hant': ['感測材料', '柔性電子', '功能材料'],
      en: ['Sensing Materials', 'Flexible Electronics', 'Functional Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2025',
    date: '2025/10/21',
    title: 'Quantitative Sulfur Dioxide Monitoring Using an Environmentally Friendly Polyvinyl Alcohol Sensor with Linear Fourier Transform Infrared Response',
    authors: 'Yung-Tai Hsu, Chih-Chia Wang, Dieter Rahmadiawan, Guan-Yu Chen, and Shih-Chen Shi*',
    journal: 'Sensors and Materials',
    indexStatus: 'SCI',
    professorRole: soleCorrespondingAuthor,
    tags: {
      'zh-Hant': ['氣體感測', '環境材料', '感測材料'],
      en: ['Gas Sensing', 'Environmental Materials', 'Sensing Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2025',
    date: '2025/10/12',
    title: 'Solvent-selective extraction of Syzygium polyanthum bioactives for tailored polyvinyl alcohol composites: A lignocellulose-derived approach toward biorefinery-based functional materials',
    authors: 'Dieter Rahmadiawan, Akmal, Hairul Abral*, Muhammad Adlan Azka, S.M. Sapuan, Kadriadi, Dian Handayani, Dilla Ghania Putri, Upik Tadzkia Khairani, Ahmad Zikri, Shih-Chen Shi',
    journal: 'Biomass and Bioenergy',
    indexStatus: 'SCI',
    tags: {
      'zh-Hant': ['循環經濟', '生質複材', '功能材料'],
      en: ['Circular Economy', 'Bio-based Composites', 'Functional Materials'],
    },
    sourceNote: officialSourceNote,
    needsReview: true,
  },
  {
    year: '2025',
    date: '2025/08/19',
    title: 'Advancements in Cellulose for Eco-Friendly Lubricant Applications: A Review on Tribological Properties',
    authors: 'Dieter Rahmadiawan, Shih-Chen Shi,* Navid Aslfattahi, Anna Niska Fauza, and Zahrul Fuadi',
    journal: 'ACS Omega',
    indexStatus: 'SCI',
    professorRole: soleCorrespondingAuthor,
    tags: {
      'zh-Hant': ['磨耗', '生質複材', '綜述論文'],
      en: ['Tribology / Wear', 'Bio-based Composites', 'Materials Review'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2025',
    date: '2025/08/06',
    title: 'Enhancing the flexibility of polyvinyl alcohol/Uncaria gambir extract/boric acid biopolymer films via prolonged water immersion post-treatment',
    authors: 'Dieter Rahmadiawan, Hairul Abral, Razan Muhammad Railis,* Shih-Chen Shi, Melbi Mahardika, Ilham Chayri, Fazhar Akbar',
    journal: 'Case Studies in Chemical and Environmental Engineering',
    tags: {
      'zh-Hant': ['生質複材', '環境材料', '功能材料'],
      en: ['Bio-based Composites', 'Environmental Materials', 'Functional Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2025',
    date: '2025/08/01',
    title: 'Enhanced tribological and corrosion behavior of PMMA composites reinforced with surface-modified silica nanoparticles and self-assembled lignin hybrid fillers',
    authors: 'Hsin-Han Hsiao, Dieter Rahmadiawan, Shih-Chen Shi*',
    journal: 'Journal of Polymer Research',
    indexStatus: 'SCI',
    professorRole: soleCorrespondingAuthor,
    tags: {
      'zh-Hant': ['磨耗', '抗腐蝕', '奈米材料'],
      en: ['Tribology / Wear', 'Corrosion Protection', 'Nanomaterials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2025',
    date: '2025/06/15',
    title: 'Enhanced Optical Measurement and Stress Quantification of Film Roll Wrinkling in Roll-to-Roll Processing',
    authors: 'Shih-Chen Shi,*Hung-Wei Rao, Dieter Rahmadiawan',
    journal: 'Journal of the Chinese Society of Mechanical Engineers',
    indexStatus: 'SCI',
    professorRole: soleFirstAndCorrespondingAuthor,
    tags: {
      'zh-Hant': ['製程最佳化', '表面工程', '製造分析'],
      en: ['Process Optimization', 'Surface Engineering', 'Manufacturing Analysis'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2025',
    date: '2025/05/16',
    title: 'Integrating Cellulose Nanocrystals, Antimicrobial Photodynamic Inactivation, and Poly[2-(tert-butylamino)ethyl methacrylate] into a 3D-printed Multifaceted Antimicrobial Sensor Material for Enhanced Sterilization and Wound Care Applications',
    authors: 'Shih-Chen Shi,* Yu-Chen Xu, Chih-Kuang Chen, Dieter Rahmadiawan, and Bao-Tsan Ko',
    journal: 'Sensors and Materials',
    indexStatus: 'SCI',
    professorRole: soleFirstAndCorrespondingAuthor,
    tags: {
      'zh-Hant': ['生醫材料', '感測材料', '生質複材'],
      en: ['Biomedical Materials', 'Sensing Materials', 'Bio-based Composites'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2025',
    date: '2025/05/16',
    title: 'Resistance-based CO₂ Detection Using Eco-friendly Tetraethylenepentamine-functionalized Polyvinyl Alcohol Films',
    authors: 'Yan-Ting Chen, Shih-Chen Shi,* and Dieter Rahmadiawan',
    journal: 'Sensors and Materials',
    indexStatus: 'SCI',
    professorRole: soleCorrespondingAuthor,
    tags: {
      'zh-Hant': ['氣體感測', '環境材料', '感測材料'],
      en: ['Gas Sensing', 'Environmental Materials', 'Sensing Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2025',
    date: '2025/05/16',
    title: 'Resistance-based CO₂ Detection Using Eco-friendly Tetraethylenepentamine-functionalized Polyvinyl Alcohol Films',
    authors: 'Yung-Tai Hsu, Chih-Chia Wang, Dieter Rahmadiawan, and Shih-Chen Shi*',
    journal: 'Sensors and Materials',
    indexStatus: 'SCI',
    professorRole: soleCorrespondingAuthor,
    tags: {
      'zh-Hant': ['氣體感測', '環境材料', '感測材料'],
      en: ['Gas Sensing', 'Environmental Materials', 'Sensing Materials'],
    },
    sourceNote: officialSourceNote,
    needsReview: true,
  },
  {
    year: '2025',
    date: '2025/05/16',
    title: 'Enhanced ZnSb Thermoelectric Materials with Graphene Barriers for Waste Heat Sensing and Energy Harvesting',
    authors: 'Yu-Chen Shih, Jen-Fin Lin, Shih-Chen Shi,* Guan-Yu Chen, and Dieter Rahmadiawan',
    journal: 'Sensors and Materials',
    indexStatus: 'SCI',
    professorRole: soleCorrespondingAuthor,
    tags: {
      'zh-Hant': ['熱電材料', '感測材料', '功能材料'],
      en: ['Thermoelectric Materials', 'Sensing Materials', 'Functional Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2025',
    date: '2025/04/01',
    title: 'Cellulose nanocrystal and self-assembling Lignin Enhanced PEDOT/PSS/PVA composite on mechanical and self-powered wearable properties',
    authors: 'Shih-Chen Shi*, Yan-Ching Hsieh, Dieter Rahmadiawan',
    journal: 'ACS Omega',
    indexStatus: 'SCI',
    professorRole: soleFirstAndCorrespondingAuthor,
    tags: {
      'zh-Hant': ['生質複材', '柔性電子', '感測材料'],
      en: ['Bio-based Composites', 'Flexible Electronics', 'Sensing Materials'],
    },
    sourceNote: officialSourceNote,
  },
  {
    year: '2025',
    date: '2025/01/14',
    title: 'Synergistic effects of Uncaria gambir and zinc oxide in polyvinyl alcohol films for enhanced UV and blue light shielding, antimicrobial properties, and hydrophobicity: improving application performance in sustainable packaging and protective eyewear',
    authors: 'Dieter Rahmadiawan, Hyun-Joong Kim, bHairul Abral*, Muhammad Aldi Pratama, Razan Muhammad Railis, Robi Kurniawan, Sri Rizki Putri Primandari, Shih-Chen Shi, Melbi Mahardik',
    journal: 'RSC Advances',
    indexStatus: 'SCI',
    tags: {
      'zh-Hant': ['生質複材', '功能材料', '永續材料'],
      en: ['Bio-based Composites', 'Functional Materials', 'Sustainable Materials'],
    },
    sourceNote: officialSourceNote,
    needsReview: true,
  },
  {
    year: '2025',
    date: '2025/01/09',
    title: 'Optimizing electrical and mechanical properties via intermetallics distribution in Cu–Al spot welding',
    authors: 'Shih-Chen Shi∗, Wei-Chieh Weng, Dieter Rahmadiawan',
    journal: 'Journal of Physics D: Applied Physics',
    indexStatus: 'SCI',
    professorRole: soleFirstAndCorrespondingAuthor,
    tags: {
      'zh-Hant': ['焊接製程', '製程最佳化', '功能材料'],
      en: ['Welding / Joining', 'Process Optimization', 'Functional Materials'],
    },
    sourceNote: officialSourceNote,
  },
];

export const selectedPublications = recentJournalPublications.slice(0, 5);
