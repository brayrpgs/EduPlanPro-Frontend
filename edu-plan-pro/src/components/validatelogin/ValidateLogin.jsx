import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading.jsx";

const ValidateLogin = ({ Component }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
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
    
    validatelogin(); // Llama a validatelogin
  }, [navigate]);

  if (loading) {
    return <Loading />; 
  }

  return isLoggedIn ? <Component /> : null;
};

export default ValidateLogin;
