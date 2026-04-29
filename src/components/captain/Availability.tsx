import { ArrowLeft, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Switch } from '../ui/switch';
import { toast } from 'sonner@2.0.3';

interface AvailabilityProps {
  onNavigate: (screen: string) => void;
}

export default function Availability({ onNavigate }: AvailabilityProps) {
  const [schedule, setSchedule] = useState({
    monday: { enabled: true, start: '08:00', end: '18:00' },
    tuesday: { enabled: true, start: '08:00', end: '18:00' },
    wednesday: { enabled: true, start: '08:00', end: '18:00' },
    thursday: { enabled: true, start: '08:00', end: '18:00' },
    friday: { enabled: true, start: '08:00', end: '18:00' },
    saturday: { enabled: true, start: '08:00', end: '18:00' },
    sunday: { enabled: false, start: '08:00', end: '18:00' }
  });

  const [maxTrips, setMaxTrips] = useState('5');
  const [advanceBooking, setAdvanceBooking] = useState('24');
  const [instantBooking, setInstantBooking] = useState(true);

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const handleSave = () => {
    toast.success('Availability updated successfully');
    setTimeout(() => {
      onNavigate('captain-settings');
    }, 1000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8F4F8' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4"
           style={{ backgroundColor: '#0A2463' }}>
        <button
          onClick={() => onNavigate('captain-settings')}
          className="text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl">Availability</h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Working Hours */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-[#001D39] mb-4">Working Hours</h3>
          <div className="space-y-3">
            {days.map((day) => (
              <div key={day.key} className="flex items-center gap-3">
                <div className="w-28">
                  <span className="text-[#001D39]">{day.label}</span>
                </div>
                
                {schedule[day.key as keyof typeof schedule].enabled ? (
                  <>
                    <input
                      type="time"
                      value={schedule[day.key as keyof typeof schedule].start}
                      onChange={(e) => setSchedule({
                        ...schedule,
                        [day.key]: { ...schedule[day.key as keyof typeof schedule], start: e.target.value }
                      })}
                      className="flex-1 h-10 px-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#3BCEAC]"
                    />
                    <span className="text-[#666666]">to</span>
                    <input
                      type="time"
                      value={schedule[day.key as keyof typeof schedule].end}
                      onChange={(e) => setSchedule({
                        ...schedule,
                        [day.key]: { ...schedule[day.key as keyof typeof schedule], end: e.target.value }
                      })}
                      className="flex-1 h-10 px-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#3BCEAC]"
                    />
                  </>
                ) : (
                  <div className="flex-1 text-[#666666]">Day Off</div>
                )}
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!schedule[day.key as keyof typeof schedule].enabled}
                    onChange={(e) => setSchedule({
                      ...schedule,
                      [day.key]: { ...schedule[day.key as keyof typeof schedule], enabled: !e.target.checked }
                    })}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm text-[#666666] whitespace-nowrap">Day Off</span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Special Days Off */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-[#001D39] mb-4">Special Days Off</h3>
          <button className="w-full h-12 border-2 border-dashed border-[#3BCEAC] rounded-xl text-[#0A4174] flex items-center justify-center gap-2 hover:bg-[#E8F4F8] transition-colors">
            <Calendar className="w-5 h-5" />
            <span>Select dates you won't be available</span>
          </button>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between p-3 bg-[#E8F4F8] rounded-xl">
              <div>
                <p className="text-[#001D39]">December 31, 2025</p>
                <p className="text-sm text-[#666666]">New Year's Eve</p>
              </div>
              <button className="text-red-600 text-sm hover:underline">Remove</button>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#E8F4F8] rounded-xl">
              <div>
                <p className="text-[#001D39]">January 1, 2026</p>
                <p className="text-sm text-[#666666]">New Year's Day</p>
              </div>
              <button className="text-red-600 text-sm hover:underline">Remove</button>
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <h3 className="text-[#001D39] mb-2">Advanced Settings</h3>
          
          <div>
            <label className="block text-[#001D39] mb-2">Maximum Trips Per Day</label>
            <input
              type="number"
              value={maxTrips}
              onChange={(e) => setMaxTrips(e.target.value)}
              min="1"
              max="10"
              className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
            />
          </div>

          <div>
            <label className="block text-[#001D39] mb-2">Advance Booking</label>
            <div className="relative">
              <input
                type="number"
                value={advanceBooking}
                onChange={(e) => setAdvanceBooking(e.target.value)}
                className="w-full h-12 px-4 pr-24 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666]">hours in advance</span>
            </div>
            <p className="text-sm text-[#666666] mt-1">Accept bookings {advanceBooking} hours in advance</p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[#001D39]">Accept Instant Bookings</label>
              <Switch
                checked={instantBooking}
                onCheckedChange={setInstantBooking}
              />
            </div>
            <p className="text-sm text-[#666666]">
              {instantBooking 
                ? 'Customers can book immediately without your approval' 
                : 'You will approve each booking manually'}
            </p>
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
          Save Availability
        </button>
      </div>
    </div>
  );
}
