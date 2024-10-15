import React, { useState } from "react";
import LoginIcon from "../icons/LoginIcons/LoginIcon.jsx";
import LoginButtonEnter from "../icons/LoginIcons/LoginButtonEnter.jsx";
import LoginButtonHelp from "../icons/LoginIcons/LoginButtonHelp.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import "./Login.css";

export const Login = () => {

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
    const url = "http://localhost:3001/login"; //Cambiar el endpoint por session 

    if (username.trim() === "" || password.trim() === "") {
      Swal.fire({
        title: "¡Datos incompletos!",
        text: `Por favor, ingresa un nombre de usuario y una contraseña.`,
        icon: "info",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#CD1719",
      });

      document.getElementById('Lusername').style.color = "#E62A10";
      document.getElementById('Lpassword').style.color = "#E62A10";

    } else {
      try {
        const response = await axios.post(url, {
          idcard: username,
          password: password,
        });

        if (response.data.code === "200") {
          
          Swal.fire({
            title: "Acceso válido.",
            text: `Por favor, no inténtelo de nuevo.`,
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#CD1719",
          });

        } else {

          Swal.fire({
            title: "Acceso inválido.",
            text: `Por favor, inténtelo de nuevo.`,
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#CD1719",
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
        <nav className="navbar"></nav>
      </header>

      <div className="container">
        <div className="login-box">
          <div className="login-logo">
            <LoginIcon />
          </div>

          <div className="input">
            <input
              title="Nombre de usuario"
              name="username"
              id="username"
              type="text"
              autoComplete="username"
              placeholder=" "
              onChange={handleChange}
              required
            />
            <label id="Lusername" htmlFor="username">Nombre de usuario *</label>
          </div>
          <div className="input">
            <input
              title="Contraseña"
              name="password"
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder=" "
              onChange={handleChange}
              required
            />
            <label id="Lpassword" htmlFor="password">Contraseña *</label>
          </div>

          <button className="btn" onClick={handleLogin}>
            <LoginButtonEnter />
            <span className="button-text">Ingresar</span>
          </button>
          <a href="#" className="forgot-password">
            <LoginButtonHelp />
            Olvidé mi contraseña
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
