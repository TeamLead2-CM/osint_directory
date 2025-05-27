import React, { useState } from "react";
import SearchDropdown from "./SearchDropdown";

const Sidebar = ({ keywords, onSelect, activeKeyword, allInputs, inputFilter, setInputFilter }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [inputSearchTerm, setInputSearchTerm] = useState("");
  const [showInputOptions, setShowInputOptions] = useState(false);

  const filteredKeywords = keywords.filter((keyword) =>
    keyword.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const visibleKeywords = showAll ? filteredKeywords : filteredKeywords.slice(0, 10);

  return (
    <div className="custom-sidebar">
      <h3>Filter by Tag</h3>

      <input
        type="text"
        className="keyword-search-input"
        placeholder="Search tags..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />

      <ul className="custom-keyword-list">
        {visibleKeywords.map((keyword) => (
          <li
            key={keyword}
            className={`custom-keyword-item ${
              activeKeyword === keyword ? "active" : ""
            }`}
            onClick={() => {
              if (activeKeyword !== keyword) onSelect(keyword);
            }}
          >
            {keyword}
          </li>
        ))}
      </ul>

      {filteredKeywords.length > 10 && (
       <button className="view-toggle-btn" onClick={() => setShowAll(!showAll)}>
       {showAll ? "See Less ↑" : "See More ↓"}
     </button>
      )}

      {/* 🔻 Moved SearchDropdown here */}
      <div style={{ marginTop: "1rem" }}>
        <SearchDropdown
          allInputs={allInputs}
          inputFilter={inputFilter}
          setInputFilter={setInputFilter}
          inputSearchTerm={inputSearchTerm}
          setInputSearchTerm={setInputSearchTerm}
          showInputOptions={showInputOptions}
          setShowInputOptions={setShowInputOptions}
        />
      </div>
    </div>
  );
};

export default Sidebar;
