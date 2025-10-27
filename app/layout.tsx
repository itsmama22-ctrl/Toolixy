import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'toolixy - Email Extractor & Color Palette Generator',
    template: '%s | toolixy'
  },
  description: 'Professional email extraction and color palette generation tools. Extract emails from websites and create beautiful color palettes for your projects.',
  keywords: ['email extractor', 'color palette generator', 'lead generation', 'design tools', 'marketing tools'],
  authors: [{ name: 'toolixy Team', url: 'mailto:contact.toolixy@gmail.com' }],
  creator: 'toolixy',
  publisher: 'toolixy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://toolixy.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'toolixy - Email Extractor & Color Palette Generator',
    description: 'Professional email extraction and color palette generation tools. Extract emails from websites and create beautiful color palettes for your projects.',
    siteName: 'toolixy',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'toolixy - Professional Tools for Marketers and Designers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'toolixy - Email Extractor & Color Palette Generator',
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
        google: 'npTPWUS81Grdf54SFWJR7UELcMEC7qj-rJdPMkH1-Rk',
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
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QV3CSZF22Y"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              // Enhanced Google Analytics 4 Configuration
              gtag('config', 'G-QV3CSZF22Y', {
                // Basic Configuration
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: true,
                
                // Enhanced E-commerce and Custom Parameters
                custom_map: {
                  'custom_parameter_1': 'tool_type',
                  'custom_parameter_2': 'user_action',
                  'custom_parameter_3': 'extraction_count',
                  'custom_parameter_4': 'palette_size'
                },
                
                // Enhanced Measurement
                enhanced_measurements: {
                  scrolls: true,
                  outbound_clicks: true,
                  site_search: true,
                  video_engagement: true,
                  file_downloads: true
                },
                
                // Privacy and Consent
                anonymize_ip: false,
                allow_google_signals: true,
                allow_ad_personalization_signals: true,
                
                // Custom Dimensions (if you set them up in GA4)
                custom_parameters: {
                  'stream_id': '12343878097',
                  'website_name': 'toolixy',
                  'tool_category': 'productivity_tools'
                }
              });
              
              // Track page views with enhanced data
              gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname,
                content_group1: 'toolixy_website',
                content_group2: window.location.pathname.includes('/tools/') ? 'tools' : 'content'
              });
            `,
          }}
        />
        
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon.svg" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="google-site-verification" content="npTPWUS81Grdf54SFWJR7UELcMEC7qj-rJdPMkH1-Rk" />
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
