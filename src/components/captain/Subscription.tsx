import { ArrowLeft, Check, Upload, AlertTriangle, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

interface SubscriptionProps {
  onNavigate: (screen: string) => void;
}

export default function Subscription({ onNavigate }: SubscriptionProps) {
  const [uploading, setUploading] = useState(false);

  const handleUploadReceipt = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      toast.success('Receipt uploaded successfully');
    }, 1500);
  };

  const paymentHistory = [
    { date: 'Nov 25, 2025', amount: 500, status: 'paid' },
    { date: 'Oct 25, 2025', amount: 500, status: 'paid' },
    { date: 'Sep 25, 2025', amount: 500, status: 'paid' },
    { date: 'Aug 25, 2025', amount: 500, status: 'paid' }
  ];

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
        <h1 className="text-white text-xl">Subscription</h1>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#001D39]">Subscription Status</h3>
            <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              <Check className="w-4 h-4" />
              Active
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[#666666]">Plan</span>
              <span className="text-[#001D39]">Basic</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">Monthly Fee</span>
              <span className="text-[#001D39]">MVR 500</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">Next payment due</span>
              <span className="text-[#001D39]">December 25, 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">Days remaining</span>
              <span className="text-green-600">28 days</span>
            </div>
          </div>
        </div>

        {/* Payment Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-[#001D39] mb-4">Payment Information</h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-[#666666]">Bank</span>
              <span className="text-[#001D39]">Bank of Maldives</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">Account Name</span>
              <span className="text-[#001D39]">Avas Dhathuru</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">Account Number</span>
              <span className="text-[#001D39]">7730000123456</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">Reference Code</span>
              <span className="text-[#001D39]">CAP001234</span>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-orange-800">
              <strong>Important:</strong> Always include reference code in payment!
            </p>
          </div>
        </div>

        {/* Upload Receipt */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-[#001D39] mb-3">Upload Payment Receipt</h3>
          <p className="text-sm text-[#666666] mb-4">
            Upload screenshot of bank transfer after making payment
          </p>
          
          <button
            onClick={handleUploadReceipt}
            disabled={uploading}
            className="w-full h-12 border-2 border-dashed border-[#3BCEAC] rounded-xl text-[#0A4174] flex items-center justify-center gap-2 hover:bg-[#E8F4F8] transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-[#0A4174] border-t-transparent rounded-full animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span>Upload Payment Receipt</span>
              </>
            )}
          </button>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#001D39]">Payment History</h3>
            <button className="text-[#0A4174] text-sm hover:underline flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {paymentHistory.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#E8F4F8] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[#001D39]">{payment.date}</p>
                    <p className="text-sm text-[#666666]">MVR {payment.amount}</p>
                  </div>
                </div>
                <span className="text-sm text-green-600">Paid</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reminder Info */}
        <div className="bg-[#E8F4F8] border border-[#3BCEAC]/30 rounded-2xl p-4">
          <h4 className="text-[#001D39] mb-2">Reminder Notifications</h4>
          <p className="text-sm text-[#666666] mb-1">Last reminder: Nov 22, 2025</p>
          <p className="text-sm text-[#666666]">"Your subscription expires in 3 days"</p>
        </div>

        {/* Contact Support */}
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
  );
}
