import { useParams, Link, Navigate } from 'react-router';
import draftLogo from '../../imports/draft_logo_gram__transparent__-_green.png';
import { magazineIssues } from './MagazinesPage';

const issueBodyContent: Record<string, string[]> = {
  'magazine-1': [
    'Power is no longer a single thing. It has fragmented, distributed itself across industries and disciplines, attached itself to people who would not have been recognized by older definitions of the word.',
    'This issue of DRAFT sets out to document that fragmentation — and to ask what it means for the generation inheriting both the opportunity and the responsibility that comes with it.',
    'The cover shoot was conceived over three weeks of conversation between our creative director and a rotating cast of Filipino men at the intersection of sport, culture, and commerce. Each of them carries something beyond their discipline: a particular presence, a way of inhabiting a room, a refusal to be only one thing.',
    'What emerged is less a fashion story and more a cultural document. The wardrobe is considered, the references layered, the photographs made with the patience that great images require.',
    'Inside, you will find long-form features that resist the easy summary. A profile of an athlete who has become one of the most stylish figures in Southeast Asian digital culture. An interview with a founder who built his company around a single, radical idea about what Filipino men deserve to see when they look at a magazine.',
    'We built DRAFT because we believed there was an audience here — in these islands, in this generation — that deserved a publication as complex and layered as they are. The stories in this issue are true. The style is intentional. Welcome to DRAFT.',
  ],
  'magazine-2': [
    'Beauty, for a long time, was a language spoken at women. Men who engaged with grooming did so quietly, under cover of practicality — skincare framed as maintenance, fragrance framed as professionalism, style framed as anything other than what it was.',
    'That pretense is over. This issue of DRAFT documents the moment when Filipino men stopped apologizing for caring how they look and started building rituals and wardrobes and self-care practices that reflect the complexity of who they actually are.',
    'The science has advanced to meet them. A new generation of dermatologists and cosmetic chemists has produced formulas more sophisticated than anything available a decade ago — products that genuinely work, that can be explained in scientific terms, that reward attention with visible results.',
    'Inside these pages: the ingredients your skin actually needs. The grooming routines of the athletes, entrepreneurs, and creatives setting the standard. The products that have earned their place in the bathroom shelves of people who know what they are doing.',
    'Beauty is not frivolity. It is a form of discipline, and discipline is a form of respect — for yourself, for the people around you, for the time you are taking up in the world.',
    'This issue is a guide. But more than that, it is a permission slip. You are allowed to care.',
  ],
  'magazine-3': [
    'The best athletes in the world are not the ones who train the hardest. They are the ones who understand the full system — preparation, performance, recovery, mentality — and who manage each component with the same precision they bring to the field.',
    'This issue of DRAFT goes inside that system. We spent months with the coaches, physiologists, nutritionists, and the athletes themselves, mapping the invisible architecture that produces excellence.',
    'What we found was not the mythology of pure physical gifts realized through heroic effort. What we found was obsessive, methodical, unglamorous work — and a growing recognition that the recovery between sessions matters as much as the sessions themselves.',
    'We also found style. Because the Filipino athlete of 2026 is not simply a performer. They are a cultural figure, an influence, a person with aesthetic preferences and public presence that extends far beyond the arena.',
    'Inside: the training philosophies reshaping competition. The wardrobes built for peak performance and post-game presence. The mental practices that separate the players who crack under pressure from those who find something extra when it matters most.',
    'Sport is a mirror. What you see in the best of them is a version of what any of us could become with sufficient commitment to the full picture.',
  ],
  'magazine-4': [
    'Fashion is always about something else. The clothes are the surface; underneath are ideas about identity, about belonging, about the image a person wants to project into the world and the image the world projects back.',
    'In the Philippines, right now, fashion is about reclamation. A generation of designers, stylists, and tastemakers is building a visual language that is simultaneously local and global — that draws on Filipino history, aesthetics, and craft while refusing to be limited by any single idea of what Filipino style should look like.',
    'This issue of DRAFT documents that conversation. We spent time with the designers working in the space between tradition and modernity. With the collectors who are building archives of Filipino fashion history. With the men who wear clothes as a form of cultural statement rather than mere covering.',
    'The silhouettes are evolving. The references are expanding. The conversation is becoming more sophisticated, more confident, more interesting.',
    'What emerges from these pages is not a single answer to the question of what Filipino men should wear. It is a set of possibilities — a range of approaches, each coherent on its own terms, each adding something to the collective conversation.',
    'Fashion tells us who we are. This issue is an argument for expanding who that can be.',
  ],
  'magazine-5': [
    'The economy is changing faster than the business schools can document it. The rules that governed wealth creation in the previous generation have been rewritten, in some cases by people still young enough to be starting their careers.',
    'This issue of DRAFT maps the new terrain. We spoke with the founders building businesses that look as good as they perform. With the investors recalibrating their understanding of what sustainable growth means. With the creative entrepreneurs whose work exists at the intersection of culture and commerce in ways that older categories cannot contain.',
    'What connects them is not a particular industry or a specific strategy. It is a posture toward the work — a combination of rigorous thinking and aesthetic consideration that refuses the old separation between the serious and the beautiful.',
    'The most interesting businesses being built today are building identity as much as product. The Filipino founders at the center of this issue understand that how you present yourself and your work is not decoration. It is argument.',
    'Inside: the mindset frameworks that scale. The aesthetic decisions that build brands. The capital allocation strategies that preserve optionality. The personal practices that sustain the people doing the building.',
    'Business is culture. This issue is the evidence.',
  ],
  'magazine-6': [
    'At some point in the past decade, the acceleration of modern life crossed a threshold — from demanding to unsustainable. The signals were everywhere: burnout rates climbing, attention spans collapsing, a widespread and private suspicion that speed had become an end in itself rather than a means to anything.',
    'The response, when it came, did not look like a movement. It looked like individuals making quiet decisions about how they wanted to spend their time.',
    'This issue of DRAFT documents those decisions. We spent time with the men who have reorganized their lives around slowness — who have chosen depth over breadth, presence over productivity, the particular over the general.',
    'Their lives do not look the same. Some have left cities. Some have stayed and simply restructured their days. Some have made sweeping changes; others have made small ones. What they share is a common orientation: toward experience rather than accumulation, toward meaning rather than mere activity.',
    'The homes they have built. The food they cook. The travel they do deliberately rather than compulsively. The relationships they have invested in rather than maintained at surface level.',
    'Slow living is not an aesthetic. It is a philosophy. This issue is an exploration of what that philosophy looks like when it is actually lived.',
  ],
  'magazine-7': [
    'Art is the longest conversation humans have ever had with themselves. Every painting, photograph, sculpture, installation, and screen is a message sent into an uncertain future by someone who believed, against considerable evidence, that the message would land.',
    'This issue of DRAFT documents the Filipino artists who are sending those messages right now — who are working at the intersection of local tradition and global conversation, building bodies of work that belong to this specific place and this specific moment.',
    'We found painters working in scale. Photographers documenting the Filipino archipelago with a rigor and a tenderness that the commercial image has never managed. Digital creators building new visual languages for new platforms without sacrificing the standards that art has always demanded.',
    'We also found the collectors — the people whose passion for Filipino art is both financial and deeply personal, who are building archives that will matter long after the current moment has passed.',
    'Art does not explain a culture. It becomes the culture — the record of what was noticed, what was felt, what was considered worth preserving. The artists in this issue are building that record.',
    'We are fortunate to have them. This issue is our acknowledgment of that fortune.',
  ],
  'magazine-8': [
    'Identity is not something you find. It is something you build, continuously, from the materials available to you — the family you were born into, the choices you made, the experiences that marked you, the stories you told yourself about all of the above.',
    'This is the most personal issue of DRAFT we have ever made. It required us to ask harder questions and to sit with less certain answers. It required us to find men willing to talk honestly about who they are — not the polished version, not the public version, but the ongoing, complicated, unfinished version.',
    'We found them. Their stories are not simple. They involve failure and recalibration. They involve the discovery that the identity they had been performing was not the one they actually inhabited. They involve the slow, difficult work of building something more accurate.',
    'The question of who we are when no one is watching is not trivial. It is the question. Everything else — the career, the relationships, the style, the ambitions — is downstream of the answer.',
    'This issue will not give you that answer. Only you can do that. But it might give you better questions — and the reassurance that the struggle to find them is universal, even when it feels entirely private.',
    'We are all in the middle of becoming. This issue is for everyone who takes that process seriously.',
  ],
  'magazine-9': [
    'The places that change you are rarely the ones you expected. You arrive with an itinerary and return with something else entirely — a recalibrated sense of scale, a new understanding of what you have been taking for granted, a question you cannot stop asking.',
    'This issue of DRAFT is about those places. And about the men who move through the world with enough presence and enough curiosity to let the places do their work.',
    'Travel has been democratized and, in many ways, flattened. The same hotel brands, the same coffee chains, the same Instagram coordinates appearing in feeds from every continent. The traveler who wants something more — something genuine, something that resists the photo and the caption — has to work harder to find it.',
    'The men in this issue have done that work. We followed them to the islands in the Philippine archipelago that have not yet been discovered by the algorithm. To cities in Southeast Asia where the Filipino community is building something remarkable. To places that required more effort than a direct flight and rewarded the effort accordingly.',
    'Inside: destinations that change how you see. Rituals that make travel mean something. The wardrobe for a life in motion. And the quiet argument that moving through the world with intention is one of the most sophisticated things a person can do.',
    'The world is available to you. This issue is about learning to receive it.',
  ],
};

