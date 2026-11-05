# LEARNINGS: how this site works and why

Plain-English notes for Mauricio. No Git experience assumed.

---

## 1. The big picture

- This **repository** ("repo") is a folder of files that lives on GitHub. GitHub keeps every version of every file.
- **GitHub Pages** turns the files on the `main` branch into the website at **https://mauricioc24.github.io**. When `main` changes, the site updates within a minute or two.
- Nobody edits `main` directly. Changes are made on a separate **branch**, proposed in a **pull request** (PR), checked, and then **merged** into `main`. Merging is the moment the site goes live.

> Check once: on GitHub, open **Settings → Pages**. "Source" should say **Deploy from a branch**, branch **main**, folder **/ (root)**.

## 2. Git words you'll see, using this project as the example

| Word | What it means here |
|---|---|
| **Commit** | A saved snapshot with a short message saying what changed and why, like "Build the portfolio site". |
| **Branch** | A parallel copy where work happens safely. This PR was built on `claude/exciting-carson-ru6u7d`. |
| **Push** | Uploading commits from a computer to GitHub. |
| **Pull request (PR)** | A page on GitHub that says "here are the changes; please review and merge". It shows every changed line under **Files changed**. |
| **Merge** | Accepting the PR, which copies the branch's commits into `main`. The site updates. |
| **CI / GitHub Actions** | Robots that run checks on every PR (see section 7). Green ✓ means passed, red ✗ means something needs fixing. |

**To publish this PR:** open it on GitHub, look through **Files changed**, wait for the green ✓ on the checks, then click **Merge pull request** → **Confirm merge**. Visit the site two minutes later.

## 3. Where things live

| Path | What it is |
|---|---|
| `index.html` | Home page |
| `projects/index.html` | All projects |
| `projects/<name>.html` | One case-study page per project |
| `experience/sura/index.html` | One page for your whole job at Sura Peru (AFP Integra): roles, results, BigQuery migration, self-service app |
| `about/index.html` | About page |
| `404.html` | The "page not found" page (the llama one) |
| `projects.json` | **All project data:** the 7 entries on the Projects page (2 Sura projects, then 5 planned ones) and the La IAma channel links. Most content updates happen here. |
| `assets/css/site.css` | Page styles, built on top of the brand tokens |
| `assets/js/site.js` | Turns `projects.json` into the project showcase, filters, skills matrix, case studies and La IAma links; handles "Copy email" |
| `assets/img/` | Favicon, the social preview image, and `logos/` (the small grey logos) |
| `brand/` | Your brand kit: `BRAND.md` (the rules), `brand-tokens.css` (colors and type), style guide, llama images |
| `Mauricio-Calderon-Barrientos-Resume.pdf` | The résumé every "Download résumé" button points to |
| `CONTENT.md` | Source of truth for every fact on the site |
| `TODO.md` | What's still missing (hidden on the site until filled) |
| `CLAUDE.md` | Rules Claude follows when working on this repo |
| `.claude/skills/` | Emil Kowalski's design skills, which Claude uses for motion and polish |
| `.github/` | The automatic checks that run on pull requests |
| `review-screenshots/` | Final screenshots of the home and Projects pages (desktop and phone) |
| `.nojekyll` | An empty file that tells GitHub Pages "serve these files as they are" |

## 4. Preview the site on your computer

Double-clicking `index.html` *almost* works, but browsers block pages opened as files from loading `projects.json`, so the projects would be missing. Start a tiny local web server instead:

```bash
python3 -m http.server 8000
```

Run it inside the repo folder, then open http://localhost:8000. Press Ctrl+C to stop it.

## 5. Updating content

- **A project:** edit `projects.json`. Keep the quotes, commas and brackets intact. If the file breaks, the projects won't load, and the automatic checks will flag it on the PR.
- **A planned project that shipped:** change its `"status"` from `"planned"` to `"shipped"` and give it a case-study page (`TODO.md` has the steps).
- **Something marked `[FILL: …]`:** replace the whole marker, brackets included, with the real value. It appears on the site automatically. `TODO.md` lists every one.
- **A new résumé:** upload it with the **same file name**, `Mauricio-Calderon-Barrientos-Resume.pdf`, and every button keeps working.
- **Always update `CONTENT.md` too.** It's the master list of facts.

## 6. Decisions, and why

**Plain HTML/CSS/JS, no build step.** What you see in the files is exactly what the browser gets. Nothing to install, nothing to compile, and nothing that breaks when tools update.

