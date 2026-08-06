'use client';

import { useState } from 'react';
import styles from '@/styles/dharma.module.css';
import Reveal from './Reveal';

const FAQS = [
  {
    q: "What if I don't like the final result?",
    a: "Every package includes one full round of revisions at no extra cost — just tell us what to adjust within 5 business days of delivery and we'll make it right. Need more than one round? Additional revisions are available for a small fee.",
  },
  {
    q: 'How fast will I actually get my content or store work?',
    a: 'Turnaround is 1–7 days depending on the package — Starter Launch moves fastest, Full Agency (the most comprehensive scope) takes the longest. Exact timing is confirmed when you get started.',
  },
  {
    q: 'Who actually does the work — is this all AI?',
    a: "AI handles the heavy lifting on drafts and speed, but every project is built and reviewed by our real team — see the Our Team section below for who you'll actually be working with.",
  },
  {
    q: 'Can I get a refund?',
    a: "Refunds aren't available once work has started, since real time goes into your project right away. That's exactly why the revision round is included — the goal is that a refund is never the thing you need.",
  },
  {
    q: "Not sure which package is right for me?",
    a: "Email us and tell us about your store — we'll recommend the right package, or build something custom from the à la carte menu if none of the three tiers fit exactly.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className={styles.section}>
      <Reveal className={styles.sectionHead}>
        <div className={styles.sectionEyebrow}>Questions</div>
        <h2>Before you get started</h2>
      </Reveal>
      <Reveal className={styles.faqList} delay={0.1}>
        {FAQS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.q} className={styles.faqItem}>
              <button
                type="button"
                className={styles.faqQuestion}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span>{item.q}</span>
                <span className={styles.faqIcon}>{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <p className={styles.faqAnswer}>{item.a}</p>}
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
