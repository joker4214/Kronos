'use client';

import { useState, useEffect } from 'react';
import Styles from '@/styles/dashboard.module.css';
import IdeasTab from './tabs/IdeasTab';
import DraftsTab from './tabs/DraftsTab';
import MetricsTab from './tabs/MetricsTab';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('ideas');
  const [ideas, setIdeas] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [ideasRes, draftsRes, metricsRes] = await Promise.all([
        fetch('/api/ideas'),
        fetch('/api/drafts'),
        fetch('/api/metrics'),
      ]);

      if (ideasRes.ok) setIdeas(await ideasRes.json());
      if (draftsRes.ok) setDrafts(await draftsRes.json());
      if (metricsRes.ok) setMetrics(await metricsRes.json());
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setLoading(false);
    }
  };

  return (
    <div className={Styles.dashboard}>
      <header className={Styles.header}>
        <h1>📅 Kronos Content Strategy</h1>
        <p>Google Calendar → Claude Drafts → Social Metrics</p>
      </header>

      <nav className={Styles.tabs}>
        <button
          className={`${Styles.tab} ${activeTab === 'ideas' ? Styles.active : ''}`}
          onClick={() => setActiveTab('ideas')}
        >
          📌 Ideas ({ideas.length})
        </button>
        <button
          className={`${Styles.tab} ${activeTab === 'drafts' ? Styles.active : ''}`}
          onClick={() => setActiveTab('drafts')}
        >
          ✍️ Drafts ({drafts.length})
        </button>
        <button
          className={`${Styles.tab} ${activeTab === 'metrics' ? Styles.active : ''}`}
          onClick={() => setActiveTab('metrics')}
        >
          📊 Conversions ({metrics.length})
        </button>
      </nav>

      <main className={Styles.content}>
        {loading ? (
          <p className={Styles.loading}>Loading your content...</p>
        ) : (
          <>
            {activeTab === 'ideas' && <IdeasTab ideas={ideas} onRefresh={fetchData} />}
            {activeTab === 'drafts' && <DraftsTab drafts={drafts} onRefresh={fetchData} />}
            {activeTab === 'metrics' && <MetricsTab metrics={metrics} />}
          </>
        )}
      </main>

      <footer className={Styles.footer}>
        <p>🤖 Scheduled Tasks: Friday 8 AM (Metrics) • Friday 10 AM (Content Generation)</p>
      </footer>
    </div>
  );
}
