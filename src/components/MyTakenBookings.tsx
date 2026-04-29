import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Users, MessageCircle, Edit, X, TrendingUp } from 'lucide-react';
import { getCaptainBids } from '../services/captainBidService';
import { getBookingRequest, Bid, BookingRequest } from '../services/bookingService';
import { auth } from '../config/firebase';

interface MyTakenBookingsProps {
  onNavigate: (screen: string, data?: any) => void;
}

interface BidWithBooking extends Bid {
  booking?: BookingRequest;
}

export default function MyTakenBookings({ onNavigate }: MyTakenBookingsProps) {
  const [bids, setBids] = useState<BidWithBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBids();
  }, []);

  async function loadBids() {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    // Get captain's bids
    const captainBids = await getCaptainBids(user.uid);
    
    // Fetch booking details for each bid
    const bidsWithBookings: BidWithBooking[] = [];
    for (const bid of captainBids) {
      const booking = await getBookingRequest(bid.bookingId);
      if (booking && booking.status === 'pending') { // Only show pending bookings
        bidsWithBookings.push({ ...bid, booking });
      }
    }

    setBids(bidsWithBookings);
    setLoading(false);
  }

  function handleOpenChat(bid: BidWithBooking) {
    if (!bid.booking) return;
    
    onNavigate('chat', {
      bookingId: bid.bookingId,
      otherPersonName: bid.booking.customerName,
      otherPersonId: bid.booking.customerId,
      otherPersonType: 'customer',
      route: `${bid.booking.fromIsland} → ${bid.booking.toIsland}`,
      backScreen: 'my-taken-bookings'
    });
  }

  const totalBidValue = bids.reduce((sum, bid) => sum + bid.price, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#BDD8E9' }}>
        <p className="text-[#001D39]">Loading your bids...</p>
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
        <h1 className="text-white text-xl">My Taken Bookings</h1>
      </div>

      {/* Summary */}
      <div className="mx-6 mt-6 bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Active Offers</p>
            <p className="text-[#001D39] text-2xl font-bold">{bids.length}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-[#3BCEAC] text-2xl font-bold">MVR {totalBidValue}</p>
          </div>
        </div>
      </div>

      {/* Info Message */}
      <div className="mx-6 mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
        <p className="text-sm text-yellow-800">
          💡 You cannot see other captains or their offers. Wait for the customer to review and respond to your offer.
        </p>
      </div>

      {/* Bids List */}
      <div className="px-6 mt-6 space-y-4 pb-8">
        {bids.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-[#001D39] font-bold mb-2">No Active Offers</h3>
            <p className="text-gray-600 text-sm mb-4">
              You haven't submitted any offers yet. Browse available requests to start bidding!
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
          bids.map((bid) => {
            if (!bid.booking) return null;
            
            const booking = bid.booking;
            
            return (
              <div 
                key={bid.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Status Badge */}
                <div className={`px-5 py-2 ${
                  bid.status === 'pending' ? 'bg-yellow-50' : 'bg-gray-50'
                }`}>
                  <span className={`text-xs font-bold ${
                    bid.status === 'pending' ? 'text-yellow-800' : 'text-gray-800'
                  }`}>
                    {bid.status === 'pending' ? 'Waiting' : bid.status.toUpperCase()}
                  </span>
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
                        <p className="text-xs text-gray-500">{bid.departureTime}</p>
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

                  {/* Your Offer */}
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <p className="text-xs text-gray-600 mb-1">Your Offer</p>
                    <p className="text-[#0A2463] text-2xl font-bold">MVR {bid.price}</p>
                    {bid.message && (
                      <p className="text-sm text-gray-700 mt-2 italic">"{bid.message}"</p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleOpenChat(bid)}
                      className="h-12 bg-white border-2 border-[#3BCEAC] text-[#3BCEAC] rounded-xl flex items-center justify-center gap-2 font-medium"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Chat
                    </button>
                    
                    <button
                      onClick={() => onNavigate('update-offer')}
                      className="h-12 bg-white border-2 border-[#0A2463] text-[#0A2463] rounded-xl flex items-center justify-center gap-2 font-medium"
                    >
                      <Edit className="w-5 h-5" />
                      Update
                    </button>
                    
                    <button
                      className="h-12 bg-white border-2 border-red-500 text-red-500 rounded-xl flex items-center justify-center gap-2 font-medium"
                    >
                      <X className="w-5 h-5" />
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}