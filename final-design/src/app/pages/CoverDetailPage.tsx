import { useParams, Link, Navigate } from 'react-router';
import draftLogo from '../../imports/draft_logo_gram__transparent__-_green.png';

const covers = [
  {
    id: '1', slug: 'cover-1',
    title: 'Draft Magazine First Cover',
    label: 'COVER 1',
    date: 'June 2026',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '2', slug: 'cover-2',
    title: 'The Identity Issue',
    label: 'COVER 2',
    date: 'May 2026',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '3', slug: 'cover-3',
    title: 'The Power Issue',
    label: 'COVER 3',
    date: 'April 2026',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '4', slug: 'cover-4',
    title: 'The Sports Issue',
    label: 'COVER 4',
    date: 'March 2026',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '5', slug: 'cover-5',
    title: 'The Fashion Issue',
    label: 'COVER 5',
    date: 'February 2026',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '6', slug: 'cover-6',
    title: 'The Beauty Issue',
    label: 'COVER 6',
    date: 'January 2026',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '7', slug: 'cover-7',
    title: 'The Business Issue',
    label: 'COVER 7',
    date: 'December 2025',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '8', slug: 'cover-8',
    title: 'The Lifestyle Issue',
    label: 'COVER 8',
    date: 'November 2025',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '9', slug: 'cover-9',
    title: 'The Culture Issue',
    label: 'COVER 9',
    date: 'October 2025',
    description: "Explore DRAFT's most compelling cover stories, showcasing influential personalities, inspiring narratives that shape culture, fashion, business, sports, and lifestyle.",
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&h=820&fit=crop&auto=format',
  },
];

const bodyContent = [
  'This issue marks a defining moment in DRAFT — a publication born from the intersection of sports culture, personal style, and raw ambition. The cover shoot was conceived as a love letter to the athlete as icon: powerful, studied, effortlessly magnetic.',
  'Shot over two days in Manila, the editorial brings together athletes, gamers, and creatives who embody what it means to play hard and dress harder. Every frame is intentional. Every look, earned.',
  'The man on this cover is not just a face. He is a statement — about what Filipino youth culture looks like when it refuses to be quiet. DRAFT exists for those who live at that intersection: the court and the closet, the arena and the runway.',
  'Inside, you will find long-form features on the athletes reshaping their disciplines, styling guides built for performance-minded men, and profiles of the personalities who are changing the game on and off the field.',
  'We built DRAFT for the reader who is never just one thing. The one who trains at five in the morning and knows exactly what shirt to wear to dinner. The one who follows the league table and the fashion week schedule with equal intensity.',
  'This is where the boys play. Welcome.',
];

const midImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=680&fit=crop&auto=format';

const credits = [
  'Photography by DraftMagazine.ph',
  'Assisted by DraftMagazine.ph',
  'Art Direction by DraftMagazine.ph',
  'Fashion Film by DraftMagazine.ph',
  'Grooming by DraftMagazine.ph',
  'Styling by DraftMagazine.ph',
  'Words by DraftMagazine.ph',
];

