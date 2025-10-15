import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts } from '@/lib/blog';
import BlogPost from '@/components/BlogPost';
import SEO from '@/components/SEO';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: post.seo.metaTitle || post.title,
    description: post.seo.metaDescription || post.description,
    keywords: post.seo.keywords,
    openGraph: {
      title: post.seo.metaTitle || post.title,
      description: post.seo.metaDescription || post.description,
      images: post.featuredImage ? [post.featuredImage] : ['/images/og-blog-default.jpg'],
      type: 'article',
      publishedTime: post.publishDate,
      modifiedTime: post.lastModified,
      authors: [post.author.name],
      section: post.tags[0] || 'General',
      tags: post.tags,
    },
    twitter: {
      title: post.seo.metaTitle || post.title,
      description: post.seo.metaDescription || post.description,
      images: post.featuredImage ? [post.featuredImage] : ['/images/twitter-blog-default.jpg'],
    },
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(params.slug, 3);

  return (
    <>
      <SEO
        title={post.seo.metaTitle || post.title}
        description={post.seo.metaDescription || post.description}
        keywords={post.seo.keywords}
        url={`/blog/${params.slug}`}
        type="article"
        publishedTime={post.publishDate}
        modifiedTime={post.lastModified}
        author={post.author.name}
        section={post.tags[0]}
        tags={post.tags}
        image={post.featuredImage}
      />
      
      <div className="min-h-screen bg-gray-50">
        <BlogPost post={post} relatedPosts={relatedPosts} />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const { getAllPostSlugs } = await import('@/lib/blog');
  const slugs = getAllPostSlugs();
  
  return slugs.map((slug) => ({
    slug: slug,
  }));
}
