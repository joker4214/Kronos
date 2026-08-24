'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  { num: '01', title: 'Corporate Galas', desc: 'Elegant dinner events for celebrating corporate milestones and achievements.' },
  { num: '02', title: 'Product Launches', desc: 'High-impact events to introduce your latest products to the market.' },
  { num: '03', title: 'Conference Planning', desc: 'Large-scale professional events with breakout sessions and networking.' },
  { num: '04', title: 'Team Building Events', desc: 'Engaging activities designed to strengthen team bonds and morale.' },
  { num: '05', title: 'Award Ceremonies', desc: 'Prestigious celebrations recognizing excellence and achievement.' },
  { num: '06', title: 'Networking Mixers', desc: 'Curated social events connecting industry professionals.' },
];

export default function Services() {
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
            <p className="text-xs uppercase tracking-[0.3em] text-rose-500 mb-4">What We Offer</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink mb-6">Our Services</h1>
            <p className="text-lg text-ink/60 max-w-2xl mx-auto leading-relaxed">
              Comprehensive event planning solutions tailored to your corporate needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
            {services.map((service, i) => (
              <motion.div
                key={service.num}
                className="bg-cream p-10 hover:bg-white transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <div className="font-display text-3xl text-rust-500 mb-5">{service.num}</div>
                <h3 className="text-lg font-medium text-ink mb-3 uppercase tracking-[0.1em]">{service.title}</h3>
                <p className="text-ink/60 mb-6 leading-relaxed">{service.desc}</p>
                <Link href="/contact" className="text-xs uppercase tracking-[0.15em] text-ink border-b border-ink/40 pb-1 hover:border-rust-500 hover:text-rust-500 transition-colors">
                  Learn more
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-24 bg-ink p-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">Custom Event Solutions</h2>
            <p className="text-cream/60 mb-8 max-w-2xl mx-auto leading-relaxed">
              Don&rsquo;t see what you&rsquo;re looking for? We specialize in creating custom event experiences tailored to your unique vision and requirements.
            </p>
            <Link href="/contact" className="inline-block bg-cream text-ink px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-rust-500 hover:text-cream transition-colors">
              Get Custom Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
