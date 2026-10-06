'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type PackageKey = 'dayof' | 'partial' | 'full';

const packages: Record<PackageKey, { name: string; tagline: string; bestFor: string; includes: string[] }> = {
  dayof: {
    name: 'Day-Of Coordination',
    tagline: 'You planned it, we run it',
    bestFor: 'Couples who’ve booked everything themselves and need someone managing the actual day.',
    includes: [
      'Planning session 4-6 weeks out to review your plans',
      'Vendor confirmations and final timeline',
      'Full wedding-day coordination',
      'Rehearsal walk-through',
    ],
  },
  partial: {
    name: 'Partial Planning',
    tagline: 'Help where you need it',
    bestFor: 'Couples who have some vendors booked but want support finishing the plan and running the day.',
    includes: [
      'Everything in Day-Of Coordination',
      'Vendor recommendations for anything not yet booked',
      'Budget check-ins',
      'Design and timeline consultation',
    ],
  },
  full: {
    name: 'Full Service Planning',
    tagline: 'Start to finish',
    bestFor: 'Couples who want one person handling everything from the first vendor call to the last dance.',
    includes: [
      'Everything in Partial Planning',
      'Full vendor sourcing and booking support',
      'Unlimited planning meetings',
      'Complete design and floor plan',
      'Two venue walk-throughs',
    ],
  },
};

const order: PackageKey[] = ['dayof', 'partial', 'full'];

export default function Packages() {
  const [selected, setSelected] = useState<PackageKey>('full');
  const pkg = packages[selected];

  return (
    <div className="w-full">
      <section className="px-4 pt-24 pb-16 text-center border-b border-ink/10">
        <motion.p className="text-xs uppercase tracking-[0.3em] text-gold-500 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
          Pick a Package
        </motion.p>
        <motion.h1 className="font-display text-5xl md:text-6xl text-ink mb-6" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
          Three Ways to Book
        </motion.h1>
        <motion.p className="text-ink/60 max-w-xl mx-auto leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
          Click a package to see what&rsquo;s included, then hit book &mdash; the button actually works.
        </motion.p>
      </section>

      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {order.map((key) => {
              const p = packages[key];
              const active = key === selected;
              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className={`text-left p-8 border transition-all cursor-pointer ${active ? 'border-ink bg-ink text-linen' : 'border-ink/15 bg-linen text-ink hover:border-ink/40'}`}
                >
                  <h3 className="font-display text-2xl mb-2">{p.name}</h3>
                  <p className={`text-xs uppercase tracking-[0.15em] ${active ? 'text-linen/60' : 'text-teal-500'}`}>{p.tagline}</p>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-ink/10 p-10 md:p-14"
            >
              <p className="text-ink/60 leading-relaxed mb-8 max-w-2xl">{pkg.bestFor}</p>
              <h4 className="text-xs uppercase tracking-[0.15em] text-gold-500 mb-6">What&rsquo;s Included</h4>
              <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4 mb-10">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-ink/70 leading-relaxed">
                    <span className="text-teal-500 mt-1">&#10003;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-block bg-teal-500 text-linen px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-teal-600 transition-colors">
                Book {pkg.name}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
