const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { execSync } = require('child_process');

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

export default async function handler(req, res) {
  // Allow both GET and POST for compatibility
  if (!['GET', 'POST'].includes(req.method)) {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Note: Vercel Cron Jobs don't send auth headers by default
  // Consider adding IP allowlist or other security measures if needed
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.authorization;
  
  // If CRON_SECRET is set, require it
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('🚀 Starting auto-publish process...');
    console.log('📅 Current date:', new Date().toISOString().split('T')[0]);

    const result = autoPublishScheduledPosts();
    
    if (result.published.length > 0) {
      console.log('\n✅ Successfully published posts:');
      result.published.forEach(post => {
        console.log(`   - ${post}`);
      });
      
      console.log(`\n📊 Total posts published: ${result.published.length}`);
      
      // Trigger a new deployment to update the live site
      try {
        const vercelToken = process.env.VERCEL_TOKEN;
        if (vercelToken) {
          execSync(`vercel --token ${vercelToken} --prod --yes`, { 
            stdio: 'pipe',
            cwd: process.cwd()
          });
          console.log('🚀 Triggered new deployment');
        }
      } catch (deployError) {
        console.warn('⚠️  Failed to trigger deployment:', deployError.message);
      }
    } else {
      console.log('\nℹ️  No posts scheduled for publication today.');
    }
    
    if (result.errors.length > 0) {
      console.log('\n❌ Errors encountered:');
      result.errors.forEach(error => {
        console.log(`   - ${error}`);
      });
      return res.status(500).json({ 
        success: false, 
        published: result.published,
        errors: result.errors 
      });
    }
    
    console.log('\n🎉 Auto-publish process completed successfully!');
    
    return res.status(200).json({ 
      success: true, 
      published: result.published,
      message: `Successfully published ${result.published.length} posts`
    });
    
  } catch (error) {
    console.error('\n💥 Error running auto-publish:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}
