import React, { useState } from "react";
import LoginIcon from "../icons/LoginIcons/LoginIcon.jsx";
import LoginButtonEnter from "../icons/LoginIcons/LoginButtonEnter.jsx";
import LoginButtonHelp from "../icons/LoginIcons/LoginButtonHelp.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import "./Login.css";

const users = [
  {
    id: 1,
    name: "Juan",
    lastname: "Pérez",
    username: "usuario1",
    password: "contraseña1", // Asegúrate de manejar las contraseñas de forma segura en una API real
  },
  {
    id: 2,
    name: "María",
    lastname: "Gómez",
    username: "usuario2",
    password: "contraseña2",
  },
  {
    id: 3,
    name: "Carlos",
    lastname: "López",
    username: "usuario3",
    password: "contraseña3",
  },
];

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
    //login(form.username, form.password);
    pb(form.username, form.password);
  };

  const pb = (username, password) => {
    console.log(password);
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    // Retornar un resultado basado en si se encontró o no el usuario
    if (user) {
    } else {
      if (username.trim() === "" || password.trim() === "") {
        Swal.fire({
          title: "!Datos incompletos!",
          text: `Por favor, ingresa un nombre de usuario y una contraseña.`,
          icon: "info",
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
    }
  };

  const login = async (username, password) => {
    const url = "";

    try {
      const response = await axios.get(url, {
        params: {
          username,
          password,
        },
      });

      console.log("Respuesta:", response.data);
    } catch (error) {
      console.error("Error en la solicitud:", error);
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
              name="username"
              id="username"
              type="text"
              autoComplete="username"
              placeholder=" "
              onChange={handleChange}
              required
            />
            <label htmlFor="username">Nombre de usuario *</label>
          </div>
          <div className="input">
            <input
              name="password"
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder=" "
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Contraseña *</label>
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
