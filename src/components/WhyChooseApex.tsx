import React from 'react';
import { DollarSign, ShieldCheck, Zap, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface WhyChooseApexProps {
  onOpenBooking: () => void;
}

export const WhyChooseApex: React.FC<WhyChooseApexProps> = ({ onOpenBooking }) => {
  return (
    <section id="services" className="py-16 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            Built For Scottsdale Homeowners
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1F44] tracking-tight mt-2">
            Why High-Value Scottsdale Properties Trust Apex
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            In 110°F+ Arizona heat, air conditioning isn&apos;t a luxury—it is emergency home infrastructure. We operate on transparent, flat-rate pricing with zero surprise invoices.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Diagnostic Fee Credit (Big Feature) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-[#2563EB] mb-5">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Guaranteed Fair Billing
              </span>
              <h3 className="text-2xl font-bold text-[#0A1F44] mt-1">
                $89 Diagnostic Fee 100% Credited to Any Repair
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                Unlike contractors who hit you with trip fees on top of inflated labor, your $89 comprehensive electrical, subcooling, and compressor diagnostic is immediately credited toward your repair invoice. If you proceed with repair, the diagnostic is effectively free.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero weekend charges</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No night surge pricing</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Upfront quote before work</span>
              </div>
            </div>
          </div>

          {/* Card 2: Modern Installation Asset */}
          <div className="lg:col-span-5 bg-[#0A1F44] text-white rounded-3xl overflow-hidden shadow-xl border border-blue-950 flex flex-col">
            <div className="h-52 relative overflow-hidden">
              <img
                src="/src/assets/images/modern_ac_unit_1793216287439.jpg"
                alt="New high efficiency Trane and Lennox condenser installed in Scottsdale AZ"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44] via-transparent to-transparent" />
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-[#0A1F44]">
                SEER2 Upgrades
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-white">
                  SRP &amp; APS Rebate Specialists
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Upgrade to high-efficiency inverter heat pumps or dual-stage central cooling. We file all utility paperwork directly for up to $1,800 in instant rebates.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-blue-900/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-300">
                  0% APR Financing for 18 Mos Available
                </span>
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-amber-300"
                >
                  <span>Estimate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 3 Value Pillars */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#0A1F44]">
              Licensed AZ ROC #328491
            </h4>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Every technician is EPA Universal certified, background checked, and drug-screened. We protect high-value desert homes with drop cloths and shoe covers.
            </p>
          </div>

          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#2563EB] mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#0A1F44]">
              Stocked Mobile Warehouses
            </h4>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Over 85% of cooling emergencies are resolved on the first visit. Our Scottsdale trucks carry universal motors, capacitors, contactors, and TXV valves.
            </p>
          </div>

          <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#0A1F44]">
              1-Year Repair Warranty
            </h4>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              All replaced parts and labor are backed by our full 365-day Scottsdale guarantee. If the same component fails, we replace it at zero charge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
