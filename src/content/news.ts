import type { Localized } from './site';
export const newsCategories: Localized<{title:string; description:string}[]> = {
  'zh-Hant':[ {title:'實驗室消息',description:'研究室公告、研究交流與重要訊息。'}, {title:'研究出版',description:'實驗室學術出版與研究進展。'}, {title:'學生表現',description:'學生研究成果與公開榮譽。'}, {title:'學術活動',description:'演講、研討會與學術活動紀錄。'} ],
  en:[ {title:'Lab News',description:'Laboratory notices, exchanges, and important updates.'}, {title:'Publications',description:'Academic publications and research progress from the laboratory.'}, {title:'Student Achievements',description:'Public student research outcomes and honors.'}, {title:'Events',description:'Talks, seminars, and academic event records.'} ],
};
