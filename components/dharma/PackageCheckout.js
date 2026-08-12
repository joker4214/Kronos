'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import styles from '@/styles/dharma.module.css';

// Public identifier, safe to ship in client code -- not the Secret key.
// Same PayPal app as the a la carte cart (AlaCarteCart.js).
const PAYPAL_CLIENT_ID = 'BAAlJ1k4hJuZ3ZCkwpG6F_k3HEH_NNGbJudXwNQuzJ0_a7ldz1LNFpfZFXkHilPKrYJUGXvE9D-ccyP_7w';

export default function PackageCheckout({ packageId, packageName, price }) {
  const [paypalReady, setPaypalReady] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null); // null | 'processing' | 'success' | 'error'
  const [completedOrder, setCompletedOrder] = useState(null);

  const containerRef = useRef(null);
  const buttonsRef = useRef(null);

  // Same fix as AlaCarteCart.js -- client-side navigation between package
  // pages means the PayPal SDK script may already be loaded, and next/script's
  // onLoad won't refire for this fresh component mount.
  useEffect(() => {
    if (window.paypal) setPaypalReady(true);
  }, []);

  useEffect(() => {
    if (!paypalReady || !window.paypal || !containerRef.current || orderStatus === 'success') return;

    if (buttonsRef.current) {
      buttonsRef.current.close?.();
      buttonsRef.current = null;
    }
    containerRef.current.innerHTML = '';

    const buttons = window.paypal.Buttons({
      style: { layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' },
      createOrder: (data, actions) =>
        actions.order.create({
          purchase_units: [
            {
              description: `${packageName} package — Dharma's Esthetic Design Center`.slice(0, 127),
              amount: { value: price.toFixed(2), currency_code: 'USD' },
            },
          ],
        }),
      onApprove: async (data, actions) => {
        setOrderStatus('processing');
        const details = await actions.order.capture();

        try {
          await fetch('/api/package-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: details.id,
              packageId,
              packageName,
              total: price,
              payerEmail: details.payer?.email_address || null,
              payerName: details.payer?.name?.given_name
                ? `${details.payer.name.given_name} ${details.payer.name.surname || ''}`.trim()
                : null,
            }),
          });
        } catch (err) {
          // The PayPal capture already succeeded even if this logging call fails.
        }

        setCompletedOrder({ id: details.id });
        setOrderStatus('success');
      },
      onError: () => setOrderStatus('error'),
      onCancel: () => setOrderStatus(null),
    });

    buttons.render(containerRef.current);
    buttonsRef.current = buttons;
  }, [paypalReady, orderStatus, packageId, packageName, price]);

  return (
    <div style={{ marginTop: '32px' }}>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`}
        strategy="afterInteractive"
        onLoad={() => setPaypalReady(true)}
      />

      {orderStatus === 'success' && completedOrder ? (
        <div className={styles.cartSuccess}>
          <div className={styles.cartTitle}>✅ Order confirmed</div>
          <p>
            Thanks! Your order (<code>{completedOrder.id}</code>) for the{' '}
            <strong>{packageName}</strong> package is confirmed. We&apos;ll reach out within 1
            business day to get started.
          </p>
        </div>
      ) : (
        <>
          {!paypalReady && <p className={styles.cartEmpty}>Loading checkout…</p>}
          {orderStatus === 'processing' && <p className={styles.cartEmpty}>Processing your order…</p>}
          {orderStatus === 'error' && (
            <p className={styles.cartError}>
              Something went wrong with checkout. Try again, or email us directly below.
            </p>
          )}
          <div ref={containerRef} />
          <div className={styles.secureNote}>🔒 Payments secured by PayPal</div>
        </>
      )}
    </div>
  );
}
