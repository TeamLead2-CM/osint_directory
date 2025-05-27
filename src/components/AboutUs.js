import React, { useEffect, useRef, useState } from 'react';
import '../index.css';
import LeftImage from './LeftImage'; // 👈 Import the LeftImage component

const AboutUs = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [firstTime, setFirstTime] = useState(true); // Track if it's the first scroll in

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (firstTime) {
            setFirstTime(false);
          }
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [firstTime]);

  const titleClassName = `about-us-title ${isVisible ? 'visible' : ''} ${firstTime ? 'fade-in-delay' : 'first-time'}`;
  const paragraphClassName = `about-us-paragraph ${isVisible ? 'visible' : ''} ${firstTime ? 'fade-in-delay' : ''}`;
  const sectionClassName = `about-us-section fade-in-section ${isVisible ? 'visible' : ''}`;

  return (
    <section ref={sectionRef} className={sectionClassName}>
      <div className="about-us-flex-container">
        <LeftImage />
        <div className="about-us-content">
          <h2 className={titleClassName}>About Us</h2>
          <p className={paragraphClassName}>
            Fortify your digital defenses with DeepCytes: outsmarting cyber threats at every turn. DeepCytes is a leading cyber intelligence firm that specializes in protecting your digital assets from the ever-evolving threat landscape. Our team of experts are dedicated in identifying and mitigating the most advanced cyber vulnerabilitiesks through cutting-edge investigations.
          </p>
          <p className={paragraphClassName}>
            Whether you're a small business or a global enterprise, we understand the importance of safeguarding your sensitive information and maintaining your online reputation. With DeepCytes, you can have peace of mind, knowing that your digital world is in good hands. Our innovative approach ensures that you have the best defense against cyber threats.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
