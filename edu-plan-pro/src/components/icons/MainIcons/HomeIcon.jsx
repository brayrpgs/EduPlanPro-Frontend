import React from "react";
import { useAtom } from "jotai";
import { preference } from "../../validatelogin/ValidateLogin.jsx";


function HomeIcon() {
const [prefs] = useAtom(preference);

const iconColor = 
prefs.header_footer_color === "Blue"
  ? "#0C71C3"  // UNA-Blue-Light
  : prefs.header_footer_color === "Dark Blue"
  ? "#2b3843"  // UNA-Blue-Dark
  : prefs.header_footer_color === "Green"
  ? "#7cda24"  // UNA-Green-Light
  : prefs.header_footer_color === "Yellow"
  ? "#FCBC6D"  // UNA-Yellow
  : "#a31e32"; // UNA-Red (valor predeterminado)

return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="75%"
        width="75%"
        viewBox="0 -960 960 960"
        fill={iconColor}
        className="text-black"
    >
        <path d="m 313 -440 l 224 224 l -57 56 l -320 -320 l 320 -320 l 57 56 l -224 224 h 487 v 80 H 313 Z" />
    </svg>
);
}

export default HomeIcon;