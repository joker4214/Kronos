import { PACKAGE_DETAILS, AUDITS, WEB_DESIGN_TIERS } from '@/components/dharma/data';

const BASE_URL = 'https://dharmasestheticdesign.com';

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/portfolio', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/style-picker', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/tools', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/checklist', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/shopify-audit', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const packageRoutes = Object.keys(PACKAGE_DETAILS).map((slug) => ({
    path: `/packages/${slug}`,
    priority: 0.9,
    changeFrequency: 'monthly',
  }));

  const auditRoutes = AUDITS.map((audit) => ({
    path: `/shopify-audit/${audit.id}`,
    priority: 0.7,
    changeFrequency: 'monthly',
  }));

  const webDesignRoutes = WEB_DESIGN_TIERS.map((tier) => ({
    path: `/web-design/${tier.id}`,
    priority: 0.7,
    changeFrequency: 'monthly',
  }));

  return [...staticRoutes, ...packageRoutes, ...auditRoutes, ...webDesignRoutes].map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
