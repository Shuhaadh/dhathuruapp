import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Users, Clock } from 'lucide-react';
import { getCustomerBookings, BookingRequest } from '../services/bookingService';
import { auth } from '../config/firebase';

interface MyOrdersProps {
  onNavigate: (screen: string, bookingId?: string) => void;
}

export default function MyOrders({ onNavigate }: MyOrdersProps) {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const data = await getCustomerBookings(user.uid);
    setBookings(data);
    setLoading(false);
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  function getStatusText(status: string) {
    switch (status) {
      case 'pending':
        return 'Waiting for Offers';
      case 'confirmed':
        return 'Confirmed';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#BDD8E9' }}>
        <p className="text-[#001D39]">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#BDD8E9' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center"
           style={{ background: 'linear-gradient(90deg, #0A2463 0%, #3BCEAC 100%)' }}>
        <button onClick={() => onNavigate('customer-home')} 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4">
          <ArrowLeft className="w-5 h-5" style={{ color: '#0A2463' }} />
        </button>
        <h1 className="text-white text-xl">My Bookings</h1>
      </div>

      {/* Bookings Count */}
      <div className="px-6 pt-6 pb-4">
        <p className="text-[#001D39] text-lg">
          <span className="font-bold">{bookings.length}</span> {bookings.length === 1 ? 'booking' : 'bookings'}
        </p>
      </div>

      {/* Bookings List */}
      <div className="px-6 space-y-4 pb-8">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-[#001D39] font-bold mb-2">No Bookings Yet</h3>
            <p className="text-gray-600 text-sm mb-4">
              You haven't made any bookings yet. Start planning your journey!
            </p>
            <button
              onClick={() => onNavigate('customer-home')}
              className="px-6 py-2 text-white rounded-lg"
              style={{ backgroundColor: '#0A2463' }}
            >
              Book Now
            </button>
          </div>
        ) : (
          bookings.map((booking) => (
            <div 
              key={booking.id}
              onClick={() => onNavigate('interested-captains', booking.id)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="p-5">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </span>
                  {booking.finalPrice && (
                    <p className="text-[#0A2463] font-bold text-xl">MVR {booking.finalPrice}</p>
                  )}
                </div>

                {/* Route */}
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-[#0A2463] mt-0.5" />
                  <div className="flex-1">
                    <p className="text-[#001D39] font-bold text-lg">
                      {booking.fromIsland} → {booking.toIsland}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.distance} km • ~{booking.estimatedTime} min
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-[#0A2463] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600">Departure</p>
                      <p className="text-sm text-[#001D39] font-medium">{booking.departureDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-[#0A2463] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600">Passengers</p>
                      <p className="text-sm text-[#001D39] font-medium">{booking.passengers} people</p>
                    </div>
                  </div>
                </div>

                {/* Special Notes */}
                {booking.specialNotes && (
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <p className="text-xs text-gray-600">Special Notes</p>
                    <p className="text-sm text-[#001D39]">{booking.specialNotes}</p>
                  </div>
                )}

                {/* Created At */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Booked {formatDate(booking.createdAt)}</span>
                </div>

                {/* Action Hint */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-[#0A2463] font-medium text-center">
                    {booking.status === 'pending' ? 'Tap to view captain offers →' : 
                     booking.status === 'confirmed' ? 'Tap to view booking details →' :
                     'Tap to view details →'}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Helper function to format timestamp
function formatDate(timestamp: any): string {
  if (!timestamp || !timestamp.toDate) return 'Recently';
  
  const date = timestamp.toDate();
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}