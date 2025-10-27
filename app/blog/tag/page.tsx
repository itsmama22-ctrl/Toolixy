import type { Metadata } from 'next';
import { Tag, ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog Tags - Browse Posts by Category | toolixy',
  description: 'Browse our blog posts by category and tags. Find articles about email marketing, color theory, design tips, and more.',
  keywords: ['blog tags', 'categories', 'blog posts', 'email marketing', 'color theory', 'design'],
  openGraph: {
    title: 'Blog Tags - Browse Posts by Category | toolixy',
    description: 'Browse our blog posts by category and tags. Find articles about email marketing, color theory, design tips, and more.',
    images: ['/images/og-blog-tags.jpg'],
  },
  twitter: {
    title: 'Blog Tags - Browse Posts by Category | toolixy',
    description: 'Browse our blog posts by category and tags. Find articles about email marketing, color theory, design tips, and more.',
    images: ['/images/twitter-blog-tags.jpg'],
  },
  alternates: {
    canonical: '/blog/tag',
  },
};

export default function BlogTagPage() {
  // Mock tags data - in a real app, this would come from your CMS
  const tags = [
    { name: 'Email Marketing', count: 15, slug: 'email-marketing' },
    { name: 'Color Theory', count: 12, slug: 'color-theory' },
    { name: 'Design Tips', count: 18, slug: 'design-tips' },
    { name: 'Lead Generation', count: 8, slug: 'lead-generation' },
    { name: 'Web Design', count: 10, slug: 'web-design' },
    { name: 'Marketing Automation', count: 6, slug: 'marketing-automation' },
    { name: 'Branding', count: 9, slug: 'branding' },
    { name: 'UX/UI Design', count: 7, slug: 'ux-ui-design' },
    { name: 'Email Extraction', count: 5, slug: 'email-extraction' },
    { name: 'Color Palettes', count: 11, slug: 'color-palettes' },
    { name: 'Digital Marketing', count: 13, slug: 'digital-marketing' },
    { name: 'Tools & Resources', count: 14, slug: 'tools-resources' },
  ];

  return (
    <>
      <SEO
        title="Blog Tags - Browse Posts by Category"
        description="Browse our blog posts by category and tags. Find articles about email marketing, color theory, design tips, and more."
        keywords={['blog tags', 'categories', 'blog posts', 'email marketing', 'color theory', 'design']}
        url="/blog/tag"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Breadcrumb className="mb-6" />
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <Link 
                href="/blog" 
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Blog</span>
              </Link>
            </div>
            <h1 className="heading-1 mb-4">Browse by Category</h1>
            <p className="body-large text-gray-600 max-w-3xl">
              Explore our blog posts organized by topics and categories. Find articles that match your interests 
              and discover new insights about email marketing, design, and digital tools.
            </p>
          </div>

          {/* Tags Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/blog/tag/${tag.slug}`}
                className="card hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <Tag className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="heading-4 mb-1 group-hover:text-primary-600 transition-colors">
                      {tag.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {tag.count} {tag.count === 1 ? 'post' : 'posts'}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Popular Tags */}
          <div className="mt-16">
            <h2 className="heading-2 mb-8">Popular Tags</h2>
            <div className="flex flex-wrap gap-3">
              {tags
                .sort((a, b) => b.count - a.count)
                .slice(0, 10)
                .map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/blog/tag/${tag.slug}`}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 rounded-full transition-colors"
                  >
                    <Tag className="w-4 h-4" />
                    <span>{tag.name}</span>
                    <span className="text-xs bg-white px-2 py-1 rounded-full">
                      {tag.count}
                    </span>
                  </Link>
                ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-12 text-white text-center">
            <h2 className="heading-2 mb-6 text-white">Can't Find What You're Looking For?</h2>
            <p className="body-large text-primary-100 mb-8 max-w-2xl mx-auto">
              Browse all our blog posts or use the search function to find specific topics and articles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/blog" 
                className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                View All Posts
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                Suggest a Topic
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

