import React from 'react';
import { Phone, Shield, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A1F44] text-white py-8 border-t border-blue-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="w-5 h-5 rounded bg-[#2563EB] flex items-center justify-center text-amber-300 font-bold text-[10px]">
                ▲
              </span>
              <span className="font-bold text-white tracking-tight">
                Apex Scottsdale HVAC
              </span>
              <span className="text-slate-400">· AZ ROC #328491</span>
            </div>
            <p className="text-slate-400 text-[11px] mt-1">
              8390 E Greenway Rd, Scottsdale, AZ 85260 · 24/7 Priority Emergency Dispatch
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:4805552739"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-900/60 hover:bg-blue-800 text-white rounded-lg transition-colors font-semibold text-xs"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>(480) 555-APEX</span>
            </a>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-blue-900/40 text-center text-[10px] text-slate-500">
          © {new Date().getFullYear()} Apex Scottsdale HVAC Services. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
