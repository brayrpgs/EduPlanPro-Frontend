import React, { useState } from "react";
import SearchIcon from "../icons/SearchIcons/SearchIcon";
import SearchOffIcon from "../icons/SearchIcons/SearchOffIcon";


export function MainSearch({ onSearch, placeholder, title }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if(onSearch){
      onSearch(query);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="flex bg-UNA-Blue-Dark items-center relative rounded-[1vh] py-[1vh] pr-[0.5vw] pl-[0.2vw] w-[100%] h-[3.8vh] border-none mt-[1vh] mb-[1vh]">
      
      <div className="flex grow bg-UNA-Red relative w-full h-[2.9vh] rounded-l-[0.5vh]">
        <input
          spellCheck="false"
          title={title}
          type="text"
          placeholder={placeholder}
          value={query}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          className="flex pr-[1.6vw] pl-[1vw] h-full bg-UNA-Red rounded-tl-[1vh] rounded-bl-[1vh] text-[0.9vw] text-white placeholder-white w-full outline-none border-none z-20 shadow-none text-left "
        />
        <div className="absolute flex w-full h-full justify-end">
          {query && (
            <button
              className="bg-transparent border-none z-20 mr-[0.1vw]"
              title="Borrar búsqueda"
              onClick={() => {setQuery('')}}
            >
              <SearchOffIcon />
            </button>
          )}
        </div>
      </div>

      <div className="cursor-pointer h-full scale-150 ml-[0.5vw]"
        onClick={handleSearch}
       title="Buscar">
        <SearchIcon />
      </div>
    </div>
  );
}

export default MainSearch;
