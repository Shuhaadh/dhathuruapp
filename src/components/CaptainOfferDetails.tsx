import { ArrowLeft, Star, Ship, Users, Shield, MessageCircle, Award } from 'lucide-react';

interface CaptainOfferDetailsProps {
  onNavigate: (screen: string, data?: any) => void;
}

export default function CaptainOfferDetails({ onNavigate }: CaptainOfferDetailsProps) {
  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: '#E8F4F8' }}>
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
        <h1 className="text-white text-3xl mb-2">Captain Details</h1>
        <p className="text-white/80">Review offer and profile</p>
      </div>

      {/* Captain Profile Card */}
      <div className="px-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0"
                 style={{ backgroundColor: '#E8F4F8' }}>
              <span className="text-3xl">👨‍✈️</span>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl mb-2" style={{ color: '#0A2463' }}>Ahmed Hassan</h2>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                  <span className="text-lg">4.8</span>
                </div>
                <span className="text-gray-400">(124 reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" style={{ color: '#3BCEAC' }} />
                <span className="text-sm" style={{ color: '#3BCEAC' }}>Top Captain</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Price Card */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-sm text-gray-500 mb-3">Offer for Your Trip</h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl" style={{ color: '#3BCEAC' }}>MVR 2,500</span>
          </div>
          <div className="space-y-2 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Base Fare</span>
              <span style={{ color: '#0A2463' }}>MVR 2,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service Fee</span>
              <span style={{ color: '#0A2463' }}>MVR 300</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Fuel Surcharge</span>
              <span style={{ color: '#0A2463' }}>MVR 200</span>
            </div>
          </div>
        </div>
      </div>

      {/* Boat Information */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="mb-4" style={{ color: '#0A2463' }}>Boat Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Ship className="w-5 h-5" style={{ color: '#3BCEAC' }} />
              <div>
                <p className="text-sm text-gray-500">Boat Name</p>
                <p style={{ color: '#0A2463' }}>Ocean Star</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5" style={{ color: '#3BCEAC' }} />
              <div>
                <p className="text-sm text-gray-500">Capacity</p>
                <p style={{ color: '#0A2463' }}>15 passengers</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5" style={{ color: '#3BCEAC' }} />
              <div>
                <p className="text-sm text-gray-500">Safety Features</p>
                <p style={{ color: '#0A2463' }}>Life jackets, First aid, GPS</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="px-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="mb-4" style={{ color: '#0A2463' }}>Recent Reviews</h3>
          <div className="space-y-4">
            <div className="pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
              <p className="text-sm text-gray-600">
                "Excellent captain! Very professional and the boat was clean and comfortable."
              </p>
              <p className="text-xs text-gray-400 mt-1">- Sarah M.</p>
            </div>
            
            <div className="pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                  ))}
                  <Star className="w-4 h-4 stroke-gray-300" />
                </div>
                <span className="text-sm text-gray-500">1 week ago</span>
              </div>
              <p className="text-sm text-gray-600">
                "Great trip, arrived on time and smooth ride across the water."
              </p>
              <p className="text-xs text-gray-400 mt-1">- John D.</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500">2 weeks ago</span>
              </div>
              <p className="text-sm text-gray-600">
                "Friendly captain, good communication. Would book again!"
              </p>
              <p className="text-xs text-gray-400 mt-1">- Ahmed K.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons (Fixed at bottom) */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t"
           style={{ borderColor: '#E5E7EB' }}>
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('chat-customer', { captainId: '1', captainName: 'Ahmed Hassan' })}
            className="flex-1 h-14 rounded-xl border-2 flex items-center justify-center gap-2 transition-all"
            style={{ borderColor: '#0A2463', color: '#0A2463' }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat</span>
          </button>
          <button
            onClick={() => onNavigate('confirm-captain', { captainId: '1' })}
            className="flex-1 h-14 rounded-xl text-white shadow-lg transition-all"
            style={{ backgroundColor: '#3BCEAC' }}
          >
            Confirm Captain
          </button>
        </div>
      </div>
    </div>
  );
}
