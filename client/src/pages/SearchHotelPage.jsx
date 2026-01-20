import React, { useState, useEffect, useRef } from "react";
import HotelCard from "../components/HotelCard";
import hotelsData from "../hotels.json";
import { useLocation } from 'react-router-dom';

export default function SearchHotelPage() {
  const location = useLocation();
  const initialSearchTerm = location.state?.searchTerm || '';

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [filteredHotels, setFilteredHotels] = useState(hotelsData);
  const debounceTimeout = useRef(null);

  // Extract unique locations for the filter dropdown
  const uniqueLocations = ["All", ...new Set(hotelsData.map(hotel => hotel.location))];

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      let currentHotels = hotelsData;

      // Filter by search term
      if (searchTerm) {
        currentHotels = currentHotels.filter((hotel) =>
          hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by location
      if (selectedLocation !== "All") {
        currentHotels = currentHotels.filter((hotel) =>
          hotel.location === selectedLocation
        );
      }

      setFilteredHotels(currentHotels);
    }, 80);

    return () => clearTimeout(debounceTimeout.current);
  }, [searchTerm, selectedLocation]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Find Your Perfect Hotel</h1>

        <div className="flex flex-col md:flex-row justify-center items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search hotels by name..."
            className="w-full md:w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full md:w-1/4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">No hotels found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}
