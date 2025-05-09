import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading.jsx";
import { atom, useAtom } from "jotai";

// Átomos exportados
export const userAtom = atom(null);

export const preference = atom([
  {
    font: "Playfair Display SC",
    size_font: "Medium",
    header_footer_color: "Red",
    icon_size: "Medium",
    theme: "light",
  },
]);

const ValidateLogin = ({ Component }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [, setPrefs] = useAtom(preference); // Solo usamos setPrefs
  const [, setUser] = useAtom(userAtom);    // Usamos setUser para guardar ID_USER
  const navigate = useNavigate();

  useEffect(() => {
    const validatelogin = async () => {
      const url = "http://localhost:3001/session";

      const options = {
        method: "GET",
        credentials: "include",
      };

      try {
        const response = await FetchValidate(url, options, navigate);

        console.log(" Respuesta de sesión:", response);

        if (response.code === "200") {
          setIsLoggedIn(true); // Sesión válida
          setUser({ ID_USER: response.data.ID_USER }); // Guardar ID del usuario logueado
        } else {
          navigate("/login"); // Sin sesión, redirige al login
        }
      } catch (error) {
        navigate("/serverError"); // Redirige si hay error de conexión
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
          setPrefs(
            response.data[0].PREFERENCIAS || {
              font: "Playfair Display SC",
              size_font: "Medium",
              header_footer_color: "Red",
              icon_size: "Medium",
              theme: "light",
            }
          );
        } else {
          setPrefs({
            font: "Playfair Display SC",
            size_font: "Medium",
            header_footer_color: "Red",
            icon_size: "Medium",
            theme: "light",
          });
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
        setPrefs({
          font: "Playfair Display SC",
          size_font: "Medium",
          header_footer_color: "Red",
          icon_size: "Medium",
          theme: "light",
        });
      }
    };

    validatelogin();
    loadPreferences();
  }, [navigate, setPrefs, setUser]);

  if (loading) {
    return <Loading />;
  }

  return isLoggedIn ? <Component /> : null;
};

export default ValidateLogin;
