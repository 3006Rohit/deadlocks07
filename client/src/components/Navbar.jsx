import React, { useState } from "react";
import logo from "../assets/image1.png";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const mainLinks = [
    "Home",
    "Destinations",
    "Activities",
    "How to reach",
    "Contact us",
    "About us",
  ];

  const authLinks = ["Login", "Signup"];

  return (
    <div className="w-full flex flex-col md:flex-row items-start md:items-center py-2 px-4 sm:py-3 sm:px-6">
      {/* Logo on the left */}
      <div className="h-10 sm:h-12 w-auto md:mr-8">
        <img
          src={logo}
          alt="Logo"
          className="object-contain h-full w-full hover:cursor-pointer"
        />
      </div>

      {/* Center + Auth Buttons */}
      <div className="flex-1 mt-2 md:mt-0">
        {/* Desktop layout */}
        <div className="hidden md:flex justify-center items-center w-full">
          {/* Main nav buttons in glass div */}
          <nav className="bg-white/20 backdrop-blur-md h-auto rounded-full px-4 py-1 sm:px-5 sm:py-1.5 shadow-lg flex items-center gap-2 sm:gap-3">
            {mainLinks.map((item, index) => (
              <button
                key={item}
                onClick={() =>
                  window.scrollBy({
                    top: window.innerHeight * (index + 1),
                    behavior: "smooth",
                  })
                }
                className={`rounded-full px-3 py-1 text-sm sm:text-base transition duration-200 font-spartan ${
                  item === "Home"
                    ? "bg-[#023471] text-white"
                    : "hover:bg-white hover:text-black"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Auth buttons in separate glass div */}
          <nav className="bg-white/20 backdrop-blur-md h-auto rounded-full shadow-lg px-1 py-1 sm:px-1.5 sm:py-1.5 flex items-center ml-2 sm:ml-3">
            {["Login", "Signup"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === "Login") navigate("/login");
                  else navigate("/signup");
                }}
                className={`text-xs sm:text-sm rounded-full px-4 py-1 transition duration-200 font-spartan ${
                  item === "Login"
                    ? "bg-[#023471] text-white"
                    : "hover:bg-white hover:text-black"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden flex justify-end items-center w-full">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile dropdown content */}
        {isOpen && (
          <div className="flex flex-col gap-2 mt-2 md:hidden">
            <div className="bg-white/30 backdrop-blur-md rounded-xl p-2 shadow">
              {mainLinks.map((item, index) => (
                <button
                  key={item}
                  onClick={() => {
                    setIsOpen(false);
                    window.scrollBy({
                      top: window.innerHeight * (index + 1),
                      behavior: "smooth",
                    });
                  }}
                  className={`block w-full text-left rounded-full px-3 py-1 text-sm transition duration-200 ${
                    item === "Home"
                      ? "bg-[#023471] text-white"
                      : "hover:bg-[#023471] hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="bg-white/30 backdrop-blur-md rounded-xl p-2 shadow flex justify-around">
              {authLinks.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    if (item === "Login") navigate("/login");
                    else navigate("/signup");
                  }}
                  className={`text-sm rounded-full px-4 py-1 transition duration-200 ${
                    item === "Login"
                      ? "bg-[#023471] text-white"
                      : "hover:bg-[#023471] hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
