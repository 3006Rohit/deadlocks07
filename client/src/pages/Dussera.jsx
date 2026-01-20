import React from 'react';
import kulludesh from '../assets/kulludesh.jpg';

export default function Dussera() {
  return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={kulludesh}
            className="w-full h-96 object-cover object-center"
            alt="Dussehra in Kullu"
          />
          <div className="p-6 md:p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
              Dussehra in Kullu
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed text-justify">
              Kullu Dussehra is a unique week-long festival celebrated in the
              Kullu Valley of Himachal Pradesh, starting on Vijayadashami.
              Unlike the rest of India, effigies of Ravana are not burned here;
              instead, the festival centers around the worship of Lord
              Raghunath. Over 200 local deities arrive in vibrant processions at
              Dhalpur Maidan, creating a divine congregation. The festival is a
              spectacle of vibrant colors, traditional music, and dance, attracting
              thousands of devotees and tourists alike. It's a time when the entire
              valley comes alive with spiritual fervor and cultural richness.
            </p>
          </div>
        </div>
      </div>
  );
}