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
  title: "Event Planner, Inc. | Corporate Event Planning",
  description: "Professional event planning services for corporate events, conferences, and celebrations.",
};

const navLinks = [
  { href: "/", label: "Home" },
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
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-ink/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center gap-3">
                <span className="font-display text-2xl tracking-wide">Event Planner, Inc.</span>
              </Link>
              <div className="hidden md:flex gap-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs uppercase tracking-[0.15em] text-ink/70 hover:text-rust-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/contact"
                className="hidden md:inline-block border border-ink text-ink px-6 py-2.5 text-xs uppercase tracking-[0.15em] hover:bg-ink hover:text-cream transition-colors"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="bg-ink text-cream/80 mt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              <div>
                <h3 className="font-display text-2xl text-cream mb-4">Event Planner, Inc.</h3>
                <p className="text-cream/60 text-sm leading-relaxed">Creating memorable corporate events since 2015.</p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-rose-400 mb-4">Services</h4>
                <ul className="space-y-2 text-cream/60 text-sm">
                  <li><Link href="/services" className="hover:text-cream transition-colors">Corporate Events</Link></li>
                  <li><Link href="/services" className="hover:text-cream transition-colors">Conferences</Link></li>
                  <li><Link href="/services" className="hover:text-cream transition-colors">Gala Dinners</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-rose-400 mb-4">Quick Links</h4>
                <ul className="space-y-2 text-cream/60 text-sm">
                  <li><Link href="/portfolio" className="hover:text-cream transition-colors">Portfolio</Link></li>
                  <li><Link href="/testimonials" className="hover:text-cream transition-colors">Testimonials</Link></li>
                  <li><Link href="/contact" className="hover:text-cream transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-[0.15em] text-rose-400 mb-4">Contact</h4>
                <p className="text-cream/60 text-sm">hello@eventplannerinc.com</p>
                <p className="text-cream/60 text-sm">(555) 123-4567</p>
              </div>
            </div>
            <div className="border-t border-cream/15 pt-8 text-center text-cream/40 text-xs uppercase tracking-[0.15em]">
              <p>&copy; 2024 Event Planner, Inc. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
