'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  { title: 'Weddings', desc: 'Full celebrations, intimate elopements, and everything between — twenty years of Metro Detroit weddings.' },
  { title: 'Private Parties', desc: 'Milestone birthdays, anniversaries, and family celebrations planned with the same care as a wedding.' },
  { title: 'Vow Renewals', desc: 'From quiet backyard moments to full renewals with the whole family invited.' },
  { title: 'Corporate &amp; Community', desc: 'Local corporate gatherings, fundraisers, and community events.' },
];

export default function Portfolio() {
  return (
    <div className="w-full">
      <section className="py-28 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-rose-500 mb-4">Our Work</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink mb-6">Our Portfolio</h1>
            <p className="text-lg text-ink/60 max-w-2xl mx-auto leading-relaxed">
              Twenty years of Your Company Name Here events. Full photo galleries coming soon &mdash; in the meantime, here&rsquo;s what we plan.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                className="bg-white border border-ink/10 hover:border-rust-500 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <div className="h-40 bg-ink flex items-center justify-center">
                  <span className="font-display text-3xl text-cream/80">EP</span>
                </div>
                <div className="p-7">
                  <h3 className="text-lg font-medium text-ink mb-2">{cat.title}</h3>
                  <p className="text-ink/60 leading-relaxed">{cat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-24 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">Ready to Start Planning?</h2>
            <p className="text-ink/60 max-w-2xl mx-auto leading-relaxed mb-8">
              Your event could be next. Let&rsquo;s talk about what you&rsquo;re picturing.
            </p>
            <Link href="/contact" className="inline-block bg-ink text-cream px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-rust-500 transition-colors">
              Schedule Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
