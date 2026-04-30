import { ArrowLeft, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

interface EditCaptainProfileProps {
  onNavigate: (screen: string) => void;
}

export default function EditCaptainProfile({ onNavigate }: EditCaptainProfileProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    licenseNumber: '',
    boatName: '',
    boatCapacity: ''
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
      const captainDoc = await getDoc(doc(db, 'captains', user.uid));
      
      if (captainDoc.exists()) {
        const data = captainDoc.data();
        setFormData({
          name: data.name || user.displayName || '',
          phone: data.phone || '',
          licenseNumber: data.licenseNumber || '',
          boatName: data.boatName || '',
          boatCapacity: data.boatCapacity || ''
        });
      } else {
        setFormData({
          name: user.displayName || '',
          phone: user.phoneNumber || '',
          licenseNumber: '',
          boatName: '',
          boatCapacity: ''
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
      await updateProfile(user, {
        displayName: formData.name
      });

      const captainRef = doc(db, 'captains', user.uid);
      const captainDoc = await getDoc(captainRef);

      if (captainDoc.exists()) {
        await updateDoc(captainRef, {
          name: formData.name,
          phone: formData.phone,
          licenseNumber: formData.licenseNumber,
          boatName: formData.boatName,
          boatCapacity: formData.boatCapacity,
          updatedAt: new Date().toISOString()
        });
      } else {
        await setDoc(captainRef, {
          name: formData.name,
          email: user.email,
          phone: formData.phone,
          licenseNumber: formData.licenseNumber,
          boatName: formData.boatName,
          boatCapacity: formData.boatCapacity,
          role: 'captain',
          approved: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      alert('Profile updated successfully!');
      onNavigate('captain-profile');
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
            onClick={() => onNavigate('captain-profile')}
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
            Captain Information
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

          {/* Boat Capacity */}
          <div className="mb-6">
            <label className="block text-[#001D39] mb-2">Boat Capacity (Optional)</label>
            <input
              type="number"
              value={formData.boatCapacity}
              onChange={(e) => setFormData({ ...formData, boatCapacity: e.target.value })}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
              placeholder="Number of passengers"
              min="1"
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