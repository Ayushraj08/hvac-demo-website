import React from 'react';
import { Shield, Clock, Star, ArrowRight, Zap } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative pt-4 pb-6 sm:pt-10 sm:pb-12 bg-white border-b border-slate-200 overflow-hidden w-full">
      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            {/* Real-Time Revenue-Leak Micro-Copy Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] sm:text-xs font-semibold max-w-full">
              <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500 shrink-0" />
              <span className="truncate sm:whitespace-normal">⚡ 3 Homeowners booked in Scottsdale in the last 4 hours.</span>
            </div>

            {/* Required Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0A1F44] tracking-tight leading-tight">
              Scottsdale&apos;s Premier 24/7 Heating &amp; AC Specialists
            </h1>

            {/* Required Subheadline */}
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-xl">
              Lock in your emergency diagnostic or replacement estimate in under 60 seconds.
            </p>

            {/* Trust Badges - Fluid wrapping without clipping */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5 text-[11px] sm:text-xs text-slate-700 font-semibold">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-md">
                <Shield className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                <span>Licensed &amp; Insured</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-md">
                <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Same-Day Service</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-md">
                <div className="flex items-center text-amber-500 shrink-0">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </div>
                <span>4.9 ★★★★★ (200+ Reviews)</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-[#2563EB] hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Get Instant Quote &amp; Book Slot</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>

          {/* Minimal Clean Image */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[16/10] sm:aspect-[4/3] bg-slate-100 w-full">
              <img
                src="/src/assets/images/hvac_hero_scottsdale_1793216287692.jpg"
                alt="Apex Scottsdale HVAC Specialist"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-lg border border-slate-200 flex items-center justify-between text-[11px] font-semibold text-[#0A1F44]">
                <span>Priority Scottsdale Dispatch</span>
                <span className="text-emerald-700 font-bold">● Active Routes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
