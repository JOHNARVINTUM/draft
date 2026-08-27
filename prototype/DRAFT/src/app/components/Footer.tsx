import { Link } from "react-router";
import draftIcon from "../../imports/draft_icon-2.png";

const FacebookIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34l-.04-7.13a8.26 8.26 0 004.83 1.54V6.27a4.85 4.85 0 01-1.02-.07z" />
  </svg>
);

const SOCIAL_BG = "rgba(255,255,255,0.15)";

const social = [
  {
    label: "Facebook",
    handle: "@DraftMagazine.ph",
    Icon: FacebookIcon,
    bg: SOCIAL_BG,
  },
  {
    label: "Instagram",
    handle: "@DraftMagazine.ph",
    Icon: InstagramIcon,
    bg: SOCIAL_BG,
  },
  {
    label: "Tiktok",
    handle: "@DraftMagazine.ph",
    Icon: TikTokIcon,
    bg: SOCIAL_BG,
  },
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Covers", to: "/covers" },
  { label: "Magazine", to: "/magazines" },
  { label: "Articles", to: "/articles" },
  { label: "About Us", to: "/about" },
];

const catLinks = [
  "Fashion",
  "Beauty",
  "Business",
  "Sports",
  "Lifestyle",
];

export function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#045350", color: "#ffffff" }}
    >
      {/* ── Top hairline with dot endpoints ── */}
      <div style={{ padding: "60px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0",
          }}
        >
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.55)",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              flex: 1,
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.3)",
            }}
          />
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.55)",
              flexShrink: 0,
            }}
          />
        </div>
      </div>

      {/* ── Body ── */}
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "64px 56px 72px",
          display: "grid",
          gridTemplateColumns: "42% 58%",
          alignItems: "start",
          gap: "0",
        }}
      >
        {/* ── LEFT ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <img
            src={draftIcon}
            alt="draft"
            style={{
              height: "200px",
              width: "auto",
              display: "block",
              filter: "brightness(0) invert(1)",
              marginBottom: "15px",
            }}
          />
          <p
            style={{
              fontFamily:
                "'Cactus Classical Serif', 'PT Serif', Georgia, serif",
              fontSize: "22px",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#ffffff",
              margin: "0 0 3px 0",
              letterSpacing: "0.01em",
              lineHeight: "1.2",
            }}
          >
            Where the Boys Play
          </p>
          <p
            style={{
              fontFamily: "'PT Serif', Georgia, serif",
              fontSize: "13px",
              fontWeight: 400,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.5)",
              margin: 0,
              lineHeight: "1.55",
            }}
          >
            The modern voice of fashion, business &amp;
            lifestyle.
          </p>
        </div>

        {/* ── RIGHT: three equal columns ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1.1fr",
            gap: "0",
          }}
        >
          {/* NAVIGATE */}
          <div>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#ffffff",
                margin: "0 0 18px 0",
              }}
            >
              Navigate
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "11px",
              }}
            >
              {navLinks.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  style={{
                    fontFamily: "'PT Serif', Georgia, serif",
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.72)",
                    textDecoration: "none",
                    lineHeight: "1.4",
                    transition: "color 0.15s",
                    display: "block",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#ffffff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "rgba(255,255,255,0.72)")
                  }
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* CATEGORIES */}
          <div>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#ffffff",
                margin: "0 0 18px 0",
              }}
            >
              Categories
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "11px",
              }}
            >
              {catLinks.map((cat) => (
                <Link
                  key={cat}
                  to={`/articles?category=${cat}`}
                  style={{
                    fontFamily: "'PT Serif', Georgia, serif",
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.72)",
                    textDecoration: "none",
                    lineHeight: "1.4",
                    transition: "color 0.15s",
                    display: "block",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#ffffff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "rgba(255,255,255,0.72)")
                  }
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* FOLLOW US */}
          <div>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#ffffff",
                margin: "0 0 18px 0",
              }}
            >
              Follow Us
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {social.map(({ label, handle, Icon, bg }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "11px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      backgroundColor: bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: "#ffffff",
                    }}
                  >
                    <Icon />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily:
                          "'Plus Jakarta Sans', sans-serif",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#ffffff",
                        lineHeight: "1.25",
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "11px",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.42)",
                        marginTop: "1px",
                        lineHeight: "1.3",
                      }}
                    >
                      {handle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}