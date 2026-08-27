import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { magazines } from '../data/content';
import draftLogo from '../../imports/draft_logo_gram__transparent__-_green.png';
import heroImage from '../../imports/9.png';

// ── HERO ───────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ position: 'relative', height: '88vh', minHeight: '560px', backgroundColor: '#0a0a0a', overflow: 'hidden' }}>
      <img
        src={heroImage}
        alt="DRAFT hero"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.6) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)' }} />

      {/* D watermark */}
      <img src={draftLogo} alt="" aria-hidden="true" style={{
        position: 'absolute', left: '3%', top: '50%', transform: 'translateY(-50%)',
        height: '65%', width: 'auto', opacity: 0.06,
        filter: 'brightness(0) invert(1)', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
        <div className="max-w-[1440px] mx-auto px-10 w-full" style={{ paddingBottom: '64px' }}>
          <div style={{ maxWidth: '520px' }}>
            <span style={{
              display: 'inline-block',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '8px', fontWeight: 700, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: '#b9d7d9',
              border: '1px solid rgba(185,215,217,0.4)', padding: '4px 12px', marginBottom: '16px',
            }}>
              Where the Boys Play
            </span>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800,
              letterSpacing: '-0.03em', lineHeight: '1.06', color: '#ffffff', marginBottom: '14px',
            }}>
              The Modern Voice of Fashion, Business &amp; Lifestyle
            </h1>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic', fontSize: '15px',
              color: 'rgba(255,255,255,0.52)', lineHeight: '1.65', marginBottom: '28px',
            }}>
              Bold stories. Unfiltered perspectives. By fans, for fans.
            </p>
            <Link to="/articles" style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em',
              textTransform: 'uppercase', textDecoration: 'none',
              padding: '12px 28px', backgroundColor: '#045350', color: '#ffffff',
              display: 'inline-flex', alignItems: 'center', gap: '8px',
            }}>
              Explore Articles <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FEATURED ───────────────────────────────────────────────────────────────────
function Featured() {
  const cats = ['Fashion', 'Beauty', 'Lifestyle', 'Sport', 'Business'];
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '72px 0' }}>
      <div className="max-w-[1440px] mx-auto px-10">
        <div style={{ display: 'grid', gridTemplateColumns: '42% 58%', gap: '56px', alignItems: 'center' }}>

          {/* LEFT: text */}
          <div>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(40px, 5.5vw, 68px)', fontWeight: 800,
              letterSpacing: '-0.03em', color: '#045350', lineHeight: '1.0', marginBottom: '6px',
            }}>
              FEATURED
            </h2>

            {/* Covers | Magazine | Articles — clickable */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
              {[{ label: 'Covers', to: '/covers' }, { label: 'Magazine', to: '/magazines' }, { label: 'Articles', to: '/articles' }].map(({ label, to }, i, arr) => (
                <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Link
                    to={to}
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '11px', fontWeight: 600, color: '#045350',
                      letterSpacing: '0.06em', textDecoration: 'none', transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    {label}
                  </Link>
                  {i < arr.length - 1 && <span style={{ color: '#b9d7d9', fontSize: '11px' }}>|</span>}
                </span>
              ))}
            </div>

            {/* Topic tags — plain clickable links, no box */}
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
              {cats.map((cat, i, arr) => (
                <span key={cat} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Link
                    to={`/articles?category=${cat}`}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '10px', fontWeight: 500, color: '#888888',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      textDecoration: 'none', transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#045350')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#888888')}
                  >
                    {cat}
                  </Link>
                  {i < arr.length - 1 && <span style={{ color: '#DDDDDD', fontSize: '10px' }}>|</span>}
                </span>
              ))}
            </div>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px', fontWeight: 300, color: '#555555',
              lineHeight: '1.8', marginBottom: '36px', maxWidth: '380px',
            }}>
              Explore the most talked-about articles, exclusive interviews, and trending insights curated by our editors. From fashion and beauty to lifestyle, sports, and business, discover content that inspires, informs, and captivates.
            </p>
          </div>

          {/* RIGHT: asymmetrical 3-image editorial grid */}
          {/*
            Col 1: tall vertical spanning both rows (IMG 1)
            Col 2 Row 1: ~58% height (IMG 2 — taller half of IMG 1)
            Col 2 Row 2: ~38% height (IMG 3 — shorter)
          */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '58% 38%',
            gap: '10px',
            height: '500px',
          }}>
            {/* IMG 1 — tall vertical, spans both rows */}
            <div style={{ overflow: 'hidden', backgroundColor: '#D8D8D4', borderRadius: '4px', gridRow: '1 / 3' }}>
              <img
                src={heroImage}
                alt="Cover 1"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
              />
            </div>
            {/* IMG 2 — top-right, taller ~58% */}
            <div style={{ overflow: 'hidden', backgroundColor: '#D8D8D4', borderRadius: '4px' }}>
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=420&fit=crop&auto=format"
                alt="Cover 2"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
              />
            </div>
            {/* IMG 3 — bottom-right, shorter ~38% */}
            <div style={{ overflow: 'hidden', backgroundColor: '#D8D8D4', borderRadius: '4px' }}>
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=220&fit=crop&auto=format"
                alt="Cover 3"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── NEW ARTICLES ───────────────────────────────────────────────────────────────
