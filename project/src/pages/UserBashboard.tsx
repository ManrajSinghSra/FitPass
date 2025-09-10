import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import {
  MapPin,
  Clock,
  QrCode,
  Calendar,
  TrendingUp,
  Star,
  CreditCard,
} from 'lucide-react';
import QRCode from 'react-qr-code';
import axios from '../config/axios';
import { toast } from 'react-toastify';

// Leaflet + react-leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ----- Custom icons -----
const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Fix default marker URLs (client)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// ----- Types -----
type GymElement = {
  id?: number | string;
  lat?: number;
  lon?: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, any>;
};

const initialRecent = [
  { name: 'Elite Fitness Tokyo', location: 'Shibuya, Tokyo', date: '2025-01-10', rating: 4.8 },
  { name: 'PowerHouse NYC', location: 'Manhattan, NY', date: '2025-01-08', rating: 4.9 },
  { name: 'FitZone London', location: 'Central London', date: '2025-01-05', rating: 4.7 },
];

const initialBookings = [
  { gym: "Gold's Gym Vegas", time: '08:00 AM', date: '2025-01-12', class: 'HIIT Training' },
  { gym: 'Anytime Fitness', time: '06:30 PM', date: '2025-01-12', class: 'Open Gym' },
];

export const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'gyms' | 'bookings' | 'profile'>('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState<any | null>({
    name: 'Alex Thompson',
    email: 'alex@example.com',
    subscription: 'Unlimited',
    subscriptionExpiry: '2025-06-30',
  });

  const [stats, setStats] = useState<any>({
    workoutsThisMonth: 18,
    gymVisits: 127,
    activePlan: 'Unlimited',
  });

  const [recentGyms, setRecentGyms] = useState<any[]>(initialRecent);
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>(initialBookings);

  // Map + finder
  const [nearbyGyms, setNearbyGyms] = useState<GymElement[]>([]);
  const [loadingGyms, setLoadingGyms] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  const [searchLocation, setSearchLocation] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);

  // Fetch profile (optional). Keeps defaults if fetch fails.
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/user/profile', { withCredentials: true });
        const userData = res.data.data;
        setUser({
          name: userData.name || 'Guest',
          email: userData.emailId || userData.email || '',
          subscription: userData.subscription || 'FitPass',
          subscriptionExpiry: userData.subscriptionExpiry || userData.expiryDate || null,
        });
        setStats({
          workoutsThisMonth: userData.stats?.workoutsThisMonth || 0,
          gymVisits: userData.stats?.gymVisits || 0,
          activePlan: userData.subscription || 'FitPass',
        });
        setRecentGyms(userData.recentGyms || initialRecent);
        setUpcomingBookings(userData.upcomingBookings || initialBookings);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        toast.error('Failed to load profile. Using defaults.');
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateDaysUntilRenewal = () => {
    if (!user?.subscriptionExpiry) return 0;
    const expiryDate = new Date(user.subscriptionExpiry);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleSubscriptionChange = (newSubscription: string) => {
    setUser((prev: any) => ({ ...prev, subscription: newSubscription }));
  };

  // -------- Gym finder (Overpass) --------
  async function handleFindGyms() {
    setLoadingGyms(true);
    setMapError(null);

    if (!navigator.geolocation) {
      setMapError('Geolocation is not supported by your browser');
      setLoadingGyms(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        const radius = 15000;

        const query = `
          [out:json][timeout:25];
          (
            node["leisure"="fitness_centre"](around:${radius},${latitude},${longitude});
            way["leisure"="fitness_centre"](around:${radius},${latitude},${longitude});
            relation["leisure"="fitness_centre"](around:${radius},${latitude},${longitude});
            node["leisure"="sports_centre"](around:${radius},${latitude},${longitude});
            way["leisure"="sports_centre"](around:${radius},${latitude},${longitude});
            relation["leisure"="sports_centre"](around:${radius},${latitude},${longitude});
            node["amenity"="gym"](around:${radius},${latitude},${longitude});
            way["amenity"="gym"](around:${radius},${latitude},${longitude});
            relation["amenity"="gym"](around:${radius},${latitude},${longitude});
            node["sport"~"fitness|gym"](around:${radius},${latitude},${longitude});
            way["sport"~"fitness|gym"](around:${radius},${latitude},${longitude});
            relation["sport"~"fitness|gym"](around:${radius},${latitude},${longitude});
            node["building"="sports_centre"](around:${radius},${latitude},${longitude});
            way["building"="sports_centre"](around:${radius},${latitude},${longitude});
          );
          out center;
        `;

        try {
          const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);
          const res = await fetch(url);
          if (!res.ok) throw new Error('Failed to fetch gyms');
          const data = await res.json();

          if (data.elements && data.elements.length > 0) {
            const validGyms: GymElement[] = data.elements.filter((g: any) => {
              const lat = g.lat || g.center?.lat;
              const lon = g.lon || g.center?.lon;
              return lat && lon;
            });
            setNearbyGyms(validGyms);
            if (validGyms.length === 0) {
              setMapError("Found results but couldn't display coordinates. Try another location.");
            }
          } else {
            setNearbyGyms([]);
            setMapError('No gyms found within 15km. Try increasing radius or searching a different location.');
          }
        } catch (err) {
          console.error('Error fetching gyms:', err);
          setMapError('Could not fetch gyms. Please try again later.');
          setNearbyGyms([]);
        } finally {
          setLoadingGyms(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setMapError(`Unable to get your location: ${error.message}. Please allow location access or search manually.`);
        setLoadingGyms(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 300000 }
    );
  }

  // -------- Search by location (Nominatim + Overpass) --------
  async function searchGymsByLocation(locationName: string) {
    if (!locationName.trim()) {
      setMapError('Please enter a location name');
      return;
    }

    setLoadingGyms(true);
    setMapError(null);

    try {
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        locationName
      )}&format=json&limit=1`;

      const geoResponse = await fetch(nominatimUrl);
      if (!geoResponse.ok) throw new Error('Failed to geocode location');

      const geoData = await geoResponse.json();
      if (!geoData || geoData.length === 0) {
        setMapError('Location not found. Please try a different location name.');
        setLoadingGyms(false);
        return;
      }

      const { lat, lon } = geoData[0];
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);
      setUserLocation([latitude, longitude]);

      const radius = 15000;
      const query = `
        [out:json][timeout:25];
        (
          node["leisure"="fitness_centre"](around:${radius},${latitude},${longitude});
          way["leisure"="fitness_centre"](around:${radius},${latitude},${longitude});
          relation["leisure"="fitness_centre"](around:${radius},${latitude},${longitude});
          node["leisure"="sports_centre"](around:${radius},${latitude},${longitude});
          way["leisure"="sports_centre"](around:${radius},${latitude},${longitude});
          relation["leisure"="sports_centre"](around:${radius},${latitude},${longitude});
          node["amenity"="gym"](around:${radius},${latitude},${longitude});
          way["amenity"="gym"](around:${radius},${latitude},${longitude});
          relation["amenity"="gym"](around:${radius},${latitude},${longitude});
          node["sport"~"fitness|gym"](around:${radius},${latitude},${longitude});
          way["sport"~"fitness|gym"](around:${radius},${latitude},${longitude});
          relation["sport"~"fitness|gym"](around:${radius},${latitude},${longitude});
          node["building"="sports_centre"](around:${radius},${latitude},${longitude});
          way["building"="sports_centre"](around:${radius},${latitude},${longitude});
        );
        out center;
      `;

      const overpassUrl = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);
      const res = await fetch(overpassUrl);
      if (!res.ok) throw new Error('Failed to fetch gyms');
      const data = await res.json();

      if (data.elements && data.elements.length > 0) {
        const validGyms: GymElement[] = data.elements.filter((g: any) => {
          const lat = g.lat || g.center?.lat;
          const lon = g.lon || g.center?.lon;
          return lat && lon;
        });
        setNearbyGyms(validGyms);
        if (validGyms.length === 0) {
          setMapError("Found some results but couldn't display them on map.");
        }
      } else {
        setNearbyGyms([]);
        setMapError('No gyms found in this area. Try a different location.');
      }
    } catch (err) {
      console.error('Error searching gyms:', err);
      setMapError('Could not search for gyms. Please try again later.');
      setNearbyGyms([]);
    } finally {
      setLoadingGyms(false);
    }
  }

  const generateQRData = () =>
    JSON.stringify({
      userId: user?.email ?? '',
      userName: user?.name ?? '',
      subscription: user?.subscription ?? '',
      expiryDate: user?.subscriptionExpiry ?? null,
      daysLeft: calculateDaysUntilRenewal(),
    });

  return (
    <div className="min-h-screen bg-gray-900">
      <Header
        isLoggedIn={isLoggedIn}
        user={user || { name: '', email: '' }}
        onAuthClick={() => {}}
        onLogout={() => {
          setIsLoggedIn(false);
          setUser(null);
        }}
      />

      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name || 'Guest'}!</h1>
          <p className="text-gray-400">Track your fitness journey and manage your gym access</p>
        </div>

        {/* Stats */}
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
                <p className="text-xs text-blue-400">
                  {user?.subscriptionExpiry ? `${calculateDaysUntilRenewal()} days left` : 'Premium member'}
                </p>
              </div>
              <button
                onClick={() => setShowQRCode(!showQRCode)}
                className="hover:bg-gray-700 p-2 rounded-full transition-colors"
                title="Show QR Code"
              >
                <QrCode className="h-8 w-8 text-blue-400" />
              </button>
            </div>

            {/* QR Modal */}
            {showQRCode && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 max-w-md w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Membership QR Code</h3>
                    <button onClick={() => setShowQRCode(false)} className="text-gray-400 hover:text-white">✕</button>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-lg mb-4">
                      <QRCode value={generateQRData()} size={200} bgColor="#ffffff" fgColor="#000000" level="H" />
                    </div>

                    <div className="text-center mb-4">
                      <p className="text-white font-semibold">Scan to verify membership</p>
                      <p className="text-gray-400 text-sm mt-1">{calculateDaysUntilRenewal()} days remaining until renewal</p>
                      <p className="text-gray-500 text-xs mt-2">Expiry Date: {user?.subscriptionExpiry || 'N/A'}</p>
                    </div>

                    <button onClick={() => setShowQRCode(false)} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-700">
            {['overview', 'gyms', 'bookings', 'profile'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab content */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Recent */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Recent Gym Visits</h3>
              <div className="space-y-4">
                {(recentGyms || []).map((gym: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <p className="font-semibold text-white">{gym.name || gym.tags?.name || 'Unnamed'}</p>
                      <p className="text-sm text-gray-400">{gym.location || gym.tags?.addr_city || ''}</p>
                      <p className="text-xs text-gray-500">{gym.date || ''}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-300">{gym.rating ?? '-'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Upcoming Sessions</h3>
              <div className="space-y-4">
                {(upcomingBookings || []).map((booking: any, index: number) => (
                  <div key={index} className="p-4 bg-purple-900/20 rounded-lg border border-purple-700">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-white">{booking.gym || ''}</p>
                      <div className="flex items-center text-purple-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">{booking.time || ''}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{booking.class || ''}</p>
                    <p className="text-xs text-gray-500">{booking.date || ''}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 py-2 rounded-lg transition-colors">Book New Session</button>
            </div>
          </div>
        )}

        {activeTab === 'gyms' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-full bg-gray-800 rounded-xl p-6 border border-gray-700">
              <QrCode className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Find Gyms Near You</h3>
              <p className="text-gray-400 mb-4">Use our interactive map to discover partner gyms in your area</p>

              <div className="mb-4">
                <label className="block text-sm text-gray-300 mb-2">Or search by location:</label>
                <div className="flex">
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="Enter city or address"
                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={() => searchGymsByLocation(searchLocation)}
                    disabled={loadingGyms || !searchLocation.trim()}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors disabled:opacity-50"
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleFindGyms}
                  disabled={loadingGyms}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loadingGyms ? 'Locating you...' : 'Use My Location'}
                </button>
              </div>

              {mapError && <div className="mt-4 p-3 bg-red-900/50 border border-red-700 rounded-lg"><p className="text-red-300">{mapError}</p></div>}
            </div>

            {/* Map */}
            {userLocation && (
              <div className="col-span-full mt-6">
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Gym Finder Map</h3>
                    <span className="text-sm text-gray-400">{nearbyGyms.length} gyms found</span>
                  </div>

                  <div className="h-[500px] rounded-lg overflow-hidden border border-gray-600">
                    <MapContainer center={userLocation} zoom={13} style={{ height: '100%', width: '100%' }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

                      <Marker position={userLocation} icon={redIcon}>
                        <Popup>
                          <div className="font-bold text-red-600">Your Location</div>
                          <div className="text-sm">This is where you are</div>
                        </Popup>
                      </Marker>

                      {nearbyGyms.map((gym, i) => {
                        const lat = (gym as any).lat || gym.center?.lat;
                        const lon = (gym as any).lon || gym.center?.lon;
                        if (!lat || !lon) return null;
                        const gymName = gym.tags?.name || gym.tags?.amenity || gym.tags?.leisure || 'Unnamed Gym';
                        const addrStreet = gym.tags?.addr_street || '';
                        const addrCity = gym.tags?.addr_city || gym.tags?.city || '';
                        return (
                          <Marker key={gym.id ?? i} position={[lat, lon]} icon={blueIcon}>
                            <Popup>
                              <div className="font-bold text-blue-600">{gymName}</div>
                              <div className="text-sm">
                                {addrStreet && `${addrStreet}, `}
                                {addrCity && addrCity}
                              </div>
                            </Popup>
                          </Marker>
                        );
                      })}
                    </MapContainer>
                  </div>

                  {loadingGyms && <div className="mt-4 text-center text-gray-400">Searching for gyms near you...</div>}
                </div>
              </div>
            )}

            {/* Nearby gyms list */}
            {nearbyGyms.length > 0 && (
              <div className="col-span-full mt-6">
                <h3 className="text-xl font-bold text-white mb-4">Nearby Gyms</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {nearbyGyms.map((gym, i) => {
                    const lat = (gym as any).lat || gym.center?.lat;
                    const lon = (gym as any).lon || gym.center?.lon;
                    if (!lat || !lon) return null;
                    const gymName = gym.tags?.name || gym.tags?.amenity || gym.tags?.leisure || 'Unnamed Gym';
                    const address = `${gym.tags?.addr_street || ''} ${gym.tags?.addr_city || ''}`.trim();
                    return (
                      <div key={gym.id ?? i} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                        <h4 className="text-white font-semibold">{gymName}</h4>
                        {address && <p className="text-gray-300 text-sm mt-1">{address}</p>}
                        <p className="text-gray-400 text-xs mt-1">
                          {Math.abs(lat).toFixed(4)}° {lat >= 0 ? 'N' : 'S'}, {Math.abs(lon).toFixed(4)}° {lon >= 0 ? 'E' : 'W'}
                        </p>
                        <div className="mt-2 flex items-center text-xs text-gray-400">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>Click on map marker for details</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {nearbyGyms.length === 0 && !loadingGyms && userLocation && (
              <div className="col-span-full mt-6 text-center py-8 bg-gray-800 rounded-xl border border-gray-700">
                <MapPin className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">No gyms found in your area. Try searching another location or increasing the search radius.</p>
              </div>
            )}
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

        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Profile Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <input type="text" defaultValue={user?.name} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input type="email" defaultValue={user?.email} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Subscription Plan</label>
                  <select value={user?.subscription} onChange={(e) => handleSubscriptionChange(e.target.value)} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="FitPass">FitPass</option>
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                    <option value="Unlimited">Unlimited</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Subscription Expiry</label>
                  <input type="date" value={user?.subscriptionExpiry || ''} onChange={(e) => setUser({ ...user, subscriptionExpiry: e.target.value })} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg transition-colors">Update Profile</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
