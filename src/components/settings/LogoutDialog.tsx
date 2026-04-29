import { LogOut } from 'lucide-react';

interface LogoutDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function LogoutDialog({ isOpen, onCancel, onConfirm }: LogoutDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <LogOut className="w-8 h-8 text-red-600" />
          </div>
          
          <h2 className="text-[#001D39] text-xl mb-2">Logout?</h2>
          <p className="text-[#666666] mb-6">
            Are you sure you want to logout?
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 h-12 border-2 border-gray-200 rounded-xl text-[#001D39] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 h-12 bg-red-600 rounded-xl text-white hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
