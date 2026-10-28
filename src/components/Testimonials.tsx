import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS } from '../data/hvacData';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Real Scottsdale Homeowner Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1F44] tracking-tight mt-2">
              Rated 4.9 Stars Across 200+ Verified Homes
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-800">4.9 / 5.0 Google &amp; Yelp</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500">{t.date}</span>
                </div>

                <h3 className="text-sm font-bold text-[#0A1F44] mb-2 leading-snug">
                  &ldquo;{t.title}&rdquo;
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.comment}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.author}</h4>
                  <p className="text-[11px] text-slate-500">{t.neighborhood}</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
