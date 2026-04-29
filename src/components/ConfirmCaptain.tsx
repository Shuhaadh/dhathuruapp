import { ArrowLeft, CheckCircle, Ship, Calendar, Users, DollarSign } from 'lucide-react';

interface ConfirmCaptainProps {
  onNavigate: (screen: string) => void;
}

export default function ConfirmCaptain({ onNavigate }: ConfirmCaptainProps) {
  const handleConfirm = () => {
    // Show success and navigate to customer home
    onNavigate('customer-home');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8F4F8' }}>
      {/* Header */}
      <div className="px-6 pt-12 pb-8"
           style={{
             background: 'linear-gradient(180deg, #0A2463 0%, #3BCEAC 100%)'
           }}>
        <button
          onClick={() => onNavigate('interested-captains')}
          className="mb-6 text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-3xl mb-2">Confirm Booking</h1>
        <p className="text-white/80">Review your selection</p>
      </div>

      {/* Success Icon */}
      <div className="px-6 -mt-4 mb-6 flex justify-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
             style={{ backgroundColor: '#3BCEAC' }}>
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
      </div>

      {/* Selected Captain Card */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-sm text-gray-500 mb-3">Selected Captain</h3>
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: '#E8F4F8' }}>
              <span className="text-2xl">👨‍✈️</span>
            </div>
            <div>
              <h2 className="text-xl mb-1" style={{ color: '#0A2463' }}>Ahmed Hassan</h2>
              <p className="text-sm text-gray-600">Ocean Star • 4.8 ⭐ (124 reviews)</p>
            </div>
          </div>

          {/* Trip Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Ship className="w-5 h-5" style={{ color: '#3BCEAC' }} />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Route</p>
                <p style={{ color: '#0A2463' }}>Male → Maafushi</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" style={{ color: '#3BCEAC' }} />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Date & Time</p>
                <p style={{ color: '#0A2463' }}>Jan 15, 2026 • 10:00 AM</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-5 h-5" style={{ color: '#3BCEAC' }} />
              <div className="flex-1">
                <p className="text-sm text-gray-500">Passengers</p>
                <p style={{ color: '#0A2463' }}>4 people</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-sm text-gray-500 mb-4">Price Breakdown</h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Fare</span>
              <span style={{ color: '#0A2463' }}>MVR 2,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service Fee</span>
              <span style={{ color: '#0A2463' }}>MVR 300</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fuel Surcharge</span>
              <span style={{ color: '#0A2463' }}>MVR 200</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t-2" style={{ borderColor: '#E8F4F8' }}>
            <div className="flex items-center gap-2">
              <DollarSign className="w-6 h-6" style={{ color: '#3BCEAC' }} />
              <span className="text-lg">Total Amount</span>
            </div>
            <span className="text-3xl" style={{ color: '#3BCEAC' }}>MVR 2,500</span>
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div className="px-6 mb-24">
        <div className="bg-white rounded-2xl shadow-lg p-5 border-l-4" style={{ borderColor: '#3BCEAC' }}>
          <h4 className="mb-2" style={{ color: '#0A2463' }}>Important</h4>
          <p className="text-sm text-gray-600 mb-2">
            By confirming, you agree to book this captain for your trip.
          </p>
          <p className="text-sm text-gray-600">
            The captain will be notified and will contact you for final details.
          </p>
        </div>
      </div>

      {/* Action Buttons (Fixed at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t"
           style={{ borderColor: '#E5E7EB' }}>
        <div className="space-y-3">
          <button
            onClick={handleConfirm}
            className="w-full h-14 rounded-xl text-white shadow-lg transition-all hover:opacity-90"
            style={{ backgroundColor: '#3BCEAC' }}
          >
            Confirm Booking
          </button>
          <button
            onClick={() => onNavigate('interested-captains')}
            className="w-full h-14 rounded-xl border-2 transition-all"
            style={{ borderColor: '#0A2463', color: '#0A2463' }}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
