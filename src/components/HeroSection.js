import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import bgImage from '../assets/cyber-bg.jpg';
import { FiArrowRight } from 'react-icons/fi';

const HeroSection = () => {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(to right, #000000 35%, rgb(0, 0, 0) 35%, rgba(0, 1, 30, 0.33) 55%, rgba(0, 1, 30, 0) 90%), url(${bgImage})`,
        backgroundPosition: 'right center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1>
        <span className="gradient-line">OSINT</span><br />
        <span className="gradient-line">Tools Directory</span>
      </h1>
      <p className="subtitle">
        A comprehensive collection of every tool you need for open-source intelligence.
        <br />
        Explore, analyze, and gather insights from multiple sources with ease.
      </p>

      <div className="blur-glow"></div>
      <Link to="/home" className="go-to-tools-btn">
  <span className="btn-content">
    Go to Tools
    <FiArrowRight className="arrow-icon" size={16} />
  </span>
</Link>

    </section>
  );
};

export default HeroSection;



