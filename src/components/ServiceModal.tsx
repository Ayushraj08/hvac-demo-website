import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { BookingWidget } from './BookingWidget';
import { BookingFormData } from '../types';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: BookingFormData) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, onSuccess }) => {
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-x-hidden overflow-y-auto no-scrollbar">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0A1F44] text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs font-bold tracking-tight text-white">
              Apex Scottsdale HVAC · Instant Quote &amp; Slot Booking
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            aria-label="Close quote modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 sm:p-6 max-h-[85vh] overflow-y-auto no-scrollbar">
          <BookingWidget
            onSuccess={(data) => {
              onClose();
              onSuccess(data);
            }}
            isModalMode={true}
          />
        </div>
      </div>
    </div>
  );
};
