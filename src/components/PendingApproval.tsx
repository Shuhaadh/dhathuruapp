import { Hourglass } from 'lucide-react';

interface PendingApprovalProps {
  onNavigate: (screen: string) => void;
}

export default function PendingApproval({ onNavigate }: PendingApprovalProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-6"
         style={{
           background: 'linear-gradient(180deg, #001D39 0%, #6EA2B3 100%)'
         }}>
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center"
               style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            <Hourglass className="w-12 h-12 text-white stroke-[1.5]" />
          </div>
        </div>

        <h1 className="text-white text-3xl mb-4">Application Under Review</h1>
        
        <p className="text-white/80 text-lg mb-4">
          Thank you for registering as a captain with Avas Dhathuru!
        </p>
        
        <p className="text-white/70 mb-8">
          Our team is currently reviewing your application and verifying your documents. 
          This process typically takes 24-48 hours. You will receive a notification once your account is approved.
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-8 text-white/80 text-sm">
          <p>
            We will contact you at the phone number and email address you provided if we need any additional information.
          </p>
        </div>

        <button
          onClick={() => onNavigate('welcome')}
          className="w-full h-14 bg-white text-[#0A4174] rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
