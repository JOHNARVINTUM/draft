import { useState } from 'react';
import { ChevronLeft, ChevronRight, Facebook, Instagram, Music2 } from 'lucide-react';
import draftLogo from '../../imports/draft_logo_gram__transparent__-_green.png';

const issues = [
  {
    id: '12', issue: 'Issue 12', volume: 'Volume 12',
    title: 'The Power Issue', subtitle: 'Redefining Influence in the Modern Age',
    type: 'Print', date: 'June 2026', year: 2026, season: 'Spring/Summer 2026',
    coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=840&fit=crop&auto=format',
    featuredIn: ['The New Era of Quiet Luxury', 'Boardroom Rebels', 'Inside the Power Wardrobes'],
  },
  {
    id: '11', issue: 'Issue 11', volume: 'Volume 11',
    title: 'The Beauty Issue', subtitle: 'Science, Skin & the Future of Glow',
    type: 'Digital', date: 'May 2026', year: 2026, season: 'Spring/Summer 2026',
    coverImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=840&fit=crop&auto=format',
    featuredIn: ['The Skin Renaissance', 'The Clean Beauty Revolution'],
  },
  {
    id: '10', issue: 'Issue 10', volume: 'Volume 10',
    title: 'The Sports Issue', subtitle: 'Bodies, Minds & the Pursuit of Excellence',
    type: 'Print', date: 'April 2026', year: 2026, season: 'Spring/Summer 2026',
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=840&fit=crop&auto=format',
    featuredIn: ['The Art of Recovery', 'The New Athletes'],
  },
  {
    id: '09', issue: 'Issue 09', volume: 'Volume 09',
    title: 'The Fashion Issue', subtitle: 'What We Wear & Who We Become',
    type: 'Print', date: 'March 2026', year: 2026, season: 'Spring/Summer 2026',
    coverImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=840&fit=crop&auto=format',
    featuredIn: ['Velvet Season', 'Bold Cuts, Quiet Statements'],
  },
  {
    id: '08', issue: 'Issue 08', volume: 'Volume 08',
    title: 'The Business Issue', subtitle: 'Capital, Culture & the New Economy',
    type: 'Special', date: 'February 2026', year: 2026, season: 'Spring/Summer 2026',
    coverImage: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=840&fit=crop&auto=format',
    featuredIn: ['Billion Dollar Mindset', 'Boardroom Rebels'],
  },
  {
    id: '07', issue: 'Issue 07', volume: 'Volume 07',
    title: 'The Lifestyle Issue', subtitle: 'Slowing Down to Live More',
    type: 'Digital', date: 'January 2026', year: 2026, season: 'Spring/Summer 2026',
    coverImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&h=840&fit=crop&auto=format',
    featuredIn: ['Slow Living in a Fast World', 'Hotel Living'],
  },
  {
    id: '06', issue: 'Issue 06', volume: 'Volume 06',
    title: 'The Art Issue', subtitle: 'Creativity Without Borders',
    type: 'Print', date: 'October 2025', year: 2025, season: 'Autumn/Winter 2025',
    coverImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&h=840&fit=crop&auto=format',
    featuredIn: ['The New Abstractionists', 'Form Follows Feeling'],
  },
  {
    id: '05', issue: 'Issue 05', volume: 'Volume 05',
    title: 'The Identity Issue', subtitle: 'Who We Are When No One Is Watching',
    type: 'Special', date: 'September 2025', year: 2025, season: 'Autumn/Winter 2025',
    coverImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=840&fit=crop&auto=format',
    featuredIn: ['The Mirror Test', 'Notes on Becoming'],
  },
  {
    id: '04', issue: 'Issue 04', volume: 'Volume 04',
    title: 'The Travel Issue', subtitle: 'Places That Change You',
    type: 'Digital', date: 'August 2025', year: 2025, season: 'Autumn/Winter 2025',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=840&fit=crop&auto=format',
    featuredIn: ['Departure Lounge', 'The Long Way Round'],
  },
];

function IssueCard({ issue, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{
        overflow: 'hidden', backgroundColor: '#E4E4DF',
        position: 'relative', aspectRatio: '3/4',
        boxShadow: hovered
          ? '0 24px 64px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)'
          : '0 2px 16px rgba(0,0,0,0.07)',
        transition: 'box-shadow 0.45s ease',
        marginBottom: '16px',
      }}>
        <img
          src={issue.coverImage}
          alt={`Magazine ${index + 1}`}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
      </div>

      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '15px', fontWeight: 800, letterSpacing: '0.02em',
        textTransform: 'uppercase', color: '#045350',
        lineHeight: '1.25', marginBottom: '6px', transition: 'opacity 0.25s',
        opacity: hovered ? 0.75 : 1,
      }}>
        Magazine {index + 1}
      </h3>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '12px', fontWeight: 400, color: '#888888',
        lineHeight: '1.6', maxWidth: '260px',
      }}>
        {issue.subtitle}
      </p>
    </div>
  );
}

/* ── COVER CAROUSEL ─────────────────────────────────────────── */

const CARD_W = 230;
const CARD_H = 322; // 3:4.2-ish, matches reference covers
const STEP = 168;     // distance between stacked covers — tight, no gap
const SIDE_SCALE = 0.84;
const FAR_SCALE = 0.7;

