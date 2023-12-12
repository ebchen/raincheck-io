import NavBar from './Navbar';
import ScheduleComponent from './ScheduleComponent';
import Sidebar from './Sidebar';
import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AvailabilityComponent from './AvailabilityComponent';
import CopyLinkComponent from './CopyLinkComponent';
import GroupAvailabilityComponent from './GroupAvailabilityComponent';
import StatusComponent from './StatusComponent';

const SchedulePage = () => {
  const location = useLocation();
  const { eventName, startTime, endTime } = location.state || {
    eventName: 'Default Event',
    startTime: '9:00 AM',
    endTime: '5:00 PM',
  };

  const selectedCalendarDates = [
    [2023, 12, 18],
    [2023, 12, 19],
    [2023, 12, 20],
  ];

  const [myName, setMyName] = useState('Cheric');

  const sortedDates = selectedCalendarDates.sort();
  console.log('Sorted Dates:', sortedDates);
  const startDate = new Date(sortedDates[0]);
  const days = sortedDates.map((date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  });

  // const startDate = new Date(2023, 7, 2);

  const calculateHoursArray = (start, end) => {
    let result = [];
    let currentDate = new Date(`01/01/2000 ${start}`);
    const endDate = new Date(`01/01/2000 ${end}`);

    do {
      result.push(
        currentDate.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }),
      );
      currentDate = new Date(currentDate.getTime() + 30 * 60000); // Add 30 minutes
    } while (currentDate <= endDate);

    return result;
  };

  const [hours, setHours] = useState(calculateHoursArray(startTime, endTime));

  // Helper function to format the date in "MMM D" format
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Helper function to format the day in "EEE" format
  const formatDay = (date) => {
    const options = { weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  const generateRandomAvailability = (myName) => {
    const names = [
      'Sahitya',
      'Era',
      'Jeff',
      'Eric',
      'Ethan',
      'Rajiv',
      'Ria',
      'Zhang',
    ];
    const dummyData = {};

    days.forEach((day) => {
      hours.forEach((hour) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + days.indexOf(day));
        const dateTimeKey = `${formatDate(date)} ${hour}`;

        // Generate random availability for other names
        dummyData[dateTimeKey] = names.map((name) => ({
          name: name,
          isAvailable: Math.random() < 0.5, // 50% chance of being available
        }));

        // Add myName as not available for every time slot
        dummyData[dateTimeKey].push({ name: myName, isAvailable: false });
      });
    });

    return dummyData;
  };

  const initializeAvailabilityData = (dummyData) => {
    if (dummyData) {
      return dummyData;
    }

    const availabilityData = {};
    days.forEach((day) => {
      hours.forEach((hour) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + days.indexOf(day));
        const dateTimeKey = `${formatDate(date)} ${hour}`;
        availabilityData[dateTimeKey] = [{ name: myName, isAvailable: false }];
      });
    });
    return availabilityData;
  };

  const dummyAvailabilityData = generateRandomAvailability();
  const [yourAvailabilityData, setYourAvailabilityData] = useState(
    initializeAvailabilityData(dummyAvailabilityData),
  );
  const [calendarMode, setCalendarMode] = useState('specificDates');
  //   const [eventName, setEventName] = useState('CIS5120 Meeting');
  const [hoveredTimeSlot, setHoveredTimeSlot] = useState(null);
  const [selectedCells, setSelectedCells] = useState(new Set());

  const toggleAvailability = (timeSlot) => {
    const updatedAvailabilityData = { ...yourAvailabilityData };
    if (updatedAvailabilityData[timeSlot]) {
      if (updatedAvailabilityData[timeSlot].includes(myName)) {
        updatedAvailabilityData[timeSlot] = updatedAvailabilityData[
          timeSlot
        ].filter((name) => name !== myName);
      } else {
        updatedAvailabilityData[timeSlot].push(myName);
      }
    } else {
      updatedAvailabilityData[timeSlot] = [myName];
    }
    setYourAvailabilityData(updatedAvailabilityData);
  };

  const updateSelectedCells = (cell) => {
    const newSelectedCells = new Set(selectedCells);
    if (newSelectedCells.has(cell)) {
      newSelectedCells.delete(cell);
    } else {
      newSelectedCells.add(cell);
    }
    setSelectedCells(newSelectedCells);
  };

  const updateHoveredTimeSlot = (day, hour) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + days.indexOf(day));
    const timeSlot = `${formatDate(date)} ${hour}`;
    setHoveredTimeSlot(timeSlot);
  };

  return (
    <div className="flex flex-row items-center w-full h-full max-w-6xl mx-auto p-4">
      <Sidebar />
      <div className="mx-4"></div>
      <div className="flex flex-col w-full justify-center items-center pt-4">
        <div className="flex flex-row items-center justify-start w-full">
          <h1 className="text-4xl font-bold mb-3 p-4">{eventName}</h1>
          <CopyLinkComponent eventName={eventName} />
        </div>
        <div className="flex flex-row justify-center items-start w-full">
          <div className="flex w-1/3 mr-4">
            <AvailabilityComponent />
          </div>

          <div className=""></div>
          <div className="flex w-2/3 ml-4">
            <GroupAvailabilityComponent />
          </div>
        </div>

        {/* Schedule and Status components */}
        <div className="flex flex-row justify-center items-start w-full mt-8 gap-4">
          <div className="flex-grow">
            <ScheduleComponent
              updateHover={updateHoveredTimeSlot}
              toggleAvailability={toggleAvailability}
              selectedCells={selectedCells}
              setSelectedCells={setSelectedCells}
              days={days}
              hours={hours}
              startDate={startDate}
              formatDate={formatDate}
              formatDay={formatDay}
              availabilities={yourAvailabilityData}
              myName={myName}
            />
          </div>
          <div className="w-1/3 min-w-[300px] max-w-[400px] h-[432px] shadow-lg rounded-md">
            <StatusComponent
              hoveredTimeSlot={hoveredTimeSlot}
              availabilityData={yourAvailabilityData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
