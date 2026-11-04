# CLAUDE.md: rules for working on this site

Portfolio for **Mauricio Calderón Barrientos** (always this spelling, with the accent), aimed at recruiters for data/BI analyst and AI-automation roles in Toronto–Hamilton. Live at https://mauricioc24.github.io (GitHub Pages, published from `main`).

## Always

1. **Read `brand/BRAND.md` before any visual change**: color, type, motifs, layout, motion. It decides how things look, and it wins.
2. **Facts come only from `CONTENT.md`.** Never invent numbers, names, dates or results. Résumé figures are used exactly as written there (no re-rounding).
3. **Anything still marked `[FILL …]` stays hidden** on the public site and is listed in `TODO.md`. Never show TODO chips or placeholder text to visitors.
4. **Motion and polish follow Emil Kowalski's skills** in `.claude/skills` (start with `emil-design-eng`; use `animate`, `review-animations` and `mobile-native` as needed). When rules conflict: accessibility → readable content → Emil's motion rules → brand expression.
5. **If a `frontend-design` skill is loaded**, use its process, but BRAND.md always wins: no extra colors, fonts or "bold aesthetic risks" beyond it.
6. **Never copy `brand/styleguide.html` sample content.** Its numbers, charts and projects are invented demo content.
7. **Mauricio is new to Git.** Explain what you did in plain words, and add any decision worth remembering to `LEARNINGS.md`.

## How the site works

- Plain HTML, CSS and JS. No build step and no npm in the site itself. `.nojekyll` makes GitHub Pages serve files exactly as they are.
- `brand/brand-tokens.css` is the base stylesheet; don't edit it for page work. Page styles go in `assets/css/site.css` and use its tokens (`var(--accent)`, `var(--ring)` and so on).
- `projects.json` holds all project and Quest Log data, and `assets/js/site.js` renders it. Any value that contains `[FILL` is skipped automatically.
- Each case study is `projects/<slug>.html`: a small page with its own `<title>` and description (for link previews), whose content comes from the `projects.json` entry with the same `slug`.
- The header and footer are copied into all 10 HTML pages. Change all of them together. The footer omits the llama sign-off on `about/index.html` and `404.html` (one llama per screen).
- Use root-absolute paths (`/assets/…`, `/projects/…`), because `404.html` can be served at any URL depth.

## Adding a project

1. Add the facts to `CONTENT.md`.
2. Add an entry to `projects.json` (copy an existing one and give it a new `slug`). Set `"home": true` to show it on the home page.
3. Copy `projects/vanna-ai-security.html` to `projects/<slug>.html`, then update the `<title>`, description, canonical and `og:` URLs, `data-case-study="<slug>"` and the `<noscript>` title.
4. Run the checks below. The PR workflow also checks that every project has a page.

## Brand rules that are easy to break (details in BRAND.md)

- Neon (fuchsia, lime, tangerine, lemon) only on Night surfaces or inside black pills. Chullo reds only on Day.
- One spray per page (the home hero word "useful"). One llama per screen, never recolored, cropped or squished, and at least 96px wide.
- No solid 1px borders: use `--ring` and `--shadow`.
- Transitions name exact properties, use the brand easing tokens and stay under 300ms (the hero spray is the only exception). Hover effects go only inside `@media (hover: hover) and (pointer: fine)`. Respect `prefers-reduced-motion`. No scroll fade-ins, staggers over 30ms, parallax or animated charts.
- Day charts: grey context plus one inferno highlight. Three or more series go inside a `.night-card`.

## Before committing a visual change

- Preview: `python3 -m http.server 8000` in the repo root, then open http://localhost:8000. Opening the files directly won't load `projects.json`.
- Check every changed page at 375px and 1280px wide against the checklist at the end of BRAND.md.
- Aim for Lighthouse 90+ in every category and zero axe violations. The pull-request workflow (`.github/workflows/site-checks.yml`) runs Lighthouse and a broken-link check.
- Never commit secrets. Keep commits small, with messages that say why.
