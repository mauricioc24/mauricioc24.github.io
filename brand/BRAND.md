# Brand layer — mauricioc24.github.io

**Read this before any visual change.** It pairs with Emil Kowalski's skills (github.com/emilkowalski/skills).

- **Emil's skills decide how things behave:** motion, easing, durations, polish, interaction details.
- **This file decides how things look:** color, motifs, type, and where the art is allowed.
- **When two rules conflict, follow this order:** accessibility → readable content → Emil's motion rules → brand expression.

Everything sits in the `brand/` folder at the repo root: the tokens in `brand-tokens.css`, the web-sized logos in `assets/`, and a rendered style guide in `styleguide.html`. The palette comes from Mauricio's llama logo (`ME/brand/brand_tokens.json`, official master selected Oct 29 2026).

---

## 1. The idea

The logo mixes **Andean tradition with digital culture**: a llama in a chullo hat (textile reds, zigzags, diamonds) wearing headphones and neon sunglasses, with **Peruvian chicha-poster** spray paint behind it (fuchsia, lime, tangerine, lemon).

The site turns that into two surfaces:

| Surface | Palette | Mood | Used for |
| --- | --- | --- | --- |
| **Day** (default) | ivory + chullo reds | calm, readable, textile | almost everything recruiters read |
| **Night** | black + chicha neon | loud, digital, poster | hero band (if chosen), chart cards, footer |

**The rule that makes it work:** chullo colors only go on Day and neon colors only go on Night. The contrast numbers below show why.

**Recruiter-first budget.** About 90% of the page is calm surface and text, and about 10% is art. The art frames the work and never covers it.

## 2. Palette and roles

Official hex values are fixed. "Derived" shades are web additions chosen for contrast, so don't use them in other brand outputs.

### Day surface (ivory `#FBFFF6`)
| Role | Token | Hex | Contrast on ivory |
| --- | --- | --- | --- |
| Text | `--chullo-coffee` | `#1B0302` | 19.6 : 1 |
| Secondary text | `--day-muted` (derived) | `#5A5F57` | 6.5 : 1 |
| Links, primary button | `--chullo-blood` | `#8D1306` | 9.3 : 1 |
| Link hover | `--chullo-inferno` | `#AA0F0C` | 7.5 : 1 |
| Card background | `--day-raised` (derived) | `#F3F6EC` | — |
| Chart highlight | `--chullo-inferno` | `#AA0F0C` | 7.5 : 1 |
| Chart context | derived grey | `#83887F` | 3.3 : 1 on cards |

### Night surface (black `#010001`)
| Role | Token | Hex | Contrast on black |
| --- | --- | --- | --- |
| Text | `--chullo-ivory` | `#FBFFF6` | 20.7 : 1 |
| Secondary text | `--night-muted` (derived) | `#A6A8A3` | 8.7 : 1 |
| Links, primary button | `--chicha-fuchsia` | `#FE17DC` | 6.4 : 1 |
| Link hover | `--chicha-lemon` | `#FBE407` | 16.2 : 1 |
| Chart series 1–4 | fuchsia, lime, tangerine, lemon | `#FE17DC` `#12FF01` `#FE773E` `#FBE407` | 6.4 / 15.3 / 7.9 / 16.2 |

### Hard rules
- **Never put neon as text or thin lines on ivory.** On ivory, lemon is 1.3:1, lime 1.4:1, tangerine 2.6:1 and fuchsia 3.3:1. On Day, neon may only appear as a large decorative fill with black text on top (the spray), or inside a black container (the stripe tag, a night card).
- **Never put chullo reds on black.** They fail there (blood 2.2:1, inferno 2.8:1).
- **Text on any neon fill is black.** Black on fuchsia is 6.4:1, while ivory on fuchsia is only 3.3:1.
- **Don't use solid 1px borders.** Use the semi-transparent ring or shadow tokens (`--ring`, `--shadow`), as Emil recommends.

## 3. Typography

- **Geist** for UI and body text. **Geist Mono** is the "data voice": metrics, numbers, eyebrow labels, code. It also echoes the monospace direction being explored for the La IAma wordmark.
- Large headings use `letter-spacing: -0.02em`. Body text is capped at `max-width: 65ch`. Any number that changes or sits in a column uses `font-variant-numeric: tabular-nums` (the `.num` class).
- Load the fonts from Google Fonts with `family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap`.
- Optional, later: **Geist Pixel** for the 404 heading only. It nods to the pixel llama on the headphone cup. Check that it's available before using it.

## 4. Art motifs — the only creative elements, each with a budget

