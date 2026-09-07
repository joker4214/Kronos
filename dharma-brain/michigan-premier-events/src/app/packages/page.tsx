'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type ProgramKey = 'single' | 'annual' | 'full';

const programs: Record<ProgramKey, { name: string; tagline: string; bestFor: string; includes: string[] }> = {
  single: {
    name: 'Single Event Production',
    tagline: 'One event, fully managed',
    bestFor: 'Organizations running a gala, conference, or fundraiser who need one event handled start to finish.',
    includes: [
      'Venue sourcing and logistics',
      'Vendor coordination',
      'Day-of event management team',
      'Post-event debrief and reporting',
    ],
  },
  annual: {
    name: 'Annual Program Partnership',
    tagline: 'Ongoing events, one team',
    bestFor: 'Chambers, associations, and institutions running the same events year after year.',
    includes: [
      'Everything in Single Event Production',
      'Standing planning calendar across the year',
      'Consistent team across every event',
      'Sponsor and stakeholder coordination',
    ],
  },
  full: {
    name: 'Full-Service Event Management',
    tagline: 'Your outsourced events department',
    bestFor: 'Organizations with heavy event volume who want a dedicated partner, not a vendor.',
    includes: [
      'Everything in Annual Program Partnership',
      'Dedicated account lead',
      'Budget tracking and reporting across all events',
      'Large-scale logistics (900+ participant events)',
    ],
  },
};

const order: ProgramKey[] = ['single', 'annual', 'full'];

export default function Packages() {
  const [selected, setSelected] = useState<ProgramKey>('annual');
  const p = programs[selected];

  return (
    <div className="w-full">
      <section className="px-4 pt-24 pb-16 text-center border-b border-navy/10">
        <motion.p className="text-xs uppercase tracking-[0.3em] text-gold-500 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
          Our Programs
        </motion.p>
        <motion.h1 className="font-display text-5xl md:text-6xl text-navy mb-6" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
          Three Ways to Work With Us
        </motion.h1>
        <motion.p className="text-navy/60 max-w-xl mx-auto leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
          From one event to a full annual calendar &mdash; pick the level of partnership that fits, then bring it to a consultation.
        </motion.p>
      </section>

      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {order.map((key) => {
              const prog = programs[key];
              const active = key === selected;
              return (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className={`text-left p-8 border transition-all cursor-pointer ${active ? 'border-navy bg-navy text-mist' : 'border-navy/15 bg-mist text-navy hover:border-navy/40'}`}
                >
                  <h3 className="font-display text-2xl mb-2">{prog.name}</h3>
                  <p className={`text-xs uppercase tracking-[0.15em] ${active ? 'text-mist/60' : 'text-gold-500'}`}>{prog.tagline}</p>
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
              className="bg-white border border-navy/10 p-10 md:p-14"
            >
              <p className="text-navy/60 leading-relaxed mb-8 max-w-2xl">{p.bestFor}</p>
              <h4 className="text-xs uppercase tracking-[0.15em] text-gold-500 mb-6">What&rsquo;s Included</h4>
              <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4 mb-10">
                {p.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-navy/70 leading-relaxed">
                    <span className="text-gold-500 mt-1">&#10003;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-block bg-navy text-mist px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-gold-500 hover:text-navy transition-colors">
                Ask About {p.name}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
