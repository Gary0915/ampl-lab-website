# AMPL 實驗室網站 Codex 交接檔

## 0. 專案定位

本專案目標是建立「國立成功大學機械工程學系 施士塵教授 — 尖端材料及製程實驗室 AMPL」的正式實驗室網站。

網站不是學生作品集，也不是一般社群形象頁。它應該是：

- 教授對外正式形象網站
- 新生與研究生了解實驗室的入口
- 產學合作與研究能量展示平台
- 論文、成果、設備、成員與招生資訊的長期整理介面

核心視覺關鍵字：

- Advanced Materials
- Green Synthesis
- Circular Economy
- Nanomaterials
- Surface Engineering
- Tribology
- Biomedical Materials
- Sensing Materials
- Process Simulation

整體觀感應該是「學術、乾淨、可信、現代、精緻」，不是「科技感過度、動畫過度、創業公司 landing page」。

---

## 1. 已知公開資料基礎

### Professor

- 中文姓名：施士塵
- 英文姓名：Shih-Chen Shi
- 單位：國立成功大學機械工程學系
- 職稱：教授
- 實驗室：尖端材料及製程實驗室
- 實驗室英文：Advanced Material and Processing Lab / AMPL
- Email：scshi@mail.ncku.edu.tw
- 專長方向：
  - 雷射表面加工
  - 奈米材料
  - 生物高分子
  - 高分子複合材料
  - 金屬材料製程與特性分析
  - 陶瓷製程與材料設計
  - 熱電材料
  - 磨潤技術
  - 破損分析
  - 抗腐蝕工藝
  - 綠能科技
  - 負碳技藝

### Lab

- 中文名稱：尖端材料及製程實驗室
- 英文名稱：Advanced Material and Processing Lab
- 縮寫：AMPL
- 核心方向：
  - 綠色合成
  - 循環經濟
  - 農漁業廢棄物再利用
  - 高性能奈米材料
  - 高附加價值材料
  - 分子動力學、應力分析、流體分析
  - 生醫材料、環境處理、藥物傳遞、疫苗檢測、螢光探針等

### Do Not Invent

不可自行編造：

- 學生成員姓名
- 學生照片
- 設備名稱
- 設備照片
- 未確認之專利、獎項、計畫
- 未確認之論文清單
- 未確認之教授職稱或兼職
- 未確認之招生名額

未知資料必須使用明確 placeholder：

```text
[待提供：成員名單]
[待提供：實驗室設備照片]
[待確認：代表論文清單]
[待確認：教授指定英文名稱 Material / Materials]
```

---

## 2. 推薦技術棧

如果是新建專案，優先使用：

- Astro 或 Next.js
- TypeScript
- Tailwind CSS
- Component-based architecture
- MD/MDX content structure
- CSS animation / Framer Motion / Motion One，擇一即可
- Playwright 或瀏覽器截圖做視覺驗證

建議優先：Astro + TypeScript + Tailwind CSS

原因：

- 靜態網站速度快
- 學術網站不需要複雜後端
- 部署容易
- 後續可用 Markdown 更新 publications / news / members
- 比 WordPress 更乾淨、更不容易壞

如果 repository 已經存在，請先檢查現有 stack，不要強行重建。

---

## 3. 網站資訊架構

Required routes:

```text
/
 /about
 /research
 /members
 /publications
 /facilities
 /news
 /join-us
 /contact
```

Navigation labels:

中文：

```text
首頁
關於我們
研究方向
成員介紹
論文成果
實驗設備
最新消息
加入我們
聯絡資訊
```

英文：

```text
Home
About
Research
Members
Publications
Facilities
News
Join Us
Contact
```

第一版可以先做雙語內容在同一頁區塊中呈現，不一定要完整 i18n routing。

推薦格式：

- 主標題：中文
- 副標題：英文
- 內文：中文為主，重要標語與研究方向補英文

---

## 4. 視覺設計方向

### 4.1 整體風格

請做出「高級、安靜、有研究深度」的學術材料實驗室網站。

設計不應該像：

- SaaS landing page
- 遊戲網站
- 加密貨幣網站
- 過度炫光科技風
- 大量 neon gradient
- 卡通 icon 套版

設計應該像：

- 國際大學研究實驗室
- 先進材料研究中心
- Nature / Science 類科研視覺
- 簡潔的工程學院網站
- 帶有微觀材料紋理與幾何秩序的視覺系統

### 4.2 色彩系統

Primary palette:

```text
Navy / Academic Blue: #0B1F3A
Deep Blue:            #123C69
Muted Cyan:           #2C7A8C
Graphite:             #1F2933
Warm White:           #F8FAFC
Soft Gray:            #E5E7EB
```

