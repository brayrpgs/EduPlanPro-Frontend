import React, { useState, useEffect } from "react";
import UpdateIcon from "../icons/CrudIcons/UpdateIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading";

const CareerUpdate = ({ career, loadData, currentPage }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);

  const [careerData, setCareerData] = useState({
    desc: career["NOMBRE DE CARRERA"],
    code: career["CODIGO DE CARRERA"],
    school: "", // será llenado con el ID real después
    id: career["ID_CAREER"],
    stat: 1,
    updatedBy: JSON.parse(sessionStorage.getItem("user"))?.ID_USER || 1,
  });

  // 🔁 Cargar escuelas y mapear nombre a ID
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/searchschool?name=search-page&numPage=1&search=&search2=",
          { method: "GET", credentials: "include" }
        );
        const data = await response.json();

        if (data.code === "200") {
          setSchools(data.data.rows);

          // Buscar ID de escuela a partir del nombre
          const found = data.data.rows.find(
            (school) => school["NOMBRE ESCUELA"] === career["NOMBRE DE LA ESCUELA"]
          );
          if (found) {
            setCareerData((prev) => ({
              ...prev,
              school: String(found.ID_SCHOOL),
            }));
          }
        }
      } catch (err) {
        console.error("Error al cargar escuelas:", err);
      }
    };

    if (isOpen) fetchSchools();
  }, [isOpen, career]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCareerData((prev) => ({ ...prev, [name]: value }));
  };

  const validateData = () => {
    const patternString = /^[A-Za-zÁ-ÿ\s]*$/;
    if (!careerData.desc || !careerData.code || !careerData.school) {
      Swal.fire({
        icon: "error",
        iconColor: "#A31E32",
        title: "Faltan campos",
        text: "Todos los campos son obligatorios.",
        confirmButtonColor: "#A31E32",
      });
      return false;
    } else if (!patternString.test(careerData.desc)) {
      Swal.fire({
        icon: "error",
        iconColor: "#A31E32",
        title: "Nombre inválido",
        text: "El nombre debe contener solo letras.",
        confirmButtonColor: "#A31E32",
      });
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validateData()) return;

    const body = {
      DSC_CARRER: careerData.desc,
      DSC_CODE: careerData.code,
      ID_SCHOOL: careerData.school,
      UPDATED_BY: careerData.updatedBy,
      STATE: careerData.stat,
      ID_CAREER: careerData.id,
    };

    try {
      setLoading(true);
      const res = await FetchValidate("http://localhost:3001/carreer", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      }, navigate);

      if (res?.code === "200") {
        Swal.fire({
          icon: "success",
          title: "Carrera actualizada",
          iconColor: "#7cda24",
          confirmButtonColor: "#A31E32",
        }).then(() => {
          setIsOpen(false);
          loadData(currentPage);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar la carrera.",
          confirmButtonColor: "#A31E32",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setCareerData({
      desc: career["NOMBRE DE CARRERA"],
      code: career["CODIGO DE CARRERA"],
      school: "", // se recargará al volver a abrir
      id: career["ID_CAREER"],
      stat: 1,
      updatedBy: JSON.parse(sessionStorage.getItem("user"))?.ID_USER || 1,
    });
  };

  return (
    <div>
      <button
        title="Editar carrera"
        className="h-[3vh] w-[1.5vw] flex items-center justify-center hover:scale-125"
        onClick={() => setIsOpen(true)}
      >
        <UpdateIcon />
      </button>

      {/* Overlay */}
      <div
        className={`${!isOpen && "hidden"} bg-gray-600/50 min-h-screen w-full z-40 fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]`}
        onClick={closeModal}
      ></div>

      {/* Modal */}
      <div
        className={`${
          isOpen
            ? "w-[35vw] min-h-[30vh] overflow-hidden bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300"
            : "w-[15%]"
        }`}
      >
        {isOpen && (
          <div className="w-full flex flex-col justify-center items-center">
            {/* Header */}
            <div className="bg-UNA-Red w-full h-[7vh] flex top-0 fixed border-white z-50 rounded-t-[1vh] text-start items-center">
              <h1 className="text-[3vh] ml-[1vw] text-white">Editar carrera</h1>
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

            {/* Form */}
            <div className="w-full max-w-full mt-[7vh] mb-[7vh] flex flex-col items-start relative">
              <label className="ml-[1vw] mt-[3vh] font-bold text-[1.3vw]">Nombre de la carrera</label>
              <input
                type="text"
                name="desc"
                value={careerData.desc}
                onChange={handleChange}
                className="w-[94%] mt-[1.1vh] ml-[1vw] h-[5vh] px-[1vw] text-[0.9vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh]"
              />

              <label className="ml-[1vw] mt-[3vh] font-bold text-[1.3vw]">Código</label>
              <input
                type="text"
                name="code"
                value={careerData.code}
                onChange={handleChange}
                className="w-[94%] mt-[1.1vh] ml-[1vw] h-[5vh] px-[1vw] text-[0.9vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh]"
              />

              <label className="ml-[1vw] mt-[3vh] font-bold text-[1.3vw]">Escuela</label>
              <select
                name="school"
                id="school"
                value={String(careerData.school)}
                onChange={handleChange}
                className="mb-[3vh] cursor-pointer appearance-none w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh]"
              >
                <option value="">Seleccione una escuela</option>
                {schools.map((s) => (
                  <option key={s.ID_SCHOOL} value={String(s.ID_SCHOOL)}>
                    {s["NOMBRE ESCUELA"]}
                  </option>
                ))}
              </select>
            </div>

            {/* Botones */}
            <div className="w-full h-[7vh] flex bottom-0 fixed border-white z-50 text-center justify-center items-center">
              <button
                className="border-[0.1vh] bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]"
                onClick={handleUpdate}
              >
                Actualizar
              </button>
              <button
                className="border-[0.1vh] bg-UNA-Blue-Dark text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] mr-[1vw] ml-[0.1vw]"
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
