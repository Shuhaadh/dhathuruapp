import { ArrowLeft, Bell, Lock, Globe, HelpCircle, FileText, LogOut, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import LogoutDialog from './settings/LogoutDialog';
import DeleteAccountDialog from './settings/DeleteAccountDialog';
import { toast } from 'sonner@2.0.3';

interface CustomerSettingsProps {
  onNavigate: (screen: string) => void;
}

export default function CustomerSettings({ onNavigate }: CustomerSettingsProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleLogout = () => {
    toast.success('Logged out successfully');
    setTimeout(() => {
      onNavigate('welcome');
    }, 500);
  };

  const handleDeleteAccount = () => {
    toast.success('Account deleted. You will be logged out in 5 seconds.');
    setTimeout(() => {
      onNavigate('welcome');
    }, 5000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#BDD8E9' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4"
           style={{ backgroundColor: '#0A4174' }}>
        <button
          onClick={() => onNavigate('customer-home')}
          className="text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl">Settings</h1>
      </div>

      {/* Settings Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Account Settings */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-[#001D39]">Account Settings</h3>
          </div>
          
          <button 
            onClick={() => onNavigate('notifications-customer')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#BDD8E9]/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5" style={{ color: '#0A4174' }} />
              <span className="text-[#001D39]">Notifications</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#49769F]" />
          </button>

          <button 
            onClick={() => onNavigate('change-password-customer')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#BDD8E9]/30 transition-colors border-t border-gray-100"
          >
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5" style={{ color: '#0A4174' }} />
              <span className="text-[#001D39]">Change Password</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#49769F]" />
          </button>

          <button 
            onClick={() => onNavigate('language-customer')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#BDD8E9]/30 transition-colors border-t border-gray-100"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5" style={{ color: '#0A4174' }} />
              <span className="text-[#001D39]">Language</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#49769F]">English</span>
              <ChevronRight className="w-5 h-5 text-[#49769F]" />
            </div>
          </button>
        </div>

        {/* Support */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-[#001D39]">Support</h3>
          </div>
          
          <button 
            onClick={() => onNavigate('help-center-customer')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#BDD8E9]/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5" style={{ color: '#0A4174' }} />
              <span className="text-[#001D39]">Help Center</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#49769F]" />
          </button>

          <button 
            onClick={() => onNavigate('terms-conditions-customer')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#BDD8E9]/30 transition-colors border-t border-gray-100"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" style={{ color: '#0A4174' }} />
              <span className="text-[#001D39]">Terms & Conditions</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#49769F]" />
          </button>

          <button 
            onClick={() => onNavigate('privacy-policy-customer')}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#BDD8E9]/30 transition-colors border-t border-gray-100"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" style={{ color: '#0A4174' }} />
              <span className="text-[#001D39]">Privacy Policy</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#49769F]" />
          </button>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-[#001D39] mb-3">About App</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[#49769F]">Version</span>
              <span className="text-[#001D39]">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#49769F]">Build</span>
              <span className="text-[#001D39]">2025.11.24</span>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutDialog(true)}
          className="w-full h-14 bg-white rounded-xl shadow-lg flex items-center justify-center gap-3 hover:shadow-xl transition-shadow"
        >
          <LogOut className="w-5 h-5 text-red-600" />
          <span className="text-red-600">Logout</span>
        </button>

        {/* Delete Account */}
        <button 
          onClick={() => setShowDeleteDialog(true)}
          className="w-full py-3 text-red-600 text-sm hover:underline"
        >
          Delete Account
        </button>
      </div>

      {/* Dialogs */}
      <LogoutDialog
        isOpen={showLogoutDialog}
        onCancel={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
      />

      <DeleteAccountDialog
        isOpen={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteAccount}
        userType="customer"
        hasActiveBookings={false}
        activeBookingsCount={0}
      />
    </div>
  );
}