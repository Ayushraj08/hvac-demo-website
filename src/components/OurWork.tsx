import React, { useState } from 'react';
import { Sparkles, MapPin, ArrowRight, Zap } from 'lucide-react';

interface JobCase {
  id: string;
  title: string;
  neighborhood: string;
  badge: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  problem: string;
  solution: string;
  metric: string;
}

const JOBS: JobCase[] = [
  {
    id: 'dc-ranch-condenser',
    title: '5-Ton Inverter Condenser Replacement',
    neighborhood: 'DC Ranch, Scottsdale (85255)',
    badge: 'Condenser Swap',
    beforeImg: '/src/assets/images/hvac_old_failing_unit_1793217557058.jpg',
    afterImg: '/src/assets/images/modern_ac_unit_1793216287439.jpg',
    beforeLabel: 'Before: 15-Yr Rusted Outdoor Condenser (Failed at 108°F)',
    afterLabel: 'After: High-Efficiency Variable Speed Inverter Unit',
    problem: 'Old R-22 outdoor compressor locked up on a Sunday afternoon with indoor temps reaching 89°F.',
    solution: 'Removed rusted unit, leveled gravel pad, and installed ultra-quiet 20 SEER2 inverter condenser.',
    metric: 'House cooled to 72°F in 38 mins · $210/mo utility bill savings',
  },
  {
    id: 'silverleaf-attic',
    title: 'Precision Attic Air Handler & Duct Overhaul',
    neighborhood: 'Silverleaf, North Scottsdale (85255)',
    badge: 'Attic Ductwork',
    beforeImg: '/src/assets/images/hvac_old_attic_ductwork_1793217822905.jpg',
    afterImg: '/src/assets/images/hvac_attic_air_handler_1793217557407.jpg',
    beforeLabel: 'Before: Ruptured Attic Duct & Dusty Leaking Air Handler',
    afterLabel: 'After: Sealed High-Static Air Handler & Merv-13 Foil Ducts',
    problem: 'Severe attic air leakage, dust infiltration, and hot spots in master suite due to torn flex duct.',
    solution: 'Replaced torn ducts with insulated R-8 sealed flex ductwork and balanced multi-zone static airflow.',
    metric: 'Equalized temperature across all 6 zones within ±1°F',
  },
  {
    id: 'troon-emergency',
    title: 'Emergency Blown Capacitor & Contactor Repair',
    neighborhood: 'Troon North, Scottsdale (85262)',
    badge: 'Electrical Rescue',
    beforeImg: '/src/assets/images/hvac_blown_capacitor_before_1793217823876.jpg',
    afterImg: '/src/assets/images/hvac_new_capacitor_after_1793217824269.jpg',
    beforeLabel: 'Before: Scorched Blown Capacitor & Burned Contactor',
    afterLabel: 'After: Brand New OEM Dual-Run Capacitor & Wiring',
    problem: 'AC compressor buzzing loudly without starting; 45µF dual capacitor exploded under extreme summer heat.',
    solution: 'Replaced burned capacitor and contactor with heavy-duty OEM parts from service truck and recalibrated subcooling.',
    metric: 'Cold air restored in 40 mins · $89 diagnostic fee credited to repair',
  },
];

interface OurWorkProps {
  onBookSlot: () => void;
}

