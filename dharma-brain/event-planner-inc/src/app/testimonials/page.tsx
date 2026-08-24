'use client';

import { motion } from 'framer-motion';

const testimonials = [
  { name: 'Sarah Johnson', title: 'CEO, TechCorp', quote: 'Event Planner, Inc. transformed our annual summit into an unforgettable experience. Every detail was perfect.' },
  { name: 'Michael Chen', title: 'Marketing Director, LuxeBrand', quote: 'Professional, creative, and incredibly responsive. They brought our vision to life beyond our expectations.' },
  { name: 'Emma Wilson', title: 'VP Operations, FinanceGlobal', quote: 'The team’s attention to detail and flawless execution made our gala evening absolutely spectacular.' },
  { name: 'James Davis', title: 'Founder, InnovateTech', quote: 'They handled our product launch with such finesse. Our guests are still talking about it.' },
  { name: 'Lisa Anderson', title: 'HR Director, CorpLife', quote: 'Our team building event was incredible. The team felt valued and celebrated. Highly recommended!' },
  { name: 'Robert Martinez', title: 'Director, EliteEvents', quote: 'Working with Event Planner, Inc. was seamless. They truly understand luxury and excellence.' },
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
              Hear from the executives and leaders who trust us with their most important events
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-14">
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
                  <p className="text-ink/50 text-sm mt-1">{testimonial.title}</p>
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
            <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">Join Our Satisfied Clients</h2>
            <p className="text-cream/60 max-w-2xl mx-auto leading-relaxed">
              Your event deserves the same level of excellence. Let&rsquo;s create your success story.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
