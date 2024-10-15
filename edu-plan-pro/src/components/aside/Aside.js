import React, { useState } from "react";
import accountCircle from "../images/account_circle.svg";
import "./Aside.css";

const Aside = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAside = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="aside-toggle" onClick={toggleAside}>
        {isOpen ? "X" : "☰"}
      </button>
      <aside
        className={`d-flex flex-column bg-light p-3 aside ${
          isOpen ? "open" : ""
        }`}
      >
        <div className="mb-4 d-flex flex-column align-items-center text-center">
          <a href="#" className="nav-link active">
            <img
              src={accountCircle}
              alt="Profile"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          </a>
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
            <a
              href="#"
              style={{
                color: "black",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Mi perfil
            </a>
          </li>
          <li className="nav-item mb-3">
            <a
              href="#"
              style={{
                color: "black",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Cambiar Clave
            </a>
          </li>
          <li className="nav-item mb-3">
            <a
              href="#"
              style={{
                color: "black",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Preferencias
            </a>
          </li>
          <li className="nav-item mb-3">
            <a
              href="#"
              style={{
                color: "black",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Salir
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Aside;
