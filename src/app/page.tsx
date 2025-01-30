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
      <Navigation />

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-16 mt-16">
        <Hero />
        <ReservationBar />

        {/* Property Features */}
        <section id="property-features" className="mb-12">
          <About />
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="mb-12" style={{ position: "relative", zIndex: 0 }}>
          <PhotoGallery />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="mb-12">
          <Testimonials />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
