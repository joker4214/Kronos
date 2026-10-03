'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const tiers = [
  {
    name: 'Essentials',
    price: '$2,500',
    desc: 'Perfect for intimate gatherings',
    features: ['Vendor coordination', 'Timeline management', 'Day-of support'],
  },
  {
    name: 'Signature',
    price: '$5,500',
    desc: 'Our most popular choice',
    features: ['Full planning & design', 'Vendor coordination', 'Unlimited consultations', 'Full day coordination'],
    featured: true,
  },
  {
    name: 'Luxe',
    price: '$10,000+',
    desc: 'Complete luxury experience',
    features: ['Full custom design', 'Premium vendors', 'Luxury decor', 'Multi-day events', 'Dedicated planner'],
  },
  {
    name: 'Styling Only',
    price: '$1,500+',
    desc: 'Design consultation',
    features: ['Initial design session', 'Vendor recommendations', 'Styling guidance'],
  },
];

export default function Services() {
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
            <h1 className="text-5xl font-serif font-bold text-slate-900 mb-6">Our Services</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Tailored wedding planning packages for every vision and budget
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                className={`p-8 rounded-lg ${
                  tier.featured
                    ? 'bg-rose-500 text-white border-2 border-rose-600 shadow-xl scale-105'
                    : 'bg-white text-slate-900 border border-rose-100 shadow-lg'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className={`text-2xl font-serif font-bold mb-2 ${tier.featured ? 'text-white' : 'text-rose-600'}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm mb-4 ${tier.featured ? 'text-rose-100' : 'text-slate-600'}`}>{tier.desc}</p>
                <p className={`text-3xl font-bold mb-6 ${tier.featured ? 'text-white' : 'text-rose-600'}`}>{tier.price}</p>
                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className={tier.featured ? 'text-white' : 'text-rose-500'}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-2 rounded font-semibold transition-colors ${
                    tier.featured
                      ? 'bg-white text-rose-600 hover:bg-rose-50'
                      : 'bg-rose-500 text-white hover:bg-rose-600'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
