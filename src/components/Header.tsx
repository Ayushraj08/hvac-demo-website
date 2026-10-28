import React from 'react';
import { Phone, Calendar } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 w-full">
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Brand Wordmark - Responsive to prevent clipping on mobile */}
          <a href="#" className="flex items-center gap-2 min-w-0 shrink">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0A1F44] flex items-center justify-center text-amber-400 font-extrabold text-xs sm:text-sm shrink-0 shadow-xs">
              ▲
            </div>
            <div className="min-w-0">
              <span className="text-sm sm:text-lg font-bold tracking-tight text-[#0A1F44] truncate block">
                Apex <span className="hidden xs:inline">Scottsdale</span> <span className="text-[#2563EB]">HVAC</span>
              </span>
              <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium -mt-0.5 hidden sm:block truncate">
                ROC #328491 · 24/7 Scottsdale Dispatch
              </span>
            </div>
          </a>

          {/* Quick Direct Actions - Compact & Never Overflowing */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <a
              href="tel:4805552739"
              aria-label="Call Apex Scottsdale HVAC"
              className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold text-slate-700 hover:text-[#0A1F44] bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="hidden sm:inline">(480) 555-APEX</span>
              <span className="sm:hidden text-[11px] font-bold">Call</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>Book Slot</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
