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
  title: "Event Planner, Inc. | Corporate Event Planning",
  description: "Professional event planning services for corporate events, conferences, and celebrations.",
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
        <nav className="sticky top-0 z-50 bg-white border-b border-gold-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">EP</span>
                </div>
                <span className="text-xl font-bold text-gold-700">Event Planner, Inc.</span>
              </Link>
              <div className="hidden md:flex gap-8">
                <Link href="/" className="text-slate-700 hover:text-gold-600 transition-colors">Home</Link>
                <Link href="/services" className="text-slate-700 hover:text-gold-600 transition-colors">Services</Link>
                <Link href="/portfolio" className="text-slate-700 hover:text-gold-600 transition-colors">Portfolio</Link>
                <Link href="/testimonials" className="text-slate-700 hover:text-gold-600 transition-colors">Testimonials</Link>
                <Link href="/contact" className="text-slate-700 hover:text-gold-600 transition-colors">Contact</Link>
              </div>
              <Link href="/contact" className="hidden md:inline-block bg-gold-500 text-white px-6 py-2 rounded-lg hover:bg-gold-600 transition-colors font-semibold">Get Quote</Link>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="bg-slate-900 text-slate-100 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-gold-400 font-bold mb-4">Event Planner, Inc.</h3>
                <p className="text-slate-300 text-sm">Creating memorable corporate events since 2015.</p>
              </div>
              <div>
                <h4 className="text-gold-400 font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li><Link href="/services" className="hover:text-gold-400">Corporate Events</Link></li>
                  <li><Link href="/services" className="hover:text-gold-400">Conferences</Link></li>
                  <li><Link href="/services" className="hover:text-gold-400">Gala Dinners</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-gold-400 font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li><Link href="/portfolio" className="hover:text-gold-400">Portfolio</Link></li>
                  <li><Link href="/testimonials" className="hover:text-gold-400">Testimonials</Link></li>
                  <li><Link href="/contact" className="hover:text-gold-400">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-gold-400 font-semibold mb-4">Contact</h4>
                <p className="text-slate-300 text-sm">hello@eventplannerinc.com</p>
                <p className="text-slate-300 text-sm">(555) 123-4567</p>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
              <p>&copy; 2024 Event Planner, Inc. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
