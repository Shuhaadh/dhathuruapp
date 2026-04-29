import { ArrowLeft, DollarSign, TrendingDown } from 'lucide-react';
import { useState } from 'react';

interface UpdateOfferProps {
  onNavigate: (screen: string) => void;
}

export default function UpdateOffer({ onNavigate }: UpdateOfferProps) {
  const [newOffer, setNewOffer] = useState('2500');
  const [message, setMessage] = useState('');
  const currentOffer = 2500;

  const handleUpdate = () => {
    // Handle offer update
    onNavigate('my-taken-bookings');
  };

  const offerDifference = parseInt(newOffer) - currentOffer;

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#E8F4F8' }}>
      {/* Header */}
      <div className="px-6 pt-12 pb-8"
           style={{
             background: 'linear-gradient(180deg, #0A2463 0%, #3BCEAC 100%)'
           }}>
        <button
          onClick={() => onNavigate('my-taken-bookings')}
          className="mb-6 text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-3xl mb-2">Update My Offer</h1>
        <p className="text-white/80">Adjust your price for this trip</p>
      </div>

      {/* Trip Info Card */}
      <div className="px-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <p className="text-sm text-gray-500 mb-2">Trip Details</p>
          <p className="text-xl mb-2" style={{ color: '#0A2463' }}>Male → Maafushi</p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Jan 15, 2026</span>
            <span>•</span>
            <span>10:00 AM</span>
            <span>•</span>
            <span>4 passengers</span>
          </div>
        </div>
      </div>

      {/* Current Offer */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <p className="text-sm text-gray-500 mb-3">Current Offer</p>
          <div className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-gray-400" />
            <span className="text-3xl text-gray-400">MVR {currentOffer}</span>
          </div>
        </div>
      </div>

      {/* New Offer Input */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <label className="block mb-3" style={{ color: '#0A2463' }}>New Offer Price</label>
          <div className="relative mb-4">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400">
              <DollarSign className="w-5 h-5" />
              <span>MVR</span>
            </div>
            <input
              type="number"
              value={newOffer}
              onChange={(e) => setNewOffer(e.target.value)}
              className="w-full h-14 pl-24 pr-4 border-2 rounded-xl text-2xl focus:outline-none focus:ring-2"
              style={{ 
                borderColor: '#E5E7EB',
                color: '#0A2463'
              }}
              placeholder="2500"
            />
          </div>

          {/* Price Change Indicator */}
          {offerDifference !== 0 && (
            <div 
              className="flex items-center gap-2 p-3 rounded-lg"
              style={{ 
                backgroundColor: offerDifference < 0 ? '#ECFDF5' : '#FEF2F2',
                color: offerDifference < 0 ? '#059669' : '#DC2626'
              }}
            >
              <TrendingDown className={`w-5 h-5 ${offerDifference > 0 ? 'rotate-180' : ''}`} />
              <span className="text-sm">
                {offerDifference < 0 ? 'Reducing' : 'Increasing'} by MVR {Math.abs(offerDifference)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Optional Message */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <label className="block mb-3" style={{ color: '#0A2463' }}>
            Message to Customer (Optional)
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 resize-none"
            style={{ borderColor: '#E5E7EB' }}
            placeholder="Explain your price adjustment or add any notes..."
          />
          <p className="text-xs text-gray-400 mt-2">
            Help the customer understand your pricing
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-xl p-4 border-l-4" style={{ borderColor: '#3BCEAC' }}>
          <p className="text-sm" style={{ color: '#0A2463' }}>💡 Pricing Tips</p>
          <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
            <li>Consider fuel costs and distance</li>
            <li>Factor in time of day and weather</li>
            <li>Competitive pricing increases selection chances</li>
          </ul>
        </div>
      </div>

      {/* Action Buttons (Fixed at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t"
           style={{ borderColor: '#E5E7EB' }}>
        <div className="space-y-3">
          <button
            onClick={handleUpdate}
            className="w-full h-14 rounded-xl text-white shadow-lg transition-all hover:opacity-90"
            style={{ backgroundColor: '#3BCEAC' }}
          >
            Update Offer
          </button>
          <button
            onClick={() => onNavigate('my-taken-bookings')}
            className="w-full h-14 rounded-xl border-2 transition-all"
            style={{ borderColor: '#0A2463', color: '#0A2463' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
