import React, { useState } from 'react';
import { MapPin, CheckCircle2, Clock, Shield, Search } from 'lucide-react';
import { SCOTTSDALE_ZIP_CODES, validateScottsdaleZip } from '../data/hvacData';

interface ScottsdaleTerritoryProps {
  onSelectZip: (zip: string) => void;
}

export const ScottsdaleTerritory: React.FC<ScottsdaleTerritoryProps> = ({ onSelectZip }) => {
  const [searchZip, setSearchZip] = useState('');
  const [result, setResult] = useState<ReturnType<typeof validateScottsdaleZip> | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchZip) return;
    setResult(validateScottsdaleZip(searchZip));
  };

  return (
    <section id="scottsdale-coverage" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Scottsdale Focus */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Local Service Territory
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1F44] tracking-tight mt-2">
              Dedicated Scottsdale Dispatch Zones
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              We do not stretch technicians across the entire Phoenix valley. By maintaining designated routes strictly in Scottsdale and adjacent communities, our response times remain among the fastest in Maricopa County.
            </p>

            {/* Interactive ZIP Lookup tool */}
            <form onSubmit={handleSearch} className="mt-6 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Check Your Scottsdale Neighborhood Response Time
              </label>

              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="Enter Scottsdale ZIP (e.g. 85255)"
                    value={searchZip}
                    onChange={(e) => setSearchZip(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#0A1F44] hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
                >
                  Verify Territory
                </button>
              </div>

              {result && (
                <div className="mt-3 text-xs">
                  {result.isValid ? (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>
                          <strong>{result.territoryName}</strong> — Same-day guaranteed dispatch zone. Average response 35–50 mins.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectZip(searchZip)}
                        className="px-3 py-1 bg-emerald-700 text-white font-bold rounded-lg hover:bg-emerald-800 transition-colors shrink-0 text-[11px]"
                      >
                        Book This ZIP
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                      {result.message}
                    </div>
                  )}
                </div>
              )}
            </form>

            <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2563EB]" />
                <span>24/7/365 On-Call Fleet</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>Zero Travel Sur-Charges</span>
              </div>
            </div>
          </div>

          {/* Right Column: Grid of Scottsdale Zip Codes */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#0A1F44] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2563EB]" />
                <span>Covered Scottsdale Communities</span>
              </h4>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Active Priority
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.entries(SCOTTSDALE_ZIP_CODES).map(([zip, area]) => (
                <button
                  key={zip}
                  type="button"
                  onClick={() => onSelectZip(zip)}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-[#2563EB] hover:bg-blue-50/50 transition-colors text-left group"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-[#2563EB] block">
                      ZIP {zip}
                    </span>
                    <span className="text-[11px] text-slate-500 truncate block">
                      {area.replace('Scottsdale (', '').replace(')', '')}
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold text-[#2563EB] bg-blue-100/60 px-2 py-0.5 rounded shrink-0">
                    Book
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
