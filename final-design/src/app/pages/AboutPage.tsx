import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import draftLogo from '../../imports/draft_logo_gram__transparent__-_green.png';
import heroImage from '../../imports/9.png';

// ── cover images for the horizontal strip ──────────────────────────────────────
const stripImages = [
  {
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=540&fit=crop&auto=format',
    alt: 'Cover 1',
  },
  {
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=540&fit=crop&auto=format',
    alt: 'Cover 2',
  },
  {
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=540&fit=crop&auto=format',
    alt: 'Cover 3',
  },
  {
    type: 'quote',
    quote: '"I TRAIN HARD TO BE THE BEST ME — ALWAYS ONE STEP AHEAD, JUST FOR YOU."',
  },
  {
    type: 'photo',
    src: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&h=540&fit=crop&auto=format',
    alt: 'Cover 5',
  },
];

// ── featured images (reused from homepage design) ─────────────────────────────
const featImg1 = 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=900&fit=crop&auto=format';
const featImg2 = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=420&fit=crop&auto=format';
const featImg3 = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=220&fit=crop&auto=format';

export function AboutPage() {
  return (
    <div style={{ backgroundColor: '#ffffff' }}>

      {/* ── HERO — full-width photo ───────────────────────────── */}
      <div style={{ position: 'relative', width: '100%', height: '520px', overflow: 'hidden', backgroundColor: '#111' }}>
        <img
          src={heroImage}
          alt="DRAFT"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.18) 100%)' }} />
      </div>

      {/* ── ABOUT DRAFT ──────────────────────────────────────── */}
      <div style={{ backgroundColor: '#F0F0EC', padding: '56px 0 64px', position: 'relative' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 40px' }}>
          {/* Heading: "ABOUT" muted teal + "DRAFT" bold dark */}
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800,
            letterSpacing: '-0.02em', marginBottom: '18px', lineHeight: '1',
          }}>
            <span style={{ color: '#7AADA8' }}>ABOUT </span>
            <span style={{ color: '#111111' }}>DRAFT</span>
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px', fontWeight: 300,
            color: '#444444', lineHeight: '1.8', maxWidth: '520px',
          }}>
            DRAFT is a bold, digital hub serving up stylish, unfiltered stories about the athletes
            and gamers you love — by fans, for fans. Built for those who live for the game and
            the personalities behind it, DRAFT connects sports culture with style, attitude, and
            community.
          </p>
        </div>

      </div>

      {/* ── FEATURED ─────────────────────────────────────────── */}
      <div style={{ backgroundColor: '#E8E8E4', padding: '52px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '38% 62%', gap: '48px', alignItems: 'center' }}>

            {/* LEFT: text */}
            <div>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(32px, 4.5vw, 54px)', fontWeight: 800,
                letterSpacing: '-0.03em', color: '#045350', lineHeight: '1.0', marginBottom: '6px',
              }}>
                FEATURED
              </h2>

              {/* Covers | Magazine | Article */}
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap' }}>
                {[{ label: 'Covers', to: '/covers' }, { label: 'Magazine', to: '/magazines' }, { label: 'Article', to: '/articles' }].map(({ label, to }, i, arr) => (
                  <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Link
                      to={to}
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '10px', fontWeight: 600, color: '#045350',
                        letterSpacing: '0.04em', textDecoration: 'none',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                      {label}
                    </Link>
                    {i < arr.length - 1 && <span style={{ color: '#999', fontSize: '10px' }}>|</span>}
                  </span>
                ))}
              </div>

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px', fontWeight: 300, color: '#555555',
                lineHeight: '1.8', marginBottom: '24px', maxWidth: '300px',
              }}>
                Explore the most talked-about articles, exclusive interviews, and trending insights curated by our editors. From fashion and beauty to lifestyle, sports, and business, discover content that inspires, informs, and captivates.
              </p>

              {/* Fashion | Beauty | Lifestyle | Sport | Business */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                {['Fashion', 'Beauty', 'Lifestyle', 'Sports', 'Business'].map((cat, i, arr) => (
                  <span key={cat} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link
                      to={`/articles?category=${cat}`}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '9px', fontWeight: 500, color: '#777777',
                        letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none',
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#045350')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#777777')}
                    >
                      {cat}
                    </Link>
                    {i < arr.length - 1 && <span style={{ color: '#BBBBBB', fontSize: '9px' }}>|</span>}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT: 3-photo asymmetric grid — all clickable */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: 'auto',
              gap: '12px',
              height: '420px',
            }}>
              {/* IMG 1 — tall, spans both rows → The Sports Issue cover */}
              <Link to="/covers/cover-4" style={{
                overflow: 'hidden', borderRadius: '4px',
                gridRow: '1 / 3', position: 'relative',
                backgroundColor: '#ccc', height: '100%',
                display: 'block', textDecoration: 'none',
              }}>
                <img src={featImg1} alt="The Sports Issue"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block',
                    transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', pointerEvents: 'none' }}>
                  <img src={draftLogo} alt="draft" style={{ height: '16px', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                </div>
              </Link>

              {/* IMG 2 — top right → The Identity Issue cover */}
              <Link to="/covers/cover-2" style={{
                overflow: 'hidden', borderRadius: '4px',
                position: 'relative', backgroundColor: '#ccc', height: '200px',
                display: 'block', textDecoration: 'none',
              }}>
                <img src={featImg2} alt="The Identity Issue"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block',
                    transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', pointerEvents: 'none' }}>
                  <img src={draftLogo} alt="draft" style={{ height: '14px', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
                </div>
              </Link>

              {/* IMG 3 — bottom right → Power Wardrobes article */}
              <Link to="/articles/inside-the-power-wardrobes" style={{
                overflow: 'hidden', borderRadius: '4px',
                position: 'relative', backgroundColor: '#ccc', height: '208px',
                display: 'block', textDecoration: 'none',
              }}>
                <img src={featImg3} alt="Inside the Power Wardrobes"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block',
                    transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 40%, transparent 70%)',
                  pointerEvents: 'none',
                }} />
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', pointerEvents: 'none' }}>
                  <img src={draftLogo} alt="draft" style={{ height: '14px', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ── BRAND IDENTITY STRIP ─────────────────────────────── */}
      <div style={{ backgroundColor: '#ffffff', padding: '88px 40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          {/* Big "draft" wordmark */}
          <div style={{ paddingRight: '64px' }}>
            <img
              src={draftLogo}
              alt="draft"
              style={{ height: '120px', width: 'auto', display: 'block' }}
            />
          </div>

          {/* Vertical divider */}
          <div style={{ width: '1px', height: '130px', backgroundColor: '#CCCCCC', flexShrink: 0 }} />

          {/* draft ph + subtitle */}
          <div style={{ paddingLeft: '64px' }}>
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(40px, 5.5vw, 68px)', fontWeight: 800,
              letterSpacing: '-0.03em', color: '#045350', lineHeight: '1',
              marginBottom: '8px',
            }}>
              draft ph
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px', fontWeight: 300,
              color: '#888888', letterSpacing: '0.06em',
            }}>
              Youth Culture&nbsp;Journal
            </div>
          </div>
        </div>
      </div>

      {/* ── MAGAZINE COVER STRIP ─────────────────────────────── */}
      <div style={{ backgroundColor: '#ffffff', paddingBottom: '0' }}>
        <div style={{
          display: 'flex',
          width: '100%',
          overflow: 'hidden',
          gap: '3px',
        }}>
          {stripImages.map((item, i) => (
            item.type === 'quote' ? (
              <div
                key={i}
                style={{
                  flex: '1 1 0',
                  backgroundColor: '#045350',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'center', padding: '28px 22px',
                  minWidth: 0,
                }}
              >
                <div style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '26px', fontWeight: 800,
                  color: 'rgba(255,255,255,0.7)', lineHeight: '1',
                  marginBottom: '10px',
                }}>
                  "
                </div>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '11px', fontWeight: 700,
                  color: '#ffffff', lineHeight: '1.7',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>
                  I TRAIN HARD TO BE THE BEST ME — ALWAYS ONE STEP AHEAD, JUST FOR YOU.
                </p>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 0.5, 0.25].map((op, j) => (
                    <div key={j} style={{ width: '16px', height: '2px', backgroundColor: `rgba(255,255,255,${op})` }} />
                  ))}
                </div>
                <div style={{ marginTop: '14px' }}>
                  <img src={draftLogo} alt="draft" style={{ height: '14px', filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
                </div>
              </div>
            ) : (
              <div
                key={i}
                style={{
                  flex: '1 1 0',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#222',
                  minWidth: 0,
                  aspectRatio: '3/4',
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
                {/* draft logo watermark */}
                <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                  <img src={draftLogo} alt="draft" style={{ height: '13px', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
                </div>
                {/* Draft "D" top-left on first card */}
                {i === 0 && (
                  <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    <img src={draftLogo} alt="" aria-hidden="true" style={{ height: '22px', filter: 'brightness(0) invert(1)', opacity: 0.6 }} />
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </div>

      {/* ── WHERE THE BOYS PLAY tagline ───────────────────────── */}
      <div style={{ backgroundColor: '#ffffff', padding: '80px 40px', textAlign: 'center' }}>
        <p style={{
          fontFamily: "'DM Serif Display', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(32px, 4.5vw, 52px)',
          color: '#045350',
          margin: '0 auto',
          letterSpacing: '-0.01em',
          textAlign: 'center',
        }}>
          Where the Boys Play
        </p>
      </div>

    </div>
  );
}