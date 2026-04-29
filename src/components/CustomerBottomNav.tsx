import { Home, FileText, PlusCircle, MessageCircle, User } from 'lucide-react';

interface CustomerBottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export default function CustomerBottomNav({ currentScreen, onNavigate }: CustomerBottomNavProps) {
  const tabs = [
    { id: 'customer-home', label: 'Home', icon: Home },
    { id: 'my-orders', label: 'Orders', icon: FileText },
    { id: 'customer-home', label: 'Book', icon: PlusCircle, isBookButton: true },
    { id: 'notifications-list-customer', label: 'Alerts', icon: MessageCircle },
    { id: 'customer-profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
      <div className="flex items-center justify-around h-16 max-w-2xl mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;
          
          // Special styling for Book button (center button)
          if (tab.isBookButton) {
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className="flex flex-col items-center justify-center -mt-8"
              >
                <div 
                  className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, #0A2463 0%, #3BCEAC 100%)'
                  }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs mt-1 font-medium" style={{ color: '#0A2463' }}>
                  {tab.label}
                </span>
              </button>
            );
          }

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