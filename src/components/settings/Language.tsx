import { ArrowLeft, Check, Info } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface LanguageProps {
  onNavigate: (screen: string) => void;
  userType: 'customer' | 'captain';
}

export default function Language({ onNavigate, userType }: LanguageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const languages = [
    { id: 'english', name: 'English', nativeName: 'English' },
    // Future languages - Phase 1 starts with English only
    // { id: 'dhivehi', name: 'Dhivehi', nativeName: 'ދިވެހި' },
    // { id: 'hindi', name: 'Hindi', nativeName: 'हिन्दी' },
    // { id: 'tamil', name: 'Tamil', nativeName: 'தமிழ்' },
    // { id: 'sinhala', name: 'Sinhala', nativeName: 'සිංහල' },
  ];

  const handleSave = () => {
    toast.success('Language preference saved');
    setTimeout(() => {
      onNavigate(userType === 'customer' ? 'customer-settings' : 'captain-settings');
    }, 1000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#E8F4F8' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4"
           style={{ backgroundColor: '#0A2463' }}>
        <button
          onClick={() => onNavigate(userType === 'customer' ? 'customer-settings' : 'captain-settings')}
          className="text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl">Language</h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Language Options */}
        <div className="space-y-3">
          {languages.map((language) => (
            <button
              key={language.id}
              onClick={() => setSelectedLanguage(language.id)}
              className="w-full bg-white rounded-2xl shadow-lg p-5 flex items-center justify-between hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedLanguage === language.id
                      ? 'border-[#3BCEAC] bg-[#3BCEAC]'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedLanguage === language.id && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-[#001D39]">{language.nativeName}</p>
                  {language.name !== language.nativeName && (
                    <p className="text-sm text-[#666666]">{language.name}</p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Info Note */}
        <div className="bg-[#E8F4F8] border border-[#3BCEAC]/30 rounded-2xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#0A4174] flex-shrink-0 mt-0.5" />
          <p className="text-[#0A4174] text-sm">
            App will restart after changing language
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full h-14 rounded-xl text-white shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #0A2463 0%, #3BCEAC 100%)'
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
