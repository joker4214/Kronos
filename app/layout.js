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
  title: "Shopify Store Design & Optimization Agency | Dharma's Esthetic Design Center",
  description:
    'Shopify store design, SEO & social media marketing for ecommerce stores. Custom web design, store optimization & content packages — one-time pricing, no retainers.',
  icons: {
    icon: '/favicon.svg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Shopify Store Design & Optimization Agency | Dharma's Esthetic Design Center",
    description:
      'Shopify store design, SEO & social media marketing for ecommerce stores. Custom web design, store optimization & content packages — one-time pricing, no retainers.',
    url: 'https://dharmasestheticdesign.com',
    type: 'website',
    images: [{ url: '/ded-post-offer.jpg', width: 1064, height: 895, alt: "Dharma's Esthetic Design Center — Starter Launch, Growth Bundle, Full Agency packages" }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/ded-post-offer.jpg'],
  },
};

// GA4 property "Dharma's Esthetic Design Center" (created 2026-08-06, under
// the same Google account as the Ecombuildshub properties). Covers this
// React app; the static AI Business Empire funnel pages in public/
// (quiz.html, starter-kit.html, free-map.html) carry their own copy of this
// same snippet since they're outside Next.js's render tree.
const GA_MEASUREMENT_ID = 'G-NPZS1Q0X64';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