Accent palette:

```text
Bio Green:            #4F8A5B
Copper / Material:    #B7791F
Soft Gold:            #D6A84F
```

Usage:

- 背景以 white / off-white 為主
- 大面積不要使用螢光色
- 深藍用於 header、footer、hero text、重要 CTA
- 綠色只用於 green synthesis / circular economy 暗示
- 金屬銅色只用於細節，例如 border、label、active state

### 4.3 Typography

建議使用系統字體，避免額外授權問題：

```css
font-family:
  Inter,
  "Noto Sans TC",
  "Noto Sans",
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

Typography rules:

- Body: 16–18px
- Line height: 1.65–1.8
- H1: 48–72px desktop；36–44px mobile
- H2: 32–44px desktop；28–34px mobile
- Text maximum width: 68–78 characters
- 不要整頁小字
- 不要每個區塊都置中
- 中文不要過度拉寬 letter-spacing

---

## 5. 首頁設計規格

### 5.1 Hero Section

Hero 需要有強烈第一印象，但不能俗氣。

Hero content:

```text
尖端材料及製程實驗室
Advanced Material and Processing Lab

Green Synthesis · Circular Economy · Nanomaterials · Surface Engineering
```

Description:

```text
以綠色合成與循環經濟為核心，結合奈米材料、表面工程、磨潤技術、生醫材料與製程模擬，發展高性能且具永續價值的先進材料解決方案。
```

CTA buttons:

- 研究方向 Research Areas
- 加入我們 Join Us

Hero visual concept:

請不要只放普通大圖。建議用以下組合：

1. 左側文字
2. 右側「抽象材料結構視覺」
   - 微觀粒子
   - 分子/網格節點
   - 層狀材料
   - 微結構紋理
3. 背景淡淡 radial gradient
4. 很低透明度的 lattice / contour line / grid pattern

Hero animation:

- 文字進場：fade + translateY 12px
- 粒子或節點：慢速浮動
- 背景 gradient：極慢速位移
- CTA hover：微幅上移與陰影
- 不要高速閃爍
- 支援 prefers-reduced-motion

### 5.2 Home Sections

Homepage order:

1. Hero
2. Research identity statement
3. Research area cards
4. Materials-to-applications pipeline
5. Selected highlights / publications
6. Lab capabilities
7. Join us CTA
8. Footer

---

## 6. 研究方向頁面

Research areas should be displayed as premium cards, not dense paragraphs.

Cards:

1. Green Synthesis & Circular Economy  
   從農漁業廢棄物出發，發展高性能、高附加價值之永續材料。

2. Nanomaterials & Biopolymer Composites  
   研究奈米纖維素、幾丁聚醣、石墨烯量子點與高分子複合材料。

3. Tribology & Surface Engineering  
   聚焦表面改質、磨潤行為、抗磨耗、抗腐蝕與功能性塗層。

4. Biomedical & Environmental Materials  
   發展生醫塗層、環境處理材料、吸附材料與檢測應用。

5. Sensors & Functional Coatings  
   建立感測材料、柔性感測、氣體感測與功能性表面之材料系統。

6. Simulation & Process Optimization  
   結合分子動力學、應力分析與流體分析，支援材料與製程最佳化。

Card design:

- 每張卡有 abstract icon，不使用 cartoon icon
- 可以使用線性圖示，例如 lattice、leaf-fiber、coating-layer、sensor-wave、molecule、simulation-grid
- hover 時卡片上移 4px，border 變 accent
- 卡片高度一致
- 每張卡內文 2–3 行，不要長篇

---

## 7. 適合本實驗室的動態元素

動畫必須服務內容，不可以只是炫技。

### 7.1 Hero Particle Lattice

右側 Hero 可以做一個 SVG / CSS canvas-like visual：

- 節點：代表奈米材料、分子結構
- 線條：代表材料網絡與交聯
- 緩慢浮動：代表動態研究系統
- 色彩：深藍、青綠、淡金
- 透明度低，不搶文字

Implementation options:

- Pure SVG + CSS keyframes
- React component using mapped points
- No heavy 3D library required

### 7.2 Scroll Reveal

對 section / cards 做 scroll reveal：

- opacity 0 → 1
- translateY 16px → 0
- duration 500–700ms
- stagger 80–120ms
- reduced-motion 時關閉

### 7.3 Research Pipeline Animation

首頁可放「Waste → Material → Processing → Characterization → Application」流程：

```text
Agricultural / Fishery Waste
→ Nanomaterials
→ Processing & Coating
→ Characterization / Simulation
→ Biomedical · Environmental · Engineering Applications
```

視覺：

- 橫向流程 desktop
- 縱向流程 mobile
- 每個節點用圓形或小卡
- hover 時顯示簡短說明
- 連線可用淡淡 moving gradient

### 7.4 Microstructure Texture Background

部分區塊背景可以使用 CSS radial gradients 模擬：

- 粒子
- 微結構
- 材料截面
- 網格

不可使用太花的背景，文字區塊要保持可讀性。

### 7.5 Publications Hover

Publications list:

- hover 時左側 border highlight
- DOI/link icon 淡入
- year tag 保持固定寬度
- selected publications 可做 featured card

### 7.6 Facilities Placeholder Gallery

設備照片未提供時不要亂放 stock photo。

可用 placeholder card：

```text
[Equipment photo pending]
Material Processing
Surface Characterization
Tribology Testing
Simulation Workstation
```

視覺上可用線框圖示與淡色背景，不要看起來像錯誤頁。

---

## 8. 元件設計

### 8.1 Header

Desktop:

- 左側：AMPL wordmark
- 右側：nav links
- 最右：Join Us / Contact button
- sticky header
- 滾動後背景變成半透明 white + blur
- active link 清楚

Mobile:

- hamburger menu
- full-screen or drawer nav
- 點選後關閉
- 不要重疊 hero
- 不要造成 horizontal scroll

### 8.2 Footer

Footer 必須完整，包含：

- Lab name
- Department
- University
- Address placeholder
- Email
- Quick links
- Research keywords
- Copyright

示例：

```text
© 2026 Advanced Material and Processing Lab, Department of Mechanical Engineering, National Cheng Kung University.
```

### 8.3 ResearchCard

Props:

```ts
type ResearchCard = {
  title: string;
  subtitle?: string;
  description: string;
  icon: "leaf" | "molecule" | "layers" | "sensor" | "shield" | "simulation";
  tags?: string[];
};
```

### 8.4 PublicationItem

Props:

```ts
type PublicationItem = {
  year: string;
  title: string;
  authors: string;
  venue: string;
  link?: string;
  tags?: string[];
  featured?: boolean;
};
```

### 8.5 MemberCard

Props:

```ts
type MemberCard = {
  name: string;
  role: "Professor" | "PhD Student" | "Master Student" | "Alumni";
  topic?: string;
  email?: string;
  image?: string;
};
```

Unknown members must remain placeholders.

---

## 9. Content Data Structure

建議把內容放在：

```text
src/content/
  research.ts
  publications.ts
  members.ts
  news.ts
  facilities.ts
