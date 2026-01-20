import React from "react";
import logo from "../assets/hotel.png";

const HotelRooms = () => {
  const rooms = [
    {
      name: "Deluxe room",
      roomNo: "1 - 10",
      rating: "⭐⭐⭐⭐",
      guests: "2 Guests",
      bed: "1 King size bed",
      price: "₹ 4,500/night",
      amenities: ["Free WiFi", "Mountains view", "Geyser"],
    },
    {
      name: "King Suite",
      roomNo: "21 - 25",
      rating: "⭐⭐⭐⭐",
      guests: "2 Guests",
      bed: "1 King size bed",
      price: "₹ 9,500/night",
      amenities: [
        "Free WiFi",
        "Free Heater",
        "Mountains view",
        "Geyser",
        "Jacoozi",
      ],
    },
    {
      name: "Primary room",
      roomNo: "11 - 20",
      rating: "⭐⭐⭐⭐",
      guests: "2 Guests",
      bed: "1 King size bed",
      price: "₹ 4,500/night",
      amenities: [
        "Free WiFi",
        "Free Heater",
        "Mountains view",
        "Geyser",
        "Jacoozi",
      ],
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Sidebar */}
      {/* <div className="w-64 bg-blue-500 text-white p-4">
        <h2 className="text-xl font-bold">HIMACHAL TOURISM</h2>
        <ul className="mt-6">
          <li>Home</li>
          <li className="bg-blue-600 p-2">Rooms</li>
          <li>Reservations</li>
          <li>Guests</li>
          <li>Promotions</li>
          <li>Accounting</li>
          <li>Settings</li>
        </ul>
      </div> */}

      {/* Main content */}
      <div className="flex-1 bg-blue-100 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Rooms in your hotel</h1>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Create new booking
          </button>
        </div>

        {/* Room list */}
        <div className="mt-4 space-y-4">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
            >
              <div className="flex items-center">
                <img src={`${logo}`} alt={room.name} className="rounded-lg" />
                <div className="ml-4">
                  <h3 className="font-bold">
                    {room.name} (Room no. {room.roomNo})
                  </h3>
                  <p>{room.rating} (69)</p>
                  <p>{room.guests}</p>
                  <p>{room.bed}</p>
                  <p>{room.price}</p>
                  <ul className="mt-2 space-x-4">
                    {room.amenities.map((amenity, idx) => (
                      <li key={idx} className="inline-flex items-center">
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                View/Edit details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelRooms;
