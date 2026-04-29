import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { ISLANDS, ATOLLS, searchIslands, Island } from '../data/islands';

interface IslandDropdownProps {
  value: string;
  onChange: (islandName: string) => void;
  placeholder?: string;
  label?: string;
}

export default function IslandDropdown({ 
  value, 
  onChange, 
  placeholder = 'Search islands...', 
  label 
}: IslandDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAtoll, setSelectedAtoll] = useState<string>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getFilteredIslands = () => {
    let filtered = ISLANDS;

    if (searchQuery) {
      filtered = searchIslands(searchQuery);
    }

    // ✅ FIXED: Check if island belongs to atoll (starts with atoll code + hyphen)
    if (selectedAtoll !== 'all') {
      filtered = filtered.filter(island => {
        // Handle MALE and HULHUMALE (they belong to Kaafu but don't have K- prefix)
        if (selectedAtoll === 'K' && (island.code === 'MALE' || island.code === 'HULHUMALE')) {
          return true;
        }
        // Regular islands: code starts with "N-", "K-", etc.
        return island.code.startsWith(selectedAtoll + '-');
      });
    }

    return filtered;
  };

  const filteredIslands = getFilteredIslands();

  // ✅ FIXED: Group islands by their actual atoll (using atollName match)
  const groupedIslands = ATOLLS.map(atoll => ({
    atoll,
    islands: filteredIslands.filter(island => island.atollName === atoll.fullName)
  })).filter(group => group.islands.length > 0);

  const handleSelect = (island: Island) => {
    onChange(island.fullName);
    setIsOpen(false);
    setSearchQuery('');
  };

  const clearSelection = () => {
    onChange('');
  };

  return (
    <div ref={dropdownRef} className="relative">
      {label && (
        <label className="block text-[#001D39] mb-2">
          {label}
        </label>
      )}

      {/* Main Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 px-4 border border-gray-300 rounded-lg flex items-center justify-between cursor-pointer hover:border-[#0A4174]"
      >
        <div className="flex items-center gap-2 flex-1">
          <MapPin className="w-5 h-5 text-[#0A4174]" />
          {value ? (
            <span className="text-[#001D39]">{value}</span>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        
        {value && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearSelection();
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>

      {/* Dropdown Panel - FORCED SMALL WITH INLINE STYLES! */}
      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
          style={{ maxHeight: '250px' }}
        >
          {/* Search */}
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search islands..."
                className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0A4174]"
                autoFocus
              />
            </div>

            {/* Atoll Filters */}
            <div className="flex gap-2 mt-2 overflow-x-auto" style={{ maxHeight: '40px' }}>
              <button
                onClick={() => setSelectedAtoll('all')}
                className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${
                  selectedAtoll === 'all'
                    ? 'bg-[#0A2463] text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                All
              </button>
              {ATOLLS.map(atoll => (
                <button
                  key={atoll.code}
                  onClick={() => setSelectedAtoll(atoll.code)}
                  className={`px-3 py-1 rounded-md text-sm whitespace-nowrap ${
                    selectedAtoll === atoll.code
                      ? 'bg-[#0A2463] text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {atoll.code}
                </button>
              ))}
            </div>
          </div>

          {/* Islands List - FORCED SMALL! */}
          <div className="overflow-y-auto" style={{ maxHeight: '120px' }}>
            {filteredIslands.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No islands found</p>
              </div>
            ) : (
              <>
                {groupedIslands.map(group => (
                  <div key={group.atoll.code}>
                    {/* Atoll Header */}
                    <div className="px-4 py-1.5 bg-gradient-to-r from-[#0A2463] to-[#3BCEAC] text-white text-xs font-semibold sticky top-0">
                      {group.atoll.code}. {group.atoll.name}
                    </div>

                    {/* Islands */}
                    {group.islands.map(island => (
                      <button
                        key={island.fullName}
                        onClick={() => handleSelect(island)}
                        className="w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-50 text-left"
                      >
                        <MapPin className="w-4 h-4 text-[#0A4174]" />
                        <div>
                          <div className="text-[#001D39] text-sm font-medium">{island.name}</div>
                          <div className="text-xs text-gray-500">{island.fullName}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-1.5 bg-gray-50 border-t text-xs text-gray-500 text-center">
            {filteredIslands.length} island{filteredIslands.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  );
}