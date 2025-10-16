#!/bin/bash

echo "🚀 Deploying Toolisy website to Vercel..."

# Remove any existing .vercel directory
rm -rf .vercel

# Deploy to Vercel with a clean project name
echo "📦 Building and deploying..."
vercel --prod --yes --name toolixy-website

echo "✅ Deployment complete!"
echo "🌐 Your website should be live shortly"
