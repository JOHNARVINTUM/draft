import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import draftLogo from '../../imports/draft_logo_gram__transparent__-_green.png';

const covers = [
  {
    id: '1', slug: 'cover-1', label: 'COVER 1',
    title: 'Draft Magazine First Cover',
    date: 'June 2026',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '2', slug: 'cover-2', label: 'COVER 2',
    title: 'The Identity Issue',
    date: 'May 2026',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '3', slug: 'cover-3', label: 'COVER 3',
    title: 'The Power Issue',
    date: 'April 2026',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '4', slug: 'cover-4', label: 'COVER 4',
    title: 'The Sports Issue',
    date: 'March 2026',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '5', slug: 'cover-5', label: 'COVER 5',
    title: 'The Fashion Issue',
    date: 'February 2026',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '6', slug: 'cover-6', label: 'COVER 6',
    title: 'The Beauty Issue',
    date: 'January 2026',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '7', slug: 'cover-7', label: 'COVER 7',
    title: 'The Business Issue',
    date: 'December 2025',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '8', slug: 'cover-8', label: 'COVER 8',
    title: 'The Lifestyle Issue',
    date: 'November 2025',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '9', slug: 'cover-9', label: 'COVER 9',
    title: 'The Culture Issue',
    date: 'October 2025',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=820&fit=crop&auto=format',
  },
];

/* ── Section heading with inline divider ──────────────────────────────────── */
function SectionHeading({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '24px' }}>
      <h2 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '10px', fontWeight: 800,
        letterSpacing: '0.24em', textTransform: 'uppercase',
        color: '#045350', margin: 0, whiteSpace: 'nowrap',
      }}>
        {label}
      </h2>
      <div style={{ flex: 1, height: '1px', backgroundColor: '#E4E4DE' }} />
    </div>
  );
}

