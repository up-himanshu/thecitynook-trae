'use client';

import { useState, useRef, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';

const ReservationBar = ({ onSubmitSuccess }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [guestCount, setGuestCount] = useState(1);
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const guestSelectorRef = useRef(null);
  const calendarRef = useRef(null);
  const personalDetailsRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null,
    checkOut: null
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target) && 
          !event.target.closest('.calendar-trigger')) {
        setShowCalendar(false);
      }
      if (personalDetailsRef.current && !personalDetailsRef.current.contains(event.target) && 
          !event.target.closest('.personal-details-trigger')) {
        setShowPersonalDetails(false);
      }
      if (guestSelectorRef.current && !guestSelectorRef.current.contains(event.target) && 
          !event.target.closest('.guest-selector-trigger')) {
        setShowGuestSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handlePersonalDetailsClick = () => {
    setShowPersonalDetails(!showPersonalDetails);
  };

  const handlePersonalDetailsSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const details = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email')
    };
    setPersonalDetails(details);
    setShowPersonalDetails(false);
  };

  const handleDateSelect = (date) => {
    if (!selectedDates.checkIn || (selectedDates.checkIn && selectedDates.checkOut)) {
      setSelectedDates({
        checkIn: date,
        checkOut: null
      });
    } else {
      if (date > selectedDates.checkIn) {
        setSelectedDates(prev => ({
          ...prev,
          checkOut: date
        }));
        setShowCalendar(false);
      }
    }
  };

  const formatDateRange = () => {
    if (!selectedDates.checkIn) return "Feb 06 - Feb 23";
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    };
    return `${formatDate(selectedDates.checkIn)} - ${selectedDates.checkOut ? formatDate(selectedDates.checkOut) : 'Select'}`;
  };

  const getDisplayText = () => {
    if (personalDetails.name) {
      return `${personalDetails.name} · ${personalDetails.phone}`;
    }
    return 'Name and contact details';
  };

  return (
    <div className="relative -mt-[138px] mx-auto w-7/12 bg-white rounded-lg shadow-lg p-6 flex items-center justify-between gap-4" style={{ zIndex: 50 }}>
      <div className="flex items-center gap-2 flex-1 border-r border-gray-200 pr-4 relative">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <div className="flex flex-col cursor-pointer personal-details-trigger" onClick={handlePersonalDetailsClick}>
          <label className="text-xs text-gray-500">Personal Details</label>
          <input 
            type="text" 
            readOnly 
            value={getDisplayText()} 
            className="border-none p-0 text-sm focus:ring-0 cursor-pointer" 
          />
        </div>
        {showPersonalDetails && (
          <div ref={personalDetailsRef} className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl p-6" style={{ width: '300px', zIndex: 9999 }}>
            <form onSubmit={handlePersonalDetailsSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue={personalDetails.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  defaultValue={personalDetails.phone}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
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
      <div className="flex items-center gap-2 flex-1 border-r border-gray-200 pr-4 relative">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <div className="flex flex-col cursor-pointer calendar-trigger" onClick={handleDateClick}>
          <label className="text-xs text-gray-500">Check In - Check Out</label>
          <input 
            type="text" 
            readOnly 
            value={formatDateRange()} 
            className="border-none p-0 text-sm focus:ring-0 cursor-pointer" 
          />
        </div>
        {showCalendar && (
          <div ref={calendarRef} className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl p-8" style={{ width: '800px', marginLeft: '-250px', zIndex: 9999 }}>
            <div className="grid grid-cols-2 gap-16">
              {[0, 1].map((monthOffset) => {
                const currentDate = new Date();
                currentDate.setMonth(currentDate.getMonth() + monthOffset);
                const month = currentDate.toLocaleString('default', { month: 'long' });
                const year = currentDate.getFullYear();
                const firstDay = new Date(year, currentDate.getMonth(), 1).getDay();
                const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
              
                return (
                  <div key={monthOffset}>
                    <div className="text-center mb-8">
                      <h4 className="font-semibold text-lg">{`${month} ${year}`}</h4>
                    </div>
                    <div className="grid grid-cols-7 gap-4">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                        <div key={day} className="text-center text-sm text-gray-500 py-2">
                          {day}
                        </div>
                      ))}
                      {Array.from({ length: firstDay }).map((_, index) => (
                        <div key={`empty-${index}`} />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, index) => {
                        const date = new Date(year, currentDate.getMonth(), index + 1);
                        const isSelected = selectedDates.checkIn && date.getTime() === selectedDates.checkIn.getTime() ||
                                         selectedDates.checkOut && date.getTime() === selectedDates.checkOut.getTime();
                        const isInRange = selectedDates.checkIn && selectedDates.checkOut &&
                                         date > selectedDates.checkIn && date < selectedDates.checkOut;
                        const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
              
                        return (
                          <div
                            key={index}
                            onClick={() => !isPast && handleDateSelect(date)}
                            className={`
                              text-center py-2 text-sm rounded-full cursor-pointer w-10 h-10 flex items-center justify-center mx-auto
                              ${isPast ? 'text-gray-300 cursor-not-allowed' :
                                isSelected ? 'bg-blue-500 text-white' :
                                isInRange ? 'bg-blue-100' :
                                'hover:bg-gray-100'}
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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
              value={`${guestCount} ${guestCount === 1 ? 'guest' : 'guests'}`}
              className="border-none p-0 text-sm focus:ring-0 cursor-pointer"
            />
          </div>
          {showGuestSelector && (
            <div 
              ref={guestSelectorRef} 
              className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl p-4"
              style={{ width: '200px', zIndex: 9999 }}
            >
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  onClick={() => {
                    setGuestCount(num);
                    setShowGuestSelector(false);
                  }}
                  className="py-2 px-4 hover:bg-gray-50 cursor-pointer rounded-md transition-colors"
                >
                  {num} {num === 1 ? 'guest' : 'guests'}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          if (!personalDetails.name || !personalDetails.phone || !personalDetails.email) {
            alert('Please fill in your personal details');
            return;
          }
          if (!selectedDates.checkIn || !selectedDates.checkOut) {
            alert('Please select your check-in and check-out dates');
            return;
          }
          // Here you can implement the actual booking submission
          alert(`Booking submitted!\n\nGuest: ${personalDetails.name}\nDates: ${formatDateRange()}\nGuests: ${guestCount}`);
          onSubmitSuccess();
        }}
        className="ml-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium flex items-center justify-center"
        aria-label="Book Now"
      >
        <FaArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ReservationBar;