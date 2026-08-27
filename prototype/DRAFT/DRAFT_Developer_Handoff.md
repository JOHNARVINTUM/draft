# DRAFT Magazine — Developer Handoff Document
**WordPress Custom Theme Build**
Version 1.0 — August 2026

---

## Table of Contents
1. Page Inventory
2. Layout Specifications
3. Visual Styles
4. Components
5. Animations & Interactions
6. Assets
7. Content Mapping
8. Implementation Notes

---

---

# 1. Page Inventory

## Pages & Templates

| Page | URL Slug | Template Type | Notes |
|---|---|---|---|
| Home | `/` | Unique — full editorial layout | 5 distinct sections |
| Covers | `/covers` | Reusable archive template | Grid of cover cards |
| Magazine | `/magazines` | Unique — stacked carousel + grid | Circular carousel behavior |
| Articles | `/articles` | Unique — featured rotator + filterable grid | Category filter + search |
| Article Detail | `/articles/:slug` | Reusable single-post template | Two-column with sticky sidebar |
| About Us | `/about` | Unique — editorial brand page | No sidebar |

## Template Relationships

```
Root Layout (Navbar + Footer + SocialSidebar)
├── Home                    [unique]
├── Covers                  [archive template — reuse for future archives]
├── Magazine                [unique]
├── Articles                [unique]
│   └── Article Detail      [single post template — WP single.php]
└── About                   [unique]
```

## Breakpoints

| Name | Width | Notes |
|---|---|---|
| Mobile | `< 768px` | Hamburger menu, stacked layouts, single-column grids |
| Tablet | `768px – 1023px` | Partial grid collapses, smaller type scale |
| Desktop | `≥ 1024px` | Full layouts as designed |

Tailwind equivalent: `md:` prefix = 768px+

---

---

# 2. Layout Specifications

## Global Container System

| Token | Value | Used By |
|---|---|---|
| `--container-xl` | `max-width: 1440px; margin: 0 auto` | Navbar, Homepage, New Articles, Magazine carousel |
| `--container-lg` | `max-width: 1320px; margin: 0 auto` | Covers, Magazines, Article Detail |
| `--container-md` | `max-width: 1100px; margin: 0 auto` | New Covers section, About Featured |
| `--container-sm` | `max-width: 900px; margin: 0 auto` | Articles page featured box |
| `--container-xs` | `max-width: 680px; margin: 0 auto` | About text block |

**Side padding:**
- Desktop: `40px` (`px-10`)
- Tablet/Mobile: `24px` (`px-6`)

---

## Fixed / Sticky Elements

| Element | Position | Z-index | Trigger |
|---|---|---|---|
| Navbar | `position: fixed; top: 0; left: 0; right: 0` | 50 | Always visible |
| Social Sidebar | `position: fixed; right: 20px; top: 50%; transform: translateY(-50%)` | 100 | Appears after `window.scrollY > 120` |
| Article Sidebar | `position: sticky; top: 80px` | — | Stays in viewport while scrolling article body |
| Mobile Menu Overlay | `position: fixed; inset: 0` | 49 | Toggle on hamburger click |

**Body offset:** Add a spacer div equal to navbar height (`86px` default, `130px` on Articles pages) to prevent content hiding under fixed header.

---

## Section-by-Section Layout

### Navbar
```
Height (default):    86px
Height (articles):   130px (86px teal bar + 44px category sub-bar)
Background:          #045350
Padding:             18px top / 14px bottom / 40px sides
Layout:              flex column, center-aligned
Logo height:         52px
Nav links gap:       40px
Mobile toggle:       position absolute, right 16px, top 20px
```

**Category sub-bar (Articles only):**
```
Height:              44px
Background:          #ffffff
Border-bottom:       1px solid #E8E8E8
Box-shadow:          0 1px 4px rgba(0,0,0,0.06)
Category links:      position absolute, left 50%, translateX(-50%)
Category links gap:  48px
Search input:        position absolute right, width 200px
```

---

### Hero (Homepage)
```
Height:              88vh, min-height 560px
Background:          #0a0a0a + 9.png cover image
Object-fit:          cover, center center
Overlay 1 (horiz):   linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.6) 100%)
Overlay 2 (vert):    linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)
D watermark:         position absolute, left 3%, top 50% translateY(-50%), height 65%, opacity 0.06
Content max-width:   520px
Content align:       flex-end (bottom of section), padding-bottom 64px
```

---

### Featured Section (Homepage & About)
```
Background (Home):   #ffffff
Background (About):  #E8E8E4
Padding:             72px 0 (Home) / 52px 40px (About)
Grid:                42% / 58% (Home), 38% / 62% (About)
Gap:                 56px (Home), 48px (About)
Image grid height:   500px (Home), 420px (About)
Image grid:          2 columns, 1fr/1fr, rows 58%/38%
Image 1:             spans both rows (grid-row: 1/3)
Image gap:           10px (Home), 12px (About)
```

---

### New Articles Section
```
Background:          #FAFAF8
Padding:             72px 0
Grid:                repeat(3, 1fr), gap 32px
Section heading:     flex, center, logo + "NEW ARTICLES" text side by side, gap 10px, margin-bottom 52px
Card border-radius:  8px
Card shadow default: 0 2px 14px rgba(0,0,0,0.07)
Card shadow hover:   0 20px 48px rgba(0,0,0,0.14)
Card lift hover:     translateY(-4px)
Card image ratio:    4/3
Card padding:        22px horizontal, 28px bottom
```

---

### New Covers Section
```
Background:          #f8f6f1
Padding:             80px 0
Max-width:           1100px
Grid:                1.15fr / 1fr, gap 48px
Hero cover height:   540px
Hero border-radius:  6px
Thumb grid:          repeat(3, 1fr), gap 8px
Thumb height:        116px
```

---

### Magazine Carousel (Homepage)
```
Background:          #ffffff
Padding:             80px 0 88px
Card widths:         Active: clamp(220px, 26vw, 340px) | Side: clamp(160px, 18vw, 230px)
Card scale:          Active: 1.0 | Side: 0.82
Card opacity:        Active: 1.0 | Side: 0.55
Active card border:  6px solid #045350 (acts as padding)
Card aspect ratio:   2/3
Cards gap:           20px, padding 0 70px
Arrow buttons:       44px × 44px, border-radius 50%, 1.5px border
Dots spacing:        8px gap, margin-top 32px
Dot dimensions:      Active: 24×8px | Inactive: 8×8px
Dot border-radius:   4px
```

---

