'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Script from 'next/script';
import styles from '@/styles/dharma.module.css';
import { ALACARTE_GROUPS, ALACARTE_ITEM_MAP } from './data';
import Reveal from './Reveal';

// Public identifier, safe to ship in client code -- not the Secret key.
// Generated in Jason's PayPal Developer Dashboard > Apps & Credentials.
const PAYPAL_CLIENT_ID = 'BAAlJ1k4hJuZ3ZCkwpG6F_k3HEH_NNGbJudXwNQuzJ0_a7ldz1LNFpfZFXkHilPKrYJUGXvE9D-ccyP_7w';

export default function AlaCarteCart() {
  const [selected, setSelected] = useState({});
  const [paypalReady, setPaypalReady] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null); // null | 'processing' | 'success' | 'error'
  const [completedOrder, setCompletedOrder] = useState(null);

  const paypalContainerRef = useRef(null);
  const paypalButtonsRef = useRef(null);

  // Client-side navigation (e.g. clicking between pages via Link) doesn't
  // reload the document, so if the PayPal SDK script was already loaded on
  // an earlier page, next/script's onLoad below never fires again for this
  // fresh mount -- check for the already-loaded SDK directly as a fallback,
  // or the buttons silently never appear until a manual refresh.
  useEffect(() => {
    if (window.paypal) setPaypalReady(true);
  }, []);

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

  // Re-render PayPal's Buttons whenever the selection (and therefore the
  // total) changes -- each render needs a fresh createOrder closure with the
  // current amount, so the previous Buttons instance is torn down first.
  useEffect(() => {
    if (!paypalReady || selectedIds.length === 0 || !window.paypal || !paypalContainerRef.current) {
      return;
    }

    if (paypalButtonsRef.current) {
      paypalButtonsRef.current.close?.();
      paypalButtonsRef.current = null;
    }
    paypalContainerRef.current.innerHTML = '';

    const itemNames = selectedIds.map((id) => ALACARTE_ITEM_MAP[id].name);
    const orderTotal = total;

    const buttons = window.paypal.Buttons({
      style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' },
      createOrder: (data, actions) =>
        actions.order.create({
          purchase_units: [
            {
              description: itemNames.join(', ').slice(0, 127),
              amount: { value: orderTotal.toFixed(2), currency_code: 'USD' },
            },
          ],
        }),
      onApprove: async (data, actions) => {
        setOrderStatus('processing');
        const details = await actions.order.capture();

        try {
          await fetch('/api/alacarte-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: details.id,
              items: itemNames,
              total: orderTotal,
              payerEmail: details.payer?.email_address || null,
              payerName: details.payer?.name?.given_name
                ? `${details.payer.name.given_name} ${details.payer.name.surname || ''}`.trim()
                : null,
            }),
          });
        } catch (err) {
          // The PayPal capture already succeeded even if this logging call
          // fails -- don't block the success state on it.
        }

        setCompletedOrder({ id: details.id, items: itemNames, total: orderTotal });
        setOrderStatus('success');
        setSelected({});
      },
      onError: () => setOrderStatus('error'),
      onCancel: () => setOrderStatus(null),
    });

    buttons.render(paypalContainerRef.current);
    paypalButtonsRef.current = buttons;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paypalReady, selectedIds.join(','), total]);

  return (
    <section id="alacarte" className={`${styles.section} ${styles.alacarte}`}>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`}
        strategy="afterInteractive"
        onLoad={() => setPaypalReady(true)}
      />

      <Reveal className={styles.sectionHead}>
        <div className={styles.sectionEyebrow}>À La Carte</div>
        <h2>Pick only what you need.</h2>
        <p>
          Add services to your cart and check out directly — we&apos;ll flag when something
          works better after another piece is already in place.
        </p>
      </Reveal>

      <div className={styles.cartLayout}>
        <div>
          {ALACARTE_GROUPS.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.1} className={styles.alaGroup}>
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
            </Reveal>
          ))}
        </div>

        <div className={styles.cartPanel}>
          {orderStatus === 'success' && completedOrder ? (
            <div className={styles.cartSuccess}>
              <div className={styles.cartTitle}>✅ Order confirmed</div>
              <p>
                Thanks! Your order (<code>{completedOrder.id}</code>) for{' '}
                <strong>${completedOrder.total}</strong> is confirmed. We&apos;ll reach out within
                1 business day to get started.
              </p>
              <ul className={styles.cartList}>
                {completedOrder.items.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
              <button type="button" className={styles.cartCta} onClick={() => setOrderStatus(null)}>
                Add more services
              </button>
            </div>
          ) : (
            <>
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

              {selectedIds.length > 0 && (
                <div className={styles.paypalWrap}>
                  {!paypalReady && <p className={styles.cartEmpty}>Loading checkout…</p>}
                  {orderStatus === 'processing' && <p className={styles.cartEmpty}>Processing your order…</p>}
                  {orderStatus === 'error' && (
                    <p className={styles.cartError}>
                      Something went wrong with checkout. Try again, or email us directly below.
                    </p>
                  )}
                  <div ref={paypalContainerRef} />
                </div>
              )}

              <a
                href={`mailto:Dharma%27s%20Esthetic%20Design%20%3Cjason@dharmasestheticdesign.com%3E?subject=%C3%80%20La%20Carte%20Question&body=Services%20I%27m%20interested%20in%3A%0A${selectedIds
                  .map((id) => `- ${ALACARTE_ITEM_MAP[id].name}`)
                  .join('%0A')}`}
                className={styles.cartSecondaryLink}
              >
                Have questions first? Email us instead
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
