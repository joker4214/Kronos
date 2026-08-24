'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-gold-50 to-white flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-slate-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Extraordinary Events, <span className="text-gold-500">Expertly Planned</span>
          </motion.h1>
          <motion.p
            className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto"
            {...fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From intimate corporate gatherings to grand gala dinners, we transform your vision into unforgettable experiences.
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            {...fadeInUp}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/services" className="bg-gold-500 text-white px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors font-semibold">
              Explore Services
            </Link>
            <Link href="/contact" className="border-2 border-gold-500 text-gold-600 px-8 py-3 rounded-lg hover:bg-gold-50 transition-colors font-semibold">
              Get a Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center text-slate-900 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose Us
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '✨', title: 'Luxury Design', desc: 'Sophisticated aesthetics tailored to your brand' },
              { icon: '🎯', title: 'Expert Execution', desc: 'Flawless coordination from concept to completion' },
              { icon: '👥', title: 'Personal Touch', desc: 'Dedicated team focused on your vision' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-gold-50 p-8 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gold-500">
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Plan Your Event?
          </motion.h2>
          <motion.p
            className="text-lg mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's create something amazing together. Contact us today for a consultation.
          </motion.p>
          <Link href="/contact" className="inline-block bg-white text-gold-600 px-8 py-3 rounded-lg hover:bg-gold-50 transition-colors font-semibold">
            Schedule Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
