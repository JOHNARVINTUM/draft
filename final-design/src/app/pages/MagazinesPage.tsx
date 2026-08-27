import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import draftLogo from '../../imports/draft_logo_gram__transparent__-_green.png';

export const magazineIssues = [
  {
    id: '1', slug: 'magazine-1', label: 'MAGAZINE 1',
    issue: 'Issue 12', title: 'The Power Issue',
    subtitle: 'Redefining Influence in the Modern Age',
    description: 'A deep dive into the worlds of culture, style, fashion, and lifestyle. Featuring intimate interviews, genre-defining editorials, and stories from the people shaping the modern age — on the field, on the runway, and in the boardroom.',
    date: 'June 2026', season: 'Spring/Summer 2026', type: 'Print',
    coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=840&fit=crop&auto=format',
  },
  {
    id: '2', slug: 'magazine-2', label: 'MAGAZINE 2',
    issue: 'Issue 11', title: 'The Beauty Issue',
    subtitle: 'Science, Skin & the Future of Glow',
    description: 'Beauty redefined for the modern man — grooming rituals, skincare science, and the aesthetics of effortless style. This issue profiles the faces and formulas setting the standard for the next decade.',
    date: 'May 2026', season: 'Spring/Summer 2026', type: 'Digital',
    coverImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=840&fit=crop&auto=format',
  },
  {
    id: '3', slug: 'magazine-3', label: 'MAGAZINE 3',
    issue: 'Issue 10', title: 'The Sports Issue',
    subtitle: 'Bodies, Minds & the Pursuit of Excellence',
    description: 'The intersection of athletic performance and personal style. Inside: the athletes rewriting the rulebook, training philosophies reshaping competition, and wardrobes built for peak performance.',
    date: 'April 2026', season: 'Spring/Summer 2026', type: 'Print',
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=840&fit=crop&auto=format',
  },
  {
    id: '4', slug: 'magazine-4', label: 'MAGAZINE 4',
    issue: 'Issue 09', title: 'The Fashion Issue',
    subtitle: 'What We Wear & Who We Become',
    description: 'Fashion as identity, culture, and statement. Featuring the designers, tastemakers, and collectors building a new visual language for Filipino men — bold, local, and unapologetically global.',
    date: 'March 2026', season: 'Spring/Summer 2026', type: 'Print',
    coverImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=840&fit=crop&auto=format',
  },
  {
    id: '5', slug: 'magazine-5', label: 'MAGAZINE 5',
    issue: 'Issue 08', title: 'The Business Issue',
    subtitle: 'Capital, Culture & the New Economy',
    description: 'Where ambition meets aesthetics. Entrepreneurs, investors, and creatives building businesses that look as good as they perform — and living lives that prove the two are never separate.',
    date: 'February 2026', season: 'Spring/Summer 2026', type: 'Special',
    coverImage: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=840&fit=crop&auto=format',
  },
  {
    id: '6', slug: 'magazine-6', label: 'MAGAZINE 6',
    issue: 'Issue 07', title: 'The Lifestyle Issue',
    subtitle: 'Slowing Down to Live More',
    description: 'A meditation on the art of living well. Travel, interiors, food, and the quiet luxury of intentional choices. For the man who understands that how you spend your time is the truest measure of your taste.',
    date: 'January 2026', season: 'Spring/Summer 2026', type: 'Digital',
    coverImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&h=840&fit=crop&auto=format',
  },
  {
    id: '7', slug: 'magazine-7', label: 'MAGAZINE 7',
    issue: 'Issue 06', title: 'The Art Issue',
    subtitle: 'Creativity Without Borders',
    description: 'Art as the ultimate act of self-expression. Painters, photographers, sculptors, and digital creators redefining what Filipino creativity looks like on the world stage.',
    date: 'October 2025', season: 'Autumn/Winter 2025', type: 'Print',
    coverImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&h=840&fit=crop&auto=format',
  },
  {
    id: '8', slug: 'magazine-8', label: 'MAGAZINE 8',
    issue: 'Issue 05', title: 'The Identity Issue',
    subtitle: 'Who We Are When No One Is Watching',
    description: 'The most personal issue yet. Stories about self-discovery, reinvention, and the ongoing work of becoming. Honest conversations with men who have faced themselves and built something worth keeping.',
    date: 'September 2025', season: 'Autumn/Winter 2025', type: 'Special',
    coverImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=840&fit=crop&auto=format',
  },
  {
    id: '9', slug: 'magazine-9', label: 'MAGAZINE 9',
    issue: 'Issue 04', title: 'The Travel Issue',
    subtitle: 'Places That Change You',
    description: 'The world seen through the lens of men who move through it with purpose. From the archipelago to the far corners of the globe — destinations, rituals, and stories that shape how we see ourselves.',
    date: 'August 2025', season: 'Autumn/Winter 2025', type: 'Digital',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=840&fit=crop&auto=format',
  },
];

