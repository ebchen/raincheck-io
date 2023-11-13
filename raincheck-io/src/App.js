import './App.css';
import NavBar from './Navbar';
import ScheduleComponent from './ScheduleComponent';
import Sidebar from './Sidebar';
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <ScheduleComponent />
        
      </header>
        {/* <Sidebar /> */}
        {/* <NavBar /> */}
    </div>
  );
}

export default App;
