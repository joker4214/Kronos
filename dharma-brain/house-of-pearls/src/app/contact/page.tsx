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
      <section className="py-20 px-4 bg-gradient-to-br from-rose-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-serif font-bold text-slate-900 mb-6">Let's Talk About Your Wedding</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Ready to begin planning? Contact us for a free consultation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: '📍', title: 'Location', content: '456 Pearl Avenue, NY 10005' },
              { icon: '📞', title: 'Phone', content: '(555) 987-6543' },
              { icon: '✉️', title: 'Email', content: 'hello@houseofpearls.com' },
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
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500"
                />
              </div>
              <input
                type="text"
                placeholder="Wedding Date (Approximate)"
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500"
              />
              <select
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500 bg-white"
              >
                <option value="">Select Planning Package</option>
                <option value="essentials">Essentials</option>
                <option value="signature">Signature</option>
                <option value="luxe">Luxe</option>
                <option value="styling">Styling Only</option>
              </select>
              <textarea
                placeholder="Tell us about your wedding vision..."
                rows={5}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-rose-500 resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors font-semibold text-lg"
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
                Thank you! We'll be in touch soon to discuss your perfect wedding.
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
