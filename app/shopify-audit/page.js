import styles from '@/styles/dharma.module.css';
import ShopifyAudit from '@/components/dharma/ShopifyAudit';

export const metadata = {
  title: "Shopify Store Audit Packages | Dharma's Esthetic Design Center",
  description:
    'Basic, Standard, and Premium Shopify store audit packages — design, SEO, CRO, and analytics review with actionable recommendations.',
};

export default function ShopifyAuditPage() {
  return (
    <main className={styles.section} style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
      <div style={{ paddingBottom: '40px' }}>
        <h1 style={{ marginBottom: '10px' }}>Shopify Store Audit Packages</h1>
      </div>

      <ShopifyAudit />
    </main>
  );
}
