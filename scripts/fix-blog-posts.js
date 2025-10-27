#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'content/blog');

// Author mapping for consistent assignment
const authors = [
  { name: "Sarah Johnson", avatar: "/images/authors/sarah-johnson.svg" },
  { name: "Michael Chen", avatar: "/images/authors/michael-chen.svg" },
  { name: "Alex Rodriguez", avatar: "/images/authors/alex-rodriguez.svg" }
];

// Function to get a random author
function getRandomAuthor() {
  return authors[Math.floor(Math.random() * authors.length)];
}

// Function to estimate reading time based on content length
function estimateReadingTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// Function to generate excerpt from content
function generateExcerpt(content, maxLength = 160) {
  // Remove markdown syntax and get first paragraph
  const cleanContent = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }
  
  return cleanContent.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

function fixBlogPost(filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const fixes = [];
    
    // Fix missing author name
    if (data.author && !data.author.name) {
      data.author = getRandomAuthor();
      fixes.push('Added author name');
    } else if (!data.author) {
      data.author = getRandomAuthor();
      fixes.push('Added complete author info');
    }
    
    // Fix missing reading time
    if (!data.readingTime) {
      data.readingTime = estimateReadingTime(content).toString();
      fixes.push('Added reading time');
    }
    
    // Fix missing excerpt
    if (!data.excerpt) {
      data.excerpt = generateExcerpt(content);
      fixes.push('Added excerpt');
    }
    
    // Fix missing meta description
    if (!data.metaDescription) {
      data.metaDescription = data.excerpt || generateExcerpt(content);
      fixes.push('Added meta description');
    }
    
    // Fix missing meta title
    if (!data.metaTitle) {
      data.metaTitle = data.title;
      fixes.push('Added meta title');
    }
    
    // Fix missing lastModified
    if (!data.lastModified) {
      data.lastModified = new Date().toISOString().split('T')[0];
      fixes.push('Added lastModified');
    }
    
    // Fix missing canonical URL
    if (!data.canonical) {
      const slug = path.basename(filePath, '.md');
      data.canonical = `https://toolixy.vercel.app/blog/${slug}`;
      fixes.push('Added canonical URL');
    }
    
    // Fix missing OpenGraph data
    if (!data.openGraph) {
      data.openGraph = {
        type: "article",
        title: data.metaTitle || data.title,
        description: data.metaDescription || data.excerpt,
        image: data.featuredImage,
        url: data.canonical,
        siteName: "toolixy",
        locale: "en_US"
      };
      fixes.push('Added OpenGraph data');
    }
    
    // Fix missing Twitter data
    if (!data.twitter) {
      data.twitter = {
        card: "summary_large_image",
        title: data.metaTitle || data.title,
        description: data.metaDescription || data.excerpt,
        image: data.featuredImage,
        creator: "@toolixy",
        site: "@toolixy"
      };
      fixes.push('Added Twitter data');
    }
    
    // Fix missing schema data
    if (!data.schema) {
      data.schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        description: data.metaDescription || data.excerpt,
        image: data.featuredImage,
        author: {
          "@type": "Person",
          name: data.author.name
        },
        publisher: {
          "@type": "Organization",
          name: "toolixy",
          logo: {
            "@type": "ImageObject",
            url: "https://toolixy.vercel.app/logo.png"
          }
        },
        datePublished: data.publishDate,
        dateModified: data.lastModified,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": data.canonical
        }
      };
      fixes.push('Added schema data');
    }
    
    // Reconstruct the frontmatter properly
    const updatedFrontmatter = `---\n${Object.entries(data)
      .map(([key, value]) => {
        if (key === 'author') {
          return `author:\n  name: "${value.name}"\n  avatar: "${value.avatar}"`;
        }
        if (key === 'schema' || key === 'openGraph' || key === 'twitter') {
          return `${key}: ${JSON.stringify(value)}`;
        }
        if (Array.isArray(value)) {
          return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
        }
        if (typeof value === 'object' && value !== null) {
          return `${key}: ${JSON.stringify(value)}`;
        }
        return `${key}: "${String(value)}"`;
      })
      .join('\n')}\n---\n\n${content}`;

    // Write the updated file
    fs.writeFileSync(filePath, updatedFrontmatter, 'utf8');
    
    return fixes;
  } catch (error) {
    return [`Error: ${error.message}`];
  }
}

function fixAllBlogPosts() {
  const files = fs.readdirSync(contentDirectory);
  const results = {
    fixed: 0,
    errors: 0,
    totalFixes: 0,
    details: []
  };

  files.forEach(file => {
    if (!file.endsWith('.md')) return;
    
    const filePath = path.join(contentDirectory, file);
    const fixes = fixBlogPost(filePath);
    
    if (fixes.length > 0) {
      results.fixed++;
      results.totalFixes += fixes.length;
      results.details.push({
        file: file.replace('.md', ''),
        fixes: fixes
      });
    }
  });

  return results;
}

console.log('🚀 Starting comprehensive blog post fixes...');
console.log('📅 Current date:', new Date().toISOString().split('T')[0]);

try {
  const result = fixAllBlogPosts();
  
  console.log(`\n✅ Fixed ${result.fixed} posts with ${result.totalFixes} total fixes`);
  
  if (result.details.length > 0) {
    console.log('\n📋 Fixes applied:');
    result.details.forEach(detail => {
      console.log(`\n📄 ${detail.file}:`);
      detail.fixes.forEach(fix => {
        console.log(`   - ${fix}`);
      });
    });
  }
  
  console.log('\n🎉 Blog post fixes completed successfully!');
  
} catch (error) {
  console.error('\n💥 Error running blog post fixes:', error);
  process.exit(1);
}

