import type { Localized } from './site';

export interface LabProductGroup {
  title: string;
  description: string;
  items: { name: string; note?: string }[];
}

export const labProductsCopy: Localized<{
  eyebrow: string;
  title: string;
  description: string;
  sourceNote: string;
}> = {
  'zh-Hant': {
    eyebrow: '材料平台',
    title: '材料與實驗室產物平台',
    description: '依官方 Lab product 清單整理為 AMPL 的材料平台分類，以中性語氣呈現研究材料脈絡，不宣稱商品化。',
    sourceNote: '材料名稱依官方教師頁整理；製程細節、應用照片或代表成果建議於教授確認後再補充。',
  },
  en: {
    eyebrow: 'Material platforms',
    title: 'Materials & Lab Products',
    description: 'The official Lab product list is organized as material platforms for research communication. The language remains neutral and does not imply commercialization.',
    sourceNote: 'Material names are based on the official faculty profile. Process details, applications, or representative images can be added after professor confirmation.',
  },
};

export const labProductGroups: Localized<LabProductGroup[]> = {
  'zh-Hant': [
    {
      title: '生質來源纖維素材料',
      description: '由生質資源衍生的纖維素與纖維素奈米材料平台。',
      items: [
        { name: 'Cellulose' },
        { name: 'Cellulose nanocrystal (CNC)' },
        { name: 'Cellulose nanofiber (CNF)' },
        { name: 'Dialdehyde cellulose nanocrystal (DACNC)' },
        { name: 'Ery-DACNC', note: 'Erythrosine-functional Dialdehyde cellulose nanocrystal' },
      ],
    },
    {
      title: '石墨烯基奈米材料',
      description: '石墨烯與功能化石墨烯量子點材料平台。',
      items: [
        { name: 'Graphene' },
        { name: 'Graphene quantum dot (GQD)' },
        { name: 'Carboxyl-functional GQD (CfGQD)' },
        { name: 'Amino-functional GQD (AfGQD)' },
      ],
    },
    {
      title: '幾丁聚醣衍生物',
      description: '幾丁聚醣與功能化幾丁聚醣衍生材料。',
      items: [
        { name: 'Chitosan' },
        { name: 'Carboxylated Chitosan (CARCTS)' },
        { name: 'Aminated Chitosan (AMICTS)' },
      ],
    },
    {
      title: '高分子複合材料系統',
      description: '高分子基材與纖維素強化複合材料系統。',
      items: [
        { name: 'EVA' },
        { name: 'EVA-PLA' },
        { name: 'CNC-EVA-PLA' },
      ],
    },
  ],
  en: [
    {
      title: 'Biomass-derived cellulose materials',
      description: 'Cellulose-derived nanomaterial platforms from biomass resources.',
      items: [
        { name: 'Cellulose' },
        { name: 'Cellulose nanocrystal (CNC)' },
        { name: 'Cellulose nanofiber (CNF)' },
        { name: 'Dialdehyde cellulose nanocrystal (DACNC)' },
        { name: 'Ery-DACNC', note: 'Erythrosine-functional Dialdehyde cellulose nanocrystal' },
      ],
    },
    {
      title: 'Graphene-based nanomaterials',
      description: 'Graphene and functionalized graphene quantum dot material platforms.',
      items: [
        { name: 'Graphene' },
        { name: 'Graphene quantum dot (GQD)' },
        { name: 'Carboxyl-functional GQD (CfGQD)' },
        { name: 'Amino-functional GQD (AfGQD)' },
      ],
    },
    {
      title: 'Chitosan derivatives',
      description: 'Chitosan and functionalized chitosan derivative materials.',
      items: [
        { name: 'Chitosan' },
        { name: 'Carboxylated Chitosan (CARCTS)' },
        { name: 'Aminated Chitosan (AMICTS)' },
      ],
    },
    {
      title: 'Polymer composite systems',
      description: 'Polymer and cellulose-reinforced composite systems.',
      items: [
        { name: 'EVA' },
        { name: 'EVA-PLA' },
        { name: 'CNC-EVA-PLA' },
      ],
    },
  ],
};
