import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface CaptainSignUpProps {
  onNavigate: (screen: string) => void;
}

export default function CaptainSignUp({ onNavigate }: CaptainSignUpProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    licenseNumber: '',
    boatName: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      alert('Please fill in all required fields (Name, Email, Phone, Password)');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Update display name in Auth
      await updateProfile(user, {
        displayName: formData.name
      });

      // Save captain data to Firestore
      await setDoc(doc(db, 'captains', user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        licenseNumber: formData.licenseNumber || '',
        boatName: formData.boatName || '',
        role: 'captain',
        approved: false, // Admin needs to approve
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      alert('Captain account created! Waiting for admin approval.');
      // Navigate to captain dashboard
      onNavigate('captain-dashboard');
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.code === 'auth/email-already-in-use') {
        alert('This email is already registered. Please login instead.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Invalid email address');
      } else if (error.code === 'auth/weak-password') {
        alert('Password is too weak. Please use a stronger password.');
      } else {
        alert('Signup failed: ' + error.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#BDD8E9' }}>
      {/* Header */}
      <div className="px-6 pt-12 pb-8"
           style={{
             background: 'linear-gradient(180deg, #0A2463 0%, #3BCEAC 100%)'
           }}>
        <button
          onClick={() => onNavigate('welcome')}
          className="text-white mb-6"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-3xl mb-2">Become a Captain</h1>
        <p className="text-white/80">Sign up as a speedboat captain</p>
      </div>

      {/* Sign Up Form */}
      <div className="px-6 -mt-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Full Name */}
          <div className="mb-5">
            <label className="block text-[#001D39] mb-2">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-[#001D39] mb-2">Email Address *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
              placeholder="your@email.com"
            />
          </div>

          {/* Phone Number */}
          <div className="mb-5">
            <label className="block text-[#001D39] mb-2">Phone Number *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
              placeholder="+960 XXX XXXX"
            />
          </div>

          {/* License Number */}
          <div className="mb-5">
            <label className="block text-[#001D39] mb-2">License Number (Optional)</label>
            <input
              type="text"
              value={formData.licenseNumber}
              onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
              placeholder="Captain license number"
            />
          </div>

          {/* Boat Name */}
          <div className="mb-5">
            <label className="block text-[#001D39] mb-2">Boat Name (Optional)</label>
            <input
              type="text"
              value={formData.boatName}
              onChange={(e) => setFormData({ ...formData, boatName: e.target.value })}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
              placeholder="Your boat name"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-[#001D39] mb-2">Password *</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
              placeholder="Create a password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-[#001D39] mb-2">Confirm Password *</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
              placeholder="Confirm your password"
            />
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full h-14 text-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            style={{ backgroundColor: '#0A2463' }}
          >
            {loading ? 'Creating Account...' : 'Sign Up Captain'}
          </button>

          {/* Login Link */}
          <button
            onClick={() => onNavigate('captain-login')}
            className="w-full mt-4 text-[#0A2463] hover:underline"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}