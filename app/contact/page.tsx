import type { Metadata } from 'next';
import { Mail, MessageSquare, Clock, MapPin, Phone } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch | toolixy',
  description: 'Get in touch with the toolixy team. We\'re here to help with your email extraction and color palette generation needs.',
  keywords: ['contact', 'support', 'help', 'email extractor', 'color palette generator'],
  openGraph: {
    title: 'Contact Us - Get in Touch | toolixy',
    description: 'Get in touch with the toolixy team. We\'re here to help with your email extraction and color palette generation needs.',
    images: ['/images/og-contact.jpg'],
  },
  twitter: {
    title: 'Contact Us - Get in Touch | toolixy',
    description: 'Get in touch with the toolixy team. We\'re here to help with your email extraction and color palette generation needs.',
    images: ['/images/twitter-contact.jpg'],
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us - Get in Touch"
        description="Get in touch with the toolixy team. We're here to help with your email extraction and color palette generation needs."
        keywords={['contact', 'support', 'help', 'email extractor', 'color palette generator']}
        url="/contact"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Breadcrumb className="mb-6" />
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-6">Get in Touch</h1>
            <p className="body-large text-gray-600 max-w-2xl mx-auto">
              Have questions about our tools? Need help with email extraction or color palette generation? 
              We're here to help! Reach out to us and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-3 mb-8">Contact Information</h2>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                      <p className="text-gray-600 mb-2">Send us an email and we'll respond within 24 hours</p>
                      <a 
                        href="mailto:contact.toolixy@gmail.com"
                        className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                      >
                        contact.toolixy@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
                      <p className="text-gray-600">We typically respond within 24 hours during business days</p>
                    </div>
                  </div>

                  {/* Support */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
                      <p className="text-gray-600">Technical support and general inquiries welcome</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="heading-4 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <a 
                    href="/tools/email-extractor" 
                    className="block text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    → Email Extractor Tool
                  </a>
                  <a 
                    href="/tools/color-palette" 
                    className="block text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    → Color Palette Generator
                  </a>
                  <a 
                    href="/blog" 
                    className="block text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    → Blog & Resources
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card">
              <h2 className="heading-3 mb-6">Send us a Message</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="input-field"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="input-field"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input-field"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="input-field"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="input-field resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-600">
                    I'd like to receive updates about new features and tools
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="heading-2 text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3">How accurate is the email extractor?</h3>
                <p className="text-gray-600">
                  Our email extractor uses advanced algorithms to find and verify email addresses with high accuracy. 
                  We filter out generic emails and focus on finding personal contact information.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3">Can I export color palettes?</h3>
                <p className="text-gray-600">
                  Yes! You can export your color palettes in multiple formats including CSS, SCSS, JSON, and TXT. 
                  Perfect for developers and designers.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3">Is there a usage limit?</h3>
                <p className="text-gray-600">
                  Our tools are designed to be accessible. While we have reasonable usage limits to ensure 
                  fair access for all users, most users find our limits more than sufficient.
                </p>
              </div>

              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3">Do you offer API access?</h3>
                <p className="text-gray-600">
                  We're working on API access for developers. Contact us if you're interested in early access 
                  or have specific integration needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

