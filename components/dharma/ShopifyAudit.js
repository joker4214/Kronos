'use client';

import { useState } from 'react';
import styles from '@/styles/shopifyAudit.module.css';

const AUDITS = [
  {
    id: 'basic-audit',
    name: 'Basic Audit',
    price: '$150–$250',
    items: [
      'Homepage Review — evaluates layout clarity, hero banner effectiveness, navigation structure, and trust signals.',
      'Product Page Review — checks product descriptions, image quality, pricing visibility, CTA placement, and mobile responsiveness.',
      'Basic SEO Check — scans meta titles, meta descriptions, H1 tags, alt text usage, and keyword presence.',
      'Banner & Logo Feedback — assesses branding consistency, image resolution, color harmony, and professionalism.',
      'Mobile Optimization Check — verifies usability and layout stability across mobile devices.',
      'Speed & Performance Snapshot — quick review of load times and major performance blockers.',
      '10–15 Actionable Recommendations — prioritized list of improvements with clear next steps.',
    ],
  },
  {
    id: 'standard-audit',
    name: 'Standard Audit',
    price: '$300–$450',
    items: [
      'Full Design & UX Review — evaluates layout consistency, spacing, typography, color usage, navigation flow, and user journey friction points.',
      'Branding Consistency Check — reviews logo quality, banner design, color palette alignment, tone of voice, and trust-building elements.',
      'SEO Audit — includes meta titles, descriptions, H1/H2 structure, alt tags, keyword alignment, site speed, and basic schema presence.',
      'GA4 Setup Review — checks event tracking, enhanced ecommerce configuration, purchase funnel accuracy, and missing conversions.',
      'CRO Review — evaluates CTA placement, product page structure, social proof, reviews, cart visibility, and checkout flow.',
      'Technical Shopify Checks — scans apps, theme settings, broken links, duplicate content, and potential conflicts.',
      'Competitor Comparison — benchmarks design, pricing, SEO strength, and branding against 1–2 competitors.',
      '20–40 Actionable Recommendations — organized by category (Design, SEO, CRO, Technical).',
      'Professional PDF or Notion Report — structured documentation clients can use immediately.',
    ],
  },
  {
    id: 'premium-audit',
    name: 'Premium Audit',
    price: '$500–$900',
    items: [
      'Everything included in the Standard Audit.',
      'Full GA4 Funnel Analysis — evaluates user paths, drop-off points, conversion bottlenecks, and event accuracy.',
      'Heatmap & Behavior Recommendations — suggests scroll-depth improvements, click-map insights, and layout adjustments.',
      'Product Page Rewrite Suggestions — improved product descriptions, feature highlights, and SEO-optimized copy.',
      'Homepage Redesign Mockups — visual mockups or wireframes showing improved layout, banners, and trust elements.',
      'SEO Keyword Strategy — identifies target keywords, content gaps, and ranking opportunities.',
      'Technical Shopify Deep Scan — checks theme code issues, app conflicts, schema markup, and performance blockers.',
      'Working Session (WhatsApp or screen share) — collaborative walkthrough of the store to identify issues and opportunities.',
      'Findings & Recommendations Session (WhatsApp) — a dedicated session to explain the audit results, improvements, and strategic next steps.',
      'Implementation Roadmap (30–60 days) — prioritized plan showing what to fix first and why.',
    ],
  },
];

export default function ShopifyAudit() {
  const [openId, setOpenId] = useState(null);

  return (
    <div>
      {AUDITS.map((audit) => {
        const isOpen = openId === audit.id;
        return (
          <div key={audit.id} className={styles.module}>
            <button
              type="button"
              className={styles.moduleHeader}
              onClick={() => setOpenId(isOpen ? null : audit.id)}
              aria-expanded={isOpen}
            >
              <p className={styles.moduleTitle}>
                {audit.name} — {audit.price}
              </p>
              <p className={styles.modulePrice}>
                {isOpen ? 'Click to hide deliverables' : 'Click to view deliverables'}
              </p>
            </button>
            {isOpen && (
              <div className={styles.moduleContent}>
                <ul>
                  {audit.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
