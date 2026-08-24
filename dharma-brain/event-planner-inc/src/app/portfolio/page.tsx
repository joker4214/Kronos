'use client';

import { motion } from 'framer-motion';

const events = [
  { title: 'TechCorp Annual Summit 2024', category: 'Conference', desc: '500+ attendees, 2-day conference with keynotes and breakout sessions' },
  { title: 'Luxury Brand Gala Dinner', category: 'Gala', desc: 'Elegant evening celebrating 25 years of excellence with 300 guests' },
  { title: 'Product Launch Event', category: 'Launch', desc: 'High-energy event introducing new product line to media and influencers' },
  { title: 'Corporate Awards Ceremony', category: 'Awards', desc: 'Prestigious ceremony recognizing top performers and achievements' },
  { title: 'Executive Networking Mixer', category: 'Networking', desc: 'Curated event connecting C-level executives from leading companies' },
  { title: 'Annual Team Celebration', category: 'Team Event', desc: 'Fun and engaging celebration of company culture and team achievements' },
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
              A showcase of exceptional events we&rsquo;ve created for leading organizations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <motion.div
                key={event.title}
                className="bg-white border border-ink/10 hover:border-rust-500 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <div className="h-40 bg-ink flex items-center justify-center">
                  <span className="font-display text-3xl text-cream/80">EP</span>
                </div>
                <div className="p-7">
                  <div className="text-xs uppercase tracking-[0.15em] text-rust-500 mb-3">{event.category}</div>
                  <h3 className="text-lg font-medium text-ink mb-2">{event.title}</h3>
                  <p className="text-ink/60 leading-relaxed">{event.desc}</p>
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
            <h2 className="font-display text-3xl md:text-4xl text-ink mb-4">Ready to Be Featured?</h2>
            <p className="text-ink/60 max-w-2xl mx-auto leading-relaxed">
              Your event could be next. Let&rsquo;s create something extraordinary together.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
