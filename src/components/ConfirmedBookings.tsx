import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Users, Phone, MessageCircle, TrendingUp } from 'lucide-react';
import { getCaptainConfirmedBookings } from '../services/captainBidService';
import { BookingRequest } from '../services/bookingService';
import { auth } from '../config/firebase';

interface ConfirmedBookingsProps {
  onNavigate: (screen: string, data?: any) => void;
}

export default function ConfirmedBookings({ onNavigate }: ConfirmedBookingsProps) {
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

    const data = await getCaptainConfirmedBookings(user.uid);
    setBookings(data);
    setLoading(false);
  }

  function handleOpenChat(booking: BookingRequest) {
    onNavigate('chat', {
      bookingId: booking.id,
      otherPersonName: booking.customerName,
      otherPersonId: booking.customerId,
      otherPersonType: 'customer',
      route: `${booking.fromIsland} → ${booking.toIsland}`,
      backScreen: 'confirmed-bookings' // Captain goes back to confirmed bookings
    });
  }

  const totalEarnings = bookings.reduce((sum, booking) => sum + (booking.finalPrice || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#BDD8E9' }}>
        <p className="text-[#001D39]">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#BDD8E9' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center"
           style={{ background: 'linear-gradient(90deg, #0A2463 0%, #3BCEAC 100%)' }}>
        <button onClick={() => onNavigate('captain-dashboard')} 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4">
          <ArrowLeft className="w-5 h-5" style={{ color: '#0A2463' }} />
        </button>
        <h1 className="text-white text-xl">Confirmed Bookings</h1>
      </div>

      {/* Summary Card */}
      <div className="mx-6 mt-6 bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">You have {bookings.length} confirmed bookings</p>
            <p className="text-[#001D39] text-2xl font-bold">Total earnings: MVR {totalEarnings}</p>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-6 mt-6 space-y-4 pb-8">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-[#001D39] font-bold mb-2">No Confirmed Bookings</h3>
            <p className="text-gray-600 text-sm mb-4">
              When customers accept your bids, they'll appear here.
            </p>
            <button
              onClick={() => onNavigate('available-requests')}
              className="px-6 py-2 text-white rounded-lg"
              style={{ backgroundColor: '#0A2463' }}
            >
              View Available Requests
            </button>
          </div>
        ) : (
          bookings.map((booking) => (
            <div 
              key={booking.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Success Banner */}
              <div className="bg-green-50 px-5 py-3 border-b border-green-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-green-800 font-bold text-sm">🎉 You won this booking!</p>
                </div>
                <p className="text-green-700 text-xs mt-1">Customer confirmed your offer</p>
              </div>

              <div className="p-5">
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

                {/* Trip Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-[#0A2463] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600">Date & Time</p>
                      <p className="text-sm text-[#001D39] font-medium">{booking.departureDate}</p>
                      <p className="text-xs text-gray-500">{booking.finalDepartureTime || 'TBD'}</p>
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

                {/* Your Earnings */}
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <p className="text-xs text-gray-600 mb-1">Your Earnings</p>
                  <p className="text-[#0A2463] text-2xl font-bold">MVR {booking.finalPrice || 0}</p>
                </div>

                {/* Customer Contact */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-xs text-gray-600 mb-2">Customer Contact</p>
                  <p className="text-[#001D39] font-bold">{booking.customerName}</p>
                  <p className="text-sm text-gray-600">{booking.customerPhone}</p>
                </div>

                {/* Special Notes */}
                {booking.specialNotes && (
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <p className="text-xs text-gray-600 mb-1">Special Notes</p>
                    <p className="text-sm text-[#001D39]">{booking.specialNotes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a 
                    href={`tel:${booking.customerPhone}`}
                    className="flex-1 h-12 bg-white border-2 border-[#0A2463] text-[#0A2463] rounded-xl flex items-center justify-center gap-2 font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    Call Customer
                  </a>
                  
                  <button
                    onClick={() => handleOpenChat(booking)}
                    className="flex-1 h-12 text-white rounded-xl flex items-center justify-center gap-2 font-medium"
                    style={{ backgroundColor: '#3BCEAC' }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    Message
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}