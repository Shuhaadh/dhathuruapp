import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Users, TrendingDown, MessageCircle, Trophy } from 'lucide-react';
import { getBookingRequest, getBidsForBooking, acceptBid, Bid, BookingRequest } from '../services/bookingService';
import { getCaptainRatingStats } from '../services/ratingService';
import StarRating from './StarRating';

interface InterestedCaptainsProps {
  bookingId: string;
  onBack: () => void;
  onNavigate?: (screen: string, data?: any) => void;
}

interface BidWithRating extends Bid {
  averageRating?: number;
  totalReviews?: number;
}

export default function InterestedCaptains({ bookingId, onBack, onNavigate }: InterestedCaptainsProps) {
  const [booking, setBooking] = useState<BookingRequest | null>(null);
  const [bids, setBids] = useState<BidWithRating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookingAndBids();
    
    // Poll for new bids every 5 seconds
    const interval = setInterval(loadBookingAndBids, 5000);
    return () => clearInterval(interval);
  }, [bookingId]);

  async function loadBookingAndBids() {
    const bookingData = await getBookingRequest(bookingId);
    const bidsData = await getBidsForBooking(bookingId);
    
    // Fetch ratings for each captain
    const bidsWithRatings: BidWithRating[] = await Promise.all(
      bidsData.map(async (bid) => {
        const stats = await getCaptainRatingStats(bid.captainId);
        return { ...bid, ...stats };
      })
    );
    
    setBooking(bookingData);
    setBids(bidsWithRatings);
    setLoading(false);
  }

  async function handleAcceptBid(bidId: string) {
    if (!confirm('Are you sure you want to accept this offer? Other offers will be automatically rejected.')) {
      return;
    }

    try {
      await acceptBid(bookingId, bidId);
      loadBookingAndBids(); // Reload to show updated status
    } catch (error) {
      alert('Failed to accept bid. Please try again.');
    }
  }

  function handleViewReviews(captainId: string, captainName: string) {
    if (onNavigate) {
      onNavigate('captain-reviews', { captainId, captainName });
    }
  }

  function handleOpenChat(captainName: string, captainId: string) {
    if (onNavigate && booking) {
      onNavigate('chat', {
        bookingId: booking.id,
        otherPersonName: captainName,
        otherPersonId: captainId,
        otherPersonType: 'captain',
        route: `${booking.fromIsland} → ${booking.toIsland}`,
        backScreen: 'interested-captains'
      });
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#BDD8E9' }}>
        <p className="text-[#001D39]">Loading offers...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#BDD8E9' }}>
        <p className="text-[#001D39]">Booking not found</p>
      </div>
    );
  }

  const lowestPrice = bids.length > 0 ? Math.min(...bids.map(b => b.price)) : 0;
  const confirmedBid = bids.find(b => b.status === 'accepted');

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#BDD8E9' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center"
           style={{ background: 'linear-gradient(90deg, #0A2463 0%, #3BCEAC 100%)' }}>
        <button onClick={onBack} className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4">
          <ArrowLeft className="w-5 h-5" style={{ color: '#0A2463' }} />
        </button>
        <h1 className="text-white text-xl">
          {booking.status === 'confirmed' ? 'Booking Confirmed' : 'Captain Offers'}
        </h1>
      </div>

      {/* Trip Summary */}
      <div className="mx-6 mt-6 bg-white rounded-2xl shadow-lg p-5">
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

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0A2463]" />
            <div>
              <p className="text-xs text-gray-600">Date</p>
              <p className="text-sm text-[#001D39] font-medium">{booking.departureDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#0A2463]" />
            <div>
              <p className="text-xs text-gray-600">Passengers</p>
              <p className="text-sm text-[#001D39] font-medium">{booking.passengers} people</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Message */}
      {booking.status === 'pending' && bids.length === 0 && (
        <div className="mx-6 mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⏳ Waiting for captain offers... You'll be notified when captains submit their bids!
          </p>
        </div>
      )}

      {/* Confirmed Booking */}
      {booking.status === 'confirmed' && confirmedBid && (
        <div className="mx-6 mt-6">
          <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-5 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-green-800 font-bold text-lg">Booking Confirmed!</p>
                <p className="text-green-700 text-sm">Your speedboat is ready</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[#001D39] font-bold text-lg">{confirmedBid.captainName}</p>
                  <p className="text-sm text-gray-600">{confirmedBid.speedboatName}</p>
                  <div className="mt-2">
                    <StarRating 
                      rating={confirmedBid.averageRating || 0} 
                      totalReviews={confirmedBid.totalReviews}
                      size="small"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Final Price</p>
                  <p className="text-2xl font-bold text-[#0A2463]">MVR {confirmedBid.price}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600">Departure</p>
                  <p className="text-sm font-bold text-[#001D39]">{confirmedBid.departureTime}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600">Arrival</p>
                  <p className="text-sm font-bold text-[#001D39]">{confirmedBid.arrivalTime}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${confirmedBid.captainPhone}`}
                  className="h-12 bg-[#3BCEAC] text-white rounded-xl flex items-center justify-center font-medium"
                >
                  📞 Call
                </a>
                <button
                  onClick={() => handleOpenChat(confirmedBid.captainName, confirmedBid.captainId)}
                  className="h-12 bg-white border-2 border-[#3BCEAC] text-[#3BCEAC] rounded-xl flex items-center justify-center gap-2 font-medium"
                >
                  <MessageCircle className="w-5 h-5" />
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bids List */}
      {booking.status === 'pending' && bids.length > 0 && (
        <div className="px-6 mt-6 space-y-4 pb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-[#001D39] font-bold">
              Captain Offers ({bids.length})
            </h3>
            {lowestPrice > 0 && (
              <div className="flex items-center gap-1 text-green-600">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-bold">Lowest: MVR {lowestPrice}</span>
              </div>
            )}
          </div>

          {bids.map((bid) => (
            <div 
              key={bid.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                bid.price === lowestPrice ? 'border-2 border-green-500' : ''
              }`}
            >
              {bid.price === lowestPrice && (
                <div className="bg-green-500 px-4 py-2 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-bold">Lowest Price</span>
                </div>
              )}

              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-[#001D39] font-bold text-lg">{bid.captainName}</h4>
                      {(bid.averageRating || 0) >= 4.5 && (
                        <Trophy className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{bid.speedboatName}</p>
                    
                    {/* Rating */}
                    {(bid.totalReviews || 0) > 0 ? (
                      <button
                        onClick={() => handleViewReviews(bid.captainId, bid.captainName)}
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        <StarRating 
                          rating={bid.averageRating || 0} 
                          totalReviews={bid.totalReviews}
                          size="small"
                        />
                      </button>
                    ) : (
                      <p className="text-xs text-gray-500">No reviews yet</p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-600">Price</p>
                    <p className="text-2xl font-bold text-[#0A2463]">MVR {bid.price}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600">Departure</p>
                    <p className="text-sm font-bold text-[#001D39]">{bid.departureTime}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600">Arrival</p>
                    <p className="text-sm font-bold text-[#001D39]">{bid.arrivalTime}</p>
                  </div>
                </div>

                {bid.message && (
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-700 italic">"{bid.message}"</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleOpenChat(bid.captainName, bid.captainId)}
                    className="h-12 bg-white border-2 border-[#3BCEAC] text-[#3BCEAC] rounded-xl flex items-center justify-center gap-2 font-medium"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Message
                  </button>
                  <button
                    onClick={() => handleAcceptBid(bid.id!)}
                    className="h-12 text-white rounded-xl font-medium"
                    style={{ backgroundColor: '#0A2463' }}
                  >
                    Accept Offer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}