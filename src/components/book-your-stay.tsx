import { ReservationEnquiry } from "@/types/reservation-enquiry";
import { Property } from "@/types/property";
import { useEffect, useState } from "react";
import { sendReservationEnquiry } from "@/lib/utils";
import { toast } from "react-toastify";

const RECAPTCHA_SITE_KEY = "6LecJssqAAAAAFtmK3t8TRS60PA-WgR9CDgGGYhD";

export default function BookYourStay({
  property,
  onBook,
}: {
  property: Property;
  onBook: () => void;
}) {
  const [formData, setFormData] = useState<ReservationEnquiry>({
    property: property.slug,
    name: "",
    phone: "",
    email: "",
    dateFrom: "",
    dateTo: "",
    guestCount: 2,
  });

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

  return (
    <div className="bg-secondary rounded-xl p-8 shadow-lg sticky top-24">
      <h2 className="text-2xl font-bold mb-6">Book Your Stay</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (window.gtag) {
            window.gtag(
              "event",
              `reservation_form_submitted_${property.slug}`,
              {
                event_category: "Property Reservation",
                event_label: "Property Reservation form submitted",
              }
            );
          }
          sendReservationEnquiry(formData).then((success) => {
            if (success) {
              setFormData({
                ...formData,
                name: "",
                phone: "",
                email: "",
                dateFrom: "",
                dateTo: "",
              });
              onBook();
            } else {
              toast.error("Failed to send reservation enquiry");
            }
          });
        }}
      >
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-secondary">Name*</span>
            <input
              type="text"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-highlight w-48"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              onFocus={() => {
                if (window.gtag) {
                  window.gtag(
                    "event",
                    `reservation_form_name_focused_${property.slug}`,
                    {
                      event_category: "Property Reservation",
                      event_label: "Property Reservation form name focused",
                    }
                  );
                }
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Phone*</span>
            <input
              type="number"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-highlight w-48"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value.slice(-10) })
              }
              onFocus={() => {
                if (window.gtag) {
                  window.gtag(
                    "event",
                    `reservation_form_phone_focused_${property.slug}`,
                    {
                      event_category: "Property Reservation",
                      event_label: "Property Reservation form phone focused",
                    }
                  );
                }
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Email</span>
            <input
              type="email"
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-highlight w-48"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Check-in*</span>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={formData.dateFrom}
              onChange={(e) =>
                setFormData({ ...formData, dateFrom: e.target.value })
              }
              onFocus={() => {
                if (window.gtag) {
                  window.gtag(
                    "event",
                    `reservation_form_date_from_focused_${property.slug}`,
                    {
                      event_category: "Property Reservation",
                      event_label:
                        "Property Reservation form date from focused",
                    }
                  );
                }
              }}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-highlight w-48"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Check-out*</span>
            <input
              type="date"
              min={
                formData.dateFrom
                  ? new Date(
                      new Date(formData.dateFrom).getTime() +
                        24 * 60 * 60 * 1000
                    )
                      .toISOString()
                      .split("T")[0]
                  : new Date().toISOString().split("T")[0]
              }
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-highlight w-48"
              required
              value={formData.dateTo}
              onChange={(e) =>
                setFormData({ ...formData, dateTo: e.target.value })
              }
              onFocus={() => {
                if (window.gtag) {
                  window.gtag(
                    "event",
                    `reservation_form_date_to_focused_${property.slug}`,
                    {
                      event_category: "Property Reservation",
                      event_label: "Property Reservation form date to focused",
                    }
                  );
                }
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-secondary">Guests*</span>
            <select
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-highlight w-48"
              required
              value={formData.guestCount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  guestCount: parseInt(e.target.value),
                })
              }
            >
              {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map(
                (num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                )
              )}
            </select>
          </div>
          <button
            className={`w-full py-3 rounded-lg font-medium transition duration-300 ${
              formData.name &&
              formData.phone &&
              formData.dateFrom &&
              formData.dateTo
                ? "bg-highlight text-black hover:bg-business hover:text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={
              !formData.name ||
              !formData.phone ||
              !formData.dateFrom ||
              !formData.dateTo
            }
          >
            {formData.dateFrom && formData.dateTo
              ? `Send Enquiry (${Math.ceil(
                  (new Date(formData.dateTo).getTime() -
                    new Date(formData.dateFrom).getTime()) /
                    (1000 * 60 * 60 * 24)
                )} Nights)`
              : "Send Enquiry"}
          </button>
        </div>
      </form>
    </div>
  );
}
