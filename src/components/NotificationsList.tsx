import { useEffect, useState } from 'react';
import { ArrowLeft, MessageCircle, DollarSign, CheckCircle, X } from 'lucide-react';
import { 
  subscribeToNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  Notification 
} from '../services/notificationService';
import { auth } from '../config/firebase';

interface NotificationsListProps {
  onNavigate: (screen: string, data?: any) => void;
  userType: 'customer' | 'captain';
}

export default function NotificationsList({ onNavigate, userType }: NotificationsListProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    // Subscribe to real-time notifications
    const unsubscribe = subscribeToNotifications(user.uid, (notifs) => {
      setNotifications(notifs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read
    if (!notification.read && notification.id) {
      await markNotificationAsRead(notification.id);
    }

    // Navigate based on type
    if (notification.bookingId) {
      if (userType === 'customer') {
        onNavigate('interested-captains', notification.bookingId);
      } else {
        onNavigate('confirmed-bookings');
      }
    }
  };

  const handleMarkAllRead = async () => {
    const user = auth.currentUser;
    if (!user) return;
    
    await markAllNotificationsAsRead(user.uid);
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'new_message':
        return <MessageCircle className="w-6 h-6 text-blue-500" />;
      case 'new_bid':
        return <DollarSign className="w-6 h-6 text-green-500" />;
      case 'bid_accepted':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'bid_rejected':
        return <X className="w-6 h-6 text-red-500" />;
      case 'booking_confirmed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      default:
        return <MessageCircle className="w-6 h-6 text-gray-500" />;
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp || !timestamp.toDate) return 'Just now';
    
    const date = timestamp.toDate();
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#BDD8E9' }}>
        <p className="text-[#001D39]">Loading notifications...</p>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#BDD8E9' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between"
           style={{ background: 'linear-gradient(90deg, #0A2463 0%, #3BCEAC 100%)' }}>
        <div className="flex items-center">
          <button 
            onClick={() => onNavigate(userType === 'customer' ? 'customer-home' : 'captain-dashboard')} 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4"
          >
            <ArrowLeft className="w-5 h-5" style={{ color: '#0A2463' }} />
          </button>
          <h1 className="text-white text-xl">Notifications</h1>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="text-white text-sm underline"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Notifications Count */}
      <div className="px-6 pt-6 pb-4">
        <p className="text-[#001D39] text-lg">
          {unreadCount > 0 ? (
            <>
              <span className="font-bold">{unreadCount}</span> unread notification{unreadCount !== 1 ? 's' : ''}
            </>
          ) : (
            'All caught up! 🎉'
          )}
        </p>
      </div>

      {/* Notifications List */}
      <div className="px-6 space-y-3 pb-8">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-[#001D39] font-bold mb-2">No Notifications</h3>
            <p className="text-gray-600 text-sm">
              You'll see notifications here when you receive messages, bids, or booking updates.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`bg-white rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-shadow ${
                !notification.read ? 'border-2 border-[#3BCEAC]' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  !notification.read ? 'bg-blue-50' : 'bg-gray-50'
                }`}>
                  {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className={`font-bold ${
                      !notification.read ? 'text-[#0A2463]' : 'text-gray-800'
                    }`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-[#3BCEAC] rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatTime(notification.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}