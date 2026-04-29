import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc
} from 'firebase/firestore';

export interface Rating {
  id?: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  captainId: string;
  rating: number; // 1-5
  review: string;
  createdAt: any;
}

// Submit a rating
export async function submitRating(
  bookingId: string,
  customerId: string,
  customerName: string,
  captainId: string,
  rating: number,
  review: string
): Promise<void> {
  try {
    // Create rating
    await addDoc(collection(db, 'ratings'), {
      bookingId,
      customerId,
      customerName,
      captainId,
      rating,
      review: review.trim(),
      createdAt: serverTimestamp()
    });

    // Mark booking as rated
    await updateDoc(doc(db, 'bookingRequests', bookingId), {
      rated: true
    });

    // Update captain's average rating
    await updateCaptainRating(captainId);
  } catch (error) {
    console.error('Error submitting rating:', error);
    throw error;
  }
}

// Update captain's average rating
async function updateCaptainRating(captainId: string): Promise<void> {
  try {
    // Get all ratings for this captain
    const ratings = await getCaptainRatings(captainId);
    
    if (ratings.length === 0) return;

    // Calculate average
    const totalRating = ratings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / ratings.length;

    // Update captain document
    await updateDoc(doc(db, 'captains', captainId), {
      averageRating: parseFloat(averageRating.toFixed(2)),
      totalReviews: ratings.length
    });
  } catch (error) {
    console.error('Error updating captain rating:', error);
  }
}

// Get all ratings for a captain
export async function getCaptainRatings(captainId: string): Promise<Rating[]> {
  try {
    const q = query(
      collection(db, 'ratings'),
      where('captainId', '==', captainId)
    );

    const querySnapshot = await getDocs(q);
    const ratings: Rating[] = [];

    querySnapshot.forEach((doc) => {
      ratings.push({ id: doc.id, ...doc.data() } as Rating);
    });

    // Sort by most recent first
    return ratings.sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() || 0;
      const bTime = b.createdAt?.toMillis?.() || 0;
      return bTime - aTime;
    });
  } catch (error) {
    console.error('Error getting captain ratings:', error);
    return [];
  }
}

// Get captain's average rating and review count
export async function getCaptainRatingStats(captainId: string): Promise<{
  averageRating: number;
  totalReviews: number;
}> {
  try {
    const captainDoc = await getDoc(doc(db, 'captains', captainId));
    
    if (captainDoc.exists()) {
      const data = captainDoc.data();
      return {
        averageRating: data.averageRating || 0,
        totalReviews: data.totalReviews || 0
      };
    }

    return { averageRating: 0, totalReviews: 0 };
  } catch (error) {
    console.error('Error getting captain rating stats:', error);
    return { averageRating: 0, totalReviews: 0 };
  }
}

// Check if booking has been rated
export async function isBookingRated(bookingId: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'ratings'),
      where('bookingId', '==', bookingId)
    );

    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking if booking rated:', error);
    return false;
  }
}