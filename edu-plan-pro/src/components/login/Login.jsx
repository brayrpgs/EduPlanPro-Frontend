import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate.js";
import LoginFinalLogo from "../icons/LoginIcons/LoginFinalLogo.jsx";
import LoginButtonEnter from "../icons/LoginIcons/LoginButtonEnter.jsx";
import LoginButtonHelp from "../icons/LoginIcons/LoginButtonHelp.jsx";
import Swal from "sweetalert2";
import LoginHeader from "./LoginHeader.jsx";
import Footer from "../footer/Footer.jsx";
import Loading from "../componentsgeneric/Loading.jsx";

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const cleanedValue = value.replace(/^\s*|\s*$/g, "");
    e.target.value = cleanedValue;

    setForm({
      ...form,
      [name]: cleanedValue,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(form.username, form.password);
  };

  const login = async (username, password) => {
    if (username.trim() === "" || password.trim() === "") {
      Swal.fire({
        title: "¡Datos incompletos!",
        text: `Por favor, ingresa un nombre de usuario y una contraseña.`,
        icon: "warning",
        iconColor: "#0C71C3",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
        customClass: {
          confirmButton: "custom-confirm-button",
        },
      });

      document.getElementById("Lusername").style.color = "#E62A10";
      document.getElementById("Lpassword").style.color = "#E62A10";

      setTimeout(() => {
        document.getElementById("Lusername").style.color = "";
        document.getElementById("Lpassword").style.color = "";
      }, 3000);
    } else {

      const url = "http://localhost:3001/session";

      const body = {
        idcard: username,
        password: password,
      };

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      };

      try {
        
        setLoading(true);
        const response = await FetchValidate(url, options, navigate);

        if(!response){
          setLoading(false);
          return; // Hubo un error y se evita seguir con el flujo
        }

        if (response.code === "200") {
          Swal.fire({
            title: "Acceso válido.",
            icon: "success",
            iconColor: "#7CDA24",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/coursesPlan");
            }
          });
        } else {
          Swal.fire({
            title: "Acceso inválido.",
            text: `Por favor, inténtelo de nuevo.`,
            icon: "error",
            iconColor: "#A31E32",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          });
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen ">
      <LoginHeader />

      <main>
        <div className="mt-[5vh] justify-center items-center h-[80vh] flex flex-col">
          <div className="w-[25%] h-[90%] bg-white text-center shadow-[0_0.5vh_1vh_rgba(0,0,0,0.5)] relative">
            <div className="h-[25%] mt-[5vh]">
              <LoginFinalLogo />
            </div>

            {["username", "password"].map((field) => (
              <div
                key={field}
                className="relative mt-[5vh] w-full h-[4vh] flex justify-center items-center"
              >
                <input
                  className="w-[65%] p-[1%] h-full text-[1vw] text-gray-900 bg-transparent border-b-[0.2vh] border-gray-300
                    focus:outline-none focus:border-transparent peer box-border"
                  title={
                    field === "username" ? "Nombre de usuario" : "Contraseña"
                  }
                  name={field}
                  id={field}
                  type={field === "username" ? "text" : "password"}
                  autoComplete={
                    field === "username" ? "username" : "current-password"
                  }
                  placeholder=" "
                  onChange={handleChange}
                  pattern="^(?!\s*$).+"
                  required
                />
                <label
                  className="absolute text-[2vh] left-[18%] text-gray-400 cursor-text peer-focus:text-UNA-Red 
                    peer-focus:text-[2vh] peer-focus:-translate-y-[3vh] peer-valid:-translate-y-[3vh]
                    peer-focus:translate-x-[0.5vh] peer-valid:translate-x-[0.5vh]  
                    peer-valid:text-[2vh] peer-valid:text-UNA-Red ease-in-out 
                    peer-focus:duration-300 peer-focus:transition-transform peer-focus:ease-in-out
                    transition-transform duration-300"
                  id={`L${field}`}
                  htmlFor={field}
                >
                  {field === "username" ? "Nombre de usuario" : "Contraseña"} *
                </label>
                <div
                  className="absolute bottom-0 left-[50%] w-0 h-[0.2vh] bg-UNA-Red transition-width duration-300 ease-in-out 
                    peer-focus:w-[65%] peer-focus:left-[18%]"
                ></div>
              </div>
            ))}

            <div className="relative mt-[8vh] flex justify-center">
              <button
                className="w-[65%] h-[5vh] bg-UNA-Red rounded-[1vh] text-white text-[2vh] cursor-pointer hover:bg-Focus-Login-Red"
                onClick={handleLogin}
                title="Ingresar"
              >
                <div className="flex items-center w-full h-full justify-center">
                  <div className="absolute h-full w-[2vw] left-[18%]">
                    <LoginButtonEnter className="w-full h-full scale-90 ml-[25%]" />
                  </div>
                  <span>Ingresar</span>
                </div>
              </button>
            </div>

            <div className="relative mt-[2vh] flex justify-center">
              <a
                href="/login"
                title="Olvidé mi contraseña"
                className="w-[65%] h-[5vh] bg-UNA-Gray rounded-[1vh] text-white text-[2vh] cursor-pointer hover:bg-UNA-Gray-Dark"
              >
                <div className="flex items-center w-full h-full justify-center">
                  <div className="absolute h-full w-[2vw] left-[18%]">
                    <LoginButtonHelp className="w-full h-full scale-90 ml-[25%]" />
                  </div>
                  <span>Olvidé mi contraseña</span>
                </div>
              </a>
            </div>
          </div>
        </div>
            
        {loading && <Loading/>}
      </main>

      <Footer />
    </div>
  );
};

export default Login;
