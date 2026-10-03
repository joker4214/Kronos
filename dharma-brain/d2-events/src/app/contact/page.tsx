'use client';

import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const infoItems = [
    { title: 'Location', content: 'Your Company Name Here' },
    { title: 'Phone', content: 'Your Phone Here' },
    { title: 'Email', content: 'email@yourcompanyname.com' },
  ];

  const inputClass = 'w-full px-0 py-3 bg-transparent border-0 border-b border-ink/20 focus:outline-none focus:border-teal-500 placeholder:text-ink/40 transition-colors';

  return (
    <div className="w-full">
      <section className="py-28 px-4 bg-linen">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500 mb-4">Book Now</p>
            <h1 className="font-display text-5xl md:text-6xl text-ink mb-6">Let&rsquo;s Talk</h1>
            <p className="text-lg text-ink/60 max-w-2xl mx-auto leading-relaxed">This button works. Fill it out and our team will be in touch.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-ink/10 border border-ink/10 mb-20">
            {infoItems.map((info, i) => (
              <motion.div key={info.title} className="bg-linen p-10 text-center hover:bg-white transition-colors" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.15 }} viewport={{ once: true }}>
                <h3 className="text-xs uppercase tracking-[0.15em] text-teal-500 mb-3">{info.title}</h3>
                <p className="text-ink/70">{info.content}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="bg-white border border-ink/10 p-12 max-w-2xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl text-ink mb-10">Book Now</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <input type="text" placeholder="Your Name" required className={inputClass} />
                <input type="email" placeholder="Your Email" required className={inputClass} />
              </div>
              <input type="text" placeholder="Event Type" required className={inputClass} />
              <input type="date" required className={inputClass} />
              <textarea placeholder="Tell us about your event..." rows={5} required className={`${inputClass} resize-none`}></textarea>
              <button type="submit" className="w-full bg-teal-500 text-linen py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-teal-600 transition-colors">
                Book Now
              </button>
            </form>
            {submitted && (
              <motion.div className="mt-6 p-4 border border-teal-300 bg-teal-50 text-teal-700 text-sm" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                Thank you! Our team will be in touch soon.
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
