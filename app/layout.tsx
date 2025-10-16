import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Toolisy - Email Extractor & Color Palette Generator',
    template: '%s | Toolisy'
  },
  description: 'Professional email extraction and color palette generation tools. Extract emails from websites and create beautiful color palettes for your projects.',
  keywords: ['email extractor', 'color palette generator', 'lead generation', 'design tools', 'marketing tools'],
  authors: [{ name: 'Toolisy Team' }],
  creator: 'Toolisy',
  publisher: 'Toolisy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Toolisy - Email Extractor & Color Palette Generator',
    description: 'Professional email extraction and color palette generation tools. Extract emails from websites and create beautiful color palettes for your projects.',
    siteName: 'Toolisy',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Toolisy - Professional Tools for Marketers and Designers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toolisy - Email Extractor & Color Palette Generator',
    description: 'Professional email extraction and color palette generation tools. Extract emails from websites and create beautiful color palettes for your projects.',
    images: ['/images/twitter-card.jpg'],
    creator: '@multitoolsaas',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
