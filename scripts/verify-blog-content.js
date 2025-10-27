const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, '../content/blog');

// Function to check if should publish (simplified)
function shouldPublishPost(publishDate, status) {
  if (status === 'draft') return false;
  const now = new Date();
  const pubDate = new Date(publishDate);
  return pubDate <= now;
}

function verifyBlogPosts() {
  const files = fs.readdirSync(contentDir);
  const posts = files.filter(f => f.endsWith('.md'));
  
  const results = {
    total: posts.length,
    published: 0,
    drafts: 0,
    emptyContent: 0,
    shortContent: 0,
    errors: []
  };

  posts.forEach(file => {
    try {
      const fullPath = path.join(contentDir, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Check publish status
      const shouldPublish = shouldPublishPost(data.publishDate, data.status);
      if (shouldPublish) {
        results.published++;
      } else {
        results.drafts++;
      }
      
      // Check content
      const trimmedContent = content.trim();
      if (!trimmedContent) {
        results.emptyContent++;
        results.errors.push(`${file}: NO CONTENT`);
      } else if (trimmedContent.length < 100) {
        results.shortContent++;
        results.errors.push(`${file}: SHORT CONTENT (${trimmedContent.length} chars)`);
      }
      
      // Log for debugging
      if (!trimmedContent || trimmedContent.length < 100) {
        console.log(`\n⚠️  ${file}`);
        console.log(`   Status: ${data.status || 'published'}`);
        console.log(`   Publish Date: ${data.publishDate}`);
        console.log(`   Content length: ${trimmedContent.length}`);
        console.log(`   Preview: ${trimmedContent.substring(0, 200)}...`);
      }
    } catch (error) {
      results.errors.push(`${file}: ERROR - ${error.message}`);
    }
  });

  console.log('\n========== BLOG POST VERIFICATION ==========\n');
  console.log(`Total Posts: ${results.total}`);
  console.log(`Published: ${results.published}`);
  console.log(`Drafts: ${results.drafts}`);
  console.log(`Posts with NO CONTENT: ${results.emptyContent}`);
  console.log(`Posts with SHORT CONTENT (<100 chars): ${results.shortContent}`);
  
  if (results.errors.length > 0) {
    console.log('\n══════════ ERRORS ══════════');
    results.errors.forEach(err => console.log(err));
  }
  
  console.log('\n========== VERIFICATION COMPLETE ==========\n');
  
  return results;
}

verifyBlogPosts();

