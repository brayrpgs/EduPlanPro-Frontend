import React, { useState } from "react";
import OpenSideBar from "../icons/AsideIcons/OpenSideBar";
import CloseSideBar from "../icons/AsideIcons/CloseSideBar";
import AccountCircleAdmin from "../icons/AsideIcons/AccountCircleAdmin";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ShowMore from "../icons/AsideIcons/ShowMore";
import ShowLess from "../icons/AsideIcons/ShowLess";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPeople, setShowPeople] = useState(false);
  const [showAdminModules, setShowAdminModules] = useState(false);
  const [showPeopleIcon, setShowPeopleIcon] = useState(false);
  const [showAdminModulesIcon, setShowAdminModulesIcon] = useState(false);

  const [iconColor, setIconColor] = useState({
    people: "black",
    adminModules: "black",
  });

  const handleMouseEnter = (icon) => {
    setIconColor((prevState) => ({
      ...prevState,
      [icon]: "white",
    }));
  };

  const handleMouseLeave = (icon) => {
    setIconColor((prevState) => ({
      ...prevState,
      [icon]: "black",
    }));
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Quieres cerrar la sesión?",
      text: "¿Estás seguro de que quieres cerrar la sesión?",
      icon: "warning",
      showCancelButton: true,
      iconColor: "#A31E32",
      confirmButtonColor: "#A31E32",
      cancelButtonColor: "#2b3843",
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
    <div className="flex relative w-[2vw] h-[3vh] z-40 ">
      <button onClick={() => setIsOpen(true)}>
        <OpenSideBar />
      </button>

      <div
        className={`${
          !isOpen && "hidden"
        } bg-gray-600/50 min-h-screen w-full flex fixed top-0 right-0 left-0 backdrop-blur-[0.2vh]`}
        onClick={() => {
          setIsOpen(false);
          setShowPeople(false);
          setShowAdminModules(false);
          setShowPeopleIcon(false);
          setShowAdminModulesIcon(false);
        }}
      ></div>

      <div
        className={`${
          isOpen ? "w-[17vw] border-[0.3vh] transition-[width] duration-300 border-UNA-Blue-Light/80 " : "w-[0%] transition-[width] duration-300"
        } bg-white min-h-screen top-0 right-0 fixed select-none transition-[width] duration-300`}
      >
        <div className={`${!isOpen && "hidden"}`}>
          <div className="flex fixed w-[2vw] h-[3vh] right-[2vh] top-[2.5vh]">
            <button
              onClick={() => {
                setIsOpen(false);
                setShowPeople(false);
                setShowAdminModules(false);
                setShowPeopleIcon(false);
                setShowAdminModulesIcon(false);
              }}
            >
              <CloseSideBar />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center w-[13vw] h-[17vh] mt-[4vh]">
              <AccountCircleAdmin />
            </div>

            <div className="flex justify-center overflow-hidden w-[80%] transition-none">
              <h1 className="text-[1.3vw] truncate">Usuario Administrador</h1>
            </div>
          </div>

          <div className="transition-none text-center text-[1vw] cursor-pointer py-[1vh] mt-[2vh] hover:bg-UNA-Red hover:text-white">
            Mi perfil
          </div>
          <div className="transition-none text-center text-[1vw] cursor-pointer py-[1vh] mt-[1vh] hover:bg-UNA-Red hover:text-white">
            Cambiar clave
          </div>
          <div className="transition-none text-center text-[1vw] cursor-pointer py-[1vh] mt-[1vh] hover:bg-UNA-Red hover:text-white">
            Preferencias
          </div>
          <div
            className={`transition-none text-center text-[1vw] flex flex-row items-center justify-center cursor-pointer py-[1vh] mt-[1vh] 
              ${showPeople || "group-hover:bg-UNA-Red"} ${
              showPeople
                ? "bg-UNA-Red text-white"
                : "hover:bg-UNA-Red hover:text-white"
            }`}
            onClick={() => {
              setShowPeople(!showPeople);
              setShowPeopleIcon(!showPeopleIcon);
            }}
            onMouseEnter={() => handleMouseEnter("people")}
            onMouseLeave={() => handleMouseLeave("people")}
          >
            Personas
            <span className="absolute flex ml-[12vh] h-[3vh] group-hover:fill-black">
              {!showPeopleIcon ? (
                <ShowMore fill={showPeople ? "white" : iconColor.people} />
              ) : (
                <ShowLess fill={showPeople ? "white" : iconColor.people} />
              )}
            </span>
          </div>
          {showPeople && (
            <div className="justify-center items-center flex flex-col text-[0.9vw] py-[0.5vh] mt-[0.5vh]">
              <ul className="list-disc list-inside flex flex-col items-center w-full">
                <li
                  className="hover:bg-UNA-Gray py-[0.5vh] px-[1vw] w-full text-center cursor-pointer
                "
                  onClick={() => navigate("/user")}
                >
                  Usuarios
                </li>
                <li
                  className="hover:bg-UNA-Gray py-[0.5vh] px-[1vw] w-full text-center cursor-pointer"
                  onClick={() => navigate("/teacher")}
                >
                  Profesores
                </li>
              </ul>
            </div>
          )}
          <div
            className={`transition-none text-center text-[1vw] flex flex-row items-center justify-center cursor-pointer py-[1vh] mt-[1vh] 
              ${showAdminModules || "group-hover:bg-UNA-Red"} ${
              showAdminModules
                ? "bg-UNA-Red text-white"
                : "hover:bg-UNA-Red hover:text-white"
            }`}
            onClick={() => {
              setShowAdminModules(!showAdminModules);
              setShowAdminModulesIcon(!showAdminModulesIcon);
            }}
            onMouseEnter={() => handleMouseEnter("adminModules")}
            onMouseLeave={() => handleMouseLeave("adminModules")}
          >
            Modulos administrativos
            <span className="transition-none absolute flex ml-[27vh] h-[3vh] group-hover:fill-black">
              {!showAdminModulesIcon ? (
                <ShowMore
                  fill={showAdminModules ? "white" : iconColor.adminModules}
                />
              ) : (
                <ShowLess
                  fill={showAdminModules ? "white" : iconColor.adminModules}
                />
              )}
            </span>
          </div>
          {showAdminModules && (
            <div className="transition-none justify-center items-center flex flex-col text-[0.9vw] py-[0.5vh] mt-[0.5vh]">
              <ul className="list-disc list-inside flex flex-col items-start w-full">
                <li
                  className="hover:bg-UNA-Gray py-[0.5vh] px-[1vw] w-full text-center cursor-pointer"
                  onClick={() => navigate("/faculty")}
                >
                  Facultades
                </li>
                <li
                  className="hover:bg-UNA-Gray py-[0.5vh] px-[1vw] w-full text-center cursor-pointer"
                  onClick={() => navigate("/school")}
                >
                  Escuelas
                </li>
              </ul>
            </div>
          )}

          <div
            className="transition-none text-center text-[1vw] cursor-pointer py-[1vh] mt-[1vh] hover:bg-UNA-Red hover:text-white"
            onClick={handleLogout}
          >
            Salir
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
