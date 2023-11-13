import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { BsUmbrella } from 'react-icons/bs';


const CreateNewButton = ({ onClick, children }) => {
    return (
      <button className="w-60 h-12 bg-white text-blue-500 rounded-md font-bold text-lg hover:bg-gray-300 flex items-center justify-center ml-auto" onClick={onClick}>
        {children} <AiOutlinePlusCircle className="ml-2" style={{ fontSize: '1.5em' }} />
      </button>
    );
  };

const AboutButton = ({ onClick, children }) => {
    return (
      <button className="text-white font-bold hover:underline ml-auto mr-20" onClick={onClick}>
        {children}
      </button>
    );
};


const NavBar = () => {
  const handleCreateNew = () => {
    console.log('Button clicked!');
  };

  const handleAbout = () => {
    console.log('About button clicked!');
  };

  return (
    <div className="flex">
      <div className="w-screen h-30 bg-blue-500 fixed top-0 left-0 p-4 flex items-center justify-between">
        <div className="flex items-left">
          <BsUmbrella className="text-white text-4xl mt-4 mr-2" />
          <div className="text-white font-bold text-4xl mt-4 mb-4 text-center">Raincheck</div>
        </div>
        <div className="flex">
          <AboutButton onClick={handleAbout}>About</AboutButton>
          <CreateNewButton onClick={handleCreateNew}>Create new</CreateNewButton>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
