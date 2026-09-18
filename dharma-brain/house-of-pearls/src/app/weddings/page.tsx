'use client';

import { motion } from 'framer-motion';

const weddings = [
  {
    couple: 'Emma & James',
    date: 'June 2024',
    venue: 'Garden Estate, Upstate NY',
    guests: '150',
    style: 'Romantic Garden',
  },
  {
    couple: 'Sarah & Michael',
    date: 'May 2024',
    venue: 'Historic Manor, Massachusetts',
    guests: '200',
    style: 'Elegant Classic',
  },
  {
    couple: 'Jessica & David',
    date: 'April 2024',
    venue: 'Luxury Ballroom, Manhattan',
    guests: '250',
    style: 'Modern Sophistication',
  },
  {
    couple: 'Laura & Christopher',
    date: 'September 2023',
    venue: 'Beachside Resort, Florida',
    guests: '180',
    style: 'Tropical Romance',
  },
  {
    couple: 'Rachel & Daniel',
    date: 'August 2023',
    venue: 'Vineyard, California',
    guests: '120',
    style: 'Rustic Elegance',
  },
  {
    couple: 'Amanda & Robert',
    date: 'July 2023',
    venue: 'Church & Country Club, Vermont',
    guests: '200',
    style: 'Timeless Romance',
  },
];

export default function Weddings() {
  return (
    <div className="w-full">
      <section className="py-20 px-4 bg-gradient-to-br from-rose-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-serif font-bold text-slate-900 mb-6">Real Weddings</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Celebrations of love created for couples like you
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {weddings.map((wedding, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gradient-to-r from-rose-400 to-rose-500 h-32 flex items-center justify-center">
                  <span className="text-6xl">💕</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">{wedding.couple}</h3>
                  <p className="text-sm text-rose-600 font-semibold mb-4">{wedding.style}</p>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong>Date:</strong> {wedding.date}</p>
                    <p><strong>Venue:</strong> {wedding.venue}</p>
                    <p><strong>Guests:</strong> {wedding.guests}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
