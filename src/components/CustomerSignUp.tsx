import { ArrowLeft, Info } from 'lucide-react';
import { useState } from 'react';
import { signUp } from '../services/authService';

interface CustomerSignUpProps {
  onNavigate: (screen: string) => void;
}

export default function CustomerSignUp({ onNavigate }: CustomerSignUpProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    
    setPasswordError('');
    setLoading(true);

    // Firebase signup
    const result = await signUp(formData.email, formData.password, {
      fullName: formData.fullName,
      phoneNumber: formData.phone,
      userType: 'customer'
    });

    setLoading(false);

    if (result.success) {
      alert('Account created successfully!');
      onNavigate('customer-login');
    } else {
      alert(`Signup Failed: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8F4F8' }}>
      <div className="px-6 pt-12 pb-8"
           style={{
             background: 'linear-gradient(180deg, #0A2463 0%, #3BCEAC 100%)'
           }}>
        <button
          onClick={() => onNavigate('welcome')}
          className="mb-6 text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-3xl mb-2">Customer Sign Up</h1>
        <p className="text-white/80">Join Dhathuru today</p>
      </div>

      <div className="px-6 -mt-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[#001D39] mb-2">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] focus:ring-1 focus:ring-[#0A4174]"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-[#001D39] mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] focus:ring-1 focus:ring-[#0A4174]"
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-[#001D39] mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] focus:ring-1 focus:ring-[#0A4174]"
                placeholder="+960 7XX XXXX"
                required
              />
            </div>

            <div>
              <label className="block text-[#001D39] mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] focus:ring-1 focus:ring-[#0A4174]"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-[#001D39] mb-2">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] focus:ring-1 focus:ring-[#0A4174]"
                placeholder="••••••••"
                required
              />
            </div>

            {passwordError && (
              <div className="text-red-500 text-sm mb-2">
                {passwordError}
              </div>
            )}

            <div className="flex items-start gap-2 p-3 rounded-lg" style={{ backgroundColor: '#BDD8E9' }}>
              <Info className="w-4 h-4 mt-0.5" style={{ color: '#0A4174' }} />
              <p className="text-sm text-[#001D39]">
                Your information is secure and will only be used for booking purposes.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 text-white rounded-xl shadow-md hover:shadow-lg transition-shadow disabled:opacity-60"
              style={{ backgroundColor: '#0A2463' }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => onNavigate('customer-login')}
                style={{ color: '#0A2463' }}
                className="hover:underline"
              >
                Already have an account? Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}