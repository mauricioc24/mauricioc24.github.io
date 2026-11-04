# TODO: what's still missing from the site

Everything below is **hidden on the public site** until you fill it in. Recruiters never see a "TODO". The missing piece simply doesn't appear yet.

**How to fill one:** open the file named in the table, find the `[FILL — …]` text, replace the *whole thing* (brackets included) with the real value, save and commit. It shows up on the site by itself. Then update the same line in `CONTENT.md`, which stays the source of truth.

## Missing facts and links

| # | What's missing | Where it will appear | Where to type it |
|---|---|---|---|
| 1 | **Teams chatbot: the problem.** One sentence on what pain the bot solved (for example, how people got answers before it existed). The résumé only says it handled "employee process questions". Still waiting: the Nov 4 request arrived with the placeholder "[your one sentence]" unfilled. | A "Problem" section at the top of the chatbot case study | `projects.json` → `teams-chatbot` → `"problem"` |
| 2 | **Teams chatbot: usage numbers.** Time saved, number of users, or requests per month. | A second line under "Result" | `projects.json` → `teams-chatbot` → second item in `"results"` |
| 3 | **Collections dashboard mockup.** An anonymized image with no real figures beyond the ones in your résumé. | A picture in the collections case study | Put the image in `assets/img/`, then set `projects.json` → `collections-analytics` → `"visual"` → `"src"` (for example `"/assets/img/collections-mockup.png"`) |
| 4 | **WhatsApp pipeline: repo link**, with the sample data anonymized | "Links" section of that case study | `projects.json` → `whatsapp-demand-signals` → `"links"` → `"href"` |
| 5 | **Vanna AI write-up: PDF or page link** | "Links" section | `projects.json` → `vanna-ai-security` → `"links"` → `"href"` |
| 6 | **NYC Airbnb: team repo link**, only if the team agrees | "Links" section | `projects.json` → `nyc-airbnb-summary` → `"links"` → `"href"` |
| 7–11 | **Quest Log boss projects** for stages 1, 2, 3, 4 and 5 | A "Boss project" line under each stage | `projects.json` → `"questLog"` → `"stages"` → `"boss"` |
| 12 | **Headshot (optional).** CONTENT.md says "no photo for now". | About page, as a sticker. BRAND.md allows the llama *or* your photo there (one per screen), so you'd pick one. | Add `headshot.jpg` to the repo and ask Claude |

### Formats, so the JSON stays valid

- A link: `{ "label": "Code on GitHub", "href": "https://github.com/mauricioc24/your-repo" }`
- A boss project: `"boss": "Price forecaster"`, or, once it has a page, `"boss": { "title": "Price forecaster", "href": "/projects/price-forecaster.html" }`
- An image: `"visual": { "type": "image", "src": "/assets/img/collections-mockup.png", "alt": "Anonymized collections dashboard", "width": 1600, "height": 900 }`

## When a Quest Log stage is finished

1. In `projects.json` → `"questLog"`, change that stage's `"status"` to `"done"` and the next stage's to `"in-progress"`.
2. Set its `"boss"` to the project.
3. Add the boss project as a new project (see "Adding a project" in `CLAUDE.md`, or ask Claude to do it).

## Optional polish (visible now, but worth a look)

- **About page color story.** It uses the wording suggested in `brand/BRAND.md`. Rewrite it in your own voice when you have a minute: it's in `about/index.html`, inside "Why these colors".
- **Résumé facts not on the site yet:** your certificates (Advanced Excel, Power BI & Dashboards, ESAN Executive Program in BI, Google Cloud GenAI paths). Add them to `CONTENT.md` first if you want them shown. (The BI skill keywords, German and the self-service app were added on Nov 4, 2026.)
