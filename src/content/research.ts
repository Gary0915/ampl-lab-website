import type { Localized } from './site';

export type ResearchArea = {
  key: string;
  title: Localized;
  description: Localized;
  tags: Localized<string[]>;
  motif: string;
};

export const researchAreas: ResearchArea[] = [
  {
    key: 'circular',
    motif: 'fiber',
    title: { 'zh-Hant': '綠色合成與循環經濟', en: 'Green Synthesis & Circular Economy' },
    description: { 'zh-Hant': '探討農漁業副產物作為低環境負荷材料製程的資源起點。', en: 'AMPL studies agricultural and fishery by-products as resources for lower-impact material processing.' },
    tags: { 'zh-Hant': ['農漁業副產物', '稻稈資源化', '幾丁聚醣'], en: ['Agricultural & fishery waste', 'Rice straw reuse', 'Chitosan'] },
  },
  {
    key: 'nano',
    motif: 'lattice',
    title: { 'zh-Hant': '奈米材料與生物高分子複合材料', en: 'Nanomaterials & Biopolymer Composites' },
    description: { 'zh-Hant': '結合奈米結構與生物高分子，研究組成、界面與複合材料性能。', en: 'Nanostructures and biopolymers are combined to examine composition, interfaces, and composite performance.' },
    tags: { 'zh-Hant': ['奈米材料', '生物高分子', '複合材料'], en: ['Nanomaterials', 'Biopolymers', 'Composites'] },
  },
  {
    key: 'surface',
    motif: 'layers',
    title: { 'zh-Hant': '磨潤與表面工程', en: 'Tribology & Surface Engineering' },
    description: { 'zh-Hant': '從摩擦、磨耗、腐蝕到塗層與表面改質，探討介面工程挑戰。', en: 'Friction, wear, corrosion, coatings, and surface modification are studied as connected interface challenges.' },
    tags: { 'zh-Hant': ['磨潤技術', '塗層', '抗腐蝕'], en: ['Tribology', 'Coatings', 'Corrosion resistance'] },
  },
  {
    key: 'bioenv',
    motif: 'particle',
    title: { 'zh-Hant': '生醫與環境材料', en: 'Biomedical & Environmental Materials' },
    description: { 'zh-Hant': '以永續材料來源連結生醫與環境應用所需的功能材料設計。', en: 'Functional material design connects sustainable feedstocks with biomedical and environmental application contexts.' },
    tags: { 'zh-Hant': ['生醫材料', '環境應用', '功能材料'], en: ['Biomedical materials', 'Environmental applications', 'Functional materials'] },
  },
  {
    key: 'sensor',
    motif: 'wave',
    title: { 'zh-Hant': '感測材料與功能性塗層', en: 'Sensors & Functional Coatings' },
    description: { 'zh-Hant': '將材料表面與結構設計轉化為感測響應與功能性塗層概念。', en: 'Material surfaces and structures are translated into sensing responses and functional coating concepts.' },
    tags: { 'zh-Hant': ['感測材料', '功能性塗層', '表面響應'], en: ['Sensing materials', 'Functional coatings', 'Surface response'] },
  },
  {
    key: 'simulation',
    motif: 'grid',
    title: { 'zh-Hant': '模擬輔助製程最佳化', en: 'Simulation & Process Optimization' },
    description: { 'zh-Hant': '結合分子動力學、應力與流體分析，支援材料及製程設計決策。', en: 'Molecular dynamics, stress analysis, and fluid analysis support more informed material and process decisions.' },
    tags: { 'zh-Hant': ['分子動力學', '應力分析', '流體分析'], en: ['Molecular dynamics', 'Stress analysis', 'Fluid analysis'] },
  },
];

export const pipeline: Localized<{ title: string; description: string }[]> = {
  'zh-Hant': [
    { title: '農漁業副產物', description: '稻稈與漁業副產物的資源化觀點' },
    { title: '奈米與生質複材', description: '結構、界面與功能的材料設計' },
    { title: '表面工程與磨潤', description: '塗層、耐蝕與摩擦行為' },
    { title: '表徵與模擬最佳化', description: '實驗觀察結合分子、應力與流體分析' },
    { title: '多元應用', description: '生醫、環境、感測與工程應用' },
  ],
  en: [
    { title: 'Agricultural & Fishery By-products', description: 'Resource-aware starting points for material design' },
    { title: 'Nano & Biopolymer Composites', description: 'Structure, interface, and functional design' },
    { title: 'Surface Engineering & Tribology', description: 'Coatings, corrosion resistance, and friction' },
    { title: 'Characterization & Simulation', description: 'Experiments supported by molecular, stress, and fluid analysis' },
    { title: 'Applications', description: 'Biomedical, environmental, sensing, and engineering contexts' },
  ],
};

export const methodsApplications: Localized<{ method: string; scope: string; applications: string[] }[]> = {
  'zh-Hant': [
    { method: '材料合成與製程設計', scope: '以農漁業副產物、奈米材料與生質／高分子複合材料作為研究起點。', applications: ['環境材料', '感測材料', '工程應用'] },
    { method: '表面加工與材料表徵', scope: '結合雷射表面加工、金屬與陶瓷製程，以及介面與特性分析。', applications: ['磨潤與塗層', '抗腐蝕工藝', '生醫材料'] },
    { method: '模擬輔助最佳化', scope: '以分子動力學、應力與流體分析支持材料與製程設計判斷。', applications: ['材料設計', '製程最佳化', '工程應用'] },
  ],
  en: [
    { method: 'Material synthesis & process design', scope: 'Agricultural and fishery by-products, nanomaterials, and bio/polymer composites provide the starting points for material studies.', applications: ['Environmental materials', 'Sensing materials', 'Engineering applications'] },
    { method: 'Surface processing & characterization', scope: 'Laser surface processing, metallic and ceramic processing, and interface-focused characterization inform material development.', applications: ['Tribology & coatings', 'Corrosion-resistant processes', 'Biomedical materials'] },
    { method: 'Simulation-assisted optimization', scope: 'Molecular dynamics, stress analysis, and fluid analysis support material and process design decisions.', applications: ['Material design', 'Process optimization', 'Engineering applications'] },
  ],
};
