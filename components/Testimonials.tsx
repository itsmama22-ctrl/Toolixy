import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechStart Inc.',
    content: 'The email extractor has saved us hours of manual work. We can now build prospect lists in minutes instead of days. The accuracy is impressive!',
    rating: 5,
    avatar: '/images/testimonials/sarah-johnson.jpg',
  },
  {
    name: 'Michael Chen',
    role: 'UI/UX Designer',
    company: 'Creative Agency',
    content: 'The color palette generator is a game-changer for our design process. Being able to extract colors from client images and generate harmonious palettes has streamlined our workflow significantly.',
    rating: 5,
    avatar: '/images/testimonials/michael-chen.jpg',
  },
  {
    name: 'Alex Rodriguez',
    role: 'Growth Manager',
    company: 'SaaS Startup',
    content: 'Both tools are incredibly user-friendly and powerful. The export options are perfect for our team, and the Pro plan gives us everything we need for our marketing campaigns.',
    rating: 5,
    avatar: '/images/testimonials/alex-rodriguez.jpg',
  },
  {
    name: 'Emily Davis',
    role: 'Freelance Designer',
    company: 'Independent',
    content: 'As a freelancer, I need tools that are both affordable and powerful. The free tier is generous, and the Pro plan is worth every penny. The color variations feature is amazing!',
    rating: 5,
    avatar: '/images/testimonials/emily-davis.jpg',
  },
  {
    name: 'David Kim',
    role: 'Product Manager',
    company: 'E-commerce Platform',
    content: 'The email extraction tool has revolutionized our lead generation process. We can now identify and reach out to potential partners much more efficiently.',
    rating: 5,
    avatar: '/images/testimonials/david-kim.jpg',
  },
  {
    name: 'Lisa Thompson',
    role: 'Brand Manager',
    company: 'Fashion Brand',
    content: 'The color palette generator helps us maintain brand consistency across all our marketing materials. The ability to extract colors from product photos is invaluable.',
    rating: 5,
    avatar: '/images/testimonials/lisa-thompson.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loved by Professionals Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our users say about how our tools have transformed their workflow 
            and boosted their productivity.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-hover">
              {/* Quote Icon */}
              <div className="flex justify-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full">
                  <Quote className="w-6 h-6 text-primary-600" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-600 font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">2,000+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">50,000+</div>
              <div className="text-gray-600">Tasks Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