export const OurWork: React.FC<OurWorkProps> = ({ onBookSlot }) => {
  const [activeJobId, setActiveJobId] = useState<string>(JOBS[0].id);
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0-100 for before/after
  const [viewMode, setViewMode] = useState<'slider' | 'after' | 'before'>('slider');

  const activeJob = JOBS.find((j) => j.id === activeJobId) || JOBS[0];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - container.left;
    const pct = Math.max(0, Math.min(100, (x / container.width) * 100));
    setSliderPos(pct);
  };

  return (
    <section className="py-10 sm:py-14 bg-slate-100/60 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Matching Scottsdale Transformations</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#0A1F44] tracking-tight mt-1">
              Our Work: Verified Before &amp; After Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Slide or tap to inspect matching before &amp; after pairs for real Scottsdale repairs and swaps.
            </p>
          </div>

          {/* Interactive project switcher buttons */}
          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
            {JOBS.map((job) => (
              <button
                key={job.id}
                onClick={() => {
                  setActiveJobId(job.id);
                  setSliderPos(50);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeJobId === job.id
                    ? 'bg-[#0A1F44] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                {job.badge}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Showcase Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Interactive Before & After Image Canvas (lg: 7 cols) */}
            <div className="lg:col-span-7 relative bg-slate-900 select-none overflow-hidden min-h-[280px] sm:min-h-[380px] flex items-center justify-center">
              {/* After Image (Background) */}
              <img
                src={activeJob.afterImg}
                alt={activeJob.afterLabel}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Before Image (Clipped Overlay for Slider) */}
              {viewMode === 'slider' && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={activeJob.beforeImg}
                    alt={activeJob.beforeLabel}
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', minWidth: '100%' }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/20" />
                </div>
              )}

              {viewMode === 'before' && (
                <img
                  src={activeJob.beforeImg}
                  alt={activeJob.beforeLabel}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* Slider interactive touch surface */}
              {viewMode === 'slider' && (
                <div
                  onMouseMove={handleSliderMove}
                  onTouchMove={handleSliderMove}
                  className="absolute inset-0 cursor-ew-resize z-20 flex items-center"
                  style={{ touchAction: 'none' }}
                >
                  {/* Slider divider line and draggable handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                    style={{ left: `calc(${sliderPos}% - 2px)` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-8 h-8 rounded-full bg-[#0A1F44] border-2 border-white text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                      ↔
                    </div>
                  </div>
                </div>
              )}

              {/* Overlay labels */}
              <div className="absolute top-3 left-3 z-10 pointer-events-none">
                <span className="px-2 py-1 rounded bg-black/75 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                  {viewMode === 'before' ? 'Before (Problem)' : viewMode === 'after' ? 'After (Installed)' : '← Slide: Before vs After →'}
                </span>
              </div>

              <div className="absolute top-3 right-3 z-10 pointer-events-none">
                <span className="px-2 py-1 rounded bg-emerald-600/90 text-white text-[10px] font-bold uppercase tracking-wider">
                  {activeJob.badge}
                </span>
              </div>

              {/* Quick toggle mode buttons */}
              <div className="absolute bottom-3 inset-x-3 z-30 flex items-center justify-between pointer-events-auto">
                <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-lg text-[10px]">
                  <button
                    onClick={() => {
                      setViewMode('slider');
                      setSliderPos(50);
                    }}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      viewMode === 'slider' ? 'bg-white text-slate-900 font-bold' : 'text-slate-300'
                    }`}
                  >
                    Interactive Slider
                  </button>
                  <button
                    onClick={() => setViewMode('before')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      viewMode === 'before' ? 'bg-amber-500 text-slate-900 font-bold' : 'text-slate-300'
                    }`}
                  >
                    View Before
                  </button>
                  <button
                    onClick={() => setViewMode('after')}
                    className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                      viewMode === 'after' ? 'bg-[#2563EB] text-white font-bold' : 'text-slate-300'
                    }`}
                  >
                    View After
                  </button>
                </div>

                <span className="hidden sm:inline text-[10px] text-white/90 bg-black/50 px-2 py-1 rounded">
                  Drag divider to compare
                </span>
              </div>
            </div>

            {/* Job Details & Technical Outcome (lg: 5 cols) */}
            <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-1 text-[11px] text-[#2563EB] font-bold">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{activeJob.neighborhood}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0A1F44] mt-1">
                  {activeJob.title}
                </h3>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-red-50/70 border border-red-100 text-slate-700">
                    <span className="font-bold text-red-900 block mb-0.5">Before Problem:</span>
                    <p className="text-[11px] leading-relaxed text-red-950/80">{activeJob.beforeLabel}</p>
                    <p className="text-[11px] leading-relaxed text-slate-600 mt-1">{activeJob.problem}</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-slate-700">
                    <span className="font-bold text-emerald-900 block mb-0.5">After Resolution:</span>
                    <p className="text-[11px] leading-relaxed text-emerald-950/80">{activeJob.afterLabel}</p>
                    <p className="text-[11px] leading-relaxed text-slate-600 mt-1">{activeJob.solution}</p>
                  </div>
                </div>

                {/* Measurable Verified Metric */}
                <div className="mt-3 p-3 bg-blue-50/80 rounded-xl border border-blue-200/80 flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-[#0A1F44] block">Verified Result:</span>
                    <span className="text-[11px] font-semibold text-[#2563EB]">{activeJob.metric}</span>
                  </div>
                </div>
              </div>

              {/* Direct Booking Link for Similar Work */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Experiencing similar issues?
                </span>
                <button
                  onClick={onBookSlot}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Book Diagnostic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
