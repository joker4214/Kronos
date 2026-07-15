import styles from '@/styles/dharma.module.css';

const STATS = [
  { num: '5+', label: 'Platforms Covered' },
  { num: '20+', label: 'Services Offered' },
  { num: '1–7 Days', label: 'Turnaround' },
  { num: '3', label: 'Web Design Tiers' },
];

export default function StatsBar() {
  return (
    <div className={styles.stats}>
      <div className={styles.statsGrid}>
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div className={styles.statNum}>{stat.num}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
