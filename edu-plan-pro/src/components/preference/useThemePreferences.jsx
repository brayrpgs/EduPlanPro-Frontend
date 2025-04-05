import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { preference } from '../validatelogin/ValidateLogin.jsx';

export const useThemePreferences = () => {
  const preferences = useAtomValue(preference)[0];
  useEffect(() => {

    document.body.classList.remove(
      'light-theme',
      'dark-theme',
      'font-small',
      'font-medium',
      'font-large',
      'header-UNA-Red',
      'header-UNA-Blue-Light',
      'header-UNA-Blue-Dark',
      'header-UNA-Green-Light',
      'header-UNA-Yellow',
      'icon-size-big',
      'icon-size-small'
    );

    const themeClass = preferences.theme === 'dark' ? 'dark-theme' : 'light-theme';
    document.body.classList.add(themeClass);

    let fontSizeClass = 'font-medium';

    if (preferences.size_font === 'Big') {
      fontSizeClass = 'font-large';
    } else if (preferences.size_font === 'Small') {
      fontSizeClass = 'font-small';
    }

    document.body.classList.add(fontSizeClass);

    if (preferences.icon_size === 'Big') {
      document.body.classList.add('icon-size-big');
    } else if (preferences.icon_size === 'Small') {
      document.body.classList.add('icon-size-small');
    }

    const headerColorClass = `header-${preferences.headear_footer_color === 'Blue' ? 'UNA-Blue-Light' :
      preferences.headear_footer_color === 'Dark Blue' ? 'UNA-Blue-Dark' :
        preferences.headear_footer_color === 'Green' ? 'UNA-Green-Light' :
          preferences.headear_footer_color === 'Yellow' ? 'UNA-Yellow' : 'UNA-Red'}`;
    document.body.classList.add(headerColorClass);


    const fontFamilyMap = {
      'Times New Roman': `"Times New Roman", serif`,
      'Playfair': `"Playfair Display SC", Georgia, "Times New Roman", serif`,
      'Cedarville Cursive': `"Cedarville Cursive", cursive`,
    };

    const font = fontFamilyMap[preferences.font] || `"Playfair Display SC", Georgia`;


    let styleEl = document.getElementById('font-size-styles');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'font-size-styles';
      document.head.appendChild(styleEl);
    }


    const multiplier =
      fontSizeClass === 'font-large' ? 1.2 :
        fontSizeClass === 'font-small' ? 0.85 :
          1;


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

  }, [preferences]);

  return { preferences };
};