import React from 'react';
import { 
  Zap, 
  Shield, 
  Download, 
  Smartphone, 
  Users, 
  TrendingUp,
  Clock,
  Globe,
  CheckCircle
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Extract emails and generate palettes in seconds, not hours. Our optimized algorithms deliver results instantly.',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'We never store your data. All processing happens securely and your information stays private.',
    color: 'from-secondary-500 to-secondary-600',
  },
  {
    icon: Download,
    title: 'Multiple Formats',
    description: 'Export your results in various formats - CSV, JSON, CSS, and more. Compatible with all major tools.',
    color: 'from-accent-500 to-accent-600',
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Works perfectly on all devices. Access our tools from your phone, tablet, or desktop.',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share palettes and results with your team. Perfect for agencies and design teams.',
    color: 'from-secondary-500 to-secondary-600',
  },
  {
    icon: TrendingUp,
    title: 'Scalable',
    description: 'From individual users to enterprise teams, our tools scale with your needs.',
    color: 'from-accent-500 to-accent-600',
  },
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Automate repetitive tasks and focus on what matters most - growing your business.',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Extract emails from websites worldwide and generate palettes for any market.',
    color: 'from-secondary-500 to-secondary-600',
  },
];

export default function Features() {
  return (
    <section className="relative section-padding bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-accent-500/10 to-primary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Modern Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full glass border border-primary-200/50 text-primary-700 text-sm font-semibold mb-8 animate-fade-in-down">
            <CheckCircle className="w-4 h-4 mr-2 text-primary-500" />
            Why Choose Our Tools?
          </div>
          <h2 className="heading-2 mb-6 animate-fade-in-up">
            Built for <span className="text-gradient-secondary">Professionals</span>
          </h2>
          <p className="body-large max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Our tools combine cutting-edge technology with intuitive design to deliver 
            exceptional results for modern professionals and businesses.
          </p>
        </div>

        {/* Modern Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group animate-fade-in-up" 
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="card-elevated h-full group-hover:shadow-colored transition-all duration-300">
                {/* Modern Icon Container */}
                <div className="relative mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                {/* Modern Content */}
                <h3 className="heading-4 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="body-regular">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
