import { useState, useEffect } from 'react';

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34l-.04-7.13a8.26 8.26 0 004.83 1.54V6.27a4.85 4.85 0 01-1.02-.07z" />
  </svg>
);

const socials = [
  { label: 'Facebook',  Icon: FacebookIcon,  href: 'https://facebook.com/draftmagazine' },
  { label: 'Instagram', Icon: InstagramIcon, href: 'https://instagram.com/draft.mag' },
  { label: 'TikTok',   Icon: TikTokIcon,    href: 'https://tiktok.com/@draftmag' },
];

export function SocialSidebar() {
  const [visible, setVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 10px',
        backgroundColor: 'rgba(240,242,242,0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '40px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.35s ease',
      }}
    >
      {socials.map(({ label, Icon, href }, i) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            backgroundColor: hoveredIndex === i ? '#045350' : 'rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: hoveredIndex === i ? '#ffffff' : '#045350',
            textDecoration: 'none',
            transition: 'background-color 0.2s ease, color 0.2s ease',
            boxShadow: hoveredIndex === i
              ? '0 4px 14px rgba(4,83,80,0.35)'
              : '0 1px 4px rgba(0,0,0,0.08)',
          }}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
