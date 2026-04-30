import { ArrowLeft, Camera, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

interface CustomerProfileProps {
  onNavigate: (screen: string) => void;
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  idCard: string;
  address: string;
}

interface Stats {
  totalTrips: number;
  upcomingTrips: number;
  totalSpent: number;
}

export default function CustomerProfile({ onNavigate }: CustomerProfileProps) {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: '',
    phone: '',
    idCard: '',
    address: ''
  });
  
  const [stats, setStats] = useState<Stats>({
    totalTrips: 0,
    upcomingTrips: 0,
    totalSpent: 0
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfileData();
    loadStats();
  }, []);

  async function loadProfileData() {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Get user profile from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        setProfileData({
          name: data.name || user.displayName || 'Customer',
          email: data.email || user.email || '',
          phone: data.phone || user.phoneNumber || '',
          idCard: data.idCard || '',
          address: data.address || ''
        });
      } else {
        // Fallback to auth data if no Firestore profile
        setProfileData({
          name: user.displayName || 'Customer',
          email: user.email || '',
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

  async function loadStats() {
    const user = auth.currentUser;
    if (!user) return;

    try {
      // Get all bookings for this customer
      const bookingsRef = collection(db, 'bookingRequests');
      const q = query(bookingsRef, where('customerId', '==', user.uid));
      const snapshot = await getDocs(q);

      let totalTrips = 0;
      let upcomingTrips = 0;
      let totalSpent = 0;

      snapshot.forEach((doc) => {
        const booking = doc.data();
        totalTrips++;

        // Check if upcoming (departure date is in the future)
        const departureDate = new Date(booking.departureDate);
        if (departureDate > new Date()) {
          upcomingTrips++;
        }

        // Add to total spent if booking has a final price
        if (booking.finalPrice) {
          totalSpent += booking.finalPrice;
        }
      });

      setStats({
        totalTrips,
        upcomingTrips,
        totalSpent
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#BDD8E9' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0A2463] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-[#0A2463]">Loading profile...</p>
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
            onClick={() => onNavigate('customer-home')}
            className="text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white text-2xl ml-4">My Profile</h1>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-6 -mt-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl"
                style={{ background: 'linear-gradient(135deg, #0A2463 0%, #3BCEAC 100%)' }}
              >
                {profileData.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-[#3BCEAC]">
                <Camera className="w-4 h-4 text-[#0A2463]" />
              </button>
            </div>
            <h2 className="text-2xl font-bold mt-4" style={{ color: '#0A2463' }}>
              {profileData.name}
            </h2>
            <p className="text-gray-600">Customer</p>
          </div>

          {/* Personal Information */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold" style={{ color: '#0A2463' }}>
                Personal Information
              </h3>
              <button
                onClick={() => onNavigate('edit-profile')}
                className="text-[#3BCEAC]"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Phone */}
              <div className="bg-[#BDD8E9] rounded-lg p-4">
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="text-[#0A2463] font-medium">
                  {profileData.phone || 'Not provided'}
                </p>
              </div>

              {/* Email */}
              <div className="bg-[#BDD8E9] rounded-lg p-4">
                <p className="text-sm text-gray-600">Email Address</p>
                <p className="text-[#0A2463] font-medium">
                  {profileData.email || 'Not provided'}
                </p>
              </div>

              {/* ID Card */}
              {profileData.idCard && (
                <div className="bg-[#BDD8E9] rounded-lg p-4">
                  <p className="text-sm text-gray-600">ID Card Number</p>
                  <p className="text-[#0A2463] font-medium">{profileData.idCard}</p>
                </div>
              )}

              {/* Address */}
              {profileData.address && (
                <div className="bg-[#BDD8E9] rounded-lg p-4">
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="text-[#0A2463] font-medium">{profileData.address}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#0A2463' }}>
            Account Statistics
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-[#BDD8E9] rounded-xl p-4 text-center">
              <p className="text-3xl font-bold" style={{ color: '#0A2463' }}>
                {stats.totalTrips}
              </p>
              <p className="text-sm text-gray-600">Total Trips</p>
            </div>

            <div className="bg-[#BDD8E9] rounded-xl p-4 text-center">
              <p className="text-3xl font-bold" style={{ color: '#0A2463' }}>
                {stats.upcomingTrips}
              </p>
              <p className="text-sm text-gray-600">Upcoming</p>
            </div>
          </div>

          <div className="bg-[#BDD8E9] rounded-xl p-4 text-center">
            <p className="text-3xl font-bold" style={{ color: '#0A2463' }}>
              MVR {stats.totalSpent.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Total Spent</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={() => onNavigate('edit-profile')}
          className="w-full h-14 text-white rounded-xl shadow-md"
          style={{ backgroundColor: '#0A2463' }}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}