const defaultBodyContent = [
  'This issue arrives at a particular moment — one where the lines between sport, style, and cultural influence have never been more blurred, more interesting, or more charged with possibility. DRAFT has always lived at that intersection. This issue leans into it.',
  'The cover shoot was conceived over three weeks of conversation between our creative director and a rotating cast of Filipino men, each of whom carries something beyond their discipline — a particular presence, a way of inhabiting a room, a refusal to be only one thing.',
  'What emerged is less a fashion story and more a cultural document. These are men in full. The wardrobe is considered, the references layered, the photographs made with the patience that great images require.',
  'Inside, you will find long-form features that resist the easy summary. Stories from the people shaping the modern age — on the field, on the runway, and in the boardroom.',
  'We built DRAFT because we believed there was an audience here — in these islands, in this generation — that deserved a publication as complex and as layered as they are. A magazine that does not explain them to themselves, but rather holds up a mirror and says: yes, this is real, this exists, this is worth documenting.',
  'The stories in this issue are true. The style is intentional. The photographs are evidence. Welcome to DRAFT.',
];

const issueMidImages: Record<string, string> = {
  'magazine-1': 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&h=680&fit=crop&auto=format',
  'magazine-2': 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=680&fit=crop&auto=format',
  'magazine-3': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&h=680&fit=crop&auto=format',
  'magazine-4': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=680&fit=crop&auto=format',
  'magazine-5': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=680&fit=crop&auto=format',
  'magazine-6': 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=680&fit=crop&auto=format',
  'magazine-7': 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&h=680&fit=crop&auto=format',
  'magazine-8': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=680&fit=crop&auto=format',
  'magazine-9': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=680&fit=crop&auto=format',
};

