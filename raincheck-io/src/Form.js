import React, { useState } from 'react';

const Form = ({ setMode }) => {
  // State to store the event name
  const [eventName, setEventName] = useState('');
  const [calendarType, setCalendarType] = useState('specificDates');
  const [startTime, setStartTime] = useState('09:00 AM');
  const [endTime, setEndTime] = useState('05:00 PM');
  const [timezone, setTimezone] = useState('EST');
  const [wantNotifications, setWantNotifications] = useState(false);
  const [useHeaders, setUseHeaders] = useState(true); // toggle false or true
  const [notificationEmail, setNotificationEmail] = useState(''); // New state for email

  // Function to handle changes in the event name input
  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleCalendarTypeChange = (selectedType) => {
    setCalendarType(selectedType);
    setMode(selectedType);
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

  const handleNotificationEmailChange = (e) => {
    setNotificationEmail(e.target.value);
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
  const timezones = [
    'ET (Eastern Time)',
    'UTC (Coordinated Universal Time)',
    'GMT (Greenwich Mean Time)',
    'CT (Central Time)',
    'MT (Mountain Time)',
    'PT (Pacific Time)',
    'MST (Mountain Standard Time)',
    'CST (Central Standard Time)',
    'EST (Eastern Standard Time)',
    'AST (Atlantic Standard Time)',
    'AKT (Alaska Time)',
    'HST (Hawaii-Aleutian Standard Time)',
    'CET (Central European Time)',
    'CEST (Central European Summer Time)',
    'JST (Japan Standard Time)',
    'CST (China Standard Time)',
    'GST (Gulf Standard Time)',
    'IST (Indian Standard Time)',
    'AEST (Australian Eastern Standard Time)',
    'AEDT (Australian Eastern Daylight Time)',
    'ACST (Australian Central Standard Time)',
    'ACDT (Australian Central Daylight Time)',
    'AWST (Australian Western Standard Time)',
    'NZST (New Zealand Standard Time)',
    'NZDT (New Zealand Daylight Time)',
    'NST (Newfoundland Standard Time)',
    'NDT (Newfoundland Daylight Time)',
  ];

  const hours = generateHours();

  return (
    <div className="w-full lg:w-1/2 bg-white rounded-md shadow-md items-center justify-center py-8 px-8 mx-28">
      <h2 className="text-3xl font-bold mb-3 p-4 text-center">
        Create a New Event
      </h2>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            {/* if useHeader is true, then include Event Name header */}
            {useHeaders && (
              <label
                htmlFor="eventName"
                className="block text-sm font-medium text-blue-500"
              >
                Event Name <span className="text-red-500">*</span>
              </label>
            )}

            <input
              type="text"
              id="eventName"
              name="eventName"
              value={eventName}
              onChange={handleEventNameChange}
              placeholder="Enter an event name"
              className="mt-1 p-2 border rounded-md ml-2 placeholder-gray-500 w-full"
              required
            />
          </div>

          {useHeaders && (
            <label className="block text-sm font-medium text-blue-500 mb-2">
              Calendar Type <span className="text-red-500">*</span>
            </label>
          )}

          <div className="mb-4 flex justify-start">
            <div className="flex">
              <button
                type="button"
                onClick={() => handleCalendarTypeChange('specificDates')}
                className={`text-white px-4 py-2 rounded-l-md ${
                  calendarType === 'specificDates'
                    ? 'bg-blue-700'
                    : 'bg-slate-400'
                }`}
              >
                Specific Dates
              </button>
              <button
                type="button"
                onClick={() => handleCalendarTypeChange('daysOfWeek')}
                className={`text-white px-4 py-2 rounded-r-md ${
                  calendarType === 'daysOfWeek' ? 'bg-blue-700' : 'bg-slate-400'
                }`}
              >
                Days of the Week
              </button>
            </div>
          </div>
          {useHeaders && (
            <label className="block text-sm font-medium text-blue-500">
              Time Range <span className="text-red-500">*</span>
            </label>
          )}

          <div className="mb-4 flex justify-start">
            <select
              id="startTime"
              name="startTime"
              value={startTime}
              onChange={handleStartTimeChange}
              className="mt-1 p-2 border rounded-md"
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

          {useHeaders && (
            <label className="block text-sm font-medium text-blue-500 ml-2 mt-3">
              Timezone <span className="text-red-500">*</span>
            </label>
          )}

          <div className="mb-4 flex justify-start">
            <select
              id="timezone"
              name="timezone"
              value={timezone}
              onChange={handleTimezoneChange}
              className="mt-1 p-2 border rounded-md"
              required
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          <div className="">
            <div className="flex items-center justify-start">
              <label
                htmlFor="wantNotifications"
                className="text-sm text-blue-500"
              >
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

            {wantNotifications && (
              <div className="mb-4 mt-2">
                {useHeaders && (
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-blue-500"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                )}

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={notificationEmail}
                  onChange={handleNotificationEmailChange}
                  placeholder="Enter your email"
                  className="mt-1 p-2 border rounded-md placeholder-gray-500 w-full"
                  required
                />
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 font-bold text-white px-20 py-2 rounded-md text-xl hover:bg-blue-700 mt-4 mb-4"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
