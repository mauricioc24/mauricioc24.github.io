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
| `about/index.html`, `quest-log/index.html` | About and Quest Log pages |
| `404.html` | The "page not found" page (the llama one) |
| `projects.json` | **All project and Quest Log data.** Most content updates happen here. |
| `assets/css/site.css` | Page styles, built on top of the brand tokens |
| `assets/js/site.js` | Turns `projects.json` into project cards and case studies; handles "Copy email" |
| `assets/img/` | Favicon and the social preview image |
| `brand/` | Your brand kit: `BRAND.md` (the rules), `brand-tokens.css` (colors and type), style guide, llama images |
| `Mauricio-Calderon-Barrientos-Resume.pdf` | The résumé every "Download résumé" button points to |
| `CONTENT.md` | Source of truth for every fact on the site |
| `TODO.md` | What's still missing (hidden on the site until filled) |
| `CLAUDE.md` | Rules Claude follows when working on this repo |
| `.claude/skills/` | Emil Kowalski's design skills, which Claude uses for motion and polish |
| `.github/` | The automatic checks that run on pull requests |
| `review-screenshots/` | Final screenshots of the home page (desktop and phone) |
| `.nojekyll` | An empty file that tells GitHub Pages "serve these files as they are" |

## 4. Preview the site on your computer

Double-clicking `index.html` *almost* works, but browsers block pages opened as files from loading `projects.json`, so the projects would be missing. Start a tiny local web server instead:

```bash
python3 -m http.server 8000
```

Run it inside the repo folder, then open http://localhost:8000. Press Ctrl+C to stop it.

## 5. Updating content

- **A project or Quest Log stage:** edit `projects.json`. Keep the quotes, commas and brackets intact. If the file breaks, the projects won't load, and the automatic checks will flag it on the PR.
- **Something marked `[FILL — …]`:** replace the whole marker, brackets included, with the real value. It appears on the site automatically. `TODO.md` lists every one.
- **A new résumé:** upload it with the **same file name**, `Mauricio-Calderon-Barrientos-Resume.pdf`, and every button keeps working.
- **Always update `CONTENT.md` too.** It's the master list of facts.

## 6. Decisions, and why

**Plain HTML/CSS/JS, no build step.** What you see in the files is exactly what the browser gets. Nothing to install, nothing to compile, and nothing that breaks when tools update.

**One `projects.json`.** Project facts live in one place. The home page, the projects page and every case study read from it, so a number changed once changes everywhere.

**A small HTML page per case study.** Each project gets its own link with its own title and description. LinkedIn and Slack read those when someone shares the link, so the preview shows the right project.

**Header and footer copied into every page.** Without a build step, the alternative was building them with JavaScript, which loads later and can fail. The trade-off: when the footer changes (say, a new link), all 10 pages need the same edit. Claude knows this rule (it's in `CLAUDE.md`).

**Missing info is hidden, not shown as "TODO".** A recruiter should never see a placeholder. Anything with `[FILL` simply doesn't appear, and `TODO.md` remembers it for you.

**Résumé numbers are copied exactly.** "~30 minutes to ~2 minutes" stays exactly that, never "93% faster". Numbers that match your résumé word for word are numbers you can defend in an interview.

**Day surface, a little color.** About 90% of every page is calm ivory and text, and about 10% is art (BRAND.md). Neon only appears on black (the footer, the stripe tags) or as the one spray on "useful", because neon text on ivory is unreadable. The chullo reds stay on ivory, because red on black is unreadable too.

**One llama per screen.** The llama is a sticker on About, a small sign-off in the footer, and the star of the 404 page. The footer skips it on About and 404 so two llamas never meet on one screen.

**Very little motion, on purpose** (Emil Kowalski's rule: motion people see often should be fast or absent). The spray paints in once per visit. Buttons press in slightly. Cards lift 2px on hover with a mouse. Copying the email shows a small toast. The 404 llama nods once. No fade-ins on scroll, because they make people wait to read. Anyone whose system asks for reduced motion gets the painted spray and no movement.

**Accessible by default.** Text contrast is at least 4.5:1 everywhere (checked with real numbers). There's a "Skip to content" link for keyboard users, every meaningful image has a description (purely decorative ones are marked so screen readers skip them), and all pages pass an automated accessibility scan (axe) with zero problems.

**Why three of Emil's skills were left out.** `write-swift`, `animate-expo` and `ask-sonner` are for iPhone apps, React Native and a React toast library. This site uses none of those, so they'd only add noise.

**The `MC` favicon is drawn from the real Geist Mono letters**, as BRAND.md asks, until the pixel llama exists. The social preview image (`assets/img/og-image.png`) is what LinkedIn shows when someone shares the site.

## 7. The automatic checks on every pull request

`.github/workflows/site-checks.yml` runs two jobs:

1. **Lighthouse** grades all 10 pages from 0 to 100 on performance, accessibility, best practices and SEO (how well search engines can read the page). Accessibility, best practices and SEO must score 90+ or the check turns red. Performance only *warns*, because GitHub's shared computers vary in speed and would sometimes fail a perfectly good page. The full reports are attached to each run (open the run, then **Artifacts**).
2. **Broken links** checks that every link and image on every page works, and that every project in `projects.json` has its page. It skips LinkedIn (which blocks all automated checkers, so click that link yourself once) and links to the live site (new pages only exist there after merging).

**If a check is red:** click **Details** next to it. The log says which page or link failed. Fix it on the same branch, push, and the checks run again.

## 8. What was checked before this PR

- Every page screenshotted at phone (375px) and desktop (1280px) width, reviewed against the checklist at the end of BRAND.md, and fixed until clean.
- **Lighthouse: 95–100** in all four categories on all 10 pages, on both mobile and desktop.
- **axe accessibility scan: 0 violations** on every page at both widths.
- Every figure on the site compared word for word against the résumé and CONTENT.md.
