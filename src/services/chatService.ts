import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  getDocs,
  Timestamp
} from 'firebase/firestore';
import { createNotification } from './notificationService';
import { getBookingRequest } from './bookingService';

export interface Message {
  id?: string;
  bookingId: string;
  senderId: string;
  senderName: string;
  senderType: 'customer' | 'captain';
  text: string;
  createdAt: any;
  read: boolean;
}

export interface ChatInfo {
  bookingId: string;
  customerId: string;
  customerName: string;
  captainId: string;
  captainName: string;
  route: string;
}

// Send a message
export async function sendMessage(
  bookingId: string,
  senderId: string,
  senderName: string,
  senderType: 'customer' | 'captain',
  text: string
): Promise<void> {
  try {
    // Send the message
    await addDoc(collection(db, 'messages'), {
      bookingId,
      senderId,
      senderName,
      senderType,
      text: text.trim(),
      createdAt: serverTimestamp(),
      read: false
    });

    // Get booking details to find recipient
    const booking = await getBookingRequest(bookingId);
    if (!booking) return;

    // Determine recipient
    const recipientId = senderType === 'customer' ? booking.acceptedCaptainId : booking.customerId;
    const recipientName = senderType === 'customer' ? 'Captain' : booking.customerName;

    if (recipientId) {
      // Send notification to recipient
      await createNotification(
        recipientId,
        'new_message',
        `New message from ${senderName}`,
        text.substring(0, 100), // Preview of message
        bookingId
      );
    }
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

// Subscribe to messages for a booking (real-time)
export function subscribeToMessages(
  bookingId: string,
  callback: (messages: Message[]) => void
): () => void {
  const q = query(
    collection(db, 'messages'),
    where('bookingId', '==', bookingId),
    orderBy('createdAt', 'asc')
  );

  return onSnapshot(q, (snapshot) => {
    const messages: Message[] = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() } as Message);
    });
    callback(messages);
  });
}

// Get messages for a booking (one-time fetch)
export async function getMessages(bookingId: string): Promise<Message[]> {
  try {
    const q = query(
      collection(db, 'messages'),
      where('bookingId', '==', bookingId),
      orderBy('createdAt', 'asc')
    );

    const querySnapshot = await getDocs(q);
    const messages: Message[] = [];

    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() } as Message);
    });

    return messages;
  } catch (error) {
    console.error('Error getting messages:', error);
    return [];
  }
}

// Count unread messages
export async function getUnreadCount(
  bookingId: string,
  userId: string
): Promise<number> {
  try {
    const q = query(
      collection(db, 'messages'),
      where('bookingId', '==', bookingId),
      where('senderId', '!=', userId),
      where('read', '==', false)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting unread count:', error);
    return 0;
  }
}