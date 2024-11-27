import React, { useState } from "react";
import LoginFinalLogo from "../icons/LoginIcons/LoginFinalLogo.jsx";
import LoginButtonEnter from "../icons/LoginIcons/LoginButtonEnter.jsx";
import LoginButtonHelp from "../icons/LoginIcons/LoginButtonHelp.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer.js";

export const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = async (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = () => {
    login(form.username, form.password);
  };

  const login = async (username, password) => {
    const url = "http://localhost:3001/session";

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
    } else {
      try {
        const response = await axios.post(
          url,
          {
            idcard: username,
            password: password,
          },
          {
            withCredentials: true,
          }
        );

        if (response.data.code === "200") {
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
      }
    }
  };

  return (
    <div>
      <header>
        <nav className="bg-UNA-Red h-16"></nav>
      </header>

      <div className="mt-20 flex justify-center items-center w-full ">
        <div className="bg-white p-14 text-center shadow-md  w-96 relative">
          <div className="relative">
            <LoginFinalLogo />
          </div>

          <div className="relative mb-3 mt-2">
            <input
              className="w-full mt-6 pb-1 pt-3 text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-transparent peer"
              title="Nombre de usuario"
              name="username"
              id="username"
              type="text"
              autoComplete="username"
              placeholder=" "
              onChange={handleChange}
              pattern="^(?!\s*$).+"
              required
            />

            <label
              className="absolute left-0 top-9 text-gray-400 cursor-text peer-focus:text-UNA-Red duration-300 peer-focus:text-sm peer-focus:-translate-y-5 peer-valid:text-sm peer-valid:-translate-y-5 peer-valid:text-UNA-Red"
              id="Lusername"
              htmlFor="username"
            >
              Nombre de usuario *
            </label>
            <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-UNA-Red transition-all duration-300 ease-in-out peer-focus:w-full peer-focus:left-0"></div>
          </div>

          <div className="relative mb-3 mt-2">
            <input
              className="w-full mt-6 pb-1 pt-3 text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-transparent peer"
              title="Contraseña"
              name="password"
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder=" "
              pattern="^(?!\s*$).+"
              onChange={handleChange}
              required
            />
            <label
              className="absolute left-0 top-9 text-gray-400 cursor-text peer-focus:text-UNA-Red duration-300 peer-focus:text-sm peer-focus:-translate-y-5 peer-valid:text-sm peer-valid:-translate-y-5 peer-valid:text-UNA-Red"
              id="Lpassword"
              htmlFor="password"
            >
              Contraseña *
            </label>
            <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-UNA-Red transition-all duration-300 ease-in-out peer-focus:w-full peer-focus:left-0"></div>
          </div>

          <div className="relative mb-3 mt-2">
            <button
              className="mt-9 bg-UNA-Red text-white w-full p-2 rounded cursor-pointer hover:bg-Focus-Login-Red"
              onClick={handleLogin}
            >
              <div className="translate-x-3 -translate-y-1 scale-150">
                <LoginButtonEnter />
              </div>
              <span className="">Ingresar</span>
            </button>
          </div>

          <div className="relative mb-3 mt-2">
            <a href="/login" className="mt-3 block bg-UNA-Gray text-white w-full p-2 rounded cursor-pointer hover:bg-UNA-Gray-Dark">
            <div className="translate-x-3 -translate-y-1 scale-150">
            <LoginButtonHelp />
            </div>
              
              Olvidé mi contraseña
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
