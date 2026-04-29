import { Home, Briefcase, CheckCircle, MessageCircle, User } from 'lucide-react';

interface CaptainBottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export default function CaptainBottomNav({ currentScreen, onNavigate }: CaptainBottomNavProps) {
  const tabs = [
    { id: 'captain-dashboard', label: 'Home', icon: Home },
    { id: 'available-requests', label: 'Requests', icon: Briefcase },
    { id: 'my-taken-bookings', label: 'My Bids', icon: MessageCircle },
    { id: 'confirmed-bookings', label: 'Confirmed', icon: CheckCircle },
    { id: 'captain-profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
      <div className="flex items-center justify-around h-16 max-w-2xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="flex flex-col items-center justify-center flex-1 h-full transition-colors"
            >
              <Icon 
                className={`w-6 h-6 ${
                  isActive ? 'text-[#0A2463]' : 'text-gray-400'
                }`}
              />
              <span 
                className={`text-xs mt-1 ${
                  isActive ? 'text-[#0A2463] font-semibold' : 'text-gray-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}