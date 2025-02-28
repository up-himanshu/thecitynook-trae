"use client";

import { useState, useRef, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";

const RECAPTCHA_SITE_KEY = "6LecJssqAAAAAFtmK3t8TRS60PA-WgR9CDgGGYhD"; // Replace with your actual site key
const API_BASE_URL = "https://cnbc1msz45.execute-api.us-east-1.amazonaws.com";
// const API_BASE_URL = "http://localhost:3005";

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
    console.log("showCalendar", showCalendar);
    if (window.gtag) {
      if (!showCalendar) {
        console.log("event fired");
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
    const details = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
    };
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

  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const reservationBarRef = useRef(null);

  const scrollToNotification = () => {
    if (reservationBarRef.current) {
      reservationBarRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div
      ref={reservationBarRef}
      className="relative -mt-[138px] mx-auto w-full md:w-11/12 lg:w-10/12 xl:w-7/12 bg-white rounded-lg shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4"
      style={{ zIndex: 50 }}
    >
      <div className="flex items-center gap-2 w-full md:w-auto md:flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 flex-shrink-0"
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
          className="flex flex-col cursor-pointer personal-details-trigger"
          onClick={handlePersonalDetailsClick}
        >
          <label className="text-xs text-gray-500">Personal Details</label>
          <input
            type="text"
            readOnly
            value={getDisplayText()}
            className="border-none p-0 text-sm focus:ring-0 cursor-pointer"
          />
        </div>
        {showPersonalDetails && (
          <div
            ref={personalDetailsRef}
            className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl p-6"
            style={{ width: "300px", zIndex: 9999 }}
          >
            <form onSubmit={handlePersonalDetailsSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue={personalDetails.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue={personalDetails.phone}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
      <div className="flex items-center gap-2 w-full md:w-auto md:flex-1 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 flex-shrink-0"
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
          className="flex flex-col cursor-pointer calendar-trigger"
          onClick={handleDateClick}
        >
          <label className="text-xs text-gray-500">Check In - Check Out</label>
          <input
            type="text"
            readOnly
            value={formatDateRange()}
            className="border-none p-0 text-sm focus:ring-0 cursor-pointer"
          />
        </div>
        {showCalendar && (
          <div
            ref={calendarRef}
            className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl p-4 md:p-8 overflow-x-auto"
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
                      <h4 className="font-semibold text-lg">{`${month} ${year}`}</h4>
                    </div>
                    <div className="grid grid-cols-7 gap-4">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <div
                          key={day}
                          className="text-center text-sm text-gray-500 py-2"
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
                                  ? "text-gray-400 cursor-not-allowed"
                                  : isBlocked
                                  ? "bg-red-100 text-red-600 cursor-not-allowed"
                                  : isInRange
                                  ? "bg-blue-100"
                                  : "hover:bg-gray-100"
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
      <div className="flex items-center gap-2 flex-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
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
        <div className="flex flex-col relative">
          <label className="text-xs text-gray-500">Guests</label>
          <div
            className="cursor-pointer guest-selector-trigger"
            onClick={() => setShowGuestSelector(!showGuestSelector)}
          >
            <input
              type="text"
              readOnly
              value={`${guestCount} ${guestCount === 1 ? "guest" : "guests"}`}
              className="border-none p-0 text-sm focus:ring-0 cursor-pointer"
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
          if (
            !personalDetails.name ||
            !personalDetails.phone ||
            !personalDetails.email
          ) {
            alert("Please fill in reservation details");
            return;
          }
          if (!selectedDates.checkIn || !selectedDates.checkOut) {
            alert("Please select your check-in and check-out dates");
            return;
          }
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
              throw new Error("Failed to submit reservation");
            }

            setShowSuccessNotification(true);
            scrollToNotification();
            onSubmitSuccess();
          } catch (error) {
            alert(error.message);
          }
        }}
        className="w-full md:w-auto ml-0 md:ml-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium flex items-center justify-center"
        aria-label="Book Now"
      >
        <FaArrowRight className="w-5 h-5" />
      </button>
      {showSuccessNotification && (
        <div
          className="absolute left-0 right-0 -bottom-20 transform translate-y-full bg-green-50 text-green-800 px-4 py-3 rounded-lg shadow-md transition-all duration-300 ease-in-out animate-slide-up"
          style={{ zIndex: 49 }}
        >
          <div className="flex justify-between items-center bg-green">
            <p className="text-sm">
              Your reservation request has been submitted. We will call you back
              soon to proceed further.
            </p>
            <button
              onClick={() => setShowSuccessNotification(false)}
              className="text-green-600 hover:text-green-800 focus:outline-none ml-4"
              aria-label="Close notification"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationBar;
