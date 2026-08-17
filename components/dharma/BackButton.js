import Link from 'next/link';
import styles from '@/styles/dharma.module.css';

export default function BackButton({ href, label = '← Back' }) {
  return (
    <Link href={href} className={styles.backButton}>
      {label}
    </Link>
  );
}
