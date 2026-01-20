import React from "react";

export default function HotelResults({ hotels }) {
  return (
    <div className="max-h-96 overflow-y-auto border border-gray-300 rounded-lg shadow p-4 bg-white">
      {hotels.map((hotel, index) => (
        <div key={index} className="mb-4 border-b pb-2">
          <h1 className="text-lg font-bold">{hotel.hotel_name}</h1>
          <h1 className="text-gray-600">{hotel.location}</h1>
        </div>
      ))}

      {hotels.length === 0 && (
        <p className="text-gray-500 text-center">
          No hotels found in this location.
        </p>
      )}
    </div>
  );
}
