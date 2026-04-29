import { useState, useEffect } from 'react';
import { ArrowLeft, DollarSign, Clock, MessageSquare } from 'lucide-react';
import { submitBid } from '../services/captainBidService';
import { getBookingRequest, BookingRequest } from '../services/bookingService';
import { auth } from '../config/firebase';

interface SubmitBidProps {
  bookingId: string;
  onNavigate: (screen: string) => void;
}

export default function SubmitBid({ bookingId, onNavigate }: SubmitBidProps) {
  const [booking, setBooking] = useState<BookingRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    price: '',
    departureTime: '',
    arrivalTime: '',
    message: ''
  });

  useEffect(() => {
    loadBooking();
  }, [bookingId]);

  async function loadBooking() {
    const data = await getBookingRequest(bookingId);
    setBooking(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validation
    if (!formData.price || parseFloat(formData.price) < 100) {
      alert('Please enter a valid price (minimum MVR 100)');
      return;
    }

    if (!formData.departureTime || !formData.arrivalTime) {
      alert('Please enter both departure and arrival times');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert('Please login first');
      return;
    }

    setSubmitting(true);

    try {
      // TODO: Get captain details from Firestore captain profile
      // For now, using user data
      await submitBid(
        bookingId,
        user.uid,
        user.displayName || 'Captain',
        'My Speedboat', // TODO: Get from captain profile
        user.phoneNumber || '+960 000 0000',
        {
          price: parseFloat(formData.price),
          departureTime: formData.departureTime,
          arrivalTime: formData.arrivalTime,
          message: formData.message
        }
      );

      alert('Bid submitted successfully! The customer will be notified.');
      onNavigate('available-requests');
    } catch (error) {
      console.error('Error submitting bid:', error);
      alert('Failed to submit bid. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#BDD8E9' }}>
        <p className="text-[#001D39]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#BDD8E9' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center"
           style={{ background: 'linear-gradient(90deg, #0A2463 0%, #3BCEAC 100%)' }}>
        <button onClick={() => onNavigate('available-requests')} 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4">
          <ArrowLeft className="w-5 h-5" style={{ color: '#0A2463' }} />
        </button>
        <h1 className="text-white text-xl">Submit Your Offer</h1>
      </div>

      {/* Booking Details */}
      <div className="mx-6 mt-6 bg-white rounded-2xl shadow-lg p-5 mb-6">
        <h2 className="text-[#001D39] font-bold text-lg mb-3">Booking Details</h2>
        <div className="space-y-2">
          <div>
            <p className="text-xs text-gray-600">Route</p>
            <p className="text-[#001D39] font-medium">
              {booking.fromIsland} → {booking.toIsland}
            </p>
            <p className="text-xs text-gray-500">{booking.distance} km • ~{booking.estimatedTime} min</p>
          </div>
          <div className="flex gap-4">
            <div>
              <p className="text-xs text-gray-600">Date</p>
              <p className="text-sm text-[#001D39]">{booking.departureDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Passengers</p>
              <p className="text-sm text-[#001D39]">{booking.passengers} people</p>
            </div>
          </div>
          {booking.specialNotes && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-600">Customer Notes</p>
              <p className="text-sm text-[#001D39]">{booking.specialNotes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Bid Form */}
      <form onSubmit={handleSubmit}>
        <div className="mx-6 bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-[#001D39] font-bold text-lg mb-4">Your Offer</h2>

          <div className="space-y-4">
            {/* Price */}
            <div>
              <label className="block text-[#001D39] mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Your Price (MVR)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
                placeholder="e.g., 1500"
                min="100"
                step="50"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Suggested: MVR {Math.round(booking.distance * 150)} - {Math.round(booking.distance * 250)}</p>
            </div>

            {/* Departure Time */}
            <div>
              <label className="block text-[#001D39] mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Departure Time
              </label>
              <input
                type="time"
                value={formData.departureTime}
                onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
                required
              />
            </div>

            {/* Arrival Time */}
            <div>
              <label className="block text-[#001D39] mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Estimated Arrival Time
              </label>
              <input
                type="time"
                value={formData.arrivalTime}
                onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-[#001D39] mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Message to Customer (Optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full h-24 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] resize-none"
                placeholder="e.g., New speedboat with comfortable seating"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mx-6 mb-6">
          <button
            type="submit"
            disabled={submitting}
            className="w-full h-14 text-white rounded-xl font-bold shadow-lg disabled:opacity-50"
            style={{ backgroundColor: '#3BCEAC' }}
          >
            {submitting ? 'Submitting...' : 'Submit Offer'}
          </button>
        </div>
      </form>
    </div>
  );
}