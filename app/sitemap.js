import { PACKAGE_DETAILS, AUDITS } from '@/components/dharma/data';

const BASE_URL = 'https://dharmasestheticdesign.com';

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/style-picker', priority: 0.8, changeFrequency: 'monthly' },
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

  return [...staticRoutes, ...packageRoutes, ...auditRoutes].map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
