import type { Metadata } from 'next';
import { Cookie, Settings, Shield, Eye, Database, AlertCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Cookie Policy - Cookie Usage & Management | toolixy',
  description: 'Learn about how toolixy uses cookies and similar technologies. Understand what cookies we use, why we use them, and how you can manage your cookie preferences.',
  keywords: ['cookie policy', 'cookies', 'tracking', 'privacy', 'data collection', 'web analytics'],
  openGraph: {
    title: 'Cookie Policy - Cookie Usage & Management | toolixy',
    description: 'Learn about how toolixy uses cookies and similar technologies. Understand what cookies we use and how you can manage them.',
    images: ['/images/og-cookies.jpg'],
  },
  twitter: {
    title: 'Cookie Policy - Cookie Usage & Management | toolixy',
    description: 'Learn about how toolixy uses cookies and similar technologies. Understand what cookies we use and how you can manage them.',
    images: ['/images/twitter-cookies.jpg'],
  },
  alternates: {
    canonical: '/cookies',
  },
};

export default function CookiesPage() {
  return (
    <>
      <SEO
        title="Cookie Policy - Cookie Usage & Management"
        description="Learn about how toolixy uses cookies and similar technologies. Understand what cookies we use, why we use them, and how you can manage your cookie preferences."
        keywords={['cookie policy', 'cookies', 'tracking', 'privacy', 'data collection', 'web analytics']}
        url="/cookies"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Breadcrumb className="mb-6" />
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-6">Cookie Policy</h1>
            <p className="body-large text-gray-600 max-w-3xl mx-auto">
              This policy explains how toolixy uses cookies and similar technologies to enhance your experience 
              and provide our services effectively.
            </p>
            <div className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>

          {/* Cookie Overview */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Cookie className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="heading-4 mb-2">Essential Cookies</h3>
                <p className="text-gray-600 text-sm">
                  Required for basic website functionality and security.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="heading-4 mb-2">Functional Cookies</h3>
                <p className="text-gray-600 text-sm">
                  Remember your preferences and improve your experience.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="heading-4 mb-2">Analytics Cookies</h3>
                <p className="text-gray-600 text-sm">
                  Help us understand how you use our website.
                </p>
              </div>
            </div>
          </div>

          {/* Cookie Policy Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="heading-2 mb-6">What Are Cookies?</h2>
            <p className="text-gray-600 mb-6">
              Cookies are small text files that are stored on your device when you visit a website. 
              They help websites remember information about your visit, which can make it easier to visit the site again 
              and make the site more useful to you.
            </p>

            <h2 className="heading-2 mb-6">How We Use Cookies</h2>
            <p className="text-gray-600 mb-6">
              toolixy uses cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
              <li>Ensure our website functions properly</li>
              <li>Remember your preferences and settings</li>
              <li>Analyze how our website is used</li>
              <li>Improve our services and user experience</li>
              <li>Provide personalized content and features</li>
            </ul>

            <h2 className="heading-2 mb-6">Types of Cookies We Use</h2>

            <h3 className="heading-3 mb-4">Essential Cookies</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">Always Active</h4>
                  <p className="text-green-800 text-sm">
                    These cookies are necessary for the website to function and cannot be switched off. 
                    They are usually only set in response to actions made by you which amount to a request for services.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Essential cookies include:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
              <li>Session cookies for maintaining your session</li>
              <li>Security cookies for protecting against CSRF attacks</li>
              <li>Load balancing cookies for distributing traffic</li>
              <li>Authentication cookies for logged-in users</li>
            </ul>

            <h3 className="heading-3 mb-4">Functional Cookies</h3>
            <p className="text-gray-600 mb-6">
              These cookies enable the website to provide enhanced functionality and personalization. 
              They may be set by us or by third party providers whose services we have added to our pages.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
              <li>Language preference cookies</li>
              <li>Theme and display preference cookies</li>
              <li>Tool settings and configuration cookies</li>
              <li>User interface customization cookies</li>
            </ul>

            <h3 className="heading-3 mb-4">Analytics Cookies</h3>
            <p className="text-gray-600 mb-6">
              These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. 
              They help us to know which pages are the most and least popular and see how visitors move around the site.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
              <li>Google Analytics cookies for website analytics</li>
              <li>Performance monitoring cookies</li>
              <li>User behavior tracking cookies</li>
              <li>Error reporting and debugging cookies</li>
            </ul>

            <h2 className="heading-2 mb-6">Third-Party Cookies</h2>
            <p className="text-gray-600 mb-6">
              Some cookies on our site are set by third-party services. These may include:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
              <li>Google Analytics for website analytics</li>
              <li>Vercel for hosting and performance monitoring</li>
              <li>Social media platforms for sharing features</li>
              <li>CDN providers for content delivery</li>
            </ul>

            <h2 className="heading-2 mb-6">Managing Your Cookie Preferences</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Settings className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Cookie Control</h4>
                  <p className="text-blue-800 text-sm">
                    You can control and manage cookies in various ways. Please note that removing or blocking cookies 
                    can impact your user experience and parts of our website may no longer be fully accessible.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="heading-3 mb-4">Browser Settings</h3>
            <p className="text-gray-600 mb-6">
              Most web browsers allow you to control cookies through their settings preferences. You can:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
              <li>Block all cookies</li>
              <li>Block third-party cookies only</li>
              <li>Delete cookies when you close your browser</li>
              <li>View and delete individual cookies</li>
              <li>Set up notifications when cookies are set</li>
            </ul>

            <h3 className="heading-3 mb-4">Opt-Out Links</h3>
            <p className="text-gray-600 mb-6">
              For specific third-party services, you can opt out directly:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
              <li><a href="https://tools.google.com/dlpage/gaoptout" className="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
              <li><a href="https://www.google.com/settings/ads" className="text-primary-600 hover:text-primary-700" target="_blank" rel="noopener noreferrer">Google Ad Settings</a></li>
              <li>Check individual service privacy policies for more opt-out options</li>
            </ul>

            <h2 className="heading-2 mb-6">Cookie Retention</h2>
            <p className="text-gray-600 mb-6">
              Different cookies have different retention periods:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
              <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent cookies:</strong> Remain on your device for a set period (typically 30 days to 2 years)</li>
              <li><strong>Essential cookies:</strong> Usually expire after 1 year or when you clear your browser data</li>
              <li><strong>Analytics cookies:</strong> Typically expire after 2 years</li>
            </ul>

            <h2 className="heading-2 mb-6">Updates to This Policy</h2>
            <p className="text-gray-600 mb-6">
              We may update this cookie policy from time to time to reflect changes in our practices or for other operational, 
              legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
            </p>

            <h2 className="heading-2 mb-6">Your Rights</h2>
            <p className="text-gray-600 mb-6">
              Under applicable data protection laws, you have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
              <li>Access information about cookies we use</li>
              <li>Withdraw consent for non-essential cookies</li>
              <li>Request deletion of cookie data</li>
              <li>Object to processing of cookie data</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>

            <h2 className="heading-2 mb-6">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about our use of cookies or this cookie policy, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-800 mb-2">
                <strong>Email:</strong> <a href="mailto:contact.toolixy@gmail.com" className="text-primary-600 hover:text-primary-700">contact.toolixy@gmail.com</a>
              </p>
              <p className="text-gray-800">
                <strong>Website:</strong> <a href="https://toolixy.vercel.app" className="text-primary-600 hover:text-primary-700">https://toolixy.vercel.app</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

