import React, { useState } from "react";
import AddIcon from "../icons/CrudIcons/AddIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading";

const TeacherAdd = ({ totalItems, currentPage, loadData, textToAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [teacherData, setTeacherData] = useState({
    name: "",
    secName: "",
    idcard: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function finallyActions() {
    const remainingItems = totalItems + 1;
    const lastPage = Math.ceil(remainingItems / 8);
    const newPage = Math.min(currentPage, lastPage);
    loadData(newPage);
    setIsOpen(false);
    setTeacherData({
      name: "",
      secName: "",
      idcard: "",
      email: "",
    });
  }

  function closeActions() {
    setIsOpen(false);
    setTeacherData({
      name: "",
      secName: "",
      idcard: "",
      email: "",
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({
      ...teacherData,
      [name]: value,
    });
  };

  function validateData() {
    const patternString = /^[A-Za-zÁ-ÿ\s]*$/;
    const patternStringIdCard = /^(?=.*\d)[A-Za-zÁ-ÿ0-9]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
      teacherData.name === "" ||
      teacherData.secName === "" ||
      teacherData.idcard === "" ||
      teacherData.email === ""
    ) {
      Swal.fire({
        icon: "error",
        iconColor: "#A31E32",
        title: "No se pudo actualizar el profesor",
        text: "Los campos del formulario no pueden ir vacíos, completa todos los campos e intenta de nuevo.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    } else {
      if (!patternString.test(teacherData.name)) {
        Swal.fire({
          icon: "error",
          iconColor: "#a31e32",
          title: "No se pudo actualizar el profesor",
          text: "El nombre del profesor debe contener solo letras, sin números ni caracteres especiales.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
        });
        return false;
      } else if (!patternString.test(teacherData.secName)) {
        Swal.fire({
          icon: "error",
          iconColor: "#a31e32",
          title: "No se pudo actualizar el profesor",
          text: "Los apellidos del profesor deben contener solo letras, sin números ni caracteres especiales.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
        });
        return false;
      } else if (!patternStringIdCard.test(teacherData.idcard)) {
        Swal.fire({
          icon: "error",
          iconColor: "#a31e32",
          title: "No se pudo actualizar el profesor",
          text: "El número de cédula debe consistir solo en números y letras, sin caracteres especiales.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
        });
        return false;
      } else if (!emailPattern.test(teacherData.email)) {
        Swal.fire({
          icon: "error",
          iconColor: "#a31e32",
          title: "No se pudo actualizar el profesor",
          text: "Por favor, ingrese un correo electrónico válido.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
        });
        return false;
      }
      return true;
    }
  }

  const handleAdd = async () => {
    const url = "http://localhost:3001/teacher";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacherData),
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
        console.log(response)
        
        if (response.code === "200") {
          Swal.fire({
            icon: "success",
            iconColor: "#7cda24",
            title: "Profesor agregado",
            text: "El profesor se agregó correctamente.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
            willClose: () => {
              finallyActions();
            },
          }).then((result) => {
            if (result.isConfirmed) {
              finallyActions();
            }
          });
        } else if (response.code === "500") {
          Swal.fire({
            icon: "error",
            iconColor: "#a31e32",
            title: "No se pudo agregar el profesor",
            text: "No se pudo agregar el profesor, el correo ya está registrado o asociado a otro profesor.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
          });
        }
      } catch (error) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error al agregar la facultad",
          text: "Intenta de nuevo mas tarde.",
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
          title="Agregar facultad."
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
          <div className="w-full flex flex-col justify-center items-center ">
            <div className="bg-UNA-Red  w-full h-[7vh] flex top-0 fixed border-white z-50 rounded-t-[1vh] text-start items-center">
              <h1 className="text-[3vh] ml-[1vw] text-white">
                Agregar profesor
              </h1>
              <div className="w-[5vw] right-0 h-full absolute flex text-center justify-center items-center">
                <button
                  className="flex w-[60%] h-[60%] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
                  onClick={() => closeActions()}
                >
                  <div className="flex w-[75%] h-[75%] ">
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
                Nombre del profesor
              </label>

              <input
                className="w-[93%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh]"
                autoComplete="off"
                spellCheck="false"
                title="Ingrese un nombre. Asegurate que no incluya números ni carácteres especiales."
                placeholder="Ingrese el nombre del profesor"
                value={teacherData.name}
                onChange={handleChange}
                name="name"
                id="name"
                type="text"
              />
              <label
                className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]"
                htmlFor="secName"
              >
                Apellidos del profesor
              </label>

              <input
                className="w-[93%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh]"
                autoComplete="off"
                spellCheck="false"
                title="Ingrese los apellidos. Asegurate que no incluya números ni carácteres especiales."
                placeholder="Ingrese los apellidos del profesor"
                value={teacherData.secName}
                onChange={handleChange}
                name="secName"
                id="secName"
                type="text"
              />
              <label
                className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]"
                htmlFor="idcard"
              >
                Cédula del profesor
              </label>

              <input
                className="w-[93%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh]"
                autoComplete="off"
                spellCheck="false"
                title="Ingresa una cédula."
                placeholder="Ingrese la cédula del profesor"
                value={teacherData.idcard}
                onChange={handleChange}
                name="idcard"
                id="idcard"
                type="text"
              />

              <label
                className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]"
                htmlFor="email"
              >
                Correo electrónico del profesor
              </label>

              <input
                className="w-[93%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] mb-[3vh] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh]"
                autoComplete="off"
                spellCheck="false"
                title="Ingresa un correo electrónico."
                placeholder="Ingrese el correo electrónico del profesor"
                value={teacherData.email}
                onChange={handleChange}
                name="email"
                id="email"
                type="email"
              />
            </div>
            <div className="w-full h-[7vh] flex bottom-0 fixed border-white z-50 text-center justify-center items-center">
              <button
                className="border-[0.1vh] bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]
              "
                onClick={() => handleAdd()}
              >
                Agregar
              </button>
              <button
                className="border-[0.1vh] bg-UNA-Blue-Dark text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] mr-[1vw] ml-[0.1vw]
              "
              onClick={() => closeActions()}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default TeacherAdd;
