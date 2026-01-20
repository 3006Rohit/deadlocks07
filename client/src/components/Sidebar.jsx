import React from "react";
import {
  HomeIcon,
  BuildingLibraryIcon,         // Replacement for BedIcon (no BedIcon exists)
  ClipboardDocumentListIcon,    // Replaces ClipboardListIcon
  UserGroupIcon,
  MegaphoneIcon,
  WalletIcon,
  Cog6ToothIcon                 // Replaces CogIcon
} from "@heroicons/react/24/outline";
const Sidebar = () => {
  const menuItems = [
    { name: "Home", icon: <HomeIcon className="h-5 w-5" /> },
    { name: "Rooms", icon: <BuildingLibraryIcon className="h-5 w-5" /> },
    { name: "Reservations", icon: <ClipboardDocumentListIcon className="h-5 w-5" /> },
    { name: "Guests", icon: <UserGroupIcon className="h-5 w-5" /> },
    { name: "Promotions", icon: <MegaphoneIcon className="h-5 w-5" /> },
    { name: "Accounting", icon: <WalletIcon className="h-5 w-5" /> },
    { name: "Settings", icon: <Cog6ToothIcon className="h-5 w-5" /> },
  ];

  return (
    <div className="w-64 bg-white shadow-md h-screen p-6 flex flex-col">
      <div className="mb-10">
        <img
          src="/logo192.png"
          alt="Logo"
          className="h-12 w-auto mb-6"
        />
      </div>
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition"
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