| Motif | From the logo | Use it for | Budget | Never |
| --- | --- | --- | --- | --- |
| **Zigzag rule** `.zigzag-rule` | the chullo hat band (it also reads as a line chart) | dividers between major sections | one per section break | as a background texture or behind text |
| **Stripe tag** `.stripe-tag` | the sunglasses lenses | next to section eyebrows, or as a "featured" marker | up to one per section | without its black pill |
| **Color steps** `.color-steps` | the LinkedIn post bands | the Night footer and the hero band edge | one or two per page | stretched across the full width |
| **Spray highlight** `.spray` | the chicha paint strokes with drips | **one word** in the hero headline | **one per page** | behind paragraph text, more than one word, or touching the llama |
| **Sticker** `.sticker` | the die-cut white border on the logo | the llama, or your photo in About | one per view | recolored, stretched, cropped, or with paint added around it |
| **Pixel llama** | the headphone cup | the favicon | — | not made yet; until it exists, use a simple "MC" favicon in Geist Mono |

**Where the llama itself appears:** the llama is not the site logo, because the site's identity is Mauricio's name. It is allowed in:
- the About section, as a sticker with a one-line story;
- the footer sign-off;
- the 404 page.

Show it no more than once per screen and at least 96px wide. Use `brand/assets/llama-320.webp` up to 160px wide and `brand/assets/llama-640.webp` above that. Keep the original proportions and transparency, and never recolor it or add paint.

**Give the art a reason.** Add one line in About so recruiters read the color as intentional. Suggested wording (Mauricio should rewrite it in his own voice): *"The colors come from my llama logo: Andean textiles meet Peruvian chicha posters. I built this site with the same idea I bring to data: tradition and rigor underneath, something people actually want to look at on top."*

## 5. Data visualization

- **Day charts:** grey context series (`--chart-context`) plus **one** highlight in inferno (`--chart-highlight`). The highlight carries the insight.
- **Three or more categories:** render the chart inside a `.night-card`, where all four neon colors pass contrast. This is the main place chicha color enters the data work, so the art serves the data.
- Every series is labeled directly or has a legend. Never rely on color alone.
- **Charts don't animate for style.** Emil: data the user is reading should not move. Tooltips appear instantly.

## 6. Motion — Emil's rules plus the brand's personality

Tokens: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` and `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`. Keep UI motion under 300ms.

**Delight budget.** Playful motion is allowed only here, because these are rare, first-time moments:
1. **Hero spray reveal.** It paints left to right once on first load (650ms, ease-out, 250ms delay) and never replays.
2. **404 page.** A small llama moment, for example the headphones tilting with a spring (`bounce` 0.2 at most).
3. **"Email copied" toast.** A short confirmation. A tiny stripe-tag flourish is fine.

**Crisp everywhere else**, because these are the things visitors use repeatedly:
- Buttons scale to 0.97 on `:active` (160ms ease-out).
- Link color and underline change in 150ms with `ease`.
- Card and sticker hover is a 2px lift at most, only inside `@media (hover: hover) and (pointer: fine)`.
- Navigation, filters and anything triggered from the keyboard have no animation.

**Banned:** fade-in-on-scroll on every section; staggers over 30ms per item; `ease-in`; `transition: all`; `scale(0)`; animated charts; parallax; scroll-jacking.

**`prefers-reduced-motion`:** the spray appears already painted and movement is removed. Color and opacity changes stay.

## 7. Page structure (proposal — confirm with prototypes)

```
[NIGHT or DAY hero]   name · role · one-line value · spray on one word · 2 buttons
[DAY body]            projects (cards; metrics in mono) · zigzag rule · about (+ llama sticker) · skills
[NIGHT chart cards]   inside project pages, for multi-series charts
[NIGHT footer]        contact · color steps · small llama sign-off
```

This mirrors the LinkedIn templates, which use black bands with color steps and calm content in between.

**Decided (Nov 3, 2026): Day hero (Option B).** White/ivory dominates the whole page, Emil-style. Neon appears only in the single spray word, the stripe tags, the Night footer and Night chart cards.

**Hero copy (decided):**
- Name: **Mauricio Calderón Barrientos** (always this exact spelling, with the accent).
- Big line: "Mauricio Calderón Barrientos makes data **useful**" with the spray on *useful*.
- Subtitle: the CONTENT.md headline ("Data & AI Automation Analyst — 8+ years turning business processes into automated, data-driven workflows").

**Sample data warning:** every number, chart and project in `styleguide.html` (−31% stock-outs, 6.5 h saved, "Stock-out early warning", the charts) is invented demo content. Never copy it to the real site. Real content comes only from CONTENT.md.

## 8. Checklist before merging a visual change

- [ ] Text contrast is at least 4.5:1, and at least 3:1 for large text and for chart marks. Neon is only on Night, and chullo reds only on Day.
- [ ] No more than one spray per page and one llama per screen. The art never sits behind body text.
- [ ] Every transition names its exact properties, uses Emil's easing, and stays under 300ms (the hero reveal is the only exception).
- [ ] Hover effects are gated behind `(hover: hover) and (pointer: fine)`, and reduced motion is respected.
- [ ] The page reads well at 375px wide, and the llama is never squished.
- [ ] The page scores 90+ in a Lighthouse accessibility audit.
