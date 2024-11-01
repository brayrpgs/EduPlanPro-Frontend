import React, { useState } from "react";
import logo_final from '../images/logo_final.svg';
import LoginButtonEnter from "../icons/LoginIcons/LoginButtonEnter.jsx";
import LoginButtonHelp from "../icons/LoginIcons/LoginButtonHelp.jsx";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import Footer from "../footer/Footer.js";
import "./Login.css";

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
        icon: "info",
        confirmButtonText: "Aceptar",
        customClass: {
          confirmButton: 'custom-confirm-button'
        }
      });

      document.getElementById('Lusername').style.color = "#E62A10";
      document.getElementById('Lpassword').style.color = "#E62A10";

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
            confirmButtonText: "Aceptar",
            customClass: {
              confirmButton: 'custom-confirm-button',
              icon: 'custom-success-icon'
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
            confirmButtonText: "Aceptar",
            customClass: {
              confirmButton: 'custom-confirm-button',
              icon: 'custom-error-icon'
            }
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

      <div className="login-container">
        <div className="login-box">
          <div className="login-logo">
          <img className="img" src={logo_final} alt="Login Icon" />
          </div>

          <div className="input">
            <input className="inputT"
              title="Nombre de usuario"
              name="username"
              id="username"
              type="text"
              autoComplete="username"
              placeholder=" "
              onChange={handleChange}
              required
            />
            <label className="label" id="Lusername" htmlFor="username">Nombre de usuario *</label>
          </div>
          <div className="input">
            <input className="inputT"
              title="Contraseña"
              name="password"
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder=" "
              onChange={handleChange}
              required
            />
            <label className="label" id="Lpassword" htmlFor="password">Contraseña *</label>
          </div>

          <button className="btn" onClick={handleLogin}>
            <LoginButtonEnter />
            <span className="button-text">Ingresar</span>
          </button>
          <a href="/login" className="forgot-password">
            <LoginButtonHelp />
            Olvidé mi contraseña
          </a>
        </div>
      </div>

      <Footer/>

    </div>
  );
};

export default Login;
