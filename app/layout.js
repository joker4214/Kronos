import { Space_Grotesk, Inter } from 'next/font/google';
import Script from 'next/script';
import MotionProvider from '@/components/MotionProvider';
import '@/styles/globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://dharmasestheticdesign.com'),
  title: "Shopify Store Design & Optimization Agency | Dharma's Esthetic Design",
  description:
    'Shopify store design, SEO & social media marketing for ecommerce stores. Custom web design, store optimization & content packages — one-time pricing, no retainers.',
  icons: {
    icon: '/favicon.svg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Shopify Store Design & Optimization Agency | Dharma's Esthetic Design",
    description:
      'Shopify store design, SEO & social media marketing for ecommerce stores. Custom web design, store optimization & content packages — one-time pricing, no retainers.',
    url: 'https://dharmasestheticdesign.com',
    type: 'website',
    images: [{ url: '/ded-post-offer.jpg', width: 1064, height: 895, alt: "Dharma's Esthetic Design — Starter Launch, Growth Bundle, Full Agency packages" }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/ded-post-offer.jpg'],
  },
};

// GTM container "dharmasestheticdesign.com" (created 2026-08-17, under the
// Dharma's Emporium GTM account). Holds the GA4 config tag (property
// "Dharma's Esthetic Design", G-NPZS1Q0X64) and the Meta Pixel base
// code as tags inside GTM instead of hardcoded here, so both fire together
// without double-counting GA4. Covers this React app; the static AI
// Business Empire funnel pages in public/ (quiz.html, starter-kit.html,
// free-map.html) carry their own copy of this same GTM snippet since
// they're outside Next.js's render tree.
const GTM_CONTAINER_ID = 'GTM-5LB46RDG';

// Organization structured data -- site had zero JSON-LD anywhere (found
// 2026-09-22), so nothing tells Google/AI Overviews who's actually behind
// this site. Kept to the one schema type that's true today (an online
// agency, no storefront address) rather than guessing at fields that don't
// apply.
const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: "Dharma's Esthetic Design",
  url: 'https://dharmasestheticdesign.com',
  logo: 'https://dharmasestheticdesign.com/ded-post-offer.jpg',
  email: 'jason@dharmasestheticdesign.com',
  description:
    'Shopify store design, SEO & social media marketing for ecommerce stores.',
  sameAs: [
    'https://instagram.com/dharmasestheticdesign',
    'https://tiktok.com/@dharmasestheticde',
    'https://facebook.com/dharmasestheticdesign',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        {/* Plain <script>, not next/script -- next/script's load strategies inject
            after hydration, so a crawler reading raw HTML would never see it. This
            needs to be in the initial server-rendered markup. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