### Covers Page Grid
```
Background:          #FAFAF8
Page hero padding:   64px 0 40px
Grid padding:        48px 0 100px
Grid layout:         repeat(auto-fill, minmax(280px, 1fr))
Column gap:          32px
Row gap:             48px
Card image ratio:    3/4
Card image margin-b: 16px
```

---

### Magazines Page
```
Background:          #FAFAF8
Hero padding:        56px 0 36px
Carousel card:       230px × 322px (2:2.8 ratio)
Stack step (gap):    168px between cards
Side scale:          0.84
Far scale:           0.70
Issue grid layout:   repeat(auto-fill, minmax(280px, 1fr))
Issue grid col-gap:  32px
Issue grid row-gap:  56px
Issue grid padding:  48px 0 100px
```

---

### Articles Page
```
Background:          #ffffff
Header max-width:    900px, margin-top 32px, margin-bottom 24px
Featured box:        max-width 900px
Featured image:      290px × 380px, padding 24px left/bottom, 0 right/top
Featured text:       flex 1, padding 36px 40px
Article grid:        repeat(3, 375px), gap 25px, justify-content center
Article grid max-w:  1185px
Card width:          375px (fixed)
Card image padding:  16px (image sits inside card with gap)
Card image ratio:    3/4
Empty state:         centered, 80px padding, #AAAAAA text
```

---

### Article Detail Page
```
Background:          #FAFAF8
Hero height:         60vh, min 380px
Hero overlay:        linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.72) 100%)
Max-width:           1320px
Body grid:           1fr / 300px sidebar, gap 64px
Body max-width:      700px, padding-bottom 64px
Sidebar top:         sticky at 80px from top
Sidebar panel pad:   20px
Sidebar panel bg:    #ffffff, border 1px solid #E4E4DE
Meta bar padding:    28px 0, border-bottom 1px solid #E4E4DE
Drop cap font:       Playfair Display 72px / 0.82 line-height / float left / pad-right 10px
Blockquote:          border-left 2px solid #51356f, padding-left 28px
Author card padding: 28px, border 1px solid #E4E4DE
Avatar size:         52×52px, border-radius 50%
```

---

### About Page
```
Background:           #ffffff (main), #F0F0EC (text block), #E8E8E4 (featured)
Hero height:          520px
Hero object-position: center 20%
About section:        max-width 680px, padding 56px 0 64px
Brand strip padding:  88px 40px
Brand logo height:    120px
Divider size:         1px × 130px, color #CCCCCC
Cover strip:          flex, width 100%, gap 3px, aspect-ratio 3/4 per item
Tagline padding:      80px 40px
```

---

### Footer
```
Background:           #045350
Hairline padding:     60px (contains the decorative line)
Body grid:            42% / 58%, aligned start
Body padding:         64px top / 56px sides / 72px bottom
Right grid columns:   1fr / 1fr / 1.1fr
D icon height:        200px
Social icon size:     36×36px, border-radius 8px
Social icon gap:      11px vertical
```

---

---

# 3. Visual Styles

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#045350` | Navbar bg, Footer bg, H1 default, CTA buttons, active states, badges, borders, accent |
| `--color-primary-foreground` | `#ffffff` | Text on teal bg |
| `--color-secondary` | `#51356f` | Article blockquote left border |
| `--color-secondary-foreground` | `#ffffff` | Text on purple |
| `--color-accent` | `#b9d7d9` | Hero label/badge color, category separator tint |
| `--color-background` | `#FAFAF8` | Default page bg, card placeholder bg, search input bg |
| `--color-foreground` | `#111111` | Primary body text, headings (non-teal) |
| `--color-card` | `#ffffff` | Card backgrounds, article cards |
| `--color-muted` | `#F8F8F8` | Subtle UI backgrounds |
| `--color-muted-foreground` | `#888888` | Meta text, subtitles, secondary labels |
| `--color-border` | `#D9D9D9` | Dividers, carousel dots (inactive) |
| `--color-destructive` | `#d4183d` | Error states |
| `--radius` | `0rem` | All border-radius = 0 (square corners globally) |

**Supplementary colors (not in tokens, used inline):**

| Hex | Usage |
|---|---|
| `#F0F0EC` | About page "About Draft" section bg |
| `#E8E8E4` | About page "Featured" section bg |
| `#f8f6f1` | Homepage "New Covers" section bg |
| `#E4E4DF` / `#E4E4DE` | Image placeholder bg, sidebar panel borders |
| `#D8D8D4` | Card image placeholder bg |
| `#7AADA8` | Muted teal — "ABOUT" word in About heading |
| `#555555` | Secondary body text |
| `#444444` | Tertiary text in article cards |
| `#AAAAAA` | Placeholder meta (date, category labels) |
| `#CCCCCC` | Inactive arrow buttons, dividers |
| `#E8E8E8` | Category sub-bar border |
| `rgba(255,255,255,0.15)` | Footer social icon bg |
| `rgba(255,255,255,0.30)` | Footer hairline |
| `rgba(255,255,255,0.55)` | Footer hairline endpoint dots |
| `rgba(255,255,255,0.42)` | Footer social handle text |
| `rgba(255,255,255,0.72)` | Footer nav/cat link default opacity |
| `rgba(255,255,255,0.58)` | Navbar inactive link opacity |
| `rgba(240,242,242,0.85)` | Social sidebar container bg |
| `rgba(4,83,80,0.09)` | Article card category pill bg |
| `rgba(4,83,80,0.25)` | Active magazine card shadow tint |
| `rgba(4,83,80,0.35)` | Article card image gradient base |

---

## Typography

