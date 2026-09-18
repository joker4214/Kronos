'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const testimonials = [
  { name: 'Your Client Here', title: 'Client Title, Client Organization', quote: 'The team provides outstanding leadership representing our organization in all our events and educational programs.' },
  { name: 'Your Client Here', title: 'Client Organization', quote: 'The Your Company Name Here team was extremely professional, accessible, reliable, and organized throughout the several months of planning.' },
  { name: 'Your Client Here', title: 'Employee Engagement Manager, Client Organization', quote: 'Your Company Name Here team was professional, dedicated and sincere in their efforts to meet our requirements throughout the planning process.' },
  { name: 'Your Client Here', title: 'Client Organization', quote: 'The customer service and attentiveness we received from the team was exceptional as they supported our event with nearly 900 participants.' },
  { name: 'Your Client Here', title: 'Founder, Client Organization', quote: 'Your Company Name Here was essential to the success of our event. The team thought out the smallest of things that made a world of difference.' },
  { name: 'Your Client Here', title: 'Owner, Client Organization', quote: 'I have found the team to be organized, knowledgeable, extremely flexible, and professional.' },
];

export default function Testimonials() {
  return (
    <div className="w-full">
      <section className="py-28 px-4 bg-mist">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500 mb-4">Testimonials</p>
            <h1 className="font-display text-5xl md:text-6xl text-navy mb-6">What Our Partners Say</h1>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-14">
            {testimonials.map((t, i) => (
              <motion.div key={i} className="border-l-2 border-gold-500 pl-8" initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: (i % 2) * 0.1 }} viewport={{ once: true }}>
                <p className="font-display text-xl text-navy leading-snug mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs uppercase tracking-[0.15em] text-navy">{t.name}</p>
                <p className="text-navy/50 text-sm mt-1">{t.title}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-28 bg-navy p-16 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl text-mist mb-4">Join Our Partners</h2>
            <Link href="/contact" className="inline-block bg-gold-500 text-navy px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-mist transition-colors mt-6">
              Request a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
