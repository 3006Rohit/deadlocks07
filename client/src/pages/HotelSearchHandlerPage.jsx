import React from "react";
import Navbar from "../components/Navbar";

export default function HotelSearchHandlerPage() {
  return (
    <div>
      <Navbar />
      <div className="flex gap-5 justify-center mt-5">
        <div className="flex w-[50vw]">
          <input
            type="text"
            placeholder="   Search destination hotel"
            className="flex rounded-l-full w-[20vw] focus:outline-none"
          />
          <div className="bg-[#023471] items-center w-[16vw] text-center text-white p-2">
            7 Apr, Mon - 9 Apr, Wed
          </div>
          <div className="w-px h-100%"></div>
          <div className="bg-[#023471] rounded-r-full w-[14vw] text-center text-white p-2">
            4 Guests - 2 Rooms
          </div>
        </div>
        <button className="shadow-lg border-2 border-gray-300 rounded-full w-[10vw]">
          Modify Search
        </button>
      </div>
    </div>
  );
}
