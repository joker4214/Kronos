export const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Launch',
    tag: 'Get visible',
    monthlyPrice: 650,
    why: 'Without a starting content push, your store stays invisible while competitors post daily.',
    desc: '7-day TikTok and Facebook ad copy, 7 branded still photo placements, and a hashtag strategy. Everything you need to show up consistently online from day one.',
    stripeUrl: 'https://buy.stripe.com/00w5kDdqiezW0tKgMe2kw00',
    featured: false,
    features: [
      '7-day TikTok ad copy',
      '7-day Facebook ad copy',
      '7 branded photo placements',
      'Hashtag strategy',
      'Social posting guide',
    ],
  },
  {
    id: 'growth',
    name: 'Growth Bundle',
    tag: 'Most popular',
    monthlyPrice: 1450,
    why: "Content alone doesn't convert if your store isn't optimized to capture the traffic it drives.",
    desc: 'Everything in Starter Launch plus a 10-second AI video commercial, GA4 setup, product optimization for up to 10 listings, and on-page SEO.',
    stripeUrl: 'https://buy.stripe.com/7sYeVd85Y4Zm7Wc1Rk2kw01',
    featured: true,
    features: [
      'Everything in Starter, plus:',
      'AI video commercial',
      'GA4 setup & tracking',
      'Product optimization (10)',
      'On-page SEO',
      'Competitor analysis',
    ],
  },
  {
    id: 'agency',
    name: 'Full Agency',
    tag: 'Complete solution',
    monthlyPrice: 2200,
    why: 'Piecing together content, store fixes, and branding separately costs more and takes longer than one coordinated build.',
    desc: 'Everything in Growth Bundle plus Facebook and Instagram page setup, store performance audit, brand enhancement, a blog post, and email marketing setup.',
    stripeUrl: 'https://buy.stripe.com/4gM5kD71U4Zm3FW67A2kw02',
    featured: false,
    features: [
      'Everything in Growth, plus:',
      'Facebook & Instagram setup',
      'Store performance audit',
      'Brand enhancement',
      'Blog post creation',
      'Email marketing setup',
    ],
  },
];

export const PACKAGE_DETAILS = {
  starter: {
    name: 'Starter Launch',
    priceLine: '$650 · Save $150 vs à la carte',
    intro:
      "Get visible on TikTok and Facebook from day one — with professional content, branded visuals, and a posting strategy that makes your store look like it's run by a full marketing team.",
    features: [
      {
        name: '7-day TikTok ad copy',
        why: 'Without consistent posts, the algorithm has nothing to push to new viewers.',
        desc: 'Seven scroll-stopping posts — each with a strong hook, copy targeting store owner pain points, a clear call to action, and a full hashtag set. Delivered as a ready-to-post Google Doc.',
      },
      {
        name: '7-day Facebook ad copy',
        why: 'Facebook audiences respond to a different format than TikTok — reusing the same copy underperforms.',
        desc: "Seven story-driven posts written for Facebook's longer format. Builds trust and drives clicks. Each post includes caption and suggested targeting notes.",
      },
      {
        name: '7 still photo placements',
        why: 'Text-only posts get scrolled past — visuals are what stop the thumb.',
        desc: "Seven branded graphics designed and sized for both TikTok and Facebook. Each pairs with the matching day's copy so every post is complete — text and visual together.",
      },
      {
        name: 'Hashtag and caption strategy',
        why: 'Random hashtags reach nobody — the wrong ones can even suppress your reach.',
        desc: 'A one-page strategy covering which hashtags to use, when to post for best reach, and how to mix content types across 7 days. A system, not just content.',
      },
    ],
    delivery: 'Delivery: 3–5 business days. All files delivered via Google Drive.',
  },
  growth: {
    name: 'Growth Bundle',
    priceLine: '$1,450 · Save $400 vs à la carte',
    intro:
      'Content plus store work — done. The Growth Bundle covers your social presence and your actual store in one package. This is the one most Shopify store owners need.',
    features: [
      {
        name: 'Everything in Starter Launch',
        why: null,
        desc: 'All 7-day TikTok and Facebook ad copy, 7 still photo placements, and hashtag strategy included.',
      },
      {
        name: '10-second AI video commercial',
        why: 'Static posts are easy to scroll past — video is what actually stops feeds and builds recall.',
        desc: 'A live-action AI-generated video ad, ready to run on TikTok, Facebook, or Instagram. Fast, professional, no film crew needed.',
      },
      {
        name: 'GA4 installation and setup',
        why: "Without analytics, you're guessing at what's working instead of knowing.",
        desc: "Google Analytics 4 fully installed and configured on your Shopify store. Goals set. Data flowing. You finally know what's working.",
      },
      {
        name: 'Product optimization (up to 10 listings)',
        why: "Weak titles and descriptions mean shoppers who do land on your store still don't buy.",
        desc: 'Your product titles, descriptions, and structure rewritten for search and conversion. More people find them. More people buy.',
      },
      {
        name: 'On-page SEO',
        why: "Your product pages don't rank, so shoppers never find you searching.",
        desc: 'Meta titles, descriptions, heading structure, and keyword targeting applied across your store pages.',
      },
    ],
    delivery: 'Delivery: 5–7 business days. Dedicated account manager included.',
  },
  agency: {
    name: 'Full Agency',
    priceLine: '$2,200 · Save $700 vs à la carte',
    intro:
      'Everything, done for you. Content, store optimization, branding, social setup, email marketing, and more. One package that covers the entire digital foundation of your business.',
    features: [
      {
        name: 'Everything in Growth Bundle',
        why: null,
        desc: 'All content, video, GA4, product optimization, and SEO included.',
      },
      {
        name: 'Facebook and Instagram page setup',
        why: 'An unclaimed or unbranded page sends new visitors away instead of turning them into followers.',
        desc: 'Fully branded pages — bio, cover, highlights, and link-in-bio — optimized for your audience.',
      },
      {
        name: 'Store performance audit and fixes',
        why: 'A slow or confusing store quietly loses sales you never see in your analytics.',
        desc: 'Speed, user experience, and conversion improvements applied to your live store.',
      },
      {
        name: 'Brand enhancement and positioning',
        why: 'Inconsistent voice and visuals make a store forgettable, even with great products.',
        desc: 'Your brand identity sharpened — voice, positioning, and visual consistency across all channels.',
      },
      {
        name: 'SEO-optimized blog post',
        why: 'Stores with zero written content have nothing for search engines to rank.',
        desc: 'One 800–1,200 word blog post written for your niche, keyword-targeted and ready to publish.',
      },
      {
        name: 'Email marketing setup',
        why: "Without a welcome flow, first-time visitors who don't buy immediately are gone for good.",
        desc: 'Welcome flow built out — three emails that introduce your brand and drive first purchases.',
      },
    ],
    delivery: null,
  },
};

