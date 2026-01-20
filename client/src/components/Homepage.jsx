import React from "react";
import bgImage from "../assets/monk.jpg";
import HotelSearch from "./HotelSearchCard";
import Navbar from "./Navbar";

const Homepage = () => {
  return (
    <div
      className="h-screen bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Navbar />
      <div className="flex flex-col items-center text-white text-center pt-5 px-4 sm:px-8 md:px-16">
        <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-5xl font-bold leading-tight mb-4">
          Discover the Untouched Charm of Himachal
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
          where every valley whispers stories, and every sunrise invites a new adventure.
        </p>
      </div>
      <div className="flex justify-center mt-8 px-4 sm:px-8 md:px-16">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <HotelSearch />
        </div>
      </div>
    </div>
  );
};

export default Homepage;