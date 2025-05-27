import React, { useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";

const HeroSectionPage = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Header search={search} setSearch={setSearch} />
      <HeroSection />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default HeroSectionPage;
