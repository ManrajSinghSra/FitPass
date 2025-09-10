import React from 'react';
import { MapPin, Zap, Globe } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-1/3 h-full">
          <img 
            src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800" 
            alt="Modern gym equipment" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full">
          <img 
            src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=800" 
            alt="Fitness training" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Travel without breaking your
            <span className="text-orange-500 block">fitness routine</span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            With a single subscription, get token-based access to partner gyms in any city. 
            One pass, unlimited gyms, anytime, anywhere.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGetStarted}
              className="bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
            >
              Get Started Today
            </button>
            <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-full hover:border-orange-500 hover:text-orange-500 transition-colors font-semibold text-lg">
              Find Gyms Near Me
            </button>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-orange-500 bg-opacity-20 p-4 rounded-full mb-4 backdrop-blur-sm">
                <Globe className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Global Network</h3>
              <p className="text-gray-300">Access 10,000+ partner gyms across 50+ countries</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-500 bg-opacity-20 p-4 rounded-full mb-4 backdrop-blur-sm">
                <Zap className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Instant Access</h3>
              <p className="text-gray-300">Get immediate entry with our token-based system</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-500 bg-opacity-20 p-4 rounded-full mb-4 backdrop-blur-sm">
                <MapPin className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Smart Discovery</h3>
              <p className="text-gray-300">Find the perfect gym anywhere you travel</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};