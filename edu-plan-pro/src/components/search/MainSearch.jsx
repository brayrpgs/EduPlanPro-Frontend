import React from "react";
import SearchIcon from "../icons/SearchIcons/SearchIcon";
import SearchOffIcon from "../icons/SearchIcons/SearchOffIcon";


export function MainSearch({ onSearch, placeholder, title, mainFilter, setMainFilter }) {
  
  const handleInputChange = (e) => {
    setMainFilter(e.target.value);
  };

  const handleSearch = () => {
    if(onSearch){
      onSearch(mainFilter);
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && onSearch) {
      onSearch(mainFilter);
    }
  };

  return (
    <div className="flex bg-UNA-Blue-Dark items-center relative rounded-[1vh] py-[1vh] pr-[0.5vw] pl-[0.2vw] w-[100%] h-[3.8vh] border-none mt-[1vh] mb-[1vh]">
      
      <div className="flex grow bg-UNA-Red relative w-full h-[2.9vh] rounded-l-[0.5vh]">
        <input
          autoComplete="off"
          spellCheck="false"
          title={title}
          type="text"
          placeholder={placeholder}
          value={mainFilter}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          className="flex pr-[1.6vw] pl-[1vw] h-full bg-UNA-Red rounded-tl-[1vh] rounded-bl-[1vh] text-[0.9vw] text-white placeholder-white w-full outline-none border-none z-20 shadow-none text-left "
        />
        <div className="absolute flex w-full h-full justify-end">
          {mainFilter && (
            <button
              className="bg-transparent border-none z-20 mr-[0.1vw]"
              title="Borrar búsqueda"
              onClick={() => {setMainFilter('')}}
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
