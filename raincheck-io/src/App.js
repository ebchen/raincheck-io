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
      {/* <header className="App-header">
        <ScheduleComponent />
      </header>

      <Sidebar /> */}
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-row justify-around items-center w-full max-w-4xl mx-auto p-4">
          <Form />
          <Cal />
        </div>
      </div>
    </div>
  );
}

export default App;
