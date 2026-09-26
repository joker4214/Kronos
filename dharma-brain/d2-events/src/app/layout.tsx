import type { Metadata } from "next";
import { Roboto, Italiana } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Company Name Here | Wedding & Event Planning",
  description: "Wedding, corporate, and social event planning in Your Company Name Here. Every button on this site actually works.",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${italiana.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-linen text-ink">
        <div className="w-full bg-red-600 text-white text-center text-xs font-bold uppercase tracking-widest py-2">
          Not a Production Site — Demo Only
        </div>
        <nav className="sticky top-0 z-50 bg-linen/95 backdrop-blur-sm border-b border-ink/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center gap-3">
                <span className="font-display text-2xl tracking-wide">Your Company Name Here</span>
              </Link>
              <div className="hidden md:flex gap-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs uppercase tracking-[0.15em] text-ink/70 hover:text-teal-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/contact"
                className="hidden md:inline-block bg-teal-500 text-linen px-6 py-2.5 text-xs uppercase tracking-[0.15em] hover:bg-teal-600 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="bg-ink text-linen/80 mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              <div>
                <h3 className="font-display text-2xl text-linen mb-4">Your Company Name Here</h3>
                <p className="text-linen/60 text-sm leading-relaxed">There is nothing better than making the biggest day of your life, the best day of your life.</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-gold-400 mb-4">Packages</h4>
                <ul className="space-y-2 text-linen/60 text-sm">
                  <li><Link href="/packages" className="hover:text-linen transition-colors">Full Service Planning</Link></li>
                  <li><Link href="/packages" className="hover:text-linen transition-colors">Partial Planning</Link></li>
                  <li><Link href="/packages" className="hover:text-linen transition-colors">Day-Of Coordination</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-gold-400 mb-4">Quick Links</h4>
                <ul className="space-y-2 text-linen/60 text-sm">
                  <li><Link href="/portfolio" className="hover:text-linen transition-colors">Portfolio</Link></li>
                  <li><Link href="/testimonials" className="hover:text-linen transition-colors">Testimonials</Link></li>
                  <li><Link href="/contact" className="hover:text-linen transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-gold-400 mb-4">Contact</h4>
                <p className="text-linen/60 text-sm">email@yourcompanyname.com</p>
                <p className="text-linen/60 text-sm">Your Phone Here</p>
                <p className="text-linen/60 text-sm">Your Company Name Here</p>
              </div>
            </div>
            <div className="border-t border-linen/15 pt-8 text-center text-linen/40 text-xs uppercase tracking-[0.15em]">
              <p>&copy; 2026 Your Company Name Here. All rights reserved.</p>
              <p className="mt-2 normal-case tracking-normal">
                Site concept by{' '}
                <a href="https://dharmasestheticdesign.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                  Dharma&rsquo;s Esthetic Design
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
