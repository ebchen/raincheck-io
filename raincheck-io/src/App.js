import './App.css';
import NavBar from './Navbar';
import ScheduleComponent from './ScheduleComponent';
import Sidebar from './Sidebar';
import Form from './Form';
import React from 'react';
import Cal from './Calendar';

function App() {
  return (
    <div className="App">
      <Cal />
      <header className="App-header">
          <ScheduleComponent />
      </header>
        {/* <Sidebar />
        <NavBar />
        <Form /> */}
        
    </div>
  );
}

export default App;
