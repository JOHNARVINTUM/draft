import { useState } from 'react';

type CoverType = 'Print' | 'Digital' | 'Limited';

interface Cover {
  id: string;
  title: string;
  subtitle?: string;
  type: CoverType;
  volume: string;
  date: string;
  image: string;
}

const covers: Cover[] = [
  {
    id: '1',
    title: 'The Symmetry Issue',
    type: 'Print',
    volume: 'Volume 12',
    date: 'March 2024',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '2',
    title: 'Digital Solitude',
    subtitle: 'Special Edition',
    type: 'Digital',
    volume: 'Special Edition',
    date: 'Jan 2024',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '3',
    title: 'Materiality & Form',
    type: 'Print',
    volume: 'Volume 11',
    date: 'Nov 2023',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '4',
    title: 'The Power Issue',
    type: 'Print',
    volume: 'Volume 10',
    date: 'Aug 2023',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '5',
    title: 'Soft Architecture',
    subtitle: 'Summer Special',
    type: 'Limited',
    volume: 'Limited Edition',
    date: 'Jun 2023',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '6',
    title: 'The Identity Issue',
    type: 'Digital',
    volume: 'Volume 9',
    date: 'May 2023',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '7',
    title: 'Chromatic Shift',
    type: 'Print',
    volume: 'Volume 8',
    date: 'Mar 2023',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '8',
    title: 'Quiet Luxury',
    subtitle: 'Winter Special',
    type: 'Limited',
    volume: 'Limited Edition',
    date: 'Dec 2022',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '9',
    title: 'The Future Issue',
    type: 'Digital',
    volume: 'Volume 7',
    date: 'Nov 2022',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '10',
    title: 'New Modernism',
    type: 'Print',
    volume: 'Volume 6',
    date: 'Aug 2022',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '11',
    title: 'The Art of Restraint',
    type: 'Print',
    volume: 'Volume 5',
    date: 'May 2022',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&h=820&fit=crop&auto=format',
  },
  {
    id: '12',
    title: "Surface Tensions",
    subtitle: "Collector's Edition",
    type: 'Limited',
    volume: 'Limited Edition',
    date: 'Feb 2022',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=820&fit=crop&auto=format',
  },
];

const typeStyle: Record<CoverType, { color: string; border: string }> = {
  Print:   { color: '#045350', border: '#045350' },
  Digital: { color: '#51356f', border: '#51356f' },
  Limited: { color: '#111111', border: '#111111' },
};

function CoverCard({ cover }: { cover: Cover }) {
  const [hovered, setHovered] = useState(false);
  const c = typeStyle[cover.type];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{
        overflow: 'hidden',
        backgroundColor: '#E4E4DF',
        position: 'relative',
        aspectRatio: '3/4',
        boxShadow: hovered
          ? '0 20px 60px rgba(0,0,0,0.16), 0 4px 16px rgba(0,0,0,0.08)'
          : '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.45s ease',
        marginBottom: '16px',
      }}>
        <img
          src={cover.image}
          alt={cover.title}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />

        {/* Hover reveal */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundColor: 'rgba(0,0,0,0.38)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: '#ffffff', border: '1px solid rgba(255,255,255,0.6)', padding: '10px 22px',
            transform: hovered ? 'translateY(0)' : 'translateY(6px)',
            transition: 'transform 0.35s ease',
          }}>
            View Issue
          </span>
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '6px' }}>
        <h3 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em',
          color: hovered ? '#045350' : '#111111',
          lineHeight: '1.25', transition: 'color 0.25s',
        }}>
          {cover.title}
        </h3>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '8px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: c.color, border: `1px solid ${c.border}`,
          padding: '3px 7px', whiteSpace: 'nowrap', flexShrink: 0, marginTop: '2px',
        }}>
          {cover.type}
        </span>
      </div>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '10px', fontWeight: 400, letterSpacing: '0.06em',
        textTransform: 'uppercase', color: '#AAAAAA',
      }}>
        {cover.subtitle ? `${cover.subtitle} — ${cover.date}` : `${cover.volume} — ${cover.date}`}
      </div>
    </div>
  );
}

export function CoversPage() {
  return (
    <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh' }}>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <div style={{ padding: '64px 0 40px' }}>
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'flex-end', gap: '32px' }}>
            <div>
              <h1 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: 800, letterSpacing: '-0.03em', color: '#111111',
                lineHeight: '1.05', marginBottom: '16px',
              }}>
                The Covers
              </h1>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px', fontWeight: 300, color: '#777777',
                lineHeight: '1.7', maxWidth: '480px', letterSpacing: '0.01em',
              }}>
                A curated archive of visual narratives. Explore the evolution of DRAFT through our definitive collection of printed editions and special digital releases.
              </p>
            </div>
            <div style={{ textAlign: 'right', paddingBottom: '4px' }}>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: '#045350', marginBottom: '6px',
              }}>
                Current Edition
              </div>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em', color: '#045350',
              }}>
                Spring/Summer 2024
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div style={{ height: '1px', backgroundColor: '#E4E4DE' }} />
      </div>

      {/* ── COVER GRID ────────────────────────────────────────── */}
      <div style={{ padding: '48px 0 100px' }}>
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '48px 32px',
          }}>
            {covers.map((cover) => (
              <CoverCard key={cover.id} cover={cover} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
