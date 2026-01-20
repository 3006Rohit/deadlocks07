// import React, { useEffect, useState } from "react";
// import hotel2 from "../assets/hotel2.png";
// import { useNavigate } from "react-router-dom";

// const CountdownTimer = () => {
//   const [time, setTime] = useState({ minutes: 22, seconds: 47 });
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTime((prevTime) => {
//         let seconds = prevTime.seconds - 1;
//         let minutes = prevTime.minutes;

//         if (seconds < 0) {
//           seconds = 59;
//           minutes -= 1;
//         }

//         return {
//           minutes: minutes < 0 ? 0 : minutes,
//           seconds: seconds < 0 ? 0 : seconds,
//         };
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="border-2 border-black rounded-full w-[20vw] text-center p-4">
//       <h1 className="text-xl font-bold font-spartan">Limited Time Offer</h1>
//       <div className="flex justify-center space-x-2 text-4xl font-mono">
//         <div className="bg-black shadow-gray-400 shadow-2xl text-white rounded-md px-3 py-1">
//           {String(time.minutes).padStart(2, "0")}
//         </div>
//         <span className="text-4xl">:</span>
//         <div className="bg-black text-white shadow-400 shadow-2xl rounded-md px-3 py-1">
//           {String(time.seconds).padStart(2, "0")}
//         </div>
//       </div>
//     </div>
//   );
// };

// const HotelCard = ({ title, description }) => (
//   <div className="bg-white w-[20vw] mt-5 rounded-lg shadow-lg border-2">
//     <div className=" p-1 flex justify-center rounded-lg">
//       <img src={`${hotel2}`} width={"60%"} alt="" />
//     </div>
//     <h2 className="text-lg justify-center flex font-semibold ">{title}</h2>
//     <p className="text-gray-700 justify-center flex">{description}</p>
//     <div className="flex justify-center m-3" onClick={navigate("/room-layout")}>
//       <button className="bg-blue-500 text-white pt-1 pb-2 px-4 rounded">
//         Check availability →
//       </button>
//     </div>
//   </div>
// );

// const RecommendedHotels = () => {
//   return (
//     <div className=" flex justify-center">
//       <div className="flex justify-evenly flex-col mb-5">
//         <CountdownTimer />
//         <HotelCard
//           title="Fab Hotels Manali"
//           description="60% flat off on booking now"
//         />
//         <HotelCard
//           title="Fab Hotels Manali"
//           description="60% flat off on booking now"
//         />
//         {/* <HotelCard
//           title="Fab Hotels Manali"
//           description="60% flat off on booking now"
//         /> */}
//       </div>
//     </div>
//   );
// };

// export default RecommendedHotels;
import React, { useEffect, useState } from "react";
import hotel2 from "../assets/hotel2.png";
import { useNavigate } from "react-router-dom";

const CountdownTimer = () => {
  const [time, setTime] = useState({ minutes: 22, seconds: 47 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        let seconds = prevTime.seconds - 1;
        let minutes = prevTime.minutes;

        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }

        return {
          minutes: minutes < 0 ? 0 : minutes,
          seconds: seconds < 0 ? 0 : seconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border-2 border-black rounded-full w-[20vw] text-center p-4">
      <h1 className="text-xl font-bold font-spartan">Limited Time Offer</h1>
      <div className="flex justify-center space-x-2 text-4xl font-mono">
        <div className="bg-black shadow-gray-400 shadow-2xl text-white rounded-md px-3 py-1">
          {String(time.minutes).padStart(2, "0")}
        </div>
        <span className="text-4xl">:</span>
        <div className="bg-black text-white shadow-400 shadow-2xl rounded-md px-3 py-1">
          {String(time.seconds).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};

const HotelCard = ({ title, description }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/room-layout");
  };

  return (
    <div className="bg-white w-[20vw] mt-5 rounded-lg shadow-lg border-2">
      <div className="p-1 flex justify-center rounded-lg">
        <img src={hotel2} width={"60%"} alt="" />
      </div>
      <h2 className="text-lg justify-center flex font-semibold">{title}</h2>
      <p className="text-gray-700 justify-center flex">{description}</p>
      <div className="flex justify-center m-3">
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white pt-1 pb-2 px-4 rounded"
        >
          Check availability →
        </button>
      </div>
    </div>
  );
};

const RecommendedHotels = () => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-evenly flex-col mb-5">
        <CountdownTimer />
        <HotelCard
          title="Manvi Hotels Manali"
          description="60% flat off on booking now"
        />
        <HotelCard
          title="Panku Hotels Simla"
          description="60% flat off on booking now"
        />
      </div>
    </div>
  );
};

export default RecommendedHotels;
