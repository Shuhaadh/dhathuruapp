import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { subscribeToMessages, sendMessage, Message } from '../services/chatService';
import { auth } from '../config/firebase';

interface ChatScreenProps {
  bookingId: string;
  otherPersonName: string;
  otherPersonType: 'customer' | 'captain';
  route: string;
  onBack: () => void;
}

export default function ChatScreen({ 
  bookingId, 
  otherPersonName, 
  otherPersonType,
  route,
  onBack 
}: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!bookingId) return;

    // Subscribe to real-time messages
    const unsubscribe = subscribeToMessages(bookingId, (msgs) => {
      setMessages(msgs);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [bookingId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !currentUser || sending) return;

    setSending(true);

    try {
      const senderType = otherPersonType === 'customer' ? 'captain' : 'customer';
      
      await sendMessage(
        bookingId,
        currentUser.uid,
        currentUser.displayName || (senderType === 'customer' ? 'Customer' : 'Captain'),
        senderType,
        newMessage
      );

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp: any) => {
    if (!timestamp || !timestamp.toDate) return '';
    
    const date = timestamp.toDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${hours}:${minutes}`;
  };

  const isMyMessage = (message: Message) => {
    return message.senderId === currentUser?.uid;
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#E8F4F8' }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center"
           style={{ background: 'linear-gradient(90deg, #0A2463 0%, #3BCEAC 100%)' }}>
        <button onClick={onBack} 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-4">
          <ArrowLeft className="w-5 h-5" style={{ color: '#0A2463' }} />
        </button>
        <div className="flex-1">
          <h1 className="text-white text-lg font-bold">{otherPersonName}</h1>
          <p className="text-white/80 text-sm">{route}</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">No messages yet</p>
            <p className="text-gray-500 text-sm">Start the conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${isMyMessage(message) ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    isMyMessage(message)
                      ? 'bg-[#0A2463] text-white rounded-br-sm'
                      : 'bg-white text-[#001D39] rounded-bl-sm'
                  }`}
                >
                  {!isMyMessage(message) && (
                    <p className="text-xs font-bold mb-1 opacity-70">
                      {message.senderName}
                    </p>
                  )}
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                  <p className={`text-[11px] mt-1 ${
                    isMyMessage(message) ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {formatTime(message.createdAt)}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-end gap-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-[#0A2463] resize-none max-h-32"
            rows={1}
            style={{ minHeight: '44px' }}
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
            className="w-12 h-12 rounded-full flex items-center justify-center disabled:opacity-50"
            style={{ backgroundColor: '#0A2463' }}
          >
            {sending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}