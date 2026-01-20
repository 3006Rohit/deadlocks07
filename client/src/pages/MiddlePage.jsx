import React from "react";
import logo1 from "../assets/temple.png";
import logo2 from "../assets/treking.png";
import logo3 from "../assets/snow.png";
import logo4 from "../assets/rafting.png";
import logo5 from "../assets/paragliding.png";
import { useNavigate } from "react-router-dom";

export default function MiddlePage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col p-4 sm:p-8 lg:p-12">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-3/5 p-2 sm:p-4">
          <div className="font-spartan font-bold bg-[#023471] w-full sm:w-2/3 md:w-1/2 lg:w-1/3 text-center p-2 text-white rounded-full hover:cursor-pointer hover:bg-blue-700 mb-4 text-sm sm:text-base">
            Why choose himachal tourism?
          </div>
          <h1 className="font-helveticaCompressed text-3xl sm:text-4xl lg:text-5xl text-[#9A9A9A]">
            Your search for perfect
          </h1>
          <h1 className="leading-none font-helveticaCompressed text-4xl sm:text-5xl lg:text-6xl mb-6 text-[#9A9A9A]">
            <span className="text-[#023471]">Himachali Itinerary</span> ends here
          </h1>
          <div className="w-full mt-5 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={logo5}
                  alt="paragliding"
                  className="w-full sm:w-1/2 h-48 object-cover rounded-3xl transition-transform duration-500 hover:scale-110"
                />
                <img
                  src={logo4}
                  alt="rafting"
                  className="w-full sm:w-1/2 h-48 rounded-3xl object-cover transition-transform duration-500 hover:scale-110"
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src={logo2}
                alt="mountain view"
                className="w-full sm:w-1/3 h-40 object-cover rounded-3xl transition-transform duration-500 hover:scale-110"
              />
              <img
                src={logo1}
                alt="temple"
                className="w-full sm:w-1/3 h-40 object-cover rounded-3xl transition-transform duration-500 hover:scale-110"
              />
              <img
                src={logo3}
                alt="snowboarding"
                className="w-full sm:w-1/3 h-40 object-cover rounded-3xl transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5 p-2 sm:p-4 mt-8 md:mt-0">
          <div className="flex flex-col items-center md:items-end justify-center rounded-xl text-center md:text-right">
            <button className="font-spartan text-base bg-[#023471] text-white rounded-full p-2 px-4 mb-4">
              Don't know much about himachal?
            </button>
            <p className="text-gray-600 text-sm sm:text-base">
              <span className="font-helveticaCompressed text-[#a9a9a9] text-base sm:text-lg">
                you sure wonder about
              </span>
              <br />
              <span className="text-[#505050] font-helveticaCompressed font-medium text-base sm:text-lg">
                where to stay <span className="text-[#ff0000]">?</span>
              </span>
              <br />
              <span className="text-[#505050] font-helveticaCompressed font-medium text-base sm:text-lg">
                which way to take <span className="text-[#ff0000]">?</span>
              </span>
              <br />
              <span className="font-helveticaCompressed text-[#505050] font-medium text-base sm:text-lg">
                which exquisite places to visit <span className="text-[#ff0000]">?</span>
              </span>
              <br />
              <span className="font-helveticaCompressed text-[#505050] font-medium text-base sm:text-lg">
                Where to have local himachali food <span className="text-[#ff0000]">?</span>
              </span>
            </p>
            <div className="leading-none mb-3 font-helveticaCompressed mt-6 text-3xl sm:text-4xl text-[#FFA900]">
              We have got you covered
            </div>
            <div className="font-helveticaCompressed text-4xl sm:text-5xl leading-none text-[#FF0000]">
              Curated itinerary
            </div>
            <div className="font-helveticaCompressed mt-2 text-3xl sm:text-4xl leading-none text-[#9a9a9a]">
              for you
            </div>

            <div
              className="flex justify-center items-center mt-6"
              onClick={() => navigate("/plan-your-trip")}
            >
              <button className="font-spartan flex items-center justify-center bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition hover:bg-blue-600 text-base sm:text-lg">
                <span>Plan your trip</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 7l5 5-5 5M3 12h18"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}