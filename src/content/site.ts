export type Locale = 'zh-Hant' | 'en';
export type Localized<T = string> = Record<Locale, T>;
export const routes = ['about', 'research', 'members', 'publications', 'facilities', 'news', 'join-us', 'contact'] as const;
export type Route = (typeof routes)[number];
export const lab = {
  abbreviation: 'AMPL', chineseName: '尖端材料及製程實驗室', englishName: 'Advanced Material and Processing Lab',
  professor: 'Prof. Shih-Chen Shi', department: { 'zh-Hant': '國立成功大學機械工程學系', en: 'Department of Mechanical Engineering, National Cheng Kung University' }, email: 'scshi@mail.ncku.edu.tw',
};
export const labels: Record<Locale, Record<Route | 'home', string>> = {
  'zh-Hant': { home:'首頁', about:'關於實驗室', research:'研究領域', members:'成員', publications:'出版品', facilities:'實驗設施', news:'最新消息', 'join-us':'加入我們', contact:'聯絡資訊' },
  en: { home:'Home', about:'About', research:'Research', members:'Members', publications:'Publications', facilities:'Facilities', news:'News', 'join-us':'Join Us', contact:'Contact' },
};
export const localeCopy: Localized<{readMore:string; contact:string; research:string; join:string; secondaryIdentity:string}> = {
  'zh-Hant': { readMore:'了解更多', contact:'聯絡資訊', research:'探索研究領域', join:'加入我們', secondaryIdentity:lab.englishName },
  en: { readMore:'Learn more', contact:'Contact', research:'Explore research', join:'Join us', secondaryIdentity:lab.chineseName },
};
