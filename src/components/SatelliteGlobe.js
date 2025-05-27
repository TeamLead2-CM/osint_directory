// src/components/SatelliteGlobe.js
import React, { useEffect } from 'react';
import Globe from 'globe.gl';

const SatelliteGlobe = () => {
  useEffect(() => {
    // Initialize the globe
    const world = Globe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg') // Globe image URL
      .backgroundColor('rgba(0, 0, 0, 0)') // Transparent background
      .showAtmosphere(true) // Show atmosphere
      .atmosphereColor('lightskyblue') // Atmosphere color
      .atmosphereAltitude(0.15) // Altitude of the atmosphere
      .width(window.innerWidth)  // Full screen width
      .height(window.innerHeight) // Full screen height
      (document.getElementById('satellite-globe')); // Attach to DOM element

    // Optional: Auto rotate the globe
    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.5;

  }, []);

  return (
    <div
      id="satellite-globe"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%', // Full screen width
        height: '100%', // Full screen height
        zIndex: -1, // Make sure the globe is behind other content
        pointerEvents: 'none', // Disable mouse interaction
      }}
    />
  );
};

export default SatelliteGlobe;