```

或 Markdown / MDX：

```text
content/
  publications/
  news/
  members/
```

這樣後續學生比較好維護。

---

## 10. 頁面詳細要求

### 10.1 About Page

應包含：

- 實驗室簡介
- Professor profile
- Research philosophy
- Lab identity
- Location / affiliation

不要寫太多宣傳口號。語氣要正式。

### 10.2 Members Page

Sections:

- Principal Investigator
- Current Members
- Alumni

No invented names.

第一版使用 placeholders：

```text
Current members will be updated after confirmation.
```

### 10.3 Publications Page

Features:

- year filter
- type filter optional
- selected publications highlighted
- searchable input optional

第一版可先放 placeholder publications，或從官方資料人工填入待確認清單。

不可編造完整 bibliographic data。

### 10.4 Facilities Page

Sections:

- Material Processing
- Surface / Structural Characterization
- Tribology & Corrosion
- Sensing / Electrical Measurement
- Simulation & Data Analysis

未提供照片時使用 placeholder，並標示 pending。

### 10.5 Join Us Page

Tone:

正式、清楚、歡迎，但不要誇張。

應包含：

- 適合加入的學生背景
- 可學到的能力
- 研究主題
- 聯絡方式
- 申請前可準備資料

Example text:

```text
We welcome students interested in materials processing, nanomaterials, surface engineering, tribology, biomedical materials, environmental applications, and simulation-assisted material design.
```

### 10.6 Contact Page

應包含：

- Email
- Department
- University
- Lab / office placeholder
- Map placeholder
- Quick contact card

---

## 11. 動畫與互動驗收標準

Animations must be:

- subtle
- content-supporting
- accessible
- performant
- disabled or reduced under prefers-reduced-motion

Required interactions:

- Sticky header transition
- Hero visual motion
- CTA hover state
- Research card hover
- Scroll reveal
- Publication item hover
- Mobile menu animation
- Smooth anchor scrolling
- Active nav indicator

Do not:

- add loading screen unless necessary
- overuse parallax
- use spinning molecules everywhere
- use large JS animation library unless needed
- create animations that make text harder to read

---

## 12. Responsive Requirements

Test widths:

```text
1440px desktop
1280px desktop
1024px tablet
768px tablet
430px mobile
390px mobile
360px mobile
```

Must verify:

- no horizontal scroll
- nav works
- hero not too tall on mobile
- cards stack properly
- text line length readable
- footer not cramped
- CTA buttons not overflowing
- publication list readable
- images keep aspect ratio

---

## 13. Accessibility Requirements

- Semantic HTML
- Proper heading hierarchy
- Focus states visible
- Buttons and links keyboard accessible
- Alt text for images
- `aria-label` for icon-only buttons
- Color contrast passes practical readability
- Respect `prefers-reduced-motion`

---

## 14. Visual QA Checklist

Before finishing, Codex must perform visual QA.

Required process:

1. Install dependencies if needed.
2. Run project locally.
3. Open site in browser.
4. Capture screenshots for:
   - Home desktop
   - Home mobile
   - Research desktop
   - Members mobile
   - Publications desktop
5. Inspect screenshots manually.
6. Fix:
   - broken alignment
   - crowded spacing
   - weak hierarchy
   - inconsistent card heights
   - low contrast
   - mobile overflow
   - bad wrapping
   - ugly placeholder presentation
7. Repeat until visually acceptable.

Final answer must include:

```text
- Files changed
- How to run
- Pages implemented
- Visual QA performed
- Screenshots generated
- Known placeholders
- Remaining recommended content from professor/lab
```

---

## 15. First Implementation Scope

Do not overbuild in first pass.

First pass must deliver:

- Full responsive layout
- All required pages
- Polished homepage
- Research cards
- Member placeholders
- Publication placeholders / sample data clearly marked
- Facilities placeholders
- Join Us / Contact
- Animation system
- Visual QA screenshots

Second pass can improve:

- real member data
- real equipment photos
- real publications
- CMS or admin workflow
- bilingual routing
- real lab logo
- SEO metadata refinement

---

## 16. Strong Design Constraints

The website must not look generic.

Specific requirements:

- Avoid a flat default Tailwind template.
- Use a deliberate design system.
- Use a distinctive hero visual based on material microstructure / molecular lattice.
- Use refined spacing and typography.
- Every page should have a clear top section.
- Use consistent page title treatment.
- Use subtle section dividers, not thick borders everywhere.
- Use icons sparingly.
- Do not use random stock images.
- Do not invent photos.
- Do not flood pages with placeholder lorem ipsum.

---

## 17. Suggested SEO Metadata

Default title:

```text
AMPL | Advanced Material and Processing Lab | NCKU Mechanical Engineering
```

Description:

```text
The Advanced Material and Processing Lab at National Cheng Kung University focuses on green synthesis, circular economy, nanomaterials, surface engineering, tribology, biomedical materials, sensing materials, and simulation-assisted materials design.
```

Keywords:

```text
NCKU, Mechanical Engineering, AMPL, Advanced Material and Processing Lab, Shih-Chen Shi, nanomaterials, green synthesis, circular economy, tribology, surface engineering, biomedical materials
```

---

## 18. Final Codex Master Prompt

Paste this prompt into Codex after placing AGENTS.md and the skill file in the project.

```text
Use the lab-website-uiux skill.

