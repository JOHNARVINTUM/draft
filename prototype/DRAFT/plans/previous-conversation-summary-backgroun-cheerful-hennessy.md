# Plan: DRAFT Magazine — WordPress-Compatible Self-Contained HTML Pages

## Context

Convert the DRAFT magazine React SPA into standalone, WordPress-pasteable HTML pages. Each page is a complete HTML block — with `<style>`, markup, and `<script>` — that can be pasted directly into WordPress using:
- A **blank/full-width page template** (no WordPress theme header/footer)
- The **Elementor / Divi / Gutenberg Custom HTML** block
- Or a **Raw HTML** WordPress plugin

The design must exactly match the existing React app. Content must be editable without touching markup — a CMS-friendly JS config object at the top of each page's `<script>` holds all articles, magazines, and copy.

---

## WordPress Compatibility Rules

| Rule | Implementation |
|---|---|
| Scoped CSS | All classes prefixed `.dr-` to avoid conflicts with WordPress theme styles |
| IIFE JS | All scripts wrapped in `(function(){ ... })()` — no globals leaked |
| No build tools | Pure HTML/CSS/JS — zero npm, React, or Vite dependencies |
| Google Fonts | Loaded via `@import url(...)` inside the `<style>` block (works in WP Custom HTML) |
| Image URLs | Unsplash CDN URLs used for articles/magazines; local import paths for logos/hero (user will swap for WP Media Library URLs after upload) |
| jQuery-safe | Vanilla JS only — no jQuery dependency (WP may or may not have it) |
| No conflicting IDs | All element IDs namespaced as `dr-*` |

---

## Output: 5 Self-Contained HTML Files

Placed in `/workspaces/default/code/public/` for direct browser preview; paste the full file contents into WordPress.

| File | WordPress Page |
|---|---|
| `index.html` | Home |
| `covers.html` | Covers |
| `magazines.html` | Magazines |
| `articles.html` | Articles |
| `about.html` | About Us |

Navigation uses `<a href="covers.html">` (update to WordPress page slugs after pasting).

---

## CMS-Friendly Data Structure

Every dynamic page (`articles.html`, `magazines.html`, `index.html`) opens its `<script>` with a labeled config object that a non-developer can edit:

```html
<script>
// ============================================================
// CMS DATA — Edit articles here without touching the HTML
// ============================================================
const DRAFT_DATA = {
  articles: [
    {
      slug: "suit-up",
      title: "Suit Up: The Return of the Power Suit",
      category: "Fashion",      // Fashion | Beauty | Business | Sports | Lifestyle
      date: "June 2025",
      author: "Marcus Reyes",
      readTime: "5 min read",
      excerpt: "How the boardroom silhouette reclaimed the streets...",
      image: "https://images.unsplash.com/photo-...",
      featured: true            // shows in homepage featured section
    },
    // ... 11 more articles
  ],
  magazines: [
    {
      id: 1,
      issue: "Issue 01",
      title: "The Power Issue",
      date: "January 2025",
      cover: "https://images.unsplash.com/photo-...",
      featured: true
    },
    // ... 5 more magazines
  ]
};
// ============================================================
</script>
```

All article cards, carousels, and grids render from this object — changing copy, images, or categories only requires editing the config.

---

## Page-by-Page Sections (Exact Design Match)

### `index.html` — Homepage

1. **Navbar** — `background: #045350`, centered Plus Jakarta Sans wordmark logo, nav links (Home / Covers / Magazine / Articles / About), mobile hamburger with animated X
2. **Hero** — 100vh, `9.png` background-image, dark overlay `rgba(0,0,0,0.55)`, centered "DRAFT" (~14vw), "WHERE THE BOYS PLAY" spaced caps, scroll chevron with bounce animation
3. **Featured** — Section label "FEATURED" in spaced caps, 3-image asymmetric editorial grid (tall left, stacked right), category link overlays on hover
4. **New Articles** — 3-column card grid from `DRAFT_DATA.articles.slice(0,3)`, each card: cover image, draft logo stamp top-right, large "D" watermark bottom-right (20% opacity), category badge, title, date — CSS hover lifts card
5. **New Covers** — tall hero cover left (60% width) + 3×2 thumbnail grid right
6. **Magazine Carousel** — 3 covers visible, center one 1.1× scale with `2px solid #045350` border, flanking at `opacity: 0.5 scale(0.9)`, prev/next arrows, dot indicators, "View All Magazines" CTA button in teal
7. **Footer** — `background: #045350`, D icon centered top, "Where the Boys Play" in PT Serif italic, 4 nav columns, social icons in `rgba(255,255,255,0.15)` pill backgrounds, bottom copyright

