import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Users, Calendar, Wallet } from 'lucide-react';

const ItineraryDisplay = ({ itinerary }) => {
  const [expandedDay, setExpandedDay] = useState(null);

  const toggleDay = (dayNumber) => {
    setExpandedDay(expandedDay === dayNumber ? null : dayNumber);
  };

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Trip Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {itinerary.destination} Trip Plan
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="text-indigo-600" size={20} />
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="text-lg font-semibold">{itinerary.destination}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="text-indigo-600" size={20} />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="text-lg font-semibold">{itinerary.num_days} Days</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Users className="text-indigo-600" size={20} />
            <div>
              <p className="text-sm text-gray-500">Travelers</p>
              <p className="text-lg font-semibold">{itinerary.num_travelers}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wallet className="text-indigo-600" size={20} />
            <div>
              <p className="text-sm text-gray-500">Est. Budget</p>
              <p className="text-lg font-semibold">{formatPrice(itinerary.estimated_budget.medium)}</p>
            </div>
          </div>
        </div>

        {/* Date Range */}
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-gray-700">
            <span className="font-semibold">Dates:</span> {itinerary.start_date} to {itinerary.end_date}
          </p>
        </div>
      </div>

      {/* Budget Breakdown */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Budget Estimate</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded">
            <p className="text-sm text-blue-600 font-medium">Budget</p>
            <p className="text-2xl font-bold text-blue-600">{formatPrice(itinerary.estimated_budget.low)}</p>
            <p className="text-xs text-blue-500 mt-1">Per traveler: ₹{(itinerary.estimated_budget.low / itinerary.num_travelers / itinerary.num_days).toLocaleString('en-IN')}/day</p>
          </div>
          <div className="bg-purple-50 p-4 rounded">
            <p className="text-sm text-purple-600 font-medium">Recommended</p>
            <p className="text-2xl font-bold text-purple-600">{formatPrice(itinerary.estimated_budget.medium)}</p>
            <p className="text-xs text-purple-500 mt-1">Per traveler: ₹{(itinerary.estimated_budget.medium / itinerary.num_travelers / itinerary.num_days).toLocaleString('en-IN')}/day</p>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <p className="text-sm text-green-600 font-medium">Premium</p>
            <p className="text-2xl font-bold text-green-600">{formatPrice(itinerary.estimated_budget.high)}</p>
            <p className="text-xs text-green-500 mt-1">Per traveler: ₹{(itinerary.estimated_budget.high / itinerary.num_travelers / itinerary.num_days).toLocaleString('en-IN')}/day</p>
          </div>
        </div>
      </div>

      {/* Itinerary Days */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Day-by-Day Itinerary</h2>
        
        {itinerary.itinerary.map((day) => (
          <div key={day.day} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Day Header */}
            <button
              onClick={() => toggleDay(day.day)}
              className="w-full px-6 py-4 flex justify-between items-center bg-indigo-50 hover:bg-indigo-100 transition"
            >
              <div className="text-left">
                <h3 className="text-xl font-bold text-indigo-600">
                  Day {day.day} - {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </h3>
              </div>
              {expandedDay === day.day ? (
                <ChevronUp size={24} className="text-indigo-600" />
              ) : (
                <ChevronDown size={24} className="text-indigo-600" />
              )}
            </button>

            {/* Day Content */}
            {expandedDay === day.day && (
              <div className="px-6 py-4 space-y-4">
                {/* Activities */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Activities</h4>
                  <div className="space-y-2">
                    {day.activities.length > 0 ? (
                      day.activities.map((activity, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded">
                          <p className="font-semibold text-gray-800">{activity.name}</p>
                          <div className="flex gap-4 text-sm text-gray-600 mt-1">
                            <span>Type: {activity.type}</span>
                            <span>Duration: {activity.duration}hrs</span>
                            {activity.cost > 0 && <span>Cost: ₹{activity.cost}</span>}
                            <span>Rating: {activity.satisfaction_score}%</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No activities planned</p>
                    )}
                  </div>
                </div>

                {/* Recommended Hotels */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Recommended Hotels</h4>
                  <div className="space-y-2">
                    {day.hotels.length > 0 ? (
                      day.hotels.map((hotel, idx) => (
                        <div key={idx} className="bg-blue-50 p-4 rounded border border-blue-200">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-bold text-gray-800">{hotel.name}</h5>
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-400">★</span>
                              <span className="font-semibold text-gray-700">{hotel.rating}</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                            <span>Location: {hotel.location}</span>
                            <span>Price: ₹{hotel.price}/night</span>
                            <span>Amenities: {hotel.amenities_score}/10</span>
                            <span>Popularity: {hotel.popularity_score}%</span>
                          </div>
                          <div className="text-sm">
                            <p className="text-gray-600">
                              Rooms: {hotel.room_types}
                            </p>
                            <p className="text-gray-600">
                              Breakfast: {hotel.breakfast_included === 'True' || hotel.breakfast_included === true ? '✓ Included' : '✗ Not included'} | 
                              Free Cancellation: {hotel.free_cancellation === 'True' || hotel.free_cancellation === true ? '✓ Yes' : '✗ No'}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No hotels found</p>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {day.notes && (
                  <div className="bg-amber-50 p-3 rounded border-l-4 border-amber-400">
                    <p className="text-sm text-gray-700">{day.notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4 justify-center">
        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Save Trip
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Share Trip
        </button>
        <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
          Print Itinerary
        </button>
      </div>
    </div>
  );
};

export default ItineraryDisplay;
