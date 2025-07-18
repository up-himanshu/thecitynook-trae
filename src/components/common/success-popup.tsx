"use client";

import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params: Record<string, string | number | boolean>
    ) => void;
  }
}

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessPopup({ isOpen, onClose }: SuccessPopupProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBookNow = async () => {
    if (window.gtag) {
      window.gtag("event", "book_now_clicked", {
        event_category: "Booking",
        event_label: "Serious booking intent",
      });
    }
    try {
      window.location.href = `tel:+919782001181`;
    } catch (error) {
      console.error("Failed to process your request", error);
    }
    onClose();
  };

  const handleBookLater = () => {
    if (window.gtag) {
      window.gtag("event", "book_later_clicked", {
        event_category: "Booking",
        event_label: "Closed booking modal",
      });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="relative z-50">
      <div
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-10 shadow-2xl dark:bg-primary">
          <div className="text-center">
            <div className="mb-5">
              <FaCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-5 text-gray-900 dark:text-white">
              We have received your Reservation Request!
            </h2>
            <p className="text-lg text-gray-600 mb-5 dark:text-gray-400">
              Secure your stay at our exclusive rate of
            </p>
            <div className="flex flex-col items-center mb-2">
              <p className="text-base text-gray-500 dark:text-gray-400 line-through">
                ₹2,500
              </p>
              <p className="text-4xl md:text-5xl font-bold text-yellow-600">
                ₹2,000
                <span className="text-xl font-normal text-gray-600 ml-3 dark:text-gray-400">
                  /night
                </span>
              </p>
            </div>
            <p className="text-base text-green-600 font-medium mb-5">
              Save up to{" "}
              <b>
                <span className="text-gray-900 dark:text-gray-300">35%</span>
              </b>{" "}
              compared to{" "}
              <a
                href="https://www.makemytrip.com/hotels/hotel-details?hotelId=202412201436016964&checkin=date_3&checkout=date_4&country=IN&city=CTJAI&roomStayQualifier=2e0e&openDetail=true&currency=ENG&region=IN&checkAvailability=true&locusId=CTJAI&locusType=city&homestay=true&zcp=8b5f5d1bc3ed"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#0066FF] text-[#0066FF]"
              >
                MakeMyTrip
              </a>{" "}
              and{" "}
              <a
                href="https://airbnb.co.in/h/thecitynook"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#FF5A5F] text-[#FF5A5F]"
              >
                Airbnb
              </a>{" "}
              rates!
            </p>
            <div className="flex flex-col space-y-4 mb-6">
              <button
                onClick={handleBookNow}
                className="w-full bg-blue-600 text-white rounded-lg py-4 text-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Call Now
              </button>
              <button
                onClick={handleBookLater}
                className="w-full bg-gray-100 text-gray-800 rounded-lg py-4 text-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                I&apos;ll Call Later
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Book directly with us for the best rates and flexible payment
              options
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
