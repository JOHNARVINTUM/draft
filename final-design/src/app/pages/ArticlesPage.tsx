import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router';
import draftLogo from '../../imports/draft_logo_gram__transparent__-_green.png';
import { articles as articlesData } from '../data/content';

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
        width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
        border: `1.5px solid ${disabled ? '#E8E8E8' : hov ? '#045350' : '#CCCCCC'}`,
        backgroundColor: hov && !disabled ? '#045350' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {dir === 'left' ? (
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8L10 13" stroke={disabled ? '#DDDDDD' : hov ? '#fff' : '#777'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path d="M6 3L11 8L6 13" stroke={disabled ? '#DDDDDD' : hov ? '#fff' : '#777'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

// ── Article Card ──────────────────────────────────────────────────────────────
function ArticleCard({ article }: { article: typeof articlesData[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to={`/articles/${article.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#ffffff',
        border: '1px solid #ECECEC',
        borderRadius: '4px',
        overflow: 'hidden',
        textDecoration: 'none', color: 'inherit',
        boxShadow: hov ? '0 12px 36px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.07)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* Portrait image — full bleed top */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', backgroundColor: '#E4E4DF', flexShrink: 0 }}>
        <img
          src={article.image}
          alt={article.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hov ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.28) 0%, transparent 50%)' }} />
      </div>

      {/* Text area */}
      <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '16px', fontWeight: 800,
          color: '#045350',
          marginBottom: '8px', lineHeight: '1.25',
          letterSpacing: '-0.01em',
          transition: 'color 0.2s',
        }}>
          {article.title}
        </h3>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '9px', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#045350', marginBottom: '3px',
        }}>
          Authored by {article.author}
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '9px', color: '#BBBBBB', marginBottom: '2px',
        }}>
          Published on {article.date}
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '9px', color: '#BBBBBB', marginBottom: '12px',
        }}>
          {article.category}
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px', fontWeight: 300,
          color: '#555555', lineHeight: '1.75',
          flex: 1,
        }}>
          {article.excerpt}
        </p>

        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px', fontStyle: 'italic',
            color: '#045350',
          }}>
            Read Full Article →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Articles Page ─────────────────────────────────────────────────────────────
export function ArticlesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search') || '';
  const [featIdx, setFeatIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [featVisible, setFeatVisible] = useState(true);
  const [gridVisible, setGridVisible] = useState(true);
  const gridTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goFeatured = (next: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setFeatVisible(false);
    setTimeout(() => {
      setFeatIdx(next);
      setFeatVisible(true);
      setTransitioning(false);
    }, 240);
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

  const featured = articlesData[featIdx];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 40px' }}>

        {/* ── HEADER ── */}
        <div style={{ paddingTop: '48px', paddingBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <img
              src={draftLogo}
              alt="draft"
              style={{ height: '82px', width: 'auto', display: 'block' }}
            />
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '30px', fontWeight: 800,
              color: '#045350', margin: 0,
              lineHeight: '1', letterSpacing: '-0.02em',
            }}>
              Articles
            </h1>
          </div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px', fontWeight: 300,
            color: '#777777', lineHeight: '1.8',
            margin: 0,
          }}>
            Explore the most talked-about articles, exclusive interviews, and trending insights curated by our editors. From fashion and beauty to lifestyle, sports, and business, discover content that inspires, informs, and captivates.
          </p>
        </div>

        {/* ── FEATURED CAROUSEL ── */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>

            {/* Left arrow */}
            <ArrowBtn
              dir="left"
              onClick={() => goFeatured(Math.max(0, featIdx - 1))}
              disabled={featIdx === 0}
            />

            {/* Card — entire box is clickable */}
            <Link
              to={`/articles/${featured.slug}`}
              style={{
                flex: 1,
                border: '1px solid #E8E8E4',
                borderRadius: '4px',
                backgroundColor: '#ffffff',
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                opacity: featVisible ? 1 : 0,
                transform: featVisible ? 'translateX(0)' : 'translateX(-8px)',
                transition: 'opacity 0.24s ease, transform 0.24s ease, box-shadow 0.25s ease',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                cursor: 'pointer',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(4,83,80,0.14)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.07)')}
            >
              <div style={{ display: 'flex', alignItems: 'stretch' }}>

                {/* Left: portrait image */}
                <div style={{ padding: '20px 0 20px 20px', flexShrink: 0 }}>
                  <div style={{
                    width: '240px', aspectRatio: '3/4',
                    overflow: 'hidden', borderRadius: '3px',
                    backgroundColor: '#E4E4DF',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                  }}>
                    <img
                      src={featured.image}
                      alt={featured.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)' }}
                    />
                  </div>
                </div>

                {/* Right: text */}
                <div style={{
                  flex: 1, padding: '28px 32px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                }}>
                  <h2 style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '24px', fontWeight: 800,
                    color: '#045350', marginBottom: '14px',
                    lineHeight: '1.2', letterSpacing: '-0.02em',
                  }}>
                    {featured.title}
                  </h2>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px', fontWeight: 300,
                    color: '#555555', lineHeight: '1.82',
                    marginBottom: '20px',
                  }}>
                    {featured.excerpt}
                  </p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '11px', color: '#BBBBBB', margin: '0 0 2px 0',
                  }}>
                    Published on {featured.date}
                  </p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '11px', color: '#BBBBBB', margin: '0 0 24px 0',
                  }}>
                    {featured.category}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '10px', fontStyle: 'italic',
                      color: '#045350',
                    }}>
                      Read Full Article →
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Right arrow */}
            <ArrowBtn
              dir="right"
              onClick={() => goFeatured(Math.min(articlesData.length - 1, featIdx + 1))}
              disabled={featIdx === articlesData.length - 1}
            />
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '14px' }}>
            {articlesData.map((_, i) => (
              <button
                key={i}
                onClick={() => goFeatured(i)}
                style={{
                  width: i === featIdx ? '20px' : '7px',
                  height: '7px', borderRadius: '4px', border: 'none', padding: 0,
                  backgroundColor: i === featIdx ? '#045350' : '#DDDDDD',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* ── BREADCRUMB NAV ── */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '48px', paddingLeft: '58px' }}>
          {[
            { label: 'Home', to: '/' },
            { label: 'Magazine', to: '/magazines' },
            { label: 'Cover', to: '/covers' },
          ].map(({ label, to }, i, arr) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Link
                to={to}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px', fontWeight: 700,
                  color: '#045350', textDecoration: 'none',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {label}
              </Link>
              {i < arr.length - 1 && <span style={{ color: '#CCCCCC', fontSize: '11px' }}>|</span>}
            </span>
          ))}
        </div>

      </div>

      {/* ── ARTICLE GRID — slightly wider container ── */}
      <div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 40px 88px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '72px 0 56px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ marginBottom: '20px', opacity: 0.22 }}>
              <circle cx="18" cy="18" r="12" stroke="#045350" strokeWidth="2.5" />
              <line x1="27" y1="27" x2="36" y2="36" stroke="#045350" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '18px', fontWeight: 800,
              color: '#045350', marginBottom: '8px',
            }}>
              No articles found
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px', fontWeight: 300,
              color: '#AAAAAA', marginBottom: '28px', lineHeight: '1.7',
            }}>
              {activeCategory
                ? `Nothing in "${activeCategory}" yet. Try browsing all articles.`
                : searchQuery
                ? `No results for "${searchQuery}". Try a different search term.`
                : 'No articles available right now.'}
            </p>
            <button
              onClick={() => setSearchParams({})}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: '#045350', background: 'none',
                border: '1px solid #045350', borderRadius: '2px',
                padding: '10px 22px', cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#045350';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#045350';
              }}
            >
              Browse All Articles
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '28px',
          }}>
            {filtered.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
