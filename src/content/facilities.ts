import type { Localized } from './site';

export const facilityCategories: Localized<{ title: string; description: string; motif: string }[]> = {
  'zh-Hant': [
    {
      title: '材料製備',
      description: '支援材料生成、配方控制與製程設計的研究設施類別。',
      motif: 'layers',
    },
    {
      title: '表面與結構表徵',
      description: '用於理解材料結構、界面與表面性質的研究設施類別。',
      motif: 'lattice',
    },
    {
      title: '磨潤與腐蝕測試',
      description: '支援摩擦、磨耗、塗層與腐蝕行為分析的研究設施類別。',
      motif: 'ring',
    },
    {
      title: '感測與電性量測',
      description: '支援功能材料訊號、電化學與電性反應量測的研究設施類別。',
      motif: 'wave',
    },
    {
      title: '模擬與資料分析',
      description: '以分子、應力與流體分析支援材料與製程決策。',
      motif: 'grid',
    },
  ],
  en: [
    { title: 'Material Processing', description: 'Research categories supporting material formation, composition control, and process design.', motif: 'layers' },
    { title: 'Surface & Structural Characterization', description: 'Research categories for understanding structure, interfaces, and surface properties.', motif: 'lattice' },
    { title: 'Tribology & Corrosion Testing', description: 'Research categories for friction, wear, coatings, and corrosion behaviour.', motif: 'ring' },
    { title: 'Sensing & Electrical Measurement', description: 'Research categories for functional material signals and electrical response.', motif: 'wave' },
    { title: 'Simulation & Data Analysis', description: 'Molecular, stress, and fluid analysis supporting material and process decisions.', motif: 'grid' },
  ],
};

export interface EquipmentGroup {
  title: string;
  description: string;
  items: string[];
  motif: string;
}

export const facilitiesCopy: Localized<{
  eyebrow: string;
  title: string;
  description: string;
  sourceNote: string;
}> = {
  'zh-Hant': {
    eyebrow: '官方設備紀錄',
    title: '實驗室設備',
    description: '依成大機械系官方教師頁公開設備清單整理，並依研究用途重新分組。未加入未確認照片、型號或規格。',
    sourceNote: '設備名稱依官方教師頁整理；官方頁中明顯拼字錯誤已以公開展示可讀性為原則校正。',
  },
  en: {
    eyebrow: 'Official equipment records',
    title: 'Laboratory Equipment',
    description: 'Equipment is organized from the official NCKU faculty profile and grouped by research use. Unverified photographs, model numbers, and specifications are not added.',
    sourceNote: 'Equipment names are based on the official faculty profile; obvious typographic errors are normalized for public presentation.',
  },
};

export const equipmentGroups: Localized<EquipmentGroup[]> = {
  'zh-Hant': [
    {
      title: '模擬與分析',
      description: '支援材料、結構與製程模擬分析。',
      motif: 'grid',
      items: ['Abaqus'],
    },
    {
      title: '熱處理與製程',
      description: '支援熱處理、薄膜製程與材料製備。',
      motif: 'layers',
      items: ['Thermal CVD', 'High temperature RTA', 'High-temperature oven', 'Hot plate & Magnetic stirrer', 'Freeze dryer'],
    },
    {
      title: '光譜與材料表徵',
      description: '支援結構、鍵結與微奈米尺度機械性質分析。',
      motif: 'lattice',
      items: ['Raman', 'FTIR', 'Micro/nano hardness tester'],
    },
    {
      title: '電化學與感測',
      description: '支援電化學量測、阻抗分析與感測材料研究。',
      motif: 'wave',
      items: ['Potentiostat', 'EIS'],
    },
    {
      title: '實驗室製備',
      description: '支援樣品製備、清潔、環境控制與塗佈操作。',
      motif: 'ring',
      items: ['Degausser', 'Ultrasonic cleaner', 'Adjustable Applicator', 'Constant Temperature and Humidity Machine', 'Incubator'],
    },
  ],
  en: [
    {
      title: 'Simulation & Analysis',
      description: 'Supports material, structural, and process simulation analysis.',
      motif: 'grid',
      items: ['Abaqus'],
    },
    {
      title: 'Thermal / Processing',
      description: 'Supports thermal treatment, film processing, and material preparation.',
      motif: 'layers',
      items: ['Thermal CVD', 'High temperature RTA', 'High-temperature oven', 'Hot plate & Magnetic stirrer', 'Freeze dryer'],
    },
    {
      title: 'Spectroscopy / Characterization',
      description: 'Supports structural, bonding, and micro/nano-scale mechanical characterization.',
      motif: 'lattice',
      items: ['Raman', 'FTIR', 'Micro/nano hardness tester'],
    },
    {
      title: 'Electrochemical / Sensing',
      description: 'Supports electrochemical measurement, impedance analysis, and sensing-material research.',
      motif: 'wave',
      items: ['Potentiostat', 'EIS'],
    },
    {
      title: 'Lab Preparation',
      description: 'Supports sample preparation, cleaning, environmental control, and film application.',
      motif: 'ring',
      items: ['Degausser', 'Ultrasonic cleaner', 'Adjustable Applicator', 'Constant Temperature and Humidity Machine', 'Incubator'],
    },
  ],
};
