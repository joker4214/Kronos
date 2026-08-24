'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="w-full">
      <section className="py-20 px-4 bg-gradient-to-br from-rose-50 to-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-serif font-bold text-slate-900 mb-6">About House of Pearls</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Creating timeless wedding celebrations since 2012
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-12 rounded-lg shadow-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">Our Story</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-4">
              House of Pearls was founded with a simple belief: every love story deserves to be celebrated in an elegant,
              thoughtful, and personal way. Over a decade later, we've had the honor of creating hundreds of beautiful
              weddings for couples from all walks of life.
            </p>
            <p className="text-slate-600 text-lg leading-relaxed">
              We understand that your wedding day is one of the most important moments of your life. That's why we approach
              each event with the utmost care, attention to detail, and a commitment to bringing your unique vision to life.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              { number: '500+', label: 'Weddings Planned' },
              { number: '12+', label: 'Years of Excellence' },
              { number: '100%', label: 'Client Satisfaction' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-rose-50 p-8 rounded-lg text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl font-serif font-bold text-rose-600 mb-2">{stat.number}</p>
                <p className="text-slate-600 font-serif">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-12 bg-white p-12 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-6">Our Philosophy</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              We believe in creating celebrations that are uniquely yours. No two weddings are the same, and neither should
              their planning process be. From intimate gatherings to grand affairs, we tailor our approach to match your
              personality, style, and dreams. Your wedding should reflect your love story—and that's exactly what we create.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
