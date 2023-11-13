import { useState } from "react"

const Cal = () => {
  const months = {
    "January": 31,
    "February": 28,
    "March": 31,
    "April": 30,
    "May": 31,
    "June": 30,
    "July": 31,
    "August": 31,
    "September": 30,
    "October": 31,
    "November": 30,
    "December": 31,
  }

  const monthsOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const [month, setMonth] = useState("January")
  const [dates, setDates] = useState(31)
  const [selectedDates, setSelectedDates] = useState([])

  const decrementMonth = () => {
    const newMonth = monthsOrder[(monthsOrder.length + monthsOrder.indexOf(month) - 1) % monthsOrder.length];
    setMonth(newMonth)
    setDates(months[newMonth])
  }
  
  const incrementMonth = () => {
    const newMonth = monthsOrder[(monthsOrder.indexOf(month) + 1) % monthsOrder.length]
    setMonth(newMonth)
    setDates(months[newMonth])
  }

  const daysArray = Array.from({ length: dates }, (_, i) => i + 1);

  const toggleSelectedDate = (day) => {
    if (selectedDates.includes(day)) {
        setSelectedDates(prevDates => prevDates.filter(date => date !== day));
    } else {
        setSelectedDates(prevDates => [...prevDates, day]);
    }
  }
  
  return (
          <div class="min-h-screen flex items-center justify-center py-8 px-4">
            <div class="max-w-md w-full shadow-lg rounded-lg">
                <div class="md:p-8 p-5 dark:bg-blue-500 bg-white rounded-lg">
                    <div class="pl-4 flex items-center justify-between">
                        <span  tabindex="0" class="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800">{month} 2023</span>
                        <div class="flex items-center">
                            <button aria-label="calendar backward" onClick={() => decrementMonth()} class="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <polyline points="15 6 9 12 15 18" />
                            </svg>
                        </button>
                        <button aria-label="calendar forward" onClick={() => incrementMonth()} class="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"> 
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler  icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <polyline points="9 6 15 12 9 18" />
                            </svg>
                        </button>

                        </div>
                    </div>
                    <div class="flex items-center justify-between pt-12 overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr>
                                    <th>
                                        <div class="w-full flex justify-center">
                                            <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Mo</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="w-full flex justify-center">
                                            <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Tu</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="w-full flex justify-center">
                                            <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">We</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="w-full flex justify-center">
                                            <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Th</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="w-full flex justify-center">
                                            <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Fr</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="w-full flex justify-center">
                                            <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Sa</p>
                                        </div>
                                    </th>
                                    <th>
                                        <div class="w-full flex justify-center">
                                            <p class="text-base font-medium text-center text-gray-800 dark:text-gray-100">Su</p>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                                // Chunk the days into groups of 7 for each week
                                Array(Math.ceil(daysArray.length / 7)).fill().map((_, weekIndex) => (
                                  <tr key={weekIndex}>
                                    {
                                      Array(7).fill().map((_, dayIndex) => {
                                        const baseClass = "text-base font-medium flex items-center justify-center w-8 h-8";
                                        const dayNumber = weekIndex * 7 + dayIndex + 1;
                                        const isSelected = selectedDates.includes(dayNumber);
                                        if (dayNumber <= dates) {
                                          return (
                                            <td key={dayIndex} onClick={() => toggleSelectedDate(dayNumber)}>
                                                <div className="px-2 py-2 cursor-pointer flex w-full justify-center">
                                                {isSelected ? (
                                                      <a role="link" tabIndex="0" className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:bg-blue-500 hover:bg-blue-500 text-white bg-blue-700 rounded-lg ${baseClass}`}>{dayNumber}</a>
                                                  ) : (
                                                      <p className={`text-gray-500 dark:text-gray-100 ${baseClass}`}>{dayNumber}</p>
                                                  )}
                                                </div>
                                            </td>
                                          );
                                        } else {
                                          // Empty cell if no day exists
                                          return (
                                            <td key={dayIndex}>
                                              <div className="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
                                            </td>
                                          );
                                        }
                                      })
                                    }
                                  </tr>
                                ))
                              }
                            </tbody>
                        </table>
                        
                    </div>
                    <button 
                className="mt-4 bg-white hover:bg-blue-700 transition-colors duration-300 text-blue-500 px-4 py-2 rounded" 
                onClick={() => setSelectedDates([])}>
                Clear All Dates
            </button>
                </div>
            </div>
        </div>
  )
}

export default Cal;