const newArticlesData = [
  {
    id: 'a1',
    label: 'Article 1',
    title: 'Article 1',
    author: 'DraftMagazine.ph',
    date: 'June 10, 2026',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&auto=format',
    slug: 'the-new-era-of-quiet-luxury',
    excerpt: 'Step inside the world of understated elegance where less is always more. We explore how modern men are redefining luxury through quiet confidence — no logos, no noise, just impeccable taste and intentional living that speaks volumes without saying a word.',
  },
  {
    id: 'a2',
    label: 'Article 2',
    title: 'Article 2',
    author: 'DraftMagazine.ph',
    date: 'June 10, 2026',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop&auto=format',
    slug: 'inside-the-power-wardrobes',
    excerpt: 'The wardrobe has always been a power move. From the boardroom to the courtside, we break down the pieces, the silhouettes, and the mindset behind the men who dress like they already own the room before they walk into it.',
  },
  {
    id: 'a3',
    label: 'Article 3',
    title: 'Article 3',
    author: 'DraftMagazine.ph',
    date: 'June 10, 2026',
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=800&fit=crop&auto=format',
    slug: 'the-skin-renaissance',
    excerpt: 'Skincare is no longer a secret. The modern man has embraced the ritual — serums, SPF, and beyond. We trace the cultural shift that turned grooming into a form of self-respect, and highlight the products and routines defining the new standard of masculine care.',
  },
];

function ArticleCard({ article }: { article: typeof newArticlesData[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.14)' : '0 2px 14px rgba(0,0,0,0.07)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* Image area */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', backgroundColor: '#E4E4DF' }}>
        <img
          src={article.image}
          alt={article.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0.32) 100%)' }} />

        {/* 3 stacked draft stamps — top left */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[1, 0.65, 0.35].map((op, i) => (
            <img key={i} src={draftLogo} alt="" aria-hidden="true"
              style={{ height: '13px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: op }} />
          ))}
        </div>

        {/* Large "D" watermark — bottom right */}
        <div style={{
          position: 'absolute', bottom: '4px', right: '10px',
          fontFamily: "'Playfair Display', serif",
          fontSize: '56px', fontWeight: 700,
          color: 'rgba(255,255,255,0.15)', lineHeight: '1', userSelect: 'none',
          pointerEvents: 'none',
        }}>
          D
        </div>
      </div>

      {/* Text area */}
      <div style={{ padding: '22px 22px 28px' }}>
        {/* Big bold title — Plus Jakarta Sans, primary color */}
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '24px', fontWeight: 800,
          letterSpacing: '-0.02em',
          color: '#045350',
          lineHeight: '1.1', marginBottom: '12px',
          transition: 'opacity 0.2s',
          ...(hovered ? { opacity: 0.75 } : {}),
        }}>
          {article.title}
        </h3>

        {/* Authored by — primary color + category pill */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#045350',
          }}>
            Authored by DraftMagazine.ph
          </span>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '8px', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#045350',
            backgroundColor: 'rgba(4,83,80,0.09)',
            padding: '3px 8px', borderRadius: '20px',
          }}>
            {article.category}
          </span>
        </div>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '10px', color: '#AAAAAA', marginBottom: '14px',
        }}>
          Published on {article.date}
        </p>

        {/* Article excerpt — Plus Jakarta Sans, non-italic, primary-adjacent tone */}
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '13px', fontWeight: 400, color: '#444444',
          lineHeight: '1.75', marginBottom: '18px',
        }}>
          {article.excerpt}
        </p>

        {/* Brand phrase — left border accent */}
        <p style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '11px', fontWeight: 600, color: '#045350',
          lineHeight: '1.6', marginBottom: '20px',
          borderLeft: '2px solid #045350', paddingLeft: '10px',
        }}>
          DRAFT is for the man who reads between the lines — and dresses like he wrote them.
        </p>

        {/* Read link */}
        <Link to={`/articles/${article.slug}`} style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', textDecoration: 'none', color: '#045350',
          display: 'inline-flex', alignItems: 'center', gap: '5px',
          borderBottom: '1px solid rgba(4,83,80,0.35)', paddingBottom: '2px',
        }}>
          Read Full Article <ArrowRight size={10} />
        </Link>
      </div>
    </div>
  );
}

