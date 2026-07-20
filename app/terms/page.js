import styles from '@/styles/dharma.module.css';

export const metadata = {
  title: 'Terms of Service | Dharma\'s Esthetic Design Center',
  description: 'Terms of service for Dharma\'s Esthetic Design Center digital marketing and web design services.',
};

export default function TermsPage() {
  return (
    <main className={styles.section} style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>
      <div style={{ paddingBottom: '40px' }}>
        <h1 style={{ marginBottom: '10px' }}>Terms of Service</h1>
        <p style={{ opacity: 0.7, fontSize: '14px' }}>Effective Date: July 2026</p>
      </div>

      <div style={{ lineHeight: '1.8', color: '#3F434B' }}>
        <h2>1. Agreement to Terms</h2>
        <p>
          By engaging Dharma's Esthetic Design Center ("we," "us," "our," or "Company") for services, you ("Client," "you," or "your") agree to be bound by these Terms of Service. If you do not agree to abide by the above, please do not use this service.
        </p>

        <h2>2. Services Description</h2>
        <p>
          Dharma's Esthetic Design Center provides digital marketing and web design services for online store owners, including but not limited to:
        </p>
        <ul>
          <li>Content creation (social media copy, video commercials, blog posts)</li>
          <li>Store optimization and audits</li>
          <li>Web design and development</li>
          <li>Analytics setup and configuration</li>
          <li>Email marketing setup</li>
          <li>SEO and digital marketing services</li>
        </ul>

        <h2>3. Service Delivery & Timeline</h2>
        <ul>
          <li>Services are delivered within the timeframes specified in your proposal or package description.</li>
          <li>Delivery timelines assume timely receipt of all necessary information, assets, and approvals from Client.</li>
          <li>We will make reasonable efforts to meet deadlines, but unexpected delays may occur. We will communicate any delays promptly.</li>
          <li>Services are delivered digitally via email, Google Drive, or other agreed-upon platforms.</li>
        </ul>

        <h2>4. Revisions & Amendments</h2>
        <ul>
          <li><strong>Starter & Growth Packages:</strong> One (1) round of revisions included at no additional cost. Revisions must be requested within 5 business days of delivery.</li>
          <li><strong>Full Agency Package:</strong> One (1) round of revisions included at no additional cost. Revisions must be requested within 5 business days of delivery.</li>
          <li><strong>Additional revisions:</strong> $50–$150 per round, depending on scope.</li>
          <li>Revisions are limited to modifications of delivered work, not entirely new deliverables.</li>
        </ul>

        <h2>5. Payment Terms</h2>
        <ul>
          <li>Payment is due upon invoice unless other terms are agreed to in writing.</li>
          <li>Deposits may be required before work begins on larger projects.</li>
          <li>Failure to pay invoices within 30 days may result in suspension of services.</li>
          <li>All prices are in USD unless otherwise specified.</li>
          <li>Late payment fees of 1.5% per month (18% annually) may be applied to overdue balances.</li>
        </ul>

        <h2>6. Refund & Cancellation Policy</h2>
        <p>
          <strong>No refunds are available once work has begun.</strong> We define "work has begun" as any activity toward completing the deliverables (research, design, writing, etc.).
        </p>
        <ul>
          <li>If you wish to cancel before work begins, a full refund will be provided.</li>
          <li>If you cancel after work has begun, you are responsible for payment of all work completed to date.</li>
          <li>Upon cancellation, you retain rights to any completed deliverables.</li>
        </ul>

        <h2>7. Intellectual Property Rights</h2>
        <ul>
          <li>Upon full payment, ownership of deliverables (designs, copy, code, videos, etc.) transfers to Client.</li>
          <li>We retain the right to use anonymized case studies and examples of work for portfolio purposes unless Client opts out in writing.</li>
          <li>Client warrants that any assets, information, or content provided to us are original or properly licensed.</li>
          <li>We are not responsible for copyright or trademark infringement related to Client-provided materials.</li>
        </ul>

        <h2>8. Confidentiality</h2>
        <p>
          We agree to keep Client business information confidential and not disclose it to third parties without written permission. Exceptions: information required by law, or aggregated, anonymized data for performance reporting.
        </p>

        <h2>9. Limitation of Liability</h2>
        <ul>
          <li>Our total liability for any claim is limited to the amount paid by Client for the specific service in question.</li>
          <li>We are not liable for indirect, incidental, consequential, or punitive damages.</li>
          <li>These limitations apply even if we have been advised of the possibility of such damages.</li>
        </ul>

        <h2>10. Service Disclaimer</h2>
        <ul>
          <li>We make no guarantees regarding sales, traffic, conversions, or other business outcomes.</li>
          <li>Digital marketing results depend on many factors outside our control.</li>
          <li>Our recommendations are based on industry best practices but are not guaranteed to produce specific results.</li>
        </ul>

        <h2>11. Contact</h2>
        <p>
          For questions about these Terms of Service, contact us at <strong>jason@dharmasemporium.com</strong>.
        </p>

        <p style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #E0E0E0', opacity: 0.7, fontSize: '14px' }}>
          Last Updated: July 2026
        </p>
      </div>
    </main>
  );
}