### Font Stack

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,700&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,400;1,500;1,700&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Cactus+Classical+Serif&family=DM+Serif+Display:ital,wght@0,400;1,400&display=swap');
```

> ⚠️ **Gap:** DM Serif Display is used in the About page tagline and Articles breadcrumbs but was missing from the original fonts.css. Include it in the final build.

---

### Typography Scale

#### Headings

| Style | Font | Weight | Size | Line Height | Letter Spacing | Transform | Color | Used On |
|---|---|---|---|---|---|---|---|---|
| Display XL | Plus Jakarta Sans | 800 | clamp(36px, 5vw, 60px) | 1.06 | -0.03em | none | #ffffff | Homepage Hero H1 |
| Display L | Plus Jakarta Sans | 800 | clamp(40px, 5.5vw, 68px) | 1.0 | -0.03em | none | #045350 | "FEATURED" heading |
| Display M | Plus Jakarta Sans | 800 | clamp(28px, 4vw, 48px) | 1.0 | 0.04em | UPPERCASE | #045350 | Magazines page H1 |
| Display S | Plus Jakarta Sans | 800 | clamp(28px, 4vw, 40px) | 1.0 | -0.02em | none | — | About heading |
| H1 base | Plus Jakarta Sans | 700 | `--text-4xl` (2.25rem) | 1.15 | -0.02em | none | #045350 | Default H1 |
| H2 base | Plus Jakarta Sans | 700 | `--text-3xl` (1.875rem) | 1.2 | -0.015em | none | #111111 | Subheadings |
| H3 base | Plus Jakarta Sans | 600 | `--text-xl` (1.25rem) | 1.3 | -0.01em | none | varies | Card titles |
| H4 base | Plus Jakarta Sans | 600 | `--text-lg` (1.125rem) | 1.4 | none | none | varies | Small headings |
| Article H1 | Plus Jakarta Sans | 800 | clamp(28px, 4.5vw, 52px) | 1.08 | -0.025em | none | #ffffff | Article hero |
| Covers H1 | Plus Jakarta Sans | 800 | clamp(36px, 5vw, 56px) | 1.05 | -0.03em | none | #111111 | Covers page |
| Articles H1 | Plus Jakarta Sans | 800 | 36px | 1.0 | -0.025em | none | #045350 | Articles page header |

#### Body Text

| Style | Font | Weight | Size | Line Height | Letter Spacing | Used On |
|---|---|---|---|---|---|---|
| Body default | Inter | 400 | 16px (base) | 1.5 | — | General |
| Body large | Inter | 300 | 17px | 1.85 | 0.005em | Article body paragraphs |
| Body medium | Inter | 300-400 | 14px | 1.7-1.8 | — | Featured section, About |
| Body small | Inter | 400 | 13px | 1.6-1.72 | — | Card excerpts, sidebar |
| Caption | Inter | 400 | 10-12px | 1.5 | — | Meta (date, read time) |
| Micro | Inter | 400 | 11px | 1.3 | — | Social handles, footnotes |

#### UI / Labels / Buttons

| Style | Font | Weight | Size | Letter Spacing | Transform | Used On |
|---|---|---|---|---|---|---|
| Nav links | Plus Jakarta Sans | 500 (default) / 800 (active) | 11px | 0.12em | UPPERCASE | Navbar |
| Category sub-bar | Inter | 400 (default) / 600 (active) | 13px | — | none | Article sub-nav |
| Section label | Plus Jakarta Sans | 700-800 | 8-11px | 0.14-0.22em | UPPERCASE | "NEW ARTICLES", "FEATURED" labels |
| Footer col header | Plus Jakarta Sans | 800 | 11px | 0.14em | UPPERCASE | "Navigate", "Categories", "Follow Us" |
| Button default | Plus Jakarta Sans | 600 | 14px (`--text-sm`) | 0.05em | — | Base button |
| CTA primary | Plus Jakarta Sans | 700 | 10px | 0.16-0.18em | UPPERCASE | "Explore Articles", "View All Magazines" |
| CTA secondary | Plus Jakarta Sans | 700 | 9-10px | 0.14em | UPPERCASE | "Read Full Article", "Browse Covers" |
| Author label | Plus Jakarta Sans | 700 | 9px | 0.12em | UPPERCASE | Article cards |
| Category badge | Plus Jakarta Sans | 700 | 8px | 0.1em | UPPERCASE | Card category pills |
| Sidebar label | Plus Jakarta Sans | 700 | 9px | 0.2em | UPPERCASE | "In this article", "Share this story" |

#### Editorial / Serif Styles

| Style | Font | Weight | Size | Style | Used On |
|---|---|---|---|---|---|
| Drop cap | Playfair Display | 700 | 72px | normal | Article detail first paragraph |
| Blockquote | Playfair Display | 400 | 22px | italic | Article detail paragraph 3 |
| Hero excerpt | Playfair Display | 400 | 15-16px | italic | Homepage hero, article hero |
| Footer tagline | Cactus Classical Serif (fallback: PT Serif) | 700 | 22px | italic | Footer left col |
| Footer description | PT Serif | 400 | 13px | italic | "The modern voice of…" |
| Footer nav links | PT Serif | 400 | 15px | normal | Navigate / Categories cols |
| Magazine name overlay | PT Serif | 400 | 14-20px | italic | Magazine carousel cover name |
| Issue label | Plus Jakarta Sans | 600 | 9px | normal | Issue number on carousel |
| About tagline | DM Serif Display | 400 | clamp(32px, 4.5vw, 52px) | italic | "Where the Boys Play" |
| Articles breadcrumbs | DM Serif Display | 700 | 15px | italic | Home | Magazine | Cover links |

---

## States — Interactive Elements

### Buttons

**Primary CTA (filled teal)**
```
Default:   bg #045350, color #ffffff, border none
Hover:     opacity or no change (most CTAs are links styled as buttons)
```

**Outline CTA**
```
Default:   bg transparent, border 1.5px solid #045350, color #045350
Hover:     bg #045350, color #ffffff
Transition: all 0.2s ease
```

**Arrow button (carousel)**
```
Default:   bg transparent, border 1.5px solid #111111, color #111111
Hover:     bg #111111, color #ffffff
Disabled:  border color #DDDDDD, color #CCCCCC, cursor default
Size:      44×44px, border-radius 50%
```

**Arrow button (stacked carousel — magazines)**
```
Default:   bg #FAFAF8, border 1px solid #111111
Hover:     bg #045350, border-color #045350, icon stroke #ffffff
```

**Share / Save buttons (article)**
```
Default:   bg none, border 1px solid #E4E4DE, color #888888
Hover:     bg #FAFAF8
```

### Links

**Nav links**
```
Default:   color rgba(255,255,255,0.58), border-bottom 1.5px solid transparent
Active:    color #ffffff, font-weight 800, border-bottom 1.5px solid rgba(255,255,255,0.6)
Hover:     color #ffffff
Transition: color 0.2s
```

**Category sub-bar links**
```
Default:   color #555555, font-weight 400, border-bottom 1.5px solid transparent
Active:    color #045350, font-weight 600, border-bottom 1.5px solid #045350
Hover:     color #045350
```

**Footer nav/cat links**
```
Default:   color rgba(255,255,255,0.72)
Hover:     color #ffffff
Transition: color 0.15s
```

**"Read Full Article" link**
```
Default:   color #045350, border-bottom 1px solid rgba(4,83,80,0.35)
(or italic gray variant: color #888888, no border, font-style italic)
```

**Category / section cross-links (Home Featured, About)**
```
Default:   color #045350, font-weight 600, no underline
Hover:     opacity 0.6
Transition: opacity 0.15s
```

### Social Sidebar Icons
```
Default:   bg rgba(255,255,255,0.9), color #045350, box-shadow 0 1px 4px rgba(0,0,0,0.08)
Hover:     bg #045350, color #ffffff, box-shadow 0 4px 14px rgba(4,83,80,0.35)
Transition: background-color 0.2s ease, color 0.2s ease
Size:      40×40px, border-radius 12px
```

### Thumbnail Covers (New Covers section)
```
Default:   border 2px solid transparent, scale(1), opacity 1
Hover:     border 2px solid #045350, scale(1.04), opacity 0.85
Transition: border-color 0.2s, transform 0.2s, opacity 0.2s
```

### Cover Cards (Covers page)
```
Default:   shadow 0 2px 12px rgba(0,0,0,0.06), scale(1)
Hover:     shadow 0 20px 60px rgba(0,0,0,0.16), scale(1.04)
           + dark overlay rgba(0,0,0,0.38) fades in
           + "View Issue" button slides up from translateY(6px) → 0
Transition: box-shadow 0.45s ease; transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)
```

### Article Cards (New Articles section)
```
Default:   shadow 0 2px 14px rgba(0,0,0,0.07), translateY(0)
Hover:     shadow 0 20px 48px rgba(0,0,0,0.14), translateY(-4px)
           + image scale(1.05)
           + H3 opacity 0.75
