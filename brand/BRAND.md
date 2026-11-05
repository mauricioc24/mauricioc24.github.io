# Brand layer — mauricioc24.github.io

**Read this before any visual change.** It pairs with Emil Kowalski's skills (github.com/emilkowalski/skills).

- **Emil's skills decide how things behave:** motion, easing, durations, polish, interaction details.
- **This file decides how things look:** color, motifs, type, and where the art is allowed.
- **When two rules conflict, follow this order:** accessibility → readable content → Emil's motion rules → brand expression.

> **Decided Nov 5, 2026: brand art lives in one place.** The llama, the chicha neon and the paint style belong to **La IAma**, Mauricio's personal brand, where he shares what he learns about AI. On this portfolio they appear only in **the La IAma box on the home page** (the "Personal brand" section). The **404 page keeps its llama moment**. Everywhere else stays calm: no spray, no stripe tags, no colour steps, no llama and no neon. The footer stays black, with ivory text and links. Where older sections below disagree, this rule wins.

Everything sits in the `brand/` folder at the repo root: the tokens in `brand-tokens.css`, the web-sized logos in `assets/`, and a rendered style guide in `styleguide.html`. The palette comes from Mauricio's llama logo (`ME/brand/brand_tokens.json`, official master selected Oct 29 2026).

---

## 1. The idea

The logo mixes **Andean tradition with digital culture**: a llama in a chullo hat (textile reds, zigzags, diamonds) wearing headphones and neon sunglasses, with **Peruvian chicha-poster** spray paint behind it (fuchsia, lime, tangerine, lemon).

The site turns that into two surfaces:

| Surface | Palette | Mood | Used for |
| --- | --- | --- | --- |
| **Day** (default) | ivory + chullo reds | calm, readable, textile | almost everything recruiters read |
| **Night** | black + ivory text | calm, high contrast | the footer (ivory text and links, no neon) |
| **La IAma box** | Day card + chicha neon and paint | the personal brand | one box on the home page, plus the 404 llama |

**The rule that makes it work:** chullo colors only go on Day, and neon only goes inside the La IAma box (as the paint behind one word, or inside a black pill). The contrast numbers below show why neon can't be text on ivory.

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
| Links (footer) | `--chullo-ivory` | `#FBFFF6` | 20.7 : 1 (the underline turns solid on hover) |
| Neon (La IAma box only) | fuchsia, lime, tangerine, lemon | `#FE17DC` `#12FF01` `#FE773E` `#FBE407` | 6.4 / 15.3 / 7.9 / 16.2 |

### Hard rules
- **Neon only inside the La IAma box.** Never as text or thin lines on ivory: there, lemon is 1.3:1, lime 1.4:1, tangerine 2.6:1 and fuchsia 3.3:1. Inside the box it may appear as the paint behind one word (black text on top) or inside a black pill (the stripe tag).
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
| **Stripe tag** `.stripe-tag` | the sunglasses lenses | only inside the La IAma box, if at all | one | without its black pill, or anywhere else |
| **Color steps** `.color-steps` | the LinkedIn post bands | retired on the portfolio (Nov 5, 2026) | none | anywhere on this site |
| **Spray highlight** `.spray` | the chicha paint strokes with drips | **one word** in the La IAma box heading | **one per page** | in the hero, behind paragraph text, more than one word, or touching the llama |
| **Sticker** `.sticker` | the die-cut white border on the logo | the llama, in the La IAma box and on the 404 page | one per view | recolored, stretched, cropped, or with paint added around it |
| **Pixel llama** | the headphone cup | the favicon | — | not made yet; until it exists, use a simple "MC" favicon in Geist Mono |

**Logos (decided Nov 5, 2026).** Schools, certificate issuers and tools may show a logo right before their name: small (14px), in one muted grey (`#83887F`, the chart-context grey), so the page stays calm. Use only official files from the organization's own site or press kit, or Simple Icons where its licence allows. Never redraw, stretch, crop or add effects. If an organization's guidelines forbid recolouring, use its original colours instead. If no clean official logo exists, show the name as text and list it in TODO.md. The files live in `assets/img/logos/`.

**Where the llama itself appears:** the llama is not the site logo, because the site's identity is Mauricio's name. Since Nov 5, 2026 it is allowed in exactly two places:
- the La IAma box on the home page, as a sticker next to two or three plain sentences and the channel links;
- the 404 page.

Show it no more than once per screen and at least 96px wide. Use `brand/assets/llama-320.webp` up to 160px wide and `brand/assets/llama-640.webp` above that. Keep the original proportions and transparency, and never recolor it or add paint.

**Give the art a reason.** The box sits under a "Personal brand" heading, which tells visitors why the colours change there. The box itself only describes the channel.

