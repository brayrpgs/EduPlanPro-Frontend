import { useEffect } from "react";
import { useAtom } from "jotai";
import { preference } from "../validatelogin/ValidateLogin.jsx";

export const useThemePreferences = () => {
  const [prefs] = useAtom(preference);

  useEffect(() => {
    if (!prefs) return;

    const removeBodyClassesByPrefix = (prefixes) => {
      document.body.classList.forEach((cls) => {
        if (prefixes.some((prefix) => cls.startsWith(prefix))) {
          document.body.classList.remove(cls);
        }
      });
    };

    removeBodyClassesByPrefix([
      "light-theme",
      "dark-theme",
      "font-",
      "header-UNA-",
      "icon-size-",
    ]);

    const themeClass = prefs.theme === "dark" ? "dark-theme" : "light-theme";
    document.body.classList.add(themeClass);

    const fontSizeClass =
      prefs.size_font === "Big"
        ? "font-large"
        : prefs.size_font === "Small"
        ? "font-small"
        : "font-medium";

    document.body.classList.add(fontSizeClass);

    if (prefs.icon_size === "Big") {
      document.body.classList.add("icon-size-big");
    } else if (prefs.icon_size === "Small") {
      document.body.classList.add("icon-size-small");
    }

    const headerColorMap = {
      Blue: "UNA-Blue-Light",
      "Dark Blue": "UNA-Blue-Dark",
      Green: "UNA-Green-Light",
      Yellow: "UNA-Yellow",
      default: "UNA-Red",
    };

    const headerColorClass = `header-${
      headerColorMap[prefs.header_footer_color] || headerColorMap.default
    }`;
    document.body.classList.add(headerColorClass);

    const fontFamilyMap = {
      "Times New Roman": `"Times New Roman", serif`,
      Playfair: `"Playfair Display SC", Georgia, "Times New Roman", serif`,
      "Cedarville Cursive": `"Cedarville Cursive", cursive`,
    };

    const font = fontFamilyMap[prefs.font] || `"Playfair Display SC", Georgia`;

    const getFontMultiplier = (size) => {
      if (size === "font-large") return 1.2;
      if (size === "font-small") return 0.85;
      return 1;
    };

    const multiplier = getFontMultiplier(fontSizeClass);

    let styleEl = document.getElementById("font-size-styles");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "font-size-styles";
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = `
      body {
        font-family: ${font} !important;
      }

      body.${fontSizeClass} h1 { font-size: calc(2vw * ${multiplier}) !important; }
      body.${fontSizeClass} h2 { font-size: calc(1.2vw * ${multiplier}) !important; }
      body.${fontSizeClass} p { font-size: calc(0.9vw * ${multiplier}) !important; }

      body.${fontSizeClass} [class*="text-[2vw]"] { font-size: calc(2vw * ${multiplier}) !important; }
      body.${fontSizeClass} [class*="text-[1.2vw]"] { font-size: calc(1.2vw * ${multiplier}) !important; }
      body.${fontSizeClass} [class*="text-[0.9vw]"] { font-size: calc(0.9vw * ${multiplier}) !important; }

      body.${fontSizeClass} .text-blue-600 { font-size: calc(0.9vw * ${multiplier}) !important; }
    `;
  }, [prefs]);

  return { prefs };
};
