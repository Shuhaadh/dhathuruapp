import { db } from '../config/firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { Bid, BookingRequest } from './bookingService';
import { createNotification } from './notificationService';

// Submit a new bid
export async function submitBid(
  bookingId: string,
  captainId: string,
  captainName: string,
  speedboatName: string,
  captainPhone: string,
  bidData: {
    price: number;
    departureTime: string;
    arrivalTime: string;
    message: string;
  }
): Promise<string> {
  try {
    const bid: Omit<Bid, 'id'> = {
      bookingId,
      captainId,
      captainName,
      speedboatName,
      captainPhone,
      price: bidData.price,
      departureTime: bidData.departureTime,
      arrivalTime: bidData.arrivalTime,
      message: bidData.message,
      status: 'pending',
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, 'bids'), bid);
    
    // Get booking to find customer
    const bookingDoc = await getDocs(query(collection(db, 'bookingRequests'), where('__name__', '==', bookingId)));
    if (!bookingDoc.empty) {
      const booking = bookingDoc.docs[0].data() as BookingRequest;
      
      // Send notification to customer
      await createNotification(
        booking.customerId,
        'new_bid',
        `New offer from ${captainName}`,
        `MVR ${bidData.price} for ${booking.fromIsland} → ${booking.toIsland}`,
        bookingId,
        docRef.id
      );
    }
    
    return docRef.id;
  } catch (error) {
    console.error('Error submitting bid:', error);
    throw error;
  }
}

// Get all available booking requests (pending status)
export async function getAvailableBookingRequests(): Promise<BookingRequest[]> {
  try {
    const q = query(
      collection(db, 'bookingRequests'),
      where('status', '==', 'pending')
    );

    const querySnapshot = await getDocs(q);
    const bookings: BookingRequest[] = [];

    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() } as BookingRequest);
    });

    // Sort by creation date (newest first)
    return bookings.sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() || 0;
      const bTime = b.createdAt?.toMillis?.() || 0;
      return bTime - aTime;
    });
  } catch (error) {
    console.error('Error getting available requests:', error);
    return [];
  }
}

// Get captain's bids
export async function getCaptainBids(captainId: string): Promise<Bid[]> {
  try {
    const q = query(
      collection(db, 'bids'),
      where('captainId', '==', captainId)
    );

    const querySnapshot = await getDocs(q);
    const bids: Bid[] = [];

    querySnapshot.forEach((doc) => {
      bids.push({ id: doc.id, ...doc.data() } as Bid);
    });

    // Sort by creation date (newest first)
    return bids.sort((a, b) => {
      const aTime = a.createdAt?.toMillis?.() || 0;
      const bTime = b.createdAt?.toMillis?.() || 0;
      return bTime - aTime;
    });
  } catch (error) {
    console.error('Error getting captain bids:', error);
    return [];
  }
}

// Get captain's confirmed bookings (where their bid was accepted)
export async function getCaptainConfirmedBookings(captainId: string): Promise<BookingRequest[]> {
  try {
    const q = query(
      collection(db, 'bookingRequests'),
      where('acceptedCaptainId', '==', captainId),
      where('status', '==', 'confirmed')
    );

    const querySnapshot = await getDocs(q);
    const bookings: BookingRequest[] = [];

    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() } as BookingRequest);
    });

    // Sort by departure date
    return bookings.sort((a, b) => {
      return new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime();
    });
  } catch (error) {
    console.error('Error getting confirmed bookings:', error);
    return [];
  }
}