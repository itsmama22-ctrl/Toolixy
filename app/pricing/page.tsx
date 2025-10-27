import type { Metadata } from 'next';
import { Check, Star, Zap, Crown, ArrowRight, Users, Shield } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Pricing - Choose Your Plan | toolixy',
  description: 'Choose the perfect plan for your needs. Free tier available with premium options for power users. Transparent pricing with no hidden fees.',
  keywords: ['pricing', 'plans', 'subscription', 'free tier', 'premium', 'cost', 'pricing plans'],
  openGraph: {
    title: 'Pricing - Choose Your Plan | toolixy',
    description: 'Choose the perfect plan for your needs. Free tier available with premium options for power users.',
    images: ['/images/og-pricing.jpg'],
  },
  twitter: {
    title: 'Pricing - Choose Your Plan | toolixy',
    description: 'Choose the perfect plan for your needs. Free tier available with premium options for power users.',
    images: ['/images/twitter-pricing.jpg'],
  },
  alternates: {
    canonical: '/pricing',
  },
};

export default function PricingPage() {
  return (
    <>
      <SEO
        title="Pricing - Choose Your Plan"
        description="Choose the perfect plan for your needs. Free tier available with premium options for power users. Transparent pricing with no hidden fees."
        keywords={['pricing', 'plans', 'subscription', 'free tier', 'premium', 'cost', 'pricing plans']}
        url="/pricing"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Breadcrumb className="mb-6" />
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-6">Simple, Transparent Pricing</h1>
            <p className="body-large text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your needs. Start free and upgrade when you're ready. 
              No hidden fees, no surprises.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Free Plan */}
            <div className="card">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="heading-3 mb-2">Free</h3>
                <p className="text-gray-600 mb-4">Perfect for getting started</p>
                <div className="text-4xl font-bold text-gray-900 mb-2">$0</div>
                <p className="text-gray-500">forever</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">100 email extractions/hour</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">200 color palettes/hour</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Basic export formats</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Community support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Standard accuracy</span>
                </li>
              </ul>
              
              <button className="btn-secondary w-full">
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="card-elevated relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-primary-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>Most Popular</span>
                </span>
              </div>
              
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="heading-3 mb-2">Pro</h3>
                <p className="text-gray-600 mb-4">For growing businesses</p>
                <div className="text-4xl font-bold text-gray-900 mb-2">$29</div>
                <p className="text-gray-500">per month</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">1,000 email extractions/hour</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">2,000 color palettes/hour</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">All export formats</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Priority support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Advanced accuracy</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">API access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Bulk processing</span>
                </li>
              </ul>
              
              <button className="btn-primary w-full">
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="card">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="heading-3 mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-4">For large organizations</p>
                <div className="text-4xl font-bold text-gray-900 mb-2">Custom</div>
                <p className="text-gray-500">contact us</p>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Unlimited extractions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Unlimited palettes</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Custom integrations</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Dedicated support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">SLA guarantee</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">On-premise deployment</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Custom features</span>
                </li>
              </ul>
              
              <button className="btn-secondary w-full">
                Contact Sales
              </button>
            </div>
          </div>

          {/* Features Comparison */}
          <div className="mb-20">
            <h2 className="heading-2 text-center mb-12">Compare Features</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Free</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Pro</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-6 text-gray-600">Email Extractions per Hour</td>
                    <td className="text-center py-4 px-6">100</td>
                    <td className="text-center py-4 px-6">1,000</td>
                    <td className="text-center py-4 px-6">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-600">Color Palettes per Hour</td>
                    <td className="text-center py-4 px-6">200</td>
                    <td className="text-center py-4 px-6">2,000</td>
                    <td className="text-center py-4 px-6">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-600">API Access</td>
                    <td className="text-center py-4 px-6">❌</td>
                    <td className="text-center py-4 px-6">✅</td>
                    <td className="text-center py-4 px-6">✅</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-600">Priority Support</td>
                    <td className="text-center py-4 px-6">❌</td>
                    <td className="text-center py-4 px-6">✅</td>
                    <td className="text-center py-4 px-6">✅</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-600">Bulk Processing</td>
                    <td className="text-center py-4 px-6">❌</td>
                    <td className="text-center py-4 px-6">✅</td>
                    <td className="text-center py-4 px-6">✅</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 text-gray-600">Custom Integrations</td>
                    <td className="text-center py-4 px-6">❌</td>
                    <td className="text-center py-4 px-6">❌</td>
                    <td className="text-center py-4 px-6">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-20">
            <h2 className="heading-2 text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="card">
                <h3 className="heading-4 mb-3">Can I change plans anytime?</h3>
                <p className="text-gray-600">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                  and we'll prorate any billing differences.
                </p>
              </div>
              
              <div className="card">
                <h3 className="heading-4 mb-3">Is there a free trial for Pro?</h3>
                <p className="text-gray-600">
                  Yes! We offer a 14-day free trial for the Pro plan. No credit card required to start your trial.
                </p>
              </div>
              
              <div className="card">
                <h3 className="heading-4 mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and bank transfers for Enterprise plans. 
                  All payments are processed securely through Stripe.
                </p>
              </div>
              
              <div className="card">
                <h3 className="heading-4 mb-3">Can I cancel anytime?</h3>
                <p className="text-gray-600">
                  Absolutely! You can cancel your subscription at any time. Your account will remain active 
                  until the end of your current billing period.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-12 text-white text-center">
            <h2 className="heading-2 mb-6 text-white">Ready to Get Started?</h2>
            <p className="body-large text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust toolixy for their email extraction and color palette needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/tools/email-extractor" 
                className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Try Free Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Contact Sales</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

