// HotelCard.js
import React from "react";

const SearchHotelCards = ({ hotel }) => {
  return (
    <div className="rounded-lg shadow-lg bg-white flex flex-col md:flex-row overflow-hidden w-80 m-4">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold">{hotel.name}</h3>
          <p className="text-sm text-gray-600">{hotel.address}</p>
          <p className="text-sm text-yellow-500">
            {hotel.stars} ⭐ ({hotel.reviews})
          </p>
          <p className="text-xs">{hotel.roomInfo}</p>
        </div>
        <div>
          <p className="line-through text-red-500">{hotel.originalPrice}</p>
          <p className="text-xl font-bold text-green-500">
            {hotel.discountedPrice} <span className="text-sm">20% Off</span>
          </p>
          <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">
            Book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHotelCards;