Transition: box-shadow 0.3s ease, transform 0.3s ease
Image:     transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)
```

### Article Cards (Articles grid)
```
Default:   shadow 0 4px 16px rgba(0,0,0,0.10), translateY(0), H3 color #111111
Hover:     shadow 0 16px 48px rgba(0,0,0,0.16), translateY(-6px), H3 color #045350
Transition: box-shadow 0.3s ease, transform 0.3s ease, color 0.2s
Image:     scale(1.05) on hover, 0.6s cubic-bezier(0.25,0.46,0.45,0.94)
```

### Search Input
```
Default:   border 1px solid #E0E0E0, bg #FAFAFA
Focus:     border-color #045350
Transition: border-color 0.2s
```

---

---

# 4. Components

## C1 — Navbar

**Variants:**
- `default` — Teal bar + nav links (all pages except Articles)
- `with-category-bar` — Teal bar + white 44px category/search sub-bar (Articles pages only)
- `mobile-open` — Full-screen teal overlay with large nav links

**Structure:**
```
<header> fixed
  <div class="navbar-teal-bar">
    <a class="navbar-logo"><img /></a>
    <nav class="navbar-links"> [desktop]
      <a>Home</a> <a>Covers</a> ... </nav>
    <button class="hamburger"> [mobile only]
  </div>
  [conditional] <div class="navbar-category-bar">
    <nav class="category-links">Fashion | Beauty | ...</nav>
    <form class="search-form"><input /><button /></form>
  </div>
```

**States:** default | active-link | mobile-open | mobile-closed

**WordPress:** Register as `wp_nav_menu` with two locations: `primary-nav` and `category-nav`.

---

## C2 — Mobile Menu Drawer

**Not a drawer/slide-in — it's a full-screen overlay:**
```
position: fixed; inset: 0; z-index: 49
background: #045350
padding-top: 86px (navbar height)
padding: 32px
```

Nav items: Plus Jakarta Sans, 28px, 700, `padding: 16px 0`, `border-bottom: 1px solid rgba(255,255,255,0.1)`

**States:** `open` (opacity 1, pointerEvents auto) | `closed` (opacity 0, pointerEvents none)

---

## C3 — Footer

**Always present. Three columns on right:**
- Column 1: Navigate (page links)
- Column 2: Categories (article category links)
- Column 3: Follow Us (social platform cards)

**Decorative hairline:** A full-width 1px line with 7px circle endpoints at each end, rendered above the footer body.

```css
.footer-hairline::before, .footer-hairline::after {
  content: '';
  width: 7px; height: 7px;
  border-radius: 50%;
  background: rgba(255,255,255,0.55);
}
```

**WordPress:** Use `get_template_part('footer')`. Menus registered as `footer-nav` and `footer-categories`.

---

## C4 — Social Sidebar

**Fixed, vertically centered, right edge:**
- Container: `rgba(240,242,242,0.85)`, `backdrop-filter: blur(12px)`, `border-radius: 40px`, `padding: 12px 10px`, `gap: 8px`
- 3 social links (Facebook, Instagram, TikTok)
- Appears/disappears via `opacity` based on scroll > 120px

**States:** `hidden` (opacity 0, pointerEvents none) | `visible` (opacity 1, pointerEvents auto)

---

## C5 — Hero (Homepage)

**Unique. Not reused on other pages.**

Elements:
1. Full-bleed background image (9.png)
2. Two gradient overlays (horizontal + vertical)
3. Logo watermark (opacity 0.06, not readable)
4. Content block:
   - Badge: bordered text "Where the Boys Play" in #b9d7d9
   - H1: large white headline
   - Excerpt: Playfair italic
   - Primary CTA button

**WordPress ACF Fields:**
- `hero_background_image` (Image)
- `hero_badge_text` (Text)
- `hero_headline` (Text)
- `hero_excerpt` (Textarea)
- `hero_cta_label` (Text)
- `hero_cta_url` (URL)

---

## C6 — Featured Editorial Grid

**Used on:** Homepage, About page (same structure, slightly different padding/backgrounds)

Layout: text left (42-38%) + 3-image asymmetric grid right (58-62%)

Image grid rules:
- 2 columns, 1fr/1fr
- Image 1: spans rows 1-3 (grid-row: 1/3)
- Image 2: top-right, taller
- Image 3: bottom-right, shorter
- Each image has a gradient overlay: `linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)`
- Each image has the draft logo watermark bottom-left (14-16px height, inverted white)

**WordPress ACF:**
- `featured_image_1/2/3` (Image)
- `featured_section_links` (Repeater: label + url)
- `featured_description` (Textarea)

---

## C7 — Article Card (New Articles)

**Full card structure:**
```
<div class="article-card">
  <div class="article-card-image">
    <img />
    <div class="gradient-overlay" />
    <div class="draft-stamps" /> <!-- 3 stacked logos, opacity 1/0.65/0.35 -->
    <div class="d-watermark">D</div> <!-- Playfair 56px, rgba(255,255,255,0.15) -->
  </div>
  <div class="article-card-body">
    <h3>Title</h3>
    <div class="card-meta">
      <span>Authored by DraftMagazine.ph</span>
      <span class="category-pill">Fashion</span>
    </div>
    <p class="date">Published on June 10, 2026</p>
    <p class="excerpt">...</p>
    <p class="brand-quote">DRAFT is for the man who reads between the lines…</p>
    <a class="read-link">Read Full Article →</a>
  </div>
