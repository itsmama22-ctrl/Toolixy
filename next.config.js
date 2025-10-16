/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Optimized for Vercel deployment
  distDir: 'out'
}

module.exports = nextConfig
