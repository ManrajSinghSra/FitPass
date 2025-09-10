import React from 'react';
import { Check, Zap } from 'lucide-react';

export const Subscription = ({ onSubscribe }) => {
  const plan = {
    name: 'FitPass',
    icon: Zap,
    price: '$15',
    period: 'month',
    description: 'One pass, unlimited gyms, anytime, anywhere.',
    features: [
      'Unlimited gym visits',
      'Premium gym amenities',
      'Priority support',
      'Guest pass (2 per month)',
      'Workout tracking'
    ],
    color: 'border-orange-500 ring-2 ring-orange-100',
    buttonColor: 'bg-orange-500 text-white hover:bg-orange-600',
    popular: true
  };

  return (
    <section id="pricing" className="py-20 bg-gray-800 relative">
      {/* Background Images */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-3 gap-0 h-full">
          <img src="https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="w-full h-full object-cover" />
          <img src="https://images.pexels.com/photos/2247179/pexels-photo-2247179.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="w-full h-full object-cover" />
          <img src="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="w-full h-full object-cover" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select the subscription that matches your travel and fitness lifestyle.
          </p>
        </div>

        <div className="flex justify-center max-w-3xl mx-auto">
          <div
            className={`bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-orange-500 p-8 relative transform lg:scale-105`}
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>

            <div className="text-center mb-6">
              <div className="inline-flex p-3 rounded-lg mb-4 bg-orange-500 bg-opacity-20">
                <plan.icon className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-300 mb-4">
                {plan.description}
              </p>
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-gray-400 ml-2">
                  /{plan.period}
                </span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onSubscribe}
              className="w-full py-4 rounded-lg font-semibold transition-colors bg-orange-500 text-white hover:bg-orange-600"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
           
          <p className="text-sm text-gray-400">
            Prices exclude local taxes. Annual plans available with 20% discount.
          </p>
        </div>
      </div>
    </section>
  );
};