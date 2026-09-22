# DESIGN NOTES — Rapids theme (激流) for Jiliuke

## Pass 1 — plan

```
SUBJECT   Rapids — new Hexo theme for Jiliuke 激流客, zh-CN personal tech log
          (Magento2 / PHP / Linux / MySQL ops notes, 141 posts, est. 2014).
          Job: 美观大气 (gravitas) + 科技感 (instrument-grade tech) without
          terminal-green cliché. Audience: Chinese developers, self-included.

COLOR     --abyss   #0B1824  page ground — dusk river water, blue-cast, not neutral black
          --deep    #11242F  raised panels: code, search overlay, hovered rows
          --foam    #E9F3F5  primary text (~14.8:1 on abyss)
          --haze    #8FA8B8  secondary text / meta (~6.8:1 on abyss)
          --current #3FD0C9  identity: links, focus ring, flow bars, TOC active (~8.9:1)
          --signal  #FF9445  rare / live: active nav dot, prev-next arrows, logo seal (~7.7:1)
          --line    #1D3442  hairline rules
          Rationale: name 激流 = rapids → water at dusk; cyan = the current's
          glint, amber = buoy / live marker (functional, not decorative).

TYPE      display: "Noto Serif CJK SC", "Songti SC", "Source Han Serif SC",
                     SimSun, Georgia, serif
            — masthead, page/post H1, post-list titles, archive year numerals.
            REGULAR weight only (CJK faux-bold is ugly), carried by size.
          body: "PingFang SC", "Noto Sans CJK SC", "Microsoft YaHei",
                  "Avenir Next", "Segoe UI", system-ui, sans-serif — 17px/1.8
          data: "SF Mono", "Cascadia Code", "JetBrains Mono",
                  "Noto Sans Mono CJK SC", Consolas, monospace
            — nav, dates, tags, counts, reading time, code: the 科技感 layer.
          All stacks verified against fc-list (Noto CJK families present in
          this environment; Latin resolves to Noto/DejaVu — layout must hold).

LAYOUT    Container 72rem, gutters clamp(20px,5vw,40px).
          index:    instrument bar → brand masthead (giant serif + current SVG,
                    ~50vh) → stream of post ROWS (no cards): date rail |
                    serif title + auto-excerpt | tag column; hairlines; pager.
          post:     eyebrow meta → serif H1 → current divider → article
                    (44rem measure) + sticky mono TOC rail ≥1100px → tags /
                    copyright / prev-next.
          archive:  oversized serif year in left gutter (sticky), rows right.
          tags:     chips with mono counts. categories: same pattern.
          mobile:   single column, full-screen nav overlay, rows stack.

SIGNATURE the current-line — multi-strand SVG streamline under the masthead
          (seamless CSS drift, prefers-reduced-motion guarded), echoed per post
          row as a flow-meter bar whose width = reading time (real data:
          structure is information).

RISK      Post-list titles set in the SERIF display face, regular weight,
          on dark ground at 1.35–1.75rem. Dev blogs set sans here; serif list
          is the literary-instrument move the name 激流客 + 大气 brief justify.
```

## Pass 2 — self-simulation

Generic sketch of "科技感中文技术博客" that a default pass would produce:
near-black #0D1117 ground, single GitHub-blue or acid-green accent, Inter/YaHei
sans everywhere, card grid of posts with border + hover lift, gradient hero CTA,
terminal font for everything, `01/02/03` section numbers.

Deltas from that sketch (what was revised and why):

