import ChecklistSqueeze from '@/components/dharma/ChecklistSqueeze';

// A true squeeze page, per the funnel spec: two options only, opt in or
// leave. No Navbar, no footer, no other links out.
export const metadata = {
  title: "Free Checklist: The Shopify Invisibility Checklist | Dharma's Esthetic Design",
  description:
    '10 things quietly killing your Shopify store’s conversions, and exactly how to fix each one. Free, instant, takes 10 minutes.',
  alternates: {
    canonical: '/checklist',
  },
};

export default function ChecklistPage() {
  return <ChecklistSqueeze />;
}
