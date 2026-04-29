import { ArrowLeft, Camera, Mail, Phone, CreditCard, MapPin, Edit2 } from 'lucide-react';
import { useState } from 'react';

interface CustomerProfileProps {
  onNavigate: (screen: string) => void;
}

export default function CustomerProfile({ onNavigate }: CustomerProfileProps) {
  const [profileData] = useState({
    name: 'Ahmed Mohamed',
    phone: '+960 777 1234',
    email: 'ahmed.mohamed@email.com',
    idCard: 'A123456',
    address: 'Male, Maldives',
    photo: null
  });

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
        <h1 className="text-white text-xl">My Profile</h1>
      </div>

      {/* Profile Content */}
      <div className="px-6 py-6">
        {/* Profile Photo Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div 
                className="w-32 h-32 rounded-full flex items-center justify-center shadow-lg"
                style={{ 
                  background: 'linear-gradient(135deg, #001D39 0%, #7BBDE8 100%)'
                }}
              >
                {profileData.photo ? (
                  <img 
                    src={profileData.photo} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white text-5xl">{profileData.name.charAt(0)}</span>
                )}
              </div>
              <button 
                className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2"
                style={{ borderColor: '#0A4174' }}
              >
                <Camera className="w-5 h-5" style={{ color: '#0A4174' }} />
              </button>
            </div>
            <h2 className="text-[#001D39] text-2xl mb-1">{profileData.name}</h2>
            <p className="text-[#49769F]">Customer</p>
          </div>
        </div>

        {/* Personal Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#001D39] text-lg">Personal Information</h3>
            <button className="text-[#0A4174]">
              <Edit2 className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#BDD8E9' }}>
              <Phone className="w-5 h-5 mt-0.5" style={{ color: '#0A4174' }} />
              <div className="flex-1">
                <p className="text-xs text-[#49769F] mb-1">Phone Number</p>
                <p className="text-[#001D39]">{profileData.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#BDD8E9' }}>
              <Mail className="w-5 h-5 mt-0.5" style={{ color: '#0A4174' }} />
              <div className="flex-1">
                <p className="text-xs text-[#49769F] mb-1">Email Address</p>
                <p className="text-[#001D39]">{profileData.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#BDD8E9' }}>
              <CreditCard className="w-5 h-5 mt-0.5" style={{ color: '#0A4174' }} />
              <div className="flex-1">
                <p className="text-xs text-[#49769F] mb-1">ID Card Number</p>
                <p className="text-[#001D39]">{profileData.idCard}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#BDD8E9' }}>
              <MapPin className="w-5 h-5 mt-0.5" style={{ color: '#0A4174' }} />
              <div className="flex-1">
                <p className="text-xs text-[#49769F] mb-1">Address</p>
                <p className="text-[#001D39]">{profileData.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Stats Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-[#001D39] text-lg mb-4">Account Statistics</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div 
              className="p-4 rounded-xl text-center"
              style={{ backgroundColor: '#BDD8E9' }}
            >
              <p className="text-3xl mb-1" style={{ color: '#0A4174' }}>12</p>
              <p className="text-sm text-[#49769F]">Total Trips</p>
            </div>
            
            <div 
              className="p-4 rounded-xl text-center"
              style={{ backgroundColor: '#BDD8E9' }}
            >
              <p className="text-3xl mb-1" style={{ color: '#0A4174' }}>3</p>
              <p className="text-sm text-[#49769F]">Upcoming</p>
            </div>
            
            <div 
              className="p-4 rounded-xl text-center col-span-2"
              style={{ backgroundColor: '#BDD8E9' }}
            >
              <p className="text-3xl mb-1" style={{ color: '#0A4174' }}>MVR 5,400</p>
              <p className="text-sm text-[#49769F]">Total Spent</p>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          className="w-full h-14 mt-6 text-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
          style={{ backgroundColor: '#0A4174' }}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
