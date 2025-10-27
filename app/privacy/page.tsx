import type { Metadata } from 'next';
import { Shield, Eye, Lock, Database, UserCheck, AlertTriangle } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy - Data Protection & Privacy | toolixy',
  description: 'Learn how toolixy protects your privacy and handles your data. Our comprehensive privacy policy explains our data collection, usage, and protection practices.',
  keywords: ['privacy policy', 'data protection', 'privacy', 'GDPR', 'data security', 'user privacy'],
  openGraph: {
    title: 'Privacy Policy - Data Protection & Privacy | toolixy',
    description: 'Learn how toolixy protects your privacy and handles your data. Our comprehensive privacy policy explains our data collection, usage, and protection practices.',
    images: ['/images/og-privacy.jpg'],
  },
  twitter: {
    title: 'Privacy Policy - Data Protection & Privacy | toolixy',
    description: 'Learn how toolixy protects your privacy and handles your data. Our comprehensive privacy policy explains our data collection, usage, and protection practices.',
    images: ['/images/twitter-privacy.jpg'],
  },
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy - Data Protection & Privacy"
        description="Learn how toolixy protects your privacy and handles your data. Our comprehensive privacy policy explains our data collection, usage, and protection practices."
        keywords={['privacy policy', 'data protection', 'privacy', 'GDPR', 'data security', 'user privacy']}
        url="/privacy"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Breadcrumb className="mb-6" />
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-6">Privacy Policy</h1>
            <p className="body-large text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, 
              and protect your information when you use our services.
            </p>
            <div className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </div>

          {/* Privacy Overview */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="heading-4 mb-2">Data Protection</h3>
                <p className="text-gray-600 text-sm">
                  We use industry-standard encryption and security measures to protect your data.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="heading-4 mb-2">Transparency</h3>
                <p className="text-gray-600 text-sm">
                  We're transparent about what data we collect and how we use it.
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="heading-4 mb-2">Your Control</h3>
                <p className="text-gray-600 text-sm">
                  You have full control over your data and can request its deletion at any time.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Policy Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="heading-2 mb-6">Information We Collect</h2>
            
            <h3 className="heading-3 mb-4">Information You Provide</h3>
            <p className="text-gray-600 mb-6">
              When you use our services, we may collect information that you voluntarily provide to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
              <li>Email addresses when you contact us</li>
              <li>Website URLs when you use our email extraction tool</li>
              <li>Color preferences when you use our color palette generator</li>
              <li>Feedback and support requests</li>
            </ul>

            <h3 className="heading-3 mb-4">Information We Collect Automatically</h3>
            <p className="text-gray-600 mb-6">
              We automatically collect certain information when you visit our website:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
              <li>IP address and browser information</li>
              <li>Pages visited and time spent on our site</li>
              <li>Device information and operating system</li>
              <li>Referring website information</li>
            </ul>

            <h2 className="heading-2 mb-6">How We Use Your Information</h2>
            <p className="text-gray-600 mb-6">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
              <li>Provide and improve our services</li>
              <li>Process your requests and provide customer support</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Communicate with you about our services</li>
              <li>Ensure the security and integrity of our platform</li>
            </ul>

            <h2 className="heading-2 mb-6">Data Processing and Storage</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Database className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Processing Principles</h4>
                  <p className="text-blue-800 text-sm">
                    We process your data based on legitimate interests, consent, and contractual necessity. 
                    We only collect data that is necessary for providing our services.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="heading-3 mb-4">Data Retention</h3>
            <p className="text-gray-600 mb-6">
              We retain your information only as long as necessary to provide our services and fulfill the purposes outlined in this policy. 
              Email extraction results are not stored permanently and are processed in real-time.
            </p>

            <h2 className="heading-2 mb-6">Data Security</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-3">
                <Lock className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">Security Measures</h4>
                  <p className="text-green-800 text-sm">
                    We implement appropriate technical and organizational measures to protect your personal data against 
                    unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="heading-2 mb-6">Your Rights</h2>
            <p className="text-gray-600 mb-6">
              Under applicable data protection laws, you have the following rights:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-8 space-y-2">
              <li><strong>Access:</strong> Request access to your personal data</li>
              <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
              <li><strong>Erasure:</strong> Request deletion of your personal data</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Objection:</strong> Object to processing of your personal data</li>
              <li><strong>Restriction:</strong> Request restriction of processing</li>
            </ul>

            <h2 className="heading-2 mb-6">Cookies and Tracking</h2>
            <p className="text-gray-600 mb-6">
              We use cookies and similar technologies to enhance your experience on our website. 
              You can control cookie preferences through your browser settings.
            </p>

            <h2 className="heading-2 mb-6">Third-Party Services</h2>
            <p className="text-gray-600 mb-6">
              We may use third-party services for analytics, hosting, and other functions. 
              These services have their own privacy policies and data handling practices.
            </p>

            <h2 className="heading-2 mb-6">International Data Transfers</h2>
            <p className="text-gray-600 mb-6">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2 className="heading-2 mb-6">Children's Privacy</h2>
            <p className="text-gray-600 mb-6">
              Our services are not intended for children under 13 years of age. 
              We do not knowingly collect personal information from children under 13.
            </p>

            <h2 className="heading-2 mb-6">Changes to This Policy</h2>
            <p className="text-gray-600 mb-6">
              We may update this privacy policy from time to time. We will notify you of any changes 
              by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="heading-2 mb-6">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about this privacy policy or our data practices, please contact us:
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

