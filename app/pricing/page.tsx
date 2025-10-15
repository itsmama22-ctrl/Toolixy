import type { Metadata } from 'next';
import Pricing from '@/components/Pricing';
import SEO from '@/components/SEO';

export const metadata: Metadata = {
  title: 'Pricing - Affordable Plans for Every Need | MultiTool SaaS',
  description: 'Choose the perfect plan for your needs. Free forever plan available. Pro plan with unlimited usage starting at $29/month. Enterprise solutions available.',
  keywords: ['pricing', 'saas pricing', 'email extractor pricing', 'color palette pricing', 'subscription plans'],
  openGraph: {
    title: 'Pricing - Affordable Plans for Every Need',
    description: 'Choose the perfect plan for your needs. Free forever plan available. Pro plan with unlimited usage starting at $29/month.',
    images: ['/images/og-pricing.jpg'],
  },
  twitter: {
    title: 'Pricing - Affordable Plans for Every Need',
    description: 'Choose the perfect plan for your needs. Free forever plan available. Pro plan with unlimited usage starting at $29/month.',
    images: ['/images/twitter-pricing.jpg'],
  },
  alternates: {
    canonical: '/pricing',
  },
};

export default function PricingPage() {
  return (
    <>
      <SEO
        title="Pricing - Affordable Plans for Every Need"
        description="Choose the perfect plan for your needs. Free forever plan available. Pro plan with unlimited usage starting at $29/month. Enterprise solutions available."
        keywords={['pricing', 'saas pricing', 'email extractor pricing', 'color palette pricing', 'subscription plans']}
        url="/pricing"
        type="website"
      />
      
      <div className="min-h-screen bg-white">
        <Pricing />
      </div>
    </>
  );
}
