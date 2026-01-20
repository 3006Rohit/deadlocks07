import React from "react";
import Navbar from "../components/Navbar";
import SearchHotelCards from "../components/SearchHotelCards";
import HotelsData from "../hotelsData.json";
import { useState } from "react";

export default function SearchFilterPage() {
  const [priceRange, setPriceRange] = useState([0, 4000]);
  return (
    <div className="container">
      <Navbar />
      <div className="realvtive flex flex-col w-screen h-screen">
        {/* absolute */}
        <div className=""></div>
        {/* Searchbar */}
        <div className="flex">
          <div className="w-[30vw]">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-sm">
              {/* Famous Places Nearby */}
              <div className="mb-4">
                <h2 className="font-semibold text-lg">Famous places nearby</h2>
                <div className="flex flex-wrap space-x-2">
                  {[
                    "The Mall road Manali",
                    "Kullu",
                    "Old Manali",
                    "Sissu",
                    "Lahaul",
                    "Bijli Mahadev",
                  ].map((location) => (
                    <button
                      key={location}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      {location}
                    </button>
                  ))}
                </div>
                <button className="text-blue-500 mt-2">+ view all</button>
              </div>

              {/* Price Range per Night */}
              <div className="mb-4">
                <h2 className="font-semibold text-lg">Price range per night</h2>
                <div className="flex flex-col space-y-2">
                  {[
                    "Rs 0 - Rs 1000",
                    "Rs 1000 - Rs 2000",
                    "Rs 2000 - Rs 3000",
                    "Rs 3000 - Rs 4000",
                    "Rs 4000 - Rs 5000",
                  ].map((range) => (
                    <label key={range} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2">{range}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-4 flex items-center">
                  <span>or</span>
                  <input
                    type="range"
                    min="0"
                    max="4000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, e.target.value])}
                    className="mx-2 flex-grow"
                  />
                  <span>
                    Rs {priceRange[0]} - Rs {priceRange[1]}
                  </span>
                </div>
              </div>

              {/* Type */}
              <div className="mb-4">
                <h2 className="font-semibold text-lg">Type</h2>
                <div className="flex flex-col space-y-2">
                  {[
                    "Government Cottages",
                    "Government Hotels",
                    "Private hotels",
                    "Private cottages",
                    "River view",
                    "Balcony",
                    "Hostel",
                    "Family friendly",
                  ].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h2 className="font-semibold text-lg">Rating</h2>
                <div className="flex flex-col space-y-2">
                  {[
                    "5 star only",
                    "4 star and above",
                    "3 star and above",
                    "2 star and above",
                    "1 star and above",
                  ].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2">{rating}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[70vw] flex flex-col ">
            <div className="w-80%"></div>
            <div className="flex justify-between">
              <div className="p-4">
                {/* Search bar */}
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Search for hotel names"
                    className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:ring focus:ring-blue-500"
                  />
                  <button className="ml-2 bg-blue-600 text-white rounded-lg py-2 px-4">
                    Search
                  </button>
                </div>

                {/* Properties found notice */}
                <div className="mb-2">
                  <span className="text-2xl font-bold">210</span> properties
                  found in{" "}
                  <span className="italic">The Mall road Manali - Manali</span>
                </div>

                {/* Sort options */}
                <div className="flex items-center">
                  <span className="mr-2">Sort by:</span>
                  <div className="relative">
                    <select className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring focus:ring-blue-500">
                      <option value="relevance">Relevance</option>
                      <option value="price">Price</option>
                      <option value="rating">Rating</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="scrollable-divs">
              <div className="overflow-x-auto w-full">
                <div className="flex">
                  {HotelsData.map((hotel) => (
                    <SearchHotelCards key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
