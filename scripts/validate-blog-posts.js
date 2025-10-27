#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'content/blog');

function validateBlogPost(filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const filename = path.basename(filePath, '.md');
    
    const issues = [];
    
    // Check required fields
    if (!data.title) issues.push('Missing title');
    if (!data.publishDate) issues.push('Missing publishDate');
    if (!data.tags || !Array.isArray(data.tags) || data.tags.length === 0) issues.push('Missing or invalid tags');
    if (!data.author || !data.author.name) issues.push('Missing author name');
    if (!data.featuredImage) issues.push('Missing featuredImage');
    if (!data.excerpt) issues.push('Missing excerpt');
    if (!data.metaTitle) issues.push('Missing metaTitle');
    if (!data.metaDescription) issues.push('Missing metaDescription');
    if (!data.readingTime) issues.push('Missing readingTime');
    if (!data.canonical) issues.push('Missing canonical URL');
    
    // Check content length
    const wordCount = content.split(/\s+/).length;
    if (wordCount < 200) issues.push(`Content too short (${wordCount} words)`);
    
    // Check date validity
    if (data.publishDate) {
      const publishDate = new Date(data.publishDate);
      if (isNaN(publishDate.getTime())) {
        issues.push(`Invalid publishDate: ${data.publishDate}`);
      }
    }
    
    // Check image exists
    if (data.featuredImage) {
      const imagePath = path.join(process.cwd(), 'public', data.featuredImage);
      if (!fs.existsSync(imagePath)) {
        issues.push(`Missing image: ${data.featuredImage}`);
      }
    }
    
    // Check author avatar exists
    if (data.author && data.author.avatar) {
      const avatarPath = path.join(process.cwd(), 'public', data.author.avatar);
      if (!fs.existsSync(avatarPath)) {
        issues.push(`Missing author avatar: ${data.author.avatar}`);
      }
    }
    
    // Check for duplicate titles (would need to be checked across all files)
    // Check for proper slug format
    if (!/^[a-z0-9-]+$/.test(filename)) {
      issues.push(`Invalid filename format: ${filename}`);
    }
    
    return {
      filename,
      issues,
      wordCount,
      hasIssues: issues.length > 0
    };
  } catch (error) {
    return {
      filename: path.basename(filePath, '.md'),
      issues: [`Parse error: ${error.message}`],
      wordCount: 0,
      hasIssues: true
    };
  }
}

function validateAllBlogPosts() {
  const files = fs.readdirSync(contentDirectory);
  const results = {
    total: 0,
    valid: 0,
    invalid: 0,
    issues: [],
    duplicates: [],
    summary: {
      missingTitles: 0,
      missingDates: 0,
      missingImages: 0,
      shortContent: 0,
      invalidDates: 0
    }
  };

  const titles = new Map();
  
  files.forEach(file => {
    if (!file.endsWith('.md')) return;
    
    const filePath = path.join(contentDirectory, file);
    const validation = validateBlogPost(filePath);
    
    results.total++;
    
    if (validation.hasIssues) {
      results.invalid++;
      results.issues.push(validation);
      
      // Count issue types
      validation.issues.forEach(issue => {
        if (issue.includes('Missing title')) results.summary.missingTitles++;
        if (issue.includes('Missing publishDate')) results.summary.missingDates++;
        if (issue.includes('Missing image')) results.summary.missingImages++;
        if (issue.includes('Content too short')) results.summary.shortContent++;
        if (issue.includes('Invalid publishDate')) results.summary.invalidDates++;
      });
    } else {
      results.valid++;
    }
    
    // Check for duplicate titles
    if (validation.filename && titles.has(validation.filename)) {
      results.duplicates.push({
        title: validation.filename,
        files: [titles.get(validation.filename), file]
      });
    } else if (validation.filename) {
      titles.set(validation.filename, file);
    }
  });

  return results;
}

console.log('🔍 Starting comprehensive blog post validation...');
console.log('📅 Current date:', new Date().toISOString().split('T')[0]);

try {
  const results = validateAllBlogPosts();
  
  console.log(`\n📊 Validation Results:`);
  console.log(`   Total posts: ${results.total}`);
  console.log(`   Valid posts: ${results.valid}`);
  console.log(`   Invalid posts: ${results.invalid}`);
  
  if (results.invalid > 0) {
    console.log(`\n❌ Issues found:`);
    console.log(`   Missing titles: ${results.summary.missingTitles}`);
    console.log(`   Missing dates: ${results.summary.missingDates}`);
    console.log(`   Missing images: ${results.summary.missingImages}`);
    console.log(`   Short content: ${results.summary.shortContent}`);
    console.log(`   Invalid dates: ${results.summary.invalidDates}`);
    
    console.log(`\n📋 Detailed issues:`);
    results.issues.forEach(issue => {
      console.log(`\n📄 ${issue.filename}:`);
      issue.issues.forEach(problem => {
        console.log(`   - ${problem}`);
      });
      if (issue.wordCount > 0) {
        console.log(`   - Word count: ${issue.wordCount}`);
      }
    });
  }
  
  if (results.duplicates.length > 0) {
    console.log(`\n🔄 Duplicate titles found:`);
    results.duplicates.forEach(dup => {
      console.log(`   - "${dup.title}": ${dup.files.join(', ')}`);
    });
  }
  
  if (results.valid === results.total) {
    console.log('\n🎉 All blog posts are valid!');
  } else {
    console.log(`\n⚠️  ${results.invalid} posts need attention.`);
  }
  
} catch (error) {
  console.error('\n💥 Error during validation:', error);
  process.exit(1);
}

