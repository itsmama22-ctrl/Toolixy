# 🚀 Automatic Post Publishing Setup

This document explains how to set up automatic publishing for your scheduled blog posts.

## 📋 What's Been Set Up

### 1. **Updated Blog Logic**
- ✅ Modified `shouldPublishPost()` to respect draft status
- ✅ Added `autoPublishScheduledPosts()` function
- ✅ Draft posts are now properly filtered out

### 2. **GitHub Actions Workflow**
- ✅ Daily scheduled runs at 9:00 AM UTC
- ✅ Manual trigger capability
- ✅ Automatic deployment to Vercel
- ✅ Git commits for published posts

### 3. **Manual Script**
- ✅ `npm run auto-publish` command
- ✅ Test and debug auto-publishing locally

## 🔧 GitHub Secrets Setup

To enable automatic deployment, add these secrets to your GitHub repository:

### Required Secrets:
1. **VERCEL_TOKEN** - Your Vercel API token
2. **ORG_ID** - Your Vercel organization ID  
3. **PROJECT_ID** - Your Vercel project ID

### How to Get Vercel Credentials:

1. **Get Vercel Token:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Get your token from Vercel dashboard:
   # https://vercel.com/account/tokens
   ```

2. **Get Project IDs:**
   ```bash
   # In your project directory
   vercel link
   
   # This will create .vercel/project.json with your IDs
   cat .vercel/project.json
   ```

3. **Add to GitHub Secrets:**
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Add each secret with the values above

## 📅 How It Works

### Automatic Publishing Process:
1. **Daily Check:** GitHub Actions runs every day at 9:00 AM UTC
2. **Post Analysis:** Scans all draft posts for scheduled dates
3. **Auto-Publish:** Removes `status: draft` from eligible posts
4. **Git Commit:** Commits changes with descriptive message
5. **Deploy:** Automatically deploys to Vercel
6. **Notify:** Logs success/failure status

### Manual Publishing:
```bash
# Run locally to test
npm run auto-publish

# Or run the script directly
node scripts/auto-publish.js
```

## 🎯 Post Status Rules

### Draft Posts (`status: "draft"`):
- ❌ **Never published** regardless of date
- ✅ **Auto-published** when date arrives (status removed)

### Published Posts (no status or `status: "published"`):
- ✅ **Published** if date has passed
- ❌ **Hidden** if date is in future

### Future Posts (future publish date):
- ❌ **Hidden** until date arrives
- ✅ **Auto-published** when date arrives

## 🔍 Testing the System

### 1. **Test Locally:**
```bash
# Run auto-publish script
npm run auto-publish

# Check which posts would be published
node -e "
const { autoPublishScheduledPosts } = require('./lib/blog.ts');
const result = autoPublishScheduledPosts();
console.log('Posts to publish:', result.published);
"
```

### 2. **Test GitHub Actions:**
- Go to your repository on GitHub
- Actions tab → "Auto Publish Scheduled Posts"
- Click "Run workflow" to test manually

### 3. **Verify Deployment:**
- Check your Vercel dashboard for new deployments
- Verify posts appear on your website
- Check GitHub commits for auto-publish messages

## 📊 Current Status

Your website has:
- **29 total posts**
- **10 draft posts** (will auto-publish when dates arrive)
- **19 ready posts** (published when dates arrive)

### Next Scheduled Publications:
- Posts scheduled for October-November 2025
- All will auto-publish on their scheduled dates
- GitHub Actions will handle deployment automatically

## 🚨 Troubleshooting

### If Posts Don't Auto-Publish:
1. Check GitHub Actions logs
2. Verify Vercel secrets are set
3. Run `npm run auto-publish` locally to test
4. Check post frontmatter for correct dates

### If Deployment Fails:
1. Verify VERCEL_TOKEN is valid
2. Check ORG_ID and PROJECT_ID
3. Ensure Vercel project is linked correctly

### Manual Override:
```bash
# Force publish all eligible posts
npm run auto-publish

# Then manually commit and push
git add content/blog/*.md
git commit -m "Manual publish: [post names]"
git push origin main
```

## 🎉 You're All Set!

Your automatic publishing system is now configured. Posts will automatically publish and deploy when their scheduled dates arrive!
