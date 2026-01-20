import React from 'react';
import snowfall from '../assets/snowfall.jpg';

export default function Prasharlake() {
  return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={snowfall}
            className="w-full h-96 object-cover object-center"
            alt="Prashar Lake in Mandi"
          />
          <div className="p-6 md:p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
              Prashar Lake in Mandi
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              Prashar Lake is a beautiful lake situated in the Mandi district of
              Himachal Pradesh, known for its stunning views and unique
              surroundings. It is a serene spot for nature lovers and
              adventurers alike, offering breathtaking landscapes and a tranquil
              environment. The lake is surrounded by lush green meadows and dense
              forests, making it a perfect destination for trekking and camping.
              A three-storied pagoda-like temple dedicated to the sage Prashar is
              also located on its bank, adding to the spiritual aura of the place.
            </p>
          </div>
        </div>
      </div>
  );
}