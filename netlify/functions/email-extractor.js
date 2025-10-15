const cheerio = require('cheerio');
const axios = require('axios');

/**
 * Netlify Function to extract emails from a given URL
 * Handles CORS, validates URLs, and extracts emails using cheerio
 */
exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    // Parse request body
    const body = JSON.parse(event.body || '{}');
    const { url } = body;

    // Validate URL
    if (!url) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'URL is required',
        }),
      };
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Invalid URL format',
        }),
      };
    }

    // Security: Only allow HTTP and HTTPS protocols
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Only HTTP and HTTPS URLs are allowed',
        }),
      };
    }

    // Rate limiting: Simple check (in production, use Redis or similar)
    const userAgent = event.headers['user-agent'] || 'MultiToolSaaS/1.0';
    
    // Fetch the webpage
    const response = await axios.get(url, {
      timeout: 10000, // 10 second timeout
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
      },
      maxRedirects: 5,
      validateStatus: (status) => status < 400, // Accept redirects
    });

    // Load HTML into cheerio
    const $ = cheerio.load(response.data);

    // Remove script and style elements to avoid extracting emails from JS/CSS
    $('script, style, noscript').remove();

    // Get all text content
    const textContent = $.text();

    // Email regex pattern - more comprehensive than basic validation
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    
    // Extract emails
    const emails = textContent.match(emailRegex) || [];

    // Remove duplicates and filter out common false positives
    const uniqueEmails = [...new Set(emails)]
      .filter(email => {
        // Filter out obvious false positives
        const lowerEmail = email.toLowerCase();
        return !lowerEmail.includes('example.com') &&
               !lowerEmail.includes('test.com') &&
               !lowerEmail.includes('localhost') &&
               !lowerEmail.includes('domain.com') &&
               !lowerEmail.includes('your-email.com') &&
               !lowerEmail.includes('email@') && // Incomplete emails
               email.length > 5 && // Minimum length check
               email.split('@')[1] && // Must have domain part
               email.split('@')[1].includes('.'); // Domain must have TLD
      })
      .map(email => email.trim())
      .sort();

    // Additional extraction from specific elements that commonly contain emails
    const linkEmails = [];
    $('a[href^="mailto:"]').each((i, element) => {
      const href = $(element).attr('href');
      if (href) {
        const email = href.replace('mailto:', '').split('?')[0]; // Remove mailto: and query params
        if (emailRegex.test(email)) {
          linkEmails.push(email.trim());
        }
      }
    });

    // Merge and deduplicate
    const allEmails = [...new Set([...uniqueEmails, ...linkEmails])].sort();

    // Extract metadata
    const title = $('title').text().trim() || 'Untitled';
    const description = $('meta[name="description"]').attr('content') || '';
    const domain = new URL(url).hostname;

    // Log extraction (for monitoring)
    console.log(`Email extraction completed for ${url}: ${allEmails.length} emails found`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: {
          url,
          domain,
          title,
          description,
          emails: allEmails,
          emailCount: allEmails.length,
          extractedAt: new Date().toISOString(),
          metadata: {
            pageTitle: title,
            description,
            domain,
          }
        },
      }),
    };

  } catch (error) {
    console.error('Email extraction error:', error);

    // Handle specific error types
    let errorMessage = 'Failed to extract emails';
    
    if (error.code === 'ENOTFOUND') {
      errorMessage = 'Domain not found. Please check the URL.';
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Connection refused. The website may be down.';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Request timed out. The website may be slow to respond.';
    } else if (error.response?.status === 403) {
      errorMessage = 'Access forbidden. The website blocked our request.';
    } else if (error.response?.status === 404) {
      errorMessage = 'Page not found. Please check the URL.';
    } else if (error.response?.status >= 500) {
      errorMessage = 'Server error on the target website.';
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      }),
    };
  }
};
