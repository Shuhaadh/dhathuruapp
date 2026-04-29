import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { createNotification } from './notificationService';

export interface BookingRequest {
  id?: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  
  fromIsland: string;
  toIsland: string;
  distance: number;
  estimatedTime: number;
  
  departureDate: string;
  returnDate: string | null;
  tripType: 'oneway' | 'return';
  passengers: number;
  specialNotes: string;
  
  status: 'pending' | 'bidding' | 'confirmed' | 'completed' | 'cancelled';
  acceptedBidId?: string;
  acceptedCaptainId?: string;
  finalPrice?: number;
  finalDepartureTime?: string;
  
  createdAt: any;
  expiresAt: any;
  confirmedAt?: any;
  completedAt?: any;
}

export interface Bid {
  id?: string;
  bookingId: string;
  captainId: string;
  captainName: string;
  speedboatName: string;
  captainPhone: string;
  
  price: number;
  departureTime: string;
  arrivalTime: string;
  message: string;
  
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: any;
}

// Calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Island coordinates (subset - add more as needed)
const ISLAND_COORDINATES: Record<string, [number, number]> = {
  'Male City': [4.175496, 73.509347],
  'Hulhumale': [4.2167, 73.5333],
  'N. Lhohi': [5.5789, 73.3625],
  'N. Manadhoo': [5.7667, 73.4167],
  'K. Maafushi': [3.94231, 73.49070],
};

// Create a new booking request
export async function createBookingRequest(
  userId: string,
  userName: string,
  userPhone: string,
  formData: {
    from: string;
    to: string;
    departureDate: string;
    returnDate: string;
    tripType: 'oneway' | 'return';
    passengers: string;
    note: string;
  }
): Promise<string> {
  try {
    const fromCoords = ISLAND_COORDINATES[formData.from];
    const toCoords = ISLAND_COORDINATES[formData.to];
    
    let distance = 0;
    let estimatedTime = 0;
    
    if (fromCoords && toCoords) {
      distance = calculateDistance(fromCoords[0], fromCoords[1], toCoords[0], toCoords[1]);
      estimatedTime = Math.round((distance / 35) * 60);
    }
    
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 12 * 60 * 60 * 1000);
    
    const bookingData: Omit<BookingRequest, 'id'> = {
      customerId: userId,
      customerName: userName,
      customerPhone: userPhone,
      fromIsland: formData.from,
      toIsland: formData.to,
      distance: parseFloat(distance.toFixed(1)),
      estimatedTime,
      departureDate: formData.departureDate,
      returnDate: formData.tripType === 'return' ? formData.returnDate : null,
      tripType: formData.tripType,
      passengers: parseInt(formData.passengers),
      specialNotes: formData.note,
      status: 'pending',
      createdAt: serverTimestamp(),
      expiresAt: expiresAt
    };
    
    const docRef = await addDoc(collection(db, 'bookingRequests'), bookingData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

// Get booking request by ID
export async function getBookingRequest(bookingId: string): Promise<BookingRequest | null> {
  try {
    const docRef = doc(db, 'bookingRequests', bookingId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as BookingRequest;
    }
    return null;
  } catch (error) {
    console.error('Error getting booking:', error);
    return null;
  }
}

// Get all bids for a booking
export async function getBidsForBooking(bookingId: string): Promise<Bid[]> {
  try {
    const q = query(
      collection(db, 'bids'),
      where('bookingId', '==', bookingId)
    );
    
    const querySnapshot = await getDocs(q);
    const bids: Bid[] = [];
    
    querySnapshot.forEach((doc) => {
      bids.push({ id: doc.id, ...doc.data() } as Bid);
    });
    
    return bids.sort((a, b) => a.price - b.price);
  } catch (error) {
    console.error('Error getting bids:', error);
    return [];
  }
}

// Accept a bid
export async function acceptBid(bookingId: string, bidId: string): Promise<void> {
  try {
    const bidDoc = await getDoc(doc(db, 'bids', bidId));
    if (!bidDoc.exists()) throw new Error('Bid not found');
    
    const bidData = bidDoc.data() as Bid;
    
    // Update booking request
    await updateDoc(doc(db, 'bookingRequests', bookingId), {
      status: 'confirmed',
      acceptedBidId: bidId,
      acceptedCaptainId: bidData.captainId,
      finalPrice: bidData.price,
      finalDepartureTime: bidData.departureTime,
      confirmedAt: serverTimestamp()
    });
    
    // Update accepted bid
    await updateDoc(doc(db, 'bids', bidId), {
      status: 'accepted'
    });
    
    // Send notification to captain
    const booking = await getBookingRequest(bookingId);
    if (booking) {
      await createNotification(
        bidData.captainId,
        'bid_accepted',
        `🎉 Your offer was accepted!`,
        `${booking.customerName} accepted your MVR ${bidData.price} offer for ${booking.fromIsland} → ${booking.toIsland}`,
        bookingId,
        bidId
      );
    }
    
    // Reject all other bids and notify
    const allBids = await getBidsForBooking(bookingId);
    for (const bid of allBids) {
      if (bid.id !== bidId && bid.status === 'pending') {
        await updateDoc(doc(db, 'bids', bid.id!), {
          status: 'rejected'
        });
        
        // Notify rejected captains
        if (booking) {
          await createNotification(
            bid.captainId,
            'bid_rejected',
            'Offer not selected',
            `The customer chose another captain for ${booking.fromIsland} → ${booking.toIsland}`,
            bookingId,
            bid.id
          );
        }
      }
    }
  } catch (error) {
    console.error('Error accepting bid:', error);
    throw error;
  }
}

// Get customer's bookings
export async function getCustomerBookings(userId: string): Promise<BookingRequest[]> {
  try {
    const q = query(
      collection(db, 'bookingRequests'),
      where('customerId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    const bookings: BookingRequest[] = [];
    
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() } as BookingRequest);
    });
    
    return bookings.sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() || 0;
      const bTime = b.createdAt?.toMillis?.() || 0;
      return bTime - aTime;
    });
  } catch (error) {
    console.error('Error getting customer bookings:', error);
    return [];
  }
}