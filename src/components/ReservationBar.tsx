'use client';

import { useState, useRef, useEffect } from 'react';

const ReservationBar = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateClick = () => {
    setShowCalendar(!showCalendar);
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

  return (
    <div className="relative -mt-[138px] mx-auto w-7/12 bg-white rounded-lg shadow-lg p-6 flex items-center justify-between gap-4" style={{ zIndex: 50 }}>
      <div className="flex items-center gap-2 flex-1 border-r border-gray-200 pr-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        </svg>
        <div className="flex flex-col">
          <label className="text-xs text-gray-500">Location</label>
          <input type="text" placeholder="Where are you going?" className="border-none p-0 text-sm focus:ring-0" />
        </div>
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
        <div className="flex flex-col">
          <label className="text-xs text-gray-500">Guests</label>
          <select className="border-none p-0 text-sm focus:ring-0">
            <option>1 guest</option>
            <option>2 guests</option>
            <option>3 guests</option>
            <option>4 guests</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReservationBar;