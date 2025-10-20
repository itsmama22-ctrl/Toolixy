#!/bin/bash

echo "🚀 Running scheduled post publisher..."
echo "📅 Current date: $(date +'%Y-%m-%d')"

# Run the auto-publish script
npm run auto-publish

# Check if there were any changes
if git diff --quiet content/blog/; then
    echo "ℹ️  No posts were scheduled for publication today."
else
    echo "📝 Changes detected, committing and pushing..."
    git add content/blog/*.md
    git commit -m "🤖 Auto-published scheduled posts - $(date +'%Y-%m-%d')"
    git push origin main
    echo "✅ Changes pushed successfully!"
fi

echo "🎉 Publishing process completed!"
