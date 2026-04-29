import { Menu, Calendar, Users, MapPin } from 'lucide-react';
import { useState } from 'react';

interface CaptainOrdersProps {
  onNavigate: (screen: string) => void;
}

const orders = [
  {
    id: 1,
    status: 'NEW',
    route: 'Male → Hulhumale',
    from: 'Male',
    to: 'Hulhumale',
    date: '24 Nov 2025',
    time: '10:00 AM',
    passengers: 3,
    price: 'MVR 450',
    customerName: 'Ahmed Mohamed',
    customerPhone: '+960 777 1234'
  },
  {
    id: 2,
    status: 'NEW',
    route: 'Hulhumale → Maafushi',
    from: 'Hulhumale',
    to: 'Maafushi',
    date: '24 Nov 2025',
    time: '2:00 PM',
    passengers: 2,
    price: 'MVR 650',
    customerName: 'Fatima Ali',
    customerPhone: '+960 777 5678'
  },
  {
    id: 3,
    status: 'NEW',
    route: 'Male → Thulusdhoo',
    from: 'Male',
    to: 'Thulusdhoo',
    date: '25 Nov 2025',
    time: '9:00 AM',
    passengers: 5,
    price: 'MVR 800',
    customerName: 'Hassan Ibrahim',
    customerPhone: '+960 777 9012'
  }
];

export default function CaptainOrders({ onNavigate }: CaptainOrdersProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#BDD8E9' }}>
      {/* Sidebar Menu */}
      {menuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>
          <div 
            className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Menu Header */}
            <div className="px-6 py-8"
                 style={{
                   background: 'linear-gradient(135deg, #001D39 0%, #0A4174 100%)'
                 }}>
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4 mx-auto">
                <span className="text-white text-3xl">C</span>
              </div>
              <h3 className="text-white text-center text-lg">Captain Ali</h3>
              <p className="text-white/70 text-center text-sm">+960 777 9999</p>
            </div>

            {/* Menu Items */}
            <div className="flex-1 py-4">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('captain-dashboard');
                }}
                className="w-full px-6 py-4 text-left text-[#001D39] hover:bg-[#BDD8E9] transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('captain-profile');
                }}
                className="w-full px-6 py-4 text-left text-[#001D39] hover:bg-[#BDD8E9] transition-colors"
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('captain-history');
                }}
                className="w-full px-6 py-4 text-left text-[#001D39] hover:bg-[#BDD8E9] transition-colors"
              >
                Order History
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('captain-settings');
                }}
                className="w-full px-6 py-4 text-left text-[#001D39] hover:bg-[#BDD8E9] transition-colors"
              >
                Settings
              </button>
            </div>
          </div>
        </>
      )}

      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between"
           style={{ backgroundColor: '#0A4174' }}>
        <button 
          onClick={() => setMenuOpen(true)}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
        >
          <Menu className="w-5 h-5" style={{ color: '#0A4174' }} />
        </button>
        <h1 className="text-white text-xl">Captain Dashboard</h1>
        <div className="w-10"></div>
      </div>

      {/* Orders List */}
      <div className="px-6 py-6 space-y-4">
        <h2 className="text-[#001D39] mb-2">New Orders</h2>
        
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-md p-5">
            {/* New Badge and Price */}
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm">
                {order.status}
              </span>
              <span className="text-[#0A4174]">{order.price}</span>
            </div>

            {/* Route */}
            <h3 className="text-[#001D39] text-lg mb-4">{order.route}</h3>

            {/* Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2 text-[#49769F]">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p>Pickup: {order.from}</p>
                  <p>Destination: {order.to}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#49769F]">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{order.date} at {order.time}</span>
              </div>

              <div className="flex items-center gap-2 text-[#49769F]">
                <Users className="w-4 h-4" />
                <span className="text-sm">{order.passengers} passengers</span>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <p className="text-sm text-[#001D39]">Customer: {order.customerName}</p>
                <p className="text-sm text-[#49769F]">{order.customerPhone}</p>
              </div>
            </div>

            {/* Accept Button */}
            <button
              className="w-full h-12 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              style={{ backgroundColor: '#0A4174' }}
            >
              Accept Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}