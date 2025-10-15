import Head from 'next/head';
import { SEOProps } from '@/types';

interface SEOComponentProps extends SEOProps {
  children?: React.ReactNode;
}

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  children,
}: SEOComponentProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/images/og-default.jpg`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebSite',
    name: title || 'MultiTool SaaS',
    description: description || 'Professional email extraction and color palette generation tools',
    url: fullUrl,
    image: fullImage,
    ...(type === 'article' && {
      headline: title,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      author: {
        '@type': 'Person',
        name: author || 'MultiTool Team',
      },
      publisher: {
        '@type': 'Organization',
        name: 'MultiTool SaaS',
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/images/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl,
      },
      ...(section && { articleSection: section }),
      ...(tags && { keywords: tags.join(', ') }),
    }),
    ...(type === 'website' && {
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title ? `${title} | MultiTool SaaS` : 'MultiTool SaaS - Email Extractor & Color Palette Generator'}</title>
      <meta name="description" content={description || 'Professional email extraction and color palette generation tools. Extract emails from websites and create beautiful color palettes for your projects.'} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <meta name="author" content={author || 'MultiTool Team'} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="en" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || 'MultiTool SaaS - Email Extractor & Color Palette Generator'} />
      <meta property="og:description" content={description || 'Professional email extraction and color palette generation tools. Extract emails from websites and create beautiful color palettes for your projects.'} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || 'MultiTool SaaS'} />
      <meta property="og:site_name" content="MultiTool SaaS" />
      <meta property="og:locale" content="en_US" />

      {/* Article specific Open Graph tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@multitoolsaas" />
      <meta name="twitter:creator" content="@multitoolsaas" />
      <meta name="twitter:title" content={title || 'MultiTool SaaS - Email Extractor & Color Palette Generator'} />
      <meta name="twitter:description" content={description || 'Professional email extraction and color palette generation tools. Extract emails from websites and create beautiful color palettes for your projects.'} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={title || 'MultiTool SaaS'} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="MultiTool SaaS" />

      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Additional SEO Meta Tags */}
      <meta name="application-name" content="MultiTool SaaS" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {children}
    </Head>
  );
}