**One `projects.json`.** Project facts live in one place. The home page, the projects page and every case study read from it, so a number changed once changes everywhere.

**A small HTML page per case study.** Each project gets its own link with its own title and description. LinkedIn and Slack read those when someone shares the link, so the preview shows the right project.

**Header and footer copied into every page.** Without a build step, the alternative was building them with JavaScript, which loads later and can fail. The trade-off: when the footer changes (say, a new link), all 7 pages need the same edit. Claude knows this rule (it's in `CLAUDE.md`).

**Missing info is hidden, not shown as "TODO".** A recruiter should never see a placeholder. Anything with `[FILL` simply doesn't appear, and `TODO.md` remembers it for you.

**Résumé numbers are copied exactly.** "~30 minutes to ~2 minutes" stays exactly that, never "93% faster". Numbers that match your résumé word for word are numbers you can defend in an interview.

**A calm portfolio; the art lives in La IAma (Nov 5, 2026).** The llama, the neon colours and the paint belong to La IAma, your channel about AI. So the portfolio stays calm everywhere: no paint on "useful", no stripe tags or colour steps, no llama in the footer. All of that lives in one La IAma box on the home page, under "Personal brand", with your Instagram and TikTok links. The 404 page keeps its llama. The footer stays black with ivory links. The rule is written down in BRAND.md and CLAUDE.md.

**Plain writing.** Every page and `projects.json` use plain, first-person sentences. There are no em or en dashes (date ranges read "Apr 2023 to Sep 2025"), and arrows appear only inside numbers like 27% → 24%. The pull request lists every line that changed, before and after.

**A recruiter should get it in 10 seconds (third pass, Nov 5, 2026).** Anything that didn't help with that was simplified or removed. Right under the hero there's now a short Experience list: Sura Peru (AFP Integra), Analyst I to III, Dec 2016 to Sep 2025, with a "See results" link, then your two internships. The results moved one click away, to the Sura page, which tells the whole job on one page: your promotions, the four results, the BigQuery migration, the self-service app and links to both case studies. "Now" became two sections: "Studying now" (recruiters care) and "Personal brand" (La IAma, last).

**"Sura Peru (AFP Integra)", always.** So nobody wonders where the work happened. The filter chip says "Work at Sura Peru".

**Open to remote.** The hero, the About facts and the footer say so. The footer heading is shorter now: "Open to analyst roles in Toronto, Hamilton or remote." 

**A project showcase studied from jwilber.me.** Its entries show a thumbnail, a title, a line of text and small links. Here, hovering darkens the thumbnail's outline. Here each entry adds what a recruiter scans for: the type (Work at Sura Peru or Planned), the roles it supports, the main tools, and an "AI use" line when your résumé or CONTENT.md supports one. Thumbnails only use real content: your metrics, the chatbot diagram, or a big word like "311". Nothing is made up.

**Filters and a skills matrix on Projects.** The chips filter by type, with no animation (BRAND.md says filters stay instant). The matrix shows which tools each project uses, so keywords like Power BI or Python are tied to real work. A tool appears there only if a project lists it, which keeps it honest.

**Seven entries, no separate plan page.** The Quest Log is gone, and so are the WhatsApp pipeline, the Vanna AI analysis and the NYC Airbnb tool. The Projects page now holds exactly seven entries: your two Sura projects (Collections first), then the five planned ones in order (Toronto 311, the job-posting agent, Bike Share, the retail monitor and the TTC report). Each planned one shows "Planned", its target month and the roles it supports, with no case-study link until it ships. The filter chips follow the data, so today they're just "Work at Sura Peru" and "Planned".

**One llama per screen.** Now the llama appears only in the La IAma box and on the 404 page.

**Very little motion, on purpose** (Emil Kowalski's rule: motion people see often should be fast or absent). Buttons press in slightly. With a mouse, a project's thumbnail outline gets darker on hover. Nothing moves on hover anymore (see "The Emil audit" below). Copying the email shows a small toast that follows Sonner's habits: it stays 4 seconds, waits while you hover it or switch tabs, and a click closes it. The 404 llama nods once. No fade-ins on scroll, because they make people wait to read. Anyone whose system asks for reduced motion gets no movement at all.

**Accessible by default.** Text contrast is at least 4.5:1 everywhere (checked with real numbers). There's a "Skip to content" link for keyboard users, every meaningful image has a description (purely decorative ones are marked so screen readers skip them), and all pages pass an automated accessibility scan (axe) with zero problems.

**All 16 of Emil's skills are in.** `write-swift`, `animate-expo` and `ask-sonner` were added on Nov 5, 2026. They target iPhone apps, React Native and a React toast library, so only their web ideas apply here, like Sonner's toast habits above.

**Skills use the résumé's exact tool names.** Recruiters search for words like DAX, Power Query or SQL Server, so the Skills list repeats them exactly as your résumé writes them ("Data modelling" keeps its Canadian spelling).

**The chatbot thumbnail is a mini diagram.** It's drawn from the same steps as the chatbot case study (the `"visual"` steps in `projects.json`), so the two can never disagree. The chatbot tool now reads "Copilot Studio (formerly Power Virtual Agents)", Microsoft's current name for it. A step can have a short label, like `"short": "Teams"`, so the small version stays compact. Change the steps once and both diagrams update.

**The self-service app lives on the Sura page,** word for word from the résumé, next to the BigQuery migration.

**The Emil audit (Nov 5, 2026).** Six of Emil's skills were run over every page at phone and desktop width: design polish, animation review, animation removal, mobile feel, Apple's design rules and "break the UI" (feeding the pages long names and big text). The biggest catch was real: the "Copilot Studio (formerly Power Virtual Agents)" tag was wider than its card on small phones and tablets, so the whole page scrolled sideways. Tags wrap now. Motion that had no job is gone (thumbnails don't lift, the llama doesn't tilt), every button and chip shows when it's pressed, and tap areas got a bit bigger. The pull request lists every finding with its rule and fix.

**Logos, small and grey (Nov 5, 2026).** Schools, certificate issuers and tools get a small logo in one muted grey, so the page stays calm. Only official files or Simple Icons (a free, open library) are allowed, and logos are never redrawn or stretched. Today only five could be sourced: Python, Google BigQuery, Google Cloud, Udemy and Anthropic. The network blocked the schools' and institutes' sites, and Microsoft's guidelines don't allow its logos without a licence, so those stay as text. TODO.md lists each one and where to get it.

**The `MC` favicon is drawn from the real Geist Mono letters**, as BRAND.md asks, until the pixel llama exists. The social preview image (`assets/img/og-image.png`) is what LinkedIn shows when someone shares the site.

## 7. The automatic checks on every pull request

`.github/workflows/site-checks.yml` runs two jobs:

1. **Lighthouse** grades all 7 pages from 0 to 100 on performance, accessibility, best practices and SEO (how well search engines can read the page). Accessibility, best practices and SEO must score 90+ or the check turns red. Performance only *warns*, because GitHub's shared computers vary in speed and would sometimes fail a perfectly good page. The full reports are attached to each run (open the run, then **Artifacts**).
2. **Broken links** checks that every link and image on every page works, that the fixed pages exist (home, Projects, About, the Sura page, 404), and that every shipped project in `projects.json` has its page (planned ones don't need one). It skips LinkedIn, Instagram and TikTok (they block all automated checkers, so click those links yourself once) and links to the live site (new pages only exist there after merging).

**If a check is red:** click **Details** next to it. The log says which page or link failed. Fix it on the same branch, push, and the checks run again.

## 8. What was checked before this PR

- Every page screenshotted at phone (375px) and desktop (1280px) width, reviewed against the checklist at the end of BRAND.md, and fixed until clean.
- **Lighthouse: 90+** in all four categories on every page, on both mobile and desktop (the exact scores are in each pull request).
- **axe accessibility scan: 0 violations** on every page at both widths.
- Every figure on the site compared word for word against the résumé and CONTENT.md.

## 9. Network access for research (Nov 5, 2026)

This session's cloud environment couldn't reach jwilber.me, so a small personal environment named `mauricioc24.github.io` was created (you approved it) that adds only `www.jwilber.me` and `jwilber.me`. It changes nothing on the website itself. You can see or remove it in the environment menu of a Claude Code session.

In the third pass, the same network blocked the official sites of your schools and certificate providers (unfc.ca, ulima.edu.pe, cibertec.edu.pe, dmc.pe, ue.edu.pe, deeplearning.ai, cloudskillsboost.google, udemy.com, python.org and others), so their logo files couldn't be downloaded. As you asked, nothing was worked around: those names stay as text, and TODO.md says where each logo can come from.
