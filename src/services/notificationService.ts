import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';

export interface Notification {
  id?: string;
  userId: string; // Who receives this notification
  type: 'new_bid' | 'bid_accepted' | 'bid_rejected' | 'new_message' | 'booking_confirmed';
  title: string;
  message: string;
  bookingId?: string;
  bidId?: string;
  read: boolean;
  createdAt: any;
}

// Create a notification
export async function createNotification(
  userId: string,
  type: Notification['type'],
  title: string,
  message: string,
  bookingId?: string,
  bidId?: string
): Promise<void> {
  try {
    await addDoc(collection(db, 'notifications'), {
      userId,
      type,
      title,
      message,
      bookingId: bookingId || null,
      bidId: bidId || null,
      read: false,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error creating notification:', error);
  }
}

// Get user's notifications
export async function getUserNotifications(userId: string): Promise<Notification[]> {
  try {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const notifications: Notification[] = [];

    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() } as Notification);
    });

    return notifications;
  } catch (error) {
    console.error('Error getting notifications:', error);
    return [];
  }
}

// Subscribe to notifications (real-time)
export function subscribeToNotifications(
  userId: string,
  callback: (notifications: Notification[]) => void
): () => void {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const notifications: Notification[] = [];
    snapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() } as Notification);
    });
    callback(notifications);
  });
}

// Mark notification as read
export async function markNotificationAsRead(notificationId: string): Promise<void> {
  try {
    await updateDoc(doc(db, 'notifications', notificationId), {
      read: true
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
}

// Mark all notifications as read
export async function markAllNotificationsAsRead(userId: string): Promise<void> {
  try {
    const notifications = await getUserNotifications(userId);
    const unreadNotifications = notifications.filter(n => !n.read);

    for (const notification of unreadNotifications) {
      if (notification.id) {
        await markNotificationAsRead(notification.id);
      }
    }
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
  }
}

// Get unread count
export async function getUnreadNotificationCount(userId: string): Promise<number> {
  try {
    const notifications = await getUserNotifications(userId);
    return notifications.filter(n => !n.read).length;
  } catch (error) {
    console.error('Error getting unread count:', error);
    return 0;
  }
}

// Subscribe to unread count (real-time)
export function subscribeToUnreadCount(
  userId: string,
  callback: (count: number) => void
): () => void {
  return subscribeToNotifications(userId, (notifications) => {
    const unreadCount = notifications.filter(n => !n.read).length;
    callback(unreadCount);
  });
}