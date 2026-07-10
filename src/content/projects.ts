import type { Localized } from './site';

export interface ProjectSummaryGroup {
  title: string;
  description: string;
  themes: string[];
}

export const projectCopy: Localized<{
  eyebrow: string;
  title: string;
  description: string;
  sourceNote: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
}> = {
  'zh-Hant': {
    eyebrow: '計畫與合作',
    title: '計畫與產學合作摘要',
    description: '以公開研究計畫、產學合作、國際與學生研究三個面向，概述 AMPL 的材料、製程與工程合作方向。',
    sourceNote: '本頁依成大機械系官方教師頁之公開資料整理，合作內容以研究方向概述呈現。',
    ctaTitle: '合作與研究交流',
    ctaDescription: '若希望討論材料、製程、表徵或模擬相關合作，請透過正式聯絡資訊與實驗室聯繫。',
    ctaLabel: '聯繫討論',
  },
  en: {
    eyebrow: 'Projects & collaboration',
    title: 'Projects & Collaboration Summary',
    description: 'Public research, industry collaboration, and international and student research frame AMPL work across materials, processing, and engineering applications.',
    sourceNote: 'This page summarizes publicly available information from the official NCKU faculty profile and presents collaboration areas at a high level.',
    ctaTitle: 'Research and collaboration enquiries',
    ctaDescription: 'For collaboration related to materials, processing, characterization, or simulation, please contact the laboratory through the official contact information.',
    ctaLabel: 'Discuss collaboration',
  },
};

export const projectSummaryGroups: Localized<ProjectSummaryGroup[]> = {
  'zh-Hant': [
    {
      title: '公共研究計畫',
      description: '公共研究方向聚焦於永續材料、功能化與工程應用。',
      themes: [
        '綠色／負碳材料',
        '生物高分子複合材料',
        '感測材料',
        '熱電材料',
        '磨潤與腐蝕',
        '功能薄膜與塗層',
      ],
    },
    {
      title: '產學合作',
      description: '產學合作以材料分析、製程驗證與模擬輔助決策為主要方向。',
      themes: [
        '材料表徵',
        '陶瓷破損模型',
        '焊接製程分析',
        '馬達鐵芯結構與模擬分析',
        '塗層與分散效果驗證',
      ],
    },
    {
      title: '國際與學生研究',
      description: '國際與學生研究連結來源材料、製程探索與研究訓練。',
      themes: [
        '纖維素萃取',
        '學生專題研究',
        '材料與製程探索',
      ],
    },
  ],
  en: [
    {
      title: 'Public Research Projects',
      description: 'Public research directions focus on sustainable materials, functionalization, and engineering applications.',
      themes: [
        'green / negative-carbon materials',
        'biopolymer composites',
        'sensors',
        'thermoelectric materials',
        'tribology and corrosion',
        'functional films and coatings',
      ],
    },
    {
      title: 'Industry Collaboration',
      description: 'Industry collaboration is summarized around analysis, process verification, and simulation-assisted decisions.',
      themes: [
        'materials characterization',
        'ceramic fracture modeling',
        'welding process analysis',
        'motor core structural and simulation analysis',
        'coating and dispersion verification',
      ],
    },
    {
      title: 'International & Student Research',
      description: 'International and student research connects source materials, process exploration, and research training.',
      themes: [
        'cellulose extraction',
        'student research projects',
        'materials and process exploration',
      ],
    },
  ],
};
