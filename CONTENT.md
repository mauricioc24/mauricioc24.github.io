# CONTENT.md — source of truth for my portfolio site

> Claude: use only the facts in this file. Anything marked [FILL] is a placeholder I still need to confirm — never invent numbers. On the public site, anything still marked [FILL] is hidden (not shown as a TODO) and listed in TODO.md.
>
> Résumé-derived values (LinkedIn, chatbot details, Sura metrics, dates, bachelor's degree) were filled on Nov 3, 2026 from `Mauricio-Calderon-Barrientos-Resume.pdf`, with figures exactly as written there. Added from the same résumé on Nov 4, 2026: the BI skill keywords (Data modelling, DAX, Power Query, KPI development, SQL Server, Access), German, and the customer self-service app.
>
> Nov 5, 2026: one analyst pitch (Business Analyst, Data Analyst, Business Systems Analyst), the "Building next" project plan, La IAma channels, PL-300 moved to January 2027, the chatbot tool relabelled Copilot Studio (formerly Power Virtual Agents), and the AI Quest Log removed.

## Identity
- **Name:** Mauricio Calderón Barrientos (always this spelling, with the accent)
- **Location:** Burlington, Ontario, Canada (open to the Toronto and Hamilton area, hybrid or on-site)
- **Hero big line:** Mauricio Calderón Barrientos makes data useful (plain text, no spray: brand art lives only in the La IAma box)
- **Hero subtitle:** I'm a business and data analyst. For 8+ years I've turned business processes into automated, data-driven workflows.
- **Sub-headline:** I build reports and automations that cut manual work.
- **Tools line (near the top):** SQL · Power BI · DAX · Power Query · Power Automate · Copilot Studio
- **Target roles:** Business Analyst · Data Analyst · Business Systems Analyst
- **Industries I'm aiming at:** Retail & logistics · Public sector · Tech
- **Languages:** Spanish (native), English (C1), German (intermediate)

## About (short)
I'm a business and data analyst with 8+ years of experience in BI and process automation, most recently leading collections analytics at Sura Peru. There I built Power BI reporting, SQL pipelines (DB2, BigQuery) and Excel/VBA + Power Automate workflows, and created a Microsoft Teams chatbot that won first place in the company's innovation contest. I'm now completing a Master of Data Analytics at the University of Niagara Falls Canada (March 2027). I'm a generalist: I like sitting between the business problem and the technical solution.

## Experience (from résumé)
- **Analyst III, Collection Intelligence/Contribution Recovery** — Sura Peru – AFP Integra · April 2023 – September 2025
  - Led the requirements, design, UAT, user-flow documentation, and vendor coordination for a customer self-service app, working with stakeholders and vendors from conception to delivery.
- **Analyst II, Collection Intelligence/Contribution Recovery** — Sura Peru – AFP Integra · April 2019 – March 2023
- **Analyst I, Collection Intelligence/Contribution Recovery** — Sura Peru – AFP Integra · December 2016 – March 2019
- **IT Intern** — CCR Cuore Research & Consulting, Peru · January 2016 – July 2016
- **Post-Sale Operations Intern** — Banco de Crédito BCP, Peru · October 2014 – December 2015

## Projects I've done
Format for each: Problem, What I built, Tools, Result, Links. Each also has a type label (Work at Sura, Personal, Course team), the roles it supports, and an "AI use" line only where this file or the résumé supports it.

### 1. Collections analytics & automation (Sura Peru) — featured first
- **Type:** Work at Sura
- **Roles it supports:** Data analyst, Business analyst
- **When:** December 2016 – September 2025 (Analyst I to Analyst III, Collection Intelligence/Contribution Recovery)
- **Problem:** Each debt report took ~30 minutes to produce, the late-payment rate was 27%, and the panel of 5 external collection providers I supervised included redundant ones.
- **What I built:** Power BI dashboards, SQL data pipelines (DB2, BigQuery), Excel/VBA and Power Automate workflows
- **Tools:** Power BI, SQL (DB2, BigQuery), Python/pandas, Excel/VBA, Power Automate
- **Result:**
  - Lowered the late-payment rate from 27% to 24% by pairing the scoring model with targeted campaigns
  - Cut operating costs ~40% by using scoring and performance data to consolidate the redundant external providers I supervised (from a panel of 5)
  - Cut debt-report generation from ~30 minutes to ~2 minutes per report with Excel VBA and Access macros, enabling batch generation
  - Reduced manual processing ~45% across the team by building automations and standardized, parameter-driven reports (including self-service report tools for the legal team)
- **AI use (résumé):** used generative AI to accelerate complex BigQuery SQL development while migrating the reporting extraction to BigQuery (2025). How it was checked: [FILL — how you checked the AI-written SQL]
- **Links:** No code — anonymized dashboard mockup only [FILL — mockup image not made yet]

### 2. Teams chatbot — innovation contest winner (Sura Peru)
- **Type:** Work at Sura
- **Roles it supports:** Business systems analyst, Automation analyst
- **When:** Analyst III role, April 2023 – September 2025
- **Problem:** [FILL — the pain point behind employee process questions, e.g., how people got answers before the bot (the résumé doesn't say)]
- **What I built:** A rule-based Microsoft Teams chatbot that answered employee process questions, built and deployed with Copilot Studio (formerly Power Virtual Agents) + Power Automate
- **Tools:** Microsoft Teams, Copilot Studio (formerly Power Virtual Agents), Power Automate
- **Result:** Won first place in the company's innovation contest; [FILL — time saved / users / requests per month, rounded]
- **AI use:** [FILL — the bot was rule-based; add a line only if AI was used, and how it was checked]
- **Links:** No code (company property) — show a diagram or screenshot mock with no confidential data

### 3. WhatsApp demand-signal pipeline (personal project, in progress)
- **Type:** Personal
- **Roles it supports:** Data analyst
- **Problem:** Small retailers serving Latin American communities in Ontario guess what to stock; demand is visible in community group chats but unstructured.
- **What I built:** A locale-aware parser (`wa_parse.py`) that handles Spanish-locale Android WhatsApp exports and their encoding quirks; now adding structured LLM extraction per message (product, category, brand, intent, urgency) with the Anthropic API.
- **Tools:** Python, Anthropic API, structured outputs
- **Result:** Parser built and validated; extraction stage in progress
- **AI use:** LLM extraction per message with the Anthropic API (structured outputs). How it is checked: [FILL]
- **Links:** [FILL — repo link, with sample data anonymized]

### 4. Vanna AI security analysis
- **Type:** Personal [confirm]
- **Roles it supports:** Business systems analyst
- **Problem:** Text-to-SQL AI tools can expose databases to prompt-injection and code-execution risks.
- **What I built:** A security write-up analyzing known Vanna AI vulnerabilities (CVE-referenced), their impact and mitigations.
- **Tools:** Security research, CVE analysis, technical writing
- **Result:** Portfolio document
- **AI use:** [FILL — only if AI was used in the write-up, and how it was checked]
- **Links:** [FILL — PDF or page]

### 5. NYC Airbnb Data Summary Tool (CPSC-620, team project)
- **Type:** Course team
- **Roles it supports:** Data analyst
- **Problem:** Course group project — summarize and clean the NYC Airbnb dataset using an Agile workflow.
- **My role:** Owned the data-cleaning user story (US-02); worked through sprints, pull requests and peer code review on GitHub.
- **Tools:** Python, pandas, GitHub (PRs, reviews), Agile/Scrum
- **AI use:** [FILL — only if AI was used, and how it was checked]
- **Links:** [FILL — repo link, only if the team agrees]

## Building next (planned projects)
Each is labelled "Planned", with a target month and the roles it supports. Each one moves into the projects above, with a case study, when it ships.

### Toronto 311 monthly operations briefing, automated — Dec 2026
- Builds the monthly briefing from Toronto open data: SQL star schema, Power BI with DAX, a forecast checked against a seasonal-naive baseline, and AI-written commentary with a validator that blocks any number not in the data.
- Measured: briefing minutes, manual vs automated.
- Roles: Business analyst, data analyst.

### Job-posting triage and coding-QA agent, with evals — Jan 2027
- A Python agent that flags likely occupation mis-codes in Job Bank postings for review, scored on about 150 hand-labelled postings with a held-out test set.
- Measured: triage time by hand vs with the agent.
- Roles: Business systems analyst, automation analyst.

### Bike Share Toronto rebalancing optimizer — Feb 2027
- A station demand forecast and a mixed-integer model (Gurobi, rerunnable with an open solver), compared with no rebalancing and a greedy heuristic. Results labelled "modelled".
- Roles: Data analyst, retail and logistics.

### Ontario retail demand and price monitor — spring 2027
- Statistics Canada retail, CPI and price tables refreshed by API into Tableau Public and an Excel export, with checked AI commentary.
- Roles: Data analyst, BI analyst.

### TTC delay early-warning report — spring 2027
- Which causes and stations drive lost minutes, with alerts when a pattern breaks, from TTC delay open data.
- Roles: Data analyst, BI analyst, public sector.

## La IAma (my personal brand)
La IAma is my channel where I share what I learn about AI and how I use it to save time. The llama logo, the chicha colours and the paint style belong to La IAma only, so on this site they appear only in the La IAma box on the home page (and the 404 llama).
- **Instagram:** https://www.instagram.com/la.iama.ai/
- **TikTok:** https://www.tiktok.com/@la.iama
- **YouTube:** [FILL — channel URL]
- **LinkedIn:** [FILL — La IAma LinkedIn URL]

## Skills
- **Data & BI:** SQL (DB2, BigQuery, SQL Server), Power BI (DAX, Power Query), Data modelling, KPI development, Tableau, Excel & Access
- **Programming:** Python (pandas)
- **Automation:** Power Automate, Copilot Studio (formerly Power Virtual Agents), Excel/VBA, Teams chatbots
- **AI/ML:** LLM APIs (Anthropic), prompt engineering, ML fundamentals (DeepLearning.AI/Stanford ML Specialization, in progress)
- **Ways of working:** Git & GitHub, Agile/Scrum, working with business stakeholders

## Education & learning
- Master of Data Analytics — University of Niagara Falls Canada (expected March 2027)
- Bachelor's in Information Systems Engineering — University of Lima, Lima, Peru (completed July 2016)
- Completed (2026): AI for Everyone, Generative AI for Everyone, AI Prompting for Everyone, ChatGPT Prompt Engineering for Developers (DeepLearning.AI); Complete SQL and Database Fundamentals (Udemy)
- In progress: Machine Learning Specialization (DeepLearning.AI / Stanford)
- Planned: Microsoft PL-300 Power BI Data Analyst (January 2027)

## Contact
- **Email:** mauriciocalderon24@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/mauriciocalderonb24
- **GitHub:** https://github.com/mauricioc24
- **Resume PDF:** `Mauricio-Calderon-Barrientos-Resume.pdf` (repo root)

## Rules for the site
- Visual design follows brand/BRAND.md (Day hero, white/ivory dominant, Emil Kowalski polish). Brand art (llama, neon, paint) only in the La IAma box and the 404 llama.
- Writing: plain, direct, first person, short sentences. No em or en dashes as punctuation on the site; "→" only inside metrics like 27% → 24%. No buzzwords or AI writing patterns.
- English only (for now). Recruiter-first: who I am, what I do, and proof within 10 seconds.
- No confidential employer data or client names. Sura figures: only the ones already published in my résumé, exactly as written there (no new or re-rounded numbers).
- No photo for now [or FILL: add headshot.jpg].
