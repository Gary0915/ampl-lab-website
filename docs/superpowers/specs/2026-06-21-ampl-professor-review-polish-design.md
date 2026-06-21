# AMPL Professor-Review Polish Design

## Objective

Polish the existing AMPL static website for professor review without rebuilding the site, changing the home layout, replacing the lattice visual, or altering the deep-navy/off-white visual system.

## Verified Professor Data

Source: NCKU Mechanical Engineering faculty page supplied by the user: `https://www.me.ncku.edu.tw/content_teacher_detail.php?teacher_rkey=Y48CKD4137`.

- Chinese name: 施士塵; English name: Shih-Chen Shi; title: Professor.
- Email: `scshi@mail.ncku.edu.tw`.
- Offices: Professor office 7F Room 720; Laboratory 10F Room A06; Student discussion room 9F Room 908B.
- Telephone: professor office 62176; laboratory 62159-72.
- Personal website: `https://ampl.me.ncku.edu.tw/`.
- Education: PhD in Materials Science and Engineering, National Chiao Tung University; MS and BS in Mechanical Engineering, National Cheng Kung University.
- Selected career chronology: NCKU Mechanical Engineering (2014–present); Metal Industries Research & Development Centre (2013–2014); New Generation Biotech Co., Ltd. Product Manager (2012–2013); Everlight Electronics Co., Ltd. R&D Deputy Manager (2007–2012).
- Research expertise: laser surface processing; nano/biopolymer/polymer composites; metallic material processing and characterization; ceramic processing/material design/thermoelectric materials; tribology; failure analysis; corrosion-resistant processes; green energy/negative-carbon technology.

Only these facts are added. Services, personal honors, student awards, and conference attendance remain excluded.

## Page Changes

- **About:** retain the lab profile, philosophy, and mission. Add a Professor Profile section with three concise cards: Education, Selected Experience, and Research Expertise.
- **Contact:** remove the location pending card. Add structured bilingual cards for the professor, department, professor office, laboratory, student discussion room, telephone, email, personal website, and an external official NCKU campus-map button. No embedded map image.
- **Publications:** retain the verified-records pending state, add clearly labelled links to the official faculty profile and professor website, and remove any implication that an unverified publication search is functional.
- **Facilities / News / Publications pending copy:** use formal public wording that says information will be updated after laboratory confirmation. The facility status is `設備資訊確認中` in Chinese and `Information pending verification` in English.
- **Research:** preserve the six cards and pipeline. Add a Methods × Applications block that relates verified methods to verified application contexts without creating new claims.
- **Hero:** only make a restrained desktop H1-size reduction, improve English subtitle rhythm, and refine CTA hover/focus transitions.
- **English:** use English versions of the same verified data. The Chinese professor name is intentionally presented in the Chinese route only.

## Validation

- `npm run build` and `npm test` must pass.
- Inspect Chinese and English About, Contact, Research, Publications, Facilities, and mobile navigation.
- Test 1440, 1024, 768, 430, 390, and 360px for overflow, hero wrapping, cards, navigation, and footer integrity.
