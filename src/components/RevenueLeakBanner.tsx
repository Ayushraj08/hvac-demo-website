import React, { useState, useEffect } from 'react';
import { Zap, MapPin } from 'lucide-react';
import { RECENT_BOOKINGS } from '../data/hvacData';

export const RevenueLeakBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % RECENT_BOOKINGS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const booking = RECENT_BOOKINGS[currentIndex];

  return (
    <div className="bg-[#0A1F44] text-white border-b border-blue-950/40 text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        {/* Core Conversion micro-copy badge */}
        <div className="flex items-center gap-2 justify-center">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold tracking-tight text-[11px] border border-amber-500/30">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>High Scottsdale Demand</span>
          </span>
          <span className="font-semibold text-slate-200">
            ⚡ 3 Homeowners booked in Scottsdale in the last 4 hours.
          </span>
        </div>

        {/* Dynamic recent dispatch feed */}
        <div className="hidden md:flex items-center gap-2 text-slate-300 text-[11px]">
          <MapPin className="w-3 h-3 text-[#2563EB]" />
          <span>Latest slot:</span>
          <span className="font-semibold text-white">{booking.name}</span>
          <span className="text-slate-400">in {booking.neighborhood}</span>
          <span className="text-amber-400">({booking.service})</span>
          <span className="text-slate-400">· {booking.timeAgo}</span>
        </div>
      </div>
    </div>
  );
};