**JS functions**: `initCarousel()`, `initSocialSidebar()`, `renderArticleCards()`, `renderMagazineCarousel()`, `initMobileMenu()`

---

### `covers.html` — Covers Archive

1. Navbar + Footer (same as above, duplicated)
2. **Page header** — "COVERS" in large Plus Jakarta Sans with underline rule
3. **Cover Grid** — CSS `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`, 12 cover cards
   - Card: `aspect-ratio: 3/4`, cover image, hover overlay slides up with issue # + title + category badge
   - Pure CSS `:hover` — no JS needed
4. Social Sidebar

---

### `magazines.html` — Magazines

1. Navbar + Footer
2. **Stacked Cover Carousel** — 3 cards with CSS `transform: translateX() scale()` physics, center card prominent, flanking offset ~160px and scaled 0.85, prev/next arrows
3. **Issue Grid** — 3×3 grid of all 9 issues, each: cover image, issue number overlay, date, "View Issue" button (teal outline)
4. Social Sidebar

**JS**: `initStackedCarousel()` — updates `transform` on prev/next click

---

### `articles.html` — Articles + Filter

1. Navbar + Footer
2. **Category Filter Bar** — pill buttons: All / Fashion / Beauty / Business / Sports / Lifestyle — active state: `background: #045350; color: white`
3. **Featured Spotlight Rotator** — large article (image left, content right), fade transition on arrow click
4. **Article Grid** — 3-column, all 12 articles from `DRAFT_DATA.articles`, filtered on category click
5. **Search input** — filters by title on keyup
6. Social Sidebar

**JS**: `initCategoryFilter()`, `initFeaturedRotator()`, `initSearch()` — all operate on data-attribute selectors

---

### `about.html` — About Us

1. Navbar + Footer
2. **Full-width hero** — `9.png` (or `MacBook_Pro_14__-_1__3_.png`), 70vh, dark overlay, "ABOUT DRAFT" headline
3. **About text block** — editorial paragraph in Inter, max-width 720px centered
4. **3-image editorial grid** — same asymmetric layout as homepage Featured
5. **Brand identity strip** — centered wordmark + vertical divider + "draft ph" italic
6. **Horizontal cover strip** — 4 cover photos + teal quote card with editorial quote
7. **Tagline footer strip** — "Where the Boys Play" in DM Serif Display italic, large, centered on `#045350`

---

## Image Asset Strategy

| Asset | Source in HTML |
|---|---|
| Hero (`9.png`) | `../src/imports/9.png` → user replaces with WP media URL |
| Wordmark logo | `../src/imports/draft_logo_gram__transparent__-_green.png` → WP media URL |
| D icon (footer) | `../src/imports/draft_icon-2.png` → WP media URL |
| Editorial grid images | `../src/imports/Group_30.png`, `Group_31.png`, `Group_36.png` |
| Article covers | Unsplash CDN URLs from content.ts (already absolute) |
| Magazine covers | Unsplash CDN URLs |

A comment block at the top of each HTML file lists every image URL that needs updating after WordPress media upload.

---

## Files to Create

```
/workspaces/default/code/public/
├── index.html        ← Homepage (all sections, carousel, article cards)
├── covers.html       ← Cover archive grid
├── magazines.html    ← Magazine carousel + issue grid
├── articles.html     ← Articles + category filter + search
└── about.html        ← About Us editorial layout
```

The existing React source (`src/`) is left completely untouched.

---

## Verification Before Handing Over

1. Serve `public/` with `python3 -m http.server 8080` inside the `public/` directory
2. Check each page in browser: visual match to React app
3. Test carousel prev/next on Homepage and Magazines
4. Test category filter on Articles (show/hide cards)
5. Test mobile menu toggle (hamburger → X → nav links appear)
6. Scroll past 120px → social sidebar fades in on right
7. Confirm all inter-page `<a href>` links navigate correctly
8. Validate no JS errors in browser console
9. Confirm no CSS class conflicts by adding a dummy WordPress-styled `<div class="container">` wrapper and checking design holds
