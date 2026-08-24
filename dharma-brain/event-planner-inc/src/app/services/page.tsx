'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    title: 'Corporate Galas',
    desc: 'Elegant dinner events for celebrating corporate milestones and achievements',
    icon: '🍽️',
  },
  {
    title: 'Product Launches',
    desc: 'High-impact events to introduce your latest products to the market',
    icon: '🚀',
  },
  {
    title: 'Conference Planning',
    desc: 'Large-scale professional events with breakout sessions and networking',
    icon: '🎤',
  },
  {
    title: 'Team Building Events',
    desc: 'Engaging activities designed to strengthen team bonds and morale',
    icon: '👥',
  },
  {
    title: 'Award Ceremonies',
    desc: 'Prestigious celebrations recognizing excellence and achievement',
    icon: '🏆',
  },
  {
    title: 'Networking Mixers',
    desc: 'Curated social events connecting industry professionals',
    icon: '🤝',
  },
];

export default function Services() {
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
            <h1 className="text-5xl font-bold text-slate-900 mb-6">Our Services</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive event planning solutions tailored to your corporate needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-gold-500 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.desc}</p>
                <Link href="/contact" className="text-gold-600 font-semibold hover:text-gold-700">
                  Learn more →
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-20 bg-gold-50 p-12 rounded-lg text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Custom Event Solutions</h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Don't see what you're looking for? We specialize in creating custom event experiences tailored to your unique vision and requirements.
            </p>
            <Link href="/contact" className="inline-block bg-gold-500 text-white px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors font-semibold">
              Get Custom Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
