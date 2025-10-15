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
    <section className="py-20 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Tools?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built with professionals in mind, our tools combine power, simplicity, 
            and reliability to help you achieve your goals faster.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
