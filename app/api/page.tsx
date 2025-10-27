import type { Metadata } from 'next';
import { Code, Zap, Shield, Key, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'API - Developer Tools & Integration | toolixy',
  description: 'Powerful APIs for email extraction and color palette generation. Integrate toolixy tools into your applications with our RESTful APIs.',
  keywords: ['API', 'developer tools', 'email extraction API', 'color palette API', 'integration', 'REST API'],
  openGraph: {
    title: 'API - Developer Tools & Integration | toolixy',
    description: 'Powerful APIs for email extraction and color palette generation. Integrate toolixy tools into your applications.',
    images: ['/images/og-api.jpg'],
  },
  twitter: {
    title: 'API - Developer Tools & Integration | toolixy',
    description: 'Powerful APIs for email extraction and color palette generation. Integrate toolixy tools into your applications.',
    images: ['/images/twitter-api.jpg'],
  },
  alternates: {
    canonical: '/api',
  },
};

export default function APIPage() {
  return (
    <>
      <SEO
        title="API - Developer Tools & Integration"
        description="Powerful APIs for email extraction and color palette generation. Integrate toolixy tools into your applications with our RESTful APIs."
        keywords={['API', 'developer tools', 'email extraction API', 'color palette API', 'integration', 'REST API']}
        url="/api"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Breadcrumb className="mb-6" />
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-6">toolixy API</h1>
            <p className="body-large text-gray-600 max-w-3xl mx-auto">
              Powerful REST APIs for email extraction and color palette generation. 
              Integrate our tools into your applications with simple HTTP requests.
            </p>
          </div>

          {/* API Overview */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">API Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="heading-4">Email Extraction API</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Extract email addresses from any website with high accuracy. 
                  Perfect for lead generation and contact discovery.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>High accuracy email detection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Duplicate removal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Generic email filtering</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="heading-4">Color Palette API</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Generate beautiful, harmonious color palettes programmatically. 
                  Create perfect color schemes for any design project.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Multiple palette types</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Color theory algorithms</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Multiple format outputs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Authentication */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">Authentication</h2>
            <div className="card">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Key className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="heading-4">API Key Authentication</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                All API requests require authentication using an API key. Include your API key in the request header:
              </p>
              
              <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <pre className="text-green-400 text-sm font-mono">
{`curl -X POST "https://api.toolixy.com/v1/extract-emails" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com"}'`}
                </pre>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Security Note</h4>
                    <p className="text-blue-800 text-sm">
                      Keep your API key secure and never expose it in client-side code. 
                      Use environment variables for production applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Endpoints */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">API Endpoints</h2>
            
            {/* Email Extraction Endpoint */}
            <div className="card mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">POST</span>
                <code className="text-lg font-mono">/v1/extract-emails</code>
              </div>
              
              <p className="text-gray-600 mb-4">Extract email addresses from a website URL.</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Request Body</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-800">{`{
  "url": "https://example.com",
  "options": {
    "maxEmails": 100,
    "includeGeneric": false
  }
}`}</pre>
                  </div>
                </div>
                
                <div>
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
              </div>
            </div>

            {/* Color Palette Endpoint */}
            <div className="card mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">POST</span>
                <code className="text-lg font-mono">/v1/generate-palette</code>
              </div>
              
              <p className="text-gray-600 mb-4">Generate a color palette from a base color.</p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Request Body</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-sm text-gray-800">{`{
  "baseColor": "#3b82f6",
  "paletteType": "analogous",
  "count": 5
}`}</pre>
                  </div>
                </div>
                
                <div>
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
              </div>
            </div>
          </div>

          {/* Rate Limits */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">Rate Limits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="heading-4 mb-2">Free Tier</h3>
                <div className="text-2xl font-bold text-gray-900 mb-2">100 requests/hour</div>
                <p className="text-gray-600 text-sm">Perfect for testing and small projects</p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="heading-4 mb-2">Pro Tier</h3>
                <div className="text-2xl font-bold text-gray-900 mb-2">1,000 requests/hour</div>
                <p className="text-gray-600 text-sm">Ideal for production applications</p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="heading-4 mb-2">Enterprise</h3>
                <div className="text-2xl font-bold text-gray-900 mb-2">Unlimited</div>
                <p className="text-gray-600 text-sm">Custom solutions for large teams</p>
              </div>
            </div>
          </div>

          {/* SDKs */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">Official SDKs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="heading-4 mb-2">JavaScript</h3>
                <p className="text-gray-600 text-sm mb-4">Node.js and browser support</p>
                <div className="bg-gray-50 rounded-lg p-2 mb-4">
                  <code className="text-xs">npm install @toolixy/sdk</code>
                </div>
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  View Docs →
                </a>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="heading-4 mb-2">Python</h3>
                <p className="text-gray-600 text-sm mb-4">Data science and automation</p>
                <div className="bg-gray-50 rounded-lg p-2 mb-4">
                  <code className="text-xs">pip install toolixy-sdk</code>
                </div>
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  View Docs →
                </a>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="heading-4 mb-2">PHP</h3>
                <p className="text-gray-600 text-sm mb-4">Web applications</p>
                <div className="bg-gray-50 rounded-lg p-2 mb-4">
                  <code className="text-xs">composer require toolixy/sdk</code>
                </div>
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  View Docs →
                </a>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="heading-4 mb-2">Ruby</h3>
                <p className="text-gray-600 text-sm mb-4">Ruby on Rails integration</p>
                <div className="bg-gray-50 rounded-lg p-2 mb-4">
                  <code className="text-xs">gem install toolixy-sdk</code>
                </div>
                <a href="#" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  View Docs →
                </a>
              </div>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-12 text-white text-center">
            <h2 className="heading-2 mb-6 text-white">Ready to Start Building?</h2>
            <p className="body-large text-primary-100 mb-8 max-w-2xl mx-auto">
              Get your API key and start integrating our powerful tools into your applications.
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
                href="/docs" 
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors flex items-center justify-center space-x-2"
              >
                <span>View Documentation</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

