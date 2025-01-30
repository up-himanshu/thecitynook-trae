"use client";

import { useState, useRef, useEffect } from "react";
import PhotoGallery from '@/components/PhotoGallery';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import ReservationBar from '@/components/ReservationBar';
import About from '@/components/About';
import Hero from '@/components/Hero';

export default function Home() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target) && 
          !event.target.closest('.calendar-trigger')) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {showNotification && (
        <div className="mt-16 bg-green-50 text-green-800 px-4 py-3 shadow-md transition-all duration-300 ease-in-out">
          <div className="container mx-auto flex justify-between items-center">
            <p>Your reservation request has been submitted. We will call you back soon to proceed further.</p>
            <button
              onClick={() => setShowNotification(false)}
              className="text-green-600 hover:text-green-800 focus:outline-none"
              aria-label="Close notification"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <Navigation />

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-16 mt-16">
        <Hero />
        <ReservationBar onSubmitSuccess={() => setShowNotification(true)} />

        {/* Property Features */}
        <section id="property-features" className="mb-12 px-16">
          <About />
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="mb-12 px-16" style={{ position: "relative", zIndex: 0 }}>
          <PhotoGallery />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="mb-12 px-16">
          <Testimonials />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
