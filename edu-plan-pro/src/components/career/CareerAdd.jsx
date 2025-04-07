import React, { useState, useEffect } from "react";
import AddIcon from "../icons/CrudIcons/AddIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading";

const CareerAdd = ({ totalItems, currentPage, loadData, textToAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [schoolList, setSchoolList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) fetchSchools();
  }, [isOpen]);

  const fetchSchools = async () => {
    try {
      const url = `http://localhost:3001/searchschool?name=search-page&numPage=1&search=&search2=`;
      const options = { method: "GET", credentials: "include" };
      const response = await FetchValidate(url, options, navigate);
      if (response && response.code === "200") {
        setSchoolList(response.data.rows);
      }
    } catch (error) {
      console.error("Error al cargar escuelas:", error);
    }
  };

  const finallyActions = () => {
    const remainingItems = totalItems + 1;
    const lastPage = Math.ceil(remainingItems / 8);
    const newPage = Math.min(currentPage, lastPage);
    loadData(newPage);
    setIsOpen(false);
    setName("");
    setCode("");
    setSchoolId("");
  };

  const validateData = () => {
    if (!name || !code || !schoolId) {
      Swal.fire({
        icon: "error",
        iconColor: "#a31e32",
        title: "Campos incompletos",
        text: "Completa todos los campos antes de agregar.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    }
    return true;
  };

  const handleAdd = async () => {
    if (!validateData()) return;

    const url = "http://localhost:3001/carreer";
    const user = JSON.parse(sessionStorage.getItem("user"));
    const updatedBy = user?.ID_USER;

    const body = {
      DSC_CARRER: name,
      DSC_CODE: code,
      ID_SCHOOL: parseInt(schoolId),
      UPDATED_BY: updatedBy,
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

      if (!response) return;

      if (response.code === "200") {
        Swal.fire({
          icon: "success",
          iconColor: "#7cda24",
          title: "Carrera agregada",
          text: "La carrera se agregó correctamente.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
          willClose: () => finallyActions(),
        });
      } else if (response.code === "500") {
        Swal.fire({
          icon: "error",
          iconColor: "#a31e32",
          title: "Carrera duplicada",
          text: "Ya existe una carrera con ese nombre o código.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error al agregar la carrera",
        text: "Intenta de nuevo más tarde.",
        confirmButtonColor: "#A31E32",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-UNA-Green-Light/70 flex flex-row justify-start items-center h-[3.8vh] rounded-[1vh] hover:scale-105">
        <button
          title="Agregar carrera"
          className="flex flex-row h-full items-center justify-start ml-[0.5vw] mr-[0.5vw] gap-[0.25vw]"
          onClick={() => {
            setIsOpen(true);
            setName("");
            setCode("");
            setSchoolId("");
          }}
        >
          <div className="flex h-[3vh]">
            <AddIcon />
          </div>
          <span className="flex text-white text-[0.9vw]">{textToAdd}</span>
        </button>
      </div>

      {/* Fondo oscuro del modal */}
      <div
        className={`${!isOpen && "hidden"
          } bg-gray-600/50 min-h-screen w-full z-40 fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal con efecto de expansión */}
      <div
        className={`${isOpen
          ? "w-[35vw] min-h-[30vh] overflow-hidden bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300"
          : "w-[15%]"
          }`}
      >
        {isOpen && (
          <div className="w-full flex flex-col justify-center items-center">
            <div className="bg-UNA-Red w-full h-[7vh] flex top-0 absolute border-white z-50 rounded-t-[1vh] text-start items-center">
              <h1 className="text-[3vh] ml-[1vw] text-white">Agregar carrera</h1>
              <div className="w-[5vw] right-0 h-full absolute flex text-center justify-center items-center">
              <button
                className="flex w-[60%] h-[60%] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
                onClick={() => setIsOpen(false)}
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
                placeholder="Digite el nombre de la carrera"
                value={name}
                id="careerName"
                onChange={(e) => setName(e.target.value)}
                className="w-[94%] mt-[1.1vh] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none text-[0.9vw] border-[0.1vh]"
              />

              <label className="text-left text- ml-[1vw] mt-[3vh] font-bold text-[1.3vw]">Código de la carrera</label>
              <input
                type="text"
                autoComplete="off"
                spellCheck="false"
                placeholder="Digite el código de la carrera"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-[94%] mt-[1.1vh] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none text-[0.9vw] border-[0.1vh]"
              />

              <label className="text-left text- ml-[1vw] mt-[3vh] font-bold text-[1.3vw]">Escuela</label>
              <select
                value={schoolId}
                name="id"
                id="id"
                type="number"
                 title="Seleccione la escuela. Asegúrate de elegir una opción válida."
                onChange={(e) => setSchoolId(e.target.value)}
                className="mb-[3vh] cursor-pointer appearance-none w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh]"
              >
                <option value="">Seleccione una escuela</option>
                {schoolList.map((school) => (
                  <option key={school.ID_SCHOOL} value={school.ID_SCHOOL}>
                    {school["NOMBRE ESCUELA"]}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full h-[7vh] flex bottom-0 fixed border-white z-50 text-center justify-center items-center">
              <button
                className="border-[0.1vh] bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]"
                onClick={handleAdd}
              >
                Agregar
              </button>
              <button
                className="border-[0.1vh] bg-UNA-Blue-Dark text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[0.1vw] mr-[1vw]"
                onClick={() => setIsOpen(false)}
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

export default CareerAdd;
