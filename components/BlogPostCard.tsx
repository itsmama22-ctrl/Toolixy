'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import type { BlogPostPreview } from '@/types';
import { formatDate } from '@/lib/utils';

interface BlogPostCardProps {
  post: BlogPostPreview;
  featured?: boolean;
}

export default function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const cardClasses = featured 
    ? "card-hover col-span-full md:col-span-2" 
    : "card-hover";

  return (
    <article className={cardClasses}>
      <Link href={`/blog/${post.slug}`} className="block group">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-4">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="space-y-3">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{post.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h2 className={`font-semibold text-gray-900 group-hover:text-primary-600 transition-colors ${
            featured ? 'text-xl' : 'text-lg'
          }`}>
            {post.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 line-clamp-3">
            {post.description}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              {/* Author */}
              <div className="flex items-center space-x-1">
                {post.author.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-4 h-4 rounded-full"
                  />
                ) : (
                  <User className="w-4 h-4" />
                )}
                <span>{post.author.name}</span>
              </div>

              {/* Publish Date */}
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.publishDate)}</span>
              </div>
            </div>

            {/* Reading Time */}
            {post.readingTime && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
