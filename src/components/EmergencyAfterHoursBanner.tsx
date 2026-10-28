import React, { useState } from 'react';
import { Moon, ArrowRight, X } from 'lucide-react';

interface EmergencyAfterHoursBannerProps {
  onQuickBook: () => void;
}

export const EmergencyAfterHoursBanner: React.FC<EmergencyAfterHoursBannerProps> = ({ onQuickBook }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 bg-[#0A1F44] text-white border-t border-amber-500/30 px-3 py-2 shadow-lg max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Moon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <p className="text-xs text-slate-200 truncate">
            Shopping after 6 PM? <span className="text-amber-300 font-semibold">Reserve tomorrow&apos;s priority slot</span> before schedule fills up.
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onQuickBook}
            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-[#0A1F44] bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
          >
            <span>Quick Book</span>
            <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-slate-400 hover:text-white rounded"
            aria-label="Dismiss after-hours notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
