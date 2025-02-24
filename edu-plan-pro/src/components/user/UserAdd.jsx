import React, { useState } from "react";
import AddIcon from "../icons/CrudIcons/AddIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading";

const UserAdd = ({ totalItems, currentPage, loadData, textToAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    secName: "",
    idcard: "",
    idRol: "",
    pass: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [roles, setRoles] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3001/rol", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === "200") {
          setRoles(data.data);
        }
      })
      .catch((error) => console.error("Error al cargar los roles:", error));
  }, []);

  const finallyActions = () => {
    const remainingItems = totalItems + 1;
    const lastPage = Math.ceil(remainingItems / 8);
    const newPage = Math.min(currentPage, lastPage);
    loadData(newPage);
    setIsOpen(false);
    setUserData({ name: "", secName: "", idcard: "", idRol: "", pass: "" });
  };

  const closeActions = () => {
    setIsOpen(false);
    setUserData({ name: "", secName: "", idcard: "", idRol: "", pass: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validateData = () => {
    const patternString = /^[A-Za-zÁ-ÿ\s]*$/;
    const patternStringIdCard = /^(?=.*\d)[A-Za-zÁ-ÿ0-9]+$/;
    const selectOption = document.getElementById("idRol");

    if (
      userData.name === "" ||
      userData.secName === "" ||
      userData.idcard === "" ||
      userData.pass === ""
    ) {
      Swal.fire({
        icon: "error",
        iconColor: "#A31E32",
        title: "No se pudo agregar el usuario",
        text: "Los campos del formulario no pueden ir vacíos, completa todos los campos e intenta de nuevo.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    } else if (selectOption.value === "") {
      Swal.fire({
        icon: "error",
        iconColor: "#A31E32",
        title: "No se pudo agregar el usuario",
        text: "Ningún rol ha sido seleccionado. Por favor, elige uno y vuelve a intentarlo.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    } else if (!patternString.test(userData.name)) {
      Swal.fire({
        icon: "error",
        iconColor: "#A31E32",
        title: "No se pudo agregar el usuario",
        text: "El nombre del usuario debe contener solo letras, sin números ni caracteres especiales.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    } else if (!patternString.test(userData.secName)) {
      Swal.fire({
        icon: "error",
        iconColor: "#A31E32",
        title: "No se pudo agregar el usuario",
        text: "Los apellidos del usuario deben contener solo letras, sin números ni caracteres especiales.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    } else if (!patternStringIdCard.test(userData.idcard)) {
      Swal.fire({
        icon: "error",
        iconColor: "#A31E32",
        title: "No se pudo agregar el usuario",
        text: "El número de cédula debe consistir solo en números y letras, sin caracteres especiales.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    }
    return true;
  };

  const handleAdd = async () => {
    const url = "http://localhost:3001/user";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include",
    };

    if (validateData()) {
      try {
        setLoading(true);
        const response = await FetchValidate(url, options, navigate);

        if (!response) {
          console.error("Error en la solicitud");
          return;
        }

        if (response.code === "200") {
          Swal.fire({
            icon: "success",
            iconColor: "#7cda24",
            title: "Usuario agregado",
            text: "El usuario se agregó correctamente.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
            willClose: () => {
              finallyActions();
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            iconColor: "#A31E32",
            title: "Error al agregar el usuario",
            text: "Ocurrió un error inesperado. Por favor, inténtalo más tarde.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error en la solicitud",
          text: "No se pudo agregar el usuario. Por favor, inténtalo más tarde.",
          confirmButtonColor: "#A31E32",
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="bg-UNA-Green-Light/70 flex flex-row justify-start items-center h-[3.8vh] rounded-[1vh] hover:scale-105">
        <button
          title="Agregar usuario."
          className="flex flex-row h-full items-center justify-start ml-[0.5vw] mr-[0.5vw] gap-[0.25vw]"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <div className="flex h-[3vh]">
            <AddIcon />
          </div>
          <span className="flex text-white text-[0.9vw]">{textToAdd}</span>
        </button>
      </div>

      <div
        className={`${
          !isOpen && "hidden"
        } bg-gray-600/50 min-h-screen w-full z-40 flex fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]`}
        onClick={() => closeActions()}
      ></div>

      <div
        className={`${
          isOpen
            ? "w-[35vw] min-h-[30vh] overflow-hidden bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300"
            : "w-[15%]"
        }`}
      >
        {isOpen && (
          <div className="w-full flex flex-col justify-center items-center">
            <div className="bg-UNA-Red w-full h-[7vh] flex top-0 fixed border-white z-50 rounded-t-[1vh] text-start items-center">
              <h1 className="text-[3vh] ml-[1vw] text-white">
                Agregar usuario
              </h1>
              <div className="w-[5vw] right-0 h-full absolute flex text-center justify-center items-center">
                <button
                  className="flex w-[60%] h-[60%] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
                  onClick={() => closeActions()}
                >
                  <div className="flex w-[75%] h-[75%]">
                    <CancelActionIcon />
                  </div>
                </button>
              </div>
            </div>
            <div className="w-full max-w-full mt-[7vh] mb-[7vh] flex flex-col items-start relative">
              <label
                className="text-left ml-[1vw] mt-[3vh] font-bold text-[1.2vw]"
                htmlFor="name"
              >
                Nombre del usuario
              </label>
              <input
                type="text"
                placeholder="Ingrese el nombre del usuario"
                id="name"
                name="name"
                autoComplete="off"
                readOnly
                onFocus={(e) => e.target.removeAttribute("readonly")}
                onBlur={(e) => e.target.setAttribute("readonly", true)}
                value={userData.name}
                onChange={handleChange}
                className="w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh]"
              />
              <label
                className="text-left ml-[1vw] mt-[3vh] font-bold text-[1.2vw]"
                htmlFor="secName"
              >
                Apellidos del usuario
              </label>
              <input
                type="text"
                id="secName"
                name="secName"
                placeholder="Ingrese los apellidos del usuario"
                autoComplete="off"
                readOnly
                onFocus={(e) => e.target.removeAttribute("readonly")}
                onBlur={(e) => e.target.setAttribute("readonly", true)}
                value={userData.secName}
                onChange={handleChange}
                className="w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh]"
              />

              <label
                className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]"
                htmlFor="idcard"
              >
                Identificación del usuario
              </label>
              <input
                type="text"
                id="idcard"
                placeholder="Ingrese el número de identificacion del usuario"
                name="idcard"
                autoComplete="off"
                readOnly
                onFocus={(e) => e.target.removeAttribute("readonly")}
                onBlur={(e) => e.target.setAttribute("readonly", true)}
                value={userData.idcard}
                onChange={handleChange}
                className="w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh]"
              />

              <label
                className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]"
                htmlFor="idRol"
              >
                Rol del usuario
              </label>
              <select
                className="appearance-none cursor-pointer w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh]"
                title="Seleccione un rol. Asegúrate de elegir una opción válida."
                id="idRol"
                name="idRol"
                type="number"
                value={userData.idRol}
                onChange={handleChange}
              >
                <option value="">Seleccione un rol</option>
                {roles.map((role) => (
                  <option key={role.ID_ROL} value={role.ID_ROL}>
                    {role["NOMBRE"]}
                  </option>
                ))}
              </select>
              <label
                className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]"
                htmlFor="pass"
              >
                Contraseña
              </label>

              <input
                autoComplete="new-password"
                type="password"
                placeholder="Ingrese una contraseña"
                id="pass"
                name="pass"
                value={userData.pass}
                onChange={handleChange}
                className="mb-[3vh] w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh]"
              />
            </div>
            {loading && (
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-60">
                <Loading />
              </div>
            )}

            <div className="w-full h-[7vh] flex bottom-0 fixed border-white z-50 text-center justify-center items-center">
              <button
                className="border-[0.1vh] bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]"
                onClick={() => handleAdd()}
              >
                Agregar
              </button>
              <button
                className="border-[0.1vh] bg-UNA-Blue-Dark text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[0.1vw] mr-[1vw]"
                onClick={() => closeActions()}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserAdd;
