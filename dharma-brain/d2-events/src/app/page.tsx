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

const serviceCards = [
  { title: 'Weddings', desc: 'Full service, partial, or day-of — planned around what you actually need.' },
  { title: 'Corporate & Social Events', desc: 'Milestone parties, company celebrations, and everything between.' },
  { title: 'Event Rentals', desc: 'Rent the pieces that make a space feel finished, on their own or as part of your event.' },
];

export default function Home() {
  return (
    <div className="w-full">
      <section
        className="relative min-h-[85vh] flex items-center justify-center px-4 py-28 border-b border-ink/10 bg-cover bg-center bg-no-repeat md:bg-fixed"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-ink/60" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.p className="text-xs uppercase tracking-[0.3em] text-teal-300 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            Your Company Name Here
          </motion.p>
          <motion.h1
            className="font-display text-6xl md:text-8xl leading-[1.05] text-linen mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            The Biggest Day<br />
            <span className="text-teal-300">Deserves the Best</span>
          </motion.h1>
          <motion.p className="text-lg text-linen/80 mb-10 max-w-xl mx-auto leading-relaxed" {...fadeInUp} transition={{ duration: 0.9, delay: 0.2 }}>
            There is nothing better than making the biggest day of your life, the best day of your life. Our team plans it &mdash; and every button on this site actually works.
          </motion.p>
          <motion.div className="flex gap-4 justify-center flex-wrap" {...fadeInUp} transition={{ duration: 0.9, delay: 0.35 }}>
            <Link href="/contact" className="bg-teal-500 text-linen px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-teal-600 transition-colors">
              Book Now
            </Link>
            <Link href="/packages" className="border border-linen text-linen px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-linen hover:text-ink transition-colors">
              See Packages
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-28 px-4 bg-linen">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500 mb-4">What We Do</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink">Three Ways We Help</h2>
          </motion.div>
          <motion.div className="grid md:grid-cols-3 gap-px bg-ink/10" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {serviceCards.map((s) => (
              <motion.div key={s.title} className="bg-white p-10 text-left hover:bg-linen transition-colors" variants={itemVariants}>
                <h3 className="font-display text-2xl text-ink mb-3">{s.title}</h3>
                <p className="text-ink/60 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-28 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500 mb-4">Meet the Team</p>
            <h2 className="font-display text-4xl md:text-5xl text-ink mb-6">Your Coordinator, Not a Call Center</h2>
            <p className="text-ink/60 leading-relaxed mb-8">
              You work directly with your planner from booking through your event &mdash; vendor coordination, timeline, problem-solving on the day. Real couples say the same thing: they caught the details you never would have thought of.
            </p>
            <Link href="/contact" className="inline-block bg-ink text-linen px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-teal-600 transition-colors">
              Book Now
            </Link>
          </motion.div>
          <motion.div
            className="relative border border-ink/10 p-10 min-h-[280px] flex flex-col justify-end bg-cover bg-center"
            style={{ backgroundImage: "url('/images/secondary.jpg')" }}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent" aria-hidden="true" />
            <p className="relative font-display text-2xl text-linen leading-snug mb-4">&ldquo;Hiring our wedding planner was the best decision we made.&rdquo;</p>
            <p className="relative text-xs uppercase tracking-[0.15em] text-linen/60">Your Client Here</p>
          </motion.div>
        </div>
      </section>

      <section className="py-28 px-4 bg-ink">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 className="font-display text-4xl md:text-5xl text-linen mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
            Ready to Book?
          </motion.h2>
          <motion.p className="text-lg text-linen/60 mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.15 }} viewport={{ once: true }}>
            This button works. Click it.
          </motion.p>
          <Link href="/contact" className="inline-block bg-teal-500 text-linen px-8 py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-teal-600 transition-colors">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
