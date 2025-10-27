#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'content/blog');

function fixDraftStatus() {
  const files = fs.readdirSync(contentDirectory);
  const updated = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  files.forEach(file => {
    if (!file.endsWith('.md')) return;
    
    try {
      const fullPath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Only process files with future publish dates
      if (data.publishDate) {
        const publishDate = new Date(data.publishDate);
        publishDate.setHours(0, 0, 0, 0);
        
        // Check if this is a future post that needs draft status
        if (publishDate > today) {
          const needsUpdate = !data.status || data.status !== 'draft';
          
          if (needsUpdate) {
            // Add or update draft status
            const updatedData = { ...data, status: 'draft' };
            
            // Reconstruct the frontmatter
            const updatedFrontmatter = `---\n${Object.entries(updatedData)
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
            fs.writeFileSync(fullPath, updatedFrontmatter, 'utf8');
            updated.push(file.replace('.md', ''));
          }
        }
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  });

  return updated;
}

console.log('🚀 Fixing draft status for all future posts...');
console.log('📅 Current date:', new Date().toISOString().split('T')[0]);

try {
  const updated = fixDraftStatus();
  
  if (updated.length > 0) {
    console.log(`\n✅ Updated ${updated.length} posts with draft status:`);
    updated.forEach(post => {
      console.log(`   - ${post}`);
    });
  } else {
    console.log('\n✅ All posts already have proper draft status.');
  }
  
  console.log('\n🎉 Draft status fix completed successfully!');
  
} catch (error) {
  console.error('\n💥 Error fixing draft status:', error);
  process.exit(1);
}

