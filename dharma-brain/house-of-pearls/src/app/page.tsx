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
      <section className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-rose-50 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Your <span className="text-rose-500">Perfect Wedding</span> Awaits
          </motion.h1>
          <motion.p
            className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto font-serif"
            {...fadeInUp}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Crafting timeless moments and elegant celebrations tailored to your love story.
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            {...fadeInUp}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/services" className="bg-rose-500 text-white px-8 py-3 rounded-lg hover:bg-rose-600 transition-colors font-semibold">
              Explore Services
            </Link>
            <Link href="/contact" className="border-2 border-rose-500 text-rose-600 px-8 py-3 rounded-lg hover:bg-rose-50 transition-colors font-semibold">
              Book Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-serif font-bold text-center text-slate-900 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Couples Choose Us
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '💕', title: 'Personal Attention', desc: 'Your wedding deserves our full focus and care' },
              { icon: '✨', title: 'Elegant Design', desc: 'Sophisticated aesthetics tailored to your style' },
              { icon: '💍', title: 'Stress-Free', desc: 'Comprehensive planning so you can enjoy the journey' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-rose-50 p-8 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-rose-500 to-rose-600">
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.h2
            className="text-4xl font-serif font-bold mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Begin Your Journey
          </motion.h2>
          <motion.p
            className="text-lg mb-8 font-serif"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's create an unforgettable celebration of your love.
          </motion.p>
          <Link href="/contact" className="inline-block bg-white text-rose-600 px-8 py-3 rounded-lg hover:bg-rose-50 transition-colors font-semibold">
            Start Planning
          </Link>
        </div>
      </section>
    </div>
  );
}
