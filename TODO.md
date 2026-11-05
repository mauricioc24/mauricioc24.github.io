# TODO: what's still missing from the site

Everything in the first table is **hidden on the public site** until you fill it in. Recruiters never see a "TODO". The missing piece simply doesn't appear yet.

**How to fill one:** open `projects.json`, find the `[FILL: …]` text, replace the *whole thing* (brackets included) with the real value, save and commit. It shows up on the site by itself. Then update the same line in `CONTENT.md`, which stays the source of truth.

## Hidden until you fill them in

| # | What's missing | Where it will appear | Where to type it in `projects.json` |
|---|---|---|---|
| 1 | **Teams chatbot: the problem.** One sentence on what pain the bot solved (for example, how people got answers before it). The résumé only says it handled "employee process questions". | A "Problem" section in the chatbot case study | `teams-chatbot` → `"problem"` |
| 2 | **Teams chatbot: usage numbers.** Time saved, users, or requests per month. | A second line under "Result" | `teams-chatbot` → second item in `"results"` |
| 3 | **Collections dashboard mockup.** An anonymized image with no figures beyond the ones in your résumé. | A picture in the collections case study | Put the image in `assets/img/`, then set `collections-analytics` → `"visual"` → `"src"` |
| 4 | **Collections: how you checked the AI-written BigQuery SQL.** The résumé says you used generative AI to speed it up, not how you checked it. | Added to the "AI use" line | `collections-analytics` → `"ai"` → `"checked"` |
| 5 | **AI use lines** for the Teams chatbot, the Bike Share optimizer and the TTC report. Fill one only if AI was (or will be) used, and say how it was checked. The chatbot was rule-based. | An "AI use" line on the entry (and in the case study for shipped work) | each project's `"ai"` → `"used"` and `"checked"` |
| 6 | **La IAma YouTube link** | A YouTube button in the La IAma box | `"laIama"` → YouTube → `"href"` |
| 7 | **La IAma LinkedIn link** | A LinkedIn button in the La IAma box | `"laIama"` → LinkedIn → `"href"` |
| 8 | **Headshot (optional).** CONTENT.md says "no photo for now". | About page | Add `headshot.jpg` and ask Claude |

### Formats, so the JSON stays valid

- A link on a shipped project: `{ "kind": "code", "label": "Code", "href": "https://github.com/mauricioc24/your-repo" }`. Use `"label": "Video"` for a video.
- A channel: `{ "label": "YouTube", "icon": "youtube", "href": "https://www.youtube.com/@your-channel" }`
- An image: `"visual": { "type": "image", "src": "/assets/img/collections-mockup.png", "alt": "Anonymized collections dashboard", "width": 1600, "height": 900 }`

## Please confirm (visible now, my best reading)

- **Roles for your two Sura projects.** I chose these from your target roles: Collections (data analyst, business analyst) and the Teams chatbot (business systems analyst, automation analyst). Change any `"roles"` in `projects.json`.
- **Order on the home page.** "Studying now" comes before "Personal brand", because recruiters look for studies first. Swap them if you prefer.
- **Home About.** The paragraph that repeated the hero is gone (the About page keeps it). The chatbot card now says it won first place, so the home page still mentions it.
- **Skill logos are uneven.** Only Python, BigQuery and Anthropic have logos, while Power BI, Excel and Tableau can't. If that puts too much weight on Python, say so and the skill logos can go.
- **DAX and Power Query on a Sura project.** They're in the tools line and Skills, but neither Sura project lists them, so the skills matrix only shows DAX on the planned 311 briefing. If you used them in the collections work, add them to that project's `"tools"` and the matrix updates by itself.

## Logos still shown as text

The site shows a small grey logo next to a school, certificate issuer or tool only when a clean official file is available (BRAND.md, Logos). These are text for now:

| Name | Where it appears | Why it's text | Where the official logo can come from |
|---|---|---|---|
| University of Niagara Falls Canada | Studying now, Education | This session's network blocked unfc.ca | unfc.ca (brand or media page) |
| University of Lima | Education | Network blocked ulima.edu.pe | ulima.edu.pe |
| DeepLearning.AI | Studying now, Education, Certificates | Not in Simple Icons; network blocked deeplearning.ai | deeplearning.ai |
| Data Management Corp. Peru | Certificates | Network blocked dmc.pe | dmc.pe |
| ESAN University | Certificates | Network blocked ue.edu.pe | ue.edu.pe |
| Cibertec Technology Institute | Certificates | Network blocked cibertec.edu.pe | cibertec.edu.pe |
| Cambridge Innovation Center Peru | Certificates | Not in Simple Icons, and I couldn't look up its official site | Its own site or press kit |
| Microsoft (PL-300) | Studying now, Education | Microsoft's trademark guidelines don't allow its logo without a licence | Leave as text. After you pass PL-300, you can show the official certification badge |
| Power BI, Excel, Access, SQL Server, Power Automate, Copilot Studio, Teams | Skills | Microsoft's icon terms only cover architecture diagrams, training and documentation | Leave as text |
| Tableau | Skills | Not in Simple Icons; network blocked tableau.com | Tableau's press kit |
| DB2 (IBM) | Skills | Not in Simple Icons; network blocked ibm.com | IBM's brand site |
| pandas | Skills | pandas' rules: at least 55px on the web, in full colour or white only, so not small and grey | Leave as text |
| Git & GitHub | Skills | Kept as text, like the other "ways of working" | — |

**To add one:** save the official file as `assets/img/logos/<name>.svg` (or `.png`), make it one grey (`#83887F`) only if the organization allows that, and ask Claude to put it next to the name.

### Check these five logos (in use now)

They come from Simple Icons and are shown in one grey. I couldn't open the brands' own guidelines (the network blocked them), so please check that a one-colour grey version is OK. If a brand says no, use its original colours or remove the logo.

- Python: https://www.python.org/community/logos/
- Google BigQuery and Google Cloud: https://about.google/brand-resource-center
- Udemy: https://support.udemy.com/hc/en-us/articles/8926753692567-Trademark-Usage-Guidelines
- Anthropic: the press kit on anthropic.com (its download was blocked too)

## When a planned project ships

1. In `projects.json`, change its `"status"` from `"planned"` to `"shipped"`, and give it a `"slug"`, a `"type"` (for example "Work at Sura" or a new label like "Personal") and the case-study fields (problem, what you built, results). A new type label adds a new filter chip by itself.
2. Add its page by copying `projects/teams-chatbot.html` (see "Adding a project" in `CLAUDE.md`, or ask Claude).

