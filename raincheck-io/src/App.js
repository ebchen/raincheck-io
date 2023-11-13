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
      
      <header className="App-header">
          <ScheduleComponent />
      </header>
        {/* <Sidebar />
        <NavBar />
        <Form /> 
        <Cal />*/}
        
    </div>
  );
}

export default App;
