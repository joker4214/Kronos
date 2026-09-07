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
    { title: 'Address', content: 'Your business address here' },
    { title: 'Phone', content: 'Your phone number here' },
    { title: 'Email', content: 'Your email address here' },
  ];

  const inputClass = 'w-full px-0 py-3 bg-transparent border-0 border-b border-navy/20 focus:outline-none focus:border-gold-500 placeholder:text-navy/40 transition-colors';

  return (
    <div className="w-full">
      <section className="py-28 px-4 bg-mist">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-500 mb-4">Get In Touch</p>
            <h1 className="font-display text-5xl md:text-6xl text-navy mb-6">Let&rsquo;s Talk</h1>
            <p className="text-lg text-navy/60 max-w-2xl mx-auto leading-relaxed">Tell us about your event and we&rsquo;ll follow up with next steps.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-px bg-navy/10 border border-navy/10 mb-20">
            {infoItems.map((info, i) => (
              <motion.div key={info.title} className="bg-mist p-10 text-center hover:bg-white transition-colors" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: i * 0.15 }} viewport={{ once: true }}>
                <h3 className="text-xs uppercase tracking-[0.15em] text-gold-500 mb-3">{info.title}</h3>
                <p className="text-navy/70">{info.content}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="bg-white border border-navy/10 p-12 max-w-2xl mx-auto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl text-navy mb-10">Request a Consultation</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <input type="text" placeholder="Your Name" required className={inputClass} />
                <input type="email" placeholder="Your Email" required className={inputClass} />
              </div>
              <input type="text" placeholder="Organization" required className={inputClass} />
              <input type="text" placeholder="Event Type" required className={inputClass} />
              <textarea placeholder="Tell us about your event..." rows={5} required className={`${inputClass} resize-none`}></textarea>
              <button type="submit" className="w-full bg-navy text-mist py-3.5 text-xs uppercase tracking-[0.15em] hover:bg-gold-500 hover:text-navy transition-colors">
                Send Request
              </button>
            </form>
            {submitted && (
              <motion.div className="mt-6 p-4 border border-gold-400 bg-mist text-navy text-sm" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                Thank you! We&rsquo;ll be in touch soon.
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
