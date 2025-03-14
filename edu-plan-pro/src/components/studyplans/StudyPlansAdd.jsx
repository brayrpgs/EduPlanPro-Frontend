import React, { useState } from "react";
import AddIcon from "../icons/CrudIcons/AddIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading";
import { ChargePDF } from "../componentsgeneric/ChargePDF";

const StudyPlansAdd = ({ totalItems, currentPage, loadData, textToAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChargePDF, setIsChargePDF] = useState(false);
  const [studyPlanData, setStudyPlanData] = useState({
    DSC_NAME: "",
    DAT_INIT: "",
    DAT_MAX: "",
    ID_CAREER: "",
    PDF_URL: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [carreers, setCarreers] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3001/carreer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === "200") {
          setCarreers(data.data);
        }
      })
      .catch((error) => console.error("Error al cargar las carreras:", error));
  }, []);

  const modalChargePDF = () => {
    setIsChargePDF(!isChargePDF);
  };

  function finallyActions() {
    const remainingItems = totalItems + 1;
    const lastPage = Math.ceil(remainingItems / 8);
    const newPage = Math.min(currentPage, lastPage);
    loadData(newPage);
    setIsOpen(false);
    setIsChargePDF(false);
    setStudyPlanData({
      DSC_NAME: "",
      DAT_INIT: "",
      DAT_MAX: "",
      ID_CAREER: "",
      PDF_URL: "",
    });
  }

  function closeActions() {
    setIsOpen(false);
    setIsChargePDF(false);
    setStudyPlanData({
      DSC_NAME: "",
      DAT_INIT: "",
      DAT_MAX: "",
      ID_CAREER: "",
      PDF_URL: "",
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudyPlanData({
      ...studyPlanData,
      [name]: value,
    });
  };

  function validateData() {
    const patternString = /^[A-Za-zÁ-ÿ\s]*$/;
    const optionSelected = document.getElementById("ID_CAREER");

    if (
      studyPlanData.DSC_NAME === "" ||
      studyPlanData.DAT_INIT === "" ||
      studyPlanData.DAT_MAX === "" ||
      studyPlanData.PDF_URL === ""
    ) {
      Swal.fire({
        icon: "error",
        iconColor: "#A31E32",
        title: "No se pudo agregar el plan de estudio",
        text: "Los campos del formulario no pueden ir vacíos, completa todos los campos e intenta de nuevo.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    } else {
      if (!patternString.test(studyPlanData.DSC_NAME)) {
        Swal.fire({
          icon: "error",
          iconColor: "#a31e32",
          title: "No se pudo agregar el plan de estudio",
          text: "El nombre del plan de estudio debe contener solo letras, sin números ni caracteres especiales.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
        });
        return false;
      } else if (optionSelected.value === "") {
        Swal.fire({
          icon: "error",
          iconColor: "#A31E32",
          title: "No se pudo agregar el plan de estudio",
          text: "Ninguna carrera ha sido seleccionada. Por favor, elige una y vuelve a intentarlo.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
        });
        return false;
      } else if (studyPlanData.DAT_INIT > studyPlanData.DAT_MAX) {
        Swal.fire({
          icon: "error",
          iconColor: "#A31E32",
          title: "No se pudo agregar el plan de estudio",
          text: "La fecha de inicio del plan de estudio no puede ser posterior a la fecha máxima establecida.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
        });
        return false;
      }
      return true;
    }
  }

  const handleAdd = async () => {
    const url = "http://localhost:3001/studyplan";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studyPlanData),
      credentials: "include",
    };



    if (validateData()) {
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
            title: "Plan de estudio agregado",
            text: "El plan de estudio se agregó correctamente.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
            willClose: () => {
              finallyActions();
            },
          }).then((result) => {
            if (result.isConfirmed) {
              finallyActions();
            }
          });
        } else if (response.code === "500") {
          Swal.fire({
            icon: "error",
            iconColor: "#a31e32",
            title: "No se pudo agregar plan de estudio",
            text: "No se pudo agregar plan de estudio, ya existe un plan de estudio con estas caracteristicas.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
          });
        }
      } catch (error) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error al agregar el plan de estudio",
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
      <div className="bg-UNA-Green-Light/70 flex flex-row justify-start items-center h-[3.8vh] rounded-[1vh] hover:scale-105">
        <button
          title="Agregar plan de estudio."
          className="flex flex-row h-full items-center justify-start ml-[0.5vw] mr-[0.5vw] gap-[0.25vw]"
          onClick={() => {
            setIsOpen(true);
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
        onClick={() => closeActions()}
      ></div>

      <div
        className={`${
          isOpen
            ? "w-[35vw] min-h-[30vh] overflow-hidden bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300"
            : "w-[15%]"
        }`}
      >
        {isOpen && (
          <div className="w-full flex flex-col justify-center items-center ">
            <div className="bg-UNA-Red  w-full h-[7vh] flex top-0 fixed border-white z-50 rounded-t-[1vh] text-start items-center">
              <h1 className="text-[3vh] ml-[1vw] text-white">
                Agregar plan de estudio
              </h1>
              <div className="w-[5vw] right-0 h-full absolute flex text-center justify-center items-center">
                <button
                  className="flex w-[60%] h-[60%] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
                  onClick={() => closeActions()}
                >
                  <div className="flex w-[75%] h-[75%] ">
                    <CancelActionIcon />
                  </div>
                </button>
              </div>
            </div>
            <div className="w-full max-w-full mt-[7vh] mb-[7vh] flex flex-col items-start relative">
              <label
                className="text-left ml-[1vw] mt-[3vh] font-bold text-[1.2vw]"
                htmlFor="DSC_NAME"
              >
                Nombre del plan de estudio
              </label>

              <input
                className="w-[93%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh]"
                autoComplete="off"
                spellCheck="false"
                title="Ingrese un nombre. Asegurate que no incluya números ni carácteres especiales."
                placeholder="Ingrese el nombre del plan de estudio"
                value={studyPlanData.DSC_NAME}
                onChange={handleChange}
                name="DSC_NAME"
                id="DSC_NAME"
                type="text"
              />
              <label
                className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]"
                htmlFor="DAT_INIT"
              >
                Fecha inicial
              </label>

              <input
                className="w-[93%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh]"
                autoComplete="off"
                title="Ingrese una fecha inicial para el plan de estudio."
                value={studyPlanData.DAT_INIT}
                onChange={handleChange}
                name="DAT_INIT"
                id="DAT_INIT"
                type="date"
              />
              <label
                className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]"
                htmlFor="DAT_MAX"
              >
                Fecha máxima
              </label>

              <input
                className="w-[93%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh]"
                autoComplete="off"
                title="Ingrese una fecha máxima para el plan de estudio."
                value={studyPlanData.DAT_MAX}
                onChange={handleChange}
                name="DAT_MAX"
                id="DAT_MAX"
                type="date"
              />

              <label
                className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]"
                htmlFor="ID_CAREER"
              >
                Carrera
              </label>
              <select
                className="cursor-pointer appearance-none w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh]"
                title="Seleccione la carrera. Asegúrate de elegir una opción válida."
                name="ID_CAREER"
                id="ID_CAREER"
                type="number"
                value={studyPlanData.ID_CAREER}
                onChange={handleChange}
              >
                <option value="">Seleccione una carrera</option>
                {carreers.map((carreer) => (
                  <option key={carreer.ID_CAREER} value={carreer.ID_CAREER}>
                    {carreer["NOMBRE DE LA CARRERA"]}
                  </option>
                ))}
              </select>

              <label
                className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]"
                htmlFor="PDF_URL"
              >
                PDF asociado
              </label>

              <input
                className="mb-[3vh] border-black text-white  bg-UNA-Red w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] rounded-[1vh]  border-[0.3vh] cursor-pointer"
                value={
                  studyPlanData.PDF_URL
                    ? "PDF cargado correctamente"
                    : "Seleccionar PDF"
                }
                name="PDF_URL"
                id="PDF_URL"
                type="button"
                onClick={modalChargePDF}
              />

              {isChargePDF && <ChargePDF setIsChargePDF = {setIsChargePDF} 
                    title = {"Cargar PDF del plan de estudio"}
                    handleChange={handleChange}
              />}
            </div>
            <div className="w-full h-[7vh] flex bottom-0 fixed border-white z-50 text-center justify-center items-center">
              <button
                className="border-[0.1vh] bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]
              "
                onClick={() => handleAdd()}
              >
                Agregar
              </button>
              <button
                className="border-[0.1vh] bg-UNA-Blue-Dark text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] mr-[1vw] ml-[0.1vw]
              "
                onClick={() => closeActions()}
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

export default StudyPlansAdd;
