'use client';

import { useMemo, useState } from 'react';
import styles from '@/styles/dharma.module.css';
import { ALACARTE_GROUPS, ALACARTE_ITEM_MAP } from './data';

export default function AlaCarteCart() {
  const [selected, setSelected] = useState({});

  const toggleItem = (id) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = true;
      }
      return next;
    });
  };

  const selectedIds = Object.keys(selected);

  const total = useMemo(
    () => selectedIds.reduce((sum, id) => sum + (ALACARTE_ITEM_MAP[id]?.price || 0), 0),
    [selectedIds]
  );

  const nudges = useMemo(() => {
    return selectedIds
      .map((id) => {
        const item = ALACARTE_ITEM_MAP[id];
        if (!item || !item.prereqs || item.prereqs.length === 0) return null;
        const hasPrereq = item.prereqs.some((prereqId) => selected[prereqId]);
        if (hasPrereq) return null;
        const prereqNames = item.prereqs
          .map((prereqId) => ALACARTE_ITEM_MAP[prereqId]?.name)
          .filter(Boolean)
          .join(' or ');
        return { id, itemName: item.name, prereqNames };
      })
      .filter(Boolean);
  }, [selectedIds, selected]);

  return (
    <section id="alacarte" className={`${styles.section} ${styles.alacarte}`}>
      <div className={styles.sectionHead}>
        <div className={styles.sectionEyebrow}>À La Carte</div>
        <h2>Pick only what you need.</h2>
        <p>
          Add services to your cart — we&apos;ll flag when something works better after another
          piece is already in place.
        </p>
      </div>

      <div className={styles.cartLayout}>
        <div>
          {ALACARTE_GROUPS.map((group) => (
            <div key={group.title} className={styles.alaGroup}>
              <h3 className={styles.alaGroupTitle}>{group.title}</h3>
              {group.items.map((item) => {
                const isSelected = Boolean(selected[item.id]);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className={`${styles.alaItem} ${isSelected ? styles.alaItemSelected : ''}`}
                    aria-pressed={isSelected}
                  >
                    <div className={styles.alaItemInfo}>
                      <div className={styles.alaItemName}>
                        <span className={styles.alaCheck}>{isSelected ? '✓' : ''}</span>
                        {item.name}
                      </div>
                      <div className={styles.alaWhy}>{item.why}</div>
                    </div>
                    <span className={styles.alaPrice}>
                      {item.priceLabel || `$${item.price}`}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className={styles.cartPanel}>
          <div className={styles.cartTitle}>Your Selection</div>
          {selectedIds.length === 0 ? (
            <p className={styles.cartEmpty}>Nothing added yet — click a service to start.</p>
          ) : (
            <>
              <div className={styles.cartList}>
                {selectedIds.map((id) => {
                  const item = ALACARTE_ITEM_MAP[id];
                  return (
                    <div key={id} className={styles.cartLine}>
                      <span>{item.name}</span>
                      <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {item.priceLabel || `$${item.price}`}
                        <button type="button" onClick={() => toggleItem(id)} aria-label={`Remove ${item.name}`}>
                          ✕
                        </button>
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className={styles.cartTotal}>
                <span>Total</span>
                <span>${total}</span>
              </div>
            </>
          )}

          {nudges.map((nudge) => (
            <div key={nudge.id} className={styles.nudge}>
              Consider adding <strong>{nudge.prereqNames}</strong> first — it sets up{' '}
              <strong>{nudge.itemName}</strong> to actually work.
            </div>
          ))}

          <a
            href={`mailto:jason@dharmasemporium.com?subject=À%20La%20Carte%20Quote&body=Services%20I'm%20interested%20in:%0A${selectedIds
              .map((id) => `- ${ALACARTE_ITEM_MAP[id].name}`)
              .join('%0A')}`}
            className={styles.cartCta}
          >
            Get a Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}
