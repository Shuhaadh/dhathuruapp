import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Switch } from '../ui/switch';
import { toast } from 'sonner@2.0.3';

interface NotificationsProps {
  onNavigate: (screen: string) => void;
  userType: 'customer' | 'captain';
}

export default function Notifications({ onNavigate, userType }: NotificationsProps) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  // Customer toggles
  const [bookingConfirmations, setBookingConfirmations] = useState(true);
  const [tripStatusUpdates, setTripStatusUpdates] = useState(true);
  const [messagesFromCaptain, setMessagesFromCaptain] = useState(true);
  const [promotions, setPromotions] = useState(false);
  
  // Captain toggles
  const [bookingRequests, setBookingRequests] = useState(true);
  const [paymentReminders, setPaymentReminders] = useState(true);
  const [messagesFromCustomers, setMessagesFromCustomers] = useState(true);
  const [accountStatusChanges, setAccountStatusChanges] = useState(true);

  const handleSave = () => {
    toast.success('Notification settings saved successfully');
    setTimeout(() => {
      onNavigate(userType === 'customer' ? 'customer-settings' : 'captain-settings');
    }, 1000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8F4F8' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4"
           style={{ backgroundColor: '#0A2463' }}>
        <button
          onClick={() => onNavigate(userType === 'customer' ? 'customer-settings' : 'captain-settings')}
          className="text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl">Notifications</h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Main Toggles */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[#001D39]">Push Notifications</h3>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[#001D39]">Email Notifications</h3>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
          </div>
        </div>

        {/* Notification Types Section */}
        <div>
          <h2 className="text-[#0A2463] mb-3 px-2">Notification Types</h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
            {userType === 'customer' ? (
              <>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-[#001D39]">New Booking Confirmations</h3>
                    <p className="text-sm text-[#666666] mt-1">Captain accepted your booking</p>
                  </div>
                  <Switch
                    checked={bookingConfirmations}
                    onCheckedChange={setBookingConfirmations}
                  />
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-[#001D39]">Trip Status Updates</h3>
                      <p className="text-sm text-[#666666] mt-1">Captain on the way, arrived, completed</p>
                    </div>
                    <Switch
                      checked={tripStatusUpdates}
                      onCheckedChange={setTripStatusUpdates}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-[#001D39]">Messages from Captain</h3>
                      <p className="text-sm text-[#666666] mt-1">When captain sends you a message</p>
                    </div>
                    <Switch
                      checked={messagesFromCaptain}
                      onCheckedChange={setMessagesFromCaptain}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-[#001D39]">Promotions & Updates</h3>
                      <p className="text-sm text-[#666666] mt-1">Special offers and new features</p>
                    </div>
                    <Switch
                      checked={promotions}
                      onCheckedChange={setPromotions}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-[#001D39]">New Booking Requests</h3>
                    <p className="text-sm text-[#666666] mt-1">When customers request your boat</p>
                  </div>
                  <Switch
                    checked={bookingRequests}
                    onCheckedChange={setBookingRequests}
                  />
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-[#001D39]">Payment Reminders</h3>
                      <p className="text-sm text-[#666666] mt-1">Subscription due date alerts</p>
                    </div>
                    <Switch
                      checked={paymentReminders}
                      onCheckedChange={setPaymentReminders}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-[#001D39]">Messages from Customers</h3>
                      <p className="text-sm text-[#666666] mt-1">When customers contact you</p>
                    </div>
                    <Switch
                      checked={messagesFromCustomers}
                      onCheckedChange={setMessagesFromCustomers}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-[#001D39]">Account Status Changes</h3>
                      <p className="text-sm text-[#666666] mt-1">Subscription, verification updates</p>
                    </div>
                    <Switch
                      checked={accountStatusChanges}
                      onCheckedChange={setAccountStatusChanges}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full h-14 rounded-xl text-white shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #0A2463 0%, #3BCEAC 100%)'
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
