import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItineraryDisplay from '../components/ItineraryDisplay';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/home';

const PlanYourTrip = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState('form'); // 'form' or 'results'

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/destinations/`);
      setDestinations(response.data.destinations);
    } catch (err) {
      console.error('Error fetching destinations:', err);
      setError('Failed to load destinations');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!destination || !startDate || !endDate) {
      setError('Please fill in all fields');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      setError('End date must be after start date');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/generate-itinerary/`, {
        destination,
        start_date: startDate,
        end_date: endDate,
        travelers: parseInt(travelers),
      });

      setItinerary(response.data);
      setStep('results');
    } catch (err) {
      console.error('Error generating itinerary:', err);
      setError(err.response?.data?.error || 'Failed to generate itinerary');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'results' && itinerary) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <button
          onClick={() => setStep('form')}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          ← Back to Search
        </button>
        <ItineraryDisplay itinerary={itinerary} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Plan Your Dream Trip</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
              Destination
            </label>
            <select
              id="destination"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setError('');
              }}
            >
              <option value="">Select a destination</option>
              {destinations.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setError('');
                }}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setError('');
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="travelers" className="block text-sm font-medium text-gray-700">
              Number of Travelers
            </label>
            <input
              type="number"
              id="travelers"
              min="1"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={travelers}
              onChange={(e) => setTravelers(parseInt(e.target.value))}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            {loading ? 'Planning...' : 'Plan My Trip'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlanYourTrip;