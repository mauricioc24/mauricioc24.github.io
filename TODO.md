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
| 5 | **WhatsApp pipeline: how you check the LLM extraction.** | Added to the "AI use" line | `whatsapp-demand-signals` → `"ai"` → `"checked"` |
| 6 | **WhatsApp pipeline: repo link**, with the sample data anonymized | A "Code" link on the entry and the case study | `whatsapp-demand-signals` → `"links"` → `"href"` |
| 7 | **Vanna AI write-up: PDF or page link** | A "Write-up" link | `vanna-ai-security` → `"links"` → `"href"` |
| 8 | **NYC Airbnb: team repo link**, only if the team agrees | A "Code" link | `nyc-airbnb-summary` → `"links"` → `"href"` |
| 9 | **AI use lines** for the Teams chatbot, Vanna AI, NYC Airbnb, the Bike Share optimizer and the TTC report. Fill one only if AI was (or will be) used, and say how it was checked. The chatbot was rule-based. | An "AI use" line on the entry (and the case study for shipped work) | each project's `"ai"` → `"used"` and `"checked"` |
| 10 | **La IAma YouTube link** | A YouTube button in the La IAma box | `"laIama"` → YouTube → `"href"` |
| 11 | **La IAma LinkedIn link** | A LinkedIn button in the La IAma box | `"laIama"` → LinkedIn → `"href"` |
| 12 | **Headshot (optional).** CONTENT.md says "no photo for now". | About page | Add `headshot.jpg` and ask Claude |

### Formats, so the JSON stays valid

- A link: `{ "kind": "code", "label": "Code", "href": "https://github.com/mauricioc24/your-repo" }`. Use `"label": "Video"` for a video.
- A channel: `{ "label": "YouTube", "icon": "youtube", "href": "https://www.youtube.com/@your-channel" }`
- An image: `"visual": { "type": "image", "src": "/assets/img/collections-mockup.png", "alt": "Anonymized collections dashboard", "width": 1600, "height": 900 }`

## Please confirm (visible now, my best reading)

- **Roles each past project supports.** I chose these from your target roles: Collections (data analyst, business analyst), Teams chatbot (business systems analyst, automation analyst), WhatsApp pipeline (data analyst), Vanna AI (business systems analyst), NYC Airbnb (data analyst). Change any `"roles"` in `projects.json`.
- **Vanna AI type.** It shows as "Personal". If it was a course assignment, change `"type"` to "Course team" (or tell Claude a better label).
- **DAX and Power Query on a past project.** They're in the tools line and Skills, but no past project lists them, so the skills matrix doesn't show them. If you used them in the collections work, add them to that project's `"tools"` and the matrix updates by itself.

## When a planned project ships

1. Move its entry from `"planned"` to `"projects"` in `projects.json`, with a `slug`, a `"type"` and the case-study fields (problem, what you built, results).
2. Add its page by copying `projects/vanna-ai-security.html` (see "Adding a project" in `CLAUDE.md`, or ask Claude).

## Optional

- **Certificates** from your résumé aren't on the site yet (Advanced Excel, Power BI & Dashboards, ESAN Executive Program in BI, Google Cloud GenAI paths). Add them to `CONTENT.md` first if you want them shown.
