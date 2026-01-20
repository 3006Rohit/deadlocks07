import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const newBookingsData = [
  { name: "Online Booking", value: 75 },
  { name: "Direct Booking", value: 25 },
];

const COLORS = ["#2c7be5", "#a3d0ff"];

const remainingRoomsData = [
  { name: "Deluxe rooms", value: 60, color: "#1f4e79" },
  { name: "Primary rooms", value: 10, color: "#7a6ea6" },
  { name: "Balcony rooms", value: 10, color: "#8db9c7" },
  { name: "Honeymoon suits", value: 7, color: "#4caf50" },
  { name: "Pool attached rooms", value: 7, color: "#7ec8e3" },
  { name: "Rooftop rooms", value: 6, color: "#0d47a1" },
];

const recentBookings = [
  { name: "Kartik Gadade", roomNo: "Deluxe #38", duration: "4D 3N", checkout: "16 Sept" },
  { name: "Rohit Choudhary", roomNo: "Regular #21", duration: "3D 2N", checkout: "15 Sept" },
  { name: "Lakshya Kantiwal", roomNo: "Deluxe #43", duration: "1D 1N", checkout: "14 Sept" },
  { name: "Khushi Singh", roomNo: "Balcony room #47", duration: "3D 2N", checkout: "15 Sept" },
  { name: "Kartik Gadade", roomNo: "Deluxe #24", duration: "4D 3N", checkout: "16 Sept" },
  { name: "Rohit Choudhary", roomNo: "Regular #13", duration: "3D 2N", checkout: "15 Sept" },
  { name: "Lakshya Kantiwal", roomNo: "Deluxe #23", duration: "1D 1N", checkout: "14 Sept" },
];

const upcomingGuests = [
  { name: "Jayant kumar", room: "Deluxe", no: 38, duration: "4D 3N" },
  { name: "Kunal patil", room: "Single", no: 73, duration: "2D 1N" },
  { name: "Rajeev singh", room: "Deluxe", no: 24, duration: "2D 1N" },
  { name: "Ajay bairwa", room: "Primary", no: 51, duration: "4D 3N" },
];

const AdminDashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("Last week");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  const currentMonth = "September";
  const currentYear = 2025;

  // Generate calendar dates for September 2025 (simplified)
  const calendarDates = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="flex min-h-screen bg-blue-50">
      <Sidebar />
      <div className="flex-1 p-6 space-y-6">
        <DashboardHeader />

        {/* Time range filter */}
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer select-none">
            Time range - {selectedTimeRange} ▼
          </div>
        </div>

        {/* Summary cards */}
        <div className="flex space-x-4 mt-4">

          <div className="max-w-[20vw] flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-4 flex items-center space-x-4 shadow-md">
            <div className="bg-white rounded p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex justify-evenly">
              <div className="">
              <div>New bookings</div>
              <span className="text-2xl font-bold">47</span>
              </div>
              <div className="flex text-green-500 text-sm mt-1 flex-col">
                <div className="bg-white text-green-500 rounded-full px-2">▲ 9.40% </div>
                <p>more from last week</p></div>
            </div>
          </div>

          <div className="max-w-[20vw] flex-1 bg-white rounded-lg p-4 flex items-center space-x-4 shadow-md">
            <div className="bg-gray-100 rounded p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-semibold">Available rooms</div>
              <div className="text-3xl font-bold">10</div>
            </div>
          </div>

          <button className="max-w-[12vw] bg-green-600 text-white rounded-lg px-3 py-1 font-semibold hover:bg-green-700 transition">
            + Create new booking
          </button>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Left: Calendar and recent bookings */}
          <div className="col-span-2 bg-white rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <div className="font-semibold">Recent bookings schedule</div>
              <div className="flex items-center space-x-2">
                <button className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">{'<'}</button>
                <div>{currentMonth} {currentYear}</div>
                <button className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">{'>'}</button>
              </div>
            </div>
            <div className="grid grid-cols-7 text-center text-sm text-gray-600 mb-2">
              {daysOfWeek.map((day) => (
                <div key={day} className="font-semibold">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 text-center text-gray-700">
              {calendarDates.map((date) => (
                <div
                  key={date}
                  className={`p-2 rounded cursor-pointer ${
                    date === 14 ? "bg-green-600 text-white shadow-md" : ""
                  }`}
                >
                  {date}
                </div>
              ))}
            </div>

            {/* Recent bookings table */}
            <table className="w-full mt-6 text-left text-sm">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2">Name</th>
                  <th className="py-2">Room No.</th>
                  <th className="py-2">Duration</th>
                  <th className="py-2">Checkout</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking, idx) => (
                  <tr key={idx} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-2">{booking.name}</td>
                    <td className="py-2">{booking.roomNo}</td>
                    <td className="py-2">{booking.duration}</td>
                    <td className="py-2">{booking.checkout}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right: Upcoming guests and charts */}
          <div className="space-y-6">
            {/* Upcoming guests */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="font-semibold mb-4">Today's Upcoming guest list</div>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-2 cursor-pointer">Name</th>
                    <th className="py-2 cursor-pointer">Room</th>
                    <th className="py-2 cursor-pointer">No.</th>
                    <th className="py-2 cursor-pointer">Duration</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingGuests.map((guest, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-2">{guest.name}</td>
                      <td className="py-2">{guest.room}</td>
                      <td className="py-2">{guest.no}</td>
                      <td className="py-2">{guest.duration}</td>
                      <td className="py-2">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                          Admit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* New bookings pie chart */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="font-semibold mb-4">New bookings</div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={newBookingsData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {newBookingsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-around mt-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-[#1f4e79] rounded"></div>
                  <span>75% Online Booking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-[#a3d0ff] rounded"></div>
                  <span>25% Direct Booking</span>
                </div>
              </div>
            </div>

            {/* Remaining rooms bar chart */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="font-semibold mb-4">Remaining rooms</div>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={remainingRoomsData} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                    {remainingRoomsData.map((entry, index) => (
                      <Cell key={`cell-bar-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
