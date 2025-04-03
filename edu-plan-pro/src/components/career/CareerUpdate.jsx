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
    if (editedName.trim() === "" || editedCode.trim() === "" || selectedSchool === "") {
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
      if (res?.data?.rows) setSchools(res.data.rows);
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
    setSelectedSchool(career.ID_SCHOOL || "");
    loadSchools();
    setIsOpen(true);
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

      {isOpen && (
        <>
          <div
            className="bg-gray-600/50 min-h-screen w-full z-40 fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="w-[30vw] min-h-[30vh] bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center rounded-[1vh]">
            <div className="bg-UNA-Red w-full h-[7vh] flex items-center justify-between px-[1vw] rounded-t-[1vh]">
              <h1 className="text-[3vh] text-white">Actualizar carrera</h1>
              <button
                className="w-[2.5vw] h-[2.5vw] bg-UNA-Pink-Light rounded-[0.5vh] flex items-center justify-center"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-[75%] h-[75%]">
                  <CancelActionIcon />
                </div>
              </button>
            </div>

            <div className="w-full flex flex-col px-[1vw] my-[3vh] gap-[2vh]">
              <label className="text-[1.2vw] font-semibold">Nombre de la carrera</label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full h-[5vh] px-[1vw] border rounded-[1vh] text-[0.9vw] outline-none"
              />

              <label className="text-[1.2vw] font-semibold">Código</label>
              <input
                type="text"
                value={editedCode}
                onChange={(e) => setEditedCode(e.target.value)}
                className="w-full h-[5vh] px-[1vw] border rounded-[1vh] text-[0.9vw] outline-none"
              />

              <label className="text-[1.2vw] font-semibold">Escuela</label>
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="w-full h-[5vh] px-[1vw] border rounded-[1vh] text-[0.9vw] outline-none"
              >
                <option value="">Seleccione una escuela</option>
                {schools.map((s) => (
                  <option key={s.ID_SCHOOL} value={s.ID_SCHOOL}>
                    {s["NOMBRE ESCUELA"]}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full h-[7vh] flex justify-center items-center gap-[1vw]">
              <button
                className="bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] w-[40%]"
                onClick={handleUpdate}
              >
                Actualizar
              </button>
              <button
                className="bg-UNA-Blue-Dark text-white text-[0.9vw] rounded-[0.3vw] h-[60%] w-[40%]"
                onClick={() => setIsOpen(false)}
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
