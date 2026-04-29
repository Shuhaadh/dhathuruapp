import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { signIn } from '../services/authService';

interface CustomerLoginProps {
  onNavigate: (screen: string) => void;
}

export default function CustomerLogin({ onNavigate }: CustomerLoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    const result = await signIn(formData.email, formData.password);

    setLoading(false);

    if (result.success) {
      if (result.userData.userType === 'customer') {
        alert('Logged in successfully!');
        onNavigate('customer-home');
      } else {
        alert('Please use the captain login');
      }
    } else {
      alert(`Login Failed: ${result.error}`);
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
        <h1 className="text-white text-3xl mb-2">Customer Login</h1>
        <p className="text-white/80">Welcome back to Dhathuru!</p>
      </div>

      <div className="px-6 -mt-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
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
              <label className="block text-[#001D39] mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] focus:ring-1 focus:ring-[#0A4174]"
                placeholder="••••••••"
                required
              />
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  className="text-sm text-[#0A4174] hover:underline"
                  onClick={() => alert('Password reset feature coming soon!')}
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 text-white rounded-xl shadow-md hover:shadow-lg transition-shadow disabled:opacity-60"
              style={{ backgroundColor: '#0A2463' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => onNavigate('customer-signup')}
                style={{ color: '#0A2463' }}
                className="hover:underline"
              >
                Don't have an account? Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}