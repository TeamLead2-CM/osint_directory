// src/pages/OsintFrameworkPage.js
import React, { useEffect } from "react";
import Header from "../components/Header"; // Import your CSS file
import "../index.css"; // Import your CSS file
import Footer from "../components/Footer";
import { database, ref, get } from "../firebaseConfig"; // Import Firebase functions
import { useState } from "react";
import { Link } from "react-router-dom";

const OsintFrameworkPage = () => {
  const [tools, setTools] = useState([]);
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
    
  useEffect(() => {
      const fetchTools = async () => {
        try {
          const dbRef = ref(database, "Frametools");
          const snapshot = await get(dbRef);
          if (snapshot.exists()) {
            const toolsData = snapshot.val();
            const toolsArray = Object.keys(toolsData).map((key) => ({
              id: key,
              ...toolsData[key],
            }));
            setTools(toolsArray);
          }
        } catch (error) {
          console.error("Error fetching tools:", error);
        }
      };
      fetchTools();
    }, []);
  

  return (
   <div><div id="body">
    <Header/>
  <div>  
    <hr />
  </div> 
    </div>
    <div className={`tool-list`}>
            {tools?.length>0 && tools?.slice(17,21)?.map((tool) => (
              <Link to={`/tool/${tool.id}`} key={tool.id} className="tool-link">
                <div className="tool-card">
                <img
  src={tool.UI || "https://raw.githubusercontent.com/TeamLead2-CM/OSINT_Directory_Resources/osint/logo/logo_T_OS_0006.jpg"}
  alt={`${tool.name} UI`}
  className="tool-ui-image"
  onError={(e) => {
    e.target.onerror = null; // Prevent infinite loop if fallback also fails
    e.target.src = "https://raw.githubusercontent.com/TeamLead2-CM/OSINT_Directory_Resources/osint/logo/logo_T_OS_0006.jpg";
  }}
/>

                  <h3>{tool.name}</h3>
                  <div className="keyword-buttons vertical">
                    {tool.keywords &&
                      tool.keywords.slice(0, 2).map((keyword, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                          className={`keyword-btn}`}
                        >
                          {keyword}
                        </button>
                      ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
      <Footer/>

</div>
  );
};

export default OsintFrameworkPage;
