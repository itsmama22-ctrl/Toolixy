#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'content/blog');
const sitemapPath = path.join(process.cwd(), 'public/sitemap.xml');
const baseUrl = 'https://toolixy.vercel.app';

function generateSitemap() {
  const staticPages = [
    {
      url: baseUrl,
      lastmod: '2025-10-24T23:08:13.214Z',
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: `${baseUrl}/tools/email-extractor`,
      lastmod: '2025-10-24T23:08:13.214Z',
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/tools/color-palette`,
      lastmod: '2025-10-24T23:08:13.214Z',
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/blog`,
      lastmod: '2025-10-24T23:08:13.214Z',
      changefreq: 'daily',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/pricing`,
      lastmod: '2025-10-24T23:08:13.214Z',
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/dashboard`,
      lastmod: '2025-10-24T23:08:13.214Z',
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      url: `${baseUrl}/about`,
      lastmod: '2025-10-24T23:08:13.214Z',
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      url: `${baseUrl}/contact`,
      lastmod: '2025-10-24T23:08:13.214Z',
      changefreq: 'monthly',
      priority: '0.6'
    },
    {
      url: `${baseUrl}/privacy`,
      lastmod: '2025-10-24T23:08:13.214Z',
      changefreq: 'yearly',
      priority: '0.3'
    },
    {
      url: `${baseUrl}/terms`,
      lastmod: '2025-10-24T23:08:13.214Z',
      changefreq: 'yearly',
      priority: '0.3'
    },
    {
      url: `${baseUrl}/cookies`,
      lastmod: '2025-10-24T23:08:13.214Z',
      changefreq: 'yearly',
      priority: '0.3'
    },
    {
      url: `${baseUrl}/docs`,
      lastmod: '2025-10-24T23:08:13.214Z',
      changefreq: 'monthly',
      priority: '0.5'
    },
    {
      url: `${baseUrl}/api`,
      lastmod: '2025-10-24T23:08:13.214Z',
      changefreq: 'monthly',
      priority: '0.5'
    },
    {
      url: `${baseUrl}/help`,
      lastmod: '2025-10-24T23:08:13.214Z',
      changefreq: 'monthly',
      priority: '0.5'
    },
    {
      url: `${baseUrl}/status`,
      lastmod: '2025-10-24T23:08:13.214Z',
      changefreq: 'monthly',
      priority: '0.5'
    }
  ];

  // Get all blog posts
  const files = fs.readdirSync(contentDirectory);
  const blogPosts = [];

  files.forEach(file => {
    if (!file.endsWith('.md')) return;
    
    try {
      const fullPath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      if (data.status !== 'draft') { // Only include published posts
        const lastmod = data.lastModified || data.publishDate || '2025-10-24T23:08:13.214Z';
        blogPosts.push({
          url: `${baseUrl}/blog/${file.replace('.md', '')}`,
          lastmod: new Date(lastmod).toISOString(),
          changefreq: 'weekly',
          priority: '0.7'
        });
      }
    } catch (error) {
      console.warn(`Error processing ${file}:`, error.message);
    }
  });

  // Get unique tags for tag pages
  const allTags = new Set();
  files.forEach(file => {
    if (!file.endsWith('.md')) return;
    
    try {
      const fullPath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach(tag => allTags.add(tag));
      }
    } catch (error) {
      console.warn(`Error processing tags in ${file}:`, error.message);
    }
  });

  const tagPages = Array.from(allTags).map(tag => ({
    url: `${baseUrl}/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    lastmod: '2025-10-24T23:08:13.214Z',
    changefreq: 'weekly',
    priority: '0.5'
  }));

  // Combine all pages
  const allPages = [...staticPages, ...blogPosts, ...tagPages];

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  allPages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${page.url}</loc>\n`;
    xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  // Write sitemap
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  
  console.log(`✅ Generated sitemap with ${allPages.length} URLs`);
  console.log(`   - Static pages: ${staticPages.length}`);
  console.log(`   - Blog posts: ${blogPosts.length}`);
  console.log(`   - Tag pages: ${tagPages.length}`);
  console.log(`   - Sitemap saved to: ${sitemapPath}`);
}

generateSitemap();

