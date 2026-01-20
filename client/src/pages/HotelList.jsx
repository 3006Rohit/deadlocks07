import React from "react";
import { useParams } from "react-router-dom";
import hotels from "../hotels.json";
import HotelResults from "./HotelResults";

export default function HotelList() {
  const { location } = useParams();

  const filteredHotels = hotels.filter(
    (hotel) => hotel.location.toLowerCase() === location.toLowerCase()
  );

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Hotels in {location}</h1>
      <HotelResults hotels={filteredHotels} />
    </div>
  );
}
