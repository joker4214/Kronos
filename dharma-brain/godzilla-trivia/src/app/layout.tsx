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
  title: "Kaiju Archive | Godzilla Facts, Kaiju & Trivia",
  description:
    "Facts, foes, and a trivia challenge for anyone who has ever cheered while Tokyo burned.",
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
      <body className="min-h-full flex flex-col bg-[#0b0f0c] text-[#eafbee]">
        <nav className="sticky top-0 z-50 bg-[#0b0f0c]/90 backdrop-blur border-b border-kaiju-800/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-kaiju-400 text-2xl">☢</span>
                <span className="text-xl font-black uppercase tracking-widest text-glow">
                  Kaiju Archive
                </span>
              </Link>
              <div className="flex gap-6 text-sm font-semibold uppercase tracking-wide">
                <Link href="/" className="hover:text-kaiju-400 transition-colors">
                  Home
                </Link>
                <Link href="/kaiju" className="hover:text-kaiju-400 transition-colors">
                  Kaiju
                </Link>
                <Link href="/trivia" className="hover:text-kaiju-400 transition-colors">
                  Trivia
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-kaiju-900/60 mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center text-sm text-[#eafbee]/50">
            <p>
              Godzilla, King Kong, and all associated kaiju are trademarks of Toho Co., Ltd.,
              Legendary Pictures, and their respective rights holders. Kaiju Archive is an
              unofficial fan reference built for trivia and education.
            </p>
            <p className="mt-3">
              <Link href="/trivia" className="text-kaiju-400 hover:underline">
                Take the trivia quiz →
              </Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
