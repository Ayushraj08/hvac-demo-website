import { ServiceOption, IssueOption, TimeSlot, ZipValidationResult } from '../types';

export const SERVICES: ServiceOption[] = [
  {
    id: 'emergency-repair',
    name: 'Emergency AC Repair',
    priceTag: '$89 Diagnostic',
    badge: 'Same-Day Priority',
    description: 'Rapid cooling restoration. Diagnostic fee is 100% waived if you approve any repair.',
    popular: true,
  },
  {
    id: 'replacement-estimate',
    name: 'Full System Replacement Estimate',
    priceTag: '100% Free',
    badge: 'Trane & Lennox Authorized',
    description: 'In-home load calculation, SEER2 rebate assessment, and transparent fixed-price quotes.',
    popular: false,
  },
  {
    id: 'seasonal-tuneup',
    name: 'Seasonal Precision Tune-Up',
    priceTag: '$99 Special',
    badge: '24-Point Inspection',
    description: 'Deep coil sanitization, electrical testing, and subcool refrigerant pressure calibration.',
    popular: false,
  },
];

export const SYSTEM_ISSUES: IssueOption[] = [
  { id: 'blowing-warm', label: 'AC Blowing Warm / Room Temp', iconName: 'Flame', urgency: 'high' },
  { id: 'frozen-coils', label: 'Coils Frozen / Water Leaking', iconName: 'Snowflake', urgency: 'high' },
  { id: 'no-power', label: "System Won't Turn On at All", iconName: 'PowerOff', urgency: 'high' },
  { id: 'strange-noise', label: 'Loud Buzzing, Screeching, or Clicking', iconName: 'Volume2', urgency: 'medium' },
  { id: 'breaker-trip', label: 'Tripping Circuit Breaker / Blank Thermostat', iconName: 'Zap', urgency: 'high' },
  { id: 'full-swap', label: 'Aging Unit (10+ Yrs) / Inefficient Bills', iconName: 'RefreshCw', urgency: 'medium' },
];

export const TIME_SLOTS: TimeSlot[] = [
  {
    id: 'morning',
    label: 'Morning (8:00 AM – 12:00 PM)',
    period: 'Morning',
    availability: '2 slots left today',
    isPopular: true,
  },
  {
    id: 'afternoon',
    label: 'Afternoon (12:00 PM – 4:00 PM)',
    period: 'Afternoon',
    availability: 'Priority window',
    isPopular: false,
  },
  {
    id: 'evening',
    label: 'Evening (4:00 PM – 8:00 PM)',
    period: 'Evening',
    availability: 'Filling quickly',
    isPopular: false,
  },
];

export const SCOTTSDALE_ZIP_CODES: Record<string, string> = {
  '85250': 'Scottsdale (Central / Indian Bend)',
  '85251': 'Scottsdale (Old Town / Waterfront)',
  '85254': 'Scottsdale (Kierland / Paradise Valley Village)',
  '85255': 'Scottsdale (DC Ranch / Silverleaf / Grayhawk)',
  '85257': 'Scottsdale (South Scottsdale)',
  '85258': 'Scottsdale (McCormick Ranch / Gainey Ranch)',
  '85259': 'Scottsdale (McDowell Mountain Ranch / Ancala)',
  '85260': 'Scottsdale (Airpark / Horizon Park)',
  '85262': 'Scottsdale (Troon North / Desert Mountain)',
  '85266': 'Scottsdale (Terravita / North Desert Reserve)',
};

export function validateScottsdaleZip(zip: string): ZipValidationResult {
  const cleanZip = zip.trim().replace(/\D/g, '');
  if (cleanZip.length === 0) {
    return {
      isValid: false,
      isScottsdale: false,
      message: 'Enter 5-digit Scottsdale ZIP code',
    };
  }
  if (cleanZip.length < 5) {
    return {
      isValid: false,
      isScottsdale: false,
      message: 'Enter 5-digit ZIP code',
    };
  }
  if (SCOTTSDALE_ZIP_CODES[cleanZip]) {
    return {
      isValid: true,
      isScottsdale: true,
      territoryName: SCOTTSDALE_ZIP_CODES[cleanZip],
      message: `✓ Verified Scottsdale Service Territory: ${SCOTTSDALE_ZIP_CODES[cleanZip]}`,
    };
  }
  return {
    isValid: false,
    isScottsdale: false,
    message: 'Notice: Non-Scottsdale ZIP code. We prioritize Scottsdale, AZ territory (e.g. 85251, 85254, 85255, 85260).',
  };
}

export const RECENT_BOOKINGS = [
  { name: 'David K.', neighborhood: 'McCormick Ranch (85258)', service: 'Emergency AC Repair', timeAgo: '18 min ago' },
  { name: 'Sarah M.', neighborhood: 'DC Ranch (85255)', service: 'Full System Estimate', timeAgo: '42 min ago' },
  { name: 'Robert T.', neighborhood: 'Kierland (85254)', service: 'Seasonal AC Tune-Up', timeAgo: '1 hr ago' },
  { name: 'Elena V.', neighborhood: 'Old Town (85251)', service: 'Emergency Diagnostic', timeAgo: '2 hrs ago' },
];

export const TESTIMONIALS = [
  {
    author: 'Brent Hollister',
    neighborhood: 'DC Ranch, Scottsdale (85255)',
    rating: 5,
    title: 'AC gave out at 106°F — Mark was here in 45 minutes.',
    comment: 'The online booking gave us an exact slot immediately without having to wait on hold. Our capacitor was blown and they had the genuine Trane part on the truck. Diagnostic fee was applied directly to the repair. Outstanding service.',
    date: '3 days ago',
    verified: true,
  },
  {
    author: 'Caroline & Michael Sterling',
    neighborhood: 'McCormick Ranch (85258)',
    rating: 5,
    title: 'Flawless 5-ton high-efficiency replacement.',
    comment: 'Got 3 estimates in Scottsdale. Apex was the only one that performed an actual manual J calculation instead of just guessing unit size. Saved us $1,800 through SRP utility rebates and 0% financing.',
    date: 'Last week',
    verified: true,
  },
  {
    author: 'Jason DeWitt',
    neighborhood: 'Troon North (85262)',
    rating: 5,
    title: 'No after-hours penalty fees is real.',
    comment: 'Called on a Sunday evening after 6 PM when the upstairs unit stopped cooling. Tech arrived with SMS notification beforehand and fixed the contactor in 30 minutes. Transparent flat rates.',
    date: '2 weeks ago',
    verified: true,
  },
];
