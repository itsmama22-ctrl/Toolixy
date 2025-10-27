// Enhanced Analytics utilities for toolixy
// Stream ID: 12343878097
// Measurement ID: G-QV3CSZF22Y

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Track tool usage events
export const trackToolUsage = (toolType: 'email_extractor' | 'color_palette', action: string, data?: any) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'tool_usage', {
      tool_type: toolType,
      user_action: action,
      event_category: 'tools',
      event_label: `${toolType}_${action}`,
      value: data?.value || 0,
      custom_parameter_1: toolType,
      custom_parameter_2: action,
      ...data
    });
  }
};

// Track email extraction events
export const trackEmailExtraction = (url: string, emailCount: number, success: boolean) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'email_extraction', {
      event_category: 'email_extractor',
      event_label: 'extraction_completed',
      tool_type: 'email_extractor',
      user_action: 'extract_emails',
      extraction_count: emailCount,
      extraction_url: url,
      extraction_success: success,
      custom_parameter_3: emailCount,
      value: emailCount
    });
  }
};

// Track color palette generation events
export const trackColorPaletteGeneration = (method: 'random' | 'image' | 'base_color', paletteSize: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'color_palette_generation', {
      event_category: 'color_palette',
      event_label: 'palette_generated',
      tool_type: 'color_palette',
      user_action: 'generate_palette',
      generation_method: method,
      palette_size: paletteSize,
      custom_parameter_4: paletteSize,
      value: paletteSize
    });
  }
};

// Track file downloads
export const trackFileDownload = (fileName: string, fileType: string, toolType: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'file_download', {
      event_category: 'downloads',
      event_label: fileName,
      file_name: fileName,
      file_type: fileType,
      tool_type: toolType,
      user_action: 'download_file'
    });
  }
};

// Track user engagement
export const trackUserEngagement = (action: string, page: string, duration?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_engagement', {
      event_category: 'engagement',
      event_label: action,
      page_location: page,
      engagement_time_msec: duration || 0,
      user_action: action
    });
  }
};

// Track conversion events
export const trackConversion = (conversionType: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      event_category: 'conversions',
      event_label: conversionType,
      value: value || 0,
      user_action: conversionType
    });
  }
};

// Track errors
export const trackError = (errorType: string, errorMessage: string, toolType?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: errorMessage,
      fatal: false,
      error_type: errorType,
      tool_type: toolType || 'unknown',
      user_action: 'error_occurred'
    });
  }
};

// Track page performance
export const trackPagePerformance = (pageName: string, loadTime: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: 'page_load',
      value: loadTime,
      event_category: 'performance',
      event_label: pageName
    });
  }
};

// Track search events (if you add search functionality)
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      results_count: resultsCount,
      event_category: 'search',
      user_action: 'search_performed'
    });
  }
};

// Track social media clicks
export const trackSocialClick = (platform: string, action: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'social_click', {
      social_network: platform,
      social_action: action,
      event_category: 'social',
      user_action: 'social_interaction'
    });
  }
};

// Track newsletter signup
export const trackNewsletterSignup = (email: string, source: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'newsletter_signup', {
      event_category: 'engagement',
      event_label: 'newsletter_subscription',
      signup_source: source,
      user_action: 'newsletter_signup'
    });
  }
};

// Track contact form submission
export const trackContactForm = (formType: string, success: boolean) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      event_category: 'forms',
      event_label: formType,
      form_type: formType,
      form_success: success,
      user_action: 'form_submission'
    });
  }
};

