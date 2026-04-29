import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface ChangePasswordProps {
  onNavigate: (screen: string) => void;
  userType: 'customer' | 'captain';
}

export default function ChangePassword({ onNavigate, userType }: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const handleChangePassword = () => {
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Password changed successfully');
      setTimeout(() => {
        onNavigate(userType === 'customer' ? 'customer-settings' : 'captain-settings');
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8F4F8' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4"
           style={{ backgroundColor: '#0A2463' }}>
        <button
          onClick={() => onNavigate(userType === 'customer' ? 'customer-settings' : 'captain-settings')}
          className="text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl">Change Password</h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-[#001D39] mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full h-12 px-4 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666]"
              >
                {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-[#001D39] mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full h-12 px-4 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666]"
              >
                {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-sm text-[#F59E0B] mt-2 flex items-center gap-1">
              <span>⚠️</span>
              <span>Minimum 8 characters</span>
            </p>
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-[#001D39] mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full h-12 px-4 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666]"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-center mt-6">
          <button className="text-[#0A4174] hover:underline">
            Forgot Password?
          </button>
        </div>

        {/* Change Password Button */}
        <button
          onClick={handleChangePassword}
          disabled={loading}
          className="w-full h-14 rounded-xl text-white shadow-lg mt-6 disabled:opacity-50"
          style={{
            background: 'linear-gradient(135deg, #0A2463 0%, #3BCEAC 100%)'
          }}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Changing...</span>
            </div>
          ) : (
            'Change Password'
          )}
        </button>
      </div>
    </div>
  );
}
