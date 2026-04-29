import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

interface DeleteAccountDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  userType: 'customer' | 'captain';
  hasActiveBookings?: boolean;
  activeBookingsCount?: number;
}

export default function DeleteAccountDialog({ 
  isOpen, 
  onCancel, 
  onConfirm, 
  userType,
  hasActiveBookings = false,
  activeBookingsCount = 0
}: DeleteAccountDialogProps) {
  const [confirmText, setConfirmText] = useState('');

  if (!isOpen) return null;

  const isConfirmValid = confirmText === 'DELETE';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col">
          {/* Close button */}
          <button
            onClick={onCancel}
            className="self-end text-[#666666] hover:text-[#001D39] mb-2"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Warning Icon */}
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            
            <h2 className="text-[#001D39] text-xl mb-2">Delete Account?</h2>
            <p className="text-[#666666] mb-4">
              This action cannot be undone. All your data will be permanently deleted:
            </p>

            {/* Data List */}
            <div className="bg-red-50 rounded-xl p-4 mb-4 w-full text-left">
              <ul className="text-sm text-[#666666] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Your profile and contact information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>All booking history</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">•</span>
                  <span>Messages and notifications</span>
                </li>
                {userType === 'captain' && (
                  <>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">•</span>
                      <span>Subscription status</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600">•</span>
                      <span>Payment records</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Active Bookings Warning */}
            {hasActiveBookings ? (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4 w-full text-left">
                <p className="text-sm text-orange-800 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>
                    You have {activeBookingsCount} active booking{activeBookingsCount !== 1 ? 's' : ''}. 
                    Please complete them before deleting your account.
                  </span>
                </p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 w-full text-left">
                <p className="text-sm text-green-800 flex items-center gap-2">
                  <span>✓</span>
                  <span>You have no active bookings.</span>
                </p>
              </div>
            )}

            {/* Confirmation Input */}
            <div className="w-full mb-6">
              <label className="block text-[#001D39] text-sm mb-2 text-left">
                Type <strong>DELETE</strong> to confirm
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
                placeholder="Type DELETE"
                className="w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 w-full">
              <button
                onClick={onCancel}
                className="flex-1 h-12 border-2 border-gray-200 rounded-xl text-[#001D39] hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={!isConfirmValid || hasActiveBookings}
                className="flex-1 h-12 bg-red-600 rounded-xl text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
