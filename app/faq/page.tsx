import type { Metadata } from 'next';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | toolixy',
  description: 'Find answers to common questions about toolixy email extraction and color palette generation tools. Get help with usage, pricing, and technical questions.',
  keywords: ['FAQ', 'frequently asked questions', 'help', 'questions', 'answers', 'support'],
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | toolixy',
    description: 'Find answers to common questions about toolixy email extraction and color palette generation tools.',
    images: ['/images/og-faq.jpg'],
  },
  twitter: {
    title: 'FAQ - Frequently Asked Questions | toolixy',
    description: 'Find answers to common questions about toolixy email extraction and color palette generation tools.',
    images: ['/images/twitter-faq.jpg'],
  },
  alternates: {
    canonical: '/faq',
  },
};

export default function FAQPage() {
  return (
    <>
      <SEO
        title="FAQ - Frequently Asked Questions"
        description="Find answers to common questions about toolixy email extraction and color palette generation tools. Get help with usage, pricing, and technical questions."
        keywords={['FAQ', 'frequently asked questions', 'help', 'questions', 'answers', 'support']}
        url="/faq"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Breadcrumb className="mb-6" />
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-6">Frequently Asked Questions</h1>
            <p className="body-large text-gray-600 max-w-3xl mx-auto">
              Find answers to the most common questions about our email extraction and color palette generation tools.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for specific questions..."
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="mb-16">
            <h2 className="heading-2 mb-8">Email Extractor Questions</h2>
            <div className="space-y-4">
              <div className="card">
                <button className="w-full text-left flex items-center justify-between p-6">
                  <h3 className="heading-4">How accurate is the email extractor?</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">
                    Our email extractor achieves 95%+ accuracy on well-structured websites. We use advanced algorithms 
                    to identify and filter email addresses, removing generic emails like info@, support@, and noreply@ 
                    to focus on finding personal contact information. The accuracy may vary depending on the website's 
                    structure and how emails are displayed.
                  </p>
                </div>
              </div>

              <div className="card">
                <button className="w-full text-left flex items-center justify-between p-6">
                  <h3 className="heading-4">What types of websites can I extract emails from?</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">
                    You can extract emails from most publicly accessible websites, including business directories, 
                    company websites, blog posts, and contact pages. However, we respect robots.txt files and 
                    website terms of service. We cannot extract emails from password-protected areas or 
                    websites that explicitly prohibit scraping.
                  </p>
                </div>
              </div>

              <div className="card">
                <button className="w-full text-left flex items-center justify-between p-6">
                  <h3 className="heading-4">Is it legal to extract emails from websites?</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">
                    Email extraction is generally legal when done from publicly available information and in compliance 
                    with applicable laws like GDPR and CAN-SPAM. However, you should always check the website's terms 
                    of service and ensure you have permission to collect and use the email addresses. We recommend 
                    using extracted emails responsibly and in accordance with anti-spam regulations.
                  </p>
                </div>
              </div>

              <div className="card">
                <button className="w-full text-left flex items-center justify-between p-6">
                  <h3 className="heading-4">How many emails can I extract per hour?</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">
                    The number of emails you can extract depends on your plan:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>Free plan: 100 extractions per hour</li>
                    <li>Pro plan: 1,000 extractions per hour</li>
                    <li>Enterprise plan: Unlimited extractions</li>
                  </ul>
                  <p className="text-gray-600 mt-2">
                    These limits help ensure fair usage and maintain service quality for all users.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Color Palette Questions */}
          <div className="mb-16">
            <h2 className="heading-2 mb-8">Color Palette Generator Questions</h2>
            <div className="space-y-4">
              <div className="card">
                <button className="w-full text-left flex items-center justify-between p-6">
                  <h3 className="heading-4">What types of color palettes can I generate?</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">
                    Our color palette generator can create various types of harmonious color schemes:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>Analogous: Colors next to each other on the color wheel</li>
                    <li>Complementary: Colors opposite each other on the color wheel</li>
                    <li>Triadic: Three colors evenly spaced around the color wheel</li>
                    <li>Monochromatic: Different shades and tints of a single color</li>
                    <li>Split-complementary: A base color and two colors adjacent to its complement</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <button className="w-full text-left flex items-center justify-between p-6">
                  <h3 className="heading-4">Can I extract colors from images?</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">
                    Yes! You can upload images (JPG, PNG, GIF, WEBP) and our tool will automatically extract 
                    the dominant colors to create a palette. We analyze the image pixels to identify the most 
                    prominent colors and filter out very similar shades to give you a diverse, usable palette.
                  </p>
                </div>
              </div>

              <div className="card">
                <button className="w-full text-left flex items-center justify-between p-6">
                  <h3 className="heading-4">What export formats are available?</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">
                    You can export your color palettes in multiple formats:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>CSS: Ready-to-use CSS custom properties</li>
                    <li>SCSS: Sass variables for SCSS projects</li>
                    <li>JSON: Structured data for APIs and applications</li>
                    <li>TXT: Plain text format for easy copying</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <button className="w-full text-left flex items-center justify-between p-6">
                  <h3 className="heading-4">How do I choose the right color palette for my project?</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">
                    Consider these factors when choosing a color palette:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>Brand identity: Choose colors that reflect your brand personality</li>
                    <li>Target audience: Consider what colors appeal to your demographic</li>
                    <li>Accessibility: Ensure sufficient contrast for readability</li>
                    <li>Project type: Different projects may require different color schemes</li>
                    <li>Emotional impact: Colors evoke different emotions and moods</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* General Questions */}
          <div className="mb-16">
            <h2 className="heading-2 mb-8">General Questions</h2>
            <div className="space-y-4">
              <div className="card">
                <button className="w-full text-left flex items-center justify-between p-6">
                  <h3 className="heading-4">Is there a free plan available?</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">
                    Yes! We offer a free plan that includes:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>100 email extractions per hour</li>
                    <li>200 color palette generations per hour</li>
                    <li>Basic export formats</li>
                    <li>Community support</li>
                  </ul>
                  <p className="text-gray-600 mt-2">
                    This is perfect for trying out our tools and for small projects.
                  </p>
                </div>
              </div>

              <div className="card">
                <button className="w-full text-left flex items-center justify-between p-6">
                  <h3 className="heading-4">How do I upgrade my plan?</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">
                    You can upgrade your plan anytime from your dashboard or by visiting our pricing page. 
                    Changes take effect immediately, and we'll prorate any billing differences. 
                    You can also contact our support team for assistance with upgrades.
                  </p>
                </div>
              </div>

              <div className="card">
                <button className="w-full text-left flex items-center justify-between p-6">
                  <h3 className="heading-4">Is my data secure and private?</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">
                    Absolutely. We take your privacy and data security seriously:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>All data is encrypted in transit and at rest</li>
                    <li>We don't store your extraction results permanently</li>
                    <li>We comply with GDPR and other privacy regulations</li>
                    <li>Your API keys are encrypted and protected</li>
                    <li>We never sell or share your personal data</li>
                  </ul>
                </div>
              </div>

              <div className="card">
                <button className="w-full text-left flex items-center justify-between p-6">
                  <h3 className="heading-4">Do you offer API access?</h3>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                <div className="px-6 pb-6">
                  <p className="text-gray-600">
                    Yes! API access is available with our Pro and Enterprise plans. Our REST API allows you to:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                    <li>Integrate our tools into your applications</li>
                    <li>Automate email extraction workflows</li>
                    <li>Generate color palettes programmatically</li>
                    <li>Access all features via HTTP requests</li>
                  </ul>
                  <p className="text-gray-600 mt-2">
                    Check our documentation for detailed API guides and examples.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-12 text-white text-center">
            <h2 className="heading-2 mb-6 text-white">Still Have Questions?</h2>
            <p className="body-large text-primary-100 mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Contact Support</span>
              </a>
              <a 
                href="mailto:contact.toolixy@gmail.com" 
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Send Email</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

