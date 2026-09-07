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
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

const stats = [
  { num: '10', label: 'Years in Business' },
  { num: '900+', label: 'Participants at a single event' },
  { num: '2026', label: 'Active right now' },
];

const clients = ['Your Client Here', 'Your Client Here', 'Your Client Here', 'Your Client Here'];

export default function Home() {
  return (
    <div className="w-full">
      <section
        className="relative min-h-[85vh] flex items-center justify-center px-4 py-28 border-b border-navy/10 bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-navy/70" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.p className="text-xs uppercase tracking-[0.3em] text-gold-400 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            Your Company Name Here &middot; Est. 2016
          </motion.p>
          <motion.h1
            className="font-display text-5xl md:text-7xl leading-[1.05] text-mist mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Ten Years Producing<br />
            <span className="text-gold-400">Michigan&rsquo;s Events</span>
          </motion.h1>
          <motion.p className="text-lg text-mist/80 mb-10 max-w-xl mx-auto leading-relaxed" {...fadeInUp} transition={{ duration: 0.9, delay: 0.2 }}>
            The Your Company Name Here team manages corporate, government, and community events across the state &mdash; galas, conferences, fundraisers, and everything in between.
          </motion.p>
          <motion.div className="flex gap-4 justify-center flex-wrap" {...fadeInUp} transition={{ duration: 0.9, delay: 0.35 }}>
            <Link href="/contact" className="bg-gold-500 text-navy px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-mist transition-colors">
              Request a Consultation
            </Link>
            <Link href="/packages" className="border border-mist text-mist px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-mist hover:text-navy transition-colors">
              See Our Programs
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 bg-navy">
        <motion.div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          {stats.map((s) => (
            <motion.div key={s.label} variants={itemVariants}>
              <div className="font-display text-5xl text-mist mb-2">{s.num}</div>
              <div className="text-mist/50 text-xs uppercase tracking-[0.15em]">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-28 px-4 bg-mist">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500 mb-4">Led By</p>
            <h2 className="font-display text-4xl md:text-5xl text-navy mb-6">Your Company Name Here</h2>
            <p className="text-navy/60 leading-relaxed mb-8">
              Founder &amp; CEO of Your Company Name Here. Ten years leading a team trusted by chambers of commerce, universities, and property management firms across the state to run events that can&rsquo;t afford to go wrong.
            </p>
            <Link href="/contact" className="inline-block bg-navy text-mist px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-gold-500 hover:text-navy transition-colors">
              Request a Consultation
            </Link>
          </motion.div>
          <motion.div
            className="relative border border-navy/10 p-10 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/secondary.jpg')" }}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-navy/80" aria-hidden="true" />
            <h4 className="relative text-xs uppercase tracking-[0.15em] text-gold-400 mb-6">Trusted By</h4>
            <ul className="relative space-y-4">
              {clients.map((c) => (
                <li key={c} className="text-mist/80 border-b border-mist/20 pb-3 last:border-0">{c}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="py-28 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          <motion.blockquote className="border-l-2 border-gold-500 pl-6" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <p className="text-navy/70 italic leading-relaxed mb-3">&ldquo;The team provides outstanding leadership representing our organization in all our events and educational programs.&rdquo;</p>
            <footer className="text-xs uppercase tracking-[0.15em] text-navy/40">Your Client Here, Client Title, Client Organization</footer>
          </motion.blockquote>
          <motion.blockquote className="border-l-2 border-gold-500 pl-6" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true }}>
            <p className="text-navy/70 italic leading-relaxed mb-3">&ldquo;The customer service and attentiveness we received from the team was exceptional as they supported our event with nearly 900 participants.&rdquo;</p>
            <footer className="text-xs uppercase tracking-[0.15em] text-navy/40">Your Client Here, Client Organization</footer>
          </motion.blockquote>
        </div>
      </section>

      <section className="py-28 px-4 bg-navy">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 className="font-display text-4xl md:text-5xl text-mist mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
            Planning Something That Can&rsquo;t Go Wrong?
          </motion.h2>
          <motion.p className="text-lg text-mist/60 mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.15 }} viewport={{ once: true }}>
            That&rsquo;s exactly what we&rsquo;ve been doing for ten years.
          </motion.p>
          <Link href="/contact" className="inline-block bg-gold-500 text-navy px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-mist transition-colors">
            Request a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
