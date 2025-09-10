import React from 'react';
import { Dumbbell, Menu, User, LogOut } from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  user: any;
  onAuthClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isLoggedIn, user, onAuthClick, onLogout }) => {
  return (
    <header className="bg-gray-900 shadow-lg border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-white">FitOnGO</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#gyms" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">
              Find Gyms
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-gray-300 hover:text-orange-500 font-medium transition-colors">
              About
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-300">
                    {user?.name || 'User'}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors font-medium"
              >
                Sign In
              </button>
            )}
            <Menu className="h-6 w-6 text-gray-300 md:hidden cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};