export const WEB_DESIGN_TIERS = [
  {
    tag: 'Solo store / startup',
    name: 'Starter Site',
    price: '$900–$1,200',
    priceNote: 'one-time',
    why: 'A generic template site makes even a great product look unfinished.',
    desc: '1–5 pages, single custom design, mobile-responsive, on-brand from day one.',
  },
  {
    tag: 'Small business',
    name: 'Growth Site',
    price: '$1,800–$2,200',
    priceNote: 'one-time',
    why: "Once you need bookings, email capture, or product feeds, a template can't keep up.",
    desc: '5–10 pages plus custom sections — booking, email capture, product feeds.',
  },
  {
    tag: 'Growing business',
    name: 'Full Custom Site',
    price: '$3,000–$3,500',
    priceNote: 'one-time',
    why: 'Multi-location or e-commerce complexity breaks simple site builders.',
    desc: 'Multi-page build with more complex functionality — e-commerce, multi-location, custom features.',
  },
];

export const MAINTENANCE_PLANS = [
  {
    name: 'Basic Care',
    price: '$39–$59',
    priceNote: '/mo',
    desc: 'Updates, backups, uptime monitoring, minor text/image edits.',
  },
  {
    name: 'Full Care',
    price: '$99–$149',
    priceNote: '/mo',
    desc: 'Everything in Basic, plus security monitoring, a monthly speed/performance check, priority support, and one small update included each month.',
  },
];

