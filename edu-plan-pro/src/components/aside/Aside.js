import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import accountCircle from "../images/account_circle.svg";
import menuIcon from "../icons/AsideIcons/MenuWhite.svg";
import closeIcon from "../icons/AsideIcons/CloseBlack.svg";
import Swal from "sweetalert2";
import "./Aside.css";

const Aside = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleAside = () => {
    setIsOpen(!isOpen);
  };
  // nombre de la funcion que se llama en el boton para cerrar
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Quieres cerrar la sesión?",
      text: "¿Estás seguro de que quieres cerrar la sesión?",
      icon: "warning",
      showCancelButton: true,
      iconColor: "#A31E32",
      confirmButtonColor: "#A31E32",
      cancelButtonColor: "#2B3843",
      confirmButtonText: "Cerrar la sesión",
      cancelButtonText: "Cancelar",

      customClass: {
        confirmButton: "swal-button-largeV1",
        cancelButton: "swal-button-largeV1",
      },
    });
    //llama a la funcion del backend y cierra
    if (result.isConfirmed) {
      try {
        const response = await fetch("http://localhost:3001/session", {
          method: "DELETE",
          credentials: "include",
        });

        const data = await response.json();

        if (data.code === "200") {
          await Swal.fire({
            showConfirmButton: false,
            title: "Cerrando sesión...",
            timer: 1300,
            timerProgressBar: true,
            willOpen: () => {
              Swal.showLoading();
            },         

          });
          navigate("/login");
        } else {
          Swal.fire(
            "Error",
            "Hubo un problema al cerrar la sesión. Inténtelo de nuevo más tarde.",
            "error"
          );
        }
      } catch (error) {
        Swal.fire(
          "Error",
          "Hubo un problema de conexión. Inténtelo de nuevo.",
          "error"
        );
      }
    }
  };

  return (
    <>
      <button className="aside-toggle" onClick={toggleAside}>
        <img
          src={isOpen ? closeIcon : menuIcon}
          alt={isOpen ? "Close Menu" : "Open Menu"}
          style={{ width: "20px", height: "20px" }}
        />
      </button>
      <aside
        className={`d-flex flex-column bg-light p-3 aside ${
          isOpen ? "open" : ""
        }`}
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
                cursor: "pointer",
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
                cursor: "pointer",
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
                cursor: "pointer",
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
                cursor: "pointer",
              }}
              onClick={handleLogout}
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
