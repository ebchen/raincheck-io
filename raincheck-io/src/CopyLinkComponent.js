import React, { useState } from 'react';
import { LuCopy } from 'react-icons/lu';
import { FaCheck } from 'react-icons/fa';

const CopyLinkComponent = ({ eventName }) => {
  const [link, setLink] = useState('raincheck.io/cis-512-meeting'); // i hard-coded link for now
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000); // 3 seconds reset
  };

  return (
    <div className="w-300 bg-white border border-1 border-black rounded-md p-2 mb-4 flex items-center justify-between">
      <div className="flex-1">
        {isCopied ? (
          <p className="text-black font-bold">Copied link to clipboard!</p>
        ) : (
          <p className="text-blue-500 underline font-bold">{link}</p>
        )}
      </div>
      <div className="flex items-center ml-4"> 
        <button
          type="button"
          onClick={handleCopyLink}
          className="text-black focus:outline-none"
        >
          {isCopied ? <FaCheck size={20} /> : <LuCopy size={20} />}
        </button>
      </div>
    </div>
  );
};

export default CopyLinkComponent;
