import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const ProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <FaUserCircle className="h-8 w-8" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg py-1">
          <a
            href="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Profile
          </a>
          <a
            href="/settings"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Settings
          </a>
          <a
            href="/logout"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
