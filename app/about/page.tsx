import type { Metadata } from 'next';
import { Users, Target, Award, Heart, Mail, MessageCircle } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'About Us - Learn About toolixy Team & Mission | toolixy',
  description: 'Learn about toolixy, our mission to provide powerful tools for marketers and designers. Meet our team and discover what drives us to create innovative solutions.',
  keywords: ['about us', 'team', 'mission', 'company', 'toolixy team', 'our story'],
  openGraph: {
    title: 'About Us - Learn About toolixy Team & Mission',
    description: 'Learn about toolixy, our mission to provide powerful tools for marketers and designers.',
    images: ['/images/og-about.jpg'],
  },
  twitter: {
    title: 'About Us - Learn About toolixy Team & Mission',
    description: 'Learn about toolixy, our mission to provide powerful tools for marketers and designers.',
    images: ['/images/twitter-about.jpg'],
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us - Learn About toolixy Team & Mission"
        description="Learn about toolixy, our mission to provide powerful tools for marketers and designers. Meet our team and discover what drives us to create innovative solutions."
        keywords={['about us', 'team', 'mission', 'company', 'toolixy team', 'our story']}
        url="/about"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Breadcrumb className="mb-6" />
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-6">About toolixy</h1>
            <p className="body-large text-gray-600 max-w-3xl mx-auto">
              We're passionate about creating powerful, easy-to-use tools that help marketers, 
              designers, and entrepreneurs work more efficiently and achieve their goals.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-2 mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  At toolixy, we believe that powerful tools should be accessible to everyone. 
                  Our mission is to democratize access to professional-grade marketing and design tools, 
                  enabling small businesses and individuals to compete on a level playing field.
                </p>
                <p className="text-gray-600 mb-6">
                  We're committed to creating intuitive, reliable, and affordable solutions that 
                  save time, reduce complexity, and deliver real results for our users.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Focused on Results</h3>
                    <p className="text-sm text-gray-600">Every tool we build is designed to deliver measurable value</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
                    <div className="text-sm text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">1M+</div>
                    <div className="text-sm text-gray-600">Emails Extracted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
                    <div className="text-sm text-gray-600">Color Palettes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="heading-2 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="heading-4 mb-3">User-Centric</h3>
                <p className="text-gray-600">
                  Every decision we make is guided by what's best for our users. 
                  We listen, learn, and iterate based on your feedback.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="heading-4 mb-3">Quality First</h3>
                <p className="text-gray-600">
                  We're committed to delivering high-quality, reliable tools that 
                  you can depend on for your important work.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="heading-4 mb-3">Passion-Driven</h3>
                <p className="text-gray-600">
                  We love what we do and it shows in every feature we build 
                  and every interaction we have with our users.
                </p>
              </div>
            </div>
          </div>

          {/* Story Section */}
          <div className="mb-20">
            <h2 className="heading-2 text-center mb-12">Our Story</h2>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-6">
                  toolixy was born from a simple observation: while working on various marketing and design projects, 
                  we found ourselves constantly searching for reliable, affordable tools to extract contact information 
                  and create beautiful color palettes.
                </p>
                <p className="text-gray-600 mb-6">
                  Existing solutions were either too expensive, too complex, or simply didn't work as advertised. 
                  We knew there had to be a better way – tools that were powerful yet simple, professional yet accessible.
                </p>
                <p className="text-gray-600 mb-6">
                  So we built them ourselves. Starting with our email extraction tool, we focused on accuracy, 
                  speed, and ease of use. Then came our color palette generator, designed to help designers 
                  create harmonious color schemes quickly and efficiently.
                </p>
                <p className="text-gray-600 mb-6">
                  Today, toolixy serves thousands of users worldwide, from solo entrepreneurs to large marketing teams. 
                  We're constantly improving our tools and adding new features based on user feedback, 
                  always staying true to our mission of making powerful tools accessible to everyone.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="heading-2 text-center mb-12">Meet Our Team</h2>
            <div className="max-w-4xl mx-auto">
              <div className="card text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">T</span>
                </div>
                <h3 className="heading-3 mb-2">The toolixy Team</h3>
                <p className="text-primary-600 font-medium mb-4">Passionate Developers & Designers</p>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We're a small but dedicated team of developers, designers, and marketers who believe 
                  in the power of great tools. We work remotely across different time zones, 
                  united by our shared passion for creating solutions that make work easier and more enjoyable.
                </p>
                <div className="mt-6 flex justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">5+</div>
                    <div className="text-sm text-gray-600">Team Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">3+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-12 text-white text-center">
            <h2 className="heading-2 mb-6 text-white">Get in Touch</h2>
            <p className="body-large text-primary-100 mb-8 max-w-2xl mx-auto">
              Have questions about our tools? Want to share feedback? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact Us</span>
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