// ── Magazine Card ─────────────────────────────────────────────────────────────
function MagazineCard({ issue }: { issue: typeof magazineIssues[0] }) {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to={`/magazines/${issue.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div style={{
        position: 'relative', aspectRatio: '3/4',
        overflow: 'hidden', borderRadius: '6px',
        marginBottom: '14px', backgroundColor: '#E4E4DF',
        boxShadow: hov
          ? '0 20px 48px rgba(0,0,0,0.18), 0 4px 12px rgba(4,83,80,0.10)'
          : '0 4px 18px rgba(0,0,0,0.09)',
        transition: 'box-shadow 0.35s ease',
      }}>
        <img
          src={issue.coverImage}
          alt={issue.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hov ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', bottom: '11px', right: '11px' }}>
          <img src={draftLogo} alt="draft" style={{ height: '11px', filter: 'brightness(0) invert(1)', opacity: 0.85, display: 'block' }} />
        </div>
      </div>
      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '15px', fontWeight: 800,
        color: '#045350',
        marginBottom: '5px', lineHeight: '1.2',
        letterSpacing: '-0.01em',
        transition: 'color 0.2s',
      }}>
        {issue.title}
      </h3>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '11px', fontWeight: 300,
        color: '#888888', lineHeight: '1.6', margin: 0,
      }}>
        {issue.subtitle}
      </p>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function MagazinesPage() {
  const [featIdx, setFeatIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = (next: number) => {
    setVisible(false);
    setTimeout(() => { setFeatIdx(next); setVisible(true); }, 720);
  };

  const go = (next: number) => {
    if (next === featIdx) return;
    if (timerRef.current) clearInterval(timerRef.current);
    advance(next);
    timerRef.current = setInterval(() => {
      setFeatIdx(i => {
        const n = (i + 1) % magazineIssues.length;
        setVisible(false);
        setTimeout(() => setVisible(true), 720);
        return n;
      });
    }, 5000);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setFeatIdx(i => {
        const n = (i + 1) % magazineIssues.length;
        setVisible(false);
        setTimeout(() => setVisible(true), 720);
        return n;
      });
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const feat = magazineIssues[featIdx];
  const gridItems = magazineIssues.filter((_, i) => i !== featIdx);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', padding: '56px 0 44px' }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '9px', fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#BBBBBB', marginBottom: '10px',
        }}>
          Where the Boys Play
        </p>
        <img
          src={draftLogo}
          alt="draft"
          style={{ height: '52px', width: 'auto', display: 'inline-block', marginBottom: '6px' }}
        />
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '18px', fontWeight: 800,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#045350', margin: 0,
        }}>
          Magazine
        </h1>
      </div>

      {/* ── Featured cover — clickable ── */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 0 20px' }}>
        <Link
          to={`/magazines/${feat.slug}`}
          style={{
            position: 'relative',
            width: '320px', aspectRatio: '3/4',
            borderRadius: '10px', overflow: 'hidden',
            boxShadow: '0 32px 72px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.10)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.96)',
            transition: 'opacity 0.75s ease-in-out, transform 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            display: 'block', textDecoration: 'none', cursor: 'pointer',
          }}
        >
          <img
            src={feat.coverImage}
            alt={feat.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              transition: 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.50) 0%, transparent 55%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '16px', right: '16px', pointerEvents: 'none' }}>
            <img src={draftLogo} alt="draft" style={{ height: '13px', filter: 'brightness(0) invert(1)', opacity: 0.9, display: 'block' }} />
          </div>
          <div style={{
            position: 'absolute', top: '16px', left: '16px', pointerEvents: 'none',
            backgroundColor: 'rgba(4,83,80,0.85)', borderRadius: '3px', padding: '3px 8px',
          }}>
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: '8px', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ffffff',
            }}>
              {feat.issue}
            </span>
          </div>
        </Link>
      </div>

      {/* ── Dots ── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '52px' }}>
        {magazineIssues.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{
              width: i === featIdx ? '22px' : '7px',
              height: '7px', borderRadius: '4px', border: 'none', padding: 0,
              backgroundColor: i === featIdx ? '#045350' : '#DDDDDD',
              cursor: 'pointer', transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* ── Intro — entire block clickable ── */}
      <Link
        to={`/magazines/${feat.slug}`}
        style={{
          maxWidth: '860px', margin: '0 auto', padding: '0 48px 52px',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out',
          display: 'block', textDecoration: 'none', color: 'inherit',
          cursor: 'pointer',
        }}
        onMouseEnter={e => { (e.currentTarget.querySelector('h2') as HTMLElement | null)?.style.setProperty('opacity', '0.75'); }}
        onMouseLeave={e => { (e.currentTarget.querySelector('h2') as HTMLElement | null)?.style.setProperty('opacity', '1'); }}
      >
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '36px', fontWeight: 800,
          letterSpacing: '-0.025em', color: '#045350',
          marginBottom: '8px', lineHeight: '1.1',
          transition: 'opacity 0.2s ease',
        }}>
          {feat.title}
        </h2>
        <p style={{
          fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
          fontSize: '15px', color: '#111111', marginBottom: '18px',
        }}>
          {feat.subtitle}
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 300,
          color: '#555555', lineHeight: '1.85', maxWidth: '540px',
        }}>
          {feat.description}
        </p>
        <div style={{ marginTop: '22px' }}>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#045350',
            display: 'inline-flex', alignItems: 'center', gap: '6px',
          }}>
            Read Full Issue
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="#045350" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>

      {/* ── View More Magazine divider ── */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 48px 36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
          <h3 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '20px', fontWeight: 800,
            color: '#045350', margin: 0, letterSpacing: '-0.01em',
          }}>
            View More Magazine
          </h3>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {[
              { label: 'Home', to: '/' },
              { label: 'Article', to: '/articles' },
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
        <div style={{ height: '1px', backgroundColor: '#E4E4DE' }} />
      </div>

      {/* ── 3-column grid ── */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 48px 100px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px 28px',
        }}>
          {gridItems.map(issue => (
            <MagazineCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default MagazinesPage;
