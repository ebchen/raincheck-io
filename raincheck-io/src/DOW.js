import { useState } from 'react';

const DOW = () => {
  const [dates, setDates] = useState(7);
  const [selectedDates, setSelectedDates] = useState([]);
  const [startDOW, setStartDOW] = useState("Mo");
  const dOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const daysArray = Array.from({ length: dates }, (_, i) => i + 1);

  const toggleSelectedDate = (day) => {
    if (selectedDates.includes(day)) {
      setSelectedDates((prevDates) => prevDates.filter((date) => date !== day));
    } else {
      setSelectedDates((prevDates) => [...prevDates, day]);
    }
  };

  return (
    <div class="min-h-screen flex items-center justify-center py-8 px-4">
      <div class="max-w-md w-full shadow-lg rounded-lg">
        <div class="md:p-8 p-5 dark:bg-blue-500 bg-white rounded-lg">
          <div class="pl-4 flex items-center justify-between">
            <span
              tabindex="0"
              class="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800"
            >
              Days of Week
            </span>
          </div>
          <div class="flex items-center justify-between pt-12 overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr>
                {dOW.map((_, index) => {
                  const dayIndex = (dOW.indexOf(startDOW) + index) % 7;
                  return (
                    <th key={dOW[dayIndex]}>
                      <div class="w-full flex justify-center">
                        <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                          {dOW[dayIndex]}
                        </p>
                      </div>
                    </th>
                  );
                })}
                </tr>
              </thead>
              <tbody>
                {
                  // Chunk the days into groups of 7 for each week
                  Array(Math.ceil(daysArray.length / 7))
                    .fill()
                    .map((_, weekIndex) => (
                      <tr key={weekIndex}>
                        {Array(7)
                          .fill()
                          .map((_, dayIndex) => {
                            const baseClass =
                              'text-base font-medium flex items-center justify-center w-8 h-8 hover:bg-blue-500 hover:text-white';
                            const dayNumber = weekIndex * 7 + dayIndex;
                            const isSelected =
                              selectedDates.includes(dayNumber);
                            if (dayNumber <= dates) {
                              return (
                                <td
                                  key={dayIndex}
                                  onClick={() => toggleSelectedDate(dayNumber)}
                                >
                                  <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                    {isSelected ? (
                                      <a
                                        role="link"
                                        tabIndex="0"
                                        className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:bg-blue-500 hover:bg-blue-500 text-white bg-blue-700 rounded-lg ${baseClass}`}
                                      >
                                        ✔
                                      </a>
                                    ) : (
                                      <p
                                        className={`text-gray-500 dark:text-gray-100 outline-dotted rounded-lg ${baseClass}`}
                                      >
                                        ✗
                                      </p>
                                    )}
                                  </div>
                                </td>
                              );
                            } else {
                              // Empty cell if no day exists
                              return (
                                <td key={dayIndex}>
                                  <div className="px-2 py-2 flex w-full justify-center"></div>
                                </td>
                              );
                            }
                          })}
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </div>
          <button
            className="mt-4 bg-blue-100 hover:bg-blue-700 hover:text-white transition-colors duration-300 text-blue-500 px-4 py-2 rounded"
            onClick={() => setSelectedDates([])}
          >
            Clear All Dates
          </button>
        </div>
      </div>
    </div>
  );
};

export default DOW;
