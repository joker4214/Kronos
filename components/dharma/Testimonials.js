'use client';

import { useState } from 'react';
import styles from '@/styles/dharma.module.css';
import Reveal from './Reveal';

export default function Testimonials() {
  const [name, setName] = useState('');
  const [store, setStore] = useState('');
  const [quote, setQuote] = useState('');
  const [status, setStatus] = useState('idle'); // idle | saving | done | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('saving');
    try {
      const res = await fetch('/api/testimonial-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, store, quote }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save that.');
      setStatus('done');
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <section id="reviews" className={`${styles.section} ${styles.testimonials}`}>
      <Reveal className={styles.sectionHead}>
        <div className={styles.sectionEyebrow}>Reviews</div>
        <h2>What clients are saying</h2>
        <p>We&apos;re just getting started — be one of our first reviews.</p>
      </Reveal>

      <div className={styles.testiGrid}>
        <div className={styles.testiEmpty}>Client testimonials will appear here as they come in.</div>
      </div>

      <div className={styles.testiFormWrap}>
        {status === 'done' ? (
          <p className={styles.testiSuccess}>
            Thank you! Your testimonial has been received — we&apos;ll review it and feature it here soon.
          </p>
        ) : (
          <form className={styles.testiForm} onSubmit={handleSubmit}>
            <h3 className={styles.testiFormTitle}>Leave us a testimonial</h3>
            <input
              type="text"
              required
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.testiInput}
              maxLength={100}
            />
            <input
              type="text"
              placeholder="Your store (optional)"
              value={store}
              onChange={(e) => setStore(e.target.value)}
              className={styles.testiInput}
              maxLength={100}
            />
            <textarea
              required
              placeholder="Tell us about your experience working with us"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className={styles.testiTextarea}
              rows={4}
              maxLength={1000}
            />
            <button type="submit" className={styles.testiSubmitBtn} disabled={status === 'saving'}>
              {status === 'saving' ? 'Sending…' : 'Submit testimonial'}
            </button>
            {status === 'error' && <p className={styles.testiErrorText}>Could not save that — try again.</p>}
          </form>
        )}
      </div>

      <div className={styles.reviewCtaRow}>
        {/* TODO(Jason): once the Google Business Profile is verified, swap this span for:
            <a href="https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID"
               target="_blank" rel="noopener noreferrer" className={styles.btnReview}>
              ★ Leave us a Google review
            </a> */}
        <span className={`${styles.btnReview} ${styles.btnReviewDisabled}`}>
          ★ Leave us a Google review <span className={styles.badgeSoon}>Coming soon</span>
        </span>

        {/* TODO(Jason): once the Trustpilot business page is live, swap this span for:
            <a href="https://www.trustpilot.com/evaluate/YOUR-DOMAIN"
               target="_blank" rel="noopener noreferrer" className={styles.btnReview}>
              ★ Leave us a Trustpilot review
            </a> */}
        <span className={`${styles.btnReview} ${styles.btnReviewDisabled}`}>
          ★ Leave us a Trustpilot review <span className={styles.badgeSoon}>Coming soon</span>
        </span>
      </div>
    </section>
  );
}
