import { useEffect, useState } from 'react';
import { ArrowLeft, Star, User } from 'lucide-react';
import { getCaptainRatings, getCaptainRatingStats, Rating } from '../services/ratingService';
import StarRating from './StarRating';

interface CaptainReviewsProps {
  captainId: string;
  captainName: string;
  onBack: () => void;
}

export default function CaptainReviews({ captainId, captainName, onBack }: CaptainReviewsProps) {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [stats, setStats] = useState({ averageRating: 0, totalReviews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, [captainId]);

  async function loadReviews() {
    const [ratingsData, statsData] = await Promise.all([
      getCaptainRatings(captainId),
      getCaptainRatingStats(captainId)
    ]);

    setRatings(ratingsData);
    setStats(statsData);
    setLoading(false);
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp || !timestamp.toDate) return '';
    
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    const count = ratings.filter(r => r.rating === star).length;
    const percentage = ratings.length > 0 ? (count / ratings.length) * 100 : 0;
    return { star, count, percentage };
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#BDD8E9' }}>
        <p className="text-[#001D39]">Loading reviews...</p>
      </div>
    );
  }

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
        <h1 className="text-white text-xl">Reviews</h1>
      </div>

      {/* Captain Info & Stats */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-[#001D39] text-xl font-bold mb-4">{captainName}</h2>
          
          {stats.totalReviews > 0 ? (
            <>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <p className="text-5xl font-bold text-[#0A2463]">
                    {stats.averageRating.toFixed(1)}
                  </p>
                  <StarRating rating={stats.averageRating} showNumber={false} size="large" />
                  <p className="text-sm text-gray-600 mt-2">
                    {stats.totalReviews} review{stats.totalReviews !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="flex-1 space-y-2">
                  {ratingDistribution.map(({ star, count, percentage }) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-8">{star}★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-400"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-8">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No reviews yet</p>
            </div>
          )}
        </div>

        {/* Reviews List */}
        {ratings.length > 0 && (
          <div className="space-y-4 pb-8">
            <h3 className="text-[#001D39] font-bold">All Reviews</h3>
            
            {ratings.map((rating) => (
              <div key={rating.id} className="bg-white rounded-2xl shadow-lg p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#BDD8E9] flex items-center justify-center">
                    <User className="w-5 h-5 text-[#0A2463]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#001D39] font-bold">{rating.customerName}</p>
                    <p className="text-xs text-gray-500">{formatDate(rating.createdAt)}</p>
                  </div>
                  <StarRating rating={rating.rating} showNumber={false} size="small" />
                </div>

                {rating.review && (
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {rating.review}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}