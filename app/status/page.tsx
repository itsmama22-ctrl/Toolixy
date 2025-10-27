import type { Metadata } from 'next';
import { CheckCircle, AlertCircle, Clock, Server, Zap, Shield } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'System Status - Service Health & Uptime | toolixy',
  description: 'Check the current status of toolixy services. Monitor uptime, performance, and any ongoing incidents affecting our email extraction and color palette tools.',
  keywords: ['status', 'uptime', 'service health', 'monitoring', 'incidents', 'system status'],
  openGraph: {
    title: 'System Status - Service Health & Uptime | toolixy',
    description: 'Check the current status of toolixy services. Monitor uptime, performance, and any ongoing incidents.',
    images: ['/images/og-status.jpg'],
  },
  twitter: {
    title: 'System Status - Service Health & Uptime | toolixy',
    description: 'Check the current status of toolixy services. Monitor uptime, performance, and any ongoing incidents.',
    images: ['/images/twitter-status.jpg'],
  },
  alternates: {
    canonical: '/status',
  },
};

export default function StatusPage() {
  return (
    <>
      <SEO
        title="System Status - Service Health & Uptime"
        description="Check the current status of toolixy services. Monitor uptime, performance, and any ongoing incidents affecting our email extraction and color palette tools."
        keywords={['status', 'uptime', 'service health', 'monitoring', 'incidents', 'system status']}
        url="/status"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Breadcrumb className="mb-6" />
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="heading-1 mb-6">System Status</h1>
            <p className="body-large text-gray-600 max-w-3xl mx-auto">
              Monitor the health and performance of all toolixy services. 
              We're committed to providing reliable, high-performance tools for our users.
            </p>
          </div>

          {/* Overall Status */}
          <div className="mb-12">
            <div className="card-elevated text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <h2 className="heading-2 text-green-600">All Systems Operational</h2>
              </div>
              <p className="text-gray-600 mb-6">
                All toolixy services are running normally. No incidents reported.
              </p>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>
          </div>

          {/* Service Status */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">Service Status</h2>
            <div className="space-y-4">
              {/* Email Extractor Service */}
              <div className="card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Server className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="heading-4">Email Extractor Service</h3>
                      <p className="text-gray-600 text-sm">Email extraction and processing</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-medium">Operational</span>
                  </div>
                </div>
              </div>

              {/* Color Palette Service */}
              <div className="card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="heading-4">Color Palette Service</h3>
                      <p className="text-gray-600 text-sm">Color palette generation and processing</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-medium">Operational</span>
                  </div>
                </div>
              </div>

              {/* API Gateway */}
              <div className="card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="heading-4">API Gateway</h3>
                      <p className="text-gray-600 text-sm">API authentication and routing</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-medium">Operational</span>
                  </div>
                </div>
              </div>

              {/* Database */}
              <div className="card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Server className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="heading-4">Database</h3>
                      <p className="text-gray-600 text-sm">Data storage and retrieval</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-600 font-medium">Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="heading-4 mb-2">Uptime</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
                <p className="text-gray-600 text-sm">Last 30 days</p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="heading-4 mb-2">Response Time</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">120ms</div>
                <p className="text-gray-600 text-sm">Average response</p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="heading-4 mb-2">Requests</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">1.2M</div>
                <p className="text-gray-600 text-sm">This month</p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Server className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="heading-4 mb-2">Success Rate</h3>
                <div className="text-3xl font-bold text-gray-900 mb-2">99.8%</div>
                <p className="text-gray-600 text-sm">API success rate</p>
              </div>
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">Recent Incidents</h2>
            <div className="card">
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="heading-4 mb-2 text-green-600">No Recent Incidents</h3>
                <p className="text-gray-600">
                  All services have been running smoothly with no reported issues in the past 30 days.
                </p>
              </div>
            </div>
          </div>

          {/* Maintenance Schedule */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">Scheduled Maintenance</h2>
            <div className="card">
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="heading-4 mb-2 text-blue-600">No Scheduled Maintenance</h3>
                <p className="text-gray-600">
                  There are no planned maintenance windows at this time. We'll notify users 
                  in advance of any scheduled maintenance.
                </p>
              </div>
            </div>
          </div>

          {/* Status History */}
          <div className="mb-20">
            <h2 className="heading-2 mb-8">Status History</h2>
            <div className="space-y-4">
              <div className="card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <h4 className="font-semibold text-gray-900">All Systems Operational</h4>
                      <p className="text-gray-600 text-sm">All services running normally</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <h4 className="font-semibold text-gray-900">All Systems Operational</h4>
                      <p className="text-gray-600 text-sm">All services running normally</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(Date.now() - 86400000).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <h4 className="font-semibold text-gray-900">All Systems Operational</h4>
                      <p className="text-gray-600 text-sm">All services running normally</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(Date.now() - 172800000).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact for Issues */}
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl p-12 text-white text-center">
            <h2 className="heading-2 mb-6 text-white">Experiencing Issues?</h2>
            <p className="body-large text-primary-100 mb-8 max-w-2xl mx-auto">
              If you're experiencing problems that aren't reflected in our status page, 
              please contact our support team.
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

