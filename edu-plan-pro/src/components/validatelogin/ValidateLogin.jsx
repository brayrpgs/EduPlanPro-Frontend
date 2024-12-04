import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ValidateLogin = ({ Component }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const validatelogin = async () => {
      try {
        const response = await fetch("http://localhost:3001/session", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (data.code === "200") {
          setIsLoggedIn(true); // Sesión válida
        } else {
          navigate("/login"); // Sin sesión, redirige al login
        }
      } catch (error) {
        navigate("/login"); // Si hay error, redirige a una pagina especifica
      }
    };

    validatelogin(); // Llama a validatelogin
  }, [navigate]);

  return isLoggedIn ? <Component /> : null;
};

export default ValidateLogin;
