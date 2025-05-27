import React from "react";

const SearchDropdown = ({
  allInputs,
  inputFilter,
  setInputFilter,
  inputSearchTerm,
  setInputSearchTerm,
}) => {
  const filteredInputs = allInputs.filter((val) =>
    val.toLowerCase().includes(inputSearchTerm.toLowerCase())
  );

  return (
    <div className="sidebar-section">
      <label htmlFor="inputSearch" className="sidebar-label">
        Filter by Input
      </label>
      <input
        id="inputSearch"
        type="text"
        placeholder="Search input type..."
        className="sidebar-input"
        value={inputSearchTerm}
        onChange={(e) => setInputSearchTerm(e.target.value)}
      />

      <ul className="sidebar-dropdown-list">
        {filteredInputs.length > 0 ? (
          filteredInputs.map((inputVal, idx) => (
            <li
              key={idx}
              className={`sidebar-dropdown-item ${
                inputFilter === inputVal ? "active" : ""
              }`}
              onClick={() => {
                setInputFilter(inputVal);  // Set the selected filter
                setInputSearchTerm('');  // Clear the search term when a filter is selected
              }}
            >
              {inputVal}
            </li>
          ))
        ) : (
          <li className="sidebar-dropdown-item disabled">No matches found</li>
        )}
      </ul>

     
    </div>
  );
};

export default SearchDropdown;
