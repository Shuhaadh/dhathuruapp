import { ArrowLeft, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

interface EditProfileProps {
  onNavigate: (screen: string) => void;
}

export default function EditProfile({ onNavigate }: EditProfileProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    idCard: '',
    address: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, []);

  async function loadProfileData() {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Try to get data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        setFormData({
          name: data.name || user.displayName || '',
          phone: data.phone || '',
          idCard: data.idCard || '',
          address: data.address || ''
        });
      } else {
        // Use auth data as fallback
        setFormData({
          name: user.displayName || '',
          phone: user.phoneNumber || '',
          idCard: '',
          address: ''
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
    
    setLoading(false);
  }

  async function handleSave() {
    const user = auth.currentUser;
    if (!user) {
      alert('Please login first');
      return;
    }

    // Validate
    if (!formData.name.trim()) {
      alert('Please enter your name');
      return;
    }

    if (!formData.phone.trim()) {
      alert('Please enter your phone number');
      return;
    }

    setSaving(true);

    try {
      // Update Firebase Auth display name
      await updateProfile(user, {
        displayName: formData.name
      });

      // Update or create Firestore document
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        // Update existing document
        await updateDoc(userRef, {
          name: formData.name,
          phone: formData.phone,
          idCard: formData.idCard,
          address: formData.address,
          updatedAt: new Date().toISOString()
        });
      } else {
        // Create new document
        await setDoc(userRef, {
          name: formData.name,
          email: user.email,
          phone: formData.phone,
          idCard: formData.idCard,
          address: formData.address,
          role: 'customer',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      alert('Profile updated successfully!');
      onNavigate('customer-profile');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#BDD8E9' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0A2463] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#0A2463]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#BDD8E9' }}>
      {/* Header */}
      <div className="px-6 pt-12 pb-6"
           style={{ background: 'linear-gradient(180deg, #0A2463 0%, #3BCEAC 100%)' }}>
        <div className="flex items-center mb-4">
          <button
            onClick={() => onNavigate('customer-profile')}
            className="text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl ml-4">Edit Profile</h1>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 -mt-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-6" style={{ color: '#0A2463' }}>
            Personal Information
          </h3>

          {/* Name */}
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

          {/* Phone */}
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

          {/* ID Card */}
          <div className="mb-5">
            <label className="block text-[#001D39] mb-2">ID Card Number (Optional)</label>
            <input
              type="text"
              value={formData.idCard}
              onChange={(e) => setFormData({ ...formData, idCard: e.target.value })}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
              placeholder="A123456"
            />
          </div>

          {/* Address */}
          <div className="mb-6">
            <label className="block text-[#001D39] mb-2">Address (Optional)</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
              placeholder="Male, Maldives"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full h-14 text-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            style={{ backgroundColor: '#0A2463' }}
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}