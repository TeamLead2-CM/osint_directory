import React from 'react';
import cyberglobe from '../assets/cyberglobe.jpg'; // adjust path if needed
import '../index.css';

const LeftImage = () => {
  return (
    <div className="left-image-container">
      <img src={cyberglobe} alt="Cyber Globe" className="left-image" />
      <div className="bottom-blur" />
    </div>
  );
};

export default LeftImage;