import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number; // 0-5
  totalReviews?: number;
  size?: 'small' | 'medium' | 'large';
  showNumber?: boolean;
}

export default function StarRating({ 
  rating, 
  totalReviews, 
  size = 'medium',
  showNumber = true 
}: StarRatingProps) {
  const starSize = size === 'small' ? 'w-3 h-3' : size === 'large' ? 'w-6 h-6' : 'w-4 h-4';
  const textSize = size === 'small' ? 'text-xs' : size === 'large' ? 'text-lg' : 'text-sm';

  return (
    <div className="flex items-center gap-1">
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= Math.round(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
      
      {/* Rating number */}
      {showNumber && rating > 0 && (
        <span className={`${textSize} font-bold text-gray-700`}>
          {rating.toFixed(1)}
        </span>
      )}
      
      {/* Review count */}
      {totalReviews !== undefined && totalReviews > 0 && (
        <span className={`${textSize} text-gray-500`}>
          ({totalReviews})
        </span>
      )}
    </div>
  );
}