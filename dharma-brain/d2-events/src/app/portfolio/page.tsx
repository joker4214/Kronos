'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  { title: 'Weddings', desc: 'Full service, partial, and day-of coordination across the area and beyond.' },
  { title: 'Corporate & Social Events', desc: 'Company celebrations and milestone parties.' },
  { title: 'Event Rentals', desc: 'The pieces that finish a room, available on their own.' },
];

export default function Portfolio() {
  return (
    <div className="w-full">
      <section className="py-28 px-4 bg-linen">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500 mb-4">Our Work</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink mb-6">Our Portfolio</h1>
            <p className="text-lg text-ink/60 max-w-2xl mx-auto leading-relaxed">Full photo galleries coming soon &mdash; in the meantime, here&rsquo;s what we plan.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div key={cat.title} className="bg-white border border-ink/10 hover:border-teal-500 transition-colors" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1 }} viewport={{ once: true }}>
                <div className="h-40 bg-ink flex items-center justify-center">
                  <span className="font-display text-3xl text-linen/80">YC</span>
                </div>
                <div className="p-7">
                  <h3 className="text-lg font-medium text-ink mb-2">{cat.title}</h3>
                  <p className="text-ink/60 leading-relaxed">{cat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-24 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
            <Link href="/contact" className="inline-block bg-teal-500 text-linen px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-teal-600 transition-colors">
              Book Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
