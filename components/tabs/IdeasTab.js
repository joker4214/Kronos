'use client';

import Styles from '@/styles/tabs.module.css';

export default function IdeasTab({ ideas, onRefresh }) {
  const syncCalendar = async () => {
    try {
      const response = await fetch('/api/calendar/sync', { method: 'POST' });
      if (response.ok) {
        alert('Calendar synced!');
        onRefresh();
      }
    } catch (err) {
      alert('Failed to sync calendar: ' + err.message);
    }
  };

  const generateContent = async (ideaId) => {
    try {
      const response = await fetch('/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ideaId }),
      });
      if (response.ok) {
        alert('Content generated!');
        onRefresh();
      }
    } catch (err) {
      alert('Failed to generate content: ' + err.message);
    }
  };

  return (
    <div className={Styles.tab}>
      <div className={Styles.tabHeader}>
        <h2>Calendar Ideas</h2>
        <button onClick={syncCalendar} className={Styles.primaryBtn}>
          🔄 Sync Google Calendar
        </button>
      </div>

      {ideas.length === 0 ? (
        <p className={Styles.empty}>No ideas yet. Sync your Google Calendar to get started!</p>
      ) : (
        <div className={Styles.grid}>
          {ideas.map((idea) => (
            <div key={idea.id} className={Styles.card}>
              <h3>{idea.title}</h3>
              <p>{idea.description}</p>
              <p className={Styles.meta}>
                📅 {new Date(idea.scheduledDate).toLocaleDateString()}
                <span className={Styles.status}>{idea.status}</span>
              </p>
              {idea.status === 'pending' && (
                <button
                  onClick={() => generateContent(idea.id)}
                  className={Styles.secondaryBtn}
                >
                  Generate Content
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
