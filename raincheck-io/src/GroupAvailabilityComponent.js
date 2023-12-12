import React, { useState, useEffect } from 'react';
import { LuCopy } from 'react-icons/lu';
import { FaCheck } from 'react-icons/fa';
import Chip from '@mui/material/Chip';

// change to checkmark when copied
const CopyIcon = ({ handleClick, isCopied }) => {
  return (
    <div onClick={handleClick} className="cursor-pointer">
      {isCopied ? (
        <FaCheck className="text-blue-500" size={20} />
      ) : (
        <LuCopy className="text-blue-500" size={20} />
      )}
    </div>
  );
};

// hardcoded for now
const people = ['Sahitya', 'Eric', 'Era', 'Jeffrey'];

const People = () => {
  const [selectedChips, setSelectedChips] = useState(['Sahitya', 'Eric']);

  const handleChipClick = (person) => {
    // Toggle the selected state of the clicked chip
    setSelectedChips((prevSelectedChips) =>
      prevSelectedChips.includes(person)
        ? prevSelectedChips.filter((chip) => chip !== person)
        : [...prevSelectedChips, person],
    );
  };

  return (
    <div className="border border-blue-500 text-blue-500 rounded-md text-base p-4 w-1/2 mb-4 mr-2">
      <p className="text-center font-bold mb-2">People</p>
      <div className="flex flex-wrap gap-2">
        {people.map((person, index) => (
          <Chip
            key={index}
            label={person}
            variant={selectedChips.includes(person) ? 'filled' : 'outlined'}
            style={{
              fontFamily: 'Space Grotesk',
              color: selectedChips.includes(person) ? '#FFFFFF' : '#3B82F6',
              backgroundColor: selectedChips.includes(person)
                ? '#3B82F6'
                : '#FFFFFF',
              fontWeight: 'bold',
            }}
            onClick={() => handleChipClick(person)}
          />
        ))}
      </div>
    </div>
  );
};

// hardcoded for now
const initialAvailabilityData = [
  { time: 'Wed, Aug 2: 9:00AM - 10:30AM', peopleAvailable: 3 },
  { time: 'Sat, Aug 5: 1:00PM - 3:30PM', peopleAvailable: 5 },
  { time: 'Tues, Aug 8: 2:00PM - 3:00PM', peopleAvailable: 2 },
];

const BestTimesComponent = ({ availabilityData, totalPeople }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (index, time) => {
    navigator.clipboard.writeText(time);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 3000);
  };

  return (
    <div className="border border-blue-500 text-blue-500 rounded-md text-base p-4 w-1/2 mb-4 ml-2">
      <p className="text-center font-bold mb-2">Best Times</p>
      <ul className="pl-0">
        {availabilityData.map((entry, index) => (
          <li
            key={index}
            className="text-black flex items-center justify-between text-base mb-2"
          >
            <div className="flex items-center">
              <div className="bg-blue-500 text-white font-bold rounded-full px-2 py-1 text-xs mr-2">
                {`${entry.peopleAvailable}/${totalPeople}`}
              </div>

              <span className="ml-2 text-sm">{`${entry.time}`}</span>
            </div>

            <CopyIcon
              handleClick={() => copyToClipboard(index, entry.time)}
              isCopied={copiedIndex === index}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const GroupAvailabilityComponent = () => {
  // the availability data
  const [availabilityData, setAvailabilityData] = useState(
    initialAvailabilityData,
  );
  // total people
  const [totalPeople, setTotalPeople] = useState(10);

  // update total number of people later
  const updateTotalPeople = () => {
    const newTotalPeople = 4;
    setTotalPeople(newTotalPeople);
  };

  // update availability data later
  const updateAvailabilityData = () => {
    const newAvailabilityData = initialAvailabilityData;
    setAvailabilityData(newAvailabilityData);
  };

  useEffect(() => {
    updateTotalPeople();
    updateAvailabilityData();
  }, []);

  return (
    <div className="h-full w-full bg-white rounded-md shadow-md items-center justify-center py-4 px-8 ">
      <h2 className="text-2xl font-bold mb-4 p-3 text-center">
        Group Availability
      </h2>
      <div className="flex">
        <People />
        <BestTimesComponent
          availabilityData={availabilityData}
          totalPeople={totalPeople}
        />
      </div>
    </div>
  );
};

export default GroupAvailabilityComponent;
