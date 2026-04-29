import { ArrowLeft, Camera, Mail, Phone, CreditCard, Anchor, Ship, Award } from 'lucide-react';
import { useState } from 'react';

interface CaptainProfileProps {
  onNavigate: (screen: string) => void;
}

export default function CaptainProfile({ onNavigate }: CaptainProfileProps) {
  const [profileData] = useState({
    name: 'Captain Ali',
    phone: '+960 777 9999',
    email: 'captain.ali@email.com',
    idCard: 'A987654',
    boatName: 'Sea Hawk',
    capacity: '12 passengers',
    experience: '8 years',
    licenseNumber: 'CAP-2024-001',
    photo: null
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#BDD8E9' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4"
           style={{ backgroundColor: '#0A4174' }}>
        <button
          onClick={() => onNavigate('captain-dashboard')}
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
                  <Anchor className="w-16 h-16 text-white" />
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
            <p className="text-[#49769F]">Licensed Captain</p>
          </div>
        </div>

        {/* Personal Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-[#001D39] text-lg mb-4">Personal Information</h3>

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
              <Award className="w-5 h-5 mt-0.5" style={{ color: '#0A4174' }} />
              <div className="flex-1">
                <p className="text-xs text-[#49769F] mb-1">License Number</p>
                <p className="text-[#001D39]">{profileData.licenseNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Boat Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-[#001D39] text-lg mb-4">Boat Information</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#BDD8E9' }}>
              <Ship className="w-5 h-5 mt-0.5" style={{ color: '#0A4174' }} />
              <div className="flex-1">
                <p className="text-xs text-[#49769F] mb-1">Boat Name</p>
                <p className="text-[#001D39]">{profileData.boatName}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#BDD8E9' }}>
              <Award className="w-5 h-5 mt-0.5" style={{ color: '#0A4174' }} />
              <div className="flex-1">
                <p className="text-xs text-[#49769F] mb-1">Passenger Capacity</p>
                <p className="text-[#001D39]">{profileData.capacity}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-lg" style={{ backgroundColor: '#BDD8E9' }}>
              <Award className="w-5 h-5 mt-0.5" style={{ color: '#0A4174' }} />
              <div className="flex-1">
                <p className="text-xs text-[#49769F] mb-1">Experience</p>
                <p className="text-[#001D39]">{profileData.experience}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Stats Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-[#001D39] text-lg mb-4">Captain Statistics</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div 
              className="p-4 rounded-xl text-center"
              style={{ backgroundColor: '#BDD8E9' }}
            >
              <p className="text-3xl mb-1" style={{ color: '#0A4174' }}>156</p>
              <p className="text-sm text-[#49769F]">Total Trips</p>
            </div>
            
            <div 
              className="p-4 rounded-xl text-center"
              style={{ backgroundColor: '#BDD8E9' }}
            >
              <p className="text-3xl mb-1" style={{ color: '#0A4174' }}>4.8</p>
              <p className="text-sm text-[#49769F]">Rating</p>
            </div>
            
            <div 
              className="p-4 rounded-xl text-center col-span-2"
              style={{ backgroundColor: '#BDD8E9' }}
            >
              <p className="text-3xl mb-1" style={{ color: '#0A4174' }}>MVR 78,000</p>
              <p className="text-sm text-[#49769F]">Total Earnings</p>
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