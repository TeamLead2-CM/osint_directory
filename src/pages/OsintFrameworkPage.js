// src/pages/OsintFrameworkPage.js
import React, { useEffect } from "react";
import Header from "../components/Header"; // Import your CSS file
import "../index.css"; // Import your CSS file
import Footer from "../components/Footer";
const OsintFrameworkPage = () => {
  useEffect(() => {
    const d3Script = document.createElement("script");
    d3Script.src = "/d3.v3.min.js";
    d3Script.async = false;

    const arfScript = document.createElement("script");
    arfScript.src = "/arf.js";
    arfScript.async = false;

    const arfCSS = document.createElement("link");
    arfCSS.rel = "stylesheet";
    arfCSS.href = "/arf.css";

    document.head.appendChild(arfCSS);
    document.body.appendChild(d3Script);

    d3Script.onload = () => {
      document.body.appendChild(arfScript);
    };

    return () => {
      [arfCSS, d3Script, arfScript].forEach((el) => {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });

      const svg = document.querySelector("svg");
      if (svg && svg.parentNode) svg.parentNode.removeChild(svg);
    };
  }, []);

  return (
    <div><div id="body">
    <Header/>
  <div>  
    <hr />
  </div> 
    </div>
      <Footer/>

</div>
  );
};

export default OsintFrameworkPage;