export function CoverDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const cover = covers.find((c) => c.slug === slug);

  if (!cover) return <Navigate to="/covers" replace />;

  const readMore = covers.filter((c) => c.slug !== slug).slice(0, 3);
  const midPoint = Math.ceil(bodyContent.length / 2);
  const firstHalf = bodyContent.slice(0, midPoint);
  const secondHalf = bodyContent.slice(midPoint);

  return (
    <div style={{ backgroundColor: '#ffffff' }}>

      {/* ── HEADER ── */}
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '56px 24px 0', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(26px, 4vw, 40px)',
          fontWeight: 800,
          letterSpacing: '-0.025em',
          lineHeight: '1.1',
          color: '#045350',
          marginBottom: '14px',
        }}>
          {cover.title}
        </h1>

        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: '13px',
          color: '#045350',
          marginBottom: '4px',
        }}>
          Authored by DraftMagazine.ph
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          color: '#AAAAAA',
          marginBottom: '22px',
          letterSpacing: '0.02em',
        }}>
          {cover.date}
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          fontWeight: 300,
          color: '#666666',
          lineHeight: '1.8',
          textAlign: 'center',
        }}>
          {cover.description}
        </p>
      </div>

      {/* ── MAIN COVER IMAGE ── */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 24px 0' }}>
        <div style={{
          position: 'relative',
          width: '380px',
          aspectRatio: '3/4',
          overflow: 'hidden',
          backgroundColor: '#E4E4DF',
        }}>
          <img
            src={cover.image}
            alt={cover.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)',
          }} />
          <div style={{ position: 'absolute', bottom: '14px', right: '14px' }}>
            <img src={draftLogo} alt="draft" style={{ height: '13px', filter: 'brightness(0) invert(1)', opacity: 0.9, display: 'block' }} />
          </div>
        </div>
      </div>

      {/* ── BODY — first half ── */}
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '48px 24px 0' }}>
        {firstHalf.map((paragraph, i) => (
          <p key={i} style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13.5px',
            fontWeight: 300,
            lineHeight: '1.9',
            color: '#333333',
            marginBottom: '18px',
            textAlign: 'justify',
          }}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* ── MID IMAGE ── */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '36px 24px' }}>
        <div style={{
          position: 'relative',
          width: '360px',
          aspectRatio: '3/4',
          overflow: 'hidden',
          backgroundColor: '#E4E4DF',
        }}>
          <img
            src={midImage}
            alt="Feature"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
          }} />
          <div style={{ position: 'absolute', bottom: '14px', right: '14px' }}>
            <img src={draftLogo} alt="draft" style={{ height: '13px', filter: 'brightness(0) invert(1)', opacity: 0.9, display: 'block' }} />
          </div>
        </div>
      </div>

      {/* ── BODY — second half ── */}
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 24px' }}>
        {secondHalf.map((paragraph, i) => (
          <p key={i} style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13.5px',
            fontWeight: 300,
            lineHeight: '1.9',
            color: '#333333',
            marginBottom: '18px',
            textAlign: 'justify',
          }}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* ── CREDITS ── */}
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '16px 24px 72px' }}>
        {credits.map((credit) => (
          <p key={credit} style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: 300,
            color: '#BBBBBB',
            lineHeight: '1.9',
            margin: 0,
          }}>
            {credit}
          </p>
        ))}
      </div>

      {/* ── READ MORE COVERS ── */}
      <div style={{ backgroundColor: '#ffffff', padding: '0 40px 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '10px',
          }}>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '22px',
              fontWeight: 800,
              color: '#045350',
              letterSpacing: '-0.01em',
              margin: 0,
            }}>
              More Covers
            </h2>

            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {[
                { label: 'Home', to: '/' },
                { label: 'Magazine', to: '/magazines' },
                { label: 'Articles', to: '/articles' },
              ].map(({ label, to }, i, arr) => (
                <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Link
                    to={to}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#777777', textDecoration: 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#045350')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#777777')}
                  >
                    {label}
                  </Link>
                  {i < arr.length - 1 && <span style={{ color: '#CCCCCC', fontSize: '11px' }}>|</span>}
                </span>
              ))}
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#E4E4DE', marginBottom: '32px' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {readMore.map((c) => (
              <Link
                key={c.id}
                to={`/covers/${c.slug}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  backgroundColor: '#E4E4DF',
                  marginBottom: '14px',
                }}>
                  <img
                    src={c.image}
                    alt={c.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
                    <img src={draftLogo} alt="draft" style={{ height: '12px', filter: 'brightness(0) invert(1)', opacity: 0.85, display: 'block' }} />
                  </div>
                </div>

                <h3 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '18px', fontWeight: 800,
                  color: '#045350', marginBottom: '5px',
                  lineHeight: '1.2', letterSpacing: '-0.01em',
                }}>
                  {c.title}
                </h3>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic', fontSize: '11px',
                  color: '#045350', marginBottom: '2px',
                }}>
                  Authored by DraftMagazine.ph
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '10px', color: '#AAAAAA', marginBottom: '8px',
                }}>
                  {c.date}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px', fontWeight: 300,
                  color: '#666666', lineHeight: '1.7', margin: 0,
                }}>
                  {c.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
