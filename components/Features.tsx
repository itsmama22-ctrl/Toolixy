import React from 'react';
import { 
  Zap, 
  Shield, 
  Download, 
  Smartphone, 
  Users, 
  TrendingUp,
  Clock,
  Globe
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Extract emails and generate palettes in seconds, not hours. Our optimized algorithms deliver results instantly.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'We never store your data. All processing happens securely and your information stays private.',
  },
  {
    icon: Download,
    title: 'Multiple Formats',
    description: 'Export your results in various formats - CSV, JSON, CSS, and more. Compatible with all major tools.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Works perfectly on all devices. Access our tools from your phone, tablet, or desktop.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share palettes and results with your team. Perfect for agencies and design teams.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable',
    description: 'From individual users to enterprise teams, our tools scale with your needs.',
  },
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Automate repetitive tasks and focus on what matters most - growing your business.',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Extract emails from websites worldwide and generate palettes for any market.',
  },
];

export default function Features() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-300/20 to-secondary-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-accent-300/20 to-primary-300/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-secondary-100 to-accent-100 text-secondary-700 text-sm font-semibold mb-6">
            🚀 Why Choose Our Tools?
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Built for <span className="bg-gradient-to-r from-secondary-600 to-accent-600 bg-clip-text text-transparent">Professionals</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our tools combine cutting-edge technology with intuitive design to deliver 
            exceptional results for modern professionals and businesses.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                {/* Icon Container */}
                <div className="relative mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-secondary-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
