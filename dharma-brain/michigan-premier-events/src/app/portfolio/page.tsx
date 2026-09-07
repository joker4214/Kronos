'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  { title: 'Galas & Fundraisers', desc: 'Institutional fundraising events, fully produced.' },
  { title: 'Conferences', desc: 'Multi-day programs across Michigan, GEAR UP through statewide summits.' },
  { title: 'Large-Scale Programs', desc: 'Events with hundreds of participants, including a 900+ attendee program for a statewide client.' },
  { title: 'Community & Youth Events', desc: 'Youth expos and public-facing community programs.' },
];

export default function Portfolio() {
  return (
    <div className="w-full">
      <section className="py-28 px-4 bg-mist">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500 mb-4">Our Work</p>
            <h1 className="font-display text-5xl md:text-6xl text-navy mb-6">Our Portfolio</h1>
            <p className="text-lg text-navy/60 max-w-2xl mx-auto leading-relaxed">Ten years of events across Michigan. Full case studies coming soon.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((cat, i) => (
              <motion.div key={cat.title} className="bg-white border border-navy/10 hover:border-gold-500 transition-colors" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: (i % 2) * 0.1 }} viewport={{ once: true }}>
                <div className="h-40 bg-navy flex items-center justify-center">
                  <span className="font-display text-3xl text-mist/80">LOGO</span>
                </div>
                <div className="p-7">
                  <h3 className="text-lg font-medium text-navy mb-2">{cat.title}</h3>
                  <p className="text-navy/60 leading-relaxed">{cat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-24 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
            <Link href="/contact" className="inline-block bg-navy text-mist px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-gold-500 hover:text-navy transition-colors">
              Request a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
