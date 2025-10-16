#!/usr/bin/env node

const { autoPublishScheduledPosts } = require('../lib/blog.ts');

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
