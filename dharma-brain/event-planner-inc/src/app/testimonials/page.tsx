'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Johnson',
    title: 'CEO, TechCorp',
    quote: 'Event Planner, Inc. transformed our annual summit into an unforgettable experience. Every detail was perfect.',
  },
  {
    name: 'Michael Chen',
    title: 'Marketing Director, LuxeBrand',
    quote: 'Professional, creative, and incredibly responsive. They brought our vision to life beyond our expectations.',
  },
  {
    name: 'Emma Wilson',
    title: 'VP Operations, FinanceGlobal',
    quote: 'The team\'s attention to detail and flawless execution made our gala evening absolutely spectacular.',
  },
  {
    name: 'James Davis',
    title: 'Founder, InnovateTech',
    quote: 'They handled our product launch with such finesse. Our guests are still talking about it.',
  },
  {
    name: 'Lisa Anderson',
    title: 'HR Director, CorpLife',
    quote: 'Our team building event was incredible. The team felt valued and celebrated. Highly recommended!',
  },
  {
    name: 'Robert Martinez',
    title: 'Director, EliteEvents',
    quote: 'Working with Event Planner, Inc. was seamless. They truly understand luxury and excellence.',
  },
];

export default function Testimonials() {
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
            <h1 className="text-5xl font-bold text-slate-900 mb-6">What Our Clients Say</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Hear from the executives and leaders who trust us with their most important events
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-gold-500"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-gold-500">★</span>
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-slate-900">{testimonial.name}</p>
                  <p className="text-slate-600 text-sm">{testimonial.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-20 bg-gold-50 p-12 rounded-lg text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Join Our Satisfied Clients</h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Your event deserves the same level of excellence. Let's create your success story.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
