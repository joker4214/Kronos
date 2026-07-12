'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/dharma.module.css';

export default function AlacartePage() {
  const [selectedServices, setSelectedServices] = useState([]);

  const services = [
    // Content & Writing
    {
      category: 'Content & Writing',
      items: [
        { id: 'social-copy', name: 'Social Media Copy', price: 150, desc: '7-day ad copy for one platform', icon: '📱' },
        { id: 'blog-post', name: 'SEO Blog Post', price: 200, desc: '1 optimized blog post (1500+ words)', icon: '✍️' },
        { id: 'email-sequence', name: 'Email Campaign', price: 250, desc: '3-email nurture sequence', icon: '📧' },
        { id: 'product-desc', name: 'Product Descriptions', price: 100, desc: 'Up to 10 optimized product descriptions', icon: '📝' },
      ]
    },
    // Photography & Video
    {
      category: 'Photography & Video',
      items: [
        { id: 'product-photos', name: 'Product Photography', price: 300, desc: '10 professional product photos', icon: '📸' },
        { id: 'ai-video', name: 'AI Video Generation', price: 200, desc: '1 AI-generated product video', icon: '🎬' },
        { id: 'lifestyle-shoot', name: 'Lifestyle Shoot', price: 400, desc: 'On-location product + lifestyle photos', icon: '🌟' },
        { id: 'reels-package', name: 'Reels Content Pack', price: 250, desc: '5 Instagram Reels / TikTok videos', icon: '🎥' },
      ]
    },
    // Strategy & Setup
    {
      category: 'Strategy & Setup',
      items: [
        { id: 'hashtag-research', name: 'Hashtag Strategy', price: 75, desc: 'Platform-specific hashtag research', icon: '🏷️' },
        { id: 'ga4-setup', name: 'GA4 Setup', price: 150, desc: 'Complete Google Analytics 4 configuration', icon: '📊' },
        { id: 'brand-guide', name: 'Brand Voice Guide', price: 300, desc: 'Written brand messaging & voice guidelines', icon: '🎯' },
        { id: 'social-audit', name: 'Social Media Audit', price: 200, desc: 'Competitor analysis + recommendations', icon: '🔍' },
      ]
    },
    // Brand & Design
    {
      category: 'Brand & Design',
      items: [
        { id: 'brand-refresh', name: 'Brand Refresh', price: 500, desc: 'Visual brand style update', icon: '🎨' },
        { id: 'profile-setup', name: 'Profile Optimization', price: 125, desc: 'Instagram/TikTok profile setup & copywriting', icon: '👤' },
        { id: 'email-templates', name: 'Email Templates', price: 200, desc: '3 custom email templates for campaigns', icon: '📬' },
        { id: 'graphics-pack', name: 'Social Graphics Pack', price: 150, desc: '10 custom social media graphics', icon: '🖼️' },
      ]
    },
  ];

  const bundles = [
    {
      name: 'Content Starter',
      services: ['social-copy', 'hashtag-research'],
      price: 200,
      savings: 25,
    },
    {
      name: 'Video Pro',
      services: ['ai-video', 'reels-package', 'product-photos'],
      price: 650,
      savings: 100,
    },
    {
      name: 'Brand Builder',
      services: ['brand-refresh', 'brand-guide', 'email-templates'],
      price: 750,
      savings: 250,
    },
    {
      name: 'Analytics Master',
      services: ['ga4-setup', 'social-audit', 'product-desc'],
      price: 400,
      savings: 50,
    },
  ];

  const toggleService = (id) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    let total = 0;
    selectedServices.forEach(id => {
      services.forEach(category => {
        const item = category.items.find(i => i.id === id);
        if (item) total += item.price;
      });
    });
    return total;
  };

  const total = calculateTotal();

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <Link href="/dharma" className={styles.logo}>
            <span className={styles.logoText}>DHARMA'S <span className={styles.logoAccent}>Esthetic</span></span>
          </Link>
          <div className={styles.navLinks}>
            <Link href="/dharma#packages" className={styles.navLink}>Packages</Link>
            <Link href="/dharma#contact" className={styles.navLink}>Contact</Link>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>À La Carte Services</h1>
          <p className={styles.heroSubtitle}>Pick exactly what you need, or mix & match for custom bundles</p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ background: 'var(--cream)', padding: '4rem 2rem', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>
            {/* Services Grid */}
            <div>
              {services.map((category, idx) => (
                <div key={idx} style={{ marginBottom: '3rem' }}>
                  <h2 style={{
                    fontSize: '1.5rem',
                    color: 'var(--navy)',
                    marginBottom: '1.5rem',
                    paddingBottom: '1rem',
                    borderBottom: '2px solid var(--gold)',
                    fontFamily: "'Georgia', serif"
                  }}>
                    {category.category}
                  </h2>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.5rem'
                  }}>
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleService(item.id)}
                        style={{
                          background: selectedServices.includes(item.id) ? 'var(--light-navy)' : 'white',
                          padding: '1.5rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          border: selectedServices.includes(item.id) ? '2px solid var(--gold)' : '2px solid #e0e0e0',
                        }}
                      >
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                        <h3 style={{
                          color: selectedServices.includes(item.id) ? 'var(--gold)' : 'var(--navy)',
                          marginBottom: '0.5rem',
                          fontSize: '1.1rem'
                        }}>
                          {item.name}
                        </h3>
                        <p style={{
                          color: selectedServices.includes(item.id) ? '#ffffff' : 'var(--navy)',
                          fontSize: '0.9rem',
                          lineHeight: '1.5',
                          marginBottom: '1rem',
                          opacity: 0.85
                        }}>
                          {item.desc}
                        </p>
                        <div style={{
                          fontSize: '1.3rem',
                          fontWeight: '700',
                          color: 'var(--gold)'
                        }}>
                          ${item.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar - Order Summary & Bundles */}
            <div style={{ position: 'sticky', top: '120px' }}>
              {/* Bundle Suggestions */}
              <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #e0e0e0' }}>
                <h3 style={{ color: 'var(--navy)', marginBottom: '1rem', fontSize: '1.1rem' }}>💡 Popular Bundles</h3>
                {bundles.map((bundle, idx) => (
                  <div key={idx} style={{
                    background: 'var(--cream)',
                    padding: '1rem',
                    borderRadius: '6px',
                    marginBottom: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '1px solid #e0e0e0',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <p style={{ color: 'var(--navy)', fontWeight: '600', marginBottom: '0.25rem' }}>{bundle.name}</p>
                        <p style={{ color: 'var(--navy)', fontSize: '0.8rem', opacity: 0.7 }}>
                          {bundle.services.length} items
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ color: 'var(--gold)', fontWeight: '700' }}>${bundle.price}</p>
                        <p style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: '600' }}>
                          Save ${bundle.savings}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div style={{
                background: 'white',
                borderRadius: '8px',
                padding: '1.5rem',
                border: '2px solid var(--gold)',
                position: 'sticky',
                top: '120px'
              }}>
                <h3 style={{ color: 'var(--navy)', marginBottom: '1rem', fontSize: '1.1rem' }}>
                  Your Selection
                </h3>

                {selectedServices.length === 0 ? (
                  <p style={{ color: 'var(--navy)', opacity: 0.6, fontSize: '0.9rem' }}>
                    No services selected
                  </p>
                ) : (
                  <div>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
                      {selectedServices.map(id => {
                        let service = null;
                        services.forEach(category => {
                          const item = category.items.find(i => i.id === id);
                          if (item) service = item;
                        });
                        return (
                          <div key={id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '0.5rem 0',
                            borderBottom: '1px solid #e0e0e0',
                            fontSize: '0.9rem'
                          }}>
                            <span style={{ color: 'var(--navy)' }}>{service.name}</span>
                            <span style={{ color: 'var(--gold)', fontWeight: '600' }}>${service.price}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div style={{
                      paddingTop: '1rem',
                      borderTop: '2px solid var(--gold)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{ color: 'var(--navy)', fontWeight: '600' }}>Total:</span>
                      <span style={{ color: 'var(--gold)', fontWeight: '700', fontSize: '1.3rem' }}>
                        ${total}
                      </span>
                    </div>
                  </div>
                )}

                <a href="mailto:jason@dharmasemporium.com" className={styles.btnGold} style={{
                  width: '100%',
                  textAlign: 'center',
                  marginTop: '1rem',
                  display: 'block'
                }}>
                  Get Custom Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Want a pre-built package instead?</h2>
          <p>Our three core packages combine the most popular services for proven results.</p>
          <div className={styles.ctaButtons}>
            <Link href="/dharma#packages" className={styles.btnGold}>View Packages</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2026 Dharma's <span>Esthetic Design Center</span>. All rights reserved.</p>
      </footer>
    </div>
  );
}
