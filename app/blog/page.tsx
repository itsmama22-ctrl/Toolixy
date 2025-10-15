import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPostPreviews } from '@/lib/blog';
import BlogPostCard from '@/components/BlogPostCard';
import SEO from '@/components/SEO';

export const metadata: Metadata = {
  title: 'Blog - Marketing & Design Insights | MultiTool SaaS',
  description: 'Discover expert insights on email marketing, design trends, lead generation, and productivity tools. Learn how to boost your business with our comprehensive guides.',
  keywords: ['marketing blog', 'design tips', 'lead generation', 'email marketing', 'productivity', 'business growth'],
  openGraph: {
    title: 'Blog - Marketing & Design Insights | MultiTool SaaS',
    description: 'Discover expert insights on email marketing, design trends, lead generation, and productivity tools.',
    images: ['/images/og-blog.jpg'],
  },
  twitter: {
    title: 'Blog - Marketing & Design Insights | MultiTool SaaS',
    description: 'Discover expert insights on email marketing, design trends, lead generation, and productivity tools.',
    images: ['/images/twitter-blog.jpg'],
  },
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  const posts = getAllPostPreviews();

  return (
    <>
      <SEO
        title="Blog - Marketing & Design Insights"
        description="Discover expert insights on email marketing, design trends, lead generation, and productivity tools. Learn how to boost your business with our comprehensive guides."
        keywords={['marketing blog', 'design tips', 'lead generation', 'email marketing', 'productivity', 'business growth']}
        url="/blog"
        type="website"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-white border-b border-gray-200">
          <div className="container-custom py-16">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Marketing & Design Insights
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover expert tips, strategies, and insights to boost your productivity, 
                improve your marketing, and create better designs.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="container-custom">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <BlogPostCard 
                    key={post.slug} 
                    post={post} 
                    featured={index === 0}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  No posts available yet
                </h2>
                <p className="text-gray-600 mb-8">
                  We're working on creating amazing content for you. Check back soon!
                </p>
                <Link href="/" className="btn-primary">
                  Back to Home
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-primary-600 py-16">
          <div className="container-custom">
            <div className="text-center text-white max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Stay Updated
              </h2>
              <p className="text-xl text-primary-100 mb-8">
                Get the latest marketing and design insights delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 max-w-md px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="btn-primary bg-white text-primary-600 hover:bg-gray-100 px-8 py-3">
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-primary-200 mt-4">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