1. Ground is blue-cast water (#0B1824), not GitHub neutral — traced to 激流.
2. Dual accents with strict roles (cyan = identity/interactive, amber = live
   only), not a single neon — amber is what keeps it out of "black + acid".
3. Serif display layer (masthead, list titles, year numerals) vs all-sans —
   this is also the committed risk.
4. Rows + hairlines + date rail, zero cards — cards were the default's tell.
5. Flow-meter bars encode reading time instead of `01/02/03` decoration.
6. No gradient buttons, no glassmorphism, no terminal-green.
   Known clusters check: not cream+terracotta; not black+acid (amber+water-blue
   break it); not broadsheet zero-radius (panels use 8–10px radius, airy rhythm).

## Environment constraints applied

- No external font/image CDNs: system + local Noto CJK stacks; imagery = inline
  SVG current strands, CSS hairlines, local `/images/*` only.
- Plain CSS (no Tailwind), CSS variables carry all tokens.
- Code markup after `hexo clean` is plain `<pre><code class="lang">` (site has
  `highlight.enable: false`) — no line-number tables to support.
- Heading IDs may contain raw CJK and start with digits → TOC scrollspy must
  use `getElementById`, never `querySelector('#…')`.
- Search index: `/content.json` array of {title,date,path,text,tags}.
- about page body is empty (info lived in BlueLake config) → content migrated
  into `source/about/index.md` body at switch time.
- youla analytics id migrated to site `theme_config` (alternate config
  `_config.BlueLake.yml` will no longer load).

## Decisions log

- Theme name: **Rapids** (directory `themes/Rapids/`), EJS + plain CSS + vanilla JS.
- Auto-excerpt in helper: posts have no `<!-- more -->`; index must not dump
  full content (old theme did — 94KB index pages).
- Reading time: ceil(cjk/400 + en_words/180) minutes; bar width min(100, min*3.5)%.
- Comments/share/reward/mathjax omitted: all disabled in current site config.
- Do not delete BlueLake or `_config.BlueLake.yml` — revert path = one line.

## Follow-up passes

(append user reactions and rejected directions here)

### Pass 3 — verification fixes (headless Chrome + puppeteer-core, 375/1440)

Automated checks (all green after fixes): no horizontal overflow at 375px on
home/post/archives/tags/about; contrast min 7.23:1 (body haze); search
open/type/empty/Esc; TOC scrollspy; code copy label; skip link; keyboard
focus; prefers-reduced-motion → 0 running animations; tap targets ≥44px on
touch (`@media (hover: none)`).

Defects found & fixed:

1. **Search dead on arrival** — `index: <%- url_for('/content.json') %>`
   emitted unquoted JS (`index: /content.json` → syntax error, config never
   bound). Fix: `JSON.stringify(url_for(...))`.
2. **"共 undefined 篇文章"** — Hexo i18n `__()` runs sprintf and replaced
   `%s` with `undefined`. Fix: `{n}` placeholder in both language files +
   main.js replace.
3. **Archives year overlap** — serif year numeral (up to 4.6rem) overflowed
   its 7.5rem gutter onto the date column. Fix: gutter 10.5rem, year
   clamp(2.2rem, 6vw, 4rem).
4. **Mobile nav overlay confined to header box** — `backdrop-filter` on
   `.site-head` made it the containing block for the fixed `.nav` panel.
   Fix: move blur to `.site-head::before` (z-index -1); panel now
   viewport-fixed, measured 375×812.
5. **Header hidden under open nav panel** — brand/tools painted below nav's
   z-50 overlay. Fix: `position: relative; z-index: 51` on `.brand` and
   `.site-head__tools`; hamburger swaps to X icon via
   `[aria-expanded="true"]`; opening search auto-closes nav.
6. **Search snippets showed raw entities** (`&#39;`, `&amp;`) from
   content.json — decode common entities in `snippet()` before escaping.
7. **Tap targets** — icon buttons 40→44px; `阅读全文`, row tags, pager,
   footer links get ≥44px touch height under `hover: none`.

### Pass 4 — brand logo integration (jiliuke-brand/)

- Header brand lockup (amber dot + serif name) replaced with official
  `logo-on-dark.svg` (light-text variant, dark bg only) at height 40 per
  brand README; removed unused `.brand__seal`/`.brand__name` CSS.
- Favicon suite swapped in: `favicon.svg` (vector, preferred) +
  `favicon.ico` fallback + `png/apple-touch-icon-180.png`; old
  `favicon.png` (BlueLake leftover) deleted.
- Assets live in `themes/Rapids/source/` (logo-on-dark.svg, favicon.svg,
  favicon.ico, png/) so they build with the theme.
- Kept `theme-color #0B1824` (site abyss) instead of brand-pack #4F8BF9 —
  matches the actual dark header.
- Masthead giant serif 激流客 stays as display identity; logo only in the
  instrument bar (README: horizontal logo ≥28px, no stretching — h40 ok).

Tooling notes: chrome-devtools MCP times out in this environment →
verification via `puppeteer-core` + `/opt/google/chrome/chrome` headless
(script at /tmp/opencode/verify.js). Screenshot attachments from parallel
file reads mismatched once → trust pixel sampling + measured DOM state over
attached image display.
