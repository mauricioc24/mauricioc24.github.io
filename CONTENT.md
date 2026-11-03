# CONTENT.md — source of truth for my portfolio site

> Claude: use only the facts in this file. Anything marked [FILL] is a placeholder I still need to confirm — never invent numbers. On the public site, anything still marked [FILL] is hidden (not shown as a TODO) and listed in TODO.md.
>
> Résumé-derived values (LinkedIn, chatbot details, Sura metrics, dates, bachelor's degree) were filled on Nov 3, 2026 from `Mauricio-Calderon-Barrientos-Resume.pdf`, with figures exactly as written there.

## Identity
- **Name:** Mauricio Calderón Barrientos (always this spelling, with the accent)
- **Location:** Burlington, Ontario, Canada (open to Toronto–Hamilton area, hybrid/on-site)
- **Hero big line:** Mauricio Calderón Barrientos makes data **useful** (spray highlight on "useful", see brand/BRAND.md)
- **Hero subtitle:** Data & AI Automation Analyst — 8+ years turning business processes into automated, data-driven workflows
- **Sub-headline:** I build dashboards, pipelines and AI assistants that save teams hours and drive better decisions.
- **Target roles:** Data / BI Analyst · AI & Automation Specialist · Junior AI/ML Engineer
- **Industries I'm aiming at:** Retail & logistics · Public sector · Tech
- **Languages:** Spanish (native), English (C1)

## About (short)
I'm a data analyst with 8+ years of experience in BI and process automation, most recently leading collections analytics at Sura Peru. There I built Power BI reporting, SQL pipelines (DB2, BigQuery) and Excel/VBA + Power Automate workflows, and created a Microsoft Teams chatbot that won the company's innovation contest. I'm now completing a Master of Data Analytics at the University of Niagara Falls Canada (March 2027) and building toward AI/ML engineering, one portfolio project at a time. I'm a generalist: I like sitting between the business problem and the technical solution.

## Experience (from résumé)
- **Analyst III, Collection Intelligence/Contribution Recovery** — Sura Peru – AFP Integra · April 2023 – September 2025
- **Analyst II, Collection Intelligence/Contribution Recovery** — Sura Peru – AFP Integra · April 2019 – March 2023
- **Analyst I, Collection Intelligence/Contribution Recovery** — Sura Peru – AFP Integra · December 2016 – March 2019
- **IT Intern** — CCR Cuore Research & Consulting, Peru · January 2016 – July 2016
- **Post-Sale Operations Intern** — Banco de Crédito BCP, Peru · October 2014 – December 2015

## Featured projects
Format for each: Problem → What I built → Tools → Result → Links

### 1. Teams chatbot — innovation contest winner (Sura Peru)
- **When:** Analyst III role, April 2023 – September 2025
- **Problem:** [FILL — the pain point behind employee process questions, e.g., how people got answers before the bot (the résumé doesn't say)]
- **What I built:** A rule-based Microsoft Teams chatbot that answered employee process questions, built and deployed with Power Virtual Agents + Power Automate
- **Tools:** Microsoft Teams, Power Virtual Agents, Power Automate
- **Result:** Won first place in the company's innovation contest; [FILL — time saved / users / requests per month, rounded]
- **Links:** No code (company property) — show a diagram or screenshot mock with no confidential data

### 2. Collections analytics & automation (Sura Peru)
- **When:** December 2016 – September 2025 (Analyst I → Analyst III, Collection Intelligence/Contribution Recovery)
- **Problem:** Each debt report took ~30 minutes to produce, the late-payment rate was 27%, and the panel of 5 external collection providers I supervised included redundant ones.
- **What I built:** Power BI dashboards, SQL data pipelines (DB2, BigQuery), Excel/VBA and Power Automate workflows
- **Tools:** Power BI, SQL (DB2, BigQuery), Python/pandas, Excel/VBA, Power Automate
- **Result:**
  - Lowered the late-payment rate from 27% to 24% by pairing the scoring model with targeted campaigns
  - Cut operating costs ~40% by using scoring and performance data to consolidate the redundant external providers I supervised (from a panel of 5)
  - Cut debt-report generation from ~30 minutes to ~2 minutes per report with Excel VBA and Access macros, enabling batch generation
  - Reduced manual processing ~45% across the team by building automations and standardized, parameter-driven reports (including self-service report tools for the legal team)
- **Links:** No code — anonymized dashboard mockup only [FILL — mockup image not made yet]

### 3. WhatsApp demand-signal pipeline (personal project, in progress)
- **Problem:** Small retailers serving Latin American communities in Ontario guess what to stock; demand is visible in community group chats but unstructured.
- **What I built:** A locale-aware parser (`wa_parse.py`) that handles Spanish-locale Android WhatsApp exports and their encoding quirks; now adding structured LLM extraction per message (product, category, brand, intent, urgency) with the Anthropic API.
- **Tools:** Python, Anthropic API, structured outputs
- **Result:** Parser built and validated; extraction stage in progress
- **Links:** [FILL — repo link, with sample data anonymized]

### 4. Vanna AI security analysis
- **Problem:** Text-to-SQL AI tools can expose databases to prompt-injection and code-execution risks.
- **What I built:** A security write-up analyzing known Vanna AI vulnerabilities (CVE-referenced), their impact and mitigations.
- **Tools:** Security research, CVE analysis, technical writing
- **Result:** Portfolio document
- **Links:** [FILL — PDF or page]

### 5. NYC Airbnb Data Summary Tool (CPSC-620, team project)
- **Problem:** Course group project — summarize and clean the NYC Airbnb dataset using an Agile workflow.
- **My role:** Owned the data-cleaning user story (US-02); worked through sprints, pull requests and peer code review on GitHub.
- **Tools:** Python, pandas, GitHub (PRs, reviews), Agile/Scrum
- **Links:** [FILL — repo link, only if the team agrees]

### Coming soon — AI Quest Log boss projects
New projects added as each learning stage finishes (finance-style first, then retail / logistics / public-sector data).

## Skills
- **Data & BI:** SQL (DB2, BigQuery), Power BI, Tableau, Excel
- **Programming:** Python (pandas)
- **Automation:** Power Automate, Excel/VBA, Teams chatbots
- **AI/ML:** LLM APIs (Anthropic), prompt engineering, ML fundamentals (DeepLearning.AI/Stanford ML Specialization, in progress)
- **Ways of working:** Git & GitHub, Agile/Scrum, working with business stakeholders

## Education & learning
- Master of Data Analytics — University of Niagara Falls Canada (expected March 2027)
- Bachelor's in Information Systems Engineering — University of Lima, Lima, Peru (completed July 2016)
- Completed (2026): AI for Everyone, Generative AI for Everyone, AI Prompting for Everyone, ChatGPT Prompt Engineering for Developers (DeepLearning.AI); Complete SQL and Database Fundamentals (Udemy)
- In progress: Machine Learning Specialization (DeepLearning.AI / Stanford)
- Planned: Microsoft PL-300 Power BI Data Analyst (Feb–Mar 2027)

## AI Quest Log (Oct 2026 – Jun 2027) — for the Quest Log page
A gamified learning plan; each stage ends with a "boss project" published on GitHub.
- Stage 1 — ML Specialization, Course 1 · Boss: [FILL]
- Stage 2 — ML Specialization, Course 2 · Boss: [FILL]
- Stage 3 — ML Specialization, Course 3 · Boss: [FILL]
- Stage 4 — PL-300 Power BI exam · Boss: [FILL]
- Stage 5 — Agentic AI course · Boss: [FILL]
Show status per stage: done / in progress / locked.

## Contact
- **Email:** mauriciocalderon24@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/mauriciocalderonb24
- **GitHub:** https://github.com/mauricioc24
- **Resume PDF:** `Mauricio-Calderon-Barrientos-Resume.pdf` (repo root)

## Rules for the site
- Visual design follows brand/BRAND.md (Day hero, white/ivory dominant, Emil Kowalski polish).
- English only (for now). Recruiter-first: who I am, what I do, and proof within 10 seconds.
- No confidential employer data or client names. Sura figures: only the ones already published in my résumé, exactly as written there (no new or re-rounded numbers).
- No photo for now [or FILL: add headshot.jpg].
