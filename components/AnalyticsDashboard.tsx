'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, Users, MousePointer, Download, Palette, Mail, TrendingUp, Eye } from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  pageViews: number;
  toolUsage: {
    emailExtractor: number;
    colorPalette: number;
  };
  downloads: {
    csv: number;
    txt: number;
    json: number;
    css: number;
    scss: number;
  };
  topPages: Array<{
    page: string;
    views: number;
  }>;
  recentActivity: Array<{
    action: string;
    tool: string;
    timestamp: string;
  }>;
}

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    // In a real implementation, you would fetch this from your analytics API
    const loadAnalyticsData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - replace with real analytics data
      setAnalyticsData({
        totalUsers: 1247,
        pageViews: 8934,
        toolUsage: {
          emailExtractor: 342,
          colorPalette: 189
        },
        downloads: {
          csv: 156,
          txt: 89,
          json: 67,
          css: 45,
          scss: 23
        },
        topPages: [
          { page: '/', views: 2341 },
          { page: '/tools/email-extractor', views: 1892 },
          { page: '/tools/color-palette', views: 1456 },
          { page: '/blog', views: 987 },
          { page: '/about', views: 456 }
        ],
        recentActivity: [
          { action: 'Email extraction completed', tool: 'Email Extractor', timestamp: '2 minutes ago' },
          { action: 'Color palette generated', tool: 'Color Palette', timestamp: '5 minutes ago' },
          { action: 'CSV file downloaded', tool: 'Email Extractor', timestamp: '8 minutes ago' },
          { action: 'Random palette created', tool: 'Color Palette', timestamp: '12 minutes ago' },
          { action: 'Image colors extracted', tool: 'Color Palette', timestamp: '15 minutes ago' }
        ]
      });
      
      setIsLoading(false);
    };

    loadAnalyticsData();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-200 rounded-lg h-64"></div>
            <div className="bg-gray-200 rounded-lg h-64"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">Analytics Unavailable</h2>
          <p className="text-gray-500">Unable to load analytics data at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your toolixy website performance</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Live data</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.totalUsers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12.5% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.pageViews.toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+8.3% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Email Extractions</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.toolUsage.emailExtractor.toLocaleString()}</p>
            </div>
            <Mail className="w-8 h-8 text-purple-500" />
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+15.2% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Color Palettes</p>
              <p className="text-3xl font-bold text-gray-900">{analyticsData.toolUsage.colorPalette.toLocaleString()}</p>
            </div>
            <Palette className="w-8 h-8 text-pink-500" />
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+22.1% from last month</span>
          </div>
        </div>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Tool Usage Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tool Usage</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">Email Extractor</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ 
                      width: `${(analyticsData.toolUsage.emailExtractor / (analyticsData.toolUsage.emailExtractor + analyticsData.toolUsage.colorPalette)) * 100}%` 
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{analyticsData.toolUsage.emailExtractor}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Palette className="w-5 h-5 text-pink-500" />
                <span className="text-sm font-medium text-gray-700">Color Palette</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-pink-500 h-2 rounded-full" 
                    style={{ 
                      width: `${(analyticsData.toolUsage.colorPalette / (analyticsData.toolUsage.emailExtractor + analyticsData.toolUsage.colorPalette)) * 100}%` 
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{analyticsData.toolUsage.colorPalette}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Downloads Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">File Downloads</h3>
          <div className="space-y-3">
            {Object.entries(analyticsData.downloads).map(([format, count]) => (
              <div key={format} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 uppercase">{format}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ 
                        width: `${(count / Math.max(...Object.values(analyticsData.downloads))) * 100}%` 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
          <div className="space-y-3">
            {analyticsData.topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                  <span className="text-sm font-medium text-gray-700">{page.page}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{page.views.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {analyticsData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{activity.tool}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