/* ── Cover card (Previous Covers grid) ───────────────────────────────────── */
function CoverCard({ cover }: { cover: typeof covers[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to={`/covers/${cover.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div style={{
        position: 'relative', aspectRatio: '3/4',
        overflow: 'hidden', backgroundColor: '#E4E4DF',
        marginBottom: '12px',
        boxShadow: hov ? '0 16px 40px rgba(0,0,0,0.14)' : '0 2px 10px rgba(0,0,0,0.07)',
        transition: 'box-shadow 0.35s ease',
      }}>
        <img
          src={cover.image} alt={cover.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hov ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.30) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
          <img src={draftLogo} alt="draft" style={{ height: '11px', filter: 'brightness(0) invert(1)', opacity: 0.85, display: 'block' }} />
        </div>
      </div>
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '15px', fontWeight: 800,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: '#045350',
        marginBottom: '5px',
      }}>
        {cover.label}
      </h3>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '11px', fontWeight: 300,
        color: '#888888', lineHeight: '1.65', margin: 0,
      }}>
        {cover.description.slice(0, 68)}…
      </p>
    </Link>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export function CoversPage() {
  const [featIdx, setFeatIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [sliding, setSliding] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const transRef = useRef(false);
  const idxRef = useRef(0);
  const hoveredRef = useRef(false);

  const DURATION = 650;

  const goTo = (next: number) => {
    if (transRef.current || next === idxRef.current) return;
    transRef.current = true;
    setSliding(true);
    setPrevIdx(idxRef.current);
    idxRef.current = next;
    setFeatIdx(next);
    setTimeout(() => {
      transRef.current = false;
      setSliding(false);
      setPrevIdx(null);
    }, DURATION + 60);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!transRef.current && !hoveredRef.current) {
        goTo((idxRef.current + 1) % covers.length);
      }
    }, 4500);
  };

  const handleDot = (i: number) => { goTo(i); startTimer(); };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const feat = covers[featIdx];
  const prev = prevIdx !== null ? covers[prevIdx] : null;

  const cardInner = (cover: typeof covers[0]) => (
    <div style={{ display: 'flex', alignItems: 'stretch' }}>
      <div style={{ padding: '20px 0 20px 20px', flexShrink: 0 }}>
        <div style={{ width: '150px', aspectRatio: '3/4', overflow: 'hidden', backgroundColor: '#E4E4DF' }}>
          <img
            src={cover.image} alt={cover.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
          />
        </div>
      </div>
      <div style={{ flex: 1, padding: '40px 28px 24px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '20px', fontWeight: 800,
          color: '#045350', lineHeight: '1.2',
          letterSpacing: '-0.01em', marginBottom: '12px',
        }}>
          {cover.title}
        </h3>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px', fontWeight: 300,
          color: '#666666', lineHeight: '1.8', flex: 1,
        }}>
          {cover.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontStyle: 'italic', color: '#045350' }}>
            Read Full Article →
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#CCCCCC', letterSpacing: '0.04em' }}>
            {cover.date}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '56px 40px 52px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>

          {/* Left: single large portrait cover — clickable */}
          <Link to={`/covers/${covers[0].slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{
              border: '1px solid #E0E0E0',
              boxShadow: '0 12px 40px rgba(0,0,0,0.11)',
              overflow: 'hidden',
              flexShrink: 0,
            }}>
              <img
                src={covers[0].image}
                alt="Draft Covers"
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
              />
            </div>
          </Link>

          {/* Right: editorial left-aligned block */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <img
              src={draftLogo}
              alt="draft"
              style={{ height: '90px', width: 'auto', display: 'block', marginBottom: '2px', transform: 'translateX(-10px)' }}
            />
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '28px',
              fontWeight: 800, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#045350',
              margin: '0 0 14px 0', lineHeight: '1',
            }}>
              COVERS
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px', fontWeight: 300,
              color: '#045350', lineHeight: '1.8',
              maxWidth: '260px', margin: 0,
            }}>
              A curated archive of DRAFT's cover stories — visual narratives, original photography, creative concepts, and the featured personalities that define each issue of the magazine.
            </p>
          </div>
        </div>
      </div>

      {/* ── NEW COVERS ── */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 40px 52px' }}>

        <SectionHeading label="New Covers" />

        {/* Slide container */}
        <style>{`
          @keyframes ncSlideIn {
            from { transform: translateX(100%) scale(0.97); opacity: 0; }
            to   { transform: translateX(0)   scale(1);    opacity: 1; }
          }
          @keyframes ncSlideOut {
            from { transform: translateX(0);    opacity: 1; }
            to   { transform: translateX(-100%); opacity: 0; }
          }
        `}</style>
        <div
          style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px' }}
          onMouseEnter={() => { hoveredRef.current = true; }}
          onMouseLeave={() => { hoveredRef.current = false; }}
        >
          {/* Outgoing card */}
          {prev && (
            <Link
              to={`/covers/${prev.slug}`}
              style={{
                textDecoration: 'none', display: 'block',
                position: 'absolute', inset: 0, zIndex: 1,
                animation: `ncSlideOut ${DURATION}ms cubic-bezier(0.4,0,0.2,1) forwards`,
              }}
            >
              <div style={{
                border: '1px solid #E8E8E4', borderRadius: '4px',
                backgroundColor: '#ffffff', boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                overflow: 'hidden', height: '100%',
              }}>
                {cardInner(prev)}
              </div>
            </Link>
          )}

          {/* Incoming card */}
          <Link
            key={featIdx}
            to={`/covers/${feat.slug}`}
            style={{
              textDecoration: 'none', display: 'block', position: 'relative', zIndex: 2,
              animation: sliding ? `ncSlideIn ${DURATION}ms cubic-bezier(0.4,0,0.2,1) forwards` : 'none',
            }}
          >
            <div style={{
              border: '1px solid #E8E8E4', borderRadius: '4px',
              backgroundColor: '#ffffff', boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              overflow: 'hidden',
            }}>
              {cardInner(feat)}
            </div>
          </Link>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '18px' }}>
          {covers.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              style={{
                width: i === featIdx ? '22px' : '7px',
                height: '7px', borderRadius: '4px', border: 'none', padding: 0,
                backgroundColor: i === featIdx ? '#045350' : '#DDDDDD',
                cursor: 'pointer', transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* ── PREVIOUS COVERS ── */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 40px 88px' }}>

        <SectionHeading label="Previous Covers" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px 24px',
        }}>
          {covers.map(cover => (
            <CoverCard key={cover.id} cover={cover} />
          ))}
        </div>

      </div>

    </div>
  );
}
