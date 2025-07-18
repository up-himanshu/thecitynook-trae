"use client";

import { ReservationEnquiry } from "@/types/reservation-enquiry";
import { sendReservationEnquiry } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  FaTimes,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import SuccessPopup from "./success-popup";

const RECAPTCHA_SITE_KEY = "6LecJssqAAAAAFtmK3t8TRS60PA-WgR9CDgGGYhD";

export default function EnquiryForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<ReservationEnquiry>({
    name: "",
    phone: "",
    dateFrom: "",
    dateTo: "",
  });
  const [errors, setErrors] = useState<Partial<ReservationEnquiry>>({});

  useEffect(() => {
    // Show the form by default after 1 second
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Load reCAPTCHA script
  useEffect(() => {
    const loadRecaptcha = () => {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };
    loadRecaptcha();
    return () => {
      // Cleanup reCAPTCHA script on component unmount
      const scripts = document.getElementsByTagName("script");
      for (const script of scripts) {
        if (script.src.includes("recaptcha")) {
          document.head.removeChild(script);
        }
      }
    };
  }, []);

  const validateForm = () => {
    const newErrors: Partial<ReservationEnquiry> = {};

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (
      formData.dateFrom &&
      formData.dateTo &&
      new Date(formData.dateFrom) >= new Date(formData.dateTo)
    ) {
      newErrors.dateTo = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await sendReservationEnquiry(formData);

      if (success) {
        setShowSuccess(true);
        setFormData({ name: "", phone: "", dateFrom: "", dateTo: "" });
        setIsOpen(false);
      } else {
        toast.error("Failed to submit enquiry. Please try again.");
      }
    } catch (error) {
      console.error("Enquiry submission error:", error);
      toast.error(
        "An error occurred while submitting your enquiry. Please try again."
      );
    } finally {
      if (window.gtag) {
        window.gtag("event", "enquiry_form_submitted", {
          event_category: "Enquiry",
          event_label: "Enquiry form submitted",
        });
      }
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof ReservationEnquiry,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      {/* Success Popup */}
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Enquiry Submitted!"
        message="Thank you for your enquiry. We will contact you soon with more details."
      />

      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        {/* Floating Button */}
        <button
          onClick={() => {
            if (!isOpen) {
              if (window.gtag) {
                window.gtag("event", "enquiry_form_opened", {
                  event_category: "Enquiry",
                  event_label: "Enquiry form opened",
                });
              }
            }
            setIsOpen(!isOpen);
          }}
          className="w-14 h-14 bg-highlight hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center"
          aria-label="Open enquiry form"
        >
          <FaEnvelope className="w-6 h-6" />
        </button>

        {/* Enquiry Form Modal */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 w-80 bg-secondary opacity-90 rounded-lg shadow-2xl border border-gray-200">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Send Enquiry
                </h3>
                <button
                  onClick={() => {
                    if (window.gtag) {
                      window.gtag("event", "enquiry_form_closed", {
                        event_category: "Enquiry",
                        event_label: "Enquiry form closed",
                      });
                    }
                    setIsOpen(false);
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close form"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <FaUser className="inline w-3 h-3 mr-1" />
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onFocus={() => {
                      if (window.gtag) {
                        window.gtag("event", "enquiry_form_name_focused", {
                          event_category: "Enquiry",
                          event_label: "Enquiry form opened",
                        });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Phone Field (Required) */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <FaPhone className="inline w-3 h-3 mr-1" />
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    onFocus={() => {
                      if (window.gtag) {
                        window.gtag("event", "enquiry_form_phone_focused", {
                          event_category: "Enquiry",
                          event_label: "Enquiry form phone focused",
                        });
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Your phone number"
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="dateFrom"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <FaCalendarAlt className="inline w-3 h-3 mr-1" />
                      From <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="dateFrom"
                      value={formData.dateFrom}
                      onChange={(e) =>
                        handleInputChange("dateFrom", e.target.value)
                      }
                      onFocus={() => {
                        if (window.gtag) {
                          window.gtag(
                            "event",
                            "enquiry_form_date_from_focused",
                            {
                              event_category: "Enquiry",
                              event_label: "Enquiry form date from focused",
                            }
                          );
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="dateTo"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      <FaCalendarAlt className="inline w-3 h-3 mr-1" />
                      To <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="dateTo"
                      value={formData.dateTo}
                      onChange={(e) =>
                        handleInputChange("dateTo", e.target.value)
                      }
                      onFocus={() => {
                        if (window.gtag) {
                          window.gtag("event", "enquiry_form_date_to_focused", {
                            event_category: "Enquiry",
                            event_label: "Enquiry form date to focused",
                          });
                        }
                      }}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                        errors.dateTo ? "border-red-500" : "border-gray-300"
                      }`}
                      min={
                        formData.dateFrom ||
                        new Date().toISOString().split("T")[0]
                      }
                      required
                    />
                    {errors.dateTo && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.dateTo}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-highlight hover:bg-primary/90 text-primary font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    "Send Enquiry"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
