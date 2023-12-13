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

const People = ({ prepopulatedNames, shownNames, setShownNames }) => {
  const [selectedChips, setSelectedChips] = useState(shownNames);

  useEffect(() => {
    setSelectedChips(shownNames);
  }, [shownNames]);

  const handleChipClick = (person) => {
    const updatedShownNames = shownNames.includes(person)
      ? shownNames.filter((name) => name !== person)
      : [...shownNames, person];

    setShownNames(updatedShownNames);
  };

  return (
    <div className="border border-blue-500 text-blue-500 rounded-md text-base p-4 w-1/2 mb-4 mr-2">
      <p className="text-center font-bold mb-2">People</p>
      <div className="flex flex-wrap gap-2">
        {prepopulatedNames.map((person, index) => (
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
  { time: 'Mon, Dec 18: 1:00PM - 2:00PM', peopleAvailable: 6 },
  { time: 'Tue, Dec 19: 9:00AM - 10:30AM', peopleAvailable: 5 },
  { time: 'Wed, Dec 20: 2:00PM - 3:00PM', peopleAvailable: 4 },
];

const BestTimesComponent = ({ yourAvailabilityData, shownNames }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [bestTimes, setBestTimes] = useState([]);

  useEffect(() => {
    // Function to calculate the fraction of available people for each time slot
    const calculateBestTimes = () => {
      let availabilityCounts = [];

      for (const [timeSlot, availabilities] of Object.entries(
        yourAvailabilityData,
      )) {
        let availableCount = availabilities.filter(
          (person) => shownNames.includes(person.name) && person.isAvailable,
        ).length;
        let fractionAvailable = availableCount / shownNames.length;
        availabilityCounts.push({
          time: timeSlot,
          fractionAvailable,
          peopleAvailable: availableCount,
        });
      }

      // Sort by fractionAvailable and get top 3 times
      availabilityCounts.sort(
        (a, b) => b.fractionAvailable - a.fractionAvailable,
      );
      return availabilityCounts.slice(0, 3); // Get top 3 times
    };

    setBestTimes(calculateBestTimes());
  }, [yourAvailabilityData, shownNames]);

  const copyToClipboard = (index, time) => {
    navigator.clipboard.writeText(time);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 3000);
  };

  return (
    <div className="border border-blue-500 text-blue-500 rounded-md text-base p-4 w-1/2 mb-4 ml-2">
      <p className="text-center font-bold mb-2">Best Times</p>
      <ul className="pl-0">
        {bestTimes.map((entry, index) => (
          <li
            key={index}
            className="text-black flex items-center justify-between text-base mb-2"
          >
            <div className="flex items-center">
              <div className="bg-blue-500 text-white font-bold rounded-full px-2 py-1 text-xs mr-2">
                {`${entry.peopleAvailable}/${shownNames.length}`}
              </div>
              <span className="ml-2 text-sm">{entry.time}</span>
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

const GroupAvailabilityComponent = ({
  prepopulatedNames,
  shownNames,
  setShownNames,
  yourAvailabilityData,
}) => {
  // the availability data
  const [availabilityData, setAvailabilityData] = useState(
    initialAvailabilityData,
  );
  // total people

  const [totalPeople, setTotalPeople] = useState(shownNames.length);

  // update availability data later
  const updateAvailabilityData = () => {
    const newAvailabilityData = initialAvailabilityData;
    setAvailabilityData(newAvailabilityData);
  };

  useEffect(() => {
    updateAvailabilityData();
  }, []);

  return (
    <div className="h-full w-full bg-white rounded-md shadow-md items-center justify-center py-4 px-8 ">
      <h2 className="text-2xl font-bold mb-4 p-3 text-center">
        Group Availability
      </h2>
      <div className="flex">
        <People
          prepopulatedNames={prepopulatedNames}
          shownNames={shownNames}
          setShownNames={setShownNames}
        />
        <BestTimesComponent
          availabilityData={availabilityData}
          totalPeople={shownNames.length}
          shownNames={shownNames}
          yourAvailabilityData={yourAvailabilityData}
        />
      </div>
    </div>
  );
};

export default GroupAvailabilityComponent;
