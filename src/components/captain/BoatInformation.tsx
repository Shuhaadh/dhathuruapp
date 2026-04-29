import { ArrowLeft, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface BoatInformationProps {
  onNavigate: (screen: string) => void;
}

export default function BoatInformation({ onNavigate }: BoatInformationProps) {
  const [boatName, setBoatName] = useState('Sea Breeze 1');
  const [boatType, setBoatType] = useState('standard');
  const [capacity, setCapacity] = useState('15');
  const [licenseNumber, setLicenseNumber] = useState('SB-2024-1234');
  const [yearBuilt, setYearBuilt] = useState('2020');
  const [description, setDescription] = useState('Modern speedboat with comfortable seating and safety equipment.');
  
  const [amenities, setAmenities] = useState({
    toilet: true,
    coveredSeating: true,
    lifeJackets: true,
    firstAid: true,
    gps: true,
    radio: true,
    refreshments: false,
    luggage: true
  });

  const handleSave = () => {
    toast.success('Boat information updated successfully');
    setTimeout(() => {
      onNavigate('captain-settings');
    }, 1000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8F4F8' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4"
           style={{ backgroundColor: '#0A2463' }}>
        <button
          onClick={() => onNavigate('captain-settings')}
          className="text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl">Boat Information</h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
          {/* Boat Name */}
          <div>
            <label className="block text-[#001D39] mb-2">Boat Name</label>
            <input
              type="text"
              value={boatName}
              onChange={(e) => setBoatName(e.target.value)}
              className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
            />
          </div>

          {/* Boat Type */}
          <div>
            <label className="block text-[#001D39] mb-2">Boat Type</label>
            <select
              value={boatType}
              onChange={(e) => setBoatType(e.target.value)}
              className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
            >
              <option value="standard">Standard Speedboat</option>
              <option value="luxury">Luxury Speedboat</option>
              <option value="ferry">Fast Ferry</option>
              <option value="yacht">Private Yacht</option>
            </select>
          </div>

          {/* Passenger Capacity */}
          <div>
            <label className="block text-[#001D39] mb-2">Passenger Capacity</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              min="10"
              max="50"
              className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
            />
          </div>

          {/* Boat License Number */}
          <div>
            <label className="block text-[#001D39] mb-2">Boat License Number</label>
            <input
              type="text"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
            />
          </div>

          {/* Year Built */}
          <div>
            <label className="block text-[#001D39] mb-2">Year Built</label>
            <input
              type="text"
              value={yearBuilt}
              onChange={(e) => setYearBuilt(e.target.value)}
              placeholder="YYYY"
              className="w-full h-12 px-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC]"
            />
          </div>
        </div>

        {/* Boat Photos */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-[#001D39] mb-3">Boat Photos (Up to 5)</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square bg-[#E8F4F8] rounded-xl flex items-center justify-center border-2 border-dashed border-[#3BCEAC]">
              <Plus className="w-8 h-8 text-[#3BCEAC]" />
            </div>
            <div className="aspect-square bg-[#E8F4F8] rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-[#001D39] mb-4">Amenities</h3>
          <div className="space-y-3">
            {Object.entries({
              toilet: 'Toilet',
              coveredSeating: 'Covered seating',
              lifeJackets: 'Life jackets',
              firstAid: 'First aid kit',
              gps: 'GPS navigation',
              radio: 'Radio communication',
              refreshments: 'Refreshments',
              luggage: 'Luggage storage'
            }).map(([key, label]) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={amenities[key as keyof typeof amenities]}
                  onChange={(e) => setAmenities({ ...amenities, [key]: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-[#3BCEAC] focus:ring-[#3BCEAC]"
                />
                <span className="text-[#001D39]">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <label className="block text-[#001D39] mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your boat..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#3BCEAC] resize-none"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full h-14 rounded-xl text-white shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #0A2463 0%, #3BCEAC 100%)'
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
