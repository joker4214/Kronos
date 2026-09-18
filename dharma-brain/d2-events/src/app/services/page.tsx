'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  { num: '01', title: 'Full Service Wedding Planning', desc: 'From the first vendor call to the last dance.' },
  { num: '02', title: 'Partial Planning', desc: 'Already have some vendors booked? We fill in the rest.' },
  { num: '03', title: 'Day-Of Coordination', desc: 'You planned it. We make sure it runs without you having to manage it.' },
  { num: '04', title: 'Corporate & Social Events', desc: 'Company celebrations, milestone parties, and everything between.' },
  { num: '05', title: 'Event Rentals', desc: 'Rent the pieces that finish a space, standalone or as part of your event.' },
  { num: '06', title: 'Design & Styling', desc: 'Palette, tablescape, and styling direction that ties the day together.' },
];

export default function Services() {
  return (
    <div className="w-full">
      <section className="py-28 px-4 bg-linen">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500 mb-4">What We Offer</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink mb-6">Our Services</h1>
            <p className="text-lg text-ink/60 max-w-2xl mx-auto leading-relaxed">Weddings, corporate events, social celebrations, and the rentals to finish the room.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
            {services.map((service, i) => (
              <motion.div key={service.num} className="bg-white p-10 hover:bg-linen transition-colors" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: (i % 3) * 0.1 }} viewport={{ once: true }}>
                <div className="font-display text-3xl text-teal-500 mb-5">{service.num}</div>
                <h3 className="text-lg font-medium text-ink mb-3 uppercase tracking-[0.1em]">{service.title}</h3>
                <p className="text-ink/60 mb-6 leading-relaxed">{service.desc}</p>
                <Link href="/contact" className="text-xs uppercase tracking-[0.15em] text-ink border-b border-ink/40 pb-1 hover:border-teal-500 hover:text-teal-500 transition-colors">
                  Book Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
