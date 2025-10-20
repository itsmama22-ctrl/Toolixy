#!/usr/bin/env node

/**
 * Vercel Configuration Helper
 * This script helps you get the required Vercel tokens and IDs for GitHub Actions
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Vercel Configuration Helper\n');

try {
  // Check if vercel is installed
  console.log('📦 Checking Vercel CLI...');
  execSync('vercel --version', { stdio: 'pipe' });
  console.log('✅ Vercel CLI is installed\n');
} catch (error) {
  console.log('❌ Vercel CLI not found. Installing...\n');
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI installed successfully\n');
  } catch (installError) {
    console.log('❌ Failed to install Vercel CLI. Please install manually:');
    console.log('   npm install -g vercel\n');
    process.exit(1);
  }
}

try {
  // Check if user is logged in
  console.log('🔐 Checking Vercel authentication...');
  const whoami = execSync('vercel whoami', { encoding: 'utf8' }).trim();
  console.log(`✅ Logged in as: ${whoami}\n`);
} catch (error) {
  console.log('❌ Not logged in to Vercel. Please login:');
  console.log('   vercel login\n');
  process.exit(1);
}

try {
  // Check if project is linked
  console.log('🔗 Checking project link...');
  const projectPath = path.join(process.cwd(), '.vercel', 'project.json');
  
  if (fs.existsSync(projectPath)) {
    const projectInfo = JSON.parse(fs.readFileSync(projectPath, 'utf8'));
    console.log('✅ Project is linked to Vercel\n');
    console.log('📋 Required GitHub Secrets:\n');
    console.log('VERCEL_ORG_ID=' + projectInfo.orgId);
    console.log('VERCEL_PROJECT_ID=' + projectInfo.projectId);
  } else {
    console.log('❌ Project not linked. Linking now...\n');
    execSync('vercel link', { stdio: 'inherit' });
    
    // Try to read the project info again
    if (fs.existsSync(projectPath)) {
      const projectInfo = JSON.parse(fs.readFileSync(projectPath, 'utf8'));
      console.log('\n✅ Project linked successfully!\n');
      console.log('📋 Required GitHub Secrets:\n');
      console.log('VERCEL_ORG_ID=' + projectInfo.orgId);
      console.log('VERCEL_PROJECT_ID=' + projectInfo.projectId);
    }
  }
} catch (error) {
  console.log('❌ Error linking project:', error.message);
}

try {
  // Get Vercel token
  console.log('\n🔑 Getting Vercel token...');
  const tokens = execSync('vercel tokens ls', { encoding: 'utf8' });
  const tokenLines = tokens.split('\n').filter(line => line.includes('GitHub Actions'));
  
  if (tokenLines.length > 0) {
    const tokenMatch = tokenLines[0].match(/^[a-zA-Z0-9_-]+/);
    if (tokenMatch) {
      console.log('VERCEL_TOKEN=' + tokenMatch[0]);
    } else {
      console.log('❌ Could not extract token. Please create a new token:');
      console.log('   vercel tokens add "GitHub Actions"');
    }
  } else {
    console.log('❌ No GitHub Actions token found. Creating one...');
    execSync('vercel tokens add "GitHub Actions"', { stdio: 'inherit' });
    console.log('\n✅ Token created! Check the output above for your VERCEL_TOKEN.');
  }
} catch (error) {
  console.log('❌ Error managing tokens:', error.message);
  console.log('Please create a token manually: vercel tokens add "GitHub Actions"');
}

console.log('\n🎉 Setup complete!');
console.log('\n📝 Next steps:');
console.log('1. Copy the secrets above to GitHub Repository Settings → Secrets and variables → Actions');
console.log('2. Enable GitHub Actions in your repository');
console.log('3. Test the workflow manually from GitHub Actions tab');
console.log('\n🔗 GitHub Secrets URL:');
console.log(`https://github.com/itsmama22-ctrl/Toolixy/settings/secrets/actions`);
