# Content Model for AMPL Website

## research.ts

```ts
export const researchAreas = [
  {
    title: "Green Synthesis & Circular Economy",
    titleZh: "綠色合成與循環經濟",
    description:
      "從農漁業廢棄物出發，發展高性能、高附加價值之永續材料。",
    icon: "leaf",
    tags: ["Green synthesis", "Circular economy", "Biomass"]
  },
  {
    title: "Nanomaterials & Biopolymer Composites",
    titleZh: "奈米材料與生物高分子複合材料",
    description:
      "研究奈米纖維素、幾丁聚醣、石墨烯量子點與高分子複合材料。",
    icon: "molecule",
    tags: ["Nanomaterials", "Biopolymer", "Composites"]
  },
  {
    title: "Tribology & Surface Engineering",
    titleZh: "磨潤與表面工程",
    description:
      "聚焦表面改質、磨潤行為、抗磨耗、抗腐蝕與功能性塗層。",
    icon: "layers",
    tags: ["Tribology", "Coatings", "Corrosion"]
  },
  {
    title: "Biomedical & Environmental Materials",
    titleZh: "生醫與環境材料",
    description:
      "發展生醫塗層、環境處理材料、吸附材料與檢測應用。",
    icon: "bio",
    tags: ["Biomedical", "Environment", "Adsorption"]
  },
  {
    title: "Sensors & Functional Coatings",
    titleZh: "感測材料與功能性塗層",
    description:
      "建立感測材料、柔性感測、氣體感測與功能性表面之材料系統。",
    icon: "sensor",
    tags: ["Sensors", "Functional coatings", "Flexible sensing"]
  },
  {
    title: "Simulation & Process Optimization",
    titleZh: "模擬與製程最佳化",
    description:
      "結合分子動力學、應力分析與流體分析，支援材料與製程最佳化。",
    icon: "simulation",
    tags: ["MD", "Stress analysis", "Fluid analysis"]
  }
];
```

## members.ts

```ts
export const members = [
  {
    name: "Prof. Shih-Chen Shi",
    nameZh: "施士塵 教授",
    role: "Principal Investigator",
    email: "scshi@mail.ncku.edu.tw",
    topic: "Advanced materials and processing"
  },
  {
    name: "[待提供]",
    nameZh: "[待提供：成員姓名]",
    role: "Master Student",
    topic: "[待提供：研究題目]"
  }
];
```

## facilities.ts

```ts
export const facilityCategories = [
  {
    title: "Material Processing",
    titleZh: "材料製程",
    description: "[待提供：製程設備與照片]"
  },
  {
    title: "Surface & Structural Characterization",
    titleZh: "表面與結構分析",
    description: "[待提供：分析設備與照片]"
  },
  {
    title: "Tribology & Corrosion Testing",
    titleZh: "磨潤與腐蝕測試",
    description: "[待提供：測試設備與照片]"
  },
  {
    title: "Sensing & Electrical Measurement",
    titleZh: "感測與電性量測",
    description: "[待提供：量測設備與照片]"
  },
  {
    title: "Simulation & Data Analysis",
    titleZh: "模擬與資料分析",
    description: "[待提供：軟體/工作站/方法]"
  }
];
```
