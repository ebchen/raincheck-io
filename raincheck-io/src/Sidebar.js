import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsUmbrella } from 'react-icons/bs';


const CreateNewButton = ({ onClick, children }) => {
    return (
      <button className="w-72 h-12 bg-white text-blue-500 rounded-md font-bold text-lg hover:bg-gray-300 flex items-center justify-center" onClick={onClick}>
        {children} <AiOutlinePlusCircle className="ml-2" style={{ fontSize: '1.5em' }} />
      </button>
    );
  };

const AccountsButton = ({ onClick, children }) => {
  return (
    <button className="w-72 h-12 bg-blue-500 text-white rounded-md font-bold text-lg hover:bg-blue-700 text-left pl-2" onClick={onClick}>
      {children}
    </button>
  );
};

const EventsButton = ({ onClick, children }) => {
  return (
    <button className="w-72 h-12 bg-blue-500 text-white rounded-md font-bold text-lg underline hover:bg-blue-700 text-left pl-2" onClick={onClick}>
      {children}
    </button>
  );
};

const Sidebar = () => {
  const handleCreateNew = () => {
    console.log('Button clicked!');
  };

  const handleAccount = () => {
    console.log('Account button clicked!');
  };

  const handleSettings = () => {
    console.log('Settings button clicked!');
  };

  return (
    <div className="flex">
      <div className="w-80 h-screen bg-blue-500 fixed top-0 left-0 p-4">
        <div className="flex items-left justify-center">
            <BsUmbrella className="text-white text-4xl mr-2" />
            <div className="text-white font-bold text-4xl mb-4 text-center">Raincheck</div>
        </div>
        <CreateNewButton onClick={handleCreateNew}>Create new </CreateNewButton>
        <p className="text-white font-bold text-sm mt-4 mb-0 text-left">ACCOUNTS</p>
        <div>
          <AccountsButton onClick={handleSettings}>Settings</AccountsButton>
          <AccountsButton onClick={handleAccount}>My Account</AccountsButton>
        </div>
        <p className="text-white font-bold text-sm mt-4 mb-0 text-left">EVENTS</p>
        <div>
          <EventsButton onClick={handleSettings}>/cis-512-meeting</EventsButton>
        </div>
      </div>
      <div className="flex-1 p-4"> {/* Adjust the styling of your content area */}
        {/* Your content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;
