import React from 'react';
import forest from '../assets/forest.jpg';

export default function Kullu() {
  return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={forest}
            className="w-full h-96 object-cover object-center"
            alt="Jibhi in Kullu"
          />
          <div className="p-6 md:p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
              Jibhi in Kullu
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              Jibhi is a captivating destination in the Kullu Valley known for
              its serene environment and scenic beauty. It offers a perfect
              getaway for those seeking tranquility amidst nature, with charming
              wooden cottages and lush greenery. The Tirthan Valley, where Jibhi
              is located, is also a gateway to the Great Himalayan National Park,
              a UNESCO World Heritage Site, making it an ideal base for nature
              lovers and trekkers. The tranquil ambiance and picturesque landscapes
              make Jibhi a hidden gem in Himachal Pradesh.
            </p>
          </div>
        </div>
      </div>
  );
}