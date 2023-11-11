import React, { useState } from 'react';

// Helper function to format the date in "MMM D" format
const formatDate = (date) => {
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Helper function to format the day in "EEE" format
const formatDay = (date) => {
  const options = { weekday: 'short' };
  return date.toLocaleDateString('en-US', options);
};

// Starting date for the schedule
const startDate = new Date(2023, 7, 2); // Assuming the start date is August 2, 2023

const days = ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'];
const hours = [
  '9:00AM',
  '9:30AM',
  '10:00AM',
  '10:30AM',
  '11:00AM',
  '11:30AM',
  '12:00PM',
  '12:30PM',
  '1:00PM',
  '1:30PM',
  '2:00PM',
  '2:30PM',
  '3:00PM',
  '3:30PM',
  '4:00PM',
]; // Doubled for each hour

const ScheduleComponent = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [selectedCells, setSelectedCells] = useState({});
  const [initialSelectionState, setInitialSelectionState] = useState(false);

  const getIndex = (day, hour) => {
    return { dayIndex: days.indexOf(day), hourIndex: hours.indexOf(hour) };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = (day, hour) => {
    const index = getIndex(day, hour);
    const key = `${day}-${hour}`;
    setInitialSelectionState(!selectedCells[key]);
    setSelectedCells({ ...selectedCells, [key]: !selectedCells[key] });
    setDragStart(index);
    setIsDragging(true);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseEnter = (day, hour) => {
    if (isDragging && dragStart) {
      const currentEnd = getIndex(day, hour);
      selectCells(dragStart, currentEnd);
    }
  };

  const selectCells = (start, end) => {
    const newSelectedCells = { ...selectedCells };
    for (
      let d = Math.min(start.dayIndex, end.dayIndex);
      d <= Math.max(start.dayIndex, end.dayIndex);
      d++
    ) {
      for (
        let h = Math.min(start.hourIndex, end.hourIndex);
        h <= Math.max(start.hourIndex, end.hourIndex);
        h++
      ) {
        const key = `${days[d]}-${hours[h]}`;
        newSelectedCells[key] = initialSelectionState;
      }
    }
    setSelectedCells(newSelectedCells);
  };

  // Create an array of formatted dates and days for the top row
  const datesAndDays = days.map((day, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return {
      formattedDate: formatDate(date),
      formattedDay: formatDay(date),
    };
  });

  return (
    <div className="flex">
      <div className="flex flex-col text-sm pr-2">
        {/* Empty div to align the first timestamp with the first cell */}
        <div style={{ height: '15px' }}></div>
        {hours
          .filter((_, index) => index % 2 === 0)
          .map((hour, index) => (
            // Adjust top margin to create more spacing
            <div
              key={index}
              style={{ height: '60px' }}
              className="flex justify-end items-center"
            >
              <span>{hour}</span>
            </div>
          ))}
        {/* Empty div at the bottom to ensure the last timestamp aligns correctly */}
        <div style={{ height: '15px' }}></div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {datesAndDays.map(({ formattedDate, formattedDay }, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-xs">{formattedDate}</div>
              <div className="text-lg">{formattedDay}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="flex flex-col space-y-1">
              {hours.map((hour, hourIndex) => (
                <div
                  key={hourIndex}
                  className={`flex justify-center items-center border border-gray-300`}
                  style={{
                    width: '80px',
                    height: '30px',
                    backgroundColor: selectedCells[`${day}-${hour}`]
                      ? '#10B981'
                      : 'white',
                  }}
                  onMouseDown={() => handleMouseDown(day, hour)}
                  onMouseEnter={() => handleMouseEnter(day, hour)}
                  onMouseUp={handleMouseUp}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleComponent;
