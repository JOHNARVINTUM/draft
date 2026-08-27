import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import draftLogo from '../../imports/draft_logo_gram__transparent__-_green.png';

const articlesData = [
  {
    id: 'a1', title: 'Article 1', slug: 'article-1', author: 'DraftMagazine.ph',
    date: 'June 10 2026', category: 'Lifestyle',
    excerpt: 'Explore the most talked-about articles, exclusive interviews, and trending insights curated by our editors. From fashion and beauty to lifestyle, sports, and business, discover content that inspires, informs, and captivates',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&h=800&fit=crop&auto=format',
  },
  {
    id: 'a2', title: 'Article 2', slug: 'article-2', author: 'DraftMagazine.ph',
    date: 'June 10 2026', category: 'Fashion',
    excerpt: 'DRAFT is for the man who reads between the lines — and dresses like he wrote them. Bold stories from the frontlines of style, culture, and the game.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=800&fit=crop&auto=format',
  },
  {
    id: 'a3', title: 'Article 3', slug: 'article-3', author: 'DraftMagazine.ph',
    date: 'June 10 2026', category: 'Sport',
    excerpt: 'DRAFT is for the man who reads between the lines — and dresses like he wrote them. Bold stories from the frontlines of style, culture, and the game.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&auto=format',
  },
  {
    id: 'a4', title: 'Article 4', slug: 'article-4', author: 'DraftMagazine.ph',
    date: 'June 10 2026', category: 'Lifestyle',
    excerpt: 'DRAFT is for the man who reads between the lines — and dresses like he wrote them. Bold stories from the frontlines of style, culture, and the game.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&auto=format',
  },
  {
    id: 'a5', title: 'Article 5', slug: 'article-5', author: 'DraftMagazine.ph',
    date: 'June 10 2026', category: 'Beauty',
    excerpt: 'DRAFT is for the man who reads between the lines — and dresses like he wrote them. Bold stories from the frontlines of style, culture, and the game.',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&h=800&fit=crop&auto=format',
  },
  {
    id: 'a6', title: 'Article 6', slug: 'article-6', author: 'DraftMagazine.ph',
    date: 'June 10 2026', category: 'Business',
    excerpt: 'DRAFT is for the man who reads between the lines — and dresses like he wrote them. Bold stories from the frontlines of style, culture, and the game.',
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&h=800&fit=crop&auto=format',
  },
  {
    id: 'a7', title: 'Article 7', slug: 'article-7', author: 'DraftMagazine.ph',
    date: 'June 10 2026', category: 'Lifestyle',
    excerpt: 'DRAFT is for the man who reads between the lines — and dresses like he wrote them. Bold stories from the frontlines of style, culture, and the game.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&auto=format',
  },
  {
    id: 'a8', title: 'Article 8', slug: 'article-8', author: 'DraftMagazine.ph',
    date: 'June 10 2026', category: 'Fashion',
    excerpt: 'DRAFT is for the man who reads between the lines — and dresses like he wrote them. Bold stories from the frontlines of style, culture, and the game.',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&h=800&fit=crop&auto=format',
  },
  {
    id: 'a9', title: 'Article 9', slug: 'article-9', author: 'DraftMagazine.ph',
    date: 'June 10 2026', category: 'Sport',
    excerpt: 'DRAFT is for the man who reads between the lines — and dresses like he wrote them. Bold stories from the frontlines of style, culture, and the game.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&auto=format',
  },
];

