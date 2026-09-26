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
  title: "Your Company Name Here | Corporate & Community Event Management",
  description: "Ten years managing corporate, government, and community events across Michigan. Current, active, and still here.",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Programs" },
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
      <body className="min-h-full flex flex-col bg-mist text-navy">
        <div className="w-full bg-red-600 text-white text-center text-xs font-bold uppercase tracking-widest py-2">
          Not a Production Site — Demo Only
        </div>
        <nav className="sticky top-0 z-50 bg-mist/95 backdrop-blur-sm border-b border-navy/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center gap-3">
                <span className="font-display text-xl tracking-wide">Your Company Name Here</span>
              </Link>
              <div className="hidden md:flex gap-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs uppercase tracking-[0.15em] text-navy/70 hover:text-gold-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/contact"
                className="hidden md:inline-block bg-navy text-mist px-6 py-2.5 text-xs uppercase tracking-[0.15em] hover:bg-gold-500 hover:text-navy transition-colors"
              >
                Request a Consultation
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="bg-navy text-mist/80 mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              <div>
                <h3 className="font-display text-xl text-mist mb-4">Your Company Name Here</h3>
                <p className="text-mist/60 text-sm leading-relaxed">Ten years managing corporate, government, and community events across Michigan.</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-gold-400 mb-4">Programs</h4>
                <ul className="space-y-2 text-mist/60 text-sm">
                  <li><Link href="/packages" className="hover:text-mist transition-colors">Single Event Production</Link></li>
                  <li><Link href="/packages" className="hover:text-mist transition-colors">Annual Program Partnership</Link></li>
                  <li><Link href="/packages" className="hover:text-mist transition-colors">Full-Service Event Management</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-gold-400 mb-4">Quick Links</h4>
                <ul className="space-y-2 text-mist/60 text-sm">
                  <li><Link href="/portfolio" className="hover:text-mist transition-colors">Portfolio</Link></li>
                  <li><Link href="/testimonials" className="hover:text-mist transition-colors">Testimonials</Link></li>
                  <li><Link href="/contact" className="hover:text-mist transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-gold-400 mb-4">Contact</h4>
                <p className="text-mist/60 text-sm">email@yourcompanyname.com</p>
                <p className="text-mist/60 text-sm">Your Phone Here</p>
                <p className="text-mist/60 text-sm">Your Company Name Here</p>
              </div>
            </div>
            <div className="border-t border-mist/15 pt-8 text-center text-mist/40 text-xs uppercase tracking-[0.15em]">
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
