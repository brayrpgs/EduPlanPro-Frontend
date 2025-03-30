import React, { useState } from "react";
import UpdateIcon from "../icons/CrudIcons/UpdateIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading";

const FacultyUpdate = ({ faculty, loadData, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [facultyToUpdate, setFacultyToUpdate] = useState(null);
  const [editedName, setEditedName] = useState(faculty["NOMBRE FACULTAD"]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function finallyActions(newName) {
    loadData(currentPage);
    setIsOpen(false);
    setFacultyToUpdate(null);
    setEditedName(newName);
  }

  function validateData(data) {
    const patternString = /^[A-Za-zÁ-ÿ\s]+[A-Za-zÁ-ÿ\s.,]*[A-Za-zÁ-ÿ\s]*$/;

    if (data === "") {
      Swal.fire({
        icon: "error",
        iconColor: "#A31E32",
        title: "No se pudo actualizar la facultad",
        text: "El nombre de la facultad no puede ir vacío, completa el campo e intenta de nuevo.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    } else if (!patternString.test(data)) {
      Swal.fire({
        icon: "error",
        iconColor: "#a31e32",
        title: "No se pudo actualizar la facultad",
        text: "El nombre de la facultad debe contener solo letras, sin números ni caracteres especiales.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    }

    return true;
  }

  const handleUpdate = async (newName) => {
    const url = "http://localhost:3001/career";

    const body = {
      desc: newName,
      id: facultyToUpdate["ID_CAREER"],
      stat: 1,
    };

    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    };

    if (validateData(newName.trim())) {
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
            title: "Facultad actualizada",
            text: "La facultad se actualizó correctamente.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
            willClose: () => {
              finallyActions(newName);
            },
          }).then((result) => {
            if (result.isConfirmed) {
              finallyActions(newName);
            }
          });
        } else if (response.code === "400") {
          Swal.fire({
            icon: "error",
            iconColor: "#a31e32",
            title: "No se pudo actualizar la facultad",
            text: "No se pudo actualizar la facultad, ya existe una con ese nombre.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
          });
        }
      } catch (error) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error al actualizar la facultad",
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
      <button
        title="Editar facultad."
        className="h-[3vh] w-[1.5vw] flex items-center justify-center hover:scale-125"
        onClick={() => {
          setIsOpen(true);
          setFacultyToUpdate(faculty);
        }}
      >
        <UpdateIcon />
      </button>

      <div
        className={`${
          !isOpen && "hidden"
        } bg-gray-600/50 min-h-screen w-full z-40 flex fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]`}
        onClick={() => {
          setIsOpen(false);
          setFacultyToUpdate(null);
          setEditedName(faculty["NOMBRE FACULTAD"]);
        }}
      ></div>

      <div
        className={`${
          isOpen
            ? "w-[30vw] min-h-[30vh] overflow-hidden bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300"
            : "w-[0%]"
        }`}
      >
        {isOpen && (
          <div className="w-full flex flex-col justify-center items-center ">
            <div className="bg-UNA-Red  w-full h-[7vh] flex top-0 fixed border-white z-50 rounded-t-[1vh] text-start items-center">
              <h1 className="text-[3vh] ml-[1vw] text-white">
                Actualizar facultad
              </h1>
              <div className="w-[5vw] right-0 h-full absolute flex text-center justify-center items-center">
                <button
                  className="flex w-[60%] h-[60%] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
                  onClick={() => {
                    setIsOpen(false);
                    setFacultyToUpdate(null);
                    setEditedName(faculty["NOMBRE FACULTAD"]);
                  }}
                >
                  <div className="flex w-[75%] h-[75%] ">
                    <CancelActionIcon />
                  </div>
                </button>
              </div>
            </div>
            <div className="w-full  max-w-full mt-[7vh] mb-[7vh] flex flex-col items-start relative">
              <label
                className="text-left text- ml-[1vw] mt-[3vh] font-bold text-[1.3vw]"
                htmlFor="facultyName"
              >
                Nombre de la facultad
              </label>

              <input
                className="w-[93%] mt-[1.1vh] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh]"
                autoComplete="off"
                spellCheck="false"
                title="Ingrese un nombre. Asegurate que no incluya números ni carácteres especiales."
                placeholder="Ingrese el nombre de la facultad"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                id="facultyName"
                type="text"
              />
            </div>
            <div className="w-full h-[7vh] flex bottom-0 fixed border-white z-50 text-center justify-center items-center">
              <button
                className="border-[0.1vh] bg-UNA-Red text-white rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]"
                onClick={() => handleUpdate(editedName)}
              >
                Actualizar
              </button>
              <button
                className="border-[0.1vh] bg-UNA-Blue-Dark text-white rounded-[0.3vw] h-[60%] border-black w-[50%] mr-[1vw] ml-[0.1vw]
              "
                onClick={() => {
                  setIsOpen(false);
                  setFacultyToUpdate(null);
                  setEditedName(faculty["NOMBRE FACULTAD"]);
                }}
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

export default FacultyUpdate;
