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
