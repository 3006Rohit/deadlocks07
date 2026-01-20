import React from 'react';
import Homepage from '../components/Homepage';
import MiddlePage from './MiddlePage';
import HotelOfferPage from './HotelOfferPage';
import Conclusion from './Conclusion';

const LandingPage = () => {
  return (
    <div>
      <Homepage />
      <MiddlePage />
      <HotelOfferPage />
      <Conclusion />
    </div>
  );
};

export default LandingPage;