const credits = [
  'Photography by DraftMagazine.ph',
  'Assisted by DraftMagazine.ph',
  'Art Direction by DraftMagazine.ph',
  'Fashion Film by DraftMagazine.ph',
  'Grooming by DraftMagazine.ph',
  'Styling by DraftMagazine.ph',
  'Words by DraftMagazine.ph',
];


export function MagazineDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const mag = magazineIssues.find((m) => m.slug === slug);

  if (!mag) return <Navigate to="/magazines" replace />;

  const midImage = issueMidImages[mag.slug] || mag.coverImage;
  const readMore = magazineIssues.filter((m) => m.slug !== slug).slice(0, 3);
  const bodyContent = issueBodyContent[mag.slug] || defaultBodyContent;
  const midPoint = Math.ceil(bodyContent.length / 2);
  const firstHalf = bodyContent.slice(0, midPoint);
  const secondHalf = bodyContent.slice(midPoint);

  return (
    <div style={{ backgroundColor: '#ffffff' }}>

      {/* ── HEADER ── */}
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '56px 24px 0', textAlign: 'center' }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '9px', fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#BBBBBB', marginBottom: '10px',
        }}>
          {mag.label} &nbsp;·&nbsp; {mag.issue}
        </p>
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 'clamp(26px, 4vw, 40px)',
          fontWeight: 800, letterSpacing: '-0.025em', lineHeight: '1.1',
          color: '#045350', marginBottom: '10px',
        }}>
          {mag.title}
        </h1>
        <p style={{
          fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
          fontSize: '15px', color: '#111111', marginBottom: '14px',
        }}>
          {mag.subtitle}
        </p>
        <p style={{
          fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
          fontSize: '13px', color: '#045350', marginBottom: '4px',
        }}>
          Authored by DraftMagazine.ph
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '11px',
          color: '#AAAAAA', marginBottom: '22px', letterSpacing: '0.02em',
        }}>
          {mag.date} &nbsp;·&nbsp; {mag.season}
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 300,
          color: '#666666', lineHeight: '1.8', textAlign: 'center',
        }}>
          {mag.description}
        </p>
      </div>

      {/* ── MAIN COVER IMAGE ── */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 24px 0' }}>
        <div style={{
          position: 'relative', width: '380px', aspectRatio: '3/4',
          overflow: 'hidden', borderRadius: '8px',
          backgroundColor: '#E4E4DF',
          boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
        }}>
          <img
            src={mag.coverImage}
            alt={mag.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }} />
          <div style={{ position: 'absolute', bottom: '14px', right: '14px' }}>
            <img src={draftLogo} alt="draft" style={{ height: '13px', filter: 'brightness(0) invert(1)', opacity: 0.9, display: 'block' }} />
          </div>
          <div style={{
            position: 'absolute', top: '16px', left: '16px',
            backgroundColor: 'rgba(4,83,80,0.85)', borderRadius: '3px', padding: '3px 8px',
          }}>
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: '8px', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ffffff',
            }}>
              {mag.issue}
            </span>
          </div>
        </div>
      </div>

      {/* ── BODY — first half ── */}
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '48px 24px 0' }}>
        {firstHalf.map((paragraph, i) => (
          <p key={i} style={{
            fontFamily: "'Inter', sans-serif", fontSize: '13.5px', fontWeight: 300,
            lineHeight: '1.9', color: '#333333', marginBottom: '18px', textAlign: 'justify',
          }}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* ── MID IMAGE ── */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '36px 24px' }}>
        <div style={{
          position: 'relative', width: '360px', aspectRatio: '3/4',
          overflow: 'hidden', borderRadius: '6px', backgroundColor: '#E4E4DF',
        }}>
          <img
            src={midImage}
            alt="Feature"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)' }} />
          <div style={{ position: 'absolute', bottom: '14px', right: '14px' }}>
            <img src={draftLogo} alt="draft" style={{ height: '13px', filter: 'brightness(0) invert(1)', opacity: 0.9, display: 'block' }} />
          </div>
        </div>
      </div>

      {/* ── BODY — second half ── */}
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 24px' }}>
        {secondHalf.map((paragraph, i) => (
          <p key={i} style={{
            fontFamily: "'Inter', sans-serif", fontSize: '13.5px', fontWeight: 300,
            lineHeight: '1.9', color: '#333333', marginBottom: '18px', textAlign: 'justify',
          }}>
            {paragraph}
          </p>
        ))}
      </div>

      {/* ── CREDITS ── */}
      <div style={{ maxWidth: '560px', margin: '0 auto', padding: '16px 24px 72px' }}>
        {credits.map((credit) => (
          <p key={credit} style={{
            fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: 300,
            color: '#BBBBBB', lineHeight: '1.9', margin: 0,
          }}>
            {credit}
          </p>
        ))}
      </div>

      {/* ── MORE MAGAZINES ── */}
      <div style={{ backgroundColor: '#ffffff', padding: '0 40px 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '22px', fontWeight: 800,
              color: '#045350', letterSpacing: '-0.01em', margin: 0,
            }}>
              More Magazines
            </h2>
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

          <div style={{ height: '1px', backgroundColor: '#E4E4DE', marginBottom: '32px' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}>
            {readMore.map((m) => (
              <Link
                key={m.id}
                to={`/magazines/${m.slug}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div style={{
                  position: 'relative', aspectRatio: '3/4',
                  overflow: 'hidden', borderRadius: '6px',
                  backgroundColor: '#E4E4DF', marginBottom: '14px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.09)',
                }}>
                  <img
                    src={m.coverImage}
                    alt={m.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
                    <img src={draftLogo} alt="draft" style={{ height: '12px', filter: 'brightness(0) invert(1)', opacity: 0.85, display: 'block' }} />
                  </div>
                </div>
                <h3 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: '17px', fontWeight: 800,
                  color: '#045350', marginBottom: '5px', lineHeight: '1.2',
                }}>
                  {m.title}
                </h3>
                <p style={{
                  fontFamily: "'Playfair Display', serif", fontStyle: 'italic',
                  fontSize: '11px', color: '#045350', marginBottom: '2px',
                }}>
                  Authored by DraftMagazine.ph
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: '10px',
                  color: '#AAAAAA', marginBottom: '8px',
                }}>
                  {m.date}
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 300,
                  color: '#666666', lineHeight: '1.7', margin: 0,
                }}>
                  {m.subtitle}
                </p>
              </Link>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
