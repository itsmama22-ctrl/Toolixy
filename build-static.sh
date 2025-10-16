#!/bin/bash

# Build the Next.js static export
npm run build

# Verify the build was successful
if [ ! -d "out" ]; then
    echo "Build failed - out directory not found"
    exit 1
fi

echo "Static build completed successfully"
echo "Files in out directory:"
ls -la out/
