import React from "react";
import { BellIcon } from "@heroicons/react/24/outline";

const DashboardHeader = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow rounded-md">
      <div>
        <h1 className="text-xl font-semibold">Fab Hotel, mall road, manali</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative">
          <BellIcon className="h-6 w-6 text-gray-600 hover:text-gray-900" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400"></span>
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="h-8 w-8 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">Ramesh bisht</p>
            <p className="text-xs text-gray-500">Fab hotel, mall road, manali</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
