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
  const { eventName } = location.state || { eventName: 'Default Event' }; // Use a default or an empty string if no state is passed
  console.log('Event Name:', eventName);
  const [myName, setMyName] = useState('Cheric');
  // Starting date for the schedule
  const startDate = new Date(2023, 7, 2); // Assuming the start date is August 2, 2023
  const days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];
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
  ]; // Doubled for each hour

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
    const names = ['Sahitya', 'Era', 'Jeff', 'Eric'];
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
  const [selectedCells, setSelectedCells] = useState({});

  const toggleAvailability = (dateTimeKey) => {
    console.log('Changing availability for:', dateTimeKey);

    setYourAvailabilityData((prevData) => {
      const updatedData = { ...prevData };
      const availabilityList = updatedData[dateTimeKey] || [];

      const isMyNameListed = availabilityList.some(
        (person) => person.name === myName,
      );
      if (isMyNameListed) {
        updatedData[dateTimeKey] = availabilityList.map((person) =>
          person.name === myName
            ? { ...person, isAvailable: !person.isAvailable }
            : person,
        );
      } else {
        updatedData[dateTimeKey].push({ name: myName, isAvailable: true });
      }

      console.log('Updated availabilityData:', updatedData);
      return updatedData;
    });

    // setSelectedCells((prev) => ({
    //   ...prev,
    //   [dateTimeKey]: !prev[dateTimeKey],
    // }));
  };

  const updateHoveredTimeSlot = (day, hour) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + days.indexOf(day));
    const timeSlot = `${formatDate(date)} ${hour}`;
    setHoveredTimeSlot(timeSlot);
  };

  return (
    <div className="flex flex-row justify-around items-center w-full max-w-6xl mx-auto p-4 bg-gray-50">
      <Sidebar />
      <div className="mx-4"></div>
      <div className="flex flex-col justify-center items-center pt-4">
        <div className="flex flex-row items-center justify-start w-full">
          <h1 className="text-4xl font-bold mb-3 p-4">{eventName}</h1>
          <CopyLinkComponent eventName={eventName} />
        </div>
        <div className="flex flex-row justify-center items-start">
          <AvailabilityComponent />
          <div className="mx-4"></div>
          <GroupAvailabilityComponent />
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
          <div className="w-1/3 min-w-[300px] max-w-[400px] h-[300px] overflow-auto">
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
