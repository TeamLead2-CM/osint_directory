// src/pages/OsintFrameworkPage.js
import React, { useEffect } from "react";

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
<div id="body">
  <div id="header">
    <div class="header-title">OSINT Framework</div>
    <div class="legend">
      <p>
        (T) - Tool to be installed locally<br />
        (D) - Google Dork (see  
        <a href=  "https://en.wikipedia.org/wiki/Google_hacking">
          Google Hacking
        </a>)<br />
        (R) - Requires registration<br />
        (M) - URL must be manually edited<br />
      </p>
    </div>
    <hr />
  </div>



      
    </div>
  );
};

export default OsintFrameworkPage;
