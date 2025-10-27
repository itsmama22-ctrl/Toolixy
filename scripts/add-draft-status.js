#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'content/blog');

function addDraftStatus() {
  const files = fs.readdirSync(contentDirectory);
  const updated = [];
  const skipped = [];
  const errors = [];
  const today = new Date();

  files.forEach(file => {
    if (!file.endsWith('.md')) return;
    
    try {
      const fullPath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Only process files with future publish dates
      if (data.publishDate && !data.status) {
        const publishDate = new Date(data.publishDate);
        
        if (publishDate > today) {
          // Add draft status
          const updatedData = { ...data, status: 'draft' };
          
          // Reconstruct the frontmatter properly
          const updatedFrontmatter = `---\n${Object.entries(updatedData)
            .map(([key, value]) => {
              if (key === 'author') {
                return `author:\n  name: "${value.name}"\n  avatar: "${value.avatar || ''}"`;
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
          fs.writeFileSync(fullPath, updatedFrontmatter, 'utf8');
          updated.push(file.replace('.md', ''));
        } else {
          skipped.push(file.replace('.md', ''));
        }
      }
    } catch (error) {
      errors.push(`Error processing ${file}: ${error.message}`);
    }
  });

  return { updated, skipped, errors };
}

console.log('🚀 Starting add draft status process...');
console.log('📅 Current date:', new Date().toISOString().split('T')[0]);

try {
  const result = addDraftStatus();
  
  if (result.updated.length > 0) {
    console.log('\n✅ Successfully added draft status:');
    result.updated.forEach(post => {
      console.log(`   - ${post}`);
    });
    console.log(`\n📊 Total posts updated: ${result.updated.length}`);
  } else {
    console.log('\nℹ️  No posts needed updating.');
  }
  
  if (result.skipped.length > 0) {
    console.log(`\n⏭️  Skipped ${result.skipped.length} posts (already past publish date or no publish date)`);
  }
  
  if (result.errors.length > 0) {
    console.log('\n❌ Errors encountered:');
    result.errors.forEach(error => {
      console.log(`   - ${error}`);
    });
    process.exit(1);
  }
  
  console.log('\n🎉 Add draft status process completed successfully!');
  
} catch (error) {
  console.error('\n💥 Error running add draft status:', error);
  process.exit(1);
}

