// import { useState } from "react";
// import axios from "axios";

// export default function Signup() {
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8000/home/signup/", form);
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage("Error signing up");
//     }
//   };

//   return (
//     <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
//       <input
//         name="name"
//         type="text"
//         placeholder="Full Name"
//         className="w-[20vw] flex mx-auto px-4 py-2 rounded-full border border-gray-300"
//         onChange={handleChange}
//       />
//       <input
//         name="email"
//         type="email"
//         placeholder="Email"
//         className="w-[20vw] flex mx-auto px-4 py-2 rounded-full border border-gray-300"
//         onChange={handleChange}
//       />
//       <input
//         name="password"
//         type="password"
//         placeholder="Password"
//         className="w-[20vw] flex mx-auto px-4 py-2 rounded-full border border-gray-300"
//         onChange={handleChange}
//       />
//       <div className="flex justify-center pb-5">
//         <button className="w-[20vw] mx-auto text-center  bg-[#023471] text-white py-2 rounded-full">
//           Sign Up
//         </button>
//       </div>
//       {message && <p className="text-center text-sm mt-2">{message}</p>}
//     </form>
//   );
// }
import { useState } from "react";
import axios from "axios";
import bgImage from "../assets/img.jpg";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/home/signup/", form);
      setMessage(res.data.message);
      navigate("/login");
    } catch (err) {
      setMessage("Error signing up");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full flex flex-col md:flex-row items-start md:items-center p-4 z-50 absolute top-0 left-0">
        <Navbar />
      </div>
      <div className="w-full max-w-lg p-8 bg-white bg-opacity-60 rounded-3xl shadow-lg space-y-6">
        <h2 className="text-3xl font-semibold text-center text-[#023471]">
          Create Your Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#023471]"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#023471]"
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#023471]"
            onChange={handleChange}
            required
          />
          <div className="flex justify-center pb-5">
            <button
              type="submit"
              className="w-full bg-[#023471] text-white py-2 rounded-full hover:bg-[#012e60] transition"
            >
              Sign Up
            </button>
          </div>
          {message && (
            <p className="text-center text-sm text-red-500 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
