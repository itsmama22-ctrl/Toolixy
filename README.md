# toolixy - Professional Web Tools Platform

A modern, clean multi-tool website built with Next.js 14, TypeScript, and Tailwind CSS. Features email extraction and color palette generation tools with a comprehensive blog system.

## 🚀 Features

### Core Tools
- **Email Extractor**: Extract email addresses from any website with CSV/TXT export
- **Color Palette Generator**: Create palettes from images or generate manually with multiple export formats

### Platform Features
- **Responsive Design**: Works perfectly on all devices
- **SEO Optimized**: Complete meta tags, sitemaps, and structured data
- **Blog System**: Markdown-based blog with professional content
- **Client-Side Processing**: No server dependencies, works entirely in browser
- **Modern UI**: Clean, professional design with smooth animations

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Processing**: Client-side JavaScript
- **Content**: Markdown with gray-matter
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd email-extractor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Adding Blog Posts

Create markdown files in `content/blog/` with the following frontmatter:

```markdown
---
title: "Your Post Title"
publishDate: "2024-01-25"
lastModified: "2024-01-25"
tags: ["marketing", "tips", "growth"]
author:
  name: "Your Name"
  avatar: "/images/authors/your-avatar.svg"
featuredImage: "/images/blog/your-post-image.svg"
metaTitle: "SEO Optimized Title"
metaDescription: "SEO description for search engines"
keywords: ["keyword1", "keyword2", "keyword3"]
---

# Your Post Content

Write your blog post content here using markdown...
```

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Deploy automatically**

### Manual Deployment

```bash
npm run build
# Deploy the build output to your hosting provider
```

## 📁 Project Structure

```
├── app/                          # Next.js 14 app directory
│   ├── blog/                    # Blog pages and dynamic routes
│   ├── tools/                   # Tool pages
│   ├── layout.tsx              # Root layout with SEO
│   ├── page.tsx                # Homepage
│   ├── sitemap.ts              # Dynamic sitemap generation
│   └── robots.ts               # Robots.txt configuration
├── components/                   # React components
├── content/
│   └── blog/                   # Markdown blog posts
├── lib/                         # Utility libraries
├── public/                      # Static assets
└── scripts/                     # Build and utility scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for marketers, designers, and entrepreneurs worldwide.**