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

const stats = [
  { num: '20+', label: 'Years in Your Company Name Here' },
  { num: '5.0', label: 'Average client rating' },
  { num: '1', label: 'Dedicated planner, start to finish' },
];

const packages = [
  {
    name: 'The Essentials',
    desc: 'Month-of coordination for couples who’ve planned everything but need someone running the actual day.',
  },
  {
    name: 'The Full Celebration',
    desc: 'Full planning from the first vendor call to the last dance — our most-booked package.',
  },
  {
    name: 'The Signature Experience',
    desc: 'Full planning plus design direction and unlimited planning sessions with your coordinator.',
  },
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
            Your Company Name Here, Michigan &middot; Est. 2000
          </motion.p>
          <motion.h1
            className="font-display text-6xl md:text-8xl leading-[1.05] text-ink mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Twenty Years of<br />
            <span className="text-rust-500">Getting It Right</span>
          </motion.h1>
          <motion.p
            className="text-lg text-ink/60 mb-10 max-w-xl mx-auto leading-relaxed"
            {...fadeInUp}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Our lead planner has planned Your Company Name Here weddings and events since 2000. Pick a package, meet your planner, and see exactly what you&rsquo;re booking before you ever pick up the phone.
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            {...fadeInUp}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/packages" className="bg-ink text-cream px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-rust-500 transition-colors">
              Pick a Package
            </Link>
            <Link href="/contact" className="border border-ink text-ink px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-ink hover:text-cream transition-colors">
              Talk to Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-16 px-4 bg-ink">
        <motion.div
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={itemVariants}>
              <div className="font-display text-5xl text-cream mb-2">{s.num}</div>
              <div className="text-cream/50 text-xs uppercase tracking-[0.15em]">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Plan With Our Team Section */}
      <section className="py-28 px-4 bg-cream">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-rose-500 mb-4">Plan With Our Team</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-6">One Planner, Every Detail</h2>
            <p className="text-ink/60 leading-relaxed mb-8">
              You&rsquo;re not handed off to a call center. Every event is run by a real planning session with your coordinator &mdash; vendor picks, timeline, walk-through, the works &mdash; so nothing gets decided without you in the room.
            </p>
            <Link href="/contact" className="inline-block bg-ink text-cream px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-rust-500 transition-colors">
              Schedule a Planning Session
            </Link>
          </motion.div>
          <motion.div
            className="bg-white border border-ink/10 p-10"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="font-display text-3xl text-ink mb-1">Your Company Name Here</div>
            <p className="text-xs uppercase tracking-[0.15em] text-rust-500 mb-6">Founder &amp; Lead Planner</p>
            <p className="text-ink/60 leading-relaxed">
              Twenty-plus years producing events across Metro Detroit, from intimate gatherings of ten to celebrations of two hundred. Every client works directly with their planner from the first call through the last dance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Package teaser */}
      <section className="py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-rose-500 mb-4">Pick Your Package</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink">Know What You&rsquo;re Booking</h2>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-px bg-ink/10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {packages.map((p) => (
              <motion.div key={p.name} className="bg-cream p-10 text-left hover:bg-white transition-colors" variants={itemVariants}>
                <h3 className="font-display text-2xl text-ink mb-3">{p.name}</h3>
                <p className="text-ink/60 leading-relaxed mb-6">{p.desc}</p>
                <Link href="/packages" className="text-xs uppercase tracking-[0.15em] text-rust-500 hover:text-ink transition-colors">
                  See what&rsquo;s included &rarr;
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonial teaser */}
      <section className="py-28 px-4 bg-cream">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
          <motion.blockquote
            className="border-l-2 border-rust-500 pl-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-ink/70 italic leading-relaxed mb-3">&ldquo;Working with our planner was a blessing.&rdquo;</p>
            <footer className="text-xs uppercase tracking-[0.15em] text-ink/40">Your Client Here</footer>
          </motion.blockquote>
          <motion.blockquote
            className="border-l-2 border-rust-500 pl-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-ink/70 italic leading-relaxed mb-3">&ldquo;Attention to detail was incredible &mdash; I&rsquo;d recommend her 1000%.&rdquo;</p>
            <footer className="text-xs uppercase tracking-[0.15em] text-ink/40">Your Client Here</footer>
          </motion.blockquote>
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
            Pick a package or just talk it through with us first &mdash; either way, no call center, no hand-off.
          </motion.p>
          <Link href="/contact" className="inline-block bg-cream text-ink px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-rose-500 hover:text-cream transition-colors">
            Schedule Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