// À la carte catalogue. `prereqs` lists item ids where having ANY ONE of them
// in the cart already satisfies the recommendation for this item.
export const ALACARTE_GROUPS = [
  {
    title: 'Content Services',
    items: [
      {
        id: 'tiktok-copy',
        name: '7-day TikTok ad copy',
        price: 200,
        why: 'Without consistent posts, the algorithm has nothing to push to new viewers.',
        prereqs: [],
      },
      {
        id: 'fb-copy',
        name: '7-day Facebook ad copy',
        price: 200,
        why: 'Builds trust with a longer-format audience that TikTok copy alone will miss.',
        prereqs: [],
      },
      {
        id: 'photos',
        name: '7 still photo placements',
        price: 200,
        why: 'Text-only posts get scrolled past — visuals are what stop the thumb.',
        prereqs: [],
      },
      {
        id: 'ai-video',
        name: 'AI video commercial (10 sec)',
        price: 300,
        why: 'Video builds recall in a way static posts alone cannot.',
        prereqs: [],
      },
      {
        id: 'blog',
        name: 'Blog post (SEO optimized)',
        price: 150,
        why: 'Stores with zero written content have nothing for search engines to rank.',
        prereqs: [],
      },
      {
        id: 'daily-posting',
        name: 'Daily posting — 30 days',
        price: 50,
        why: 'Posting daily with nothing ready to post just burns the budget.',
        prereqs: ['tiktok-copy', 'fb-copy', 'photos'],
      },
      {
        id: 'social-ads',
        name: 'Social media ads',
        price: 200,
        why: 'Paid reach on an empty profile just sends strangers to a dead end.',
        prereqs: ['tiktok-copy', 'fb-copy', 'photos'],
      },
      {
        id: 'google-ads',
        name: 'Google ads',
        price: 250,
        why: 'Traffic without a store or store fixed to convert it is money spent for nothing.',
        prereqs: ['tiktok-copy', 'fb-copy', 'photos'],
      },
    ],
  },
  {
    title: 'Store Services',
    items: [
      {
        id: 'ga4',
        name: 'GA4 installation and setup',
        price: 150,
        why: "Without analytics, you're guessing at what's working instead of knowing.",
        prereqs: [],
      },
      {
        id: 'page-setup',
        name: 'Facebook or Instagram page setup',
        price: 200,
        priceLabel: '$200 ea.',
        why: 'An unclaimed or unbranded page sends new visitors away instead of turning them into followers.',
        prereqs: [],
      },
      {
        id: 'audit',
        name: 'Store performance audit and fixes',
        price: 350,
        why: 'A slow or confusing store quietly loses sales you never see in your analytics.',
        prereqs: [],
      },
      {
        id: 'product-opt',
        name: 'Product optimization (10 listings)',
        price: 350,
        why: "Weak titles and descriptions mean shoppers who land on your store still don't buy.",
        prereqs: ['audit'],
      },
      {
        id: 'onpage-seo',
        name: 'On-page SEO',
        price: 100,
        why: "Your product pages don't rank, so shoppers never find you searching.",
        prereqs: [],
      },
      {
        id: 'email-marketing',
        name: 'Email marketing setup',
        price: 500,
        why: "Without a welcome flow, first-time visitors who don't buy immediately are gone for good.",
        prereqs: ['blog', 'onpage-seo'],
      },
      {
        id: 'tiktok-shop',
        name: 'TikTok Shop setup',
        price: 500,
        why: 'A shop pointed at unoptimized listings and no tracking wastes the traffic it gets.',
        prereqs: ['product-opt', 'ga4', 'page-setup'],
      },
      {
        id: 'funnel',
        name: 'Sales funnel',
        price: 300,
        priceLabel: 'From $300',
        why: "A funnel built on top of an unoptimized store just moves shoppers faster toward not buying.",
        prereqs: ['product-opt', 'ga4', 'page-setup'],
      },
    ],
  },
];

export const ALACARTE_ITEM_MAP = ALACARTE_GROUPS.reduce((map, group) => {
  group.items.forEach((item) => {
    map[item.id] = item;
  });
  return map;
}, {});

export const TEAM = [
  {
    name: 'Jason',
    role: 'Founder/CEO',
    roleAccent: true,
    photo: 'founder.jpg',
    contact: { label: 'WhatsApp +1 248 210 4830', href: 'https://wa.me/12482104830' },
  },
  {
    name: 'Shuaib',
    initial: 'S',
    role: 'Store Designer',
    roleAccent: true,
    contact: { label: 'EcomBuildsHub.com', href: 'https://ecombuildshub.com' },
  },
  {
    name: 'Yusuf',
    initial: 'Y',
    role: 'Store Designer',
    roleAccent: true,
  },
  {
    name: 'Mathew',
    initial: 'M',
    role: 'Store Designer',
    roleAccent: true,
    contact: { label: 'WhatsApp +234 805 083 5060', href: 'https://wa.me/2348050835060' },
  },
  {
    name: 'Salman',
    initial: 'Sa',
    role: 'Store Designer',
    roleAccent: true,
    contacts: [
      { label: 'Instagram', href: 'https://www.instagram.com/shopifydevelopment_804?igsh=MW42YjB0bDV0YWh1dg==' },
      { label: 'Facebook', href: 'https://www.facebook.com/share/1E4d1EopEV/' },
    ],
  },
];
