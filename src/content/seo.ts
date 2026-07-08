import type { Locale, Route } from './site';

export type SeoRoute = Route | 'home';

export interface SeoPageMetadata {
  title: string;
  description: string;
}

export interface SeoMetadata extends SeoPageMetadata {
  canonicalUrl: string;
  ogImageUrl: string;
  ogImageAlt: string;
  ogLocale: string;
  ogLocaleAlternate: string;
  alternates: Array<{ hreflang: string; href: string }>;
}

export const seoConfig = {
  baseUrl: 'https://ampl-lab-website.pages.dev',
  siteName: 'AMPL | Advanced Material and Processing Lab',
  defaultOgImagePath: '/og-image.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  keywords: [
    'AMPL',
    'NCKU',
    'National Cheng Kung University',
    'Mechanical Engineering',
    'Advanced Material and Processing Lab',
    'green synthesis',
    'resource circularity',
    'nanomaterials',
    'bio-based composites',
    'surface engineering',
    'tribology',
    'materials processing',
    'simulation-assisted design',
  ],
  defaultTitle: {
    'zh-Hant': '尖端材料及製程實驗室｜國立成功大學機械工程學系',
    en: 'Advanced Material and Processing Lab | NCKU Mechanical Engineering',
  },
  defaultDescription: {
    'zh-Hant': '國立成功大學機械工程學系尖端材料及製程實驗室聚焦綠色合成、資源循環、奈米與生質複合材料、表面工程、磨潤行為與模擬輔助製程最佳化。',
    en: 'The Advanced Material and Processing Lab at NCKU Mechanical Engineering focuses on green synthesis, resource circularity, nanomaterials, bio-based composites, surface engineering, tribology, and simulation-assisted process optimization.',
  },
  ogImageAlt: {
    'zh-Hant': 'AMPL 尖端材料及製程實驗室分享預覽圖',
    en: 'AMPL Advanced Material and Processing Lab share preview image',
  },
} as const;

