import React, { useState, useEffect, useRef } from "react";
import { database, ref, get, auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";
import Sidebar from "../components/Sidebar";
import { FiMenu } from "react-icons/fi";
import SearchDropdown from "../components/SearchDropdown";  // Import SearchDropdown component

const HomePage = () => {
  const [tools, setTools] = useState([]);
  const [search, setSearch] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(true);
  const [activeKeyword, setActiveKeyword] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 20;
  const toolListRef = useRef(null);

  // Input dropdown state
  const [inputFilter, setInputFilter] = useState("");
  const [inputSearchTerm, setInputSearchTerm] = useState("");
  const [showInputOptions, setShowInputOptions] = useState(false);

  // Keyword filter
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const dbRef = ref(database, "tools");
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUsernameLoading(true);
        try {
          const snapshot = await get(ref(database, "users/" + currentUser.uid));
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUsername(userData.username || "");
          } else {
            setUsername("");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUsername("");
        } finally {
          setUsernameLoading(false);
        }
      } else {
        setUsername("");
        setUsernameLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUsername("");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const filteredTools = tools.filter((tool) => {
    const lowerSearch = search.toLowerCase();
    const matchesSearch = tool.name.toLowerCase().includes(lowerSearch);

    const matchesActiveKeyword =
      !activeKeyword || (tool.keywords && tool.keywords.includes(activeKeyword));

    const matchesSelectedKeywords =
      selectedKeywords.length === 0 ||
      (tool.keywords &&
        selectedKeywords.every((selectedKw) =>
          tool.keywords.includes(selectedKw)
        ));

    const matchesInput = inputFilter === "" || tool.input === inputFilter;

    return (
      matchesSearch && matchesActiveKeyword && matchesSelectedKeywords && matchesInput
    );
  });

  const paginatedTools = filteredTools.slice(
    (currentPage - 1) * toolsPerPage,
    currentPage * toolsPerPage
  );

  const allKeywords = Array.from(
    new Set(tools.flatMap((tool) => tool.keywords || []).map((kw) => kw.trim()))
  ).sort((a, b) => a.localeCompare(b));

  const allInputs = Array.from(
    new Set(tools.map((tool) => tool.input).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  return (
    <div className="homepage-container">
      {/* Header */}
      <div className="header-container">
    
        <div className="logo">
          <img
            src="https://raw.githubusercontent.com/TeamLead2-CM/OSINT_Directory_Resources/osint/logo/logo_T_OS_0006.jpg"
            alt="Logo"
            className="logo-image"
          />
        </div>
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search tools by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          {/* Add the SearchDropdown component */}
          
    

        </div>
        <div className="auth-buttons">
          {user ? (
            <div className="auth-user-info">
              {usernameLoading ? (
                <span className="user-email">Welcome...</span>
              ) : (
                <span className="user-email">Welcome, {username}</span>
              )}
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <button onClick={() => setShowLogin(true)}>Login</button>
              <button onClick={() => setShowSignup(true)}>Sign Up</button>
            </>
          )}
        </div>
      </div>

      {/* Main Section */}
      <div className="main-content">
      <Sidebar
  keywords={allKeywords}
  onSelect={(kw) => {
    setActiveKeyword(kw);
    setCurrentPage(1);
  }}
  activeKeyword={activeKeyword}
  allInputs={allInputs}
  inputFilter={inputFilter}
  setInputFilter={setInputFilter}
  sidebarOpen={sidebarOpen}  // Pass sidebarOpen as prop if needed for Sidebar component
/>

        <div ref={toolListRef} className={`tool-list-wrapper ${sidebarOpen ? "with-sidebar" : ""}`}>
          {/* Multi Keyword Filter Dropdown */}
           {/* <div className="custom-keyword-filter-container">
            <button className="custom-filter-button" onClick={() => setShowKeywordDropdown(!showKeywordDropdown)}>
              Filter
            </button>
            {showKeywordDropdown && (
              <div className="custom-dropdown-panel">
                <div className="custom-dropdown-keywords">
                  {allKeywords.map((kw) => (
                    <label key={kw} className="custom-checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedKeywords.includes(kw)}
                        onChange={() => toggleKeyword(kw)}
                      />
                      {kw}
                    </label>
                  ))}
                </div>
                <div className="custom-dropdown-actions">
                  <button className="custom-clear-button" onClick={clearKeywords}>
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>  */}

          {/* Active Keyword Filter Bar */}
          {activeKeyword && (
            <div className="keyword-filter-bar">
              <span>
                Filtering by Tag: <strong>{activeKeyword}</strong>
              </span>
              <button className="clear-btn" onClick={() => setActiveKeyword(null)}>
                Clear Filter
              </button>
            </div>
          )}

  {/* Input Filter Bar */}
{inputFilter && (
  <div className="input-filter-bar">  {/* Updated class name */}
    <span>
      Filtering by Input Type: <strong>{inputFilter}</strong>
    </span>
    <button className="clear-btn" onClick={() => setInputFilter("")}>
      Clear Filter
    </button>
  </div>
)}


          {/* Tool List */}
          <div className={`tool-list ${sidebarOpen ? "with-sidebar" : ""}`}>
            {paginatedTools.map((tool) => (
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
                            setActiveKeyword(keyword);
                            setCurrentPage(1);
                          }}
                          className={`keyword-btn ${activeKeyword === keyword ? "active" : ""}`}
                        >
                          {keyword}
                        </button>
                      ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {filteredTools.length > toolsPerPage && (
            <div className="pagination-controls">
              <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                &lt;
              </button>
              <span>
                Page <strong>{currentPage}</strong> of{" "}
                <strong>{Math.ceil(filteredTools.length / toolsPerPage)}</strong>
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    prev < Math.ceil(filteredTools.length / toolsPerPage) ? prev + 1 : prev
                  )
                }
                disabled={currentPage === Math.ceil(filteredTools.length / toolsPerPage)}
              >
                &gt;
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitch={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
          setUser={setUser}
          setUsername={setUsername}
        />
      )}
      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          onSwitch={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
          setUser={setUser}
          setUsername={setUsername}
        />
      )}
    </div>
  );
};

export default HomePage;
