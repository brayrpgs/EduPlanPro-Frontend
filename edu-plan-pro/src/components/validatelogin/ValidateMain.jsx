import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate.js";

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
          navigate("/coursesPlan");
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
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="w-[5vw] h-[10vh] border-[0.5vw] border-t-[0.5vw] border-UNA-Red border-solid rounded-full animate-bounce"></div>
      </div>
    );
  }

  return flag ? <Login /> : null;
};

export default ValidateLogin;
