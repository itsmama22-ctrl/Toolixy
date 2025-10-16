import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Tools from '@/components/Tools';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'Toolisy - Email Extractor & Color Palette Generator',
  description: 'Professional email extraction and color palette generation tools. Extract emails from websites and create beautiful color palettes for your projects. Free and Pro plans available.',
  keywords: ['email extractor', 'color palette generator', 'lead generation', 'design tools', 'marketing automation', 'saas tools'],
  openGraph: {
    title: 'Toolisy - Professional Tools for Marketers and Designers',
    description: 'Extract emails from websites and generate color palettes with our powerful, easy-to-use tools. Boost your productivity today.',
    images: ['/images/og-homepage.jpg'],
  },
  twitter: {
    title: 'Toolisy - Professional Tools for Marketers and Designers',
    description: 'Extract emails from websites and generate color palettes with our powerful, easy-to-use tools. Boost your productivity today.',
    images: ['/images/twitter-homepage.jpg'],
  },
};

export default function HomePage() {
  return (
        <div className="min-h-screen">
          <Hero />
          <Features />
          <Tools />
          <CTA />
        </div>
  );
}
