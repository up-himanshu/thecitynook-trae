"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { PropertiesProvider } from "@/context/PropertiesContext";
import { FaWhatsapp } from "react-icons/fa";
import EnquiryForm from "./enquiry-form";
import { properties } from "@/data/properties";

// WhatsApp Floating Button Component
const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number
    const phoneNumber = "+919782001181";
    const message =
      "Hi! I'm interested in your properties. Can you help me with more information?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ease-in-out ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95"
      }`}
    >
      <button
        onClick={handleWhatsAppClick}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7" />
      </button>
    </div>
  );
};

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const showPrimaryBkg = ["/", "/about", "/contact", "/properties"].includes(
    pathname
  );

  return (
    <PropertiesProvider properties={properties}>
      <Header properties={properties} showPrimaryBkg={showPrimaryBkg} />
      {children}
      <Footer />
      <WhatsAppButton />
      <EnquiryForm />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </PropertiesProvider>
  );
}
