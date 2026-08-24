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

  return (
    <div className="w-full">
      <section className="py-20 px-4 bg-gradient-to-br from-gold-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-slate-900 mb-6">Get in Touch</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Ready to plan your event? Contact us today for a free consultation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: '📍', title: 'Address', content: '123 Gold Street, NY 10001' },
              { icon: '📞', title: 'Phone', content: '(555) 123-4567' },
              { icon: '✉️', title: 'Email', content: 'hello@eventplannerinc.com' },
            ].map((info, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-lg text-center shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{info.title}</h3>
                <p className="text-slate-600">{info.content}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-white p-12 rounded-lg shadow-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-gold-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-gold-500"
                />
              </div>
              <input
                type="text"
                placeholder="Event Type"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-gold-500"
              />
              <input
                type="date"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-gold-500"
              />
              <textarea
                placeholder="Tell us about your event..."
                rows={5}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-gold-500 resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gold-500 text-white py-3 rounded-lg hover:bg-gold-600 transition-colors font-semibold text-lg"
              >
                Send Message
              </button>
            </form>
            {submitted && (
              <motion.div
                className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Thank you! We'll be in touch soon with a quote for your event.
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
