import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogPostPreview } from '@/types';
import { shouldPublishPost, calculateReadingTime, generateMetaDescription } from '@/lib/utils';

const contentDirectory = path.join(process.cwd(), 'content/blog');

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
  try {
    const files = fs.readdirSync(contentDirectory);
    return files
      .filter(name => name.endsWith('.md'))
      .map(name => name.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}

/**
 * Get blog post data by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Check if post should be published
    if (!shouldPublishPost(data.publishDate, data.status)) {
      return null;
    }

    const readingTime = calculateReadingTime(content);
    const metaDescription = data.metaDescription || generateMetaDescription(content);

    return {
      slug,
      title: data.title,
      description: metaDescription,
      content,
      publishDate: data.publishDate,
      lastModified: data.lastModified || data.publishDate,
      tags: data.tags || [],
      featuredImage: data.featuredImage,
      author: {
        name: data.author?.name || 'MultiTool Team',
        avatar: data.author?.avatar,
      },
      readingTime,
      seo: {
        metaTitle: data.metaTitle || data.title,
        metaDescription,
        keywords: data.keywords || data.tags || [],
      },
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all published blog posts
 */
export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  return posts;
}

/**
 * Get published blog post previews (without full content)
 */
export function getAllPostPreviews(): BlogPostPreview[] {
  const posts = getAllPosts();
  
  return posts.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishDate: post.publishDate,
    lastModified: post.lastModified,
    tags: post.tags,
    featuredImage: post.featuredImage,
    author: post.author,
    readingTime: post.readingTime,
    seo: post.seo,
    excerpt: post.content.substring(0, 300) + '...',
  }));
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tag: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter(post => 
    post.tags.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

/**
 * Get related posts based on tags
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPostPreview[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  const allPosts = getAllPostPreviews();
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .filter(post => 
      post.tags.some(tag => 
        currentPost.tags.some(currentTag => 
          currentTag.toLowerCase() === tag.toLowerCase()
        )
      )
    )
    .slice(0, limit);

  // If we don't have enough related posts by tags, fill with recent posts
  if (relatedPosts.length < limit) {
    const recentPosts = allPosts
      .filter(post => post.slug !== currentSlug)
      .filter(post => !relatedPosts.some(related => related.slug === post.slug))
      .slice(0, limit - relatedPosts.length);
    
    relatedPosts.push(...recentPosts);
  }

  return relatedPosts;
}

/**
 * Get all unique tags
 */
export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts();
  const tagCount: { [key: string]: number } = {};

  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Search posts by query
 */
export function searchPosts(query: string): BlogPost[] {
  const posts = getAllPosts();
  const lowercaseQuery = query.toLowerCase();

  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    post.author.name.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Get posts for RSS feed
 */
export function getPostsForRSS(limit: number = 20): BlogPost[] {
  return getAllPosts().slice(0, limit);
}

/**
 * Get scheduled posts (posts with future publish dates)
 */
export function getScheduledPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const now = new Date();
  
  return slugs
    .map(slug => {
      try {
        const fullPath = path.join(contentDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        
        const publishDate = new Date(data.publishDate);
        if (publishDate > now) {
          return {
            slug,
            title: data.title,
            publishDate: data.publishDate,
            tags: data.tags || [],
            author: {
              name: data.author?.name || 'MultiTool Team',
              avatar: data.author?.avatar,
            },
          } as Partial<BlogPost>;
        }
        return null;
      } catch (error) {
        console.error(`Error reading scheduled post ${slug}:`, error);
        return null;
      }
    })
    .filter((post): post is Partial<BlogPost> => post !== null)
    .sort((a, b) => new Date(a.publishDate!).getTime() - new Date(b.publishDate!).getTime()) as BlogPost[];
}

/**
 * Generate blog post slug from title
 */
export function generatePostSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Automatically publish draft posts when their scheduled date arrives
 */
export function autoPublishScheduledPosts(): { published: string[]; errors: string[] } {
  const slugs = getAllPostSlugs();
  const published: string[] = [];
  const errors: string[] = [];
  const today = new Date();

  slugs.forEach(slug => {
    try {
      const fullPath = path.join(contentDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Check if post is draft and publish date has arrived
      if (data.status === 'draft' && data.publishDate) {
        const publishDate = new Date(data.publishDate);
        
        if (publishDate <= today) {
          // Remove the status field to publish the post
          const updatedData = { ...data };
          delete updatedData.status;
          
          // Reconstruct the frontmatter
          const updatedFrontmatter = `---\n${Object.entries(updatedData)
            .map(([key, value]) => {
              if (key === 'author') {
                return `author:\n  name: "${value.name}"\n  avatar: "${value.avatar || ''}"`;
              }
              if (Array.isArray(value)) {
                return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
              }
              return `${key}: "${value}"`;
            })
            .join('\n')}\n---\n\n${content}`;

          // Write the updated file
          fs.writeFileSync(fullPath, updatedFrontmatter, 'utf8');
          published.push(slug);
        }
      }
    } catch (error) {
      errors.push(`Error processing ${slug}: ${error}`);
    }
  });

  return { published, errors };
}

/**
 * Validate blog post frontmatter
 */
export function validatePostFrontmatter(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title) {
    errors.push('Title is required');
  }

  if (!data.publishDate) {
    errors.push('Publish date is required');
  } else {
    const publishDate = new Date(data.publishDate);
    if (isNaN(publishDate.getTime())) {
      errors.push('Invalid publish date format');
    }
  }

  if (!data.tags || !Array.isArray(data.tags)) {
    errors.push('Tags array is required');
  }

  if (!data.author || !data.author.name) {
    errors.push('Author name is required');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
