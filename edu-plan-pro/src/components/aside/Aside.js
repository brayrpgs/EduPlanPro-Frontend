import React, { useState } from "react";
import accountCircle from "../images/account_circle.svg";
import menuIcon from '../icons/AsideIcons/MenuWhite.svg';
import closeIcon from '../icons/AsideIcons/CloseBlack.svg';
import "./Aside.css";

const Aside = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAside = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="aside-toggle" onClick={toggleAside}>
        <img
          src={isOpen ? closeIcon : menuIcon}
          alt={isOpen ? "Close Menu" : "Open Menu"}
          style={{ width: "20x", height: "20px" }}
        />
      </button>
      <aside
        className={`d-flex flex-column bg-light p-3 aside ${isOpen ? "open" : ""}`}
      >
        <div className="mb-4 d-flex flex-column align-items-center text-center">
          <img
            src={accountCircle}
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          <h2
            className="mb-1 fs-6"
            style={{
              color: "black",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Adan Carranza
          </h2>
        </div>

        <ul className="nav flex-column text-center">
          <li className="nav-item mb-3">
            <button
              className="btn-link"
              style={{
                color: "black",
                fontWeight: "bold",
                textDecoration: "none",
                background: "none",
                border: "none",
                cursor: "pointer"
              }}
            >
              Mi perfil
            </button>
          </li>
          <li className="nav-item mb-3">
            <button
              className="btn-link"
              style={{
                color: "black",
                fontWeight: "bold",
                textDecoration: "none",
                background: "none",
                border: "none",
                cursor: "pointer"
              }}
            >
              Cambiar Clave
            </button>
          </li>
          <li className="nav-item mb-3">
            <button
              className="btn-link"
              style={{
                color: "black",
                fontWeight: "bold",
                textDecoration: "none",
                background: "none",
                border: "none",
                cursor: "pointer"
              }}
            >
              Preferencias
            </button>
          </li>
          <li className="nav-item mb-3">
            <button
              className="btn-link"
              style={{
                color: "black",
                fontWeight: "bold",
                textDecoration: "none",
                background: "none",
                border: "none",
                cursor: "pointer"
              }}
            >
              Salir
            </button>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Aside;
