import { useParams, Link, Navigate } from 'react-router';
import draftLogo from '../../imports/draft_logo_gram__transparent__-_green.png';
import { articles } from '../data/content';

const categoryMidImages: Record<string, string> = {
  Fashion: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=680&fit=crop&auto=format',
  Beauty: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=680&fit=crop&auto=format',
  Sports: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=680&fit=crop&auto=format',
  Business: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=680&fit=crop&auto=format',
  Lifestyle: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500&h=680&fit=crop&auto=format',
};

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/articles" replace />;

  const readMore = articles.filter((a) => a.id !== article.id).slice(0, 3);

  const content = article.content || [];
  const midPoint = Math.ceil(content.length / 2);
  const firstHalf = content.slice(0, midPoint);
  const secondHalf = content.slice(midPoint);

  const midImage = categoryMidImages[article.category] || categoryMidImages['Fashion'];

  const credits = [
    'Photography by DraftMagazine.ph',
    'Assisted by DraftMagazine.ph',
    'Art Direction by DraftMagazine.ph',
    'Fashion Film by DraftMagazine.ph',
    'Grooming by DraftMagazine.ph',
    'Styling by DraftMagazine.ph',
    'Words by DraftMagazine.ph',
  ];

  return (
    <div style={{ backgroundColor: '#ffffff' }}>

      {/* ── ARTICLE HEADER — centered narrow column ── */}
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
          {article.title}
        </h1>

        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: '13px',
          color: '#045350',
          marginBottom: '4px',
        }}>
          by {article.author}
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '11px',
          color: '#AAAAAA',
          marginBottom: '22px',
          letterSpacing: '0.02em',
        }}>
          {article.date}
        </p>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          fontWeight: 300,
          color: '#666666',
          lineHeight: '1.8',
          textAlign: 'center',
        }}>
          {article.excerpt}
        </p>
      </div>

      {/* ── MAIN COVER IMAGE — centered portrait ── */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 24px 0' }}>
        <div style={{
          position: 'relative',
          width: '380px',
          aspectRatio: '3/4',
          overflow: 'hidden',
          backgroundColor: '#E4E4DF',
        }}>
          <img
            src={article.image}
            alt={article.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)',
          }} />
          <div style={{ position: 'absolute', bottom: '14px', right: '14px' }}>
            <img
              src={draftLogo}
              alt="draft"
              style={{ height: '13px', filter: 'brightness(0) invert(1)', opacity: 0.9, display: 'block' }}
            />
          </div>
        </div>
      </div>

      {/* ── BODY TEXT — first half ── */}
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

      {/* ── MID-ARTICLE IMAGE — centered portrait ── */}
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
            <img
              src={draftLogo}
              alt="draft"
              style={{ height: '13px', filter: 'brightness(0) invert(1)', opacity: 0.9, display: 'block' }}
            />
          </div>
        </div>
      </div>

      {/* ── BODY TEXT — second half ── */}
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

      {/* ── READ MORE ARTICLE ── */}
      <div style={{ backgroundColor: '#ffffff', padding: '0 40px 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Section header */}
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
              Read More Article
            </h2>

            {/* Home | Magazine | Cover links */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
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
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#045350',
                      textDecoration: 'none',
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

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: '#E4E4DE', marginBottom: '32px' }} />

          {/* 3 article cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {readMore.map((rel) => (
              <Link
                key={rel.id}
                to={`/articles/${rel.slug}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                {/* Portrait image */}
                <div style={{
                  position: 'relative',
                  aspectRatio: '3/4',
                  overflow: 'hidden',
                  backgroundColor: '#E4E4DF',
                  marginBottom: '14px',
                }}>
                  <img
                    src={rel.image}
                    alt={rel.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%)',
                  }} />
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
                    <img
                      src={draftLogo}
                      alt="draft"
                      style={{ height: '12px', filter: 'brightness(0) invert(1)', opacity: 0.85, display: 'block' }}
                    />
                  </div>
                </div>

                {/* Card text */}
                <h3 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#045350',
                  marginBottom: '5px',
                  lineHeight: '1.2',
                  letterSpacing: '-0.01em',
                }}>
                  {rel.title}
                </h3>

                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  fontSize: '11px',
                  color: '#045350',
                  marginBottom: '2px',
                }}>
                  by {rel.author}
                </p>

                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '10px',
                  color: '#AAAAAA',
                  marginBottom: '10px',
                }}>
                  Published on {rel.date}
                </p>

                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: 300,
                  color: '#666666',
                  lineHeight: '1.7',
                  margin: 0,
                }}>
                  {rel.excerpt}
                </p>
              </Link>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
