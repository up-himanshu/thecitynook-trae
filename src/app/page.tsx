"use client";

import PhotoGallery from "@/components/PhotoGallery";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import ReservationBar from "@/components/ReservationBar";
import About from "@/components/About";
import Hero from "@/components/Hero";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <ToastContainer />
      <Navigation />
      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-16 mt-16">
        <Hero />
        <ReservationBar onSubmitSuccess={() => {}} />

        {/* Property Features */}
        <section id="property-features" className="mb-12 px-4 md:px-16">
          <About />
        </section>

        {/* Gallery Section */}
        <section
          id="gallery"
          className="mb-12 px-4 md:px-16"
          style={{ position: "relative", zIndex: 0 }}
        >
          <PhotoGallery />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="mb-12 px-4 md:px-16">
          <Testimonials />
        </section>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