</div>
```

**WordPress:** Standard WP post loop. `draft-stamps` and `d-watermark` are decorative CSS elements.

---

## C8 — Article Card (Articles Grid)

**Slightly different structure from C7:**
- Fixed width: 375px
- Image has 16px top/sides padding gap (image floats inside white card)
- Image aspect-ratio 3/4 (portrait, taller than C7)
- Image gradient: `linear-gradient(to top, rgba(4,83,80,0.35) 0%, transparent 55%)`
- No draft stamps, no "D" watermark
- H3 hover: color changes to #045350
- "Read Full Article" link is right-aligned

---

## C9 — Cover Card (Covers Page)

```
<div class="cover-card">
  <div class="cover-image-wrap">
    <img />
    <div class="hover-overlay">
      <span class="view-issue-btn">View Issue</span>
    </div>
  </div>
  <div class="cover-meta">
    <h3>The Symmetry Issue</h3>
    <span class="type-badge">Print</span>
  </div>
  <p class="cover-sub">Volume 12 — March 2024</p>
</div>
```

Type badge colors:
- Print: `#045350` border + color
- Digital: `#51356f` border + color
- Limited: `#111111` border + color

---

## C10 — Magazine Carousel (Homepage 3-up)

**3 cards always visible. Non-wrapping (prev/next disabled at ends).**

Active card: large, teal 6px "border" (actually teal padding wrapper), full opacity.
Side cards: 82% scale, 55% opacity, 30% grayscale, clickable to navigate.

Dot indicators: pill shape (24×8 when active, 8×8 when inactive).

---

## C11 — Stacked Cover Carousel (Magazines Page)

**Infinite wrapping. Stack physics:**
- Active (offset 0): scale 1.0, opacity 1, brightness 1, z-index 30, shadow 0 30px 70px...
- Side (|offset| = 1): scale 0.84, brightness 0.72, z-index 20, shadow 0 12px 30px...
- Far (|offset| = 2): scale 0.70, brightness 0.72, z-index 10
- Cards with |offset| > 2 are hidden (null)

Translation formula: `translateX(offset × 168px) scale(scale)`

---

## C12 — Featured Spotlight Rotator (Articles Page)

**Arrow-navigated. One featured article shown at a time.**

Fade transition:
```
Out: opacity 0, translateX(-10px) over 260ms
In:  set new article, opacity 1, translateX(0) over 260ms
```

Dot indicators below: same pill style as magazine carousel (20×7 active, 7×7 inactive).

Below dots: breadcrumb links "Home | Magazine | Cover" in DM Serif Display italic.

---

## C13 — Article Detail — Author Card

```
<div class="author-card">
  <div class="author-avatar">{First Initial}</div> <!-- 52px circle, teal bg, white initial -->
  <div>
    <h4>Author Name</h4>
    <p class="author-title">Fashion Director</p>
    <p class="author-bio">Contributing writer at DRAFT Magazine…</p>
  </div>
</div>
```

**WordPress:** Pull from post author meta. `author-title` from custom user meta field `author_title`.

---

## C14 — Sidebar (Article Detail)

Three sticky panels, each `padding: 20px, bg #ffffff, border: 1px solid #E4E4DE`:

1. **Table of Contents** — "In this article" + section list (static dash + "Section N")
2. **Share This Story** — 4 platform buttons (Instagram, Facebook, TikTok, Copy link)
3. **More to Read** — Up to 5 other articles, thumbnail 56×44px + category label + title

---

## C15 — Related Articles (Article Detail)

Below the article body. 3-column grid. Triggered only if same-category articles exist.

Each card:
- Image 4/3 ratio, hover scale 1.05
- Category badge: `border: 1px solid #045350`, text-transform uppercase, teal color
- H3: hover opacity 0.6
- Author · read time in #AAAAAA

---

## C16 — New Covers Section

Left: single tall hero cover (540px, aspect cover, 6px radius)
Right: logo + "NEW COVERS" text + description + "BROWSE COVERS →" link + 3×2 thumbnail grid

Logo in this section: 80px height (large).

---

## C17 — Brand Identity Strip (About)

```
<div class="brand-strip">
  <img class="draft-wordmark" /> <!-- 120px height -->
  <div class="brand-divider" /> <!-- 1px × 130px, #CCCCCC -->
  <div>
    <p class="brand-name">draft ph</p>
    <p class="brand-subtitle">Youth Culture Journal</p>
  </div>
</div>
```

---

## C18 — Magazine Cover Strip (About)

