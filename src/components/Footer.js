import React from 'react';
import '../index.css';
import { FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-grid">

        {/* Left: Logo only */}
              <div className="footer-logo-only">
                  <img
                      src="https://raw.githubusercontent.com/TeamLead2-CM/OSINT_Directory_Resources/osint/logo/logo_T_OS_0006.jpg"
                      alt="DeepCytes Logo"
                      className="footer-logo"
                  />
                  <div className="footer-bottom">
                      &copy; {new Date().getFullYear()} DeepCytes. All Rights Reserved.
                  </div>
              </div>


        {/* Center: Location Info */}
        <div className="footer-info">
          <h4>Locate Us</h4>
          <p>
            Express Towers,<br />
            Marine Drive,<br />
            Nariman Point, Mumbai - 400021
          </p>
        </div>

        {/* Right: Follow Us + Social Icons */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/people/DeepCytes/100081174439554/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://x.com/i/flow/login?redirect_after_login=%2FDeepCytes" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
            <a href="https://www.instagram.com/deepcytes/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://www.linkedin.com/company/deepcytes/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a href="https://youtube.com/@dc_cyberlabs?feature=shared" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          </div>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
