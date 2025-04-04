import React, { useState, useEffect } from "react";
import UpdateIcon from "../icons/CrudIcons/UpdateIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading";

const CareerUpdate = ({ career, loadData, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [careerToUpdate, setCareerToUpdate] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedCode, setEditedCode] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const updatedBy = user?.ID_USER || 1;

  const finallyActions = () => {
    loadData(currentPage);
    setIsOpen(false);
    setCareerToUpdate(null);
    setEditedName("");
    setEditedCode("");
    setSelectedSchool("");
  };

  const validateData = () => {
    if (!editedName.trim() || !editedCode.trim() || !selectedSchool) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Todos los campos son obligatorios.",
        confirmButtonColor: "#A31E32",
      });
      return false;
    }
    return true;
  };

  const loadSchools = async () => {
    const url = "http://localhost:3001/searchschool?name=search-page&numPage=1&search=&search2=";
    const options = { method: "GET", credentials: "include" };
    try {
      const res = await FetchValidate(url, options, navigate);
      if (res?.data?.rows) {
        setSchools(res.data.rows);

        // Seleccionar automáticamente la escuela relacionada
        const schoolMatch = res.data.rows.find((s) => s.ID_SCHOOL === career.ID_SCHOOL);
        if (schoolMatch) setSelectedSchool(schoolMatch.ID_SCHOOL);
      }
    } catch (error) {
      console.error("Error al cargar escuelas:", error);
    }
  };

  const handleUpdate = async () => {
    if (!validateData()) return;

    const body = {
      DSC_CARRER: editedName.trim(),
      DSC_CODE: editedCode.trim(),
      ID_SCHOOL: selectedSchool,
      UPDATED_BY: updatedBy,
      STATE: "1",
      ID_CAREER: careerToUpdate.ID_CAREER,
    };

    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    };

    try {
      setLoading(true);
      const response = await FetchValidate("http://localhost:3001/carreer", options, navigate);

      if (response?.code === "200") {
        Swal.fire({
          icon: "success",
          iconColor: "#7cda24",
          title: "Carrera actualizada",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
          willClose: () => finallyActions(),
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al actualizar",
          text: "Verifica que no exista una carrera con ese nombre.",
          confirmButtonColor: "#A31E32",
        });
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setCareerToUpdate(career);
    setEditedName(career["NOMBRE DE CARRERA"]);
    setEditedCode(career["CODIGO DE CARRERA"]);
    loadSchools();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCareerToUpdate(null);
    setEditedName("");
    setEditedCode("");
    setSelectedSchool("");
  };

  

  return (
    <div>
      <button
        title="Editar carrera"
        className="h-[3vh] w-[1.5vw] flex items-center justify-center hover:scale-125"
        onClick={openModal}
      >
        <UpdateIcon />
      </button>

      {/* Fondo oscuro */}
      <div
        className={`${!isOpen && "hidden"} bg-gray-600/50 min-h-screen w-full z-40 fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]`}
        onClick={closeModal}
      ></div>

      {/* Modal animado */}
      <div
        className={`${
          isOpen
           ? "w-[35vw] min-h-[30vh] overflow-hidden bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300"
          : "w-[15%]"
        }`}
      >
        {isOpen && (
         <div className="w-full flex flex-col justify-center items-center">
         <div className="bg-UNA-Red w-full h-[7vh] flex top-0 absolute border-white z-50 rounded-t-[1vh] text-start items-center">
           <h1 className="text-[3vh] ml-[1vw] text-white">Editar una carrera</h1>
           <div className="w-[5vw] right-0 h-full absolute flex text-center justify-center items-center">
              <button
                className="flex w-[60%] h-[60%] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
                onClick={closeModal}
              >
                <div className="flex w-[75%] h-[75%]">
                  <CancelActionIcon />
                </div>
              </button>
              </div>
            </div>

            <div className="w-full max-w-full mt-[7vh] mb-[7vh] flex flex-col items-start relative">
            <label
                className="text-left text- ml-[1vw] mt-[3vh] font-bold text-[1.3vw]"
                htmlFor="careerName"
              >
                Nombre de la carrera
              </label>
              <input
                type="text"
                autoComplete="off"
                spellCheck="false"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-[94%] mt-[1.1vh] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none text-[0.9vw] border-[0.1vh]"
              />

              <label className="text-left text- ml-[1vw] mt-[3vh] font-bold text-[1.3vw]">Código</label>
              <input
                type="text"
                 autoComplete="off"
                spellCheck="false"
                value={editedCode}
                onChange={(e) => setEditedCode(e.target.value)}
                className="w-[94%] mt-[1.1vh] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none text-[0.9vw] border-[0.1vh]"
              />

              <label className="text-left text- ml-[1vw] mt-[3vh] font-bold text-[1.3vw]">Escuela</label>
              <select
                value={selectedSchool}
                name="id"
                id="id"
                type="number"
                title="Seleccione la escuela. Asegúrate de elegir una opción válida."
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="mb-[3vh] cursor-pointer appearance-none w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh]"
              >
                <option value="">Seleccione una escuela</option>
                {schools.map((s) => (
                  <option key={s.ID_SCHOOL} value={s.ID_SCHOOL}>
                    {s["NOMBRE ESCUELA"]}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full h-[7vh] flex bottom-0 fixed border-white z-50 text-center justify-center items-center">
              <button
                className="border-[0.1vh] bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]"
                onClick={handleUpdate}
              >
                Actualizar
              </button>
              <button
                className="border-[0.1vh] bg-UNA-Blue-Dark text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[0.1vw] mr-[1vw]"
                onClick={closeModal}
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

export default CareerUpdate;
