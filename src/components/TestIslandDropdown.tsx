import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import IslandDropdown from './IslandDropdown';
import { Island } from '../data/islands';

interface TestIslandDropdownProps {
  onNavigate: (screen: string) => void;
}

export default function TestIslandDropdown({ onNavigate }: TestIslandDropdownProps) {
  const [fromIsland, setFromIsland] = useState<Island | null>(null);
  const [toIsland, setToIsland] = useState<Island | null>(null);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8F4F8' }}>
      <div
        className="px-6 pt-12 pb-8"
        style={{
          background: 'linear-gradient(180deg, #0A2463 0%, #3BCEAC 100%)'
        }}
      >
        <button onClick={() => onNavigate('welcome')} className="mb-6 text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-3xl mb-2">Test Island Dropdown</h1>
        <p className="text-white/80">Try the searchable island selector!</p>
      </div>

      <div className="px-6 -mt-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          {/* From Island */}
          <IslandDropdown
            value={fromIsland?.fullName || ''}
            onChange={setFromIsland}
            label="From Island"
            placeholder="Select departure island"
          />

          {/* To Island */}
          <IslandDropdown
            value={toIsland?.fullName || ''}
            onChange={setToIsland}
            label="To Island"
            placeholder="Select destination island"
          />

          {/* Display Selection */}
          {fromIsland && toIsland && (
            <div
              className="p-4 rounded-lg"
              style={{ backgroundColor: '#E6F7FA', borderLeft: '4px solid #0A2463' }}
            >
              <h3 className="font-semibold text-[#001D39] mb-2">Selected Route:</h3>
              <p className="text-[#0A4174]">
                <span className="font-medium">{fromIsland.fullName}</span>
                {' → '}
                <span className="font-medium">{toIsland.fullName}</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {fromIsland.atollName} to {toIsland.atollName}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}