// ── Arrow button ──────────────────────────────────────────────────────────────
function ArrowBtn({ dir, onClick, disabled }: { dir: 'left' | 'right'; onClick: () => void; disabled: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={dir === 'left' ? 'Previous' : 'Next'}
      style={{
        width: '44px', height: '44px', borderRadius: '50%',
        border: `1.5px solid ${disabled ? '#E0E0E0' : hov ? '#045350' : '#BBBBBB'}`,
        backgroundColor: hov && !disabled ? '#045350' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all 0.2s ease', flexShrink: 0,
      }}
    >
      {dir === 'left' ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke={disabled ? '#DDDDDD' : hov ? '#fff' : '#666'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L11 8L6 13" stroke={disabled ? '#DDDDDD' : hov ? '#fff' : '#666'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

// ── Article Card ──────────────────────────────────────────────────────────────
function ArticleCard({ article, idx, visible }: { article: typeof articlesData[0]; idx: number; visible: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '375px',
        backgroundColor: '#ffffff',
        borderRadius: '4px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        /* strong visible card shadow, deepens on hover */
        boxShadow: hov
          ? '0 16px 48px rgba(0,0,0,0.16), 0 4px 12px rgba(4,83,80,0.10)'
          : '0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        transition: `box-shadow 0.3s ease, transform 0.3s ease, opacity 0.4s ease ${idx * 70}ms`,
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Image — with padding gap so image is NOT full bleed */}
      <div style={{ padding: '16px 16px 0 16px', backgroundColor: '#ffffff' }}>
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3/4',
          overflow: 'hidden',
          borderRadius: '3px',
          backgroundColor: '#E4E4DF',
        }}>
          <img
            src={article.image}
            alt={article.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              transform: hov ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,83,80,0.35) 0%, transparent 55%)' }} />
        </div>
      </div>

      {/* Text area */}
      <div style={{ padding: '18px 20px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '18px', fontWeight: 800,
          letterSpacing: '-0.02em',
          color: hov ? '#045350' : '#111111',
          marginBottom: '6px', lineHeight: '1.25',
          transition: 'color 0.2s',
        }}>
          {article.title}
        </h3>

        {/* Author */}
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '9px', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#045350', marginBottom: '3px',
        }}>
          Authored by {article.author}
        </p>

        {/* Published date */}
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '9px', fontWeight: 400,
          color: '#AAAAAA', marginBottom: '3px',
        }}>
          Published on {article.date}
        </p>

        {/* Category — below published date */}
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '9px', fontWeight: 400,
          color: '#AAAAAA', marginBottom: '14px',
        }}>
          {article.category}
        </p>

        {/* Excerpt */}
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '12px', fontWeight: 400,
          color: '#045350', lineHeight: '1.78',
          flex: 1,
        }}>
          {article.excerpt}
        </p>

        {/* Read Full Article — no underline on the link itself */}
        <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            to={`/articles/${article.slug}`}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '9px', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#045350', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '5px',
            }}
          >
            Read Full Article
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="#045350" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Articles Page ─────────────────────────────────────────────────────────────
export function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [featuredVisible, setFeaturedVisible] = useState(true);
  const [gridVisible, setGridVisible] = useState(false);
  const gridTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goFeatured = (next: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setFeaturedVisible(false);
    setTimeout(() => {
      setFeaturedIndex(next);
      setFeaturedVisible(true);
      setTransitioning(false);
    }, 260);
  };

  useEffect(() => {
    setGridVisible(false);
    if (gridTimerRef.current) clearTimeout(gridTimerRef.current);
    gridTimerRef.current = setTimeout(() => setGridVisible(true), 80);
    return () => { if (gridTimerRef.current) clearTimeout(gridTimerRef.current); };
  }, [activeCategory, searchQuery]);

  const filtered = articlesData.filter(a => {
    const matchCat = activeCategory ? a.category === activeCategory : true;
    const matchSearch = searchQuery
      ? a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchCat && matchSearch;
  });

  const featured = articlesData[featuredIndex];

  return (
    <div style={{ backgroundColor: '#ffffff' }}>


      {/* ── EVERYTHING CENTERED ───────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 40px' }}>

        {/* ── HEADER: logo + Articles + description — NO box, just free ── */}
        <div style={{ width: '100%', maxWidth: '900px', marginTop: '32px', marginBottom: '24px' }}>
          {/* draft logo + "Articles" — baseline aligned, minimal gap */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '12px' }}>
            <img
              src={draftLogo}
              alt="draft"
              style={{ height: '56px', width: 'auto', display: 'block' }}
            />
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '36px', fontWeight: 800,
              color: '#045350', margin: 0,
              lineHeight: '1', letterSpacing: '-0.025em',
              paddingBottom: '4px',
            }}>
              Articles
            </h1>
          </div>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '13px', fontWeight: 400,
            color: '#666666', lineHeight: '1.72',
            margin: 0,
          }}>
            Explore the most talked-about articles, exclusive interviews, and trending insights curated by our editors. From fashion and beauty to lifestyle, sports, and business, discover content that inspires, informs, and captivates
          </p>
        </div>

        {/* ── FEATURED BOX ──────────────────────────────────────── */}
        <div style={{ width: '100%', maxWidth: '900px' }}>

          {/* Box with arrows on left and right OUTSIDE the box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

            {/* Left arrow */}
            <ArrowBtn
              dir="left"
              onClick={() => goFeatured(Math.max(0, featuredIndex - 1))}
              disabled={featuredIndex === 0}
            />

            {/* The featured card */}
            <div style={{
              flex: 1,
              border: '1px solid #E0E0E0',
              borderRadius: '4px',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              transition: 'opacity 0.26s ease, transform 0.26s ease',
              opacity: featuredVisible ? 1 : 0,
              transform: featuredVisible ? 'translateX(0)' : 'translateX(-10px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'stretch' }}>

                {/* Image — with inner gap (padding) */}
                <div style={{ padding: '24px 0 24px 24px', flexShrink: 0 }}>
                  <div style={{ width: '290px', height: '380px', overflow: 'hidden', borderRadius: '3px', position: 'relative', backgroundColor: '#D8D8D4' }}>
                    <img
                      src={featured.image}
                      alt={featured.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%)' }} />
                  </div>
                </div>

                {/* Text panel */}
                <div style={{ flex: 1, padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h2 style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '26px', fontWeight: 800,
                    color: '#045350', marginBottom: '16px',
                    lineHeight: '1.2', letterSpacing: '-0.025em',
                  }}>
                    The {featured.title}
                  </h2>
                  <p style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '13px', fontWeight: 400,
                    color: '#555555', lineHeight: '1.82',
                    marginBottom: '24px',
                  }}>
                    {featured.excerpt}
                  </p>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', fontWeight: 300, color: '#AAAAAA', margin: '0 0 3px 0' }}>
                    Published on {featured.date}
                  </p>
                  <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', fontWeight: 300, color: '#AAAAAA', margin: 0 }}>
                    {featured.category}
                  </p>
                  <div style={{ textAlign: 'right', marginTop: '28px' }}>
                    <Link to={`/articles/${featured.slug}`} style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '10px', fontWeight: 400, fontStyle: 'italic',
                      color: '#888888', textDecoration: 'none',
                    }}>
                      Read Full Article →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right arrow */}
            <ArrowBtn
              dir="right"
              onClick={() => goFeatured(Math.min(articlesData.length - 1, featuredIndex + 1))}
              disabled={featuredIndex === articlesData.length - 1}
            />
          </div>

          {/* Dot indicators — centered below the row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '14px' }}>
            {articlesData.map((_, i) => (
              <button
                key={i}
                onClick={() => goFeatured(i)}
                style={{
                  width: i === featuredIndex ? '20px' : '7px',
                  height: '7px', borderRadius: '4px', border: 'none',
                  backgroundColor: i === featuredIndex ? '#045350' : '#DDDDDD',
                  cursor: 'pointer', padding: 0,
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* Home | Magazine | Cover — below dots, left edge of box, DM Serif Display Bold primary */}
          <div style={{ marginTop: '14px', marginBottom: '40px', paddingLeft: '60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              {[
                { label: 'Home', to: '/' },
                { label: 'Magazine', to: '/magazines' },
                { label: 'Cover', to: '/covers' },
              ].map(({ label, to }, i, arr) => (
                <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Link
                    to={to}
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontStyle: 'italic',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#045350',
                      textDecoration: 'none',
                      transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.55')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    {label}
                  </Link>
                  {i < arr.length - 1 && (
                    <span style={{ color: '#CCCCCC', fontSize: '14px', fontFamily: "'DM Serif Display', serif" }}>|</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── ARTICLES GRID — 3 cols, 375px each, 25px gap, centered ── */}
        <div style={{ width: '100%', maxWidth: '1185px', paddingBottom: '80px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', color: '#AAAAAA' }}>
              No articles found.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 375px)',
              gap: '25px',
              justifyContent: 'center',
            }}>
              {filtered.map((article, idx) => (
                <ArticleCard key={article.id} article={article} idx={idx} visible={gridVisible} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}