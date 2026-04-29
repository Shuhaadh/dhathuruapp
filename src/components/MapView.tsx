import { useRef } from 'react';

interface MapViewProps {
  fromIsland: string;
  toIsland: string;
}

const ISLAND_COORDINATES: Record<string, [number, number]> = {
  'Male City': [4.175496, 73.509347],
  'Hulhumale': [4.2167, 73.5333],
  'N. Lhohi': [5.5789, 73.3625],
  'N. Velidhoo': [5.6575, 73.2707],
  'N. Manadhoo': [5.7667, 73.4167],
  'N. Landhoo': [5.5256, 73.4556],
  'N. Maafaru': [5.9494, 73.4167],
  'N. Kendhikolhudhoo': [5.9494, 73.4167],
  'N. Magoodhoo': [5.8500, 73.4333],
  'N. Henbandhoo': [5.5833, 73.3667],
  'N. Kudafari': [5.6333, 73.4000],
  'N. Fodhdhoo': [5.6000, 73.3833],
  'N. Miladhoo': [5.5667, 73.4167],
  'N. Holhudhoo': [5.9000, 73.3833],
  'N. Maalhendhoo': [5.7000, 73.3500],
  'K. Maafushi': [3.94231, 73.49070],
  'K. Thulusdhoo': [4.3723, 73.6455],
  'K. Villingili': [4.2139, 73.4967],
  'K. Gulhi': [3.8833, 73.5333],
  'K. Huraa': [4.3125, 73.5525],
  'K. Himmafushi': [4.3167, 73.5833],
  'K. Dhiffushi': [4.2833, 73.5833],
  'K. Guraidhoo': [3.8500, 73.4667],
  'K. Gaafaru': [4.6833, 73.7500],
  'K. Girifushi': [4.2500, 73.5167],
  'K. Kaashidhoo': [5.0167, 73.4500],
};

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function MapView({ fromIsland, toIsland }: MapViewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fromCoords = ISLAND_COORDINATES[fromIsland];
  const toCoords = ISLAND_COORDINATES[toIsland];

  if (!fromCoords || !toCoords) {
    return (
      <div className="bg-white rounded-xl p-4 text-center text-gray-500">
        <p>Route information unavailable</p>
      </div>
    );
  }

  const distance = calculateDistance(fromCoords[0], fromCoords[1], toCoords[0], toCoords[1]);
  const travelTime = Math.round((distance / 35) * 60);

  const centerLat = (fromCoords[0] + toCoords[0]) / 2;
  const centerLng = (fromCoords[1] + toCoords[1]) / 2;
  
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${centerLng-0.5},${centerLat-0.5},${centerLng+0.5},${centerLat+0.5}&layer=mapnik&marker=${centerLat},${centerLng}`;

  return (
    <div>
      {/* OpenStreetMap */}
      <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg mb-4 relative">
        <iframe
          ref={iframeRef}
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          title="Route Map"
        />
        {/* Island names overlay */}
        <div className="absolute top-2 left-2 bg-white px-3 py-2 rounded-lg shadow-md text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔵</span>
            <span className="font-bold text-[#0A2463]">{fromIsland}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xl">🔴</span>
            <span className="font-bold text-[#0A2463]">{toIsland}</span>
          </div>
        </div>
      </div>

      {/* Distance/Time Info */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm text-gray-600">Distance</p>
            <p className="text-2xl font-bold text-[#0A2463]">{distance.toFixed(1)} km</p>
          </div>
          <div className="flex-1 text-right">
            <p className="text-sm text-gray-600">Est. Time</p>
            <p className="text-2xl font-bold text-[#0A2463]">{travelTime} min</p>
          </div>
        </div>
        <div className="text-sm text-gray-700 text-center border-t pt-3">
          <p>{fromIsland} → {toIsland}</p>
        </div>
      </div>
    </div>
  );
}