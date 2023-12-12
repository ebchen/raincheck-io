import { useState, useEffect } from 'react';

const Cal = ({ selectedCalendarDates, setSelectedCalendarDates }) => {
  const months = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };

  const monthsOrder = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const fixedDOW = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const today = new Date();
  const currentMonth = monthsOrder[today.getMonth()];
  const currentYear = today.getFullYear();
  const todayDate = today.getDate();

  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [dates, setDates] = useState(months[currentMonth]);
  const [daysArray, setDaysArray] = useState([]);

  const getStartDayOfMonth = (year, month) => {
    return new Date(year, monthsOrder.indexOf(month), 1).getDay();
  };

  const calculateMonthDaysArray = (year, month) => {
    const firstDayOfMonth = getStartDayOfMonth(year, month);
    const daysInMonth = months[month];
    let daysArray = Array(firstDayOfMonth).fill(null);
    daysArray = daysArray.concat(
      Array.from({ length: daysInMonth }, (_, i) => i + 1),
    );
    return daysArray;
  };

  useEffect(() => {
    const newDaysArray = calculateMonthDaysArray(year, month);
    setDaysArray(newDaysArray);
  }, [month, year]);

  const updateCalendar = (newMonth, newYear) => {
    setMonth(newMonth);
    setYear(newYear);
    setDates(months[newMonth]);
  };

  const decrementMonth = () => {
    const newMonthIndex =
      (monthsOrder.length + monthsOrder.indexOf(month) - 1) %
      monthsOrder.length;
    const newMonth = monthsOrder[newMonthIndex];
    const newYear = newMonth === 'December' ? year - 1 : year;
    updateCalendar(newMonth, newYear);
  };

  const incrementMonth = () => {
    const newMonthIndex = (monthsOrder.indexOf(month) + 1) % monthsOrder.length;
    const newMonth = monthsOrder[newMonthIndex];
    const newYear = newMonth === 'January' ? year + 1 : year;
    updateCalendar(newMonth, newYear);
  };

  const toggleSelectedDate = (day) => {
    if (selectedCalendarDates.includes(day)) {
      setSelectedCalendarDates((prevDates) =>
        prevDates.filter((date) => date !== day),
      );
    } else {
      setSelectedCalendarDates((prevDates) => [...prevDates, day]);
    }
    console.log('Selected Dates: ', selectedCalendarDates);
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full shadow-lg rounded-lg">
        <div className="md:p-8 p-5 dark:bg-blue-500 bg-white rounded-lg">
          <div className="pl-4 flex items-center justify-between">
            <span
              tabIndex="0"
              className="focus:outline-none text-base font-bold dark:text-gray-100 text-white"
            >
              {month} {year}
            </span>
            <div className="flex items-center">
              <button
                aria-label="calendar backward"
                onClick={decrementMonth}
                className="hover:text-gray-400 text-white dark:text-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-chevron-left"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="15 6 9 12 15 18" />
                </svg>
              </button>
              <button
                aria-label="calendar forward"
                onClick={incrementMonth}
                className="hover:text-gray-400 ml-3 text-white dark:text-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler  icon-tabler-chevron-right"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <polyline points="9 6 15 12 9 18" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between pt-12 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {fixedDOW.map((day) => (
                    <th key={day}>
                      <div className="w-full flex justify-center">
                        <p className="text-base font-medium text-center text-white dark:text-gray-100">
                          {day}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array(6)
                  .fill()
                  .map((_, weekIndex) => (
                    <tr key={weekIndex}>
                      {Array(7)
                        .fill()
                        .map((_, dayIndex) => {
                          const dayNumber = daysArray[weekIndex * 7 + dayIndex];
                          const isToday =
                            dayNumber === todayDate &&
                            month === currentMonth &&
                            year === currentYear;
                          const isSelected =
                            selectedCalendarDates.includes(dayNumber);
                          const dayClass = isSelected
                            ? 'text-white bg-blue-700 rounded-lg'
                            : 'text-gray-500 dark:text-gray-100';
                          const todayClass = isToday
                            ? 'underline font-bold'
                            : '';

                          return (
                            <td
                              key={dayIndex}
                              onClick={() =>
                                dayNumber && toggleSelectedDate(dayNumber)
                              }
                            >
                              <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                {dayNumber ? (
                                  <p
                                    className={`text-base font-medium flex items-center justify-center w-8 h-8 ${dayClass} ${todayClass}`}
                                  >
                                    {dayNumber}
                                  </p>
                                ) : (
                                  <p className="text-base font-medium flex items-center justify-center w-8 h-8"></p>
                                )}
                              </div>
                            </td>
                          );
                        })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <button
            className="mt-4 bg-blue-100 hover:bg-blue-700 hover:text-white transition-colors duration-300 text-blue-500 px-4 py-2 rounded"
            onClick={() => setSelectedCalendarDates([])}
          >
            Clear All Dates
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cal;
