// import { useState } from "react";
// import axios from "axios";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:8000/home/login/", form);
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response.data.message);
//     }
//   };

//   return (
//     <form className="space-y-4" onSubmit={handleSubmit}>
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
//         <button className="w-[20vw] mx-auto bg-[#023471] text-white py-2 rounded-full">
//           Login
//         </button>
//       </div>
//       {message && <p className="text-center text-sm mt-2">{message}</p>}
//     </form>
//   );
// }
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/login.png";
import Signup from "./Signup";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/home/login/", form);
      setMessage(res.data.message);
      if (res) navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="flex min-h-screen">
      {/* Left: Red-Blue Gradient */}
      <div className="bg-gradient-to-b from-red-500 to-blue-500 object-cover md:block ">
        <img src={`${logo}`} alt="" srcset="" />
      </div>

      {/* Right: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-xl shadow-lg border">
          <h2 className="text-3xl font-semibold text-center text-[#023471]">
            Welcome Back 👋
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
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
            <button
              type="submit"
              className="w-full bg-[#023471] text-white py-2 rounded-full hover:bg-[#012e60] transition"
            >
              Login
            </button>
            {message && (
              <p className="text-center text-sm text-red-500 mt-2">{message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
