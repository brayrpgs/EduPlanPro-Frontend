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

      {isOpen && (
        <>
          <div
            className="bg-gray-600/50 min-h-screen w-full z-40 fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="w-[30vw] min-h-[30vh] bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center rounded-[1vh]">
            <div className="bg-UNA-Red w-full h-[7vh] flex items-center justify-between px-[1vw] rounded-t-[1vh]">
              <h1 className="text-[3vh] text-white">Agregar carrera</h1>
              <button
                className="w-[2.5vw] h-[2.5vw] bg-UNA-Pink-Light rounded-[0.5vh] flex justify-center items-center"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-[75%] h-[75%]">
                  <CancelActionIcon />
                </div>
              </button>
            </div>

            <div className="w-full flex flex-col gap-[1.5vh] mt-[7vh] mb-[2vh] px-[1vw]">
              <label className="text-[1.3vw] font-bold">Nombre de la carrera</label>
              <input
                type="text"
                placeholder="Digite el nombre de la carrera"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[5vh] px-[1vw] rounded-[1vh] border-[0.1vh] text-[0.9vw]"
              />

              <label className="text-[1.3vw] font-bold">Código de la carrera</label>
              <input
                type="text"
                placeholder="Digite el código de la carrera"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[5vh] px-[1vw] rounded-[1vh] border-[0.1vh] text-[0.9vw]"
              />

              <label className="text-[1.3vw] font-bold">Escuela</label>
              <select
                value={schoolId}
                onChange={(e) => setSchoolId(e.target.value)}
                className="w-full h-[5vh] px-[1vw] rounded-[1vh] border-[0.1vh] text-[0.9vw]"
              >
                <option value="">Seleccione una escuela</option>
                {schoolList.map((school) => (
                  <option key={school.ID_SCHOOL} value={school.ID_SCHOOL}>
                    {school["NOMBRE ESCUELA"]}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full h-[7vh] flex justify-center items-center gap-[1vw]">
              <button
                className="bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[40%]"
                onClick={handleAdd}
              >
                Agregar
              </button>
              <button
                className="bg-UNA-Blue-Dark text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[40%]"
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

export default CareerAdd;
