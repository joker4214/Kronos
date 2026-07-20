import { Space_Grotesk, Inter } from 'next/font/google';
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
  title: "Dharma's Esthetic Design Center | Digital Content, Web Design & Store Growth",
  description:
    'AI-generated content, custom web design, Shopify store optimization, and social media services for online store owners. Packages plus à la carte services.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Dharma's Esthetic Design Center",
    description:
      'AI-generated content, custom web design, Shopify store optimization, and social media services for online store owners.',
    url: 'https://dharmasestheticdesign.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
