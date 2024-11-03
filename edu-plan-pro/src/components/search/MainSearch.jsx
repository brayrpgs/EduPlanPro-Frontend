import React, { useState } from "react";
import SearchIcon from "../icons/SearchIcons/SearchIcon";
import SearchOffIcon from "../icons/SearchIcons/SearchOffIcon";
import "./MainSearch.css";

export function MainSearch({ onSearch, placeholder }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleBlur = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && onSearch) {
      onSearch(query);
    }
  };

  const handleClearSearch = () => {
    setQuery('');
  };

  const handleIconClick = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="mainSearch-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        className="mainSearch-input"
      />
      {query && (
        <button
          onClick={handleClearSearch}
          className="mainSearchclear-button"
          title="Borrar búsqueda"
        >
          <SearchOffIcon />
        </button>
      )}
      <div className="mainSearch-icon" title="Buscar" onClick={handleIconClick}>
        <SearchIcon />
      </div>
    </div>
  );
}

export default MainSearch;
