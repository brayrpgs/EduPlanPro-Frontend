import React, { useState } from "react";
import UpdateIcon from "../icons/CrudIcons/UpdateIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading";

const CareerUpdate = ({ faculty, loadData, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [careerToUpdate, setCareerToUpdate] = useState(null);
  const [editedName, setEditedName] = useState(faculty["NOMBRE ESCUELA"]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function finallyActions(newName) {
    loadData(currentPage);
    setIsOpen(false);
    setCareerToUpdate(null);
    setEditedName(newName);
  }

  function validateData(data) {
    const patternString = /^[A-Za-zÁ-ÿ\s]+[A-Za-zÁ-ÿ\s.,]*[A-Za-zÁ-ÿ\s]*$/;

    if (data === "") {
      Swal.fire({
        icon: "error",
        iconColor: "#A31E32",
        title: "No se pudo actualizar la escuela",
        text: "El nombre de la escuela no puede ir vacío.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    } else if (!patternString.test(data)) {
      Swal.fire({
        icon: "error",
        iconColor: "#a31e32",
        title: "No se pudo actualizar la escuela",
        text: "El nombre debe contener solo letras, sin números ni caracteres especiales.",
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
      id: careerToUpdate["ID_CAREER"],
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
            title: "Escuela actualizada",
            text: "La escuela se actualizó correctamente.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
            willClose: () => finallyActions(newName),
          }).then((result) => {
            if (result.isConfirmed) finallyActions(newName);
          });
        } else if (response.code === "400") {
          Swal.fire({
            icon: "error",
            iconColor: "#a31e32",
            title: "Nombre duplicado",
            text: "Ya existe una escuela con ese nombre.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al actualizar",
          text: "Ocurrió un error. Intenta más tarde.",
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
        title="Editar escuela"
        className="h-[3vh] w-[1.5vw] flex items-center justify-center hover:scale-125"
        onClick={() => {
          setIsOpen(true);
          setCareerToUpdate(faculty);
        }}
      >
        <UpdateIcon />
      </button>

      {isOpen && (
        <>
          <div
            className="bg-gray-600/50 min-h-screen w-full z-40 flex fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]"
            onClick={() => {
              setIsOpen(false);
              setCareerToUpdate(null);
              setEditedName(faculty["NOMBRE ESCUELA"]);
            }}
          ></div>

          <div className="w-[30vw] min-h-[30vh] overflow-hidden bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300">
            <div className="bg-UNA-Red w-full h-[7vh] flex items-center justify-between px-[1vw] rounded-t-[1vh]">
              <h1 className="text-[3vh] text-white">Actualizar escuela</h1>
              <button
                className="flex w-[2.5vw] h-[2.5vw] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
                onClick={() => {
                  setIsOpen(false);
                  setCareerToUpdate(null);
                  setEditedName(faculty["NOMBRE ESCUELA"]);
                }}
              >
                <div className="w-[75%] h-[75%]">
                  <CancelActionIcon />
                </div>
              </button>
            </div>

            <div className="w-full mt-[7vh] mb-[7vh] flex flex-col items-start px-[1vw]">
              <label
                htmlFor="careerName"
                className="font-bold text-[1.3vw] mt-[3vh]"
              >
                Nombre de la escuela
              </label>
              <input
                id="careerName"
                type="text"
                className="w-full mt-[1.1vh] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh] text-[0.9vw]"
                autoComplete="off"
                spellCheck="false"
                placeholder="Ingrese el nombre de la escuela"
                title="Ingrese un nombre válido. Sin números ni caracteres especiales."
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>

            <div className="w-full h-[7vh] flex justify-center items-center gap-[1vw]">
              <button
                className="bg-UNA-Red text-white rounded-[0.3vw] h-[60%] border-black w-[40%] text-[0.9vw]"
                onClick={() => handleUpdate(editedName)}
              >
                Actualizar
              </button>
              <button
                className="bg-UNA-Blue-Dark text-white rounded-[0.3vw] h-[60%] border-black w-[40%] text-[0.9vw]"
                onClick={() => {
                  setIsOpen(false);
                  setCareerToUpdate(null);
                  setEditedName(faculty["NOMBRE ESCUELA"]);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </>
      )}
      {loading && <Loading />}
    </div>
  );
};

export default CareerUpdate;
