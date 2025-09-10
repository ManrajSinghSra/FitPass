import { useState } from 'react';
import { Header } from '../components/Header';
import { MapPin, Clock, QrCode, Calendar, TrendingUp, Zap, Star, CreditCard } from 'lucide-react';

export const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume user is logged in
  const [user, setUser] = useState({
    name: 'Alex Thompson',
    email: 'alex@example.com',
    subscription: 'Unlimited',
  });

  const stats = {
    workoutsThisMonth: 18,
    gymVisits: 127,
    activePlan: user.subscription,
    tokensUsed: 45,
    tokensRemaining: 'Unlimited',
  };

  const recentGyms = [
    { name: 'Elite Fitness Tokyo', location: 'Shibuya, Tokyo', date: '2025-01-10', rating: 4.8 },
    { name: 'PowerHouse NYC', location: 'Manhattan, NY', date: '2025-01-08', rating: 4.9 },
    { name: 'FitZone London', location: 'Central London', date: '2025-01-05', rating: 4.7 },
  ];

  const upcomingBookings = [
    { gym: 'Gold\'s Gym Vegas', time: '08:00 AM', date: '2025-01-12', class: 'HIIT Training' },
    { gym: 'Anytime Fitness', time: '06:30 PM', date: '2025-01-12', class: 'Open Gym' },
  ];

  const handleSubscriptionChange = (newSubscription) => {
    setUser((prevUser) => ({
      ...prevUser,
      subscription: newSubscription,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        isLoggedIn={isLoggedIn}
        user={user || { name: '', email: '' }} // Provide a fallback object if user is null
        onAuthClick={() => {}}
        onLogout={() => {
          setIsLoggedIn(false);
          setUser(null);
        }}
      />
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Content */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name || 'Guest'}!</h1>
          <p className="text-gray-400">Track your fitness journey and manage your gym access</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">This Month</p>
                <p className="text-2xl font-bold text-white">{stats.workoutsThisMonth}</p>
                <p className="text-xs text-green-400">+12% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Visits</p>
                <p className="text-2xl font-bold text-white">{stats.gymVisits}</p>
                <p className="text-xs text-purple-400">All time</p>
              </div>
              <MapPin className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Plan</p>
                <p className="text-2xl font-bold text-white">{stats.activePlan}</p>
                <p className="text-xs text-blue-400">Premium member</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Access Tokens</p>
                <p className="text-2xl font-bold text-white">∞</p>
                <p className="text-xs text-yellow-400">Unlimited plan</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-700">
            {['overview', 'gyms', 'bookings', 'profile'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Recent Gym Visits</h3>
              <div className="space-y-4">
                {recentGyms.map((gym, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-semibold text-white">{gym.name}</p>
                      <p className="text-sm text-gray-400">{gym.location}</p>
                      <p className="text-xs text-gray-500">{gym.date}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-300">{gym.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Bookings */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Upcoming Sessions</h3>
              <div className="space-y-4">
                {upcomingBookings.map((booking, index) => (
                  <div key={index} className="p-4 bg-purple-900/20 rounded-lg border border-purple-700">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-white">{booking.gym}</p>
                      <div className="flex items-center text-purple-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{booking.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{booking.class}</p>
                    <p className="text-xs text-gray-500">{booking.date}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 py-2 rounded-lg transition-colors">
                Book New Session
              </button>
            </div>
          </div>
        )}

        {activeTab === 'gyms' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Gym search and map would go here */}
            <div className="col-span-full bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
              <QrCode className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Find Gyms Near You</h3>
              <p className="text-gray-400 mb-4">Use our interactive map to discover partner gyms in your area</p>
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors">
                Open Gym Finder
              </button>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Manage Your Bookings</h3>
            <div className="text-center py-8">
              <Calendar className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Your booking history and upcoming sessions will appear here</p>
            </div>
          </div>
        )}

        {/* Profile Tab with Subscription Management */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Profile Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue={user.name}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input 
                    type="email" 
                    defaultValue={user.email}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Subscription Plan</label>
                  <select
                    value={user.subscription}
                    onChange={(e) => handleSubscriptionChange(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Unlimited">Unlimited Plan</option>
                    <option value="Basic">Basic Plan</option>
                    <option value="Premium">Premium Plan</option>
                  </select>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg transition-colors">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
