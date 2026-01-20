import React, { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard';

const HotelOfferPage = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const allHotels = [
    { name: 'The Himalayan', rating: 4.5, price: 15000, amenities: ['wifi', 'swimming-pool', 'geyser'], image: 'the-himalayan' },
    { name: 'Snow Valley Resorts', rating: 4.2, price: 12000, amenities: ['wifi', 'geyser'], image: 'snow-valley-resorts' },
    { name: 'The Oberoi Cecil', rating: 4.8, price: 25000, amenities: ['wifi', 'swimming-pool', 'spa', 'geyser'], image: 'the-oberoi-cecil' },
    { name: 'Fortune Park Moksha', rating: 4.3, price: 18000, amenities: ['wifi', 'spa', 'geyser'], image: 'fortune-park-moksha' },
    { name: 'Wildflower Hall', rating: 4.9, price: 35000, amenities: ['wifi', 'swimming-pool', 'spa', 'geyser'], image: 'wildflower-hall' },
    { name: 'The Holiday Home', rating: 4.0, price: 10000, amenities: ['wifi', 'geyser'], image: 'the-holiday-home' },
    { name: 'Hotel Shivalik', rating: 3.8, price: 9000, amenities: ['wifi', 'geyser'], image: 'hotel-shivalik' },
    { name: 'Clarkes Hotel', rating: 4.1, price: 13000, amenities: ['wifi', 'swimming-pool', 'geyser'], image: 'clarkes-hotel' },
  ];

  const [filteredHotels, setFilteredHotels] = useState(allHotels);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([5000, 50000]); // Adjusted price range for Rupees
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    let currentHotels = allHotels;

    // Filter by search term
    if (searchTerm) {
      currentHotels = currentHotels.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    currentHotels = currentHotels.filter(hotel =>
      hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );

    // Filter by rating
    if (selectedRatings.length > 0) {
      currentHotels = currentHotels.filter(hotel =>
        selectedRatings.some(minRating => hotel.rating >= minRating)
      );
    }

    // Filter by amenities
    if (selectedAmenities.length > 0) {
      currentHotels = currentHotels.filter(hotel =>
        selectedAmenities.every(amenity => hotel.amenities && hotel.amenities.includes(amenity))
      );
    }

    if (screenWidth <= 768) {
      setFilteredHotels(currentHotels.slice(0, 6)); // Limit to 6 hotels on smaller screens
    } else {
      setFilteredHotels(currentHotels);
    }
  }, [searchTerm, priceRange, selectedRatings, selectedAmenities, screenWidth]);

  const handleRatingChange = (rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-10">Exclusive Hotel Deals</h1>
        <div className="flex justify-center mb-8 sm:mb-10">
          <div className="w-full max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for hotels..."
                className="w-full py-2 px-4 sm:py-3 sm:px-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-0 top-0 mt-2 mr-3 sm:mt-3 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 pr-0 md:pr-8 mb-8 md:mb-0">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md sticky top-0">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Filter:</h2>
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2">Price Range</h3>
                <input
                  type="range"
                  min="5000"
                  max="50000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([5000, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                  <span>₹5000</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2">Rating</h3>
                <div className="flex items-center text-sm sm:text-base">
                  <input
                    type="checkbox"
                    id="5-star"
                    className="mr-2"
                    checked={selectedRatings.includes(5)}
                    onChange={() => handleRatingChange(5)}
                  />
                  <label htmlFor="5-star">5 Stars</label>
                </div>
                <div className="flex items-center text-sm sm:text-base">
                  <input
                    type="checkbox"
                    id="4-star"
                    className="mr-2"
                    checked={selectedRatings.includes(4)}
                    onChange={() => handleRatingChange(4)}
                  />
                  <label htmlFor="4-star">4 Stars & up</label>
                </div>
                <div className="flex items-center text-sm sm:text-base">
                  <input
                    type="checkbox"
                    id="3-star"
                    className="mr-2"
                    checked={selectedRatings.includes(3)}
                    onChange={() => handleRatingChange(3)}
                  />
                  <label htmlFor="3-star">3 Stars & up</label>
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-2">Amenities</h3>
                <div className="flex items-center text-sm sm:text-base">
                  <input
                    type="checkbox"
                    id="wifi"
                    className="mr-2"
                    checked={selectedAmenities.includes('wifi')}
                    onChange={() => handleAmenityChange('wifi')}
                  />
                  <label htmlFor="wifi">Wi-Fi</label>
                </div>
                <div className="flex items-center text-sm sm:text-base">
                  <input
                    type="checkbox"
                    id="pool"
                    className="mr-2"
                    checked={selectedAmenities.includes('swimming-pool')}
                    onChange={() => handleAmenityChange('swimming-pool')}
                  />
                  <label htmlFor="pool">Swimming Pool</label>
                </div>
                <div className="flex items-center text-sm sm:text-base">
                  <input
                    type="checkbox"
                    id="spa"
                    className="mr-2"
                    checked={selectedAmenities.includes('spa')}
                    onChange={() => handleAmenityChange('spa')}
                  />
                  <label htmlFor="spa">Spa</label>
                </div>
                <div className="flex items-center text-sm sm:text-base">
                  <input
                    type="checkbox"
                    id="geyser"
                    className="mr-2"
                    checked={selectedAmenities.includes('geyser')}
                    onChange={() => handleAmenityChange('geyser')}
                  />
                  <label htmlFor="geyser">Geyser</label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel, index) => (
                  <HotelCard key={index} hotel={hotel} />
                ))
              ) : (
                <p className="text-center text-gray-600 col-span-full">No hotels found matching your criteria.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelOfferPage;