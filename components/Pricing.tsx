import React from 'react';
import Link from 'next/link';
import { Check, Star, Zap, Crown } from 'lucide-react';

const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    description: 'Perfect for individuals and small projects',
    features: [
      '5 email extractions per day',
      '3 color palette generations per day',
      'Basic export formats (CSV, TXT)',
      'Community support',
      'Basic color variations',
      'Standard processing speed',
    ],
    limitations: [
      'Limited daily usage',
      'No saved history',
      'No priority support',
      'No API access',
    ],
    ctaText: 'Get Started Free',
    ctaUrl: '/register',
    popular: false,
    icon: Zap,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    interval: 'month',
    description: 'Ideal for professionals and growing businesses',
    features: [
      'Unlimited email extractions',
      'Unlimited color palette generations',
      'All export formats (CSV, JSON, CSS, SCSS)',
      'Priority support',
      'Advanced color variations',
      'Fast processing speed',
      'Saved extraction history',
      'Saved palette library',
      'Bulk processing',
      'API access',
      'Custom integrations',
      'Advanced analytics',
    ],
    limitations: [],
    ctaText: 'Start Pro Trial',
    ctaUrl: '/register?plan=pro',
    popular: true,
    icon: Crown,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    interval: 'month',
    description: 'For large teams and organizations',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'White-label options',
      'Custom branding',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom integrations',
      'Advanced security',
      'Compliance reporting',
      'Training and onboarding',
      'Custom usage limits',
      '24/7 phone support',
    ],
    limitations: [],
    ctaText: 'Contact Sales',
    ctaUrl: '/contact?plan=enterprise',
    popular: false,
    icon: Star,
  },
];

export default function Pricing() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Start free and upgrade anytime. 
            No hidden fees, no long-term contracts.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`card-hover relative ${
                plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mb-4">
                  <plan.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                  <span className="text-gray-600">/{plan.interval}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-gray-900">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              {plan.limitations.length > 0 && (
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-gray-900">Limitations:</h4>
                  <ul className="space-y-3">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0">•</span>
                        <span className="text-gray-500">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              <Link
                href={plan.ctaUrl}
                className={`w-full text-center py-3 px-6 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'btn-primary'
                    : plan.id === 'free'
                    ? 'btn-outline'
                    : 'btn-primary'
                }`}
              >
                {plan.ctaText}
              </Link>

              {/* Additional Info */}
              {plan.id === 'free' && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  No credit card required
                </p>
              )}
              {plan.id === 'pro' && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  14-day free trial
                </p>
              )}
              {plan.id === 'enterprise' && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  Custom pricing available
                </p>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h3>
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change my plan anytime?
              </h4>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                and we'll prorate any billing differences.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h4>
              <p className="text-gray-600">
                Yes! Pro plan comes with a 14-day free trial. No credit card required to start. 
                You can cancel anytime during the trial period.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h4>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, MasterCard, American Express), PayPal, 
                and bank transfers for enterprise customers.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h4>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, 
                contact us for a full refund.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Can I use the tools without creating an account?
              </h4>
              <p className="text-gray-600">
                Yes! You can try our tools without signing up, but you'll have limited usage. 
                Creating a free account gives you access to more features and higher limits.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-outline">
              Contact Support
            </Link>
            <Link href="/docs" className="btn-primary">
              View Documentation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
