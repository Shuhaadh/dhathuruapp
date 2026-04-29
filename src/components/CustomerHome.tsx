import { Menu, Map, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { useState } from 'react';
import IslandDropdown from './IslandDropdown';
import MapView from './MapView';
import { createBookingRequest } from '../services/bookingService';
import { auth } from '../config/firebase';
import NotificationBadge from './NotificationBadge';
import CustomerBottomNav from './CustomerBottomNav';

interface CustomerHomeProps {
  onNavigate: (screen: string, bookingId?: string) => void;
}

export default function CustomerHome({ onNavigate }: CustomerHomeProps) {
  const [formData, setFormData] = useState({
    tripType: 'oneway',
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: '',
    note: ''
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const popularRoutes = [
    'Male to Hulhumale',
    'Male to Maafushi',
    'Hulhumale to Maafushi',
    'Male to Thulusdhoo'
  ];

  const handleFindSpeedboat = async () => {
    if (!formData.from || !formData.to) {
      alert('Please select both departure and destination islands');
      return;
    }
    
    if (!formData.departureDate) {
      alert('Please select a departure date');
      return;
    }
    
    if (!formData.passengers || parseInt(formData.passengers) < 1) {
      alert('Please enter number of passengers');
      return;
    }
    
    if (formData.tripType === 'return' && !formData.returnDate) {
      alert('Please select a return date');
      return;
    }
    
    const user = auth.currentUser;
    if (!user) {
      alert('Please login first');
      return;
    }
    
    try {
      const bookingId = await createBookingRequest(
        user.uid,
        user.displayName || 'Customer',
        user.phoneNumber || '+960 000 0000',
        formData
      );
      
      onNavigate('interested-captains', bookingId);
      
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#BDD8E9' }}>
      {/* Sidebar Menu */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        >
          <div 
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#0A2463' }}>Menu</h2>
              
              <div className="space-y-2">
                <button
                  onClick={() => { setMenuOpen(false); onNavigate('customer-home'); }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
                  style={{ color: '#0A2463' }}
                >
                  🏠 Home
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onNavigate('my-orders'); }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
                  style={{ color: '#0A2463' }}
                >
                  📋 My Orders
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onNavigate('customer-profile'); }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
                  style={{ color: '#0A2463' }}
                >
                  👤 Profile
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onNavigate('customer-settings'); }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
                  style={{ color: '#0A2463' }}
                >
                  ⚙️ Settings
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onNavigate('welcome'); }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-red-600"
                >
                  🚪 Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="px-6 pt-12 pb-8"
           style={{
             background: 'linear-gradient(180deg, #0A2463 0%, #3BCEAC 100%)'
           }}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setMenuOpen(true)} className="text-white">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl">Dhathuru</h1>
          <NotificationBadge onClick={() => onNavigate('notifications-list-customer')} />
        </div>
        <h2 className="text-white text-3xl mb-2">Find Your Speedboat</h2>
        <p className="text-white/80">Book your inter-island journey</p>
      </div>

      {/* Map Section */}
      {formData.from && formData.to && (
        <div className="px-6 -mt-4 mb-6">
          <MapView fromIsland={formData.from} toIsland={formData.to} />
        </div>
      )}

      {/* Booking Form */}
      <div className="px-6 -mt-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl mb-6" style={{ color: '#0A2463' }}>Book Your Speedboat</h3>

          {/* Trip Type */}
          <div className="mb-6">
            <label className="block text-[#001D39] mb-3">Trip Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFormData({ ...formData, tripType: 'oneway' })}
                className={`h-14 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                  formData.tripType === 'oneway'
                    ? 'border-[#0A2463] bg-[#0A2463] text-white'
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                <ArrowRight className="w-5 h-5" />
                <span>One Way</span>
              </button>
              <button
                onClick={() => setFormData({ ...formData, tripType: 'return' })}
                className={`h-14 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                  formData.tripType === 'return'
                    ? 'border-[#0A2463] bg-[#0A2463] text-white'
                    : 'border-gray-300 text-gray-700'
                }`}
              >
                <ArrowLeftRight className="w-5 h-5" />
                <span>Return Trip</span>
              </button>
            </div>
          </div>

          {/* From Island */}
          <div className="mb-5">
            <label className="block text-[#001D39] mb-2">From Island</label>
            <IslandDropdown
              value={formData.from}
              onChange={(value) => setFormData({ ...formData, from: value })}
              placeholder="Select departure island"
            />
          </div>

          {/* To Island */}
          <div className="mb-5">
            <label className="block text-[#001D39] mb-2">To Island</label>
            <IslandDropdown
              value={formData.to}
              onChange={(value) => setFormData({ ...formData, to: value })}
              placeholder="Select destination island"
            />
          </div>

          {/* Departure Date */}
          <div className="mb-5">
            <label className="block text-[#001D39] mb-2">Departure Date</label>
            <input
              type="date"
              value={formData.departureDate}
              onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
            />
          </div>

          {/* Return Date */}
          {formData.tripType === 'return' && (
            <div className="mb-5">
              <label className="block text-[#001D39] mb-2">Return Date</label>
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
              />
            </div>
          )}

          {/* Number of Passengers */}
          <div className="mb-5">
            <label className="block text-[#001D39] mb-2">Number of Passengers</label>
            <input
              type="number"
              value={formData.passengers}
              onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
              placeholder="Enter number of passengers"
              min="1"
            />
          </div>

          {/* Special Note */}
          <div className="mb-6">
            <label className="block text-[#001D39] mb-2">Special Note (Optional)</label>
            <textarea
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] resize-none"
              placeholder="Add any special requests (e.g., heavy luggage, pet)"
            />
          </div>

          {/* Find Speedboat Button */}
          <button
            onClick={handleFindSpeedboat}
            className="w-full h-14 text-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            style={{ backgroundColor: '#0A2463' }}
          >
            Find Speedboat
          </button>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="px-6 mt-6 pb-8">
        <h3 className="text-[#001D39] mb-3">Popular Routes</h3>
        <div className="space-y-2">
          {popularRoutes.map((route) => (
            <button
              key={route}
              className="w-full text-left px-4 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              style={{ color: '#0A2463' }}
            >
              <Map className="w-4 h-4 inline mr-2" />
              {route}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <CustomerBottomNav currentScreen="customer-home" onNavigate={onNavigate} />
    </div>
  );
}