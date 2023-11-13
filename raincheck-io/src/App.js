import './App.css';
import NavBar from './Navbar';
import ScheduleComponent from './ScheduleComponent';
import Sidebar from './Sidebar';
import Form from './Form';
import React from 'react';

function App() {
  return (
    <div className="App">
      <Form />
      <header className="App-header">
          <ScheduleComponent />
      </header>
        {/* <Sidebar />
        <NavBar /> */}
        
    </div>
  );
}

export default App;
