# 🔧 GitHub Setup Guide for Auto-Publishing

## ⚠️ OAuth Scope Issue

GitHub is blocking the workflow file push due to OAuth scope restrictions. Here's how to fix this:

## 🚀 Solution 1: Manual GitHub Setup (Recommended)

### Step 1: Enable GitHub Actions
1. Go to your GitHub repository: `https://github.com/itsmama22-ctrl/Toolixy`
2. Click **Settings** tab
3. Scroll down to **Actions** → **General**
4. Select **"Allow all actions and reusable workflows"**
5. Click **Save**

### Step 2: Create Workflow Manually
1. Go to **Actions** tab in your repository
2. Click **"New workflow"**
3. Click **"set up a workflow yourself"**
4. Replace the content with our workflow:

```yaml
name: Auto Publish Scheduled Posts

on:
  # Run daily at 9:00 AM UTC (adjust timezone as needed)
  schedule:
    - cron: '0 9 * * *'
  
  # Allow manual triggering
  workflow_dispatch:
    inputs:
      force_publish:
        description: 'Force publish all eligible posts'
        required: false
        default: false
        type: boolean

  # Run on push to main branch
  push:
    branches: [ main ]

jobs:
  auto-publish:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout repository
      uses: actions/checkout@v4
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Auto-publish scheduled posts
      run: |
        echo "Checking for posts to auto-publish..."
        node -e "
        const fs = require('fs');
        const path = require('path');
        const matter = require('gray-matter');
        
        const contentDirectory = path.join(process.cwd(), 'content/blog');
        const files = fs.readdirSync(contentDirectory);
        const published = [];
        const today = new Date();
        
        files.forEach(file => {
          if (!file.endsWith('.md')) return;
          
          try {
            const fullPath = path.join(contentDirectory, file);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);
            
            if (data.status === 'draft' && data.publishDate) {
              const publishDate = new Date(data.publishDate);
              
              if (publishDate <= today) {
                const updatedData = { ...data };
                delete updatedData.status;
                
                const updatedFrontmatter = \`---\n\${Object.entries(updatedData)
                  .map(([key, value]) => {
                    if (key === 'author') {
                      return \`author:\n  name: \"\${value.name}\"\n  avatar: \"\${value.avatar || ''}\"\`;
                    }
                    if (Array.isArray(value)) {
                      return \`\${key}: [\${value.map(v => \`\"\${v}\"\`).join(', ')}]\`;
                    }
                    return \`\${key}: \"\${value}\"\`;
                  })
                  .join('\n')}\n---\n\n\${content}\`;
                
                fs.writeFileSync(fullPath, updatedFrontmatter, 'utf8');
                published.push(file.replace('.md', ''));
              }
            }
          } catch (error) {
            console.error(\`Error processing \${file}:\`, error);
          }
        });
        
        if (published.length > 0) {
          console.log('Published posts:', published.join(', '));
          console.log('::set-output name=has_changes::true');
          console.log('::set-output name=published_posts::' + published.join(','));
        } else {
          console.log('No posts to publish today.');
          console.log('::set-output name=has_changes::false');
        }
        "
      id: auto_publish
    
    - name: Commit and push changes
      if: steps.auto_publish.outputs.has_changes == 'true'
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        
        git add content/blog/*.md
        git commit -m "Auto-publish scheduled posts: ${{ steps.auto_publish.outputs.published_posts }}" || exit 0
        git push origin main
    
    - name: Deploy to Vercel
      if: steps.auto_publish.outputs.has_changes == 'true'
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        working-directory: ./
        vercel-args: '--prod'
    
    - name: Notify on success
      if: steps.auto_publish.outputs.has_changes == 'true'
      run: |
        echo "✅ Successfully auto-published posts: ${{ steps.auto_publish.outputs.published_posts }}"
        echo "🚀 Deployment to Vercel initiated"
    
    - name: Notify no changes
      if: steps.auto_publish.outputs.has_changes == 'false'
      run: |
        echo "ℹ️ No posts scheduled for publication today"
```

5. Name the file: `auto-publish-posts.yml`
6. Click **"Start commit"** → **"Commit new file"**

## 🔑 Step 3: Add Required Secrets

Go to **Settings** → **Secrets and variables** → **Actions** and add:

### Required Secrets:
1. **VERCEL_TOKEN**
   - Get from: https://vercel.com/account/tokens
   - Create a new token with full access

2. **ORG_ID** 
   - Run: `vercel link` in your project
   - Check `.vercel/project.json` file

3. **PROJECT_ID**
   - Same as above, from `.vercel/project.json`

## 🚀 Solution 2: Alternative - Manual Publishing

If you prefer manual control, you can:

1. **Run locally daily:**
   ```bash
   npm run auto-publish
   git add content/blog/*.md
   git commit -m "Manual publish: [date]"
   git push origin main
   ```

2. **Use Vercel CLI:**
   ```bash
   npm run auto-publish
   vercel --prod
   ```

## 🎯 Current Status

Your automatic publishing system is ready! The code is committed locally and just needs the GitHub workflow setup.

### Next Steps:
1. ✅ Set up GitHub Actions workflow (manual)
2. ✅ Add Vercel secrets
3. ✅ Test the workflow
4. ✅ Posts will auto-publish on scheduled dates

## 📅 Upcoming Auto-Publications:

- **October 19:** Advanced Email Extraction Techniques
- **October 22:** Professional Color Palette Tools
- **October 26:** Email Lead Generation Strategies
- **October 30:** Design Inspiration Color Trends
- And 6 more in November 2025!

Your system is ready to automatically publish these posts when their dates arrive! 🎉
