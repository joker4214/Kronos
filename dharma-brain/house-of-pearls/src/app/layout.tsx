import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Company Name Here | Luxury Wedding Planning",
  description: "Exquisite wedding planning services for your perfect day.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <div className="w-full bg-red-600 text-white text-center text-xs font-bold uppercase tracking-widest py-2">
          Not a Production Site — Demo Only
        </div>
        <nav className="sticky top-0 z-50 bg-white border-b border-rose-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-serif text-lg">♦</span>
                </div>
                <span className="text-xl font-serif font-bold text-rose-700">Your Company Name Here</span>
              </Link>
              <div className="hidden md:flex gap-8">
                <Link href="/" className="text-slate-700 hover:text-rose-600 transition-colors">Home</Link>
                <Link href="/about" className="text-slate-700 hover:text-rose-600 transition-colors">About</Link>
                <Link href="/services" className="text-slate-700 hover:text-rose-600 transition-colors">Services</Link>
                <Link href="/weddings" className="text-slate-700 hover:text-rose-600 transition-colors">Weddings</Link>
                <Link href="/testimonials" className="text-slate-700 hover:text-rose-600 transition-colors">Testimonials</Link>
                <Link href="/contact" className="text-slate-700 hover:text-rose-600 transition-colors">Contact</Link>
              </div>
              <Link href="/contact" className="hidden md:inline-block bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors font-semibold">Get Started</Link>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="bg-slate-900 text-slate-100 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-rose-400 font-serif font-bold text-lg mb-4">Your Company Name Here</h3>
                <p className="text-slate-300 text-sm">Creating timeless wedding moments since 2012.</p>
              </div>
              <div>
                <h4 className="text-rose-400 font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li><Link href="/services" className="hover:text-rose-400">Wedding Planning</Link></li>
                  <li><Link href="/services" className="hover:text-rose-400">Design & Styling</Link></li>
                  <li><Link href="/services" className="hover:text-rose-400">Coordination</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-rose-400 font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li><Link href="/weddings" className="hover:text-rose-400">Real Weddings</Link></li>
                  <li><Link href="/testimonials" className="hover:text-rose-400">Testimonials</Link></li>
                  <li><Link href="/contact" className="hover:text-rose-400">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-rose-400 font-semibold mb-4">Contact</h4>
                <p className="text-slate-300 text-sm">email@yourcompanyname.com</p>
                <p className="text-slate-300 text-sm">Your Phone Here</p>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
              <p>&copy; 2024 Your Company Name Here. All rights reserved.</p>
              <p className="mt-2">
                Site concept by{' '}
                <a href="https://dharmasestheticdesign.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                  Dharma&apos;s Esthetic Design
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
