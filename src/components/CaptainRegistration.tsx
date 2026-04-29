import { ArrowLeft, Anchor, Upload, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { signUp } from '../services/authService';

interface CaptainRegistrationProps {
  onNavigate: (screen: string) => void;
}

export default function CaptainRegistration({ onNavigate }: CaptainRegistrationProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    idCard: '',
    phone: '',
    email: '',
    boatName: '',
    boatRegistration: '',
    capacity: '',
    licenseNumber: '',
    experience: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all required fields');
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
      userType: 'captain',
      // Additional captain data
      idCard: formData.idCard,
      boatName: formData.boatName,
      boatRegistration: formData.boatRegistration,
      capacity: formData.capacity,
      licenseNumber: formData.licenseNumber,
      experience: formData.experience
    });

    setLoading(false);

    if (result.success) {
      alert('Application submitted successfully! Please wait 24-48 hours for admin approval.');
      onNavigate('pending-approval');
    } else {
      alert(`Registration Failed: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen pb-12" style={{ backgroundColor: '#E8F4F8' }}>
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
        <div className="flex items-center gap-3 mb-2">
          <Anchor className="w-8 h-8 text-white" />
          <h1 className="text-white text-3xl">Captain Registration</h1>
        </div>
        <p className="text-white/80">Join Dhathuru's network of captains</p>
      </div>

      <div className="px-6 -mt-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-[#001D39] mb-4 font-semibold">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#001D39] mb-2 text-sm">Full Name *</label>
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
                  <label className="block text-[#001D39] mb-2 text-sm">ID Card Number</label>
                  <input
                    type="text"
                    value={formData.idCard}
                    onChange={(e) => setFormData({ ...formData, idCard: e.target.value })}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] focus:ring-1 focus:ring-[#0A4174]"
                    placeholder="Enter your ID card number"
                  />
                </div>

                <div>
                  <label className="block text-[#001D39] mb-2 text-sm">Phone Number *</label>
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
                  <label className="block text-[#001D39] mb-2 text-sm">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] focus:ring-1 focus:ring-[#0A4174]"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Boat Information */}
            <div>
              <h2 className="text-[#001D39] mb-4 font-semibold">Boat Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#001D39] mb-2 text-sm">Boat Name</label>
                  <input
                    type="text"
                    value={formData.boatName}
                    onChange={(e) => setFormData({ ...formData, boatName: e.target.value })}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] focus:ring-1 focus:ring-[#0A4174]"
                    placeholder="Enter boat name"
                  />
                </div>

                <div>
                  <label className="block text-[#001D39] mb-2 text-sm">Boat Registration Number (Optional)</label>
                  <input
                    type="text"
                    value={formData.boatRegistration}
                    onChange={(e) => setFormData({ ...formData, boatRegistration: e.target.value })}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] focus:ring-1 focus:ring-[#0A4174]"
                    placeholder="Enter registration number"
                  />
                </div>

                <div>
                  <label className="block text-[#001D39] mb-2 text-sm">Passenger Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] focus:ring-1 focus:ring-[#0A4174]"
                    placeholder="Maximum passengers"
                  />
                </div>
              </div>
            </div>

            {/* License & Experience */}
            <div>
              <h2 className="text-[#001D39] mb-4 font-semibold">License & Experience (Optional)</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#001D39] mb-2 text-sm">Captain License Number (Optional)</label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] focus:ring-1 focus:ring-[#0A4174]"
                    placeholder="Enter license number"
                  />
                </div>

                <div>
                  <label className="block text-[#001D39] mb-2 text-sm">Years of Experience (Optional)</label>
                  <input
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] focus:ring-1 focus:ring-[#0A4174]"
                    placeholder="Years of experience"
                  />
                </div>
              </div>
            </div>

            {/* Document Uploads */}
            <div>
              <h2 className="text-[#001D39] mb-4 font-semibold">Documents</h2>
              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full h-14 rounded-lg border-2 border-dashed flex items-center justify-center gap-3"
                  style={{ borderColor: '#6EA2B3', backgroundColor: '#6EA2B3/10' }}
                  onClick={() => alert('Document upload feature coming soon!')}
                >
                  <Upload className="w-5 h-5" style={{ color: '#0A4174' }} />
                  <span style={{ color: '#0A4174' }}>Upload Owner ID Card Photo Copy</span>
                </button>

                <button
                  type="button"
                  className="w-full h-14 rounded-lg border-2 border-dashed flex items-center justify-center gap-3"
                  style={{ borderColor: '#6EA2B3', backgroundColor: '#6EA2B3/10' }}
                  onClick={() => alert('Document upload feature coming soon!')}
                >
                  <Upload className="w-5 h-5" style={{ color: '#0A4174' }} />
                  <span style={{ color: '#0A4174' }}>Upload Boat Photos</span>
                </button>
              </div>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-2 p-4 rounded-lg bg-orange-50 border border-orange-200">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-orange-800">
                All documents will be verified by our team. This process may take 24-48 hours. You will be notified once approved.
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#001D39] mb-2 text-sm">Create Password *</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174] focus:ring-1 focus:ring-[#0A4174]"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[#001D39] mb-2 text-sm">Confirm Password *</label>
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
              <div className="text-red-500 text-sm mb-4">
                {passwordError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 text-white rounded-xl shadow-md hover:shadow-lg transition-shadow disabled:opacity-60"
              style={{ backgroundColor: '#0A2463' }}
            >
              {loading ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}