Build a polished, animated, bilingual academic laboratory website for Prof. Shih-Chen Shi's Advanced Material and Processing Lab (AMPL), Department of Mechanical Engineering, National Cheng Kung University.

This is an official university laboratory website. It must look academic, modern, trustworthy, and visually refined. It should not look like a generic Tailwind template or startup landing page.

Use the lab nature as the design basis:
- green synthesis
- circular economy
- nanomaterials
- biopolymer composites
- surface engineering
- tribology
- biomedical and environmental materials
- sensing materials
- simulation-assisted material/process optimization

Required pages:
- Home
- About
- Research
- Members
- Publications
- Facilities
- News
- Join Us
- Contact

Important UI requirements:
- refined academic color palette: off-white, deep navy, muted blue, graphite, restrained green/gold accents
- strong hero section with animated abstract material microstructure / molecular lattice visual
- sticky header with scroll transition
- polished research cards
- materials-to-applications pipeline section
- scroll reveal animations
- subtle hover states
- responsive mobile navigation
- accessible reduced-motion behavior
- no fake student names, fake equipment, fake awards, or fake publications
- use clear placeholders for unknown content

Before finalizing:
1. run the project locally
2. inspect with browser or Playwright screenshots
3. verify desktop, tablet, and mobile layouts
4. fix spacing, alignment, overflow, card height, contrast, and mobile nav issues
5. repeat until the UI looks polished

At the end, report:
- files changed
- how to run
- implemented pages
- design system summary
- animation/interactions included
- visual QA performed
- screenshots generated
- remaining placeholders
```
