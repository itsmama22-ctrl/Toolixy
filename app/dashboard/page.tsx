import type { Metadata } from 'next';
import { BarChart3, Mail, Palette, Clock, TrendingUp, Download, Activity } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Dashboard - Your Analytics & Usage | toolixy',
  description: 'Track your usage, view analytics, and manage your toolixy account. Monitor your email extractions and color palette generations.',
  keywords: ['dashboard', 'analytics', 'usage', 'account', 'statistics', 'reports'],
  openGraph: {
    title: 'Dashboard - Your Analytics & Usage | toolixy',
    description: 'Track your usage, view analytics, and manage your toolixy account.',
    images: ['/images/og-dashboard.jpg'],
  },
  twitter: {
    title: 'Dashboard - Your Analytics & Usage | toolixy',
    description: 'Track your usage, view analytics, and manage your toolixy account.',
    images: ['/images/twitter-dashboard.jpg'],
  },
  alternates: {
    canonical: '/dashboard',
  },
};

export default function DashboardPage() {
  return (
    <>
      <SEO
        title="Dashboard - Your Analytics & Usage"
        description="Track your usage, view analytics, and manage your toolixy account. Monitor your email extractions and color palette generations."
        keywords={['dashboard', 'analytics', 'usage', 'account', 'statistics', 'reports']}
        url="/dashboard"
        type="website"
      />
      
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Breadcrumb className="mb-6" />
      </div>
      
      <section className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-8">
            <h1 className="heading-1 mb-4">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's an overview of your activity and usage.</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Extractions</p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+12% from last month</span>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Color Palettes</p>
                  <p className="text-2xl font-bold text-gray-900">892</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Palette className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+8% from last month</span>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">156</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                <span>API calls</span>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">99.2%</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+0.3% from last month</span>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Usage Chart */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="heading-4">Usage Over Time</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-lg">7D</button>
                  <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">30D</button>
                  <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">90D</button>
                </div>
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Usage chart would appear here</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="heading-4 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Email extraction completed</p>
                    <p className="text-xs text-gray-500">example.com - 23 emails found</p>
                  </div>
                  <span className="text-xs text-gray-500">2m ago</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Palette className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Color palette generated</p>
                    <p className="text-xs text-gray-500">Analogous scheme - 5 colors</p>
                  </div>
                  <span className="text-xs text-gray-500">15m ago</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Download className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Export downloaded</p>
                    <p className="text-xs text-gray-500">emails.csv - 156 contacts</p>
                  </div>
                  <span className="text-xs text-gray-500">1h ago</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Activity className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">API key generated</p>
                    <p className="text-xs text-gray-500">New API key for integration</p>
                  </div>
                  <span className="text-xs text-gray-500">2h ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="heading-3 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a href="/tools/email-extractor" className="card hover:shadow-lg transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-primary-600">Extract Emails</h4>
                    <p className="text-sm text-gray-600">Start a new email extraction</p>
                  </div>
                </div>
              </a>

              <a href="/tools/color-palette" className="card hover:shadow-lg transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Palette className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-primary-600">Generate Palette</h4>
                    <p className="text-sm text-gray-600">Create a new color palette</p>
                  </div>
                </div>
              </a>

              <a href="/api" className="card hover:shadow-lg transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-primary-600">API Documentation</h4>
                    <p className="text-sm text-gray-600">View API docs and examples</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Account Info */}
          <div className="card">
            <h3 className="heading-4 mb-6">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Current Plan</h4>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Free</span>
                  <a href="/pricing" className="text-primary-600 hover:text-primary-700 text-sm">Upgrade</a>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">API Usage</h4>
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between mb-1">
                    <span>This month</span>
                    <span>156 / 1,000 calls</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{width: '15.6%'}}></div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Member Since</h4>
                <p className="text-gray-600">January 2024</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Last Activity</h4>
                <p className="text-gray-600">2 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

