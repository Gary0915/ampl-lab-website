import type { Localized } from './site';
export const newsCategories: Localized<{title:string; description:string}[]> = {
  'zh-Hant':[ {title:'實驗室消息',description:'研究室公告、研究交流與重要訊息將在確認後發布。'}, {title:'研究出版',description:'經確認的學術出版資訊將在此整理。'}, {title:'學生表現',description:'學生研究成果與榮譽將於正式確認後更新。'}, {title:'學術活動',description:'演講、研討會與活動紀錄將依實際資訊發布。'} ],
  en:[ {title:'Lab News',description:'Laboratory notices, exchanges, and important updates will be published after confirmation.'}, {title:'Publications',description:'Verified research publication information will be organized here.'}, {title:'Student Achievements',description:'Student research outcomes and honors will be updated after formal confirmation.'}, {title:'Events',description:'Talks, seminars, and event records will be published from verified information.'} ],
};
