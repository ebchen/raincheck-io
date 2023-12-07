import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import Cal from './Calendar'; // Import your Calendar component
import DOW from './DOW';
import NavBar from './Navbar';

const FormPage = () => {
  const navigate = useNavigate(); // Replaces useHistory
  const [eventName, setEventName] = useState('');
  const [calendarMode, setCalendarMode] = useState('specificDates'); // State for calendar mode

  const handleSubmit = (eventData) => {
    // Functionality to handle form submission
    // You can use eventData here to navigate or perform other actions

    navigate('/schedule', { state: { eventName: eventName } });
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <NavBar />
      <div className="flex flex-row justify-center items-center ">
        <div className="flex ">
          <Form
            setCalendarMode={setCalendarMode}
            handleSubmit={handleSubmit}
            eventName={eventName}
            setEventName={setEventName}
          />
        </div>
        <div className="flex">
          {calendarMode === 'specificDates' ? <Cal /> : <DOW />}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
