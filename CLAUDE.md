# CLAUDE.md: rules for working on this site

Portfolio for **Mauricio Calderón Barrientos** (always this spelling, with the accent), aimed at recruiters for business analyst, data analyst and business systems analyst roles in Toronto, Hamilton or remote. Live at https://mauricioc24.github.io (GitHub Pages, published from `main`).

## Always

1. **Read `brand/BRAND.md` before any visual change**: color, type, motifs, layout, motion. It decides how things look, and it wins.
2. **Facts come only from `CONTENT.md`.** Never invent numbers, names, dates or results. Résumé figures are used exactly as written there (no re-rounding).
3. **Anything still marked `[FILL …]` stays hidden** on the public site and is listed in `TODO.md`. Never show TODO chips or placeholder text to visitors.
4. **Brand art lives in one place.** The llama, the neon colours and the paint belong to La IAma, Mauricio's personal brand. On this site they appear only in the La IAma box (the home page's "Personal brand" section) and the 404 llama. Everywhere else stays calm (BRAND.md, Nov 5, 2026).
5. **Write plainly.** First person, short sentences, like a person talking. No em or en dashes as punctuation on any page or in `projects.json` (use periods, commas or line breaks; write date ranges as "Apr 2023 to Sep 2025"). Use "→" only inside metrics like 27% → 24%. No "not X, it's Y", no rhetorical lists of three, no poetic lines, no arrow chains, no buzzwords (leverage, seamless, passionate, journey, unlock, empower). Canadian spelling (colour, labelled, modelling).
6. **Recruiter in 10 seconds.** Anything that doesn't help a recruiter understand Mauricio quickly gets simplified or removed. The employer is always written "Sura Peru (AFP Integra)", never just "Sura", so it's clear the work was in Peru.
7. **Motion and polish follow Emil Kowalski's skills** in `.claude/skills` (start with `emil-design-eng`; use `animate`, `review-animations` and `mobile-native` as needed; `ask-sonner` for toast patterns). When rules conflict: accessibility first, then readable content, then Emil's motion rules, then brand expression.
8. **If a `frontend-design` skill is loaded**, use its process, but BRAND.md always wins: no extra colors, fonts or "bold aesthetic risks" beyond it.
9. **Never copy `brand/styleguide.html` sample content.** Its numbers, charts and projects are invented demo content.
10. **Mauricio is new to Git.** Explain what you did in plain words, and add any decision worth remembering to `LEARNINGS.md`.

## How the site works

- Plain HTML, CSS and JS. No build step and no npm in the site itself. `.nojekyll` makes GitHub Pages serve files exactly as they are.
- `brand/brand-tokens.css` is the base stylesheet; don't edit it for page work. Page styles go in `assets/css/site.css` and use its tokens (`var(--accent)`, `var(--ring)` and so on).
- `projects.json` holds the Projects list (`"projects"`) and the La IAma channel links (`"laIama"`). The list has exactly 7 entries, in order: the two Sura projects (Collections first, featured), then five planned ones (`"status": "planned"`, a `"target"` month, no case-study page or link). `assets/js/site.js` renders them. Any value that contains `[FILL` is skipped automatically.
- The project showcase (home "Selected work" and the Projects page) was studied from jwilber.me: each entry has a thumbnail, type, title, one line, roles, tools, an "AI use" line when supported, and text links only when they exist. Thumbnails come only from real content: metrics, the chatbot flow diagram, or a typographic card (`"thumb"` in `projects.json`). Never draw fake dashboards or invent data.
- The Projects page also has filter chips (built from the types in the data, so today just "Work at Sura Peru" and "Planned") and a skills-by-project matrix. A tool shows up in the matrix only if it is listed in a project's `"tools"`.
- Each case study is `projects/<slug>.html`: a small page with its own `<title>` and description (for link previews), whose content comes from the `projects.json` entry with the same `slug`.
- The home page has a compact Experience list under the hero (static HTML, also on the About page). Its "See results" link goes to the Sura page, `experience/sura/index.html`: static HTML with the role progression, the four Collections results, the BigQuery migration, the self-service app and links to both case studies. Its numbers and sentences repeat the Collections `"results"` in `projects.json`; if those ever change, update both.
- The header and footer are copied into all 7 HTML pages. Change all of them together. The footer is black with ivory text and links, with no neon or llama.
- Use root-absolute paths (`/assets/…`, `/projects/…`), because `404.html` can be served at any URL depth.
- The chatbot's thumbnail is a small version of its `"visual"` flow (each step's `"short"` label if it has one). Edit the steps in `projects.json` and both diagrams update.

## Adding a project

1. Add the facts to `CONTENT.md`.
2. Add an entry to `"projects"` in `projects.json` (copy an existing one and give it a new `slug`). Give it `"status": "shipped"`, a `"type"` (Work at Sura, or a new label such as Personal when one is needed), `"roles"`, `"tools"`, a `"thumb"` and, only if supported, an `"ai"` line. Set `"home": true` to show it on the home page.
3. Copy `projects/teams-chatbot.html` to `projects/<slug>.html`, then update the `<title>`, description, canonical and `og:` URLs, `data-case-study="<slug>"` and the `<noscript>` title.
4. Run the checks below. The PR workflow checks that every shipped project has a page (planned ones don't need one).

**When a planned project ships:** change its `"status"` to `"shipped"`, add a `slug`, `type` and the case-study fields, and add its page as above.

## Brand rules that are easy to break (details in BRAND.md)

- Neon (fuchsia, lime, tangerine, lemon), the paint (`.spray`), stripe tags and the llama only inside the La IAma box; the llama also on the 404 page. Chullo reds only on Day.
- One spray per page, on one word, in the La IAma box heading. One llama per screen, never recolored, cropped or squished, and at least 96px wide.
- No solid 1px borders: use `--ring` and `--shadow`.
- Transitions name exact properties, use the brand easing tokens and stay under 300ms. Hover effects go only inside `@media (hover: hover) and (pointer: fine)` and change colour only (nothing moves on hover). Every tappable control has a pressed (`:active`) state. Respect `prefers-reduced-motion`. No scroll fade-ins, staggers over 30ms, parallax or animated charts. Filters and navigation have no animation.
- Charts stay on Day: grey context plus one inferno highlight, with direct labels.

## Before committing a visual change

- Preview: `python3 -m http.server 8000` in the repo root, then open http://localhost:8000. Opening the files directly won't load `projects.json`.
- Check every changed page at 375px and 1280px wide against the checklist at the end of BRAND.md.
- Aim for Lighthouse 90+ in every category and zero axe violations. The pull-request workflow (`.github/workflows/site-checks.yml`) runs Lighthouse and a broken-link check.
- Never commit secrets. Keep commits small, with messages that say why.
