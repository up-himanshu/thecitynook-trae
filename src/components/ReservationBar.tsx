"use client";

import { useState, useRef, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RECAPTCHA_SITE_KEY = "6LecJssqAAAAAFtmK3t8TRS60PA-WgR9CDgGGYhD"; // Replace with your actual site key
import { API_BASE_URL } from "@/config/api";

declare global {
  interface Window {
    grecaptcha: {
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

const ReservationBar = ({ onSubmitSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [enquiry, setEnquiry] = useState({});
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
      for (let script of scripts) {
        if (script.src.includes("recaptcha")) {
          document.head.removeChild(script);
        }
      }
    };
  }, []);

  const executeRecaptcha = async () => {
    try {
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: "reservation_submit",
      });
      return token;
    } catch (error) {
      console.error("Error executing reCAPTCHA:", error);
      throw new Error("Failed to verify reCAPTCHA");
    }
  };
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [guestCount, setGuestCount] = useState(2);
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const [blockedDates, setBlockedDates] = useState([]);
  const guestSelectorRef = useRef(null);
  const calendarRef = useRef(null);
  const personalDetailsRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null,
    checkOut: null,
  });

  useEffect(() => {
    const fetchBlockedDates = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/available-dates`, {
          headers: {
            key: "abc123",
          },
        });
        const data = await response.json();
        setBlockedDates(data.data.blockedDates.map((date) => new Date(date)));
      } catch (error) {
        console.error("Error fetching blocked dates:", error);
      }
    };

    fetchBlockedDates();
  }, []);

  const handleClickOutside = (event) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target) &&
      !event.target.closest(".calendar-trigger")
    ) {
      setShowCalendar(false);
    }
    if (
      personalDetailsRef.current &&
      !personalDetailsRef.current.contains(event.target) &&
      !event.target.closest(".personal-details-trigger")
    ) {
      setShowPersonalDetails(false);
    }
    if (
      guestSelectorRef.current &&
      !guestSelectorRef.current.contains(event.target) &&
      !event.target.closest(".guest-selector-trigger")
    ) {
      setShowGuestSelector(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateSelect = (date) => {
    // console.log("handleDateSelect date", date);
    // console.log("case 0");
    if (
      !selectedDates.checkIn ||
      (selectedDates.checkIn && selectedDates.checkOut)
    ) {
      // console.log("case 1");
      if (!isDateBlocked(date) && !isPastDate(date)) {
        // console.log("case 1.1");
        // Start new selection
        if (window.gtag)
          window.gtag("event", "checkin_date_selected", {
            event_category: "Booking",
            event_label: "Checkin date selected",
          });
        setSelectedDates({
          checkIn: date,
          checkOut: null,
        });
        // const nextBlockedDate1 = getNextBlockedDate(selectedDates.checkIn);
        // console.log("nextBlockedDate1", nextBlockedDate1);
      }
    } else {
      // Complete the selection
      // console.log("case 2");
      if (isPastDate(date)) return;
      if (date <= selectedDates.checkIn && !isDateBlocked(date)) {
        // console.log("case 2.1");
        // If selected date is before or equal to check-in, start new selection
        setSelectedDates({
          checkIn: date,
          checkOut: null,
        });
      } else {
        if (date <= selectedDates.checkIn) return;
        // console.log("case 2.2");
        // Get the next blocked date after check-in
        const nextBlockedDate = getNextBlockedDate(selectedDates.checkIn);

        // Allow selection up to and including the next blocked date
        if (nextBlockedDate && date > nextBlockedDate) {
          // console.log("case 2.2.1");
          return; // Don't allow selection beyond next blocked date
        }

        if (window.gtag)
          window.gtag("event", "checkout_date_selected", {
            event_category: "Booking",
            event_label: "Checkout date selected",
          });

        setSelectedDates((prev) => ({
          ...prev,
          checkOut: date,
        }));
        setShowCalendar(false);
      }
    }
  };

  const handleDateClick = () => {
    if (window.gtag) {
      if (!showCalendar) {
        window.gtag("event", "date_availability_opened", {
          event_category: "Booking",
          event_label: "Opened date availability",
        });
      }
    }

    setShowCalendar(!showCalendar);
  };

  const handlePersonalDetailsClick = () => {
    setShowPersonalDetails(!showPersonalDetails);
  };

  const handlePersonalDetailsSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const email = formData.get("email");
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const allowedDomains = [
      "@gmail",
      "@yahoo",
      "@hotmail",
      "@outlook",
      "@icloud",
      "@aol",
      "@msn",
    ];

    if (phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits", {
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    if (email) {
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address", {
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return;
      }
      if (!allowedDomains.some((domain) => email.includes(domain))) {
        toast.error(
          "This email is not allowed. Either enter a different email or remove it.",
          {
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          }
        );
        return;
      }
    }

    const details = { name, phone, email };
    setPersonalDetails(details);
    setShowPersonalDetails(false);
  };

  const isDateBlocked = (date) => {
    return blockedDates.some(
      (blockedDate) =>
        blockedDate.getFullYear() === date.getFullYear() &&
        blockedDate.getMonth() === date.getMonth() &&
        blockedDate.getDate() === date.getDate()
    );
  };

  const isRangeValid = (startDate, endDate) => {
    if (!startDate || !endDate) return true;

    const start = new Date(startDate);
    const end = new Date(endDate);

    for (
      let date = new Date(start);
      date <= end;
      date.setDate(date.getDate() + 1)
    ) {
      if (isDateBlocked(date)) return false;
    }

    return true;
  };

  const getNextBlockedDate = (startDate) => {
    const sortedBlockedDates = blockedDates
      .filter((date) => date > startDate)
      .sort((a, b) => a.getTime() - b.getTime());
    return sortedBlockedDates[0];
  };

  const isDateSelectable = (date) => {
    if (!selectedDates.checkIn)
      return !isPastDate(date) && !isDateBlocked(date);

    // If it's the next day after check-in, allow it even if blocked
    const isNextDay =
      new Date(date.getTime() - 24 * 60 * 60 * 1000).getTime() ===
      selectedDates.checkIn.getTime();
    if (isNextDay) return true;

    // Otherwise, keep the original logic for other dates
    return date > selectedDates.checkIn && !isDateBlocked(date);
  };

  const isPastDate = (date) => {
    return date < new Date(new Date().setHours(0, 0, 0, 0));
  };

  const formatDateRange = () => {
    if (!selectedDates.checkIn) return "Select dates";
    const formatDate = (date) => {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      });
    };
    return `${formatDate(selectedDates.checkIn)} - ${
      selectedDates.checkOut ? formatDate(selectedDates.checkOut) : "Select"
    }`;
  };

  const getDisplayText = () => {
    if (personalDetails.name) {
      return `${personalDetails.name} · ${personalDetails.phone}`;
    }
    return "Name and contact details";
  };

  const reservationBarRef = useRef(null);

  return (
    <div
      ref={reservationBarRef}
      className="relative -mt-[138px] mx-auto w-full md:w-11/12 lg:w-10/12 xl:w-7/12 bg-primary dark:bg-primary rounded-lg shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4"
      style={{ zIndex: 40 }}
    >
      <div className="flex items-center gap-2 w-full md:w-auto md:flex-1 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 pb-4 md:pb-0 md:pr-4 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <div
          className="flex flex-col cursor-pointer personal-details-trigger w-full"
          onClick={handlePersonalDetailsClick}
        >
          <label className="text-xs text-gray-500 dark:text-gray-400">
            Personal Details
          </label>
          <input
            type="text"
            readOnly
            value={getDisplayText()}
            className="border-none p-0 text-sm focus:ring-0 cursor-pointer bg-transparent dark:text-gray-300"
          />
        </div>
        {showPersonalDetails && (
          <div
            ref={personalDetailsRef}
            className="absolute top-full left-0 mt-2 bg-primary dark:bg-secondary rounded-lg shadow-xl p-6"
            style={{ width: "300px", zIndex: 9999 }}
          >
            <form onSubmit={handlePersonalDetailsSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
                  defaultValue={personalDetails.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  maxLength={10}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
                  defaultValue={personalDetails.phone}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300"
                  defaultValue={personalDetails.email}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-colors"
              >
                Save Details
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto md:flex-1 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 pb-4 md:pb-0 md:pr-4 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <div
          className="flex flex-col cursor-pointer calendar-trigger w-full"
          onClick={handleDateClick}
        >
          <label className="text-xs text-gray-500 dark:text-gray-400">
            Check In - Check Out
          </label>
          <input
            type="text"
            readOnly
            value={formatDateRange()}
            className="border-none p-0 text-sm focus:ring-0 cursor-pointer bg-transparent dark:text-gray-300"
          />
        </div>
        {showCalendar && (
          <div
            ref={calendarRef}
            className="absolute top-full left-0 mt-2 bg-primary dark:bg-secondary rounded-lg shadow-xl p-4 md:p-8 overflow-x-auto"
            style={{
              width: "calc(100vw - 32px)",
              maxWidth: "800px",
              marginLeft: "-16px",
              zIndex: 9999,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              {[0, 1].map((monthOffset) => {
                const today = new Date();
                const currentDate = new Date(
                  today.getFullYear(),
                  today.getMonth() + monthOffset,
                  1
                );
                const month = currentDate.toLocaleString("default", {
                  month: "long",
                });
                const year = currentDate.getFullYear();
                const firstDay = new Date(
                  year,
                  currentDate.getMonth(),
                  1
                ).getDay();
                const daysInMonth = new Date(
                  year,
                  currentDate.getMonth() + 1,
                  0
                ).getDate();

                return (
                  <div key={monthOffset}>
                    <div className="text-center mb-8">
                      <h4 className="font-semibold text-lg dark:text-gray-300">{`${month} ${year}`}</h4>
                    </div>
                    <div className="grid grid-cols-7 gap-4">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <div
                          key={day}
                          className="text-center text-sm text-gray-500 dark:text-gray-400 py-2"
                        >
                          {day}
                        </div>
                      ))}
                      {Array.from({ length: firstDay }).map((_, index) => (
                        <div key={`empty-${index}`} />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, index) => {
                        const date = new Date(
                          year,
                          currentDate.getMonth(),
                          index + 1
                        );
                        const isSelected =
                          (selectedDates.checkIn &&
                            date.getTime() ===
                              selectedDates.checkIn.getTime()) ||
                          (selectedDates.checkOut &&
                            date.getTime() ===
                              selectedDates.checkOut.getTime());
                        const isInRange =
                          selectedDates.checkIn &&
                          selectedDates.checkOut &&
                          date > selectedDates.checkIn &&
                          date < selectedDates.checkOut;
                        const isPast =
                          date < new Date(new Date().setHours(0, 0, 0, 0));
                        const isBlocked = isDateBlocked(date);
                        const isSelectable = isDateSelectable(date);

                        return (
                          <div
                            key={index}
                            onClick={() => handleDateSelect(date)}
                            className={`
                              text-center py-2 text-sm rounded-full cursor-pointer w-10 h-10 flex items-center justify-center mx-auto
                              ${
                                isSelected
                                  ? "bg-blue-500 text-white"
                                  : isPast || (!isSelectable && !isBlocked)
                                  ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                  : isBlocked
                                  ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 cursor-not-allowed"
                                  : isInRange
                                  ? "bg-blue-100 dark:bg-blue-900 dark:text-blue-300"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                              }
                            `}
                          >
                            {index + 1}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto md:flex-1 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 pb-4 md:pb-0 md:pr-4 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 dark:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <div className="flex flex-col relative w-full">
          <label className="text-xs text-gray-500 dark:text-gray-400">
            Guests
          </label>
          <div
            className="cursor-pointer guest-selector-trigger"
            onClick={() => setShowGuestSelector(!showGuestSelector)}
          >
            <input
              type="text"
              readOnly
              value={`${guestCount} ${guestCount === 1 ? "guest" : "guests"}`}
              className="border-none p-0 text-sm focus:ring-0 cursor-pointer bg-transparent dark:text-gray-300"
            />
          </div>
          {showGuestSelector && (
            <div
              ref={guestSelectorRef}
              className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl p-4"
              style={{ width: "200px", zIndex: 9999 }}
            >
              {[1, 2].map((num) => (
                <div
                  key={num}
                  onClick={() => {
                    setGuestCount(num);
                    setShowGuestSelector(false);
                  }}
                  className="py-2 px-4 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                >
                  {num} {num === 1 ? "guest" : "guests"}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={async () => {
          if (!personalDetails.name || !personalDetails.phone) {
            toast.error("Please fill in reservation details", {
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
            return;
          }
          if (!selectedDates.checkIn || !selectedDates.checkOut) {
            toast.error("Please select your check-in and check-out dates", {
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
            return;
          }
          setIsSubmitting(true);
          // Make the API call to submit the reservation
          try {
            const recaptchaToken = await executeRecaptcha();
            console.log("selectedDates", selectedDates.checkIn);
            const reqBody = {
              name: personalDetails.name,
              phone: personalDetails.phone,
              email: personalDetails.email,
              dateFrom: `${selectedDates.checkIn.getFullYear()}-${String(
                selectedDates.checkIn.getMonth() + 1
              ).padStart(2, "0")}-${String(
                selectedDates.checkIn.getDate()
              ).padStart(2, "0")}`,
              dateTo: `${selectedDates.checkOut.getFullYear()}-${String(
                selectedDates.checkOut.getMonth() + 1
              ).padStart(2, "0")}-${String(
                selectedDates.checkOut.getDate()
              ).padStart(2, "0")}`,
              guestCount: guestCount,
              recaptchaToken,
            };
            console.log("reqBody", reqBody);
            const response = await fetch(
              `${API_BASE_URL}/reservation-enquiry`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  key: "abc123",
                },
                body: JSON.stringify(reqBody),
              }
            );

            if (!response.ok) {
              toast.error("Failed to submit reservation", {
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              });
              return;
            }

            const responseData = await response.json();
            setEnquiry(responseData.data);
            setPersonalDetails({
              name: "",
              phone: "",
              email: "",
            });
            setSelectedDates({
              checkIn: null,
              checkOut: null,
            });
            setShowSuccessModal(true);
            onSubmitSuccess();
          } catch (error) {
            toast.error(error.message, {
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
          } finally {
            setIsSubmitting(false);
          }
        }}
        disabled={isSubmitting}
        className={`w-full md:w-auto ml-0 md:ml-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium flex items-center justify-center ${
          isSubmitting ? "opacity-75 cursor-not-allowed" : ""
        }`}
        aria-label="Book Now"
      >
        {isSubmitting ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <FaArrowRight className="w-5 h-5" />
        )}
      </button>

      <Dialog
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl rounded-xl bg-white p-10 shadow-2xl dark:bg-primary">
            <div className="text-center">
              <Dialog.Title className="text-2xl md:text-4xl font-bold mb-5 text-gray-900 dark:text-white">
                Your Reservation Request is Confirmed!
              </Dialog.Title>
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
                  <text className="text-gray-900 dark:text-gray-300">35%</text>
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
                  className="underline hover:text-[#FF5A5F]  text-[#FF5A5F]"
                >
                  Airbnb
                </a>{" "}
                rates!
              </p>
              <div className="flex flex-col space-y-4 mb-6">
                <button
                  onClick={async () => {
                    if (window.gtag) {
                      window.gtag("event", "book_now_clicked", {
                        event_category: "Booking",
                        event_label: "Serious booking intent",
                      });
                    }
                    try {
                      fetch(`${API_BASE_URL}/enquiry/serious`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          key: "abc123",
                        },
                        body: JSON.stringify(enquiry),
                      });
                      window.location.href = `tel:+919782001181`;
                    } catch (error) {
                      toast.error("Failed to process your request", {
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored",
                      });
                    }
                    setShowSuccessModal(false);
                  }}
                  className="w-full bg-blue-600 text-white rounded-lg py-4 text-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Book Now with 20% Deposit
                </button>
                <button
                  onClick={() => {
                    if (window.gtag) {
                      window.gtag("event", "book_later_clicked", {
                        event_category: "Booking",
                        event_label: "Closed booking modal",
                      });
                    }
                    setShowSuccessModal(false);
                  }}
                  className="w-full bg-gray-100 text-gray-800 rounded-lg py-4 text-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  I'll Book Later
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Book directly with us for the best rates and flexible payment
                options
              </p>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ReservationBar;
