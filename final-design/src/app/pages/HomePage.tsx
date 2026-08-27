import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { articles as allArticles } from '../data/content';
import draftLogo from '../../imports/draft_logo_gram__transparent__-_green.png';
import heroImage from '../../imports/9.png';

// ── HERO SLIDES ────────────────────────────────────────────────────────────────
const heroSlides = [
  {
    image: heroImage,
    to: '/articles/the-new-era-of-quiet-luxury',
    badge: 'Where the Boys Play',
    title: 'The Modern Voice of Fashion, Business & Lifestyle',
    subtitle: 'Bold stories. Unfiltered perspectives. By fans, for fans.',
  },
  {
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&h=900&fit=crop&auto=format',
    to: '/articles/the-new-era-of-quiet-luxury',
    badge: 'Article',
    title: 'The New Era of Quiet Luxury',
    subtitle: 'Where less has always been more. Style without noise.',
  },
  {
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1600&h=900&fit=crop&auto=format',
    to: '/covers/cover-3',
    badge: 'Cover',
    title: 'The Power Issue',
    subtitle: 'Redefining influence in the modern age.',
  },
  {
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1600&h=900&fit=crop&auto=format',
    to: '/magazines/magazine-8',
    badge: 'Magazine',
    title: 'The Identity Issue',
    subtitle: 'Who we are when no one is watching.',
  },
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=900&fit=crop&auto=format',
    to: '/articles/inside-the-power-wardrobes',
    badge: 'Article',
    title: 'Inside the Power Wardrobes',
    subtitle: 'Dressing like you already own the room.',
  },
  {
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1600&h=900&fit=crop&auto=format',
    to: '/covers/cover-8',
    badge: 'Cover',
    title: 'The Lifestyle Issue',
    subtitle: 'Slowing down to live more intentionally.',
  },
];

// ── HERO ───────────────────────────────────────────────────────────────────────
function Hero() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % heroSlides.length);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const handleDot = (e: React.MouseEvent, i: number) => {
    e.stopPropagation();
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrent(i);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % heroSlides.length);
    }, 5000);
  };

  return (
    <section
      onClick={() => navigate(heroSlides[current].to)}
      style={{
        position: 'relative', height: '88vh', minHeight: '560px',
        backgroundColor: '#0a0a0a', overflow: 'hidden', cursor: 'pointer',
      }}
    >
      {/* All slide images stacked — CSS crossfade */}
      {heroSlides.map((s, i) => (
        <img
          key={i}
          src={s.image}
          alt=""
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: 'none',
          }}
        />
      ))}

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 55%, rgba(0,0,0,0.6) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)' }} />

      {/* Per-slide text — fades with the image */}
      {heroSlides.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: i === current ? 'auto' : 'none',
          }}
        >
          <div className="max-w-[1440px] mx-auto px-10 w-full" style={{ paddingBottom: '100px' }}>
            <div style={{ maxWidth: '520px' }}>
              <span style={{
                display: 'inline-block',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '8px', fontWeight: 700, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: '#b9d7d9',
                border: '1px solid rgba(185,215,217,0.4)', padding: '4px 12px', marginBottom: '16px',
              }}>
                {s.badge}
              </span>
              <h1 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 800,
                letterSpacing: '-0.03em', lineHeight: '1.06', color: '#ffffff', marginBottom: '14px',
              }}>
                {s.title}
              </h1>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic', fontSize: '15px',
                color: 'rgba(255,255,255,0.52)', lineHeight: '1.65', marginBottom: '28px',
              }}>
                {s.subtitle}
              </p>
              <Link
                to="/articles"
                onClick={e => e.stopPropagation()}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em',
                  textTransform: 'uppercase', textDecoration: 'none',
                  padding: '12px 28px', backgroundColor: '#045350', color: '#ffffff',
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                }}
              >
                Explore Articles <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Dot indicators */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '8px', alignItems: 'center', zIndex: 10,
          pointerEvents: 'auto',
        }}
      >
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={e => handleDot(e, i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px', borderRadius: '4px', border: 'none', padding: 0,
              backgroundColor: i === current ? '#ffffff' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>
    </section>
  );
}

