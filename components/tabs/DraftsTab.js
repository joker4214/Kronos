'use client';

import Styles from '@/styles/tabs.module.css';

export default function DraftsTab({ drafts, onRefresh }) {
  const platforms = ['instagram', 'tiktok', 'linkedin', 'twitter'];
  const platformEmojis = {
    instagram: '📸',
    tiktok: '🎵',
    linkedin: '💼',
    twitter: '𝕏',
  };

  const markPosted = async (draftId, postUrl) => {
    const url = prompt('Enter the post URL:', postUrl || '');
    if (url) {
      try {
        const response = await fetch(`/api/drafts/${draftId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'posted', postUrl: url }),
        });
        if (response.ok) {
          onRefresh();
        }
      } catch (err) {
        alert('Failed to update draft: ' + err.message);
      }
    }
  };

  return (
    <div className={Styles.tab}>
      <div className={Styles.tabHeader}>
        <h2>Content Drafts</h2>
        <p className={Styles.subtitle}>Review and post these to your social channels</p>
      </div>

      {drafts.length === 0 ? (
        <p className={Styles.empty}>No drafts yet. Generate content from an idea to get started!</p>
      ) : (
        <div className={Styles.grid}>
          {drafts.map((draft) => (
            <div key={draft.id} className={`${Styles.card} ${Styles.draftCard}`}>
              <div className={Styles.draftHeader}>
                <span className={Styles.platform}>
                  {platformEmojis[draft.platform]} {draft.platform.toUpperCase()}
                </span>
                <span className={Styles.status}>{draft.status}</span>
              </div>

              <p className={Styles.content}>{draft.content}</p>

              {draft.imageUrl && (
                <img src={draft.imageUrl} alt="Draft" className={Styles.image} />
              )}

              <div className={Styles.actions}>
                {draft.status === 'draft' && (
                  <button
                    onClick={() => markPosted(draft.id, '')}
                    className={Styles.primaryBtn}
                  >
                    ✅ Mark as Posted
                  </button>
                )}
                {draft.status === 'posted' && (
                  <a
                    href={draft.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={Styles.secondaryBtn}
                  >
                    🔗 View Post
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
