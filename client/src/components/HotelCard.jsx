import React from 'react';
import { useNavigate } from 'react-router-dom';
import defaultHotelImage from '../assets/hotel.png'; // Import the default image

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  // Function to parse price string to a number
  const parsePrice = (priceString) => {
    if (!priceString) return 0; // Handle null or undefined priceString
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 w-full max-w-sm mx-auto">
      <img src={defaultHotelImage} alt={hotel.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">{hotel.name}</h3>
        <p className="text-gray-600 text-xs mb-1">{hotel.address}</p>
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-2">
            <span className="text-yellow-400 text-xl">{hotel.stars}</span>
            <span className="text-gray-600 ml-1 text-xs">({hotel.reviews} reviews)</span>
          </div>
          <div className="text-gray-800 text-lg font-semibold">₹{displayPrice} / night</div>
        </div>
        <p className="text-gray-700 text-xs mb-3">
          {hotel.roomInfo}
        </p>
        <button
          className="bg-blue-600 text-white font-semibold py-2 px-3 rounded-full w-full text-sm hover:bg-blue-700 transition duration-300"
          onClick={() => navigate('/hotel-detail', { state: { hotel } })}
        >
          View Deal
        </button>
      </div>
    </div>
  );
};

export default HotelCard;