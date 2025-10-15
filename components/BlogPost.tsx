'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, Share2, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { BlogPost } from '@/types';
import { formatDate, copyToClipboard } from '@/lib/utils';
import BlogPostCard from './BlogPostCard';

interface BlogPostProps {
  post: BlogPost;
  relatedPosts: any[];
}

export default function BlogPost({ post, relatedPosts }: BlogPostProps) {
  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      await copyToClipboard(url);
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-6 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <Link
                key={index}
                href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6 text-gray-600">
            {/* Author */}
            <div className="flex items-center space-x-2">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <User className="w-5 h-5" />
              )}
              <span className="font-medium">{post.author.name}</span>
            </div>

            {/* Publish Date */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishDate)}</span>
            </div>

            {/* Reading Time */}
            {post.readingTime && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Description */}
        <p className="text-xl text-gray-600 leading-relaxed">
          {post.description}
        </p>
      </header>

      {/* Content */}
      <div className="blog-content prose prose-lg max-w-none">
        <ReactMarkdown
          components={{
            // Custom components for markdown elements
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-medium text-gray-700 mb-3 mt-6">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-gray-600 mb-4 leading-relaxed">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="mb-4 list-disc list-inside space-y-2">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-4 list-decimal list-inside space-y-2">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-gray-600">
                {children}
              </li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-700 my-6">
                {children}
              </blockquote>
            ),
            code: ({ children, className }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                    {children}
                  </code>
                );
              }
              return (
                <code className={className}>
                  {children}
                </code>
              );
            },
            pre: ({ children }) => (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
                {children}
              </pre>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-primary-600 hover:text-primary-700 underline"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            ),
            img: ({ src, alt }) => (
              <img
                src={src}
                alt={alt}
                className="rounded-lg shadow-medium my-6 w-full"
              />
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full divide-y divide-gray-200">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-50">
                {children}
              </thead>
            ),
            tbody: ({ children }) => (
              <tbody className="bg-white divide-y divide-gray-200">
                {children}
              </tbody>
            ),
            th: ({ children }) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {children}
              </td>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Author Bio */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <div className="flex items-start space-x-4">
          {post.author.avatar ? (
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary-600" />
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              About {post.author.name}
            </h3>
            <p className="text-gray-600">
              {post.author.name} is a member of the MultiTool team, sharing insights on digital marketing, 
              design, and productivity tools. Follow our blog for more expert tips and industry insights.
            </p>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <BlogPostCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <div className="mt-12 p-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Ready to Boost Your Productivity?
        </h3>
        <p className="text-gray-600 mb-6">
          Try our powerful tools to streamline your workflow and achieve better results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tools/email-extractor"
            className="btn-primary"
          >
            Extract Emails
          </Link>
          <Link
            href="/tools/color-palette"
            className="btn-secondary"
          >
            Generate Palettes
          </Link>
        </div>
      </div>
    </article>
  );
}