function NewArticles() {
  return (
    <section style={{ backgroundColor: '#FAFAF8', padding: '72px 0' }}>
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Section heading */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '52px' }}>
          <img src={draftLogo} alt="draft" style={{ height: '30px', width: 'auto' }} />
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(18px, 2.4vw, 26px)', fontWeight: 800,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#045350',
          }}>
            NEW ARTICLES
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {newArticlesData.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── NEW COVERS ─────────────────────────────────────────────────────────────────
const heroThumb = 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&h=900&fit=crop&auto=format';
const thumbImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=160&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=160&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=160&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=160&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=200&h=160&fit=crop&auto=format',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=160&fit=crop&auto=format',
];

function Thumb({ image }: { image: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to="/covers"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', overflow: 'hidden', borderRadius: '4px',
        border: hovered ? '2px solid #045350' : '2px solid transparent',
        transition: 'border-color 0.2s ease, transform 0.2s ease, opacity 0.2s ease',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
        opacity: hovered ? 0.85 : 1,
        height: '116px', textDecoration: 'none',
      }}
    >
      <img src={image} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </Link>
  );
}

function NewCovers() {
  return (
    <section style={{ backgroundColor: '#f8f6f1', padding: '80px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: '48px', alignItems: 'start' }}>

          {/* LEFT: tall hero cover — slightly taller */}
          <div style={{ borderRadius: '6px', overflow: 'hidden', height: '540px' }}>
            <img
              src={heroThumb}
              alt="Featured cover"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* RIGHT: info + thumbnails */}
          <div>
            {/* Big logo — larger */}
            <div style={{ marginBottom: '10px' }}>
              <img src={draftLogo} alt="draft" style={{ height: '80px', width: 'auto', display: 'block' }} />
            </div>

            {/* NEW COVERS — bigger, primary color */}
            <p style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '24px', fontWeight: 800,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#045350', margin: '0 0 16px 0',
            }}>
              NEW COVERS
            </p>

            {/* Description */}
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px', fontWeight: 400,
              color: '#777777', lineHeight: '1.7',
              margin: '0 0 22px 0', maxWidth: '340px',
            }}>
              Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.
            </p>

            {/* Browse — primary color */}
            <Link to="/covers" style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: '#045350', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              marginBottom: '24px',
              borderBottom: '1.5px solid #045350', paddingBottom: '2px',
            }}>
              BROWSE COVERS <ArrowRight size={11} />
            </Link>

            {/* 3×2 thumbnail grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {thumbImages.map((img, i) => (
                <Thumb key={i} image={img} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── MAGAZINE ───────────────────────────────────────────────────────────────────
const magCovers = [
  { id: '1', name: 'Darrick', issue: 'Issue 07', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop&auto=format' },
  { id: '2', name: 'Rangel',  issue: 'Issue 08', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=700&fit=crop&auto=format' },
  { id: '3', name: 'Anthony', issue: 'Issue 09', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=700&fit=crop&auto=format' },
  { id: '4', name: 'Marcus',  issue: 'Issue 10', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&h=700&fit=crop&auto=format' },
  { id: '5', name: 'James',   issue: 'Issue 11', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&h=700&fit=crop&auto=format' },
  { id: '6', name: 'Leon',    issue: 'Issue 12', image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=500&h=700&fit=crop&auto=format' },
];

function Magazine() {
  const [active, setActive] = useState(1);
  const total = magCovers.length;

  const prev = () => setActive(i => Math.max(1, i - 1));
  const next = () => setActive(i => Math.min(total - 2, i + 1));

  const prevCover = magCovers[active - 1];
  const currCover = magCovers[active];
  const nextCover = magCovers[active + 1];

  const canPrev = active > 1;
  const canNext = active < total - 2;

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '80px 0 88px' }}>
      <div className="max-w-[1440px] mx-auto px-10">

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <img
            src={draftLogo}
            alt="draft"
            style={{ height: '40px', width: 'auto', display: 'inline-block', marginBottom: '6px' }}
          />
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#045350',
            lineHeight: '1',
          }}>
            MAGAZINE
          </div>
        </div>

        {/* Carousel + arrows */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* Left arrow */}
          <button
            onClick={prev}
            disabled={!canPrev}
            aria-label="Previous magazine"
            style={{
              position: 'absolute', left: 0, zIndex: 10,
              width: '44px', height: '44px', borderRadius: '50%',
              border: `1.5px solid ${canPrev ? '#111111' : '#DDDDDD'}`,
              backgroundColor: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: canPrev ? 'pointer' : 'default',
              color: canPrev ? '#111111' : '#CCCCCC',
              transition: 'background-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              if (canPrev) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#111111';
                (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
              }
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = canPrev ? '#111111' : '#CCCCCC';
            }}
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>

          {/* Three covers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '0 70px' }}>

            {/* Previous — small + dimmed */}
            <div
              style={{
                flex: '0 0 auto',
                width: 'clamp(160px, 18vw, 230px)',
                transform: 'scale(0.82)',
                opacity: 0.55,
                transition: 'all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: canPrev ? 'pointer' : 'default',
              }}
              onClick={prev}
            >
              <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden', backgroundColor: '#D8D8D4', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
                <img src={prevCover.image} alt={prevCover.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(30%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)' }} />
                <img src={draftLogo} alt="draft" style={{ position: 'absolute', top: '10px', left: '10px', height: '16px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontFamily: "'PT Serif', Georgia, serif", fontSize: '14px', fontWeight: 400, fontStyle: 'italic', color: '#ffffff' }}>
                  {prevCover.name}
                </div>
              </div>
            </div>

            {/* Active — large + teal border */}
            <div style={{
              flex: '0 0 auto',
              width: 'clamp(220px, 26vw, 340px)',
              transition: 'all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              position: 'relative',
            }}>
              <div style={{ padding: '6px', backgroundColor: '#045350', boxShadow: '0 20px 60px rgba(4,83,80,0.25), 0 8px 24px rgba(0,0,0,0.18)' }}>
                <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden', backgroundColor: '#D8D8D4' }}>
                  <img src={currCover.image} alt={currCover.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 45%)' }} />
                  <div style={{ position: 'absolute', top: '14px', left: '14px' }}>
                    <img src={draftLogo} alt="draft" style={{ height: '22px', width: 'auto', filter: 'brightness(0) saturate(100%) invert(90%) sepia(80%) saturate(500%) hue-rotate(10deg) brightness(110%)', opacity: 1 }} />
                  </div>
                  <div style={{ position: 'absolute', bottom: '14px', left: '14px', right: '14px' }}>
                    <div style={{ fontFamily: "'PT Serif', Georgia, serif", fontSize: '20px', fontWeight: 400, fontStyle: 'italic', color: '#ffffff', lineHeight: '1.2' }}>
                      {currCover.name}
                    </div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginTop: '4px' }}>
                      {currCover.issue}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next — small + dimmed */}
            <div
              style={{
                flex: '0 0 auto',
                width: 'clamp(160px, 18vw, 230px)',
                transform: 'scale(0.82)',
                opacity: 0.55,
                transition: 'all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                cursor: canNext ? 'pointer' : 'default',
              }}
              onClick={next}
            >
              <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden', backgroundColor: '#D8D8D4', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
                <img src={nextCover.image} alt={nextCover.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(30%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)' }} />
                <img src={draftLogo} alt="draft" style={{ position: 'absolute', top: '10px', left: '10px', height: '16px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.85 }} />
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontFamily: "'PT Serif', Georgia, serif", fontSize: '14px', fontWeight: 400, fontStyle: 'italic', color: '#ffffff' }}>
                  {nextCover.name}
                </div>
              </div>
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            disabled={!canNext}
            aria-label="Next magazine"
            style={{
              position: 'absolute', right: 0, zIndex: 10,
              width: '44px', height: '44px', borderRadius: '50%',
              border: `1.5px solid ${canNext ? '#111111' : '#DDDDDD'}`,
              backgroundColor: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: canNext ? 'pointer' : 'default',
              color: canNext ? '#111111' : '#CCCCCC',
              transition: 'background-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              if (canNext) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#111111';
                (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
              }
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = canNext ? '#111111' : '#CCCCCC';
            }}
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
          {magCovers.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(Math.max(1, Math.min(i, total - 2)))}
              aria-label={`Go to magazine ${i + 1}`}
              style={{
                width: i === active ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                backgroundColor: i === active ? '#045350' : '#D9D9D9',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* View all button */}
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <Link
            to="/magazines"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', textDecoration: 'none',
              padding: '12px 32px', border: '1.5px solid #045350',
              color: '#045350', display: 'inline-flex', alignItems: 'center', gap: '8px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#045350'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#045350'; }}
          >
            View All Magazines <ArrowRight size={12} />
          </Link>
        </div>

      </div>
    </section>
  );
}

// ── PAGE ───────────────────────────────────────────────────────────────────────
export function HomePage() {
  return (
    <div>
      <Hero />
      <Featured />
      <NewArticles />
      <NewCovers />
      <Magazine />
    </div>
  );
}