import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate.js";
import Loading from "../componentsgeneric/Loading.jsx";

const ValidateLogin = ({ Login }) => {
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validatemain = async () => {
      const url = "http://localhost:3001/session";

      const options = {
        method: "GET",
        credentials: "include",
      };

      try {
        const response = await FetchValidate(url, options, navigate);

        if (response.code === "200") {
          setFlag(false);
          navigate("/dashboard");
        } else {
          setFlag(true);
        }
      } catch (error) {
        navigate("/serverError"); // Si hay error, redirige a una página específica

      } finally {
        setLoading(false); 
      }
    };

    validatemain();
  }, [navigate]);

  if (loading) {
    return <Loading />; 
  }

  return flag ? <Login /> : null;
};

export default ValidateLogin;
