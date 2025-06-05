import React, { useState } from "react";
import SearchDropdown from "./SearchDropdown";

const Sidebar = ({
  groupedKeywords = {},
  frameKeywords = [],
  onSelect,
  activeKeyword,
  allInputs,
  inputFilter,
  setInputFilter,
}) => {
  const [expanded, setExpanded] = useState(() =>
    Object.keys(groupedKeywords).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {})
  );

  const [searchKeyword, setSearchKeyword] = useState("");
  const [inputSearchTerm, setInputSearchTerm] = useState("");
  const [showInputOptions, setShowInputOptions] = useState(false);

  const toggleCategory = (category) => {
    setExpanded((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const filterKeywords = (keywords) =>
    keywords.filter((keyword) =>
      keyword.toLowerCase().includes(searchKeyword.toLowerCase())
    );

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Filter by Tag</h3>

      <input
        type="text"
        className="search-input"
        placeholder="Search tags..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />

      {Object.entries(groupedKeywords).map(([category, keywords]) => {
        const filteredKeywords = filterKeywords(keywords);
        const isExpanded = expanded[category];

        return (
          <div key={category} className="category-block">
            <div
              className="category-title"
              onClick={() => toggleCategory(category)}
            >
              {category} 
            </div>

            {isExpanded && filteredKeywords.length > 0 && (
              <ul className="keyword-list">
                {filteredKeywords.map((keyword) => (
                  <li
                    key={keyword}
                    className={`keyword-item ${
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
            )}
          </div>
        );
      })}

      <div className="dropdown-container">
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
