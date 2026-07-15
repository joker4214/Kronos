'use client';

import styles from '@/styles/dharma.module.css';

function LogoMark() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 40, flexShrink: 0 }}>
      <circle cx="100" cy="100" r="96" fill="#16181C" />
      <circle cx="100" cy="100" r="92" fill="none" stroke="#2F5FFF" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="85" fill="none" stroke="#2F5FFF" strokeWidth="0.5" opacity="0.4" />
      <line x1="22" y1="76" x2="178" y2="76" stroke="#2F5FFF" strokeWidth="0.6" opacity="0.4" />
      <line x1="22" y1="128" x2="178" y2="128" stroke="#2F5FFF" strokeWidth="0.6" opacity="0.4" />
      <text x="100" y="130" fontFamily="Arial,sans-serif" fontSize="96" fontWeight="700" fill="#FFFFFF" textAnchor="middle">D</text>
      <text x="114" y="130" fontFamily="Arial,sans-serif" fontSize="58" fontWeight="400" fill="#2F5FFF" textAnchor="middle" opacity="0.35">E</text>
      <text x="100" y="70" fontFamily="Arial,sans-serif" fontSize="11.5" fill="#2F5FFF" textAnchor="middle" letterSpacing="5">DHARMA&apos;S</text>
      <defs>
        <path id="dharma-badge-curve" d="M 22,132 A 82,82 0 0,0 178,132" />
      </defs>
      <text fontFamily="Arial,sans-serif" fontSize="9" fill="#FFFFFF" letterSpacing="3.5" opacity="0.75">
        <textPath href="#dharma-badge-curve" startOffset="50%" textAnchor="middle">
          &middot; ESTHETIC DESIGN CENTER &middot;
        </textPath>
      </text>
    </svg>
  );
}

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#packages', label: 'Packages' },
  { href: '#webdesign', label: 'Web Design' },
  { href: '#alacarte', label: 'À La Carte' },
  { href: '#team', label: 'Team' },
];

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <nav className={styles.navContent}>
        <a href="#top" className={styles.logo}>
          <LogoMark />
          <span>
            DHARMA&apos;S <span className={styles.logoAccent}>Esthetic</span>
          </span>
        </a>
        <div className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className={styles.navCta}>
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