## 5. Data visualization

- **Day charts:** grey context series (`--chart-context`) plus **one** highlight in inferno (`--chart-highlight`). The highlight carries the insight.
- **Three or more categories:** stay on Day. Use shades of grey and coffee for context, one inferno highlight, and direct labels. Neon charts in a `.night-card` belong to La IAma now, not to this portfolio.
- Every series is labeled directly or has a legend. Never rely on color alone.
- **Charts don't animate for style.** Emil: data the user is reading should not move. Tooltips appear instantly.

## 6. Motion — Emil's rules plus the brand's personality

Tokens: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` and `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`. Keep UI motion under 300ms.

**Delight budget.** Playful motion is allowed only here, because these are rare, first-time moments:
1. **404 page.** A small llama moment: the sticker nods once with a spring (`bounce` 0.2 at most, under 300ms).
2. **"Email copied" toast.** A short confirmation in a black pill, with Sonner's patterns: one toast updated in place, 4 seconds, paused while hidden or hovered. No stripe tag.

The hero spray reveal is retired (Nov 5, 2026). The paint in the La IAma box is static.

**Crisp everywhere else**, because these are the things visitors use repeatedly:
- Buttons scale to 0.97 on `:active` (160ms ease-out).
- Link color and underline change in 150ms with `ease`.
- Hover changes colour only, only inside `@media (hover: hover) and (pointer: fine)`: a card's ring darkens, a link's underline fills in. Nothing moves on hover, and the llama sticker stays still (Emil audit, Nov 5, 2026).
- Pressed controls show a pressed state, because the tap highlight is off: pill links, chips and cards get a solid ring with no movement; real buttons scale to 0.97.
- Navigation, filters and anything triggered from the keyboard have no animation.

**Banned:** fade-in-on-scroll on every section; staggers over 30ms per item; `ease-in`; `transition: all`; `scale(0)`; animated charts; parallax; scroll-jacking.

**`prefers-reduced-motion`:** movement is removed (no button press scale, no llama nod, no toast slide). Color and opacity changes stay.

## 7. Page structure (proposal — confirm with prototypes)

```
[NIGHT or DAY hero]   name · role · one-line value · spray on one word · 2 buttons
[DAY body]            projects (cards; metrics in mono) · zigzag rule · about (+ llama sticker) · skills
[NIGHT chart cards]   inside project pages, for multi-series charts
[NIGHT footer]        contact · color steps · small llama sign-off
```

This mirrors the LinkedIn templates, which use black bands with color steps and calm content in between.

**Decided (Nov 3, 2026): Day hero (Option B).** White/ivory dominates the whole page, Emil-style.

**Decided (Nov 5, 2026): calm portfolio.** Neon, paint and the llama appear only in the La IAma box (and the 404 llama).

**Decided (Nov 5, 2026, third pass): recruiter in 10 seconds.** The home page is: Day hero (no spray) with a tools line, a compact Experience list (Sura Peru (AFP Integra) with a "See results" link, then the two internships), the project showcase, about, skills, "Studying now", "Personal brand" (the La IAma box), then the black footer with ivory links. The result tiles moved to the Sura page (`/experience/sura/`). Anything that doesn't help a recruiter understand Mauricio in 10 seconds gets simplified or removed.

**Hero copy (decided):**
- Name: **Mauricio Calderón Barrientos** (always this exact spelling, with the accent).
- Big line: "Mauricio Calderón Barrientos makes data useful", plain text (the spray on *useful* was retired on Nov 5, 2026).
- Subtitle: the CONTENT.md hero subtitle, the analyst pitch ("I'm a business and data analyst. For 8+ years I've turned business processes into automated, data-driven workflows.").

**Sample data warning:** every number, chart and project in `styleguide.html` (−31% stock-outs, 6.5 h saved, "Stock-out early warning", the charts) is invented demo content. Never copy it to the real site. Real content comes only from CONTENT.md.

## 8. Checklist before merging a visual change

- [ ] Text contrast is at least 4.5:1, and at least 3:1 for large text and for chart marks. Chullo reds only on Day; neon only inside the La IAma box.
- [ ] Spray, stripe tags and the llama appear only in the La IAma box (and the llama on the 404 page). One llama per screen. The art never sits behind body text.
- [ ] Every transition names its exact properties, uses Emil's easing, and stays under 300ms.
- [ ] Logos are small, one grey, official or from Simple Icons, and never redrawn or stretched.
- [ ] Hover effects are gated behind `(hover: hover) and (pointer: fine)`, and reduced motion is respected.
- [ ] The page reads well at 375px wide, and the llama is never squished.
- [ ] The page scores 90+ in a Lighthouse accessibility audit.
