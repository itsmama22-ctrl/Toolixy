import type { Metadata } from 'next';
import { BookOpen, Code, Zap, Shield, ArrowRight, CheckCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Documentation - API & Integration Guides | toolixy',
  description: 'Complete documentation for toolixy tools. Learn how to integrate our email extraction and color palette generation APIs into your applications.',
  keywords: ['documentation', 'API', 'integration', 'email extractor', 'color palette generator', 'developer tools'],
  openGraph: {
    title: 'Documentation - API & Integration Guides | toolixy',
    description: 'Complete documentation for toolixy tools. Learn how to integrate our email extraction and color palette generation APIs into your applications.',
    images: ['/images/og-docs.jpg'],
  },
  twitter: {
    title: 'Documentation - API & Integration Guides | toolixy',
    description: 'Complete documentation for toolixy tools. Learn how to integrate our email extraction and color palette generation APIs into your applications.',
    images: ['/images/twitter-docs.jpg'],
  },
  alternates: {
    canonical: '/docs',
  },
};

export default function DocsPage() {
  return (
    <>
      <SEO
        title="Documentation - API & Integration Guides"
        description="Complete documentation for toolixy tools. Learn how to integrate our email extraction and color palette generation APIs into your applications."
        keywords={['documentation', 'API', 'integration', 'email extractor', 'color palette generator', 'developer tools']}
        url="/docs"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Breadcrumb className="mb-6" />
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-6">Documentation</h1>
            <p className="body-large text-gray-600 max-w-3xl mx-auto">
              Everything you need to integrate toolixy tools into your applications. 
              From API references to code examples, we've got you covered.
            </p>
          </div>

          {/* Quick Start */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">Quick Start</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="heading-4">Email Extractor API</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Extract emails from any website with our simple REST API. Perfect for lead generation and contact discovery.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <code className="text-sm text-gray-800">
                    POST /api/extract-emails<br/>
                    {`{ "url": "https://example.com" }`}
                  </code>
                </div>
                <a href="#email-api" className="text-primary-600 hover:text-primary-700 font-medium">
                  View Email API Docs →
                </a>
              </div>

              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="heading-4">Color Palette API</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Generate beautiful color palettes programmatically. Create harmonious color schemes for any design project.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <code className="text-sm text-gray-800">
                    POST /api/generate-palette<br/>
                    {`{ "baseColor": "#3b82f6" }`}
                  </code>
                </div>
                <a href="#color-api" className="text-primary-600 hover:text-primary-700 font-medium">
                  View Color API Docs →
                </a>
              </div>
            </div>
          </div>

          {/* API Reference */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">API Reference</h2>
            
            {/* Email Extractor API */}
            <div id="email-api" className="mb-12">
              <h3 className="heading-3 mb-6">Email Extractor API</h3>
              <div className="card">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">POST</span>
                  <code className="text-lg font-mono">/api/extract-emails</code>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Request Body</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-800">{`{
  "url": "string (required)",
  "options": {
    "maxEmails": "number (optional, default: 100)",
    "includeGeneric": "boolean (optional, default: false)"
  }
}`}</pre>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-800">{`{
  "success": true,
  "emails": [
    "contact@example.com",
    "info@example.com"
  ],
  "count": 2,
  "url": "https://example.com"
}`}</pre>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Rate Limit: 100 requests/hour</span>
                  <span>•</span>
                  <span>Authentication: API Key required</span>
                </div>
              </div>
            </div>

            {/* Color Palette API */}
            <div id="color-api" className="mb-12">
              <h3 className="heading-3 mb-6">Color Palette API</h3>
              <div className="card">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">POST</span>
                  <code className="text-lg font-mono">/api/generate-palette</code>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Request Body</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-800">{`{
  "baseColor": "string (hex color, required)",
  "paletteType": "string (optional: 'analogous', 'complementary', 'triadic')",
  "count": "number (optional, default: 5)"
}`}</pre>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Response</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-800">{`{
  "success": true,
  "palette": [
    {
      "hex": "#3b82f6",
      "rgb": [59, 130, 246],
      "hsl": [217, 91, 60]
    }
  ],
  "type": "analogous"
}`}</pre>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Rate Limit: 200 requests/hour</span>
                  <span>•</span>
                  <span>Authentication: API Key required</span>
                </div>
              </div>
            </div>
          </div>

          {/* SDKs and Libraries */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">SDKs & Libraries</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="heading-4 mb-2">JavaScript SDK</h3>
                <p className="text-gray-600 mb-4">Official JavaScript library for Node.js and browsers</p>
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <code className="text-sm">npm install @toolixy/sdk</code>
                </div>
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                  View on GitHub →
                </a>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="heading-4 mb-2">Python SDK</h3>
                <p className="text-gray-600 mb-4">Python library for data scientists and developers</p>
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <code className="text-sm">pip install toolixy-sdk</code>
                </div>
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                  View on PyPI →
                </a>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="heading-4 mb-2">PHP SDK</h3>
                <p className="text-gray-600 mb-4">PHP library for web applications</p>
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <code className="text-sm">composer require toolixy/sdk</code>
                </div>
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                  View on Packagist →
                </a>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">Code Examples</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="heading-4 mb-4">JavaScript Example</h3>
                <div className="bg-gray-900 rounded-lg p-4 text-green-400 text-sm font-mono">
                  <pre>{`import { ToolixyClient } from '@toolixy/sdk';

const client = new ToolixyClient('your-api-key');

// Extract emails
const result = await client.extractEmails({
  url: 'https://example.com',
  options: { maxEmails: 50 }
});

console.log(result.emails);`}</pre>
                </div>
              </div>

              <div className="card">
                <h3 className="heading-4 mb-4">Python Example</h3>
                <div className="bg-gray-900 rounded-lg p-4 text-green-400 text-sm font-mono">
                  <pre>{`from toolixy import ToolixyClient

client = ToolixyClient('your-api-key')

# Generate color palette
palette = client.generate_palette(
    base_color='#3b82f6',
    palette_type='analogous'
)

print(palette.colors)`}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-12 text-white text-center">
            <h2 className="heading-2 mb-6 text-white">Ready to Get Started?</h2>
            <p className="body-large text-primary-100 mb-8 max-w-2xl mx-auto">
              Get your API key and start building amazing applications with our tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Get API Key</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="/tools/email-extractor" 
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Try Live Demo</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

