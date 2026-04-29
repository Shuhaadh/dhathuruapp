import { ArrowLeft, Send, User as UserIcon } from 'lucide-react';
import { useState } from 'react';

interface ChatWithCustomerProps {
  onNavigate: (screen: string) => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'captain' | 'customer';
  timestamp: string;
}

export default function ChatWithCustomer({ onNavigate }: ChatWithCustomerProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! I saw your trip request. I can help with that.', sender: 'captain', timestamp: '10:30 AM' },
    { id: '2', text: 'Great! What time can we depart?', sender: 'customer', timestamp: '10:32 AM' },
    { id: '3', text: 'I can depart at 10:00 AM as requested. The weather looks good for that time.', sender: 'captain', timestamp: '10:33 AM' },
    { id: '4', text: 'Perfect! How long will the journey take?', sender: 'customer', timestamp: '10:35 AM' },
    { id: '5', text: 'About 45 minutes to Maafushi from Male. We will make it comfortable.', sender: 'captain', timestamp: '10:36 AM' },
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: String(messages.length + 1),
        text: message,
        sender: 'captain',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#E8F4F8' }}>
      {/* Header */}
      <div className="px-6 pt-12 pb-4 flex-shrink-0"
           style={{
             background: 'linear-gradient(180deg, #0A2463 0%, #3BCEAC 100%)'
           }}>
        <button
          onClick={() => onNavigate('my-taken-bookings')}
          className="mb-4 text-white"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        {/* Customer Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center"
                 style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white text-xl">John Smith</h2>
              <p className="text-white/70 text-sm">Customer</p>
            </div>
          </div>
          
          {/* Trip Details */}
          <div className="pt-3 border-t border-white/20">
            <p className="text-white/80 text-sm mb-1">Trip: Male → Maafushi</p>
            <p className="text-white/80 text-sm">Your Offer: MVR 2,500</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'captain' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                msg.sender === 'captain' 
                  ? 'rounded-tr-sm' 
                  : 'rounded-tl-sm'
              }`}
              style={{
                backgroundColor: msg.sender === 'captain' ? '#0A2463' : '#FFFFFF',
                color: msg.sender === 'captain' ? '#FFFFFF' : '#0A2463'
              }}
            >
              <p className="mb-1">{msg.text}</p>
              <p className={`text-xs ${msg.sender === 'captain' ? 'text-white/60' : 'text-gray-400'}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 bg-white border-t" style={{ borderColor: '#E5E7EB' }}>
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 h-12 px-4 rounded-full border focus:outline-none focus:ring-2"
            style={{ 
              borderColor: '#E5E7EB',
              backgroundColor: '#F9FAFB'
            }}
          />
          <button
            onClick={handleSend}
            className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#3BCEAC' }}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
