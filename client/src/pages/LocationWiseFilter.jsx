// import React from "react";
// import HotelCard from "../components/HotelCard";

// const hotels = [
//   {
//     id: 1,
//     name: "SVH Hotels Manali",
//     location: "Manali",
//     price: 4500,
//     originalPrice: 5300,
//     rating: 69,
//   },
//   {
//     id: 2,
//     name: "NIT Himachal",
//     location: "Chamba",
//     price: 3600,
//     originalPrice: 4700,
//     rating: 171,
//   },
//   {
//     id: 3,
//     name: "SRP Motels, Manali",
//     location: "Manali",
//     price: 9800,
//     originalPrice: 11000,
//     rating: 569,
//   },
//   {
//     id: 4,
//     name: "Kullu Katers",
//     location: "Kullu",
//     price: 3599,
//     originalPrice: 5300,
//     rating: 175,
//   },
//   {
//     id: 5,
//     name: "Simle Te Hotel",
//     location: "Shimla",
//     price: 4500,
//     originalPrice: 5300,
//     rating: 102,
//   },
//   {
//     id: 6,
//     name: "HPS hotel ,Manali",
//     location: "Manali",
//     price: 3700,
//     originalPrice: 4100,
//     rating: 78,
//   },
// ];

// const HotelOffer = () => {
//   return (
//     <div className="w-[70vw]">
//       {/* parent */}
//       <div className="flex border-2 border-gray rounded-full">
//         <div className=" w-full text-sm h-10 rounded-l-lg ml-2 p-2">
//           Checkout some best hotels
//         </div>
//         <div className="flex justify-between items-center mr-5">
//           <select className="border rounded-full px-1 border-gray-500">
//             <option>Manali</option>
//             <option>Kullu</option>
//             <option>Bir Billing</option>
//             <option>Dharmshala</option>
//             <option>Shimla</option>
//             <option>Chamba</option>
//             <option>Maclodganj</option>
//             <option>Kinnaur</option>
//             {/* Other locations can be added here */}
//           </select>
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-6 mt-2">
//         {hotels.map((hotel, id) => (
//           <HotelCard />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HotelOffer;
import React, { useState } from "react";
import HotelCard from "../components/HotelCard";
import hotels from '../hotels.json';

const HotelOffer = () => {
  const [selectedLocation, setSelectedLocation] = useState("");

  const filteredHotels =
    selectedLocation === ""
      ? hotels
      : hotels.filter((hotel) => hotel.location === selectedLocation);

  return (
    <div className="w-[75vw] max-h-[87vh] overflow-hidden mx-auto rounded-3xl hover:border-red-500 border-2">
      {/* Filter Section */}
      <div className="flex border-2 border-gray rounded-full mb-4 py-4">
        <div className="pb-1.5 font-spartan w-full text-2xl font-semibold h-10 rounded-l-lg ml-2 p-1 pl-4">
          Checkout some best hotels
        </div>

        <div className="flex justify-between items-center mr-5">
          <select
            className="hover:border-green-400 hover:cursor-pointer border-2 rounded-full px-3 py-1 bg-blue-600 text-white border-gray-500"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            <option>Manali</option>
            <option>Kullu</option>
            <option>Bir Billing</option>
            <option>Dharmshala</option>
            <option>Shimla</option>
            <option>Chamba</option>
            <option>Maclodganj</option>
            <option>Kinnaur</option>
          </select>
        </div>
      </div>

      {/* Scrollable Cards */}
      <div className="h-[86.5vh] overflow-y-auto space-y-4 pr-2 grid grid-cols-3  scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))
        ) : (
          <p>No hotels found in selected location.</p>
        )}
      </div>
    </div>
  );
};

export default HotelOffer;
