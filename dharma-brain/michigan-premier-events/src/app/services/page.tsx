'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  { num: '01', title: 'Galas & Fundraisers', desc: 'Full production for institutional fundraising events.' },
  { num: '02', title: 'Conferences', desc: 'Multi-day programs with breakout sessions and speaker logistics.' },
  { num: '03', title: 'Government & Institutional Events', desc: 'Events for chambers, agencies, and public institutions.' },
  { num: '04', title: 'Large-Scale Logistics', desc: 'Events with hundreds of participants, planned to actually run smoothly.' },
  { num: '05', title: 'Corporate Programs', desc: 'Employee events, milestone celebrations, and internal programs.' },
  { num: '06', title: 'Community Events', desc: 'Youth expos, community fairs, and public-facing programs.' },
];

export default function Services() {
  return (
    <div className="w-full">
      <section className="py-28 px-4 bg-mist">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500 mb-4">What We Offer</p>
            <h1 className="font-display text-5xl md:text-6xl text-navy mb-6">Our Services</h1>
            <p className="text-lg text-navy/60 max-w-2xl mx-auto leading-relaxed">Ten years managing events that institutions can&rsquo;t afford to get wrong.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-navy/10 border border-navy/10">
            {services.map((service, i) => (
              <motion.div key={service.num} className="bg-white p-10 hover:bg-mist transition-colors" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: (i % 3) * 0.1 }} viewport={{ once: true }}>
                <div className="font-display text-3xl text-gold-500 mb-5">{service.num}</div>
                <h3 className="text-lg font-medium text-navy mb-3 uppercase tracking-[0.1em]">{service.title}</h3>
                <p className="text-navy/60 mb-6 leading-relaxed">{service.desc}</p>
                <Link href="/contact" className="text-xs uppercase tracking-[0.15em] text-navy border-b border-navy/40 pb-1 hover:border-gold-500 hover:text-gold-500 transition-colors">
                  Learn more
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
