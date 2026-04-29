import { ArrowLeft, Calendar, Users, MapPin, CheckCircle } from 'lucide-react';

interface CaptainHistoryProps {
  onNavigate: (screen: string) => void;
}

const completedOrders = [
  {
    id: 1,
    route: 'Male → Hulhumale',
    from: 'Male',
    to: 'Hulhumale',
    date: '20 Nov 2025',
    time: '10:00 AM',
    passengers: 3,
    price: 'MVR 450',
    customerName: 'Ahmed Mohamed',
    status: 'Completed'
  },
  {
    id: 2,
    route: 'Hulhumale → Maafushi',
    from: 'Hulhumale',
    to: 'Maafushi',
    date: '18 Nov 2025',
    time: '2:00 PM',
    passengers: 2,
    price: 'MVR 650',
    customerName: 'Fatima Ali',
    status: 'Completed'
  },
  {
    id: 3,
    route: 'Male → Thulusdhoo',
    from: 'Male',
    to: 'Thulusdhoo',
    date: '15 Nov 2025',
    time: '9:00 AM',
    passengers: 5,
    price: 'MVR 800',
    customerName: 'Hassan Ibrahim',
    status: 'Completed'
  },
  {
    id: 4,
    route: 'Maafushi → Male',
    from: 'Maafushi',
    to: 'Male',
    date: '12 Nov 2025',
    time: '4:00 PM',
    passengers: 4,
    price: 'MVR 700',
    customerName: 'Aisha Mohamed',
    status: 'Completed'
  }
];

export default function CaptainHistory({ onNavigate }: CaptainHistoryProps) {
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
        <h1 className="text-white text-xl">Order History</h1>
      </div>

      {/* Orders List */}
      <div className="px-6 py-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[#001D39]">Completed Trips</h2>
          <span className="text-sm text-[#49769F]">{completedOrders.length} trips</span>
        </div>
        
        {completedOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-md p-5">
            {/* Status Badge and Price */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-600 text-sm">{order.status}</span>
              </div>
              <span className="text-[#0A4174]">{order.price}</span>
            </div>

            {/* Route */}
            <h3 className="text-[#001D39] text-lg mb-4">{order.route}</h3>

            {/* Details */}
            <div className="space-y-3">
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

              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-[#001D39]">Customer: {order.customerName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}