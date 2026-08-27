import { useParams, Link, Navigate } from 'react-router';
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark } from 'lucide-react';
import { articles } from '../data/content';

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/articles" replace />;

  const related = articles.filter((a) => a.id !== article.id && a.category === article.category).slice(0, 3);
  const otherArticles = articles.filter((a) => a.id !== article.id).slice(0, 5);

  const fallbackContent = [
    `${article.excerpt} This is an extended exploration of the themes introduced above, drawing on research, observation, and conversation with the people shaping this space.`,
    'The forces at work here are not new, but they have reached a particular intensity. A confluence of cultural shifts, economic pressures, and generational preferences has created conditions in which old assumptions no longer hold.',
    'What is striking, when you spend time with the people at the center of this story, is how clear-eyed they are about what they are doing. There is no nostalgia, no longing for the way things were. There is only the question of what comes next, and the discipline to build it.',
    'The details matter. They always do. But what matters more is the intention behind the details — the commitment to a particular idea of what quality means and what it demands.',
    'As the conversation shifts and the language evolves, the core questions remain. Not what is fashionable, but what is true. Not what is trending, but what will last. The answer, as it always is, depends on who you ask — and whether you are asking the right people.',
  ];

  const content = article.content || fallbackContent;

  return (
    <div style={{ backgroundColor: '#FAFAF8' }}>

      {/* ── Hero image ── */}
      <div style={{ position: 'relative', height: '60vh', minHeight: '380px', backgroundColor: '#111111' }}>
        <img
          src={article.image}
          alt={article.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.52 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.72) 100%)' }} />

        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div className="max-w-[1320px] mx-auto px-6 md:px-10 w-full" style={{ paddingBottom: '48px' }}>
            <span style={{
              display: 'inline-block',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '8px', fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: '#b9d7d9',
              border: '1px solid rgba(185,215,217,0.4)', padding: '4px 10px', marginBottom: '16px',
            }}>
              {article.category}
            </span>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(28px, 4.5vw, 52px)', fontWeight: 800,
              letterSpacing: '-0.025em', lineHeight: '1.08',
              color: '#ffffff', marginBottom: '16px', maxWidth: '820px',
            }}>
              {article.title}
            </h1>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: 'italic', fontSize: '16px',
              color: 'rgba(255,255,255,0.58)', lineHeight: '1.6', maxWidth: '540px',
            }}>
              {article.excerpt}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main body + sidebar ── */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '64px', alignItems: 'start', padding: '0' }}>

          {/* ── Article body ── */}
          <div>
            {/* Meta bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', padding: '28px 0', borderBottom: '1px solid #E4E4DE', marginBottom: '44px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={13} style={{ color: '#888888' }} />
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', fontWeight: 600, color: '#111111' }}>{article.author}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#888888' }}>{article.authorTitle}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={13} style={{ color: '#888888' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#888888' }}>{article.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={13} style={{ color: '#888888' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#888888' }}>{article.readTime}</span>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px' }}>
                <button style={{ background: 'none', border: '1px solid #E4E4DE', padding: '6px 10px', cursor: 'pointer', color: '#888888', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  <Share2 size={12} /> Share
                </button>
                <button style={{ background: 'none', border: '1px solid #E4E4DE', padding: '6px 10px', cursor: 'pointer', color: '#888888', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  <Bookmark size={12} /> Save
                </button>
              </div>
            </div>

            {/* Body text */}
            <div style={{ maxWidth: '700px', paddingBottom: '64px' }}>
              {content.map((paragraph, i) => (
                <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', lineHeight: '1.85', color: '#222222', marginBottom: '28px', fontWeight: 300, letterSpacing: '0.005em' }}>
                  {i === 0 ? (
                    <>
                      <span style={{ float: 'left', fontFamily: "'Playfair Display', serif", fontSize: '72px', fontWeight: 700, lineHeight: '0.82', paddingRight: '10px', paddingTop: '8px', color: '#045350' }}>
                        {paragraph.charAt(0)}
                      </span>
                      {paragraph.slice(1)}
                    </>
                  ) : i === 2 ? (
                    <span style={{ display: 'block', borderLeft: '2px solid #51356f', paddingLeft: '28px', fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 400, fontStyle: 'italic', lineHeight: '1.6', color: '#333333', letterSpacing: '0.005em' }}>
                      {paragraph}
                    </span>
                  ) : paragraph}
                </p>
              ))}
            </div>

            {/* Author card */}
            <div style={{ border: '1px solid #E4E4DE', padding: '28px', marginBottom: '64px', display: 'flex', gap: '20px', alignItems: 'flex-start', maxWidth: '700px' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#045350', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '18px', fontWeight: 700, color: '#ffffff' }}>
                {article.author.charAt(0)}
              </div>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '14px', fontWeight: 700, color: '#111111', marginBottom: '3px' }}>{article.author}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#045350', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' }}>{article.authorTitle}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#888888', lineHeight: '1.6', margin: 0 }}>
                  Contributing writer at DRAFT Magazine, covering {article.category.toLowerCase()} with a focus on culture, identity, and the forces shaping how we live.
                </p>
              </div>
            </div>

            {/* Back */}
            <Link to="/articles" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', color: '#888888', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '64px' }}>
              <ArrowLeft size={13} /> Back to Articles
            </Link>
          </div>

          {/* ── Sidebar ── */}
          <div style={{ position: 'sticky', top: '80px', paddingTop: '28px' }}>

            {/* Table of contents */}
            <div style={{ marginBottom: '36px', padding: '20px', backgroundColor: '#ffffff', border: '1px solid #E4E4DE' }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#045350', marginBottom: '14px' }}>
                In this article
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {content.slice(0, 4).map((_, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '18px', height: '1px', backgroundColor: '#D9D9D9', flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#888888' }}>
                      Section {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Share */}
            <div style={{ marginBottom: '36px', padding: '20px', backgroundColor: '#ffffff', border: '1px solid #E4E4DE' }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#045350', marginBottom: '14px' }}>
                Share this story
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Instagram', 'Facebook', 'TikTok', 'Copy link'].map(platform => (
                  <button key={platform} style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#555555', background: 'none', border: '1px solid #E4E4DE', padding: '8px 12px', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FAFAF8')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            {/* Related in sidebar */}
            <div style={{ padding: '20px', backgroundColor: '#ffffff', border: '1px solid #E4E4DE' }}>
              <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#045350', marginBottom: '16px' }}>
                More to read
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {otherArticles.map((a, i) => (
                  <Link key={a.id} to={`/articles/${a.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '12px 0', borderBottom: i < otherArticles.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
                    <div style={{ width: '56px', height: '44px', flexShrink: 0, overflow: 'hidden', backgroundColor: '#E4E4DF' }}>
                      <img src={a.image} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '8px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#045350', marginBottom: '4px' }}>
                        {a.category}
                      </div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '12px', fontWeight: 600, color: '#111111', lineHeight: '1.3' }}>
                        {a.title}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <div style={{ backgroundColor: '#ffffff', padding: '64px 0' }}>
          <div className="max-w-[1320px] mx-auto px-6 md:px-10">
            <div style={{ borderTop: '1px solid #E4E4DE', paddingTop: '32px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#AAAAAA', marginBottom: '6px' }}>
                  Continue Reading
                </p>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '22px', fontWeight: 700, letterSpacing: '-0.01em', color: '#111111' }}>
                  Related in {article.category}
                </h2>
              </div>
              <Link to="/articles" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', color: '#045350', display: 'flex', alignItems: 'center', gap: '5px' }}>
                All Articles <ArrowLeft size={12} style={{ transform: 'rotate(180deg)' }} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
              {related.map((rel) => (
                <Link key={rel.id} to={`/articles/${rel.slug}`} className="group" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div style={{ overflow: 'hidden', backgroundColor: '#E4E4DF', aspectRatio: '4/3', marginBottom: '16px' }}>
                    <img src={rel.image} alt={rel.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                  </div>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '8px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#045350', border: '1px solid #045350', padding: '3px 7px', display: 'inline-block', marginBottom: '10px' }}>
                    {rel.category}
                  </span>
                  <h3 className="group-hover:opacity-60 transition-opacity" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '17px', fontWeight: 700, lineHeight: '1.3', letterSpacing: '-0.01em', color: '#111111', marginBottom: '10px' }}>
                    {rel.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#AAAAAA' }}>{rel.author} · {rel.readTime}</span>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#045350', borderBottom: '1px solid #045350', paddingBottom: '1px' }}>
                      Read More
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}