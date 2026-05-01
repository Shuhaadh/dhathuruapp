import { ArrowLeft, MapPin, Calendar, Users, DollarSign, MessageCircle, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { getCaptainConfirmedBookings } from '../services/captainBidService';

interface ConfirmedBookingsProps {
  onNavigate: (screen: string, data?: any) => void;
}

interface Booking {
  id: string;
  from: string;
  to: string;
  departureDate: string;
  passengers: string;
  finalPrice: number;
  customerName: string;
  customerPhone: string;
  note?: string;
  customerId: string;
}

export default function ConfirmedBookings({ onNavigate }: ConfirmedBookingsProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    loadConfirmedBookings();
  }, []);

  async function loadConfirmedBookings() {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const confirmedBookings = await getCaptainConfirmedBookings(user.uid);
    setBookings(confirmedBookings);

    const total = confirmedBookings.reduce((sum, booking) => sum + (booking.finalPrice || 0), 0);
    setTotalEarnings(total);

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#BDD8E9' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0A2463] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#0A2463]">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#BDD8E9' }}>
      {/* Header */}
      <div className="px-6 pt-12 pb-6"
           style={{ background: 'linear-gradient(180deg, #0A2463 0%, #3BCEAC 100%)' }}>
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => onNavigate('captain-dashboard')}
            className="text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl">Confirmed Bookings</h1>
        </div>
        <p className="text-white/80">You have {bookings.length} confirmed bookings</p>
      </div>

      {/* Total Earnings Card */}
      <div className="px-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total earnings: MVR {totalEarnings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-6 space-y-4">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-500">No confirmed bookings yet</p>
            <button
              onClick={() => onNavigate('available-requests')}
              className="mt-4 px-6 py-2 bg-[#0A2463] text-white rounded-lg"
            >
              Browse Available Requests
            </button>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl shadow-lg p-6">
              {/* Won Badge */}
              <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-700 font-medium">🎉 You won this booking!</p>
                <p className="text-sm text-green-600">Customer confirmed your offer</p>
              </div>

              {/* Route */}
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-[#0A2463] mt-1" />
                <div>
                  <p className="font-semibold text-[#0A2463]">{booking.from} → {booking.to}</p>
                  <p className="text-sm text-gray-500">0 km • ~0 min</p>
                </div>
              </div>

              {/* Date & Passengers */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-medium text-[#0A2463]">{booking.departureDate}</p>
                    <p className="text-sm text-gray-600">06:30</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Passengers</p>
                    <p className="font-medium text-[#0A2463]">{booking.passengers} people</p>
                  </div>
                </div>
              </div>

              {/* Your Earnings */}
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600 mb-1">Your Earnings</p>
                <p className="text-3xl font-bold text-green-600">MVR {booking.finalPrice}</p>
              </div>

              {/* Customer Contact */}
              <div className="border-t pt-4">
                <p className="text-sm font-semibold text-gray-600 mb-3">Customer Contact</p>
                <p className="font-medium text-[#0A2463] mb-1">{booking.customerName}</p>
                <p className="text-gray-600 mb-3">{booking.customerPhone}</p>

                {booking.note && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Special Notes</p>
                    <p className="text-gray-700">{booking.note}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      window.location.href = `tel:${booking.customerPhone}`;
                    }}
                    className="flex items-center justify-center gap-2 h-12 border-2 border-[#0A2463] text-[#0A2463] rounded-lg hover:bg-[#0A2463] hover:text-white transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Call Customer
                  </button>

                  <button
                    onClick={() => onNavigate('chat', {
                      bookingId: booking.id,
                      otherPersonName: booking.customerName,
                      otherPersonId: booking.customerId,
                      otherPersonType: 'customer',
                      route: `${booking.from} → ${booking.to}`,
                      backScreen: 'confirmed-bookings'
                    })}
                    className="flex items-center justify-center gap-2 h-12 bg-[#3BCEAC] text-white rounded-lg hover:bg-[#2eb899] transition-colors"
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