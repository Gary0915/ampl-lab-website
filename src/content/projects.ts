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
}> = {
  'zh-Hant': {
    eyebrow: '計畫與合作',
    title: '計畫與產學合作摘要',
    description: '依官方「計畫與產學合作」公開內容整理為 AMPL 的研究方向摘要，避免將實驗室網站變成完整教師履歷資料庫。',
    sourceNote: '完整計畫名稱、公司名稱、計畫編號與成果細節，建議於教授確認後再決定是否擴充。',
  },
  en: {
    eyebrow: 'Projects & collaboration',
    title: 'Projects & Collaboration Summary',
    description: 'Themes are summarized from the official Projects and Industry Collaboration section to communicate AMPL research directions without turning the site into a full faculty CV database.',
    sourceNote: 'Full project titles, company names, grant numbers, and outcome details should be expanded only after professor confirmation.',
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
