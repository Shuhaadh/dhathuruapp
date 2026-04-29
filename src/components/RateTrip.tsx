import { useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import StarRatingInput from './StarRatingInput';
import { submitRating } from '../services/ratingService';
import { auth } from '../config/firebase';
import { toast } from 'sonner';

interface RateTripProps {
  bookingId: string;
  captainId: string;
  captainName: string;
  route: string;
  onBack: () => void;
}

export default function RateTrip({ bookingId, captainId, captainName, route, onBack }: RateTripProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a star rating');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      toast.error('Please login first');
      return;
    }

    setSubmitting(true);

    try {
      await submitRating(
        bookingId,
        user.uid,
        user.displayName || 'Customer',
        captainId,
        rating,
        review
      );

      toast.success('Thank you for your review! ⭐');
      
      // Go back after short delay
      setTimeout(() => {
        onBack();
      }, 1500);
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating. Please try again.');
      setSubmitting(false);
    }
  };

  const ratingLabels = [
    '', // 0 stars
    'Poor',
    'Fair',
    'Good',
    'Very Good',
    'Excellent'
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#BDD8E9' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center"
           style={{ background: 'linear-gradient(90deg, #0A2463 0%, #3BCEAC 100%)' }}>
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4"
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#0A2463' }} />
        </button>
        <h1 className="text-white text-xl">Rate Your Trip</h1>
      </div>

      <div className="px-6 mt-6">
        {/* Trip Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-[#BDD8E9] flex items-center justify-center">
              <Star className="w-8 h-8 text-[#0A2463]" />
            </div>
            <div>
              <h2 className="text-[#001D39] text-xl font-bold">{captainName}</h2>
              <p className="text-gray-600">{route}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            How was your experience with this captain?
          </p>
        </div>

        {/* Rating Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-[#001D39] font-bold mb-4">Your Rating</h3>
          
          <div className="flex flex-col items-center mb-4">
            <StarRatingInput value={rating} onChange={setRating} />
            {rating > 0 && (
              <p className="mt-3 text-lg font-bold text-[#0A2463]">
                {ratingLabels[rating]}
              </p>
            )}
          </div>

          {/* Review Text */}
          <div className="mt-6">
            <label className="block text-[#001D39] mb-2">
              Share your experience (Optional)
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] resize-none"
              placeholder="Tell us about your trip, the captain's service, boat condition, etc."
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1 text-right">
              {review.length}/500 characters
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={submitting || rating === 0}
          className="w-full h-14 text-white rounded-xl shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed mb-8"
          style={{ backgroundColor: '#0A2463' }}
        >
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>

        {/* Skip Option */}
        <button
          onClick={onBack}
          className="w-full h-12 text-gray-600 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition-colors mb-8"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}