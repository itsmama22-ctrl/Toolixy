import type { Metadata } from 'next';
import ColorPaletteGeneratorClient from '@/components/ColorPaletteGeneratorClient';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Color Palette Generator - Create Beautiful Color Schemes | MultiTool SaaS',
  description: 'Generate beautiful color palettes from images or create them manually. Export to CSS, SCSS, JSON. Perfect for designers, developers, and branding projects.',
  keywords: ['color palette generator', 'color scheme', 'design tools', 'brand colors', 'color harmony', 'palette maker'],
  openGraph: {
    title: 'Color Palette Generator - Create Beautiful Color Schemes',
    description: 'Generate beautiful color palettes from images or create them manually. Export to CSS, SCSS, JSON. Perfect for designers and developers.',
    images: ['/images/og-color-palette.jpg'],
  },
  twitter: {
    title: 'Color Palette Generator - Create Beautiful Color Schemes',
    description: 'Generate beautiful color palettes from images or create them manually. Export to CSS, SCSS, JSON. Perfect for designers and developers.',
    images: ['/images/twitter-color-palette.jpg'],
  },
  alternates: {
    canonical: '/tools/color-palette',
  },
};

export default function ColorPalettePage() {
  return (
    <>
      <SEO
        title="Color Palette Generator - Create Beautiful Color Schemes"
        description="Generate beautiful color palettes from images or create them manually. Export to CSS, SCSS, JSON. Perfect for designers, developers, and branding projects."
        keywords={['color palette generator', 'color scheme', 'design tools', 'brand colors', 'color harmony', 'palette maker']}
        url="/tools/color-palette"
        type="website"
      />
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Breadcrumb className="mb-6" />
      </div>
      <ColorPaletteGeneratorClient />
    </>
  );
}
