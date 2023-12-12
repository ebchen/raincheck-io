import React, { useState } from 'react';

const ScheduleComponent = ({
  days,
  hours,
  startDate,
  formatDate,
  formatDay,
  updateHover,
  toggleAvailability,
  selectedCells,
  setSelectedCells,
  availabilities,
  myName,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [cellsToUpdate, setCellsToUpdate] = useState([]);

  const [initialSelectionState, setInitialSelectionState] = useState(false);

  const getIndex = (day, hour) => {
    return { dayIndex: days.indexOf(day), hourIndex: hours.indexOf(hour) };
  };

  const handleMouseDown = (day, hour) => {
    const index = getIndex(day, hour);
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index.dayIndex);
    const dateTimeKey = `${formatDate(date)} ${hours[index.hourIndex]}`;

    const currentState = selectedCells[dateTimeKey] || false;
    setInitialSelectionState(!currentState);

    // Toggle the availability for this cell
    toggleAvailability(dateTimeKey);

    // Update the selected state for this cell
    setSelectedCells((prevSelectedCells) => ({
      ...prevSelectedCells,
      [dateTimeKey]: !currentState,
    }));
    setDragStart(index);
    setIsDragging(true);
    window.addEventListener('mouseup', handleMouseUp);

    console.log('Start Drag:', dragStart);
  };

  const handleMouseEnter = (day, hour) => {
    if (isDragging && dragStart) {
      const currentEnd = getIndex(day, hour);
      selectCells(dragStart, currentEnd);
    } else {
      updateHover(day, hour);
    }
  };

  // Add a handleMouseLeave function
  const handleMouseLeave = () => {
    updateHover(null, null);
    console.log('Available Cells:', availabilities);
  };

  const handleMouseUp = () => {
    // Update availability for all cells in cellsToUpdate
    cellsToUpdate.forEach((dateTimeKey) => {
      toggleAvailability(dateTimeKey);
    });

    // Only reset dragging states, not the selected cells
    setIsDragging(false);
    setDragStart(null);
    setCellsToUpdate([]);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const selectCells = (start, end) => {
    const newSelectedCells = { ...selectedCells };
    const newCellsToUpdate = [];

    const dayStart = Math.min(start.dayIndex, end.dayIndex);
    const dayEnd = Math.max(start.dayIndex, end.dayIndex);
    const hourStart = Math.min(start.hourIndex, end.hourIndex);
    const hourEnd = Math.max(start.hourIndex, end.hourIndex);

    for (let d = dayStart; d <= dayEnd; d++) {
      for (let h = hourStart; h <= hourEnd; h++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + d);
        const dateTimeKey = `${formatDate(date)} ${hours[h]}`;

        newSelectedCells[dateTimeKey] = initialSelectionState;

        // Add cell to update list
        newCellsToUpdate.push(dateTimeKey);
      }
    }

    setSelectedCells(newSelectedCells);
    setCellsToUpdate(newCellsToUpdate);
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

  const lerp = (a, b, u) => {
    return (1 - u) * a + u * b;
  };

  const getCellBackgroundColor = (dateTimeKey) => {
    const cellAvailability = availabilities[dateTimeKey] || [];
    const othersCount = cellAvailability.filter(
      (person) => person.name !== myName && person.isAvailable,
    ).length;

    if (selectedCells[dateTimeKey]) {
      // Interpolate between light green and dark green
      const totalOthers = cellAvailability.length;
      const intensity = totalOthers > 0 ? othersCount / totalOthers : 0;

      // Dark Green (00FF5E) to Light Green (8EFFB8)
      const endGreen = [35, 152, 58]; // RGB for #2D6A4F
      const startGreen = [163, 255, 206]; // RGB for #95D5B2

      const r = Math.floor(lerp(startGreen[0], endGreen[0], intensity));
      const g = Math.floor(lerp(startGreen[1], endGreen[1], intensity));
      const b = Math.floor(lerp(startGreen[2], endGreen[2], intensity));

      return `rgb(${r},${g},${b})`;
    } else {
      // Grey gradient logic
      if (othersCount > 0) {
        const greyIntensity = Math.min(
          othersCount / cellAvailability.length,
          1,
        );
        const greyValue = Math.floor(255 - greyIntensity * 100).toString(16);
        return `#${greyValue}${greyValue}${greyValue}`;
      } else {
        return 'white'; // White if no one else is available
      }
    }
  };

  return (
    <div className="flex">
      <div className="flex flex-col text-sm pr-2">
        {/* Empty div to align the first timestamp with the first cell */}
        <div style={{ height: '24px' }}></div>
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
            <div key={dayIndex} className="flex flex-col">
              {hours.map((hour, hourIndex) => {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + dayIndex);
                const dateTimeKey = `${formatDate(date)} ${hour}`;
                const cellBackgroundColor = getCellBackgroundColor(dateTimeKey);

                return (
                  <div
                    key={hourIndex}
                    className="flex justify-center items-center border border-gray-300"
                    style={{
                      width: '80px',
                      height: '30px',
                      backgroundColor: cellBackgroundColor,
                    }}
                    onMouseDown={() => handleMouseDown(day, hour)}
                    onMouseEnter={() => handleMouseEnter(day, hour)}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleComponent;
