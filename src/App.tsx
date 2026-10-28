import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BookingWidget } from './components/BookingWidget';
import { OurWork } from './components/OurWork';
import { TrustProof } from './components/TrustProof';
import { EmergencyAfterHoursBanner } from './components/EmergencyAfterHoursBanner';
import { ServiceModal } from './components/ServiceModal';
import { SmsConfirmationModal } from './components/SmsConfirmationModal';
import { Footer } from './components/Footer';
import { BookingFormData } from './types';
import { MessageSquareCode, ArrowUp } from 'lucide-react';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Active confirmed booking state for realistic SMS preview
  const [confirmedBooking, setConfirmedBooking] = useState<BookingFormData>({
    serviceId: 'emergency-repair',
    selectedIssue: 'blowing-warm',
    dateType: 'today',
    selectedDate: new Date().toISOString().split('T')[0],
    selectedTimeSlot: 'afternoon',
    fullName: 'David Miller',
    phoneNumber: '(480) 555-0199',
    zipCode: '85255',
  });

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSuccess = (data: BookingFormData) => {
    setConfirmedBooking(data);
    setIsBookingModalOpen(false);
    setIsSmsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden max-w-full">
      {/* Top Navigation */}
      <Header onOpenBooking={() => setIsBookingModalOpen(true)} />

      {/* 1. HERO SECTION (Above the Fold) */}
      <Hero onOpenBooking={() => setIsBookingModalOpen(true)} />

      {/* 2. THE 2-STEP INTERACTIVE QUOTE & BOOKING WIDGET (Core Feature) */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A1F44] tracking-tight">
              Instant Quote &amp; Dispatch Slot
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select your service, choose an arrival window, and lock in your Scottsdale technician.
            </p>
          </div>

          <BookingWidget onSuccess={handleBookingSuccess} isModalMode={false} />

          {/* Quick Demo Preview Action for SMS Modal */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setIsSmsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-slate-500 hover:text-slate-800 text-[11px] font-medium transition-colors cursor-pointer"
            >
              <MessageSquareCode className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Preview SMS Dispatch Confirmation</span>
            </button>
          </div>
        </div>
      </section>

      {/* OUR WORK SECTION: BEFORE & AFTER TRANSFORMATIONS (Positioned below Booking, above Reviews) */}
      <OurWork onBookSlot={() => setIsBookingModalOpen(true)} />

      {/* MINIMAL PROOF & VALUE (Verified Scottsdale Homeowner Reviews 4.9 / 5.0 (200+ Reviews)) */}
      <TrustProof />

      {/* CLEAN CORPORATE FOOTER */}
      <Footer />

      {/* 3. EMERGENCY AFTER-HOURS FLOATING BANNER */}
      <EmergencyAfterHoursBanner onQuickBook={() => setIsBookingModalOpen(true)} />

      {/* EFFORTLESS ONE-TAP SCROLL TO TOP BUTTON */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll back to top effortlessly"
          className="fixed bottom-14 right-4 z-30 p-2.5 rounded-full bg-[#0A1F44] text-white shadow-lg border border-slate-700/60 hover:bg-[#2563EB] transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <ArrowUp className="w-4 h-4 text-amber-300" />
        </button>
      )}

      {/* SERVICE MODAL TRIGGER */}
      <ServiceModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onSuccess={handleBookingSuccess}
      />

      {/* D. INSTANT SMS CONFIRMATION VISUAL MODAL */}
      <SmsConfirmationModal
        isOpen={isSmsModalOpen}
        onClose={() => setIsSmsModalOpen(false)}
        bookingData={confirmedBooking}
      />
    </div>
  );
}
