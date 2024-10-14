import React from "react";
import LoginIcon from "../icons/LoginIcons/LoginIcon.jsx";
import LoginButtonEnter from "../icons/LoginIcons/LoginButtonEnter.jsx";
import LoginButtonHelp from "../icons/LoginIcons/LoginButtonHelp.jsx";
import "./Login.css";

export const Login = () => {
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
              id="username"
              type="text"
              autoComplete="username"
              placeholder=" "
              required
            />
            <label htmlFor="username">Nombre de usuario *</label>
          </div>
          <div className="input">
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder=" "
              required
            />
            <label htmlFor="password">Contraseña *</label>
          </div>

          <button className="btn">
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
