import type { Metadata } from 'next';
import { HelpCircle, MessageCircle, Mail, Phone, Clock, Search, ChevronRight } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Support - Get Help & Contact Us | toolixy',
  description: 'Get help with toolixy tools. Contact our support team, browse FAQs, or find answers to common questions about email extraction and color palette generation.',
  keywords: ['support', 'help', 'contact', 'customer service', 'FAQ', 'troubleshooting'],
  openGraph: {
    title: 'Support - Get Help & Contact Us | toolixy',
    description: 'Get help with toolixy tools. Contact our support team or browse FAQs.',
    images: ['/images/og-support.jpg'],
  },
  twitter: {
    title: 'Support - Get Help & Contact Us | toolixy',
    description: 'Get help with toolixy tools. Contact our support team or browse FAQs.',
    images: ['/images/twitter-support.jpg'],
  },
  alternates: {
    canonical: '/support',
  },
};

export default function SupportPage() {
  return (
    <>
      <SEO
        title="Support - Get Help & Contact Us"
        description="Get help with toolixy tools. Contact our support team, browse FAQs, or find answers to common questions about email extraction and color palette generation."
        keywords={['support', 'help', 'contact', 'customer service', 'FAQ', 'troubleshooting']}
        url="/support"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Breadcrumb className="mb-6" />
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-6">How Can We Help?</h1>
            <p className="body-large text-gray-600 max-w-3xl mx-auto">
              We're here to help you get the most out of toolixy. Find answers to common questions, 
              contact our support team, or explore our resources.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles, FAQs, and guides..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
              />
            </div>
          </div>

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <a href="/help" className="card hover:shadow-lg transition-shadow group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="heading-4">Help Center</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Browse our comprehensive help articles, tutorials, and frequently asked questions.
              </p>
              <div className="flex items-center text-primary-600 group-hover:text-primary-700">
                <span className="text-sm font-medium">Visit Help Center</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </a>

            <a href="/contact" className="card hover:shadow-lg transition-shadow group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="heading-4">Contact Us</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Get in touch with our support team for personalized assistance with your questions.
              </p>
              <div className="flex items-center text-primary-600 group-hover:text-primary-700">
                <span className="text-sm font-medium">Contact Support</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </a>

            <a href="/docs" className="card hover:shadow-lg transition-shadow group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="heading-4">Documentation</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Technical documentation and API guides for developers and power users.
              </p>
              <div className="flex items-center text-primary-600 group-hover:text-primary-700">
                <span className="text-sm font-medium">View Docs</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </a>
          </div>

          {/* Contact Information */}
          <div className="mb-16">
            <h2 className="heading-2 text-center mb-12">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="heading-4 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">
                  Send us an email and we'll get back to you within 24 hours.
                </p>
                <a 
                  href="mailto:contact.toolixy@gmail.com"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  contact.toolixy@gmail.com
                </a>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="heading-4 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">
                  Chat with our support team in real-time during business hours.
                </p>
                <button className="text-primary-600 hover:text-primary-700 font-medium">
                  Start Chat
                </button>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="heading-4 mb-2">Response Time</h3>
                <p className="text-gray-600 mb-4">
                  We typically respond to support requests within a few hours.
                </p>
                <div className="text-sm text-gray-500">
                  <p>Mon-Fri: 9AM-6PM EST</p>
                  <p>Weekend: 10AM-4PM EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="heading-2 text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="card">
                <h3 className="heading-4 mb-3">How accurate is the email extractor?</h3>
                <p className="text-gray-600">
                  Our email extractor achieves 95%+ accuracy on well-structured websites. We use advanced algorithms 
                  to filter out generic emails and focus on finding personal contact information.
                </p>
              </div>

              <div className="card">
                <h3 className="heading-4 mb-3">Can I use the API for commercial purposes?</h3>
                <p className="text-gray-600">
                  Yes! Our Pro and Enterprise plans include commercial usage rights. Please review our Terms of Service 
                  for specific usage guidelines and limitations.
                </p>
              </div>

              <div className="card">
                <h3 className="heading-4 mb-3">What file formats can I export to?</h3>
                <p className="text-gray-600">
                  You can export your data in multiple formats including CSV, TXT, JSON, CSS, and SCSS. 
                  This makes it easy to integrate with your existing workflow.
                </p>
              </div>

              <div className="card">
                <h3 className="heading-4 mb-3">Is my data secure?</h3>
                <p className="text-gray-600">
                  Absolutely. We use industry-standard encryption and security measures. We don't store your 
                  extraction results permanently, and all data processing happens securely.
                </p>
              </div>

              <div className="card">
                <h3 className="heading-4 mb-3">How do I upgrade my plan?</h3>
                <p className="text-gray-600">
                  You can upgrade your plan anytime from your dashboard or by contacting our support team. 
                  Changes take effect immediately, and we'll prorate any billing differences.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
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
                <MessageCircle className="w-4 h-4" />
                <span>Contact Support</span>
              </a>
              <a 
                href="mailto:contact.toolixy@gmail.com" 
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Send Email</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

