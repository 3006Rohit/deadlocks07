import React, { useState } from "react";
import kulludesh from "../assets/kulludesh.jpg";
import snowfall from "../assets/snowfall.jpg";
import forest from "../assets/forest.jpg";
import bluehills from "../assets/bluehills.png";
import { useNavigate } from "react-router-dom";

const Conclusion = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value); 
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmitSubscribe = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Name cannot be empty.");
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address (e.g., example@gmail.com).");
      return;
    }

    alert("On connection of backend we will subscribe you");
    setEmail("");
    setName("");
    e.target.reset();
  };

  return (
    <div className="bg-gray-100 py-10 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-10 lg:mb-12">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <img src={kulludesh} alt="Dussehra in Kullu" className="w-full h-48 sm:h-56 md:h-64 object-cover" />
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Dussehra in Kullu</h3>
              <p className="text-gray-700 text-sm sm:text-base mb-4">Kullu Dussehra is a unique week-long festival celebrated in the Kullu Valley.</p>
              <button 
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full w-full text-sm sm:text-base hover:bg-blue-700 transition duration-300"
                onClick={() => navigate("/dussera")}
              >
                Explore Now
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <img src={snowfall} alt="Prashar Lake in Mandi" className="w-full h-48 sm:h-56 md:h-64 object-cover" />
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Prashar Lake in Mandi</h3>
              <p className="text-gray-700 text-sm sm:text-base mb-4">Prashar Lake is a beautiful lake known for its stunning views and unique surroundings.</p>
              <button 
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full w-full text-sm sm:text-base hover:bg-blue-700 transition duration-300"
                onClick={() => navigate("/prasharlake")}
              >
                Explore Now
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <img src={forest} alt="Jibhi in Kullu" className="w-full h-48 sm:h-56 md:h-64 object-cover" />
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Jibhi in Kullu</h3>
              <p className="text-gray-700 text-sm sm:text-base mb-4">Jibhi is a captivating destination known for its serene environment and scenic beauty.</p>
              <button 
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full w-full text-sm sm:text-base hover:bg-blue-700 transition duration-300"
                onClick={() => navigate("/kullu")}
              >
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup Form */}
      <div
        className="relative flex flex-col md:flex-row items-center justify-around object-cover bg-no-repeat bg-center bg-cover py-10 mt-16"
        style={{ backgroundImage: `url(${bluehills})` }}
      >
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 flex flex-col items-center gap-2 mt-5 w-full md:w-1/3 lg:w-1/4 shadow-xl">
          <p className="text-xl sm:text-2xl font-semibold mb-4 text-center text-white">
            Signup for Himachal tourism Monthly newsletter
          </p>
          <form className="text-lg w-full" onSubmit={handleSubmitSubscribe}>
            <div className="mb-4">
              <label
                className="block mb-2 text-white text-sm sm:text-base"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="bg-white bg-opacity-30 border-b-2 border-gray-300 rounded-full text-white p-2 focus:outline-none w-full text-sm sm:text-base placeholder-gray-200"
                type="text"
                id="name"
                value={name}
                placeholder="Enter your Name"
                onChange={handleNameChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-white text-sm sm:text-base"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="bg-white bg-opacity-30 border-b-2 border-gray-300 rounded-full text-white p-2 focus:outline-none w-full text-sm sm:text-base placeholder-gray-200"
                type="email"
                id="email"
                placeholder="Enter your Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white w-full rounded-full p-2 text-sm sm:text-base hover:bg-blue-700 transition duration-300 shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="text-white text-base sm:text-lg flex flex-col md:flex-row justify-evenly p-6 w-full md:w-2/3 lg:w-1/2">
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Quick links</h3>
            <ul className="list-none space-y-2 text-center md:text-left">
              <li className="hover:cursor-pointer hover:text-gray-300 transition duration-300">Home</li>
              <li className="hover:cursor-pointer hover:text-gray-300 transition duration-300">Destinations</li>
              <li className="hover:cursor-pointer hover:text-gray-300 transition duration-300">Activities</li>
              <li className="hover:cursor-pointer hover:text-gray-300 transition duration-300">How to reach</li>
              <li className="hover:cursor-pointer hover:text-gray-300 transition duration-300">Tours and packages</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <h3 className="text-lg sm:text-xl font-bold mb-4">About us</h3>
            <ul className="list-none space-y-2 text-center md:text-left">
              <li className="hover:cursor-pointer hover:text-gray-300 transition duration-300">About Himachal Tourism</li>
              <li className="hover:cursor-pointer hover:text-gray-300 transition duration-300">What we do</li>
              <li className="hover:cursor-pointer hover:text-gray-300 transition duration-300">Our story</li>
              <li className="hover:cursor-pointer hover:text-gray-300 transition duration-300">Why choose us</li>
              <li className="hover:cursor-pointer hover:text-gray-300 transition duration-300">Contact us</li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Customer support</h3>
            <ul className="list-none space-y-2 text-center md:text-left">
              <li className="hover:cursor-pointer hover:text-gray-300 transition duration-300">Travel Insurance</li>
              <li className="hover:cursor-pointer hover:text-gray-300 transition duration-300">FAQs</li>
              <li className="hover:cursor-pointer hover:text-gray-300 transition duration-300">Cancellation policy</li>
              <li className="hover:cursor-pointer hover:text-gray-300 transition duration-300">Testimonials</li>
              <li className="hover:cursor-pointer hover:text-gray-300 transition duration-300">Call support</li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm sm:text-base">&copy; 2023 Himachal Tourism. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Conclusion;