import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { subscribeToUnreadCount } from '../services/notificationService';
import { auth } from '../config/firebase';

interface NotificationBadgeProps {
  onClick: () => void;
  className?: string;
}

export default function NotificationBadge({ onClick, className = '' }: NotificationBadgeProps) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Subscribe to real-time unread count
    const unsubscribe = subscribeToUnreadCount(user.uid, (count) => {
      setUnreadCount(count);
    });

    return () => unsubscribe();
  }, []);

  return (
    <button onClick={onClick} className={`relative ${className}`}>
      <Bell className="w-6 h-6 text-white" />
      {unreadCount > 0 && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        </div>
      )}
    </button>
  );
}