'use client';

import Styles from '@/styles/tabs.module.css';

export default function MetricsTab({ metrics }) {
  const totalConversions = metrics.reduce((sum, m) => sum + m.conversions, 0);
  const topPlatform = metrics.length > 0
    ? metrics.reduce((max, m) => (m.conversions > max.conversions ? m : max))
    : null;

  const groupedByIdea = metrics.reduce((acc, metric) => {
    if (!acc[metric.ideaId]) {
      acc[metric.ideaId] = [];
    }
    acc[metric.ideaId].push(metric);
    return acc;
  }, {});

  return (
    <div className={Styles.tab}>
      <div className={Styles.tabHeader}>
        <h2>Conversion Metrics</h2>
        <p className={Styles.subtitle}>Collected every Friday 8 AM</p>
      </div>

      <div className={Styles.statsGrid}>
        <div className={Styles.statCard}>
          <h3>Total Conversions</h3>
          <p className={Styles.bigNumber}>{totalConversions}</p>
        </div>
        {topPlatform && (
          <div className={Styles.statCard}>
            <h3>Top Platform</h3>
            <p className={Styles.bigNumber}>{topPlatform.platform}</p>
            <p className={Styles.subtext}>{topPlatform.conversions} conversions</p>
          </div>
        )}
        <div className={Styles.statCard}>
          <h3>Total Content</h3>
          <p className={Styles.bigNumber}>{Object.keys(groupedByIdea).length}</p>
          <p className={Styles.subtext}>pieces tracked</p>
        </div>
      </div>

      {metrics.length === 0 ? (
        <p className={Styles.empty}>
          No metrics collected yet. Metrics are collected every Friday 8 AM.
        </p>
      ) : (
        <div className={Styles.metricsTable}>
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Conversions</th>
                <th>Collected</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric) => (
                <tr key={metric.id}>
                  <td>{metric.platform}</td>
                  <td className={Styles.metric}>{metric.conversions}</td>
                  <td>{new Date(metric.collectedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
