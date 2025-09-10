import React from 'react';
import { Dumbbell, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Dumbbell className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold">FitPass</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Revolutionizing fitness travel with seamless gym access worldwide. 
              Your fitness journey shouldn't pause when you travel.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-orange-500 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Press</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Partner Gyms</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>support@fitpass.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
            <p className="text-gray-400">
              © 2025 FitPass. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};