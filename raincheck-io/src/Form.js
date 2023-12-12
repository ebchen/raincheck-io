import React, { useState } from 'react';

const Form = ({
  setCalendarMode,
  handleSubmit,
  eventName,
  setEventName,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}) => {
  const [calendarType, setCalendarType] = useState('specificDates');
  const [error, setError] = useState(false);
  const [timezone, setTimezone] = useState('EST (Eastern Standard Time)');
  const [wantNotifications, setWantNotifications] = useState(false);
  const [useHeaders, setUseHeaders] = useState(false);
  const [notificationEmail, setNotificationEmail] = useState('');

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleCalendarTypeChange = (selectedType) => {
    setCalendarType(selectedType);
    setCalendarMode(selectedType);
  };

  const convertTo24Hour = (time) => {
    let [hours, modifier] = time.split(' ');
    let [hh, mm] = hours.split(':');
    if (modifier === 'PM' && hh !== '12') {
      hh = parseInt(hh, 10) + 12;
    } else if (modifier === 'AM' && hh === '12') {
      hh = '00';
    }
    return `${hh}:${mm}`;
  };

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
    setError(convertTo24Hour(newStartTime) >= convertTo24Hour(endTime));
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);
    setError(convertTo24Hour(startTime) >= convertTo24Hour(newEndTime));
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      eventName,
      calendarType,
    };
    handleSubmit(eventData);
  };

  const generateHours = () => {
    const hours = ['12'];
    for (let i = 1; i <= 11; i++) {
      hours.push(i.toString().padStart(2, '0'));
    }
    return hours;
  };

  const hours = generateHours();

  // List of timezones
  const timezones = [
    'HST (Hawaii-Aleutian Standard Time)',
    'AKT (Alaska Time)',
    'PST (Pacific Time)',
    'MST (Mountain Standard Time)',
    'CST (Central Standard Time)',
    'EST (Eastern Standard Time)',
    'AST (Atlantic Standard Time)',
    'NST (Newfoundland Standard Time)',
    'UTC (Coordinated Universal Time)',
    'GMT (Greenwich Mean Time)',
    'CET (Central European Time)',
    'CEST (Central European Summer Time)',
    'EET (Eastern European Time)',
    'EEST (Eastern European Summer Time)',
    'GST (Gulf Standard Time)',
    'IST (Indian Standard Time)',
    'GST (Gulf Standard Time)',
    'CST (China Standard Time)',
    'JST (Japan Standard Time)',
    'ACST (Australian Central Standard Time)',
    'AEST (Australian Eastern Standard Time)',
    'ACDT (Australian Central Daylight Time)',
    'AEDT (Australian Eastern Daylight Time)',
    'NZST (New Zealand Standard Time)',
    'NZDT (New Zealand Daylight Time)',
    'NDT (Newfoundland Daylight Time)',
  ];

  return (
    <div className="w-full bg-white shadow-lg rounded-lg items-center justify-center py-4 px-8">
      <h2 className="text-3xl font-bold mb-3 px-4 pt-4 pb-3 text-center">
        Create a New Event
      </h2>
      <div className="flex justify-center">
        <form onSubmit={handleFormSubmit} className="">
          {/* Event Name Section */}
          <div className="mb-4">
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
              className="mt-1 p-2 border rounded-md placeholder-gray-500 w-full"
              required
            />
          </div>

          {useHeaders && (
            <label className="block text-sm font-medium text-blue-500 mb-2">
              Calendar Type <span className="text-red-500">*</span>
            </label>
          )}

          <div className="mb-4 flex">
            <button
              type="button"
              onClick={() => handleCalendarTypeChange('specificDates')}
              className={`text-white px-3 py-2 rounded-l-md w-full ${
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
              className={`text-white px-3 py-2 rounded-r-md w-full ${
                calendarType === 'daysOfWeek' ? 'bg-blue-700' : 'bg-slate-400'
              }`}
            >
              Days of the Week
            </button>
          </div>
          {useHeaders && (
            <label className="block text-sm font-medium text-blue-500">
              Time Range <span className="text-red-500">*</span>
            </label>
          )}

          <div className="flex justify-start">
            <select
              id="startTime"
              name="startTime"
              value={startTime}
              onChange={handleStartTimeChange}
              className="mt-1 p-2 border rounded-md w-full"
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
              className="mt-1 p-2 border rounded-md ml-2 w-full"
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
          <div
            className={`h-6 ${
              error ? 'visible' : 'invisible'
            } text-rose-500 text-sm font-semibold ml-1 mt-1`}
          >
            {error && '*Start time must be before end time'}
          </div>

          {useHeaders && (
            <label className="block text-sm font-medium text-blue-500 mt-3">
              Timezone <span className="text-red-500">*</span>
            </label>
          )}

          <div className="mb-4 flex justify-start">
            <select
              id="timezone"
              name="timezone"
              value={timezone}
              onChange={handleTimezoneChange}
              className="mt-1 p-2 border rounded-md w-full"
              required
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-start">
            <label
              htmlFor="wantNotifications"
              className="text-sm text-blue-500 font-bold ml-2"
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

          {/* Email Input Field - Transparent When Checkbox Not Checked */}
          <div className="mb-4 mt-2">
            {useHeaders && (
              <label
                htmlFor="email"
                className={`block text-sm font-medium text-blue-500 ${
                  wantNotifications ? '' : 'invisible'
                }`}
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
              className={`mt-1 p-2 border rounded-md placeholder-gray-500 w-full ${
                wantNotifications ? '' : 'opacity-0 pointer-events-none'
              }`}
              required={wantNotifications}
            />
          </div>

          {/* Submit Button */}
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
