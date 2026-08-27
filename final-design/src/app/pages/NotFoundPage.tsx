import { Link } from 'react-router';
import draftLogo from '../../imports/draft_logo_gram__transparent__-_green.png';

export function NotFoundPage() {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 40px',
      textAlign: 'center',
    }}>
      <img
        src={draftLogo}
        alt="draft"
        style={{ height: '64px', width: 'auto', display: 'block', marginBottom: '32px', opacity: 0.3 }}
      />

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '9px', fontWeight: 700,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: '#CCCCCC', marginBottom: '14px',
      }}>
        404
      </p>

      <h1 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: 'clamp(28px, 4vw, 48px)',
        fontWeight: 800, letterSpacing: '-0.02em',
        color: '#045350', marginBottom: '16px', lineHeight: '1.1',
      }}>
        Page Not Found
      </h1>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px', fontWeight: 300,
        color: '#888888', lineHeight: '1.8',
        maxWidth: '360px', marginBottom: '40px',
      }}>
        The page you're looking for has moved, been removed, or never existed. Let's get you back to the game.
      </p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { label: 'Home', to: '/' },
          { label: 'Articles', to: '/articles' },
          { label: 'Covers', to: '/covers' },
          { label: 'Magazine', to: '/magazines' },
        ].map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: '#045350', textDecoration: 'none',
              border: '1px solid #045350',
              borderRadius: '2px',
              padding: '10px 20px',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#045350';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#045350';
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
