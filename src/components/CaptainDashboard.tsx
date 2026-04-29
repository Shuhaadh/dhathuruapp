import { useEffect, useState } from 'react';
import { Menu, TrendingUp, MapPin, Calendar, DollarSign } from 'lucide-react';
import { getCaptainConfirmedBookings, getAvailableBookingRequests, getCaptainBids } from '../services/captainBidService';
import { auth } from '../config/firebase';
import NotificationBadge from './NotificationBadge';
import CaptainBottomNav from './CaptainBottomNav';

interface CaptainDashboardProps {
  onNavigate: (screen: string, data?: any) => void;
}

export default function CaptainDashboard({ onNavigate }: CaptainDashboardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    confirmedBookings: 0,
    totalEarnings: 0,
    availableRequests: 0,
    activeBids: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const confirmedBookings = await getCaptainConfirmedBookings(user.uid);
    const totalEarnings = confirmedBookings.reduce((sum, booking) => sum + (booking.finalPrice || 0), 0);

    const availableRequests = await getAvailableBookingRequests();

    const allBids = await getCaptainBids(user.uid);
    const activeBids = allBids.filter(bid => bid.status === 'pending');

    setStats({
      confirmedBookings: confirmedBookings.length,
      totalEarnings,
      availableRequests: availableRequests.length,
      activeBids: activeBids.length
    });

    setLoading(false);
  }

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
                  onClick={() => { setMenuOpen(false); onNavigate('captain-dashboard'); }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
                  style={{ color: '#0A2463' }}
                >
                  🏠 Dashboard
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onNavigate('available-requests'); }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
                  style={{ color: '#0A2463' }}
                >
                  📋 Available Requests
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onNavigate('my-taken-bookings'); }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
                  style={{ color: '#0A2463' }}
                >
                  💼 My Taken Bookings
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onNavigate('confirmed-bookings'); }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
                  style={{ color: '#0A2463' }}
                >
                  ✅ Confirmed Bookings
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onNavigate('captain-profile'); }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100"
                  style={{ color: '#0A2463' }}
                >
                  👤 Profile
                </button>
                <button
                  onClick={() => { setMenuOpen(false); onNavigate('captain-settings'); }}
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
           style={{ background: 'linear-gradient(180deg, #0A2463 0%, #3BCEAC 100%)' }}>
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setMenuOpen(true)} className="text-white">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl">Captain Dashboard</h1>
          <NotificationBadge onClick={() => onNavigate('notifications-list-captain')} />
        </div>
        <p className="text-white/80">Select an action to view bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="px-6 -mt-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-600">Total Earnings</p>
            <p className="text-2xl font-bold text-[#0A2463]">MVR {stats.totalEarnings}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-600">Confirmed Bookings</p>
            <p className="text-2xl font-bold text-[#0A2463]">{stats.confirmedBookings}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-gray-600">New Requests</p>
            <p className="text-2xl font-bold text-[#0A2463]">{stats.availableRequests}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-600">Active Bids</p>
            <p className="text-2xl font-bold text-[#0A2463]">{stats.activeBids}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <h3 className="text-[#001D39] font-bold mb-4">Quick Actions</h3>
        
        <div className="space-y-3">
          <button
            onClick={() => onNavigate('available-requests')}
            className="w-full bg-white rounded-2xl shadow-lg p-5 flex items-center justify-between hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#BDD8E9] flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#0A2463]" />
              </div>
              <div className="text-left">
                <p className="text-[#001D39] font-bold">View All Available Requests</p>
                <p className="text-sm text-gray-600">{stats.availableRequests} requests waiting</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#3BCEAC] flex items-center justify-center">
              <span className="text-white">→</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('my-taken-bookings')}
            className="w-full bg-white rounded-2xl shadow-lg p-5 flex items-center justify-between hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-left">
                <p className="text-[#001D39] font-bold">My Taken Bookings</p>
                <p className="text-sm text-gray-600">{stats.activeBids} active bids</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#3BCEAC] flex items-center justify-center">
              <span className="text-white">→</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('confirmed-bookings')}
            className="w-full bg-white rounded-2xl shadow-lg p-5 flex items-center justify-between hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-[#001D39] font-bold">Confirmed Bookings</p>
                <p className="text-sm text-gray-600">Trips you've won</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#3BCEAC] flex items-center justify-center">
              <span className="text-white">→</span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <CaptainBottomNav currentScreen="captain-dashboard" onNavigate={onNavigate} />
    </div>
  );
}