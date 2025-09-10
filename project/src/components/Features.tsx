import React from 'react';
import { Smartphone, CreditCard, Users, Award, Shield, Clock } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'Mobile App Access',
      description: 'Generate QR codes instantly and check into any partner gym with your phone.',
      color: 'text-orange-500 bg-orange-100'
    },
    {
      icon: CreditCard,
      title: 'One Subscription',
      description: 'Single monthly payment gives you access to our entire global network.',
      color: 'text-blue-500 bg-blue-100'
    },
    {
      icon: Users,
      title: 'Premium Partners',
      description: 'Work out at top-rated gyms, fitness centers, and boutique studios.',
      color: 'text-green-500 bg-green-100'
    },
    {
      icon: Award,
      title: 'Flexible Plans',
      description: 'Choose from monthly, quarterly, or annual plans that fit your lifestyle.',
      color: 'text-purple-500 bg-purple-100'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security with encrypted tokens and safe payments.',
      color: 'text-indigo-500 bg-indigo-100'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer service to help you wherever you are.',
      color: 'text-pink-500 bg-pink-100'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-800 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-4 gap-4 h-full">
          <img src="https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" className="w-full h-full object-cover" />
          <img src="https://images.pexels.com/photos/2247179/pexels-photo-2247179.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" className="w-full h-full object-cover" />
          <img src="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" className="w-full h-full object-cover" />
          <img src="https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose FitPass?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We've reimagined how fitness travelers access gyms worldwide with cutting-edge technology and premium partnerships.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 bg-opacity-80 backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:bg-gray-800 border border-gray-700 hover:border-orange-500"
            >
              <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};