import { useEffect, useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Users, Clock, RefreshCw } from 'lucide-react';
import { getAvailableBookingRequests } from '../services/captainBidService';
import { BookingRequest } from '../services/bookingService';

interface AvailableRequestsProps {
  onNavigate: (screen: string, bookingId?: string) => void;
}

export default function AvailableRequests({ onNavigate }: AvailableRequestsProps) {
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRequests();

    // Auto-refresh every 10 seconds
    const interval = setInterval(loadRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  async function loadRequests() {
    const data = await getAvailableBookingRequests();
    setRequests(data);
    setLoading(false);
    setRefreshing(false);
  }

  async function handleRefresh() {
    setRefreshing(true);
    await loadRequests();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#BDD8E9' }}>
        <p className="text-[#001D39]">Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#BDD8E9' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between"
           style={{ background: 'linear-gradient(90deg, #0A2463 0%, #3BCEAC 100%)' }}>
        <div className="flex items-center">
          <button onClick={() => onNavigate('captain-dashboard')} 
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4">
            <ArrowLeft className="w-5 h-5" style={{ color: '#0A2463' }} />
          </button>
          <h1 className="text-white text-xl">Available Requests</h1>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={refreshing}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
        >
          <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} style={{ color: '#0A2463' }} />
        </button>
      </div>

      {/* Requests Count */}
      <div className="px-6 pt-6 pb-4">
        <p className="text-[#001D39] text-lg">
          <span className="font-bold">{requests.length}</span> {requests.length === 1 ? 'request' : 'requests'} available
        </p>
      </div>

      {/* Requests List */}
      <div className="px-6 space-y-4">
        {requests.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-[#001D39] font-bold mb-2">No Requests Available</h3>
            <p className="text-gray-600 text-sm">
              New booking requests will appear here when customers submit them.
            </p>
          </div>
        ) : (
          requests.map((request) => (
            <div 
              key={request.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-5">
                {/* Route */}
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-[#0A2463] mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-1">Route</p>
                    <p className="text-[#001D39] font-bold text-lg">
                      {request.fromIsland} → {request.toIsland}
                    </p>
                    <p className="text-sm text-gray-500">
                      {request.distance} km • ~{request.estimatedTime} min
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-[#0A2463] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600">Date</p>
                      <p className="text-sm text-[#001D39] font-medium">{request.departureDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-[#0A2463] mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-600">Passengers</p>
                      <p className="text-sm text-[#001D39] font-medium">{request.passengers} people</p>
                    </div>
                  </div>
                </div>

                {/* Special Notes */}
                {request.specialNotes && (
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <p className="text-xs text-gray-600 mb-1">Special Notes</p>
                    <p className="text-sm text-[#001D39]">{request.specialNotes}</p>
                  </div>
                )}

                {/* Expires */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Posted {getTimeAgo(request.createdAt)}</span>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onNavigate('submit-bid', request.id)}
                  className="w-full h-12 text-white rounded-xl font-medium"
                  style={{ backgroundColor: '#0A2463' }}
                >
                  Submit Your Offer
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="h-8"></div>
    </div>
  );
}

// Helper function to get time ago
function getTimeAgo(timestamp: any): string {
  if (!timestamp || !timestamp.toMillis) return 'just now';
  
  const now = Date.now();
  const time = timestamp.toMillis();
  const diff = now - time;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'just now';
  if (minutes === 1) return '1 minute ago';
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours === 1) return '1 hour ago';
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}