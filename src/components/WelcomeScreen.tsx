import { Waves, User, UserPlus, Anchor } from 'lucide-react';

interface WelcomeScreenProps {
  onNavigate: (screen: string) => void;
}

export default function WelcomeScreen({ onNavigate }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
         style={{
           background: 'linear-gradient(180deg, #0A2463 0%, #3BCEAC 100%)'
         }}>
      <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full">
        <Waves className="w-20 h-20 text-white mb-6 stroke-[1.5]" />
        <h1 className="text-white text-5xl mb-3 tracking-wide">Dhathuru</h1>
        <p className="text-white/90 text-lg mb-12">Island Speedboat Bookings</p>

        <div className="w-full space-y-4 mb-8">
          <button
            onClick={() => onNavigate('customer-login')}
            className="w-full h-14 bg-white rounded-xl flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
            style={{ color: '#0A2463' }}
          >
            <User className="w-5 h-5" />
            <span className="text-lg">Customer Login</span>
          </button>

          <button
            onClick={() => onNavigate('customer-signup')}
            className="w-full h-14 bg-transparent text-white border-2 border-white rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            <span className="text-lg">New Customer</span>
          </button>
        </div>

        <div className="w-full flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="text-white/70 text-sm tracking-wider">FOR CAPTAINS</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        <button
          onClick={() => onNavigate('captain-login')}
          className="w-full h-14 rounded-xl flex items-center justify-center gap-3 mb-4 shadow-md bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all"
        >
          <Anchor className="w-5 h-5" />
          <span className="text-lg">Captain Login</span>
        </button>

        <button
          onClick={() => onNavigate('captain-registration')}
          className="text-white/90 hover:text-white transition-colors"
        >
          Register as Captain →
        </button>
      </div>
    </div>
  );
}
