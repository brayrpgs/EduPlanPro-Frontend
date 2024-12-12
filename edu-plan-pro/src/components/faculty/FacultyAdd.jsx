import React, { useState } from "react";
import AddIcon from "../icons/CrudIcons/AddIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading";

const FacultyAdd = ({ totalItems, currentPage, loadData, textToAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validateData(data) {
    const patternString = /^[A-Za-zÁ-ÿ\s]+[A-Za-zÁ-ÿ\s.,]*[A-Za-zÁ-ÿ\s]*$/;

    if (data === "") {
      Swal.fire({
        icon: "error",
        title: "Error al agregar la facultad",
        text: "El nombre de la facultad no puede ir vacia, agrega texto e intenta de nuevo!",
        confirmButtonColor: "#A31E32",
      });
      return false;
    } else if (!patternString.test(data)) {
      Swal.fire({
        icon: "error",
        title: "Error al agregar la facultad",
        text: "El nombre de la facultad no puede contener numeros ni caracteres especiales!",
        confirmButtonColor: "#A31E32",
      });
      return false;
    }

    return true;
  }

  const handleAdd = async (nameInput) => {
    if (validateData(nameInput.trim())) {

      const url = "http://localhost:3001/faculty";

      const body = {
        name: nameInput,
      };

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
            title: "Facultad agregada",
            text: "La facultad se agrego correctamente.",
            confirmButtonColor: "#A31E32",
          }).then((result) => {
            if (result.isConfirmed) {
              const remainingItems = totalItems + 1;
              const lastPage = Math.ceil(remainingItems / 8);
              const newPage = Math.min(currentPage, lastPage);
              loadData(newPage);
              setIsOpen(false);
              setName("");
            }
          });

        } else if (response.code === "500") {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo agregar la facultad, ya existe una con ese nombre",
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
      <div className="bg-UNA-Green-Light/70 flex flex-row justify-start items-center h-[3.8vh] rounded-[1vh]">
        <button title="Agregar facultad."
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

      <div
        className={`${
          !isOpen && "hidden"
        } bg-gray-600/50 min-h-screen w-full z-40 flex fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]`}
        onClick={() => {
          setIsOpen(false);
          setName("");
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
            <div className="bg-UNA-Red w-full h-[7vh] flex top-0 absolute border-white z-50 rounded-t-[1vh] text-start items-center">
              <h1 className="text-[3vh] ml-[1vw] text-white">
                Agregar facultad
              </h1>
              <div className="w-[5vw] right-0 h-full absolute flex text-center justify-center items-center">
                <button
                  className="flex w-[60%] h-[60%] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
                  onClick={() => {
                    setIsOpen(false);
                    setName("");
                  }}
                >
                  <div className="flex w-[75%] h-[75%] ">
                    <CancelActionIcon />
                  </div>
                </button>
              </div>
            </div>

            <div className="w-full max-w-full mt-[7vh] mb-[7vh] flex flex-col items-start relative">
              <label
                className="text-left text- ml-[1vw] mt-[3vh] font-bold text-[1.3vw]"
                htmlFor="facultyName"
              >
                Nombre de la facultad
              </label>

              <input
                className="w-[93%] mt-[1.1vh] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none text-[0.9vw] border-[0.1vh]"
                autoComplete="off"
                spellCheck="false"
                title="Ingrese un nombre. Asegurate que no incluya números ni carácteres especiales."
                placeholder="Ingrese el nombre de la facultad"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="facultyName"
                type="text"
              />
            </div>
            <div className="w-full h-[7vh] flex bottom-0 fixed border-white z-50 text-center justify-center items-center">
              <button
                className="border-[0.1vh] bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]"
                onClick={() => handleAdd(name)}
              >
                Agregar
              </button>
              <button
                className="border-[0.1vh] bg-UNA-Blue-Dark text-[0.9vw] text-white rounded-[0.3vw] h-[60%] border-black w-[50%] mr-[1vw] ml-[0.1vw]
              "
                onClick={() => {
                  setIsOpen(false);
                  setName("");
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
      {loading && <Loading/>}
    </div>
  );
};

export default FacultyAdd;
