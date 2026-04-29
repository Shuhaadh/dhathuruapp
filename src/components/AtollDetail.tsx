import { ArrowLeft, MapPin, Calendar, Users, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AtollDetailProps {
  onNavigate: (screen: string) => void;
  atollName: string;
  orderCount: number;
}

interface BookingRequest {
  id: string;
  route: { from: string; to: string };
  pickupLocation: string;
  date: string;
  time: string;
  passengers: number;
  customerName: string;
  price: number;
  isNew: boolean;
}

export default function AtollDetail({ onNavigate, atollName, orderCount }: AtollDetailProps) {
  // Mock booking requests data
  const bookingRequests: BookingRequest[] = Array.from({ length: orderCount }, (_, i) => ({
    id: `BK${1000 + i}`,
    route: {
      from: i % 2 === 0 ? 'Velidhoo' : 'Manadhoo',
      to: i % 2 === 0 ? 'Manadhoo' : 'Velidhoo',
    },
    pickupLocation: i % 2 === 0 ? 'Velidhoo Harbor' : 'Manadhoo Beach',
    date: i % 2 === 0 ? '25 Dec 2025' : '26 Dec 2025',
    time: i % 2 === 0 ? '09:00 AM' : '02:30 PM',
    passengers: i % 3 === 0 ? 4 : i % 2 === 0 ? 2 : 6,
    customerName: i % 3 === 0 ? 'Ahmed Ali' : i % 2 === 0 ? 'Fatima Hassan' : 'Mohamed Ibrahim',
    price: 500 + i * 100,
    isNew: true,
  }));

  const handleAccept = (bookingId: string) => {
    toast.success(`Booking ${bookingId} accepted`);
  };

  const handleDecline = (bookingId: string) => {
    toast.error(`Booking ${bookingId} declined`);
  };

  return (
    <div className="min-h-screen bg-[#E8F4F8]">
      {/* Header */}
      <div className="bg-[#0A2463] text-white p-4 shadow-md">
        <div className="max-w-[375px] mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => onNavigate('captain-dashboard')} className="p-1">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg">{atollName} Atoll</h1>
          </div>
          <p className="text-sm text-white/80 ml-10">{orderCount} New Booking Request{orderCount !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="max-w-[375px] mx-auto p-4 pb-24">
        <div className="space-y-4">
          {bookingRequests.map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl p-4 shadow-sm relative">
              {/* NEW Badge and Price */}
              <div className="flex items-start justify-between mb-3">
                {booking.isNew && (
                  <span className="bg-[#EF4444] text-white text-xs px-3 py-1 rounded-full">
                    NEW
                  </span>
                )}
                <span className="text-[#0A2463] ml-auto">
                  MVR {booking.price}
                </span>
              </div>

              {/* Route */}
              <div className="mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#1A1A1A]">{booking.route.from}</span>
                  <span className="text-[#3BCEAC]">→</span>
                  <span className="text-[#1A1A1A]">{booking.route.to}</span>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{booking.pickupLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-600">{booking.date} at {booking.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-600">{booking.passengers} Passenger{booking.passengers !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-600">{booking.customerName}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleAccept(booking.id)}
                  className="flex-1 bg-[#0A2463] text-white py-3 rounded-xl hover:bg-[#0A2463]/90 transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDecline(booking.id)}
                  className="flex-1 bg-white text-[#0A2463] border-2 border-[#0A2463] py-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