function shortestOffset(index, current, len) {
  let raw = index - current;
  if (raw > len / 2) raw -= len;
  if (raw < -len / 2) raw += len;
  return raw;
}

function CoverCarousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const len = slides.length;

  const goTo = (i) => setCurrent(((i % len) + len) % len);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  return (
    <div>
      <div style={{
        position: 'relative',
        height: `${CARD_H + 36}px`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Prev button */}
        <button
          onClick={prev}
          aria-label="Previous cover"
          style={{
            position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
            zIndex: 50, width: '44px', height: '44px', borderRadius: '50%',
            border: '1px solid #111111', backgroundColor: '#FAFAF8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'background-color 0.25s, transform 0.25s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#045350'; e.currentTarget.style.borderColor = '#045350'; e.currentTarget.querySelector('svg').style.stroke = '#ffffff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FAFAF8'; e.currentTarget.style.borderColor = '#111111'; e.currentTarget.querySelector('svg').style.stroke = '#111111'; }}
        >
          <ChevronLeft size={18} style={{ stroke: '#111111', transition: 'stroke 0.25s' }} />
        </button>

        {/* Stack */}
        <div style={{
          position: 'relative', width: `${CARD_W}px`, height: `${CARD_H}px`,
        }}>
          {slides.map((slide, i) => {
            const offset = shortestOffset(i, current, len);
            const abs = Math.abs(offset);
            if (abs > 2) return null;

            const scale = offset === 0 ? 1 : abs === 1 ? SIDE_SCALE : FAR_SCALE;
            const translateX = offset * STEP;
            const zIndex = 30 - abs * 10;
            const opacity = abs <= 2 ? 1 : 0;
            const brightness = offset === 0 ? 1 : 0.72;

            return (
              <div
                key={slide.id}
                onClick={() => offset !== 0 && goTo(i)}
                style={{
                  position: 'absolute', inset: 0,
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s ease, filter 0.6s ease',
                  cursor: offset === 0 ? 'default' : 'pointer',
                  filter: `brightness(${brightness})`,
                  boxShadow: offset === 0
                    ? '0 30px 70px rgba(0,0,0,0.28), 0 8px 24px rgba(0,0,0,0.12)'
                    : '0 12px 30px rgba(0,0,0,0.18)',
                }}
              >
                <img
                  src={slide.coverImage}
                  alt={`Magazine cover ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>

        {/* Next button */}
        <button
          onClick={next}
          aria-label="Next cover"
          style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            zIndex: 50, width: '44px', height: '44px', borderRadius: '50%',
            border: '1px solid #111111', backgroundColor: '#FAFAF8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'background-color 0.25s, transform 0.25s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#045350'; e.currentTarget.style.borderColor = '#045350'; e.currentTarget.querySelector('svg').style.stroke = '#ffffff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FAFAF8'; e.currentTarget.style.borderColor = '#111111'; e.currentTarget.querySelector('svg').style.stroke = '#111111'; }}
        >
          <ChevronRight size={18} style={{ stroke: '#111111', transition: 'stroke 0.25s' }} />
        </button>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '22px' }}>
        {slides.map((slide, i) => {
          const active = i === current;
          return (
            <button
              key={slide.id}
              onClick={() => goTo(i)}
              aria-label={`Go to magazine ${i + 1}`}
              style={{
                width: active ? '26px' : '7px',
                height: '7px',
                borderRadius: '4px',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                backgroundColor: active ? '#045350' : '#D8D8D2',
                transition: 'width 0.4s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ── PAGE ───────────────────────────────────────────────────── */

export function MagazinesPage() {
  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh' }}>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <div style={{ padding: '56px 0 36px', position: 'relative' }}>

        {/* Floating social rail */}
        <div style={{
          position: 'fixed', right: '24px', top: '50%', transform: 'translateY(-50%)',
          zIndex: 60, display: 'flex', flexDirection: 'column', gap: '10px',
          backgroundColor: '#ffffff', borderRadius: '999px', padding: '12px 9px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        }}>
          {[Facebook, Instagram, Music2].map((Icon, i) => (
            <div key={i} style={{
              width: '30px', height: '30px', borderRadius: '50%',
              backgroundColor: '#F1F1EC', display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <Icon size={14} style={{ stroke: '#111111' }} />
            </div>
          ))}
        </div>

        <div className="max-w-[1320px] mx-auto px-6 md:px-10" style={{ textAlign: 'center' }}>
          <img
            src={draftLogo}
            alt="draft"
            style={{ height: '36px', width: 'auto', display: 'inline-block', marginBottom: '6px' }}
          />
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase',
            color: '#045350',
            lineHeight: '1', marginBottom: '40px',
          }}>
            MAGAZINE
          </h1>

          <CoverCarousel slides={issues} />
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div style={{ height: '1px', backgroundColor: '#E4E4DE' }} />
      </div>

      {/* ── ISSUE GRID ────────────────────────────────────────── */}
      <div style={{ padding: '48px 0 100px' }}>
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '56px 32px',
          }}>
            {issues.map((issue, index) => (
              <IssueCard key={issue.id} issue={issue} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MagazinesPage;