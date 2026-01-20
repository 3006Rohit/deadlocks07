import React from 'react';
import { useLocation } from 'react-router-dom';
import defaultHotelImage from '../assets/hotel.png'; // Import the default image

const HotelDetailPage = () => {
  const location = useLocation();
  const { hotel } = location.state || {};

  if (!hotel) {
    return <div className="text-center py-10">Hotel details not found.</div>;
  }

  // Function to parse price string to a number
  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    const digitsOnly = priceString.replace(/[^0-9]/g, ''); // Keep only digits
    return parseInt(digitsOnly) || 0; // Parse to int, default to 0 if parsing fails
  };

  let displayPrice = 0;
  if (hotel.discountedPrice) {
    displayPrice = parsePrice(hotel.discountedPrice);
  } else if (hotel.originalPrice) {
    displayPrice = parsePrice(hotel.originalPrice);
  } else {
    displayPrice = 1000; // Hardcoded default if no price is found
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
          <div className="md:w-1/2">
            <img
              src={defaultHotelImage}
              alt={hotel.name}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{hotel.name}</h1>
            <p className="text-gray-600 text-sm mb-2">{hotel.address}</p>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <span className="text-yellow-400 text-2xl">{hotel.stars}</span>
                <span className="text-gray-600 ml-2">({hotel.reviews} reviews)</span>
              </div>
              <span className="text-gray-800 text-2xl font-semibold">₹{displayPrice} / night</span>
            </div>
            <p className="text-gray-700 mb-6">
              {hotel.roomInfo}
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">Facilities:</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              {/* Assuming facilities are not directly in hotels.json, adding placeholders */}
              <li>Wi-Fi</li>
              <li>Geyser</li>
              <li>Swimming Pool</li>
              <li>Spa</li>
              <li>Restaurant</li>
            </ul>

            <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage;