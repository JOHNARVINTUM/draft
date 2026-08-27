import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X } from 'lucide-react';
import draftLogo from '../../imports/draft_logo_gram__transparent__-_green.png';

const NAV_HEIGHT_BASE = 86;
const NAV_HEIGHT_WITH_CAT = 130;

const navLinks = [
  { label: 'Home',     to: '/' },
  { label: 'Covers',   to: '/covers' },
  { label: 'Magazine', to: '/magazines' },
  { label: 'Articles', to: '/articles' },
  { label: 'About Us', to: '/about' },
];

const categories = ['Fashion', 'Beauty', 'Lifestyle', 'Sport', 'Business'];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const isArticlesArea = location.pathname.startsWith('/articles');

  const activeCat = new URLSearchParams(location.search).get('category');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/articles?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Spacer */}
      <div style={{ height: isArticlesArea ? NAV_HEIGHT_WITH_CAT : NAV_HEIGHT_BASE }} />

      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>

        {/* ── Teal top bar: logo + nav links ─────────────────── */}
        <div style={{ backgroundColor: '#045350' }}>
          <div style={{
            maxWidth: '1440px', margin: '0 auto',
            padding: '18px 40px 14px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: '10px',
          }}>
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'block', lineHeight: 0 }}>
              <img
                src={draftLogo}
                alt="draft"
                style={{ height: '52px', width: 'auto', filter: 'brightness(0) saturate(0) invert(1)', opacity: 0.95 }}
              />
            </Link>

            {/* Nav links */}
            <div className="hidden md:flex" style={{ alignItems: 'center', gap: '40px' }}>
              {navLinks.map(({ label, to }) => {
                const active = isActive(to);
                return (
                  <Link
                    key={to}
                    to={to}
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '11px',
                      fontWeight: active ? 800 : 500,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      color: active ? '#ffffff' : 'rgba(255,255,255,0.58)',
                      transition: 'color 0.2s',
                      paddingBottom: '2px',
                      borderBottom: active ? '1.5px solid rgba(255,255,255,0.6)' : '1.5px solid transparent',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={e => (e.currentTarget.style.color = active ? '#ffffff' : 'rgba(255,255,255,0.58)')}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden absolute right-6 top-5"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffffff', padding: '4px' }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* ── White category + search bar — only on /articles ── */}
        {isArticlesArea && (
          <div style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #E8E8E8',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            <div style={{
              maxWidth: '1440px', margin: '0 auto',
              padding: '0 40px',
              display: 'flex',
              alignItems: 'center',
              height: '44px',
              position: 'relative',
            }}>
              {/* Category links — absolutely centered */}
              <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '48px',
              }}>
                {categories.map(cat => {
                  const active = activeCat === cat;
                  return (
                    <Link
                      key={cat}
                      to={`/articles?category=${cat}`}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px',
                        fontWeight: active ? 600 : 400,
                        color: active ? '#045350' : '#555555',
                        textDecoration: 'none',
                        transition: 'color 0.15s',
                        whiteSpace: 'nowrap',
                        borderBottom: active ? '1.5px solid #045350' : '1.5px solid transparent',
                        paddingBottom: '2px',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#045350')}
                      onMouseLeave={e => (e.currentTarget.style.color = active ? '#045350' : '#555555')}
                    >
                      {cat}
                    </Link>
                  );
                })}
              </div>

              {/* Search bar — pinned to right */}
              <form
                onSubmit={handleSearch}
                style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', position: 'relative' }}
              >
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: '11px', fontWeight: 400,
                    border: '1px solid #E0E0E0',
                    borderRadius: '3px',
                    padding: '5px 32px 5px 12px',
                    outline: 'none',
                    width: '200px',
                    color: '#333333',
                    backgroundColor: '#FAFAFA',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#045350')}
                  onBlur={e => (e.currentTarget.style.borderColor = '#E0E0E0')}
                />
                <button
                  type="submit"
                  style={{ position: 'absolute', right: '9px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="7" cy="7" r="4.5" stroke="#AAAAAA" strokeWidth="1.4" />
                    <path d="M10.5 10.5L13 13" stroke="#AAAAAA" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 49,
          backgroundColor: '#045350',
          paddingTop: `${NAV_HEIGHT_BASE}px`,
        }}>
          <div style={{ padding: '32px 32px', display: 'flex', flexDirection: 'column', gap: '0' }}>
            {navLinks.map(({ label, to }, i) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '28px', fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: isActive(to) ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  textDecoration: 'none',
                  padding: '16px 0',
                  borderBottom: i < navLinks.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}