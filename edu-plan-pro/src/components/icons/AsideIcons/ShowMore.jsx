import React from "react";

const ShowMore = ( { fill = "black" } ) => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="100%"
        viewBox="0 -960 960 960"
        width="100%"
        fill={fill}
      >
        <path d="M480-360 280-560h400L480-360Z" />
      </svg>
    </div>
  );
};

export default ShowMore;
