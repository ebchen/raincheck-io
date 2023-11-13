import React, { useState } from 'react';

const Form = () => {
  // State to store the event name
  const [eventName, setEventName] = useState('');
  const [calendarType, setCalendarType] = useState('specificDates');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('05:00 PM');
  const [timezone, setTimezone] = useState('EST');
  const [wantNotifications, setWantNotifications] = useState(false);

  // Function to handle changes in the event name input
  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleCalendarTypeChange = (selectedType) => {
    setCalendarType(selectedType);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
  };

  const handleWantNotificationsChange = (e) => {
    setWantNotifications(e.target.checked);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // later lmao
  };

  // Function to generate an array of hours 
  const generateHours = () => {
    const hours = [];
    for (let i = 1; i <= 11; i++) {
      hours.push(i.toString().padStart(2, '0'));
    }
    return hours;
  };

  // List of timezones
  const timezones = ['UTC', 'EST', 'PST', 'America/New_York', 'Europe/London', 'Asia/Tokyo', /* Add more as needed */];


  const hours = generateHours();

  return (
    <div className="w-1/3 bg-white rounded-3xl shadow-md">
      <h2 className="text-4xl font-bold mb-3 p-4">Create a New Event</h2>
      <form onSubmit={handleSubmit}>

   
        
        <div className="mb-4">
          <label htmlFor="eventName" className="block text-sm font-medium text-blue-500">
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventName}
            onChange={handleEventNameChange}
            placeholder="Enter an event name"
            className="mt-1 p-2 border rounded-md ml-2 placeholder-gray-500"
            required
          />
        </div>


        <label className="block text-sm font-medium text-blue-500 mb-2">
            Calendar Type <span className="text-red-500">*</span>
        </label>
        <div className="mb-4 flex justify-center">
          <div className="flex">
            <button
              type="button"
              onClick={() => handleCalendarTypeChange('specificDates')}
              className={`bg-blue-500 text-white px-4 py-2 rounded-md mr-4 ${
                calendarType === 'specificDates' && 'bg-blue-700'
              }`}
            >
              Specific Dates
            </button>
            <button
              type="button"
              onClick={() => handleCalendarTypeChange('daysOfWeek')}
              className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                calendarType === 'daysOfWeek' && 'bg-blue-700'
              }`}
            >
              Days of the Week
            </button>
          </div>
        </div>
        
        <label className="block text-sm font-medium text-blue-500">
            Time Range <span className="text-red-500">*</span>
          </label>
        <div className="mb-4 flex justify-center">
          <select
            id="startTime"
            name="startTime"
            value={startTime}
            onChange={handleStartTimeChange}
            className="mt-1 p-2 border rounded-md ml-2"
            required
          >
            {hours.map((hour) => (
                <option key={`${hour}:00-AM`} value={`${hour}:00 AM`}>
                {`${hour}:00 AM`}
                </option>
            ))}
            <option key={`12:00-PM`} value={`12:00 PM`}>
                12:00 PM
            </option>
            {hours.slice(1).map((hour) => (
                <option key={`${hour}:00-PM`} value={`${hour}:00 PM`}>
                {`${hour}:00 PM`}
                </option>
            ))}
            <option key={`12:00-PM`} value={`12:00 PM`}>
                12:00 AM
            </option>
          </select>

          <label className="block text-sm font-medium text-gray-600 ml-2 mt-3">
            to
          </label>
          <select
            id="endTime"
            name="endTime"
            value={endTime}
            onChange={handleEndTimeChange}
            className="mt-1 p-2 border rounded-md ml-2"
            required
          >
            {hours.map((hour) => (
                <option key={`${hour}:00-AM`} value={`${hour}:00 AM`}>
                {`${hour}:00 AM`}
                </option>
            ))}
            <option key={`12:00-PM`} value={`12:00 PM`}>
                12:00 PM
            </option>
            {hours.slice(1).map((hour) => (
                <option key={`${hour}:00-PM`} value={`${hour}:00 PM`}>
                {`${hour}:00 PM`}
                </option>
            ))}
            <option key={`12:00-PM`} value={`12:00 PM`}>
                12:00 AM
            </option>
          </select>
        </div>

        <label className="block text-sm font-medium text-blue-500 ml-2 mt-3">
            Timezone <span className="text-red-500">*</span>
        </label>
        <div className="mb-4 flex justify-center">
            <select
            id="timezone"
            name="timezone"
            value={timezone}
            onChange={handleTimezoneChange}
            className="mt-1 p-2 border rounded-md ml-2"
            required
            >
            {timezones.map((tz) => (
                <option key={tz} value={tz}>
                {tz}
                </option>
            ))}
            </select>
        </div>

        <div className="ml-4 flex items-center justify-center">
            <label htmlFor="wantNotifications" className="ml-2 text-sm text-blue-500">
              Want notifications? 
            </label>

            <input
              type="checkbox"
              id="wantNotifications"
              name="wantNotifications"
              checked={wantNotifications}
              onChange={handleWantNotificationsChange}
              className="form-checkbox h-4 w-4 text-blue-500 ml-4"
            />
        </div>


        <button 
  type="submit"
  className="bg-blue-500 font-bold text-white px-20 py-2 rounded-md text-2xl hover:bg-blue-700 mt-4 mb-4"
>
  Create  
</button>


      </form>
    </div>
  );
};

export default Form;
