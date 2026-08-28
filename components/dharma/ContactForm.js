'use client';

import { useState } from 'react';
import styles from '@/styles/dharma.module.css';

const INITIAL = { name: '', email: '', message: '', company: '' };

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('request failed');

      setStatus('sent');
      setForm(INITIAL);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <p className={styles.contactSent}>
        Thanks — we got your message and we&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={handleChange}
        className={styles.honeypot}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={form.name}
        onChange={handleChange}
        className={styles.contactInput}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={form.email}
        onChange={handleChange}
        className={styles.contactInput}
        required
      />
      <textarea
        name="message"
        placeholder="Tell us about your store..."
        value={form.message}
        onChange={handleChange}
        className={styles.contactInput}
        rows={4}
        required
      />
      <button
        type="submit"
        className={`${styles.btn} ${styles.btnAccent}`}
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'error' && (
        <p className={styles.contactError}>
          Something went wrong — email us directly at{' '}
          <a href="mailto:jason@dharmasestheticdesign.com">jason@dharmasestheticdesign.com</a>.
        </p>
      )}
    </form>
  );
}
