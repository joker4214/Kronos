'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const testimonials = [
  { name: 'Amanda T.', quote: 'Working with Dalia was a blessing. She thought of things we never would have, and the whole day ran without a single hiccup.' },
  { name: 'Sabrina K.', quote: 'Her attention to detail was incredible from start to finish. I would recommend her 1000% to anyone planning a wedding.' },
];

export default function Testimonials() {
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
            <p className="text-xs uppercase tracking-[0.3em] text-rose-500 mb-4">Testimonials</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink mb-6">What Our Clients Say</h1>
            <p className="text-lg text-ink/60 max-w-2xl mx-auto leading-relaxed">
              Real words from real Your Company Name Here weddings and events.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-14 max-w-4xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                className="border-l-2 border-rust-500 pl-8"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <p className="font-display text-2xl text-ink leading-snug mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-ink">{testimonial.name}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-28 bg-ink p-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">Join Our Clients</h2>
            <p className="text-cream/60 max-w-2xl mx-auto leading-relaxed mb-8">
              Your event deserves the same level of care. Let&rsquo;s talk about your day.
            </p>
            <Link href="/contact" className="inline-block bg-cream text-ink px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-rust-500 hover:text-cream transition-colors">
              Schedule Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
