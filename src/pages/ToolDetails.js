import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { database, ref, get } from "../firebaseConfig";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../UserContext";

const ToolDetails = () => {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [search, setSearch] = useState("");
  const [showDemos, setShowDemos] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [relatedTools, setRelatedTools] = useState([]);
  const { user } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
const cardsPerPage = 2;

const totalPages = Math.ceil(relatedTools.length / cardsPerPage);

const handleNext = () => {
  if (currentIndex < totalPages - 1) {
    setCurrentIndex((prev) => prev + 1);
  }
};

const handlePrev = () => {
  if (currentIndex > 0) {
    setCurrentIndex((prev) => prev - 1);
  }
};

const visibleTools = relatedTools.slice(
  currentIndex * cardsPerPage,
  currentIndex * cardsPerPage + cardsPerPage
);


  useEffect(() => {
    const fetchToolDetails = async () => {
      try {
        const dbRef = ref(database, `tools/${id}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setTool(snapshot.val());
        } else {
          console.error("No tool found.");
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    fetchToolDetails();
  }, [id]);

  useEffect(() => {
    const fetchRelatedTools = async () => {
      if (!tool || !tool.keywords) return;
      try {
        const allToolsRef = ref(database, "tools");
        const snapshot = await get(allToolsRef);
        if (snapshot.exists()) {
          const allTools = snapshot.val();
          const related = Object.entries(allTools)
            .filter(([key, value]) => {
              if (key === id) return false;
              return value.keywords?.some((kw) => tool.keywords.includes(kw));
            })
            .slice(0, 4)
            .map(([key, value]) => ({ id: key, ...value }));
          setRelatedTools(related);
        }
      } catch (error) {
        console.error("Error fetching related tools:", error);
      }
    };
    fetchRelatedTools();
  }, [tool, id]);

const handleDemoClick = () => {
  if (!user) {
    setShowLoginMessage((prev) => !prev); // toggle message on click
    setShowDemos(false); // don't show demo images if not logged in
  } else {
    setShowLoginMessage(false);
    setShowDemos((prev) => !prev);
  }
};

  if (!tool) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <Header search={search} setSearch={setSearch} />

      <div className="tool-details">
        {/* ✅ RIGHT SIDE: Image */}
        <div className="tool-detail-img-wrapper">
        <img
  src={
    tool.detail || tool.image || "https://raw.githubusercontent.com/TeamLead2-CM/OSINT_Directory_Resources/osint/logo/logo_T_OS_0006.jpg"
  }
  alt={`${tool.name} Detail`}
  className="tool-detail-img"
  loading="lazy"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src =
      "https://raw.githubusercontent.com/TeamLead2-CM/OSINT_Directory_Resources/osint/logo/logo_T_OS_0006.jpg";
  }}
/>
        </div>

        {/* ✅ LEFT SIDE: Content */}
        <div className="tool-details-content">
          <div className="tool-header">
            <h1 className="tool-title">{tool.name}</h1>
            <a
              href={tool.link.startsWith("http") ? tool.link : `https://${tool.link}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="visit-icon-button">
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </button>
            </a>
          </div>

          <div className="keyword-buttons">
            {tool.keywords?.map((keyword, index) => (
              <span key={index} className="keyword-tag">
                {keyword}
              </span>
            ))}
          </div>

          <div className="tool-description">
            <p>{tool.description}</p>
          </div>

          <button className="demo-button" onClick={handleDemoClick}>
            {showDemos ? "Hide" : "How to use"}
          </button>

          {/* ✅ Login prompt */}
          {showLoginMessage && !user && (
            <div className="login-message-container">
              <FontAwesomeIcon icon={faLock} className="lock-icon" />
              <p className="login-message">Please log in to view the demo.</p>
            </div>
          )}

          {/* ✅ Demo section */}
          {user && (
  <div className="demo-container">
    <div className={`demo-images ${showDemos ? "show" : ""}`}>
    {[tool.Demo1, tool.Demo2, tool.Demo3].map((demo, index) => {
  const fallbackURL =
    "https://raw.githubusercontent.com/TeamLead2-CM/OSINT_Directory_Resources/osint/logo/logo_T_OS_0006.jpg";

  const imageSrc = demo && demo.trim() !== "" ? demo : fallbackURL;

  return (
    <img
      key={index}
      src={imageSrc}
      alt={`Demo ${index + 1}`}
      className={`demo-image ${expandedImage === demo ? "expanded" : ""}`}
      onClick={() => setExpandedImage(imageSrc)}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = fallbackURL;
      }}
    />
  );
})}

    </div>
    {tool.Demodescription && (
      <p className={`demo-description ${showDemos ? "show" : ""}`}>
        {tool.Demodescription}
      </p>
    )}
  </div>
)}


          {/* 🔘 Show Related Tools ONLY when demo & login message are NOT visible */}
          {relatedTools.length > 0 && !user && !showLoginMessage && (
  <div className="related-tools-section">
    <h2 className="related-tools-heading">
  <span className="heading-bar">|</span> More like this
</h2>

    <div className="slider-wrapper">
      <div className="arrow-wrapper left-arrow-wrapper">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="nav-arrow"
        >
          &lt;
        </button>
      </div>

      <div className="slider-controls">
        <div className="related-tools-list">
          {visibleTools.map((relatedTool) => (
            <Link
              to={`/tool/${relatedTool.id}`}
              key={relatedTool.id}
              className="related-tool-link"
            >
              <div className="related-tool-card">
              <img
  src={
    relatedTool.UI ||
    "https://raw.githubusercontent.com/TeamLead2-CM/OSINT_Directory_Resources/osint/logo/logo_T_OS_0006.jpg"
  }
  alt={`${relatedTool.name} UI`}
  className="related-tool-image"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src =
      "https://raw.githubusercontent.com/TeamLead2-CM/OSINT_Directory_Resources/osint/logo/logo_T_OS_0006.jpg";
  }}
/>
                <h3 className="related-tool-title">{relatedTool.name}</h3>
                <div className="related-tool-keywords">
                  {relatedTool.keywords?.slice(0, 2).map((keyword, index) => (
                    <span key={index} className="related-tool-keyword">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="arrow-wrapper right-arrow-wrapper">
          <button
            onClick={handleNext}
            disabled={currentIndex >= totalPages - 1}
            className="nav-arrow"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  </div>
)}


        </div>
      </div>

      {/* ✅ Overlay for demo image expansion */}
      {expandedImage && (
        <div className="overlay" onClick={() => setExpandedImage(null)}></div>
      )}
    </div>
  );
};

export default ToolDetails;
