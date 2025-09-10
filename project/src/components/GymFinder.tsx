import React, { useState } from 'react';
import { Search, MapPin, Star, Wifi, Car, Droplets, Users, Clock } from 'lucide-react';

export const GymFinder: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const gyms = [
    {
      id: 1,
      name: 'FitCore Downtown',
      location: 'Manhattan, New York',
      rating: 4.8,
      reviews: 342,
      distance: '0.3 miles',
      amenities: ['Free WiFi', 'Parking', 'Pool', 'Personal Training'],
      hours: '5:00 AM - 11:00 PM',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
      popular: true
    },
    {
      id: 2,
      name: 'Iron Palace Gym',
      location: 'Brooklyn, New York',
      rating: 4.6,
      reviews: 256,
      distance: '1.2 miles',
      amenities: ['Free WiFi', '24/7 Access', 'Sauna', 'Group Classes'],
      hours: '24 Hours',
      image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Zen Fitness Studio',
      location: 'Queens, New York',
      rating: 4.9,
      reviews: 189,
      distance: '2.1 miles',
      amenities: ['Yoga Classes', 'Meditation Room', 'Juice Bar'],
      hours: '6:00 AM - 10:00 PM',
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Gyms' },
    { id: 'popular', label: 'Popular' },
    { id: '24hour', label: '24 Hours' },
    { id: 'pool', label: 'With Pool' },
    { id: 'classes', label: 'Group Classes' }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (true) {
      case amenity.includes('WiFi'):
        return <Wifi className="h-4 w-4" />;
      case amenity.includes('Parking'):
        return <Car className="h-4 w-4" />;
      case amenity.includes('Pool'):
        return <Droplets className="h-4 w-4" />;
      case amenity.includes('Personal Training') || amenity.includes('Group Classes'):
        return <Users className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <section id="gyms" className="py-20 bg-gray-900 relative">
      {/* Hero Image Background */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1200" 
          alt="Modern gym interior" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Find Partner Gyms
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover premium fitness facilities in your area or anywhere you're traveling.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm p-6 rounded-2xl shadow-lg mb-8 border border-gray-700">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Enter city, address, or landmark..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder-gray-400"
              />
            </div>
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium">
              Search Gyms
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full transition-colors font-medium ${
                  selectedFilter === filter.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gym Listings */}
        <div className="grid lg:grid-cols-2 gap-6">
          {gyms.map((gym) => (
            <div key={gym.id} className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-700 hover:border-orange-500">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={gym.image}
                    alt={gym.name}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">
                      {gym.name}
                    </h3>
                    {gym.popular && (
                      <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-400 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{gym.location} • {gym.distance}</span>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-white ml-1">
                        {gym.rating}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        ({gym.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{gym.hours}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {gym.amenities.slice(0, 3).map((amenity, index) => (
                      <span
                        key={index}
                        className="flex items-center space-x-1 bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </span>
                    ))}
                    {gym.amenities.length > 3 && (
                      <span className="text-sm text-gray-400 py-1">
                        +{gym.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium">
                    Generate Access Token
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gray-700 text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium">
            Load More Gyms
          </button>
        </div>
      </div>
    </section>
  );
};