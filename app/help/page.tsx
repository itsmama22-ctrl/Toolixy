import type { Metadata } from 'next';
import { HelpCircle, Search, MessageCircle, BookOpen, Mail, ChevronRight } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Help Center - Support & FAQ | toolixy',
  description: 'Get help with toolixy tools. Find answers to common questions, tutorials, and support resources for email extraction and color palette generation.',
  keywords: ['help', 'support', 'FAQ', 'tutorials', 'email extractor help', 'color palette help'],
  openGraph: {
    title: 'Help Center - Support & FAQ | toolixy',
    description: 'Get help with toolixy tools. Find answers to common questions, tutorials, and support resources.',
    images: ['/images/og-help.jpg'],
  },
  twitter: {
    title: 'Help Center - Support & FAQ | toolixy',
    description: 'Get help with toolixy tools. Find answers to common questions, tutorials, and support resources.',
    images: ['/images/twitter-help.jpg'],
  },
  alternates: {
    canonical: '/help',
  },
};

export default function HelpPage() {
  return (
    <>
      <SEO
        title="Help Center - Support & FAQ"
        description="Get help with toolixy tools. Find answers to common questions, tutorials, and support resources for email extraction and color palette generation."
        keywords={['help', 'support', 'FAQ', 'tutorials', 'email extractor help', 'color palette help']}
        url="/help"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Breadcrumb className="mb-6" />
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-6">Help Center</h1>
            <p className="body-large text-gray-600 max-w-3xl mx-auto">
              Find answers to your questions, learn how to use our tools effectively, 
              and get the support you need to succeed.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles, tutorials, and FAQs..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
              />
            </div>
          </div>

          {/* Quick Help Categories */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">Quick Help</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <a href="#getting-started" className="card hover:shadow-lg transition-shadow group">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="heading-4">Getting Started</h3>
                </div>
                <p className="text-gray-600 mb-4">Learn the basics of using our tools</p>
                <div className="flex items-center text-primary-600 group-hover:text-primary-700">
                  <span className="text-sm font-medium">View Guide</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </a>

              <a href="#email-extractor" className="card hover:shadow-lg transition-shadow group">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="heading-4">Email Extractor</h3>
                </div>
                <p className="text-gray-600 mb-4">Troubleshooting and tips for email extraction</p>
                <div className="flex items-center text-primary-600 group-hover:text-primary-700">
                  <span className="text-sm font-medium">View Guide</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </a>

              <a href="#color-palette" className="card hover:shadow-lg transition-shadow group">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="heading-4">Color Palette</h3>
                </div>
                <p className="text-gray-600 mb-4">Creating and exporting color palettes</p>
                <div className="flex items-center text-primary-600 group-hover:text-primary-700">
                  <span className="text-sm font-medium">View Guide</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </a>

              <a href="#api-integration" className="card hover:shadow-lg transition-shadow group">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="heading-4">API Integration</h3>
                </div>
                <p className="text-gray-600 mb-4">Integrating our APIs into your applications</p>
                <div className="flex items-center text-primary-600 group-hover:text-primary-700">
                  <span className="text-sm font-medium">View Guide</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="card">
                <h3 className="heading-4 mb-3">How accurate is the email extractor?</h3>
                <p className="text-gray-600">
                  Our email extractor uses advanced algorithms to achieve high accuracy in email detection. 
                  We filter out generic emails (like info@, support@) and focus on finding personal contact information. 
                  The accuracy rate is typically 95%+ for well-structured websites.
                </p>
              </div>

              <div className="card">
                <h3 className="heading-4 mb-3">Can I export color palettes in different formats?</h3>
                <p className="text-gray-600">
                  Yes! You can export your color palettes in multiple formats including CSS, SCSS, JSON, and TXT. 
                  This makes it easy to integrate the colors into your design workflow, whether you're using CSS, 
                  design tools, or development frameworks.
                </p>
              </div>

              <div className="card">
                <h3 className="heading-4 mb-3">Is there a limit on how many emails I can extract?</h3>
                <p className="text-gray-600">
                  Our free tier allows up to 100 emails per extraction, which is perfect for most use cases. 
                  For higher limits and advanced features, we offer Pro and Enterprise plans. 
                  Contact us to discuss your specific needs.
                </p>
              </div>

              <div className="card">
                <h3 className="heading-4 mb-3">How do I integrate the API into my application?</h3>
                <p className="text-gray-600">
                  We provide official SDKs for JavaScript, Python, PHP, and Ruby. You can also use our REST API 
                  directly with any programming language. Check our documentation for code examples and 
                  integration guides for your preferred platform.
                </p>
              </div>

              <div className="card">
                <h3 className="heading-4 mb-3">What types of color palettes can I generate?</h3>
                <p className="text-gray-600">
                  You can generate various types of color palettes including analogous, complementary, triadic, 
                  and monochromatic schemes. Our algorithms are based on color theory principles to ensure 
                  harmonious and visually appealing color combinations.
                </p>
              </div>

              <div className="card">
                <h3 className="heading-4 mb-3">Is my data secure when using your tools?</h3>
                <p className="text-gray-600">
                  Absolutely. We prioritize your privacy and security. All data processing happens securely, 
                  and we don't store your extraction results or uploaded images. Your API keys are encrypted 
                  and protected with industry-standard security measures.
                </p>
              </div>
            </div>
          </div>

          {/* Tutorials */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">Popular Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="#" className="card hover:shadow-lg transition-shadow group">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <h3 className="heading-4">Getting Started with Email Extraction</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Learn how to extract emails from websites step by step, including best practices and tips for better results.
                </p>
                <div className="flex items-center text-primary-600 group-hover:text-primary-700">
                  <span className="text-sm font-medium">Read Tutorial</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </a>

              <a href="#" className="card hover:shadow-lg transition-shadow group">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">2</span>
                  </div>
                  <h3 className="heading-4">Creating Perfect Color Palettes</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Master the art of color palette creation with our comprehensive guide to color theory and design principles.
                </p>
                <div className="flex items-center text-primary-600 group-hover:text-primary-700">
                  <span className="text-sm font-medium">Read Tutorial</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </a>

              <a href="#" className="card hover:shadow-lg transition-shadow group">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">3</span>
                  </div>
                  <h3 className="heading-4">API Integration Guide</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Step-by-step guide to integrating our APIs into your applications with code examples and best practices.
                </p>
                <div className="flex items-center text-primary-600 group-hover:text-primary-700">
                  <span className="text-sm font-medium">Read Tutorial</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </a>
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-12 text-white text-center">
            <h2 className="heading-2 mb-6 text-white">Still Need Help?</h2>
            <p className="body-large text-primary-100 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Support</span>
              </a>
              <a 
                href="mailto:contact.toolixy@gmail.com" 
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Email</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

