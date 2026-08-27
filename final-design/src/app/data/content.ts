export type Category = 'Fashion' | 'Beauty' | 'Business' | 'Sports' | 'Lifestyle';

export interface Article {
  id: string;
  slug: string;
  category: Category;
  title: string;
  excerpt: string;
  author: string;
  authorTitle: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  content?: string[];
}

export interface Magazine {
  id: string;
  issue: string;
  title: string;
  subtitle: string;
  date: string;
  coverImage: string;
  featuredArticles: string[];
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'the-new-era-of-quiet-luxury',
    category: 'Fashion',
    title: 'The New Era of Quiet Luxury',
    excerpt: 'How understated elegance became the defining aesthetic of a generation tired of noise.',
    author: 'Sofia Laurent',
    authorTitle: 'Fashion Director',
    date: 'June 8, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=800&fit=crop&auto=format',
    featured: true,
    content: [
      'There is a particular kind of confidence that comes with wearing nothing remarkable. No logos, no flourishes, no statement pieces designed to announce your presence before you enter the room. It is the confidence of someone who has nothing to prove—and in 2026, that confidence has become the most coveted aesthetic in fashion.',
      'Quiet luxury, as the industry has taken to calling it, is not a trend in the conventional sense. It does not have a season, a single designer behind it, or a definitive moment of origin. It is more accurately described as a posture—a collective exhale from the maximalism that dominated the previous decade.',
      'At its core, quiet luxury is about restraint. Cashmere in neutral tones. Tailoring that fits as though it was made for precisely your body—because it was. Fabrics that reward touch rather than distance. Shoes that make no noise on marble floors. The aesthetic borrows from old money, from the kind of wealth that has been comfortable long enough to stop trying to display itself.',
      'The designers who have most successfully articulated this language—The Row, Loro Piana, Brunello Cucinelli, Bottega Veneta under Matthieu Blazy—share a common philosophy: the garment is the point. Not the billboard, not the collaboration, not the drop. The garment itself, executed with obsessive precision.',
      'But there is a paradox at the heart of quiet luxury that its adherents rarely acknowledge. The restraint costs more than the excess. A perfectly unadorned cashmere coat from Loro Piana signals wealth far more efficiently than any logo could, precisely because it is only legible to those who already know. It is luxury as a closed system, a dialect spoken only within a particular class.',
      'What makes this moment interesting is not that quiet luxury exists—it has always existed—but that it has become aspirational far beyond the circles that can actually afford it. The aesthetic has permeated every corner of fashion, from fast fashion to Instagram to the wardrobes of people who have never owned a piece of cashmere in their lives. The language has leaked out, even as the actual objects remain behind their velvet ropes.',
      'Perhaps that is the most sophisticated thing quiet luxury has ever done: it made restraint feel radical.',
    ],
  },
  {
    id: '2',
    slug: 'inside-the-power-wardrobes',
    category: 'Fashion',
    title: 'Inside the Power Wardrobes of 2026',
    excerpt: 'The women redefining professional dressing on their own terms—and the designers listening.',
    author: 'Marcus Reid',
    authorTitle: 'Senior Fashion Editor',
    date: 'June 5, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=800&fit=crop&auto=format',
    content: [
      'The boardroom has changed. Its uniform has changed with it.',
      'The women who occupy corner offices in 2026 did not inherit a dress code—they arrived to find one in progress and immediately began revising it. The result is a style of professional dressing that is simultaneously more comfortable, more personal, and more commanding than anything that came before.',
      'The shift began, as most genuine shifts do, with necessity. The pandemic had dismantled the idea that authority required a particular silhouette. When the world reopened its offices, the women returning to them found that they no longer felt obligated to perform a version of power that had been designed for someone else.',
      'Designers who understood this early built reputations in the process. Jonathan Simkhai. Gabriela Hearst. Victoria Beckham. Each, in their own way, made clothes that felt serious without feeling severe—garments that acknowledged that the women wearing them had complicated lives and complex preferences and no interest in sacrificing one for the other.',
      'The modern power wardrobe is built around three ideas: fit, fabric, and intention. A trouser that breaks precisely at the ankle. A blazer whose shoulder does not overwhelm. A shirt made from silk with a weight that moves instead of stiffens. The details are small; the cumulative effect is unmistakable.',
      'What these women understand—what this moment is teaching anyone willing to pay attention—is that power was never in the clothes themselves. It was always in the person wearing them.',
    ],
  },
  {
    id: '3',
    slug: 'the-skin-renaissance',
    category: 'Beauty',
    title: 'The Skin Renaissance',
    excerpt: 'A new generation of dermatologists and product chemists is rewriting what skincare can do.',
    author: 'Amara Chen',
    authorTitle: 'Beauty Editor',
    date: 'June 3, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&h=800&fit=crop&auto=format',
    content: [
      'The language of skincare has always borrowed from medicine, but lately the borrowing has become more literal. Peptides, retinoids, ceramides, growth factors—the vocabulary of the modern beauty counter reads like a pharmaceutical catalog, and the products themselves are beginning to match.',
      'This is the skin renaissance: a convergence of dermatological science and consumer culture that is producing a generation of products more sophisticated than anything that came before. The gap between a clinical treatment and a luxury serum has never been narrower.',
      'At the center of this shift are the ingredient formulations. For decades, skincare operated on concentration levels far below what science suggested was effective, constrained by regulation, stability concerns, and the reasonable assumption that consumers would not tolerate the side effects of genuinely active products.',
      'That assumption has been overturned. Driven by a generation that grew up researching ingredients on Reddit and consulting dermatologists on social media, consumers now actively seek out high-concentration actives, understand the concept of the skin barrier, and distinguish between a product that smells good and one that actually works.',
      'The brands that have captured this moment—Augustinus Bader, Medik8, Dr. Barbara Sturm—share a common thread: they were built by or in close collaboration with scientists, and they communicate about their products in scientific terms, without apology.',
    ],
  },
  {
    id: '4',
    slug: 'boardroom-rebels',
    category: 'Business',
    title: 'Boardroom Rebels: How Gen Z is Rewriting Corporate Culture',
    excerpt: 'The youngest executives in history are restructuring power from the inside out.',
    author: 'James Okafor',
    authorTitle: 'Business Editor',
    date: 'May 30, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=800&fit=crop&auto=format',
    content: [
      'The youngest vice president in the history of a major investment bank was twenty-six years old when she restructured her department from a hybrid model into a fully asynchronous workflow. She did not ask permission. She built the proposal, presented the data, and moved forward before the committee had finished deliberating.',
      'This is not unusual anymore. Across industries—finance, technology, media, manufacturing—a generation of executives who grew up with the internet as their native environment is reaching positions of consequence, and they are bringing a different set of assumptions about how work should function.',
      'The assumptions are not simply about remote work or flexible hours, though those are part of it. They are more fundamental. About where authority comes from. About what meetings are for. About who should be in the room when decisions are made. About whether hierarchy is a feature or a bug.',
    ],
  },
  {
    id: '5',
    slug: 'the-art-of-recovery',
    category: 'Sports',
    title: 'The Art of Recovery',
    excerpt: 'Elite athletes are no longer defined by how hard they train, but by how well they rest.',
    author: 'Elena Vasquez',
    authorTitle: 'Sports Correspondent',
    date: 'May 28, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&h=800&fit=crop&auto=format',
    content: [
      'The most important workout of any elite athlete\'s week is the one they don\'t do.',
      'This is counterintuitive until you understand the physiology. Training creates damage—controlled, deliberate damage that the body then repairs, coming back slightly stronger each time. The repair happens not during the workout but after it, during the hours and days of recovery that most amateur athletes treat as wasted time.',
      'Elite athletes have known this for decades. What has changed is the precision with which they now manage the recovery process—and the degree to which that precision has become a competitive advantage in its own right.',
      'The recovery stack of a top professional today looks less like a locker room and more like a medical suite. Cryotherapy chambers maintaining temperatures that would be dangerous without careful protocol. Infrared saunas calibrated to specific wavelengths. Percussion therapy devices tuned to individual muscle frequencies. Sleep tracking systems that generate nightly reports more detailed than most corporate analytics dashboards.',
      'The science behind all of this is genuine, if sometimes oversold by the companies profiting from it. Cold exposure accelerates the reduction of systemic inflammation. Quality sleep triggers growth hormone release at levels no supplement can match. Structured recovery breathing activates the parasympathetic nervous system, shifting the body from catabolic to anabolic state.',
      'What matters is not any individual modality but the culture shift they represent: the understanding that the space between training sessions is not empty space. It is where the athlete is actually made.',
    ],
  },
  {
    id: '6',
    slug: 'slow-living-in-a-fast-world',
    category: 'Lifestyle',
    title: 'Slow Living in a Fast World',
    excerpt: 'The radical act of doing less—and doing it with extraordinary intention.',
    author: 'Priya Sharma',
    authorTitle: 'Lifestyle Editor',
    date: 'May 25, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&auto=format',
    content: [
      'At 6:30 in the morning, before the city has decided what kind of day it intends to be, Marguerite sits at her kitchen table with a cup of tea and nothing else. No phone. No email. No news. For forty-five minutes, she simply sits.',
      'This ritual has taken her years to build and costs her nothing except the time, which is, she will tell you, exactly the point.',
      'Slow living is frequently misunderstood as laziness dressed up in philosophy, or worse, as a luxury available only to those with the means to opt out of ordinary pressures. Neither characterization is accurate. Slow living is not about doing less for the sake of it. It is about doing less in order to do what remains with extraordinary presence.',
      'The movement has roots in the 1980s Slow Food movement founded by Carlo Petrini in response to the opening of a fast food chain near the Spanish Steps in Rome. Petrini\'s argument—that speed had become an end in itself rather than a means to an end—has since expanded far beyond cuisine to encompass every dimension of how we organize our time.',
      'What practitioners share is not a lifestyle but an orientation: a commitment to noticing what is actually happening as it happens, rather than processing it retrospectively in whatever fragment of time remains after the demands of modern efficiency have been met.',
      'The most radical thing about slow living is how unremarkable it looks from the outside. A meal cooked rather than ordered. A walk taken without a podcast. A conversation allowed to last as long as it wants to. The transformation is entirely internal—and, its advocates would say, entirely sufficient.',
    ],
  },
  {
    id: '7',
    slug: 'velvet-season',
    category: 'Fashion',
    title: "Velvet Season: Fall's Most Coveted Textures",
    excerpt: 'Designers are returning to the fabric that defined eras—and reinventing it entirely.',
    author: 'Sofia Laurent',
    authorTitle: 'Fashion Director',
    date: 'May 20, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&h=800&fit=crop&auto=format',
    content: [
      'There are fabrics that survive, and there are fabrics that return. Velvet belongs to the second category—a material that has been periodically declared finished and periodically refused to stay that way.',
      'The current resurgence is different from previous ones in its ambition. Designers are not simply reviving velvet; they are rethinking it from the structure out, questioning assumptions about where it belongs, what it means, and who it is for.',
      'At Bottega Veneta, velvet appears as a suiting fabric in deep burgundy—structured, masculine, worn with the ease of something much lighter. At Valentino, it cascades through eveningwear in shades of midnight and moss that feel simultaneously archaic and completely new. At smaller houses, it turns up in unexpected applications: velvet denim, velvet outerwear, velvet accessories that invite touch the way leather never quite does.',
      'The appeal of velvet at this particular cultural moment is worth examining. We live in an era that prizes the frictionless—materials that wash easily, travel without creasing, function across every context. Velvet refuses all of this. It marks. It crushes. It requires attention.',
      'In that refusal, there is something appealing to a generation that has begun to suspect that frictionlessness is overrated—that the things worth having require a degree of care, and that care itself is a form of pleasure.',
      'To wear velvet well is to commit to the occasion. It is, in the language of quiet luxury, the loudest whisper.',
    ],
  },
  {
    id: '8',
    slug: 'the-clean-beauty-revolution',
    category: 'Beauty',
    title: 'The Clean Beauty Revolution',
    excerpt: 'Ingredient transparency has moved from niche demand to industry standard—and changed everything.',
    author: 'Amara Chen',
    authorTitle: 'Beauty Editor',
    date: 'May 17, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=800&fit=crop&auto=format',
    content: [
      'For most of the history of modern cosmetics, the ingredient list was a secret kept in plain sight. The information was there, printed on every package, but the language was impenetrable to anyone without a chemistry degree, and the industry relied on that impenetrability as a kind of protection.',
      'That protection is gone. The consumer who arrives at the beauty counter today—or, more likely, who scrolls through ingredient databases on their phone before the product even reaches the shelf—knows what they are looking at. They know what parabens are and why some researchers have concerns about them. They know the difference between synthetic and plant-derived fragrance. They know which sunscreen filters are absorbed into the bloodstream and which remain on the surface.',
      'This is the clean beauty revolution: not a single moment or movement, but a sustained shift in the information available to consumers and what they choose to do with it.',
      'The brands that have built businesses on this shift—Beautycounter, Tata Harper, Ilia—share a common vocabulary of transparency. They publish their ingredient standards. They explain their formulation choices. They treat their customers as capable of understanding complexity rather than as passive recipients of marketing language.',
      'Critics of clean beauty rightly point out that "clean" has no regulatory definition, that natural ingredients can be harmful and synthetic ones can be safe, and that the movement sometimes relies on fear rather than science. These critiques are valid. The response from the better companies in the space has been, gradually, to meet science on its own terms—to build formulas that are both clean in their ingredient philosophy and clinically demonstrated to work.',
      'The revolution is incomplete and imperfect. It is also irreversible.',
    ],
  },
  {
    id: '9',
    slug: 'billion-dollar-mindset',
    category: 'Business',
    title: 'Billion Dollar Mindset',
    excerpt: 'What separates founders who scale from those who stall—and why it has nothing to do with the idea.',
    author: 'James Okafor',
    authorTitle: 'Business Editor',
    date: 'May 14, 2026',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop&auto=format',
    content: [
      'The mythology of the founder is by now familiar enough to have become its own genre. A person with a vision, a garage or a dorm room, early rejection, eventual triumph. The mythology is not wrong, exactly—these things do happen—but it is so heavily edited as to be almost useless as a guide to anything.',
      'What the mythology omits is the texture of the middle: the years between the idea and the outcome, when the path is invisible and the tools are inadequate and the primary requirement is not brilliance but a particular quality of attention.',
      'That quality is what investors mean when they use the phrase "founder mindset," and it is considerably harder to define than it is to recognize. It is not optimism, though optimism is part of it. It is not persistence, though persistence is necessary. It is something closer to an orientation toward reality—a willingness to see what is actually happening rather than what you expected or hoped.',
      'The founders who scale share a specific set of behaviors that become visible when you spend time with them. They move slowly in their thinking and quickly in their execution. They hire for judgment rather than experience. They maintain extraordinarily clear internal models of their customer—not demographic profiles but real human beings with specific frustrations and desires.',
      'They are also, almost without exception, obsessive consumers of feedback. Not validation—the distinction matters—but genuine response to whether their product is actually solving the problem they think it is solving.',
      'The billion-dollar outcome, when it comes, is almost always a surprise to the founder. The work was never about the number. The work was about the problem. The number was what happened when the problem was solved well enough.',
    ],
  },
  {
    id: '10',
    slug: 'the-new-athletes',
    category: 'Sports',
    title: 'The New Athletes',
    excerpt: 'A generation of competitors redefining performance, identity, and what sport can mean.',
    author: 'Elena Vasquez',
    authorTitle: 'Sports Correspondent',
    date: 'May 10, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1200&h=800&fit=crop&auto=format',
    content: [
      'Something has shifted in the vocabulary of elite sport, and the shift is easier to feel than to name. The athletes emerging at the highest levels of competition today carry themselves differently from their predecessors—not in terms of physical capability, which continues to improve incrementally, but in terms of how they understand and present what they are doing.',
      'The old model of the athlete was legible and contained. You trained. You competed. You won or lost. The performance was the product, and everything else—the personality, the family, the opinions—was background noise that press officers worked to minimize.',
      'The new model is more complicated and considerably more interesting. The athlete is a complete person whose sport is one dimension of an identity that includes aesthetic sensibilities, cultural references, business interests, and a relationship with their audience that no longer requires mediation by a network or a brand.',
      'Kai Sotto builds his game in Europe while maintaining a Filipino identity that his followers track in real time. Carlos Yulo stands on Olympic podiums while simultaneously existing as a style icon whose wardrobe choices are analyzed with the same attention as his floor routines. Hidilyn Diaz wins gold and then builds a program that will produce the next generation of Filipino weightlifters.',
      'What these athletes share is a refusal to be only athletes. They are practitioners of their sport and participants in their culture, and they have rejected the premise that these roles are in tension.',
      'The teams and federations that understand this early will have a significant advantage. The athletes do not want to be managed. They want to be in partnership.',
    ],
  },
  {
    id: '11',
    slug: 'hotel-living',
    category: 'Lifestyle',
    title: 'Hotel Living: The Modern Nomad',
    excerpt: 'A growing class of professionals has abandoned fixed addresses for a life in motion.',
    author: 'Priya Sharma',
    authorTitle: 'Lifestyle Editor',
    date: 'May 7, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&h=800&fit=crop&auto=format',
    content: [
      'The apartment in Manila was beautiful. The lease was eighteen months. By month four, he had realized his mistake—not in the apartment, which was exactly what the listing had promised, but in the assumption that a fixed address was what he actually wanted.',
      'He broke the lease, put his remaining possessions in a storage unit in Taguig, and has not signed another since.',
      'That was two years ago. In the time since, he has lived in hotels in seven cities across three continents, working remotely as a UX consultant and paying, he will acknowledge with some care, approximately what a good Manila apartment would cost—though the math is complicated by the professional networking that reliably follows from prolonged hotel residency.',
      'He is part of a growing class of professionals who have concluded that permanence is a convention rather than a requirement, and who have restructured their lives around that conclusion. The infrastructure now exists to support them: extended-stay programs, monthly rates competitive with urban rents, hotel loyalty systems that generate meaningful benefits at moderate volumes, a reliable market for high-quality furnished short-term rentals in every significant city.',
      'The practical architecture of this life is more considered than it appears. Hotel living rewards minimalism not as an aesthetic but as a necessity. Everything owned must justify its weight against what could be rented, borrowed, or done without.',
      'What the nomads describe, consistently, is not freedom from responsibility but freedom from accumulation. The relief of owning only what you actually need.',
    ],
  },
  {
    id: '12',
    slug: 'bold-cuts-quiet-statements',
    category: 'Fashion',
    title: 'Bold Cuts, Quiet Statements',
    excerpt: 'The tailors reshaping the silhouette of an era—one precise seam at a time.',
    author: 'Marcus Reid',
    authorTitle: 'Senior Fashion Editor',
    date: 'May 3, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop&auto=format',
    content: [
      'The tailor\'s studio occupies the second floor of a building in Makati that has survived multiple rounds of redevelopment by being too inconspicuous to demolish. The sign at the street level is small. The staircase is narrow. The work inside is extraordinary.',
      'He has been cutting bespoke suits in this space for eleven years, and in that time his client list has grown from small to discreet without any intervention from marketing. His suits reach people the way good things reach people in Manila—by conversation, by observation, by the quiet inquiry that follows when someone notices the way a jacket sits.',
      'He represents a particular tradition of Filipino tailoring that has no single name and has never been widely exported but which has produced, for more than a century, some of the most technically precise menswear in Asia. The tradition borrows from British structure, Italian softness, and a local sensibility about heat and humidity that produces garments with a distinctive lightness without sacrificing formality.',
      'The silhouette he favors is slightly longer in the jacket than is currently fashionable, with a suppressed waist that works in proportion with the extended length. The trousers break cleanly. The chest has structure without padding.',
      'What the suit does, on a man who wears it correctly, is organize his presence without announcing itself. It is, in the vocabulary of contemporary menswear, a quiet statement—one that requires no explanation to those who understand it, and offers none to those who do not.',
      'This is the oldest function of fine tailoring, and the most durable. The clothes make no argument. They simply are.',
    ],
  },
];

