import { ArrowLeft, Search, ChevronRight, Mail, Phone, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface HelpCenterProps {
  onNavigate: (screen: string) => void;
  userType: 'customer' | 'captain';
}

export default function HelpCenter({ onNavigate, userType }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      icon: '📱',
      title: 'Getting Started',
      items: [
        'How to create an account',
        'How to verify my ID',
        'How to book a speedboat (customers)',
        'How to navigate the app'
      ]
    },
    {
      icon: '🚤',
      title: 'For Captains',
      items: [
        'How to register as a captain',
        'How to receive bookings',
        'Payment & subscription guide',
        'How to manage boat information',
        'How to set prices and availability'
      ]
    },
    {
      icon: '💳',
      title: 'Payment & Billing',
      items: [
        'Subscription plans',
        'How to pay subscription via bank transfer',
        'Refund policy',
        'Payment troubleshooting',
        'Receipt upload guide'
      ]
    },
    {
      icon: '📞',
      title: 'Contact & Safety',
      items: [
        'Emergency contacts',
        'Report an issue',
        'Safety guidelines',
        'Customer support hours',
        'Dispute resolution'
      ]
    }
  ];

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
        <h1 className="text-white text-xl">Help Center</h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#666666]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for help..."
            className="w-full h-12 pl-12 pr-4 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-[#3BCEAC] shadow-lg"
          />
        </div>

        {/* FAQ Categories */}
        <div className="space-y-4">
          {faqCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#E8F4F8] transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-[#001D39]">{category.title}</h3>
                </div>
                <ChevronRight className="w-5 h-5 text-[#49769F]" />
              </button>
              
              <div className="border-t border-gray-100">
                {category.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className="w-full px-6 py-3 pl-16 flex items-center justify-between hover:bg-[#E8F4F8] transition-colors border-t border-gray-50 first:border-t-0"
                  >
                    <span className="text-[#666666] text-sm text-left">{item}</span>
                    <ChevronRight className="w-4 h-4 text-[#49769F]" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-[#001D39] text-center mb-4">Still need help?</h3>
          
          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-3 text-[#666666]">
              <Mail className="w-5 h-5 text-[#0A4174]" />
              <span className="text-sm">support@avasdhathuru.mv</span>
            </div>
            
            <div className="flex items-center gap-3 text-[#666666]">
              <Phone className="w-5 h-5 text-[#0A4174]" />
              <span className="text-sm">+960-XXX-XXXX</span>
            </div>
            
            <div className="flex items-center gap-3 text-[#666666]">
              <MessageCircle className="w-5 h-5 text-[#0A4174]" />
              <span className="text-sm">WhatsApp: +960-XXX-XXXX</span>
            </div>
          </div>

          <button
            className="w-full h-12 rounded-xl text-white shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #0A2463 0%, #3BCEAC 100%)'
            }}
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
