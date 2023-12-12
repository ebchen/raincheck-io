import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import Cal from './Calendar'; // Import your Calendar component
import DOW from './DOW';
import NavBar from './Navbar';

const FormPage = () => {
  const navigate = useNavigate(); // Replaces useHistory
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('05:00 PM');
  const [selectedCalendarDates, setSelectedCalendarDates] = useState([]); // State for selected dates in calendar
  const [calendarMode, setCalendarMode] = useState('specificDates'); // State for calendar mode

  const handleSubmit = (eventData) => {
    // Functionality to handle form submission
    // You can use eventData here to navigate or perform other actions

    navigate('/schedule', {
      state: {
        eventName: eventName,
        startTime: startTime,
        endTime: endTime,
        selectedCalendarDates: selectedCalendarDates,
      },
    });
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <NavBar />
      <div className="flex flex-row justify-center items-center mt-4">
        <div className="flex min-h-screen justify-center items-center mr-4 ">
          <Form
            setCalendarMode={setCalendarMode}
            handleSubmit={handleSubmit}
            eventName={eventName}
            setEventName={setEventName}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />
        </div>
        <div className="flex ml-4">
          {calendarMode === 'specificDates' ? (
            <Cal
              selectedCalendarDates={selectedCalendarDates}
              setSelectedCalendarDates={setSelectedCalendarDates}
            />
          ) : (
            <DOW />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
