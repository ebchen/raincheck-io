import './App.css';
import NavBar from './Navbar';
import ScheduleComponent from './ScheduleComponent';
import Sidebar from './Sidebar';
import Form from './Form';
import React from 'react';
import Cal from './Calendar';
import DOW from './DOW';
import { useState } from 'react';
import AvailabilityComponent from './AvailabilityComponent';
import CopyLinkComponent from './CopyLinkComponent';
import GroupAvailabilityComponent from './GroupAvailabilityComponent';

function App() {
  const [mode, setMode] = useState("specificDates");
  return (
    <div className="App">
      <div className="flex justify-center items-center h-screen bg-slate-100">
        <div className="flex flex-row justify-around items-center w-full max-w-6xl mx-auto p-4">
          <Form setMode={setMode} />
          {mode === "specificDates" ? <Cal /> : <DOW />}
        </div>
      </div>
    </div>
  );
}

export default App;
