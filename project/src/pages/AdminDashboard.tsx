import { useState } from 'react';
import { Header } from '../components/Header';
import { Building2, Users, TrendingUp, DollarSign, Calendar, Settings, Plus, Eye, Edit3, Trash2 } from 'lucide-react';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume admin is logged in
  const [user, setUser] = useState({ name: 'Admin User', email: 'admin@example.com' });

  const gymStats = {
    totalRevenue: '$24,580',
    activeMembers: 342,
    todayVisits: 87,
    occupancyRate: '68%',
  };

  const gymLocations = [
    { id: 1, name: 'FitZone Downtown', location: 'New York, NY', members: 156, revenue: '$12,400', status: 'Active' },
    { id: 2, name: 'FitZone Midtown', location: 'New York, NY', members: 98, revenue: '$8,900', status: 'Active' },
    { id: 3, name: 'FitZone Brooklyn', location: 'Brooklyn, NY', members: 88, revenue: '$3,280', status: 'Pending' },
  ];

  const recentBookings = [
    { user: 'Sarah Chen', gym: 'FitZone Downtown', time: '08:00 AM', date: '2025-01-12', status: 'Confirmed' },
    { user: 'Mike Johnson', gym: 'FitZone Midtown', time: '06:30 PM', date: '2025-01-12', status: 'Confirmed' },
    { user: 'Lisa Rodriguez', gym: 'FitZone Downtown', time: '07:00 AM', date: '2025-01-13', status: 'Pending' },
  ];

  const membershipRequests = [
    { business: 'Elite Fitness Co.', location: 'Los Angeles, CA', facilities: 3, submitted: '2025-01-10' },
    { business: 'PowerHouse Gyms', location: 'Chicago, IL', facilities: 2, submitted: '2025-01-09' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Add Header */}
      <Header
        isLoggedIn={isLoggedIn}
        user={user || { name: '', email: '' }} // Provide fallback if user is null
        onAuthClick={() => {}}
        onLogout={() => {
          setIsLoggedIn(false);
          setUser(null);
        }}
      />
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gym Partner Dashboard</h1>
            <p className="text-gray-400">Manage your facilities and track member activity</p>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Add New Location</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold text-white">{gymStats.totalRevenue}</p>
                <p className="text-xs text-green-400">+15% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Members</p>
                <p className="text-2xl font-bold text-white">{gymStats.activeMembers}</p>
                <p className="text-xs text-blue-400">Across all locations</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Today's Visits</p>
                <p className="text-2xl font-bold text-white">{gymStats.todayVisits}</p>
                <p className="text-xs text-purple-400">Real-time count</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Occupancy Rate</p>
                <p className="text-2xl font-bold text-white">{gymStats.occupancyRate}</p>
                <p className="text-xs text-yellow-400">Average across locations</p>
              </div>
              <Building2 className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-700">
            {['overview', 'locations', 'bookings', 'applications', 'settings'].map((tab) => (
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
            {/* Revenue Chart Placeholder */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Revenue Overview</h3>
              <div className="h-64 bg-gray-700/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                  <p className="text-gray-400">Revenue chart visualization</p>
                  <p className="text-sm text-gray-500">Integration with analytics service</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Recent Bookings</h3>
              <div className="space-y-4">
                {recentBookings.map((booking, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-semibold text-white">{booking.user}</p>
                      <p className="text-sm text-gray-400">{booking.gym}</p>
                      <p className="text-xs text-gray-500">{booking.date} at {booking.time}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed'
                          ? 'bg-green-900/20 text-green-400'
                          : 'bg-yellow-900/20 text-yellow-400'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'locations' && (
          <div className="space-y-6">
            {/* Location Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gymLocations.map((gym) => (
                <div key={gym.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{gym.name}</h3>
                      <p className="text-sm text-gray-400">{gym.location}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      gym.status === 'Active' 
                        ? 'bg-green-900/20 text-green-400' 
                        : 'bg-yellow-900/20 text-yellow-400'
                    }`}>
                      {gym.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Members:</span>
                      <span className="text-white font-semibold">{gym.members}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Revenue:</span>
                      <span className="text-green-400 font-semibold">{gym.revenue}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors">
                      <Edit3 className="h-4 w-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">All Bookings</h3>
              <div className="flex space-x-2">
                <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                  <option>All Locations</option>
                  <option>FitZone Downtown</option>
                  <option>FitZone Midtown</option>
                </select>
                <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 text-gray-400 font-medium">Member</th>
                    <th className="text-left py-3 text-gray-400 font-medium">Location</th>
                    <th className="text-left py-3 text-gray-400 font-medium">Date & Time</th>
                    <th className="text-left py-3 text-gray-400 font-medium">Status</th>
                    <th className="text-left py-3 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking, index) => (
                    <tr key={index} className="border-b border-gray-700/50">
                      <td className="py-4 text-white">{booking.user}</td>
                      <td className="py-4 text-gray-300">{booking.gym}</td>
                      <td className="py-4 text-gray-300">{booking.date} at {booking.time}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-900/20 text-green-400' 
                            : 'bg-yellow-900/20 text-yellow-400'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Partnership Applications</h3>
              <div className="space-y-4">
                {membershipRequests.map((request, index) => (
                  <div key={index} className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-white mb-1">{request.business}</h4>
                        <p className="text-sm text-gray-400">{request.location}</p>
                        <p className="text-sm text-gray-500">{request.facilities} facilities • Submitted {request.submitted}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm transition-colors">
                          Approve
                        </button>
                        <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm transition-colors">
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Business Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Business Name</label>
                  <input 
                    type="text" 
                    defaultValue="FitZone Gym Network"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Contact Email</label>
                  <input 
                    type="email" 
                    defaultValue="admin@fitzonegyms.com"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Commission Rate</label>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="number" 
                      defaultValue="15"
                      className="w-20 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <span className="text-gray-400">% per visit</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};