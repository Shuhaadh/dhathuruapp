import { ArrowLeft, Info } from 'lucide-react';
import { useState } from 'react';
import { Switch } from '../ui/switch';
import { toast } from 'sonner@2.0.3';

interface PricingProps {
  onNavigate: (screen: string) => void;
}

export default function Pricing({ onNavigate }: PricingProps) {
  const [shortDistance, setShortDistance] = useState('800');
  const [mediumDistance, setMediumDistance] = useState('1500');
  const [longDistance, setLongDistance] = useState('2500');
  const [extraLuggage, setExtraLuggage] = useState('50');
  const [waitingTime, setWaitingTime] = useState('100');
  
  const [nightService, setNightService] = useState(true);
  const [nightSurcharge, setNightSurcharge] = useState('20');
  
  const [roundTrip, setRoundTrip] = useState(true);
  const [roundTripDiscount, setRoundTripDiscount] = useState('10');
  
  const [groupBooking, setGroupBooking] = useState(true);
  const [groupDiscount, setGroupDiscount] = useState('15');

  const handleUpdate = () => {
    toast.success('Pricing updated successfully');
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
        <h1 className="text-white text-xl">Pricing</h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Base Rates */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-[#001D39] mb-4">Base Rates</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[#001D39] mb-2">Short Distance (0-20km)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]">MVR</span>
                <input
                  type="number"
                  value={shortDistance}
                  onChange={(e) => setShortDistance(e.target.value)}
                  className="w-full h-12 pl-16 pr-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666] text-sm">per trip</span>
              </div>
            </div>

            <div>
              <label className="block text-[#001D39] mb-2">Medium Distance (20-50km)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]">MVR</span>
                <input
                  type="number"
                  value={mediumDistance}
                  onChange={(e) => setMediumDistance(e.target.value)}
                  className="w-full h-12 pl-16 pr-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666] text-sm">per trip</span>
              </div>
            </div>

            <div>
              <label className="block text-[#001D39] mb-2">Long Distance (50km+)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]">MVR</span>
                <input
                  type="number"
                  value={longDistance}
                  onChange={(e) => setLongDistance(e.target.value)}
                  className="w-full h-12 pl-16 pr-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666] text-sm">per trip</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Charges */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-[#001D39] mb-4">Additional Charges</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[#001D39] mb-2">Extra Luggage</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]">MVR</span>
                <input
                  type="number"
                  value={extraLuggage}
                  onChange={(e) => setExtraLuggage(e.target.value)}
                  className="w-full h-12 pl-16 pr-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666] text-sm">per bag</span>
              </div>
            </div>

            <div>
              <label className="block text-[#001D39] mb-2">Waiting Time</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]">MVR</span>
                <input
                  type="number"
                  value={waitingTime}
                  onChange={(e) => setWaitingTime(e.target.value)}
                  className="w-full h-12 pl-16 pr-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666] text-sm">per hour</span>
              </div>
            </div>

            <div>
              <label className="block text-[#001D39] mb-2">Night Service (6PM-6AM)</label>
              <div className="flex items-center gap-3 mb-2">
                <Switch
                  checked={nightService}
                  onCheckedChange={setNightService}
                />
                <span className="text-[#666666]">{nightService ? 'Enabled' : 'Disabled'}</span>
              </div>
              {nightService && (
                <div className="relative">
                  <input
                    type="number"
                    value={nightSurcharge}
                    onChange={(e) => setNightSurcharge(e.target.value)}
                    className="w-full h-12 pl-4 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666]">% surcharge</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Discounts */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-[#001D39] mb-4">Discounts</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[#001D39] mb-2">Round Trip</label>
              <div className="flex items-center gap-3 mb-2">
                <Switch
                  checked={roundTrip}
                  onCheckedChange={setRoundTrip}
                />
                <span className="text-[#666666]">{roundTrip ? 'Enabled' : 'Disabled'}</span>
              </div>
              {roundTrip && (
                <div className="relative">
                  <input
                    type="number"
                    value={roundTripDiscount}
                    onChange={(e) => setRoundTripDiscount(e.target.value)}
                    className="w-full h-12 pl-4 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666]">% discount</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[#001D39] mb-2">Group Booking (5+ passengers)</label>
              <div className="flex items-center gap-3 mb-2">
                <Switch
                  checked={groupBooking}
                  onCheckedChange={setGroupBooking}
                />
                <span className="text-[#666666]">{groupBooking ? 'Enabled' : 'Disabled'}</span>
              </div>
              {groupBooking && (
                <div className="relative">
                  <input
                    type="number"
                    value={groupDiscount}
                    onChange={(e) => setGroupDiscount(e.target.value)}
                    className="w-full h-12 pl-4 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666]">% discount</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="bg-[#E8F4F8] border border-[#3BCEAC]/30 rounded-2xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#0A4174] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[#0A4174] text-sm mb-1">💡 Competitive pricing helps you get more bookings</p>
            <p className="text-[#666666] text-sm">Average in your area: MVR 1,200 per trip</p>
          </div>
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          className="w-full h-14 rounded-xl text-white shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #0A2463 0%, #3BCEAC 100%)'
          }}
        >
          Update Pricing
        </button>
      </div>
    </div>
  );
}
