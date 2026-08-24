'use client';

import { motion } from 'framer-motion';

const events = [
  {
    title: 'TechCorp Annual Summit 2024',
    category: 'Conference',
    desc: '500+ attendees, 2-day conference with keynotes and breakout sessions',
  },
  {
    title: 'Luxury Brand Gala Dinner',
    category: 'Gala',
    desc: 'Elegant evening celebrating 25 years of excellence with 300 guests',
  },
  {
    title: 'Product Launch Event',
    category: 'Launch',
    desc: 'High-energy event introducing new product line to media and influencers',
  },
  {
    title: 'Corporate Awards Ceremony',
    category: 'Awards',
    desc: 'Prestigious ceremony recognizing top performers and achievements',
  },
  {
    title: 'Executive Networking Mixer',
    category: 'Networking',
    desc: 'Curated event connecting C-level executives from leading companies',
  },
  {
    title: 'Annual Team Celebration',
    category: 'Team Event',
    desc: 'Fun and engaging celebration of company culture and team achievements',
  },
];

export default function Portfolio() {
  return (
    <div className="w-full">
      <section className="py-20 px-4 bg-gradient-to-br from-gold-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-slate-900 mb-6">Our Portfolio</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              A showcase of exceptional events we've created for leading organizations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-r from-gold-400 to-gold-600 h-32 flex items-center justify-center">
                  <span className="text-4xl">✨</span>
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold text-gold-600 mb-2">{event.category}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h3>
                  <p className="text-slate-600">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Be Featured?</h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Your event could be next. Let's create something extraordinary together.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
