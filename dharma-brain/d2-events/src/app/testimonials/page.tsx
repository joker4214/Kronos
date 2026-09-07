'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const testimonials = [
  { name: 'Your Client Here', quote: 'Your Company Name Here was hands down the best decision we made for our wedding day.' },
  { name: 'Your Client Here', quote: 'My husband and I cannot stop talking about how happy we were with our coordinator.' },
  { name: 'Your Client Here', quote: 'Hiring our wedding planner was the best decision we made.' },
];

export default function Testimonials() {
  return (
    <div className="w-full">
      <section className="py-28 px-4 bg-linen">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500 mb-4">Testimonials</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink mb-6">What Our Clients Say</h1>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-x-10 gap-y-14">
            {testimonials.map((t, i) => (
              <motion.div key={i} className="border-l-2 border-teal-500 pl-6" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.1 }} viewport={{ once: true }}>
                <p className="font-display text-xl text-ink leading-snug mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs uppercase tracking-[0.15em] text-ink/40">{t.name}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-28 bg-ink p-16 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl text-linen mb-4">Ready to Book?</h2>
            <Link href="/contact" className="inline-block bg-teal-500 text-linen px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-teal-600 transition-colors mt-6">
              Book Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
