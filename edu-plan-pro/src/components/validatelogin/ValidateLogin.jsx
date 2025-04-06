import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading.jsx";
import { atom, useAtom } from 'jotai';

export const preference = atom([
  {
    font: 'Playfair Display SC',
    size_font: 'Medium',
    header_footer_color: 'Red',
    icon_size: 'Medium',
    theme: 'light',
  }])

const ValidateLogin = ({ Component }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [prefs, setPrefs] = useAtom(preference);
  const navigate = useNavigate();

  useEffect(() => {
    const validatelogin = async () => {
      const url = "http://localhost:3001/session";

      const options = {
        method: "GET",
        credentials: "include",
      };

      try {
        const response = await FetchValidate(url, options, options);

        if (response.code === "200") {
          setIsLoggedIn(true); // Sesión válida
        } else {
          navigate("/login"); // Sin sesión, redirige al login
        }
      } catch (error) {
        navigate("/serverError"); // Si hay error, redirige a una pagina especifica

      } finally {
        setLoading(false); 
      }
    };

    const loadPreferences = async () => {
      const url = "http://localhost:3001/preferences";
      const options = {
        method: "GET",
        credentials: "include",
      };
      
      try {
        const response = await FetchValidate(url, options, navigate);
        
        if (response && response.data && response.data.length > 0) {
          // Asignar preferencias a prefs
          setPrefs(response.data[0]);
        }
        
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    };
    
    validatelogin(); // Llama a validatelogin
    loadPreferences();
  }, [navigate,setPrefs]);

  if (loading) {
    return <Loading />; 
  }

  return isLoggedIn ? <Component /> : null;
};

export default ValidateLogin;
