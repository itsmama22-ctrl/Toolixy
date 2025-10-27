#!/usr/bin/env node

/**
 * Pre-deployment validation script
 * Ensures all blog posts have content before deploying
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, '../content/blog');

function shouldPublishPost(publishDate, status) {
  if (status === 'draft') return false;
  const now = new Date();
  const pubDate = new Date(publishDate);
  return pubDate <= now;
}

function validateBlogPosts() {
  const files = fs.readdirSync(contentDir);
  const posts = files.filter(f => f.endsWith('.md'));
  
  const errors = [];
  const warnings = [];
  
  posts.forEach(file => {
    try {
      const fullPath = path.join(contentDir, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Check for empty content
      const trimmedContent = content.trim();
      if (!trimmedContent) {
        errors.push(`${file}: Has NO content body`);
      }
      
      // Check for short content
      if (trimmedContent.length < 100) {
        warnings.push(`${file}: Has very short content (${trimmedContent.length} chars)`);
      }
      
      // Check required fields
      if (!data.title) errors.push(`${file}: Missing title`);
      if (!data.publishDate) errors.push(`${file}: Missing publishDate`);
      if (!data.tags || !Array.isArray(data.tags)) errors.push(`${file}: Missing or invalid tags`);
      if (!data.author) errors.push(`${file}: Missing author`);
      
      // Check if published posts have proper images
      const shouldPublish = shouldPublishPost(data.publishDate, data.status);
      if (shouldPublish && !data.featuredImage) {
        warnings.push(`${file}: Published post has no featured image`);
      }
      
    } catch (error) {
      errors.push(`${file}: Error - ${error.message}`);
    }
  });
  
  return { errors, warnings };
}

console.log('🔍 Validating blog posts before deployment...\n');

const { errors, warnings } = validateBlogPosts();

if (warnings.length > 0) {
  console.log('⚠️  WARNINGS:');
  warnings.forEach(w => console.log(`   - ${w}`));
  console.log();
}

if (errors.length > 0) {
  console.error('❌ ERRORS FOUND - DEPLOYMENT BLOCKED:');
  errors.forEach(e => console.error(`   - ${e}`));
  console.error('\n❌ Please fix these errors before deploying.\n');
  process.exit(1);
}

console.log('✅ All blog posts validated successfully!');
console.log(`   - Total posts: ${fs.readdirSync(contentDir).filter(f => f.endsWith('.md')).length}`);
console.log('   - No errors found\n');
console.log('✅ Safe to deploy!\n');