5 equal-width flex items side by side, 3px gap, aspect-ratio 3/4:
- Items 1-3, 5: photo with gradient overlay + draft logo watermark bottom-left
- Item 4: teal card (#045350) with quote, quote marks (26px), decorative bars, draft logo

---

---

# 5. Animations & Interactions

## A1 — Social Sidebar Fade-In

| Property | Value |
|---|---|
| Trigger | `window.addEventListener('scroll')` when `scrollY > 120` |
| Property | `opacity` |
| From | `0` (also `pointer-events: none`) |
| To | `1` (also `pointer-events: auto`) |
| Duration | `0.35s` |
| Easing | `ease` |
| Direction | In on scroll down past 120px; out immediately on scroll back |

```css
.social-sidebar {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
}
.social-sidebar.visible {
  opacity: 1;
  pointer-events: auto;
}
```

---

## A2 — Mobile Menu Open/Close

| Property | Value |
|---|---|
| Trigger | Click hamburger icon |
| Type | Overlay appears/disappears (no slide animation in current build — approximation acceptable) |
| Icon | Menu icon ↔ X icon swap |
| Recommended upgrade | `transform: translateX(-100%) → translateX(0)` for slide-in feel |

---

## A3 — Article Card Hover (New Articles)

| Property | Duration | Easing |
|---|---|---|
| `box-shadow` deepens | `0.3s` | `ease` |
| `transform: translateY(-4px)` | `0.3s` | `ease` |
| Image `scale(1.05)` | `0.65s` | `cubic-bezier(0.25,0.46,0.45,0.94)` |
| H3 `opacity: 0.75` | `0.2s` | — |

---

## A4 — Article Card Hover (Articles Grid)

| Property | Duration | Easing |
|---|---|---|
| `box-shadow` deepens | `0.3s` | `ease` |
| `transform: translateY(-6px)` | `0.3s` | `ease` |
| H3 `color: #045350` | `0.2s` | — |
| Image `scale(1.05)` | `0.6s` | `cubic-bezier(0.25,0.46,0.45,0.94)` |
| Entry stagger | `opacity 0 → 1`, delay `idx × 70ms` | `ease` |

---

## A5 — Cover Card Hover (Covers Page)

| Property | Duration | Easing |
|---|---|---|
| Image `scale(1.04)` | `0.6s` | `cubic-bezier(0.25,0.46,0.45,0.94)` |
| Shadow deepens | `0.45s` | `ease` |
| Overlay `opacity: 0 → 1` | `0.35s` | `ease` |
| "View Issue" `translateY(6px → 0)` | `0.35s` | `ease` |
| H3 `color: #045350` | `0.25s` | — |

---

## A6 — Magazine Carousel (Homepage) — Slide

| Property | Duration | Easing |
|---|---|---|
| All card properties (scale, opacity, width) | `0.45s` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Dot `width` change (8px ↔ 24px) | `0.3s` | `ease` |
| Arrow button bg/color on hover | `0.2s` | — |

---

## A7 — Stacked Cover Carousel (Magazines) — Slide

| Property | Duration | Easing |
|---|---|---|
| `transform` (translateX + scale) | `0.6s` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `opacity` | `0.6s` | `ease` |
| `filter: brightness()` | `0.6s` | `ease` |
| Dot `width` change (7px ↔ 26px) | `0.4s` | `cubic-bezier(0.22, 1, 0.36, 1)` |

---

## A8 — Featured Spotlight Rotator (Articles Page) — Fade

| Property | Duration | Easing | Notes |
|---|---|---|---|
| Card `opacity: 1 → 0` | `260ms` | `ease` | Phase 1: fade out |
| Card `transform: translateX(0 → -10px)` | `260ms` | `ease` | Phase 1: slide left |
| Article swap | after 260ms timeout | — | Phase 2: update content |
| Card `opacity: 0 → 1` | `260ms` | `ease` | Phase 3: fade in |
| Card `transform: translateX(0)` | `260ms` | `ease` | Phase 3: settle |

---

## A9 — Thumbnail Cover Hover (New Covers)

| Property | Duration | Easing |
|---|---|---|
| `border-color` transparent → #045350 | `0.2s` | `ease` |
| `transform: scale(1.04)` | `0.2s` | `ease` |
| `opacity: 1 → 0.85` | `0.2s` | `ease` |

---

## A10 — Issue Card Hover (Magazines Grid)

| Property | Duration | Easing |
|---|---|---|
| Image `scale(1.05)` | `0.65s` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Shadow deepens | `0.45s` | `ease` |
| H3 `opacity: 1 → 0.75` | `0.25s` | — |

---

## A11 — Social Sidebar Icon Hover

| Property | Duration | Easing |
|---|---|---|
| `background-color` | `0.2s` | `ease` |
| `color` | `0.2s` | `ease` |
| `box-shadow` | implied by bg transition | — |

---

## A12 — Related Article Hover (Article Detail)

| Property | Duration | Easing |
|---|---|---|
| Image `scale(1.05)` | `0.7s` | `ease-out` |
| H3 `opacity: 1 → 0.6` | via CSS class transition | — |

---

## A13 — Article Grid Stagger (Filter change)

When category filter changes:
1. Grid sets `visible = false` → all cards `opacity: 0` (transition `0.4s`)
2. After `80ms` delay, sets `visible = true` → cards fade in with per-card stagger
3. Stagger formula: `transition-delay: idx × 70ms`

---

## A14 — Scrollbar Hidden (Global)

```css
* {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
*::-webkit-scrollbar {
  display: none;
}
```

---

---

# 6. Assets

## Logos & Brand Marks

| Asset | File | Usage | Format | Filter Applied In Code |
|---|---|---|---|---|
| Wordmark (color) | `draft_logo_gram__transparent__-_green.png` | Default logo, section headings, card stamps | PNG with transparency | None (original teal color) |
| Wordmark (white) | same file | Navbar, footer covers, dark overlays | PNG | `filter: brightness(0) saturate(0) invert(1)` |
| Wordmark (inverted-gold tint) | same file | Active magazine cover | PNG | `filter: brightness(0) saturate(100%) invert(90%) sepia(80%) saturate(500%) hue-rotate(10deg) brightness(110%)` |
| D Icon | `draft_icon.png` / `draft_icon-1.png` | Variants | PNG | — |
| D Icon (footer) | `draft_icon-2.png` | Footer left column, 200px | PNG | `filter: brightness(0) invert(1)` (white) |

> **Recommendation:** Convert the wordmark and D icon to SVG for infinite scalability and cleaner filter application in WordPress.

---

## Photography

| Asset | File/URL | Dimensions | Used On |
|---|---|---|---|
| Hero image | `9.png` (local) | Full bleed | Homepage hero, About hero, Featured grid (left col) |
| MacBook mockup | `MacBook_Pro_14__-_1__3_.png` | — | Available for About hero alternate |
| Editorial group 1 | `Group_30.png` | — | Available for editorial grids |
| Editorial group 2 | `Group_31.png` | — | Available for editorial grids |
| Editorial group 3 | `Group_36.png` | — | Available for editorial grids |
| Generic card | `image.png` through `image-8.png` | — | Placeholder thumbnails |

**All article and magazine covers use Unsplash CDN URLs** (replace with WordPress Media Library URLs in production):

| Usage | Unsplash URL pattern |
|---|---|
| Article portraits | `?w=1200&h=800&fit=crop` (4:3 landscape) |
| Article cards | `?w=600&h=800&fit=crop` (3:4 portrait) |
| Magazine covers | `?w=600&h=900&fit=crop` (2:3 tall portrait) |
| Cover archive | `?w=600&h=820&fit=crop` (3:4-ish) |
| Category images | `?w=800&h=600&fit=crop` |
| Homepage thumbs | `?w=200&h=160&fit=crop` |
| Featured grid | `?w=500&h=420` / `?w=500&h=220` |
| Cover strip | `?w=400&h=540&fit=crop` (3:4) |

---

## Icons (Inline SVG — no icon library in production)

All icons from **Lucide React** in code. For WordPress, use SVGs directly:

| Icon | Used On | SVG Path |
|---|---|---|
| Menu (hamburger) | Mobile navbar | 3 horizontal lines |
| X (close) | Mobile menu open state | ✕ mark |
| ArrowRight | CTA buttons, read links | → |
| ChevronLeft | Carousel prev | ‹ |
| ChevronRight | Carousel next | › |
| ArrowLeft | "Back to Articles" | ← |
| Clock | Article meta bar | Clock face |
| Calendar | Article meta bar | Calendar |
| User | Article meta bar | Person silhouette |
| Share2 | Article share button | Share icon |
| Bookmark | Article save button | Bookmark shape |
| Facebook | Footer + sidebar | F mark |
| Instagram | Footer + sidebar | Camera/square |
| TikTok | Footer + sidebar | Musical note shape |
| Search | Navbar search | Magnifying glass (inline SVG) |

---

---

# 7. Content Mapping

## WordPress Post Type Structure

### Standard Post (Articles)

| Field | Type | WordPress Source | Dynamic? |
|---|---|---|---|
| `title` | Text | `get_the_title()` | ✅ Dynamic |
| `slug` | URL | `get_the_permalink()` | ✅ Dynamic |
| `category` | Taxonomy | Custom taxonomy `draft_category` | ✅ Dynamic |
| `excerpt` | Textarea | `get_the_excerpt()` | ✅ Dynamic |
| `featured_image` | Image | `get_the_post_thumbnail_url()` | ✅ Dynamic |
| `author` | Text | `get_the_author()` | ✅ Dynamic |
| `author_title` | Text | Custom user meta `author_title` | ✅ Dynamic |
| `date` | Date | `get_the_date('F j, Y')` | ✅ Dynamic |
| `read_time` | Text | ACF `read_time` or auto-calculate | ✅ Dynamic |
| `content` | Rich text | `the_content()` | ✅ Dynamic |
| `featured` | Boolean | ACF checkbox `is_featured` | ✅ Dynamic |
| "D" watermark | Decorative | CSS/HTML | ❌ Static |
| Draft logo stamps | Decorative | CSS/HTML | ❌ Static |
| Brand tagline quote | Text | Theme option | ⚠️ Semi-static |

### Magazine / Cover (Custom Post Type: `draft_magazine`)

| Field | Type | Source |
|---|---|---|
| `issue` | Text | ACF `issue_number` |
| `title` | Text | `get_the_title()` |
| `subtitle` | Text | ACF `magazine_subtitle` |
| `date` | Text | ACF `magazine_date` |
| `cover_image` | Image | `get_the_post_thumbnail_url()` |
| `type` | Select | ACF `magazine_type` (Print/Digital/Limited/Special) |
| `volume` | Text | ACF `magazine_volume` |
| `season` | Text | ACF `magazine_season` |
| `featured_articles` | Relationship | ACF relationship field → post IDs |

---

## Section-by-Section Content Map

### Homepage

| Section | Content | Dynamic? |
|---|---|---|
| Hero background image | `9.png` | ⚠️ Semi (theme option or ACF) |
| Hero H1 "The Modern Voice of…" | Static editorial | ❌ Static (or Options page) |
| Hero badge "Where the Boys Play" | Brand tagline | ❌ Static (theme constant) |
| Hero excerpt | Static | ❌ Static |
| New Articles (3 cards) | Latest 3 posts | ✅ `WP_Query` latest |
| New Covers (6 thumbs) | Latest 6 covers CPT | ✅ CPT query |
| Magazine Carousel (6 issues) | Latest 6 magazines CPT | ✅ CPT query |
| Category links (Featured section) | Static: Fashion/Beauty/etc. | ❌ Static or taxonomy terms |

### Articles Page

| Section | Content | Dynamic? |
|---|---|---|
| Featured rotator | All posts | ✅ `WP_Query` all |
| Article grid | Filtered by `draft_category` term | ✅ Taxonomy query |
| Category filter pills | `draft_category` terms | ✅ `get_terms()` |
| Search | Native WP search or custom meta query | ✅ |

### Article Detail

| Section | Content | Dynamic? |
|---|---|---|
| Hero image | Post featured image | ✅ |
| Category badge | Post category | ✅ |
| H1 title | Post title | ✅ |
| Excerpt (italic) | Post excerpt | ✅ |
| Author + title + date + read time | Post meta | ✅ |
| Body (with drop cap on first ¶) | `the_content()` | ✅ |
| Drop cap | CSS `::first-letter` on first `<p>` | ❌ CSS |
| Blockquote styling (3rd paragraph) | WordPress block `<blockquote>` tag | ✅ via editor |
| Author card | Author user meta | ✅ |
| TOC | ACF repeater or auto-generated from H2/H3 | ⚠️ |
| Related articles | Same-category posts, limit 3 | ✅ |
| "More to Read" sidebar | Latest 5 posts (excluding current) | ✅ |

### Covers Page

| Field | Source |
|---|---|
| Cover image | CPT featured image |
| Title | CPT post title |
| Volume / date | ACF fields |
| Type badge | ACF select |
| "Current Edition" label | Theme option or ACF |

### Magazines Page

| Field | Source |
|---|---|
| Carousel images | CPT featured images, ordered by `menu_order` |
| Issue number, title, subtitle | ACF fields |
| Featured articles in issue | ACF relationship |

### About Page

| Section | Dynamic? | Notes |
|---|---|---|
| Hero image | ⚠️ Semi | ACF Options or hardcoded 9.png |
| "About Draft" body text | ✅ | ACF WYSIWYG on About page |
| Featured editorial grid images | ✅ | ACF image fields x3 |
| Brand strip: "draft ph" | ❌ | Static brand name |
| Cover strip: 4 photos + quote | ⚠️ | ACF repeater or hardcoded |
| Quote text | ✅ | ACF `about_quote` text |
| "Where the Boys Play" tagline | ❌ | Static brand tagline |

---

---

# 8. Implementation Notes

## Must-Preserve Exactly (Non-Negotiable)

1. **Square corners globally** — `border-radius: 0` everywhere. No pill buttons, no rounded cards except for social sidebar icons (12px) and social pill containers (40px). The square aesthetic is central to the brand identity.

2. **Teal exact value** — `#045350`. Do not approximate. Used on 50+ elements.

3. **Navbar behavior** — Category sub-bar must only appear on `/articles` and `/articles/*` URLs, not on other pages.

4. **Social sidebar scroll threshold** — Exactly 120px before appearance. Below this, it must be fully hidden (`opacity: 0`, not `display: none`, to allow smooth fade-in).

5. **Hidden scrollbar globally** — The `scrollbar-width: none` + webkit-scrollbar override must be applied site-wide.

6. **Magazine carousel physics** — Active card has a `6px` teal padding wrapper (not a CSS border) to create the "teal frame" effect. Inner image is `aspect-ratio: 2/3`.

7. **Drop cap implementation** — Float-left Playfair Display character. Do NOT use CSS `::first-letter` as it doesn't support `float`. Use JavaScript to wrap the first character in a `<span class="drop-cap">` on article detail pages.

8. **Stacked carousel (Magazines)** — Must be infinite/circular (wraps from last to first). The `shortestOffset` algorithm determines whether a card goes left or right around the loop.

9. **Font loading** — All 6 font families must be loaded: Plus Jakarta Sans, Inter, Playfair Display, PT Serif, Cactus Classical Serif, DM Serif Display. DM Serif Display is missing from current implementation — add it.

10. **Article grid fixed column width** — The articles grid uses `repeat(3, 375px)` not `repeat(3, 1fr)`. Cards are fixed 375px wide and the grid is center-justified. Do not make cards fluid.

---

## Can Be Approximated

1. **Inline style → CSS classes** — The entire React build uses inline styles. These can be cleanly translated to CSS classes without any visual difference.

2. **Mobile layouts** — Mobile breakpoint styles are largely absent from the current React build (only the navbar mobile menu is implemented). A full responsive implementation should be designed by the developer using the desktop specs as the target.

3. **Table of Contents (Article sidebar)** — Currently shows static "Section 1", "Section 2" etc. Replace with a real TOC generated from `<h2>` and `<h3>` tags in the article body (Rank Math, Yoast, or custom JS).

4. **Magazine cover carousel arrows** — The hover state swaps the SVG stroke color via inline style JS. In WordPress/CSS, use `::hover svg path { stroke: #fff }` instead.

5. **Article category filter** — Currently filters from a local JS array. In WordPress, reimplement as:
   - Filter pills link to `?category=fashion` URL params
   - PHP/WP_Query handles server-side filtering
   - Optional: AJAX for client-side feel without page reload

6. **Image aspect ratios** — All images use explicit `width/height` and `object-fit: cover`. Use the CSS `aspect-ratio` property + `object-fit: cover` rather than fixed pixel heights where possible for responsive behavior.

7. **DM Serif Display bold** — The font is loaded at weight 400 only. The Articles breadcrumbs use `font-weight: 700` on DM Serif Display, but this font only has one weight. It will render at 400 — either accept this or swap for another bold serif.

8. **Cactus Classical Serif → PT Serif fallback** — Cactus Classical Serif may not load reliably. PT Serif italic at 700 weight is an acceptable fallback for the footer tagline.

---

## WordPress-Specific Implementation Notes

### Theme Structure Recommendation
```
/wp-content/themes/draft/
├── functions.php          ← Enqueue fonts, register menus, CPTs, ACF fields
├── style.css              ← Theme header + global CSS
├── index.php
├── header.php             ← Navbar (both states)
├── footer.php             ← Footer
├── front-page.php         ← Homepage
├── page-covers.php        ← Covers archive
├── page-magazines.php     ← Magazines
├── page-articles.php      ← Articles + filter
├── single.php             ← Article detail
├── page-about.php         ← About
├── template-parts/
│   ├── article-card.php
│   ├── cover-card.php
│   ├── magazine-card.php
│   ├── social-sidebar.php
│   └── featured-grid.php
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
│       ├── draft-logo.png
│       ├── draft-logo.svg   ← Convert from PNG
│       ├── draft-icon.svg   ← Convert from PNG
│       └── hero-bg.jpg      ← Optimized version of 9.png
```

### Custom Post Types to Register
- `draft_magazine` — for magazine issues (Magazines page + Homepage carousel)

### Custom Taxonomies to Register
- `draft_category` — for article categories (Fashion, Beauty, Business, Sports, Lifestyle)

### ACF Field Groups
- `Article Fields` — `author_title`, `read_time`, `is_featured`
- `Magazine Fields` — `issue_number`, `magazine_subtitle`, `magazine_date`, `magazine_type`, `magazine_volume`, `magazine_season`, `featured_articles` (relationship)
- `Homepage Options` — `hero_background_image`, `hero_headline`, `hero_excerpt`, `hero_cta_label`, `hero_cta_url`
- `About Page` — `about_body`, `featured_image_1/2/3`, `cover_strip_images` (repeater), `about_quote`

### JavaScript Requirements
- Carousel (homepage + magazines): vanilla JS or lightweight slider
- Category filter: can be PHP-rendered (preferred for SEO) or AJAX
- Social sidebar scroll detection: ~15 lines vanilla JS
- Mobile menu toggle: ~10 lines vanilla JS
- Article grid stagger: CSS `animation-delay` + class toggle

### Performance Notes
- Lazy load all images below the fold (`loading="lazy"` attribute)
- Serve hero image (`9.png`) as WebP at 1920px wide max
- Use `srcset` on all article and magazine cover images
- Preload the Google Fonts stylesheet in `<head>`
- The scrollbar-hide CSS should be added to `style.css` globally

---

## CSS Variables (Copy-Paste Ready)

```css
:root {
  /* Brand colors */
  --color-primary:    #045350;
  --color-secondary:  #51356f;
  --color-accent:     #b9d7d9;

  /* Neutral palette */
  --color-bg:         #FAFAF8;
  --color-fg:         #111111;
  --color-card:       #ffffff;
  --color-muted-bg:   #F8F8F8;
  --color-muted-fg:   #888888;
  --color-border:     #D9D9D9;
  --color-border-med: #E4E4DE;
  --color-placeholder:#E4E4DF;

  /* Section backgrounds */
  --color-section-cream:   #F0F0EC;
  --color-section-stone:   #E8E8E4;
  --color-section-warm:    #f8f6f1;

  /* Typography */
  --font-display:   'Plus Jakarta Sans', sans-serif;
  --font-body:      'Inter', sans-serif;
  --font-serif:     'Playfair Display', Georgia, serif;
  --font-pt-serif:  'PT Serif', Georgia, serif;
  --font-cactus:    'Cactus Classical Serif', 'PT Serif', Georgia, serif;
  --font-dm-serif:  'DM Serif Display', Georgia, serif;

  /* Spacing */
  --container-xl:   1440px;
  --container-lg:   1320px;
  --container-md:   1100px;
  --container-sm:   900px;
  --container-xs:   680px;
  --pad-desktop:    40px;
  --pad-mobile:     24px;

  /* Sizing */
  --nav-height:         86px;
  --nav-height-cat:     130px;
  --social-sidebar-right: 20px;

  /* Borders */
  --radius: 0px; /* square corners */
  --radius-social-icon: 12px;
  --radius-social-container: 40px;
  --radius-card: 8px; /* article cards only */
}
```

---

*Document generated from source code analysis — DRAFT Magazine React SPA (Figma Make, August 2026)*
