import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

const AvailabilityComponent = () => {
  const [name, setName] = useState('');
  const [showInput, setShowInput] = useState(true);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSyncCalendar = () => {
    // Handle syncing with Google Calendar
  };

  const handleAddAvailability = () => {
    // Handle adding availability
    setShowInput(false);
  };

  return (
    <div className="flex flex-col flex-grow h-300 w-full lg:w-1/3 bg-white rounded-md shadow-md items-center justify-center py-10 px-8 ">
      {showInput ? (
        <h2 className="text-2xl font-bold mb-0 p-3 text-center">
          Add your Availability
        </h2>
      ) : (
        <h2 className="text-2xl font-bold mb-0 p-3 text-center">Edit Name</h2>
      )}

      <div className="flex flex-col items-center h-full">
        {showInput ? (
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="mt-1 p-2 border rounded-md placeholder-gray-500 w-full mb-4"
            required
          />
        ) : (
          <p className="text-xl font-bold mb-4">{name}</p>
        )}

        <button
          type="button"
          onClick={handleSyncCalendar}
          className="bg-white font-bold text-blue-500 border border-blue-500 py-2 rounded-md text-base hover:bg-blue-100 w-full mb-4  flex items-center justify-center px-2"
        >
          <FcGoogle className="w-6 h-6 mr-1" />
          <span className="ml-2">Sync your Google Calendar</span>
        </button>

        <button
          type="button"
          onClick={handleAddAvailability}
          className="bg-blue-500 w-full text-white px-10 py-2 rounded-md text-xl hover:bg-blue-700 mb-2"
        >
          {showInput ? 'Add Availability' : 'Edit Name'}
        </button>
      </div>
    </div>
  );
};

export default AvailabilityComponent;