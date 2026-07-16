'use client';

import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import styles from '@/styles/dharma.module.css';
import Link from 'next/link';
import { FaInstagram, FaTiktok, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const AnimatedLink = ({ href, children, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={styles.footerLinkHover}
        initial={{ x: '-100%' }}
        animate={isHovered ? { x: 0 } : { x: '-100%' }}
        transition={{ duration: 0.3 }}
      />
      <Link href={href} className={`${styles.footerLink} ${className || ''}`}>
        <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
      </Link>
    </motion.div>
  );
};

const AnimatedIconLink = ({ href, icon: Icon, ariaLabel }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={styles.footerIconWrapper}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={styles.footerIconHover}
        initial={{ x: '-100%' }}
        animate={isHovered ? { x: 0 } : { x: '-100%' }}
        transition={{ duration: 0.3 }}
      />
      <a href={href} aria-label={ariaLabel} className={styles.footerIcon}>
        <Icon size={24} />
      </a>
    </motion.div>
  );
};

export default function AnimatedFooter() {
  const socialLinks = [
    { href: 'https://instagram.com/dharmasestheticdesign', icon: FaInstagram, ariaLabel: 'Instagram' },
    { href: 'https://tiktok.com/@dharmasesthetic', icon: FaTiktok, ariaLabel: 'TikTok' },
    { href: 'https://facebook.com/dharmasesthetic', icon: FaFacebook, ariaLabel: 'Facebook' },
    { href: 'https://wa.me/message', icon: FaWhatsapp, ariaLabel: 'WhatsApp' },
  ];

  const footerLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#packages' },
    { label: 'Contact', href: '#contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ];

  const companyDescription = 'Dharma\'s Esthetic Design Center transforms Shopify stores into recognizable brands through AI-powered content creation and expert web design. We combine cutting-edge technology with human expertise to deliver professional results fast.';

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.animatedFooter}>
      <div className={styles.footerContent}>
        {/* Heading Section */}
        <div className={styles.footerHeading}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            Ready to grow your store?
          </motion.h2>
        </div>

        {/* Main Grid */}
        <div className={styles.footerGrid}>
          {/* Social Links - Desktop */}
          <div className={styles.footerSocialDesktop}>
            {socialLinks.slice(0, 2).map((link) => (
              <AnimatedIconLink
                key={link.ariaLabel}
                href={link.href}
                icon={link.icon}
                ariaLabel={link.ariaLabel}
              />
            ))}
          </div>

          {/* Canvas Area */}
          <div className={styles.footerCanvasArea} />

          {/* Links Grid */}
          <div className={styles.footerLinksGrid}>
            {footerLinks.slice(0, 2).map((link, i) => (
              <AnimatedLink key={link.label} href={link.href}>
                {link.label}
              </AnimatedLink>
            ))}
          </div>

          {/* Description Section */}
          <motion.div
            className={styles.footerDescription}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <p>{companyDescription}</p>
          </motion.div>

          {/* Additional Links */}
          <div className={styles.footerLinksGrid}>
            {footerLinks.slice(2, 5).map((link) => (
              <AnimatedLink key={link.label} href={link.href}>
                {link.label}
              </AnimatedLink>
            ))}
          </div>
        </div>

        {/* Social Links - Mobile */}
        <div className={styles.footerSocialMobile}>
          {socialLinks.map((link) => (
            <AnimatedIconLink
              key={link.ariaLabel}
              href={link.href}
              icon={link.icon}
              ariaLabel={link.ariaLabel}
            />
          ))}
        </div>

        {/* Copyright */}
        <motion.div
          className={styles.footerCopyright}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <p>
            © {currentYear} Dharma&apos;s Esthetic Design Center. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
