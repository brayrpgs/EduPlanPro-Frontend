import React, { useState } from "react";
import AddIcon from "../icons/CrudIcons/AddIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading";

const CareerAdd = ({ totalItems, currentPage, loadData, textToAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function finallyActions() {
    const remainingItems = totalItems + 1;
    const lastPage = Math.ceil(remainingItems / 8);
    const newPage = Math.min(currentPage, lastPage);
    loadData(newPage);
    setIsOpen(false);
    setName("");
  }

  function validateData(data) {
    const patternString = /^[A-Za-zÁ-ÿ\s]+[A-Za-zÁ-ÿ\s.,]*[A-Za-zÁ-ÿ\s]*$/;

    if (data === "") {
      Swal.fire({
        icon: "error",
        iconColor: "#a31e32",
        title: "No se pudo agregar la escuela",
        text: "El nombre de la escuela no puede ir vacío, completa el campo e intenta de nuevo.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    } else if (!patternString.test(data)) {
      Swal.fire({
        icon: "error",
        iconColor: "#a31e32",
        title: "No se pudo agregar la escuela",
        text: "El nombre de la escuela debe contener solo letras, sin números ni caracteres especiales.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    }

    return true;
  }

  const handleAdd = async (nameInput) => {
    if (validateData(nameInput.trim())) {
      const url = "http://localhost:3001/career";

      const body = { name: nameInput };

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      };

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
            title: "Escuela agregada",
            text: "La escuela se agregó correctamente.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
            willClose: () => finallyActions(),
          }).then((result) => {
            if (result.isConfirmed) finallyActions();
          });
        } else if (response.code === "500") {
          Swal.fire({
            icon: "error",
            iconColor: "#a31e32",
            title: "No se pudo agregar la escuela",
            text: "Ya existe una escuela con ese nombre.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al agregar la escuela",
          text: "Intenta de nuevo más tarde.",
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
          title="Agregar escuela."
          className="flex flex-row h-full items-center justify-start ml-[0.5vw] mr-[0.5vw] gap-[0.25vw]"
          onClick={() => {
            setIsOpen(true);
            setName("");
          }}
        >
          <div className="flex h-[3vh]">
            <AddIcon />
          </div>
          <span className="flex text-white text-[0.9vw]">{textToAdd}</span>
        </button>
      </div>

      {isOpen && (
        <>
          <div
            className="bg-gray-600/50 min-h-screen w-full z-40 flex fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]"
            onClick={() => {
              setIsOpen(false);
              setName("");
            }}
          ></div>

          <div className="w-[30vw] min-h-[30vh] overflow-hidden bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300">
            <div className="bg-UNA-Red w-full h-[7vh] flex items-center justify-between px-[1vw] rounded-t-[1vh]">
              <h1 className="text-[3vh] text-white">Agregar escuela</h1>
              <button
                className="flex w-[2.5vw] h-[2.5vw] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
                onClick={() => {
                  setIsOpen(false);
                  setName("");
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
                title="Ingrese un nombre. Asegúrese que no incluya números ni caracteres especiales."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full h-[7vh] flex justify-center items-center gap-[1vw]">
              <button
                className="bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[40%]"
                onClick={() => handleAdd(name)}
              >
                Agregar
              </button>
              <button
                className="bg-UNA-Blue-Dark text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[40%]"
                onClick={() => {
                  setIsOpen(false);
                  setName("");
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

export default CareerAdd;
