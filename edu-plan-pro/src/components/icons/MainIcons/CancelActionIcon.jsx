import React from "react";

const CancelActionIcon = ({red}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="100%"
      viewBox="0 -960 960 960"
      width="100%"
      fill={red? "#d10000": "#1a1a1a"}
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
};

export default CancelActionIcon;
