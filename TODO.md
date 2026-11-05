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
- **DAX and Power Query on a Sura project.** They're in the tools line and Skills, but neither Sura project lists them, so the skills matrix only shows DAX on the planned 311 briefing. If you used them in the collections work, add them to that project's `"tools"` and the matrix updates by itself.

## When a planned project ships

1. In `projects.json`, change its `"status"` from `"planned"` to `"shipped"`, and give it a `"slug"`, a `"type"` (for example "Work at Sura" or a new label like "Personal") and the case-study fields (problem, what you built, results). A new type label adds a new filter chip by itself.
2. Add its page by copying `projects/teams-chatbot.html` (see "Adding a project" in `CLAUDE.md`, or ask Claude).

## Optional

- **Certificates** from your résumé aren't on the site yet (Advanced Excel, Power BI & Dashboards, ESAN Executive Program in BI, Google Cloud GenAI paths). Add them to `CONTENT.md` first if you want them shown.
