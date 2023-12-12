import React from 'react';

const StatusComponent = ({ hoveredTimeSlot, availabilityData }) => {
  // Extract the status data for the hovered time slot
  const status = availabilityData?.[hoveredTimeSlot] || [];

  // Build lists of available and unavailable people
  const availablePeople = status
    .filter((person) => person.isAvailable)
    .map((person) => person.name);
  const unavailablePeople = status
    .filter((person) => !person.isAvailable)
    .map((person) => person.name);

  // console.log('Status:', status);
  // console.log('hoveredTimeSlot:', hoveredTimeSlot);
  // console.log('availablePeople:', availablePeople);

  return (
    <div className="bg-white shadow-lg rounded-md p-4 h-full">
      <div className="grid grid-cols-2 gap-4 text-center">
        {/* Available Column */}
        <div>
          <h2 className="text-lg font-bold text-blue-500 underline">
            Available
          </h2>
          {availablePeople.length > 0 ? (
            availablePeople.map((name, index) => (
              <p key={index} className="text-sm">
                {name}
              </p>
            ))
          ) : (
            <p className="text-sm"></p>
          )}
        </div>

        {/* Unavailable Column */}
        <div>
          <h2 className="text-lg font-bold text-blue-500 underline">
            Unavailable
          </h2>
          {unavailablePeople.length > 0 ? (
            unavailablePeople.map((name, index) => (
              <p key={index} className="text-sm">
                {name}
              </p>
            ))
          ) : (
            <p className="text-sm"></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusComponent;
