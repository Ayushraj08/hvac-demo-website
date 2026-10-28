import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Check,
  MapPin,
} from 'lucide-react';
import { SERVICES, SYSTEM_ISSUES, TIME_SLOTS, validateScottsdaleZip } from '../data/hvacData';
import { BookingFormData, ZipValidationResult } from '../types';

interface BookingWidgetProps {
  onSuccess: (data: BookingFormData) => void;
  isModalMode?: boolean;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({ onSuccess, isModalMode = false }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: 'emergency-repair',
    selectedIssue: 'blowing-warm',
    dateType: 'today',
    selectedDate: new Date().toISOString().split('T')[0],
    selectedTimeSlot: 'morning',
    fullName: '',
    phoneNumber: '',
    zipCode: '85255',
    notes: '',
  });

  // Validation State for Step 3
  const [errors, setErrors] = useState<{ name?: string; phone?: string; zip?: string }>({});
  const [zipValidation, setZipValidation] = useState<ZipValidationResult>(
    validateScottsdaleZip('85255')
  );

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setFormData((prev) => ({ ...prev, zipCode: value }));
    const result = validateScottsdaleZip(value);
    setZipValidation(result);

    if (errors.zip) {
      setErrors((prev) => ({ ...prev, zip: undefined }));
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; phone?: string; zip?: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    const cleanPhone = formData.phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      newErrors.phone = 'Valid phone required for 15-min SMS notice.';
    }

    if (!zipValidation.isValid) {
      newErrors.zip = 'Valid Scottsdale ZIP required (e.g. 85251, 85254, 85255, 85260).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSuccess(formData);
  };

  const selectedServiceObj = SERVICES.find((s) => s.id === formData.serviceId) || SERVICES[0];

  return (
    <div
      id="quote-booking"
      className={`w-full max-w-3xl mx-auto ${
        isModalMode ? '' : 'p-3.5 sm:p-6 bg-white rounded-2xl shadow-sm border border-slate-200'
      }`}
    >
      {/* Minimal Stepper Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            {currentStep === 1 && 'Step 1: Choose Service & Issue'}
            {currentStep === 2 && 'Step 2: Select Date & Time'}
            {currentStep === 3 && 'Step 3: Confirm Dispatch'}
          </span>
          <span className="text-xs font-medium text-slate-500">
            {currentStep} of 3
          </span>
        </div>

        {/* Progress indicator */}
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => setCurrentStep(1)}
            aria-label="Step 1"
            className={`h-1.5 rounded-full transition-colors cursor-pointer ${
              currentStep >= 1 ? 'bg-[#2563EB]' : 'bg-slate-200'
            }`}
          />
          <button
            type="button"
            onClick={() => currentStep > 1 && setCurrentStep(2)}
            aria-label="Step 2"
            className={`h-1.5 rounded-full transition-colors cursor-pointer ${
              currentStep >= 2 ? 'bg-[#2563EB]' : 'bg-slate-200'
            }`}
          />
          <button
            type="button"
            onClick={() => currentStep > 2 && setCurrentStep(3)}
            aria-label="Step 3"
            className={`h-1.5 rounded-full transition-colors cursor-pointer ${
              currentStep === 3 ? 'bg-[#2563EB]' : 'bg-slate-200'
            }`}
          />
        </div>
      </div>

      {/* STEP 1: SERVICE TYPE & DYNAMIC ISSUE SELECTION */}
      {currentStep === 1 && (
        <div className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {SERVICES.map((service) => {
              const isSelected = formData.serviceId === service.id;
              return (
                <div
                  key={service.id}
                  onClick={() => setFormData((prev) => ({ ...prev, serviceId: service.id }))}
                  className={`cursor-pointer rounded-xl p-3 border-2 transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#2563EB] bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase text-[#2563EB]">
                        {service.badge}
                      </span>
                      <div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${
                          isSelected ? 'bg-[#2563EB] border-[#2563EB] text-white' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-2 h-2" />}
                      </div>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0A1F44]">{service.name}</h3>
                  </div>
                  <div className="mt-2.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Rate:</span>
                    <span className="font-bold text-[#0A1F44]">{service.priceTag}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Clickable Issue Cards (Conversion Driver B) */}
          <div className="pt-1">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Current Issue (No typing needed):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {SYSTEM_ISSUES.map((issue) => {
                const isSelected = formData.selectedIssue === issue.id;
                return (
                  <button
                    key={issue.id}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, selectedIssue: issue.id }))}
                    className={`flex items-center gap-2 p-2.5 text-left rounded-lg border text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#2563EB] bg-blue-50 text-[#0A1F44] font-semibold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border shrink-0 ${
                        isSelected ? 'bg-[#2563EB] border-[#2563EB] text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <Check className="w-2 h-2" />}
                    </div>
                    <span className="truncate">{issue.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
            >
              <span>Next: Select Date &amp; Time</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SELECT DATE & TIME SLOT */}
      {currentStep === 2 && (
        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Preferred Date:
            </label>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, dateType: 'today' }))}
                className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                  formData.dateType === 'today'
                    ? 'border-[#2563EB] bg-blue-50 text-[#0A1F44] font-bold'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="text-xs font-bold">Today</div>
                <div className="text-[10px] text-emerald-700 font-semibold">Priority</div>
              </button>

              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, dateType: 'tomorrow' }))}
                className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                  formData.dateType === 'tomorrow'
                    ? 'border-[#2563EB] bg-blue-50 text-[#0A1F44] font-bold'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="text-xs font-bold">Tomorrow</div>
                <div className="text-[10px] text-slate-500">Available</div>
              </button>

              <label
                className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer flex flex-col justify-center items-center ${
                  formData.dateType === 'custom'
                    ? 'border-[#2563EB] bg-blue-50 text-[#0A1F44] font-bold'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="text-xs font-bold flex items-center gap-1">
                  <CalendarIcon className="w-3 h-3" />
                  <span>Pick Date</span>
                </div>
                <input
                  type="date"
                  value={formData.selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dateType: 'custom',
                      selectedDate: e.target.value,
                    }))
                  }
                  className="w-full text-[10px] text-slate-500 bg-transparent border-none p-0 mt-0.5 cursor-pointer text-center"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Scottsdale Arrival Window:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => {
                const isSelected = formData.selectedTimeSlot === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, selectedTimeSlot: slot.id }))}
                    className={`p-2.5 sm:p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#2563EB] bg-blue-50 text-[#0A1F44] font-semibold'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{slot.period}</span>
                      {isSelected && <Check className="w-3 h-3 text-[#2563EB]" />}
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      {slot.label.split('(')[1]?.replace(')', '') || slot.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl transition-colors cursor-pointer"
            >
              <span>Next: Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CUSTOMER DETAILS & SCOTTSDALE ZIP CODE QUALIFICATION LOGIC */}
      {currentStep === 3 && (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
            <span className="font-semibold text-slate-800 truncate pr-2">{selectedServiceObj.name}</span>
            <span className="text-slate-600 shrink-0">
              {formData.dateType === 'today' ? 'Today' : formData.dateType === 'tomorrow' ? 'Tomorrow' : formData.selectedDate}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. David Miller"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                className={`w-full px-3 py-2 rounded-lg border text-xs bg-white ${
                  errors.name ? 'border-red-400' : 'border-slate-300 focus:border-[#2563EB]'
                }`}
              />
              {errors.name && <p className="text-[11px] text-red-600 mt-0.5">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Phone (For 15-Min SMS) *
              </label>
              <input
                type="tel"
                placeholder="(480) 555-0199"
                value={formData.phoneNumber}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }));
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                className={`w-full px-3 py-2 rounded-lg border text-xs bg-white ${
                  errors.phone ? 'border-red-400' : 'border-slate-300 focus:border-[#2563EB]'
                }`}
              />
              {errors.phone && <p className="text-[11px] text-red-600 mt-0.5">{errors.phone}</p>}
            </div>
          </div>

          {/* Zip Code Qualification (Conversion Driver C) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Scottsdale ZIP Code *
            </label>
            <div className="relative">
              <input
                type="text"
                maxLength={5}
                placeholder="85255"
                value={formData.zipCode}
                onChange={handleZipChange}
                className={`w-full px-3 py-2 rounded-lg border text-xs font-mono bg-white pr-8 ${
                  zipValidation.isValid ? 'border-emerald-500' : 'border-slate-300'
                }`}
              />
              <div className="absolute right-2.5 top-2.5">
                {zipValidation.isValid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <MapPin className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </div>

            <div className="mt-1 text-[11px]">
              {zipValidation.isValid ? (
                <span className="text-emerald-700 font-medium">
                  {zipValidation.message}
                </span>
              ) : (
                <span className="text-amber-700 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>Valid Scottsdale ZIPs: 85251, 85254, 85255, 85258, 85260.</span>
                </span>
              )}
              {errors.zip && <p className="text-red-600 mt-0.5 font-semibold">{errors.zip}</p>}
            </div>
          </div>

          {/* Instant Visual Confirmation Message Requirement */}
          <div className="p-2.5 bg-blue-50/70 rounded-lg border border-blue-200 text-[11px] text-[#0A1F44] font-medium">
            Slot Reserved! Our technician will text you 15 minutes before arrival.
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePreviousStep}
              className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Confirm &amp; Dispatch Slot</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
