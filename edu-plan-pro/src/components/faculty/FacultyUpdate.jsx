import React, { useState } from "react";
import UpdateIcon from "../icons/CrudIcons/UpdateIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import Swal from "sweetalert2";

const FacultyUpdate = ({ faculty, loadData, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [facultyToUpdate, setFacultyToUpdate] = useState(null);
  const [editedName, setEditedName] = useState(faculty["NOMBRE FACULTAD"]);

  function validateData(data) {
    const patternString = /^[A-Za-zÁ-ÿ\s]+$/;

    if (data === "") {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar la facultad",
        text: "El nombre de la facultad no puede ir vacia, agrega texto e intenta de nuevo!",
        confirmButtonColor: "#A31E32",
      });
      return false;
    } else if (!patternString.test(data)) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar la facultad",
        text: "El nombre de la facultad no puede contener numeros ni caracteres especiales!",
        confirmButtonColor: "#A31E32",
      });
      return false;
    }

    return true;
  }

  const handleUpdate = async (newName) => {
    if (validateData(newName.trim())) {
      try {
        const body = {
          desc: newName,
          id: facultyToUpdate["ID_FACULTY"],
          stat: 1,
        };

        const response = await fetch(`http://localhost:3001/faculty`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          credentials: "include",
        });

        const jsonResponse = await response.json();



        if (jsonResponse.code === "200") {
          Swal.fire({
            icon: "success",
            title: "Facultad actualizada",
            text: "La información de la facultad se actualizó correctamente.",
            confirmButtonColor: "#A31E32",
          }).then((result) => {
            if (result.isConfirmed) {
              loadData(currentPage);

              setIsOpen(false);
              setFacultyToUpdate(null);
              setEditedName(newName);
            }
          });
        } else if (jsonResponse.code === "400") {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo actualizar la facultad, ya existe una con ese nombre",
            confirmButtonColor: "#A31E32",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al actualizar la facultad",
          text: "Intenta de nuevo mas tarde.",
          confirmButtonColor: "#A31E32",
        });
        console.error(error);
      }
    }
  };

  return (
    <div title="Editar registro.">
      <button
        className="h-[3vh] w-[1.5vw] flex items-center justify-center"
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
            ? "w-[30vw] min-h-[30vh] overflow-auto bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] "
            : "w-[0%] h-[0%]"
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
    </div>
  );
};

export default FacultyUpdate;
