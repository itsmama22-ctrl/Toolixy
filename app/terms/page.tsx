import type { Metadata } from 'next';
import { FileText, Scale, AlertCircle, Shield, User, Gavel } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Terms of Service - User Agreement & Legal Terms | toolixy',
  description: 'Read our terms of service and user agreement. Understand your rights and responsibilities when using toolixy email extraction and color palette generation tools.',
  keywords: ['terms of service', 'user agreement', 'legal terms', 'terms and conditions', 'user rights', 'service terms'],
  openGraph: {
    title: 'Terms of Service - User Agreement & Legal Terms | toolixy',
    description: 'Read our terms of service and user agreement. Understand your rights and responsibilities when using toolixy tools.',
    images: ['/images/og-terms.jpg'],
  },
  twitter: {
    title: 'Terms of Service - User Agreement & Legal Terms | toolixy',
    description: 'Read our terms of service and user agreement. Understand your rights and responsibilities when using toolixy tools.',
    images: ['/images/twitter-terms.jpg'],
  },
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service - User Agreement & Legal Terms"
        description="Read our terms of service and user agreement. Understand your rights and responsibilities when using toolixy email extraction and color palette generation tools."
        keywords={['terms of service', 'user agreement', 'legal terms', 'terms and conditions', 'user rights', 'service terms']}
        url="/terms"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Breadcrumb className="mb-6" />
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-6">Terms of Service</h1>
            <p className="body-large text-gray-600 max-w-3xl mx-auto">
              These terms govern your use of toolixy services. Please read them carefully 
              before using our email extraction and color palette generation tools.
            </p>
            <div className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>

          {/* Terms Overview */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="heading-4 mb-2">Clear Terms</h3>
                <p className="text-gray-600 text-sm">
                  Simple, understandable terms that protect both you and us.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Scale className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="heading-4 mb-2">Fair Usage</h3>
                <p className="text-gray-600 text-sm">
                  Reasonable usage limits to ensure fair access for all users.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="heading-4 mb-2">Your Rights</h3>
                <p className="text-gray-600 text-sm">
                  Clear explanation of your rights and our responsibilities.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="heading-2 mb-6">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing and using toolixy services, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="heading-2 mb-6">2. Description of Service</h2>
            <p className="text-gray-600 mb-6">
              toolixy provides online tools for email extraction and color palette generation. Our services include:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
              <li>Email extraction from websites and web pages</li>
              <li>Color palette generation and color scheme creation</li>
              <li>API access for developers and applications</li>
              <li>Documentation and support resources</li>
            </ul>

            <h2 className="heading-2 mb-6">3. User Responsibilities</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Important Notice</h4>
                  <p className="text-yellow-800 text-sm">
                    You are responsible for ensuring your use of our services complies with applicable laws 
                    and the terms of service of the websites you extract data from.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="heading-3 mb-4">3.1 Acceptable Use</h3>
            <p className="text-gray-600 mb-6">You agree to use our services only for lawful purposes and in accordance with these terms. You agree not to:</p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
              <li>Use our services for any illegal or unauthorized purpose</li>
              <li>Extract emails from websites that prohibit such activity</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Interfere with or disrupt our services or servers</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use our services to send spam or unsolicited communications</li>
            </ul>

            <h3 className="heading-3 mb-4">3.2 Data Accuracy</h3>
            <p className="text-gray-600 mb-6">
              While we strive for accuracy, we cannot guarantee that extracted email addresses are valid, 
              current, or deliverable. You are responsible for verifying the accuracy of any data you obtain.
            </p>

            <h2 className="heading-2 mb-6">4. Service Availability</h2>
            <p className="text-gray-600 mb-6">
              We strive to maintain high service availability, but we do not guarantee uninterrupted access. 
              We may temporarily suspend services for maintenance, updates, or other operational reasons.
            </p>

            <h2 className="heading-2 mb-6">5. Usage Limits</h2>
            <p className="text-gray-600 mb-6">
              We may impose usage limits to ensure fair access for all users. Current limits include:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
              <li>Free tier: 100 email extractions per hour</li>
              <li>Free tier: 200 color palette generations per hour</li>
              <li>Rate limits may vary based on your subscription level</li>
              <li>We reserve the right to modify limits with notice</li>
            </ul>

            <h2 className="heading-2 mb-6">6. Intellectual Property</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Gavel className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Ownership Rights</h4>
                  <p className="text-blue-800 text-sm">
                    The toolixy service and its original content, features, and functionality are owned by toolixy 
                    and are protected by international copyright, trademark, and other intellectual property laws.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="heading-3 mb-4">6.1 Your Content</h3>
            <p className="text-gray-600 mb-6">
              You retain ownership of any content you provide to our services. By using our services, 
              you grant us a limited license to process your content solely for the purpose of providing our services.
            </p>

            <h2 className="heading-2 mb-6">7. Privacy and Data Protection</h2>
            <p className="text-gray-600 mb-6">
              Your privacy is important to us. Our collection and use of personal information is governed by our 
              Privacy Policy, which is incorporated into these terms by reference.
            </p>

            <h2 className="heading-2 mb-6">8. Disclaimers and Limitations</h2>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-2">Service Disclaimer</h4>
                  <p className="text-red-800 text-sm">
                    Our services are provided "as is" without warranties of any kind. We disclaim all warranties, 
                    express or implied, including but not limited to warranties of merchantability and fitness for a particular purpose.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="heading-3 mb-4">8.1 Limitation of Liability</h3>
            <p className="text-gray-600 mb-6">
              In no event shall toolixy be liable for any indirect, incidental, special, consequential, or punitive damages, 
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>

            <h2 className="heading-2 mb-6">9. Indemnification</h2>
            <p className="text-gray-600 mb-6">
              You agree to defend, indemnify, and hold harmless toolixy from and against any claims, damages, obligations, 
              losses, liabilities, costs, or debt, and expenses (including attorney's fees) arising from your use of our services.
            </p>

            <h2 className="heading-2 mb-6">10. Termination</h2>
            <p className="text-gray-600 mb-6">
              We may terminate or suspend your access to our services immediately, without prior notice or liability, 
              for any reason whatsoever, including without limitation if you breach the terms.
            </p>

            <h2 className="heading-2 mb-6">11. Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to modify or replace these terms at any time. If a revision is material, 
              we will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>

            <h2 className="heading-2 mb-6">12. Governing Law</h2>
            <p className="text-gray-600 mb-6">
              These terms shall be interpreted and governed by the laws of the jurisdiction in which toolixy operates, 
              without regard to its conflict of law provisions.
            </p>

            <h2 className="heading-2 mb-6">13. Contact Information</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about these terms of service, please contact us:
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

