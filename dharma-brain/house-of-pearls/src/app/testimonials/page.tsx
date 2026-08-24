'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Emma & James',
    quote: 'Our wedding was absolutely perfect. The team brought our vision to life with such elegance and attention to detail.',
  },
  {
    name: 'Sarah & Michael',
    quote: 'From the first consultation, we felt like we were in such capable hands. The stress melted away immediately.',
  },
  {
    name: 'Jessica & David',
    quote: 'House of Pearls created something so beautiful and personal. Our guests are still talking about it!',
  },
  {
    name: 'Laura & Christopher',
    quote: 'The design was stunning, the coordination was flawless, and the day was unforgettable.',
  },
  {
    name: 'Rachel & Daniel',
    quote: 'Best investment we could have made. The team handled every detail so we could focus on celebrating our love.',
  },
  {
    name: 'Amanda & Robert',
    quote: 'Truly a luxury experience from start to finish. Our wedding day was everything we dreamed it would be.',
  },
];

export default function Testimonials() {
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
            <h1 className="text-5xl font-serif font-bold text-slate-900 mb-6">Love Stories</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Hear from couples whose special day we had the privilege of creating
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-rose-500"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-rose-500">★</span>
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic font-serif">"{testimonial.quote}"</p>
                <p className="font-serif font-bold text-slate-900">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-20 bg-rose-50 p-12 rounded-lg text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Ready to Create Your Story?</h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Let's plan a wedding celebration as unique and beautiful as your love story.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