// ── FEATURED ───────────────────────────────────────────────────────────────────
function Featured() {
  const cats = ['Fashion', 'Beauty', 'Lifestyle', 'Sports', 'Business'];
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '72px 0' }}>
      <div className="max-w-[1440px] mx-auto px-10">
        <div style={{ display: 'grid', gridTemplateColumns: '42% 58%', gap: '56px', alignItems: 'stretch' }}>

          {/* LEFT: text */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            {/* Top group — vertically centered in the available space above categories */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(40px, 5.5vw, 68px)', fontWeight: 800,
                letterSpacing: '-0.03em', color: '#045350', lineHeight: '1.0', marginBottom: '6px',
              }}>
                FEATURED
              </h2>

              {/* Covers | Magazine | Articles — clickable */}
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap' }}>
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

              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px', fontWeight: 300, color: '#045350',
                lineHeight: '1.8', margin: 0, maxWidth: '380px',
              }}>
                Explore the most talked-about articles, exclusive interviews, and trending insights curated by our editors. From fashion and beauty to lifestyle, sports, and business, discover content that inspires, informs, and captivates.
              </p>
            </div>

            {/* Category tags — pinned to the bottom */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', paddingTop: '24px' }}>
              {cats.map((cat, i, arr) => (
                <span key={cat} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Link
                    to={`/articles?category=${cat}`}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '10px', fontWeight: 600, color: '#045350',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      textDecoration: 'none', transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.55')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    {cat}
                  </Link>
                  {i < arr.length - 1 && <span style={{ color: '#BBBBBB', fontSize: '10px' }}>|</span>}
                </span>
              ))}
            </div>
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
            gridTemplateRows: '3fr 2fr',
            gap: '10px',
            height: '500px',
          }}>
            {/* IMG 1 — tall vertical, spans both rows → article */}
            <Link to="/articles/the-new-era-of-quiet-luxury" style={{ overflow: 'hidden', backgroundColor: '#D8D8D4', borderRadius: '4px', gridRow: '1 / 3', display: 'block', textDecoration: 'none' }}>
              <img
                src={heroImage}
                alt="The New Era of Quiet Luxury"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', transition: 'transform 0.5s ease' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </Link>
            {/* IMG 2 — top-right → cover */}
            <Link to="/covers/cover-2" style={{ overflow: 'hidden', backgroundColor: '#D8D8D4', borderRadius: '4px', display: 'block', textDecoration: 'none' }}>
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=420&fit=crop&auto=format"
                alt="The Identity Issue"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', transition: 'transform 0.5s ease' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </Link>
            {/* IMG 3 — bottom-right → article */}
            <Link to="/articles/inside-the-power-wardrobes" style={{ overflow: 'hidden', backgroundColor: '#D8D8D4', borderRadius: '4px', display: 'block', textDecoration: 'none' }}>
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=220&fit=crop&auto=format"
                alt="Inside the Power Wardrobes"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', transition: 'transform 0.5s ease' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── NEW ARTICLES ───────────────────────────────────────────────────────────────
const newArticlesData = allArticles.slice(0, 3);

function ArticleCard({ article }: { article: typeof newArticlesData[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={`/articles/${article.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column',
        backgroundColor: '#ffffff',
        border: '1px solid #ECECEC',
        borderRadius: '4px',
        overflow: 'hidden',
        textDecoration: 'none', color: 'inherit',
        boxShadow: hovered ? '0 12px 36px rgba(0,0,0,0.12)' : '0 2px 12px rgba(0,0,0,0.07)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* Portrait image */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', backgroundColor: '#E4E4DF', flexShrink: 0 }}>
        <img
          src={article.image}
          alt={article.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 50%)' }} />
      </div>

      {/* Text area */}
      <div style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '22px', fontWeight: 800,
          color: hovered ? '#023a38' : '#045350',
          marginBottom: '8px', lineHeight: '1.2',
          letterSpacing: '-0.02em', transition: 'color 0.2s',
        }}>
          {article.title}
        </h3>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#045350', marginBottom: '3px' }}>
          Authored by {article.author}
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: '#BBBBBB', marginBottom: '2px' }}>
          Published on {article.date}
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: '#BBBBBB', marginBottom: '12px' }}>
          {article.category}
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 300, color: '#555555', lineHeight: '1.75', flex: 1 }}>
          {article.excerpt}
        </p>
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontStyle: 'italic', color: '#045350' }}>
            Read Full Article →
          </span>
        </div>
      </div>
    </Link>
  );
}

function NewArticles() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '72px 0' }}>
      <div className="max-w-[1440px] mx-auto px-10">
        {/* Section heading */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginBottom: '52px' }}>
          <img src={draftLogo} alt="draft" style={{ height: '68px', width: 'auto' }} />
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '18px', fontWeight: 800,
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
const heroThumb = { slug: 'cover-1', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&h=900&fit=crop&auto=format' };
const thumbImages = [
  { slug: 'cover-9', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&auto=format' },
  { slug: 'cover-4', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=400&fit=crop&auto=format' },
  { slug: 'cover-2', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&auto=format' },
  { slug: 'cover-3', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=400&fit=crop&auto=format' },
  { slug: 'cover-8', image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=300&h=400&fit=crop&auto=format' },
  { slug: 'cover-5', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop&auto=format' },
];

function Thumb({ slug, image }: { slug: string; image: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={`/covers/${slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', overflow: 'hidden', borderRadius: '3px',
        aspectRatio: '3/4',
        border: hovered ? '1.5px solid #045350' : '1.5px solid transparent',
        transition: 'border-color 0.2s ease, transform 0.25s ease',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
        textDecoration: 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
      }}
    >
      <img src={image} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} />
    </Link>
  );
}

