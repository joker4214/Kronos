import styles from '@/styles/dharma.module.css';

export default function BlobBackground() {
  return (
    <div className={styles.blobContainer}>
      <div className={styles.blobPattern} />
    </div>
  );
}
