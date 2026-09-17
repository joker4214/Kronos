'use client';

import { useState } from 'react';
import styles from '@/styles/squeeze.module.css';
import PackageCheckout from '@/components/dharma/PackageCheckout';

const CHECKLIST = [
  {
    n: 1,
    title: 'Homepage clarity',
    q: 'Can a stranger tell what you sell and why it matters in 5 seconds?',
    why: 'If someone lands on your homepage and has to think for even a second about what you sell, they are gone — nobody scrolls to figure out a business model.',
    fix: 'Put one sentence at the very top that says what you sell and who it is for. Nothing clever, just clear.',
  },
  {
    n: 2,
    title: 'Product photos',
    q: 'Are they telling a story, or just showing the product?',
    why: 'A product sitting on a white background looks like every other product on the internet. People buy the feeling of owning it, not the object itself.',
    fix: 'Add one lifestyle shot per product showing it in use, worn, or next to something that gives it scale and context.',
  },
  {
    n: 3,
    title: 'Page speed',
    q: 'Is your store loading fast enough that people actually stick around?',
    why: 'Every extra second your store takes to load, more people leave before they ever see what you sell. Speed is invisible, but it is costing you sales right now.',
    fix: 'Run your homepage through a free speed checker. Oversized, uncompressed images are almost always the culprit.',
  },
  {
    n: 4,
    title: 'Mobile experience',
    q: 'Does checkout actually work cleanly on a phone?',
    why: 'Most of your traffic is on a phone, and a checkout that is clunky or hard to tap loses the sale at the exact moment someone was ready to buy.',
    fix: 'Actually buy something from your own store on your phone, right now, and see where you get annoyed.',
  },
  {
    n: 5,
    title: 'Analytics',
    q: 'Is GA4 (or anything) actually installed and tracking?',
    why: 'Without analytics you are guessing at what is working — you finally know what is working once it is set up right.',
    fix: 'Confirm GA4 is installed and firing on a real page view before you spend another dollar on ads.',
  },
  {
    n: 6,
    title: 'SEO basics',
    q: 'Do your product titles and descriptions target real search terms?',
    why: 'If your titles are cute instead of searchable, Google has nothing to match you to when someone is actually looking to buy.',
    fix: 'Rewrite your top 5 product titles to include the actual words a buyer would type into Google.',
  },
  {
    n: 7,
    title: 'Social proof',
    q: 'Is there anything on the page proving other people bought and liked it?',
    why: 'People trust other buyers more than they trust you. A page with zero reviews or testimonials reads as untested, even if your product is great.',
    fix: 'Add even 2-3 real reviews near your top products. Something is infinitely better than nothing.',
  },
  {
    n: 8,
    title: 'Ad-to-page match',
    q: 'Does what people click match what they land on?',
    why: 'If your ad promises one thing and the landing page shows something else, that mismatch reads as a bait-and-switch and people bounce immediately.',
    fix: 'Open your top ad and the page it links to side by side. The headline and image should feel like the same conversation.',
  },
  {
    n: 9,
    title: 'Email capture',
    q: 'Is there any way to keep a visitor who is not ready to buy today?',
    why: 'Most visitors will not buy on their first visit. With no way to capture them, every one of those people is gone for good.',
    fix: 'Add a simple pop-up or footer signup offering something small in exchange for an email.',
  },
  {
    n: 10,
    title: 'Consistent posting',
    q: 'Is there active content anywhere proving the brand is alive?',
    why: 'A visitor who checks your Instagram and sees your last post was months ago starts wondering if you are even still in business.',
    fix: 'Post something, anything, at least once a week. Consistency matters more than production value.',
  },
];

export default function ChecklistSqueeze() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | saving | done | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('saving');
    try {
      const res = await fetch('/api/checklist-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save that.');
      setStatus('done');
    } catch (err) {
      setStatus('error');
    }
  }

  if (status !== 'done') {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.eyebrow}>Free — takes 10 minutes to run through your own store</div>
          <h1 className={styles.headline}>Your store looks amazing. So why isn&apos;t anyone buying?</h1>
          <p className={styles.subhead}>
            The Shopify Invisibility Checklist — 10 things quietly killing your conversions, and
            exactly how to fix each one.
          </p>

          <ul className={styles.teaserList}>
            <li>Why your product photos aren&apos;t converting (it&apos;s not the photos)</li>
            <li>The one page every invisible store is missing</li>
            <li>A 5-minute GA4 check that tells you what&apos;s actually broken</li>
            <li>The SEO basics most store owners skip entirely</li>
            <li>How to tell if your ads are running or just burning money</li>
          </ul>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="you@yourstore.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <button type="submit" className={styles.cta} disabled={status === 'saving'}>
              {status === 'saving' ? 'One sec…' : 'Get the checklist'}
            </button>
          </form>
          {status === 'error' && <p className={styles.errorText}>Could not save that — try again.</p>}
          <p className={styles.finePrint}>No spam. Just your checklist, then you&apos;re done — unless you want more.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.resultsCard}>
        <div className={styles.eyebrow}>You&apos;re in</div>
        <h1 className={styles.headline}>Here&apos;s your checklist.</h1>
        <p className={styles.subhead}>
          Run through all 10 points against your own store this week. Each one has the same two
          parts: why it actually matters, and the fastest fix.
        </p>

        <div className={styles.checklistGrid}>
          {CHECKLIST.map((item) => (
            <div key={item.n} className={styles.checklistItem}>
              <div className={styles.itemHead}>
                <span className={styles.itemNumber}>{item.n}</span>
                <div>
                  <div className={styles.itemTitle}>{item.title}</div>
                  <div className={styles.itemQ}>{item.q}</div>
                </div>
              </div>
              <p className={styles.itemWhy}><strong>Why it matters:</strong> {item.why}</p>
              <p className={styles.itemFix}><strong>Quick fix:</strong> {item.fix}</p>
            </div>
          ))}
        </div>

        <div className={styles.tripwire}>
          <div className={styles.eyebrow}>While you&apos;re here</div>
          <h2 className={styles.tripwireHeadline}>Want us to just do the first fix for you?</h2>
          <p className={styles.tripwireBody}>
            A real, done-for-you taste of what a package looks like — not a sales call, not a PDF.
            Actual work on your actual store.
          </p>
          <ul className={styles.tripwireList}>
            <li>One branded photo placement, matched to your store&apos;s look</li>
            <li>One product listing fully optimized (title, description, SEO)</li>
            <li>Delivered in 48 hours</li>
          </ul>
          <p className={styles.tripwireNote}>If this is the smallest thing we do, imagine the full package.</p>
          <PackageCheckout packageId="tripwire-48hr-snapshot" packageName="48-Hour Store Snapshot" price={37} />
        </div>
      </div>
    </div>
  );
}