function NewCovers() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '80px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: '48px', alignItems: 'stretch' }}>

          {/* LEFT: big cover — clickable, links to cover-1 detail */}
          <Link
            to={`/covers/${heroThumb.slug}`}
            style={{ position: 'relative', overflow: 'hidden', borderRadius: '6px', minHeight: 0, display: 'block', textDecoration: 'none' }}
          >
            <img
              src={heroThumb.image}
              alt="Featured cover"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center', display: 'block',
                transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </Link>

          {/* RIGHT: info + thumbnails */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
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
              display: 'inline-flex', alignItems: 'center', alignSelf: 'flex-start', gap: '6px',
              marginBottom: '24px',
              borderBottom: '1.5px solid #045350', paddingBottom: '2px',
            }}>
              BROWSE COVERS <ArrowRight size={11} />
            </Link>

            {/* 3×2 thumbnail grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {thumbImages.map((t) => (
                <Thumb key={t.slug} slug={t.slug} image={t.image} />
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
  { id: '1', slug: 'magazine-1', name: 'Darrick', issue: 'Issue 07', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop&auto=format' },
  { id: '2', slug: 'magazine-2', name: 'Rangel',  issue: 'Issue 08', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=700&fit=crop&auto=format' },
  { id: '3', slug: 'magazine-3', name: 'Anthony', issue: 'Issue 09', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=700&fit=crop&auto=format' },
  { id: '4', slug: 'magazine-4', name: 'Marcus',  issue: 'Issue 10', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&h=700&fit=crop&auto=format' },
  { id: '5', slug: 'magazine-5', name: 'James',   issue: 'Issue 11', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&h=700&fit=crop&auto=format' },
  { id: '6', slug: 'magazine-6', name: 'Leon',    issue: 'Issue 12', image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=500&h=700&fit=crop&auto=format' },
];

function Magazine() {
  const [active, setActive] = useState(0);
  const [noAnim, setNoAnim] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = magCovers.length;

  const COVER_W = 248;
  const STEP = 200;

  const goTo = (next: number) => {
    const clamped = ((next % total) + total) % total;
    const wrapping = (active === total - 1 && clamped === 0) || (active === 0 && clamped === total - 1);
    if (wrapping) {
      setNoAnim(true);
      setTimeout(() => { setActive(clamped); setTimeout(() => setNoAnim(false), 30); }, 20);
    } else {
      setActive(clamped);
    }
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(i => (i + 1) % total);
    }, 4500);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const handleNav = (i: number) => { goTo(i); startTimer(); };

  const arrowBtn = (dir: 'left' | 'right') => ({
    position: 'absolute' as const,
    [dir === 'left' ? 'left' : 'right']: 0,
    zIndex: 20,
    width: '42px', height: '42px', borderRadius: '50%',
    border: '1.5px solid #CCCCCC',
    backgroundColor: 'transparent',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color: '#555555',
    transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
  });

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '80px 0 88px' }}>
      <div className="max-w-[1440px] mx-auto px-10">

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <img src={draftLogo} alt="draft"
            style={{ height: '58px', width: 'auto', display: 'inline-block', marginBottom: '4px' }} />
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800,
            letterSpacing: '0.04em', textTransform: 'uppercase',
            color: '#045350', lineHeight: '1',
          }}>MAGAZINE</div>
        </div>

        {/* Carousel stage */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <button
            aria-label="Previous"
            onClick={() => handleNav(active - 1)}
            style={arrowBtn('left')}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#045350'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#045350'; (e.currentTarget as HTMLButtonElement).style.color = '#ffffff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#CCCCCC'; (e.currentTarget as HTMLButtonElement).style.color = '#555555'; }}
          ><ChevronLeft size={17} strokeWidth={2} /></button>

          {/* All covers — absolutely positioned, slide via translateX */}
          <div style={{ position: 'relative', width: `${COVER_W + STEP * 2 + 80}px`, height: '400px' }}>
            {magCovers.map((cover, i) => {
              const dist = i - active;
              const isCenter = dist === 0;
              const isSide = Math.abs(dist) === 1;
              const scale = isCenter ? 1 : 0.78;
              const opacity = isCenter ? 1 : isSide ? 0.7 : 0;
              const zIndex = isCenter ? 5 : isSide ? 2 : 0;
              const tx = dist * STEP;
              return (
                <div
                  key={cover.id}
                  onClick={() => { if (!isCenter) handleNav(i); }}
                  style={{
                    position: 'absolute',
                    top: '50%', left: '50%',
                    width: `${COVER_W}px`,
                    transform: `translate(calc(-50% + ${tx}px), -50%) scale(${scale})`,
                    opacity,
                    zIndex,
                    pointerEvents: isSide || isCenter ? 'auto' : 'none',
                    transition: noAnim ? 'none' : 'transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease',
                    cursor: isCenter ? 'pointer' : 'pointer',
                  }}
                >
                  <Link
                    to={isCenter ? `/magazines/${cover.slug}` : '#'}
                    onClick={e => { if (!isCenter) e.preventDefault(); }}
                    style={{ textDecoration: 'none', display: 'block' }}
                  >
                  <div style={{
                    position: 'relative', aspectRatio: '2/3', overflow: 'hidden',
                    backgroundColor: '#D8D8D4',
                    boxShadow: isCenter
                      ? '0 24px 64px rgba(0,0,0,0.28), 0 8px 20px rgba(0,0,0,0.14)'
                      : '0 6px 18px rgba(0,0,0,0.13)',
                    outline: isCenter ? '2.5px solid #045350' : 'none',
                    outlineOffset: '-2.5px',
                  }}>
                    <img src={cover.image} alt={cover.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                        filter: isCenter ? 'none' : 'grayscale(20%) brightness(0.88)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%)' }} />
                    <img src={draftLogo} alt="draft" style={{
                      position: 'absolute', top: '10px', left: '10px',
                      height: isCenter ? '18px' : '13px', width: 'auto',
                      filter: 'brightness(0) invert(1)', opacity: 0.9, display: 'block',
                    }} />
                    <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                      <div style={{ fontFamily: "'PT Serif', Georgia, serif", fontStyle: 'italic',
                        fontSize: isCenter ? '17px' : '12px', color: '#ffffff', lineHeight: '1.2' }}>
                        {cover.name}
                      </div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '8px', fontWeight: 600,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.5)', marginTop: '3px' }}>
                        {cover.issue}
                      </div>
                    </div>
                  </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <button
            aria-label="Next"
            onClick={() => handleNav(active + 1)}
            style={arrowBtn('right')}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#045350'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#045350'; (e.currentTarget as HTMLButtonElement).style.color = '#ffffff'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLButtonElement).style.borderColor = '#CCCCCC'; (e.currentTarget as HTMLButtonElement).style.color = '#555555'; }}
          ><ChevronRight size={17} strokeWidth={2} /></button>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '7px', marginTop: '28px' }}>
          {magCovers.map((_, i) => (
            <button key={i} onClick={() => handleNav(i)} style={{
              width: i === active ? '22px' : '7px', height: '7px',
              borderRadius: '4px', border: 'none', padding: 0,
              backgroundColor: i === active ? '#045350' : '#DDDDDD',
              cursor: 'pointer', transition: 'all 0.3s ease',
            }} />
          ))}
        </div>

        {/* VIEW ISSUE */}
        <div style={{ textAlign: 'center', marginTop: '18px' }}>
          <Link
            to={`/magazines/${magCovers[active].slug}`}
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#045350', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              borderBottom: '1.5px solid #045350', paddingBottom: '2px',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            VIEW ISSUE <ArrowRight size={11} />
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