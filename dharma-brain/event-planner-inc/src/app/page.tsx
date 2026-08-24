'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const features = [
  { num: '01', title: 'Luxury Design', desc: 'Sophisticated aesthetics tailored to your brand, curated down to the smallest detail.' },
  { num: '02', title: 'Expert Execution', desc: 'Flawless coordination from concept to completion, on time and on budget.' },
  { num: '03', title: 'Personal Touch', desc: 'A dedicated team that takes the time to understand your vision and your story.' },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center px-4 py-32 border-b border-ink/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className="text-xs uppercase tracking-[0.3em] text-rust-500 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Because Details Matter
          </motion.p>
          <motion.h1
            className="font-display text-6xl md:text-8xl leading-[1.05] text-ink mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Extraordinary Events,<br />
            <span className="text-rust-500">Expertly Planned</span>
          </motion.h1>
          <motion.p
            className="text-lg text-ink/60 mb-10 max-w-xl mx-auto leading-relaxed"
            {...fadeInUp}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            From intimate corporate gatherings to grand gala dinners, we transform your vision into unforgettable experiences.
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            {...fadeInUp}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/services" className="bg-ink text-cream px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-rust-500 transition-colors">
              Explore Services
            </Link>
            <Link href="/contact" className="border border-ink text-ink px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-ink hover:text-cream transition-colors">
              Get a Quote
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-28 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-rose-500 mb-4">Why Choose Us</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink">A Detailed Approach</h2>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-px bg-ink/10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.num}
                className="bg-cream p-10 text-left hover:bg-white transition-colors"
                variants={itemVariants}
              >
                <div className="font-display text-4xl text-rust-500 mb-6">{feature.num}</div>
                <h3 className="text-lg font-medium text-ink mb-3 uppercase tracking-[0.1em]">{feature.title}</h3>
                <p className="text-ink/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-4 bg-ink">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="font-display text-4xl md:text-5xl text-cream mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            Ready to Plan Your Event?
          </motion.h2>
          <motion.p
            className="text-lg text-cream/60 mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            viewport={{ once: true }}
          >
            Let&rsquo;s create something amazing together. Contact us today for a consultation.
          </motion.p>
          <Link href="/contact" className="inline-block bg-cream text-ink px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-rose-500 hover:text-cream transition-colors">
            Schedule Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
