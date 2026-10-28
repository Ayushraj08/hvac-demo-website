import React from 'react';
import { ShieldCheck, DollarSign, Clock, Star, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../data/hvacData';

export const TrustProof: React.FC = () => {
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* 3 Core Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center shrink-0">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0A1F44]">
                $89 Diagnostic Waived
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                100% credited toward your repair. No hidden travel fees.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0A1F44]">
                Zero Overtime Charges
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Same flat rates nights, weekends, and holidays.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0A1F44]">
                Scottsdale Territory
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Priority routes in 85251, 85254, 85255, 85258 &amp; 85260.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Concise Reviews */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Verified Scottsdale Homeowner Reviews
            </h3>
            <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.9 / 5.0 (200+ Reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center text-amber-400 mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="font-semibold text-slate-800 leading-snug">&ldquo;{t.title}&rdquo;</p>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{t.author}</span>
                  <span className="text-slate-400">{t.neighborhood.split(',')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
