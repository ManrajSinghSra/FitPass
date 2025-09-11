import React, { useState } from 'react';
import { X, MapPin, Clock, Star, Calendar, Users, Wifi, Car, Dumbbell, Minimize as Swimming, Heart } from 'lucide-react';
import axios from "../config/axios.js"
import { toast } from 'react-toastify';
interface Gym {
  id: number;
  name: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  openHours: string;
  pricePerVisit: number;
  availability: 'high' | 'medium' | 'low';
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: (booking: any) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onBookingComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const nearbyGyms: Gym[] = [
    {
      id: 1,
      name: 'Elite Fitness Downtown',
      location: '123 Main St, Downtown',
      distance: '0.5 miles',
      rating: 4.8,
      reviews: 324,
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg',
      amenities: ['Free WiFi', 'Parking', 'Cardio', 'Weights', 'Pool', 'Sauna'],
      openHours: '5:00 AM - 11:00 PM',
      pricePerVisit: 0,
      availability: 'high'
    },
    {
      id: 2,
      name: 'PowerHouse Gym',
      location: '456 Oak Ave, Midtown',
      distance: '1.2 miles',
      rating: 4.6,
      reviews: 189,
      image: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg',
      amenities: ['Free WiFi', 'Parking', 'Cardio', 'Weights', 'Classes'],
      openHours: '6:00 AM - 10:00 PM',
      pricePerVisit: 0,
      availability: 'medium'
    },
    {
      id: 3,
      name: 'Aqua Fitness Center',
      location: '789 Pine St, Uptown',
      distance: '2.1 miles',
      rating: 4.9,
      reviews: 412,
      image: 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg',
      amenities: ['Free WiFi', 'Pool', 'Spa', 'Classes', 'Personal Training'],
      openHours: '5:30 AM - 10:30 PM',
      pricePerVisit: 0,
      availability: 'low'
    }
  ];

  const timeSlots = [
    '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM',
    '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi': return <Wifi className="h-4 w-4" />;
      case 'parking': return <Car className="h-4 w-4" />;
      case 'cardio': return <Heart className="h-4 w-4" />;
      case 'weights': return <Dumbbell className="h-4 w-4" />;
      case 'pool': return <Swimming className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };
 
const handleBooking = async () => {
  if (!selectedGym || !selectedDate || !selectedTime) {
    console.warn("Attempted to confirm booking with incomplete data", {
      selectedGym,
      selectedDate,
      selectedTime,
    });
    return;
  }

  const payload = {
    gym: selectedGym.name,
    time: selectedTime,
    date: new Date(selectedDate).toISOString(),
  };

  try {
    const token = localStorage.getItem("token"); // if using JWT auth
    const res = await axios.post("/user/upcomingSession", payload, {withCredentials:true});

    console.log(res.data);  
    
    toast.success("Booking done")
    

    // notify parent with server response
    // onBookingComplete(res.data.data || res.data);
  } catch (err) {
    console.error("Failed to add upcoming session:", err);
  } finally {
    onClose();
    setStep(1);
    setSelectedGym(null);
    setSelectedDate("");
    setSelectedTime("");
    setSearchLocation("");
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Book New Session</h2>
          <button
            onClick={() => {
              onClose();
              // keep modal state consistent when user closes manually
              setStep(1);
              setSelectedGym(null);
              setSelectedDate('');
              setSelectedTime('');
              setSearchLocation('');
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-6 py-4 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-purple-400' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-600' : 'bg-gray-600'}`}>
                1
              </div>
              <span>Find Gym</span>
            </div>
            <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-600'}`}></div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-purple-400' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-600' : 'bg-gray-600'}`}>
                2
              </div>
              <span>Select Time</span>
            </div>
            <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-purple-600' : 'bg-gray-600'}`}></div>
            <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-purple-400' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-purple-600' : 'bg-gray-600'}`}>
                3
              </div>
              <span>Confirm</span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search Location
              </label>
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Enter city, address, or zip code"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <h3 className="text-lg font-semibold text-white mb-4">Nearby Partner Gyms</h3>
            <div className="grid gap-4">
              {nearbyGyms.map((gym) => (
                <div
                  key={gym.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedGym?.id === gym.id
                      ? 'border-purple-500 bg-purple-900/20'
                      : 'border-gray-700 bg-gray-700/50 hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedGym(gym)}
                >
                  <div className="flex space-x-4">
                    <img
                      src={gym.image}
                      alt={gym.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-white">{gym.name}</h4>
                          <div className="flex items-center text-sm text-gray-400 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {gym.location} • {gym.distance}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-white font-medium">{gym.rating}</span>
                            <span className="text-gray-400 text-sm ml-1">({gym.reviews})</span>
                          </div>
                          <div className={`text-sm font-medium ${getAvailabilityColor(gym.availability)}`}>
                            {gym.availability === 'high' ? 'High Availability' : 
                             gym.availability === 'medium' ? 'Medium Availability' : 'Low Availability'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-400 mb-2">
                        <Clock className="h-4 w-4 mr-1" />
                        {gym.openHours}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {gym.amenities.slice(0, 4).map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-1 bg-gray-600 px-2 py-1 rounded text-xs text-gray-300">
                            {getAmenityIcon(amenity)}
                            <span>{amenity}</span>
                          </div>
                        ))}
                        {gym.amenities.length > 4 && (
                          <div className="bg-gray-600 px-2 py-1 rounded text-xs text-gray-300">
                            +{gym.amenities.length - 4} more
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedGym}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-2 rounded-lg transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 2 && selectedGym && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Selected Gym</h3>
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <h4 className="font-medium text-white">{selectedGym.name}</h4>
                <p className="text-sm text-gray-400">{selectedGym.location}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Time
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 rounded-lg text-sm transition-colors ${
                        selectedTime === time
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-2 rounded-lg transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && selectedGym && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Confirm Your Booking</h3>
            
            <div className="bg-gray-700/50 rounded-lg p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-white mb-4">Gym Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white">{selectedGym.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white">{selectedGym.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rating:</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-white">{selectedGym.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-4">Session Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date:</span>
                      <span className="text-white">{new Date(selectedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time:</span>
                      <span className="text-white">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Cost:</span>
                      <span className="text-green-400 font-medium">Included in subscription</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-6">
              <h5 className="font-medium text-blue-400 mb-2">Booking Instructions</h5>
              <ul className="text-sm text-blue-300 space-y-1">
                <li>• Show your FitPass QR code at the gym entrance</li>
                <li>• Arrive 10 minutes early for check-in</li>
                <li>• Bring a towel and water bottle</li>
                <li>• Follow gym rules and equipment guidelines</li>
              </ul>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleBooking}
                className="bg-green-600 hover:bg-green-700 px-8 py-2 rounded-lg transition-colors font-medium"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
