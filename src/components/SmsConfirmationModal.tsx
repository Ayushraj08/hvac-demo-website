import React, { useEffect } from 'react';
import { CheckCircle2, Phone, Calendar, X, Truck } from 'lucide-react';
import { BookingFormData } from '../types';
import { SERVICES, SCOTTSDALE_ZIP_CODES } from '../data/hvacData';

interface SmsConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: BookingFormData;
}

export const SmsConfirmationModal: React.FC<SmsConfirmationModalProps> = ({
  isOpen,
  onClose,
  bookingData,
}) => {
  // Prevent background body scroll when modal is open to eliminate dual scrollbars
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

  const selectedService = SERVICES.find((s) => s.id === bookingData.serviceId) || SERVICES[0];
  const zipTerritory = SCOTTSDALE_ZIP_CODES[bookingData.zipCode] || `Scottsdale (${bookingData.zipCode || '85255'})`;

  const dateFormatted =
    bookingData.dateType === 'today'
      ? 'Today'
      : bookingData.dateType === 'tomorrow'
      ? 'Tomorrow'
      : bookingData.selectedDate || 'Upcoming Date';

  const timeSlotFormatted =
    bookingData.selectedTimeSlot === 'morning'
      ? '8:00 AM – 12:00 PM'
      : bookingData.selectedTimeSlot === 'afternoon'
      ? '12:00 PM – 4:00 PM'
      : '4:00 PM – 8:00 PM';

  const customerPhone = bookingData.phoneNumber || '(480) 555-0188';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-x-hidden overflow-y-auto no-scrollbar">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        {/* Clean Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0A1F44] text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold tracking-tight">
              Appointment Reserved · Scottsdale Dispatch
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Minimal Success Notice */}
        <div className="px-4 py-2.5 bg-emerald-50 border-b border-emerald-100 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <p className="text-xs font-semibold text-emerald-950">
            Slot Confirmed. Tech texts 15 minutes before arrival.
          </p>
        </div>

        {/* STREAMLINED SMS PREVIEW (Conversion Driver D) */}
        <div className="p-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold mb-2">
            <span>Automated SMS Confirmation</span>
            <span className="text-slate-400">Sent to {customerPhone}</span>
          </div>

          <div className="bg-white rounded-xl border border-slate-300 p-3.5 shadow-xs">
            {/* SMS Header */}
            <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-slate-100">
              <div className="w-6 h-6 rounded-full bg-[#0A1F44] text-amber-300 flex items-center justify-center text-[10px] font-bold shrink-0">
                ▲
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  Apex Dispatch (480) 555-0199
                </p>
              </div>
            </div>

            {/* Core SMS Text Bubble */}
            <div className="bg-blue-50/90 border border-blue-200/70 rounded-xl p-3 text-xs text-slate-800 space-y-2">
              <p className="font-bold text-[#0A1F44] leading-snug">
                ✓ Appointment Reserved for Scottsdale, AZ. Confirmation SMS sent to customer &amp; dispatched to technician.
              </p>

              <div className="pt-2 border-t border-blue-200/60 text-[11px] space-y-1 text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold text-slate-900">{selectedService.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Window:</span>
                  <span className="font-semibold text-slate-900">{dateFormatted} · {timeSlotFormatted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Zone:</span>
                  <span className="font-semibold text-slate-900">{zipTerritory}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Diagnostic Fee:</span>
                  <span className="font-bold text-emerald-700">{selectedService.priceTag} (Waived w/ Repair)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Technician - Clean & Compact */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <img
              src="/src/assets/images/technician_avatar_1793216287916.jpg"
              alt="Technician Mark R."
              className="w-11 h-11 rounded-full object-cover border border-[#2563EB] shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-slate-900 truncate">
                  Master Tech Mark R.
                </h5>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                  Dispatched
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Scottsdale Van #04 · Stocked with OEM Trane &amp; Lennox parts
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:4805552739"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#0A1F44] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call Dispatch</span>
            </a>

            <button
              onClick={() => {
                alert('Calendar invite (.ics) ready: Apex Scottsdale HVAC Service Window added.');
              }}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold rounded-xl transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Add to Calendar</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full text-center text-xs font-medium text-slate-500 hover:text-slate-800 py-1 transition-colors"
          >
            Done / Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
