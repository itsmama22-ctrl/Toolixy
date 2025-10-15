// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro';
  createdAt: Date;
  usage: {
    emailExtractions: number;
    paletteGenerations: number;
    lastResetDate: Date;
  };
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Email Extractor Types
export interface EmailExtractionRequest {
  url: string;
  userId?: string;
}

export interface EmailExtractionResult {
  id: string;
  url: string;
  emails: string[];
  extractedAt: Date;
  status: 'success' | 'error';
  errorMessage?: string;
  userId?: string;
}

export interface EmailExtractionHistory {
  id: string;
  url: string;
  emailCount: number;
  extractedAt: Date;
  emails: string[];
}

// Color Palette Types
export interface Color {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  name?: string;
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: Color[];
  createdAt: Date;
  userId?: string;
  source?: 'manual' | 'image' | 'ai' | 'random';
  imageUrl?: string;
}

export interface PaletteGenerationRequest {
  type: 'manual' | 'image' | 'ai' | 'random';
  imageFile?: File;
  baseColor?: string;
  theme?: 'complementary' | 'triadic' | 'analogous' | 'monochromatic';
  count?: number;
  userId?: string;
}

// Blog Types
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishDate: string;
  lastModified?: string;
  tags: string[];
  featuredImage?: string;
  author: {
    name: string;
    avatar?: string;
  };
  readingTime?: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface BlogPostPreview extends Omit<BlogPost, 'content'> {
  excerpt: string;
}

// Pricing and Plan Types
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    emailExtractions: number;
    paletteGenerations: number;
    savedItems: number;
    apiCalls: number;
  };
  popular?: boolean;
  ctaText: string;
  ctaUrl: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// SEO Types
export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

// Component Props Types
export interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  features: string[];
  popular?: boolean;
}

export interface FeatureSectionProps {
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

export interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
}

// Utility Types
export type PlanType = 'free' | 'pro';

export type ToolType = 'email-extractor' | 'color-palette';

export type SortOrder = 'asc' | 'desc';

export type SortField = 'date' | 'name' | 'usage';

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: Date;
}

// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
  interests?: string[];
}