export const magazines: Magazine[] = [
  {
    id: '12',
    issue: 'Issue 12',
    title: 'The Power Issue',
    subtitle: 'Redefining Influence in the Modern Age',
    date: 'June 2026',
    coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=900&fit=crop&auto=format',
    featuredArticles: ['the-new-era-of-quiet-luxury', 'boardroom-rebels', 'inside-the-power-wardrobes'],
  },
  {
    id: '11',
    issue: 'Issue 11',
    title: 'The Beauty Issue',
    subtitle: 'Science, Skin & the Future of Glow',
    date: 'May 2026',
    coverImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=900&fit=crop&auto=format',
    featuredArticles: ['the-skin-renaissance', 'the-clean-beauty-revolution'],
  },
  {
    id: '10',
    issue: 'Issue 10',
    title: 'The Sports Issue',
    subtitle: 'Bodies, Minds & the Pursuit of Excellence',
    date: 'April 2026',
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=900&fit=crop&auto=format',
    featuredArticles: ['the-art-of-recovery', 'the-new-athletes'],
  },
  {
    id: '09',
    issue: 'Issue 09',
    title: 'The Fashion Issue',
    subtitle: 'What We Wear & Who We Become',
    date: 'March 2026',
    coverImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=900&fit=crop&auto=format',
    featuredArticles: ['velvet-season', 'bold-cuts-quiet-statements'],
  },
  {
    id: '08',
    issue: 'Issue 08',
    title: 'The Business Issue',
    subtitle: 'Capital, Culture & the New Economy',
    date: 'February 2026',
    coverImage: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=900&fit=crop&auto=format',
    featuredArticles: ['billion-dollar-mindset', 'boardroom-rebels'],
  },
  {
    id: '07',
    issue: 'Issue 07',
    title: 'The Lifestyle Issue',
    subtitle: 'Slowing Down to Live More',
    date: 'January 2026',
    coverImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&h=900&fit=crop&auto=format',
    featuredArticles: ['slow-living-in-a-fast-world', 'hotel-living'],
  },
];

export const categories: Category[] = ['Fashion', 'Beauty', 'Business', 'Sports', 'Lifestyle'];

export const categoryImages: Record<Category, string> = {
  Fashion: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop&auto=format',
  Beauty: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop&auto=format',
  Business: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format',
  Sports: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop&auto=format',
  Lifestyle: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&auto=format',
};
