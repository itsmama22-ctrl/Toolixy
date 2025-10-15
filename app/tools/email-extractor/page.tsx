import type { Metadata } from 'next';
import EmailExtractor from '@/components/EmailExtractor';
import SEO from '@/components/SEO';

export const metadata: Metadata = {
  title: 'Email Extractor - Extract Emails from Websites | MultiTool SaaS',
  description: 'Extract email addresses from any website quickly and accurately. Free email extraction tool with CSV export, duplicate removal, and batch processing. Perfect for lead generation.',
  keywords: ['email extractor', 'email scraper', 'lead generation', 'contact discovery', 'email finder', 'bulk email extraction'],
  openGraph: {
    title: 'Email Extractor - Extract Emails from Websites',
    description: 'Extract email addresses from any website quickly and accurately. Free email extraction tool with CSV export and duplicate removal.',
    images: ['/images/og-email-extractor.jpg'],
  },
  twitter: {
    title: 'Email Extractor - Extract Emails from Websites',
    description: 'Extract email addresses from any website quickly and accurately. Free email extraction tool with CSV export and duplicate removal.',
    images: ['/images/twitter-email-extractor.jpg'],
  },
  alternates: {
    canonical: '/tools/email-extractor',
  },
};

export default function EmailExtractorPage() {
  return (
    <>
      <SEO
        title="Email Extractor - Extract Emails from Websites"
        description="Extract email addresses from any website quickly and accurately. Free email extraction tool with CSV export, duplicate removal, and batch processing. Perfect for lead generation."
        keywords={['email extractor', 'email scraper', 'lead generation', 'contact discovery', 'email finder', 'bulk email extraction']}
        url="/tools/email-extractor"
        type="website"
      />
      <EmailExtractor />
    </>
  );
}
