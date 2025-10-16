#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'content/blog');

function autoPublishScheduledPosts() {
  const files = fs.readdirSync(contentDirectory);
  const published = [];
  const errors = [];
  const today = new Date();

  files.forEach(file => {
    if (!file.endsWith('.md')) return;
    
    try {
      const fullPath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Check if post is draft and publish date has arrived
      if (data.status === 'draft' && data.publishDate) {
        const publishDate = new Date(data.publishDate);
        
        if (publishDate <= today) {
          // Remove the status field to publish the post
          const updatedData = { ...data };
          delete updatedData.status;
          
          // Reconstruct the frontmatter
          const updatedFrontmatter = `---\n${Object.entries(updatedData)
            .map(([key, value]) => {
              if (key === 'author') {
                return `author:\n  name: "${value.name}"\n  avatar: "${value.avatar || ''}"`;
              }
              if (Array.isArray(value)) {
                return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
              }
              return `${key}: "${value}"`;
            })
            .join('\n')}\n---\n\n${content}`;

          // Write the updated file
          fs.writeFileSync(fullPath, updatedFrontmatter, 'utf8');
          published.push(file.replace('.md', ''));
        }
      }
    } catch (error) {
      errors.push(`Error processing ${file}: ${error.message}`);
    }
  });

  return { published, errors };
}

console.log('🚀 Starting auto-publish process...');
console.log('📅 Current date:', new Date().toISOString().split('T')[0]);

try {
  const result = autoPublishScheduledPosts();
  
  if (result.published.length > 0) {
    console.log('\n✅ Successfully published posts:');
    result.published.forEach(post => {
      console.log(`   - ${post}`);
    });
    
    console.log(`\n📊 Total posts published: ${result.published.length}`);
  } else {
    console.log('\nℹ️  No posts scheduled for publication today.');
  }
  
  if (result.errors.length > 0) {
    console.log('\n❌ Errors encountered:');
    result.errors.forEach(error => {
      console.log(`   - ${error}`);
    });
    process.exit(1);
  }
  
  console.log('\n🎉 Auto-publish process completed successfully!');
  
} catch (error) {
  console.error('\n💥 Error running auto-publish:', error);
  process.exit(1);
}
