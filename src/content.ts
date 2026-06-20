export type Locale = 'zh-Hant' | 'en';
export const routes = ['about','research','members','publications','facilities','news','join-us','contact'] as const;
export type Route = (typeof routes)[number];
export const labels: Record<Locale, Record<Route | 'home', string>> = {
  'zh-Hant': { home:'首頁', about:'關於實驗室', research:'研究領域', members:'成員', publications:'出版品', facilities:'實驗設施', news:'最新消息', 'join-us':'加入我們', contact:'聯絡資訊' },
  en: { home:'Home', about:'About', research:'Research', members:'Members', publications:'Publications', facilities:'Facilities', news:'News', 'join-us':'Join Us', contact:'Contact' },
};
export const research = [
  ['Green Synthesis & Circular Economy','綠色合成與循環經濟','從資源再利用出發，探索材料與製程的永續路徑。'],
  ['Nanomaterials & Biopolymer Composites','奈米材料與生物高分子複合材料','以結構設計與複合策略回應功能材料需求。'],
  ['Tribology & Surface Engineering','摩擦學與表面工程','研究界面、塗層與表面性能的材料科學。'],
  ['Biomedical & Environmental Materials','生醫與環境材料','連結材料設計、環境應用與生物醫學需求。'],
  ['Sensors & Functional Coatings','感測與功能性塗層','探索感測材料與功能表面的工程可能。'],
  ['Simulation & Process Optimization','模擬與製程最佳化','以模擬輔助材料與製程的理解與優化。'],
] as const;
export const pending = { 'zh-Hant':'[待提供：請提供經確認之內容與素材]', en:'[Pending: verified content and assets]' } as const;