export const seoPages: Record<Locale, Record<SeoRoute, SeoPageMetadata>> = {
  'zh-Hant': {
    home: {
      title: '尖端材料及製程實驗室｜AMPL',
      description: '以農漁業副產物資源化為起點，串連奈米與生質複合材料、表面工程、磨潤行為與模擬輔助設計，發展材料與製程應用。',
    },
    about: {
      title: '關於實驗室｜尖端材料及製程實驗室',
      description: '認識國立成功大學機械工程學系尖端材料及製程實驗室、施士塵教授與實驗室研究理念。',
    },
    research: {
      title: '研究領域｜尖端材料及製程實驗室',
      description: 'AMPL 研究聚焦綠色合成、奈米與生質複合材料、表面工程、磨潤與腐蝕、感測材料與模擬輔助製程最佳化。',
    },
    projects: {
      title: '計畫與合作｜尖端材料及製程實驗室',
      description: 'AMPL 以公開研究計畫、產學合作、國際與學生研究串連材料科學、製程分析與工程應用。',
    },
    members: {
      title: '實驗室成員｜尖端材料及製程實驗室',
      description: '查看 AMPL 研究團隊資訊與成員資料發布狀態。',
    },
    publications: {
      title: '出版品｜尖端材料及製程實驗室',
      description: '瀏覽 AMPL 依成大機械系官方教師頁整理之近兩年期刊論文與研究出版紀錄。',
    },
    facilities: {
      title: '實驗設施｜尖端材料及製程實驗室',
      description: 'AMPL 實驗設施涵蓋模擬分析、熱處理製程、光譜與材料表徵、電化學感測與材料平台。',
    },
    news: {
      title: '最新消息｜尖端材料及製程實驗室',
      description: '查看 AMPL 實驗室公告、研究消息與活動資訊發布狀態。',
    },
    'join-us': {
      title: '加入我們｜尖端材料及製程實驗室',
      description: '了解 AMPL 研究生加入方向、研究主題與適合背景。',
    },
    contact: {
      title: '聯絡資訊｜尖端材料及製程實驗室',
      description: '聯絡國立成功大學機械工程學系施士塵教授與尖端材料及製程實驗室。',
    },
  },
  en: {
    home: {
      title: 'Advanced Material and Processing Lab | AMPL',
      description: 'AMPL connects bio-based resources, nanomaterials, surface engineering, tribology, and simulation-assisted design for sustainable materials and processing applications.',
    },
    about: {
      title: 'About | Advanced Material and Processing Lab',
      description: 'Learn about AMPL, Prof. Shih-Chen Shi, and the lab’s research vision in advanced materials, processing, and sustainable engineering.',
    },
    research: {
      title: 'Research | Advanced Material and Processing Lab',
      description: 'AMPL research focuses on green synthesis, nanomaterials, bio-based composites, surface engineering, tribology, sensing materials, and simulation-assisted process optimization.',
    },
    projects: {
      title: 'Projects & Collaboration | Advanced Material and Processing Lab',
      description: 'AMPL connects public research projects, industry collaboration, international research, and student research across materials, processing, and engineering applications.',
    },
    members: {
      title: 'Members | Advanced Material and Processing Lab',
      description: 'View AMPL research team information and member profile status.',
    },
    publications: {
      title: 'Publications | Advanced Material and Processing Lab',
      description: 'Browse recent AMPL journal publications organized from the official NCKU Mechanical Engineering faculty profile.',
    },
    facilities: {
      title: 'Facilities | Advanced Material and Processing Lab',
      description: 'AMPL facilities cover simulation, thermal processing, spectroscopy and characterization, electrochemical sensing, and material platforms.',
    },
    news: {
      title: 'News | Advanced Material and Processing Lab',
      description: 'View AMPL announcements, research updates, and lab news.',
    },
    'join-us': {
      title: 'Join Us | Advanced Material and Processing Lab',
      description: 'Learn about graduate research opportunities, research topics, and suitable backgrounds for joining AMPL.',
    },
    contact: {
      title: 'Contact | Advanced Material and Processing Lab',
      description: 'Contact Prof. Shih-Chen Shi and the Advanced Material and Processing Lab at NCKU Mechanical Engineering.',
    },
  },
};

export function getRoutePath(route: SeoRoute, lang: Locale): string {
  if (route === 'home') return lang === 'en' ? '/en/' : '/';
  return lang === 'en' ? `/en/${route}/` : `/${route}/`;
}

export function getAbsoluteUrl(path: string): string {
  return new URL(path, seoConfig.baseUrl).toString();
}

export function getAlternateLinks(route: SeoRoute): SeoMetadata['alternates'] {
  const zhHref = getAbsoluteUrl(getRoutePath(route, 'zh-Hant'));
  const enHref = getAbsoluteUrl(getRoutePath(route, 'en'));
  return [
    { hreflang: 'zh-Hant', href: zhHref },
    { hreflang: 'en', href: enHref },
    { hreflang: 'x-default', href: zhHref },
  ];
}

export function getSeoMetadata(lang: Locale, route: SeoRoute = 'home', fallbackTitle?: string): SeoMetadata {
  const page = seoPages[lang][route] ?? {
    title: fallbackTitle ?? seoConfig.defaultTitle[lang],
    description: seoConfig.defaultDescription[lang],
  };

  return {
    title: page.title,
    description: page.description,
    canonicalUrl: getAbsoluteUrl(getRoutePath(route, lang)),
    ogImageUrl: getAbsoluteUrl(seoConfig.defaultOgImagePath),
    ogImageAlt: seoConfig.ogImageAlt[lang],
    ogLocale: lang === 'zh-Hant' ? 'zh_TW' : 'en_US',
    ogLocaleAlternate: lang === 'zh-Hant' ? 'en_US' : 'zh_TW',
    alternates: getAlternateLinks(route),
  };
}
