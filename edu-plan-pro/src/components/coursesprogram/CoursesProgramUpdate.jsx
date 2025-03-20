import React, { useState } from "react";
import AddIcon from "../icons/CrudIcons/AddIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading";
import { ChargePDF } from "../componentsgeneric/ChargePDF";
import UpdateIcon from "../icons/CrudIcons/UpdateIcon";

const CoursesProgramUpdate = ({ courseProgram, currentPage, loadData, studyPlans, formatDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChargePDF, setIsChargePDF] = useState(false);
  const [signature, setSignature] = useState(parseInt(courseProgram["FIRMA"]));

  const [coursesProgramData, setCoursesProgramData] = useState({
    ID_COURSE_PROGRAM: courseProgram["ID_COURSE_PROGRAM"],
    DSC_NAME: courseProgram["NOMBRE DEL PROGRAMA"],
    DAT_YEAR: formatDate(courseProgram["FECHA"]),
    ID_STUDY_PLAN: courseProgram["ID_STUDY_PLAN"],
    NRC: courseProgram["NRC"],
    SIGNATURE: courseProgram["FIRMA"],
    CICLE: courseProgram["CICLO"],
    NUM_CREDITS: courseProgram["CREDITOS"],
    PDF_URL: courseProgram["PDF"],
    STATE: "1"
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const modalChargePDF = () => {
    setIsChargePDF(!isChargePDF);
  };

  function finallyActions() {
    loadData(currentPage);
    setIsOpen(false);
    setIsChargePDF(false);
  }

  function closeActions() {
    setIsOpen(false);
    setIsChargePDF(false);
    setSignature(parseInt(courseProgram["FIRMA"]))
    setCoursesProgramData({
        ID_COURSE_PROGRAM: courseProgram["ID_COURSE_PROGRAM"],
        DSC_NAME: courseProgram["NOMBRE DEL PROGRAMA"],
        DAT_YEAR: formatDate(courseProgram["FECHA"]),
        ID_STUDY_PLAN: courseProgram["ID_STUDY_PLAN"],
        NRC: courseProgram["NRC"],
        SIGNATURE: courseProgram["FIRMA"],
        CICLE: courseProgram["CICLO"],
        NUM_CREDITS: courseProgram["CREDITOS"],
        PDF_URL: "PDF",
        STATE: "1"
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoursesProgramData({
      ...coursesProgramData,
      [name]: value,
    });
  };

  const handleSignatureChange = () => {
    const newSignature = signature === 0 ? 1 : 0;
    setSignature(newSignature)
    setCoursesProgramData({
      ...coursesProgramData,
      ["SIGNATURE"]: newSignature,
    });
    
  };

  function validateData() {
    const patternString = /^[A-Za-zÁ-ÿ\s]*$/;
    const optionSelectedStudyPlan = document.getElementById("ID_STUDY_PLAN");
    const optionSelectedCicle = document.getElementById("CICLE");

    if (
      coursesProgramData.DSC_NAME === "" ||
      coursesProgramData.DAT_YEAR === "" ||
      coursesProgramData.NRC === "" ||
      coursesProgramData.NUM_CREDITS === "" ||
      coursesProgramData.PDF_URL === ""
    ) {
      Swal.fire({
        icon: "error",
        iconColor: "#A31E32",
        title: "No se pudo actualizar el programa de curso",
        text: "Los campos del formulario no pueden ir vacíos, completa todos los campos e intenta de nuevo.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    } else {
      if (!patternString.test(coursesProgramData.DSC_NAME)) {
        Swal.fire({
          icon: "error",
          iconColor: "#a31e32",
          title: "No se pudo actualizar el programa de curso",
          text: "El nombre del programa de curso debe contener solo letras, sin números ni caracteres especiales.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
        });
        return false;
      } else if (optionSelectedStudyPlan.value === "") {
        Swal.fire({
          icon: "error",
          iconColor: "#A31E32",
          title: "No se pudo actualizar el programa de curso",
          text: "Ningún plan de estudio ha sido seleccionado. Por favor, elige uno y vuelve a intentarlo.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
        });
        return false;
      }
      else if (optionSelectedCicle.value === "") {
        Swal.fire({
          icon: "error",
          iconColor: "#A31E32",
          title: "No se pudo actualizar el programa de curso",
          text: "Ningún ciclo ha sido seleccionado. Por favor, elige uno y vuelve a intentarlo.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
        });
        return false;
      }
      
      else if (coursesProgramData.NUM_CREDITS < 1) {
        Swal.fire({
          icon: "error",
          iconColor: "#A31E32",
          title: "No se pudo actualizar el plan de estudio",
          text: "El programa de curso debe tener al menos un crédito asignado.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
        });
        return false;
      }
      return true;
    }
  }

  const handleUpdate = async () => {
    const url = "http://localhost:3001/courseprogram";

    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coursesProgramData),
      credentials: "include",
    };
    
    console.log(coursesProgramData)

    if (validateData) {
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
            title: "Programa de curso actualizado",
            text: "El programa de curso se actualizó correctamente.",
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
            title: "No se pudo actualizar el programa de curso",
            text: "No se pudo actualizar el programa de curso, ya existe un programa de curso con estas caracteristicas.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
          });
        }
      } catch (error) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          iconColor: "#a31e32",
          title: "Error al actualizar el programa de curso",
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
      <button
        title="Editar profesor."
        className="h-[3vh] w-[1.5vw] flex items-center justify-center hover:scale-125"
        onClick={() => setIsOpen(true)}
      >
        <UpdateIcon />
      </button>

      <div
        className={`${
          !isOpen && "hidden"
        } bg-gray-600/50 min-h-screen w-full z-40 flex fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]`}
        onClick={() => closeActions()}
      ></div>

      {isChargePDF && (
        <div className="bg-black w-[35vw] min-h-[77.5vh] overflow-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-60 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300">
          <div className="w-full flex flex-col justify-center items-center ">
            <div className="w-full max-w-full mt-[7vh] mb-[7vh] flex flex-col items-start relative">
              <ChargePDF
                setIsChargePDF={setIsChargePDF}
                title={"Cargar PDF del plan de estudio"}
                handleChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}
      <div
        className={`${
          isOpen
            ? "w-[35vw] min-h-[30vh] max-h-[77.5vh] scrollbar-hidden overflow-y-auto bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300"
            : "w-[15%]"
        }`}
      >
        {isOpen && (
          <div className="w-full flex flex-col justify-center items-center ">
            <div className="bg-UNA-Red  w-full h-[7vh] flex top-0 fixed border-white z-50 rounded-t-[1vh] text-start items-center">
              <h1 className="text-[3vh] ml-[1vw] text-white">
                Editar programa de curso
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
                Nombre del programa de curso
              </label>

              <input
                className="w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh]"
                autoComplete="off"
                spellCheck="false"
                title="Ingrese un nombre. Asegurate que no incluya números ni carácteres especiales."
                placeholder="Ingrese el nombre del programa de curso"
                value={coursesProgramData.DSC_NAME}
                onChange={handleChange}
                name="DSC_NAME"
                id="DSC_NAME"
                type="text"
              />
              <label
                className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]"
                htmlFor="DAT_YEAR"
              >
                Fecha
              </label>

              <input
                className="w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh]"
                autoComplete="off"
                title="Ingrese una fecha inicial para el plan de estudio."
                value={coursesProgramData.DAT_YEAR}
                onChange={handleChange}
                name="DAT_YEAR"
                id="DAT_YEAR"
                type="date"
              />

              <label
                className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]"
                htmlFor="ID_STUDY_PLAN"
              >
                Plan de estudio
              </label>
              <select
                className="cursor-pointer appearance-none w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh]"
                title="Seleccione la carrera. Asegúrate de elegir una opción válida."
                name="ID_STUDY_PLAN"
                id="ID_STUDY_PLAN"
                type="number"
                value={coursesProgramData.ID_STUDY_PLAN}
                onChange={handleChange}
              >
                <option value="">Seleccione un plan de estudio</option>
                {studyPlans.map((studyPlans) => (
                  <option
                    key={studyPlans.ID_STUDY_PLAN}
                    value={studyPlans.ID_STUDY_PLAN}
                  >
                    {studyPlans["DSC_NAME"] + " " + formatDate(studyPlans["DAT_INIT"]) + " → " + formatDate(studyPlans["DAT_MAX"])}
                  </option>
                ))}
              </select>

              <label
                className="text-left ml-[1vw] mt-[3vh] font-bold text-[1.2vw]"
                htmlFor="NRC"
              >
                NRC
              </label>

              <input
                className="w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh]"
                autoComplete="off"
                spellCheck="false"
                title="Ingrese un NRC"
                placeholder="Ingrese el NRC del programa de curso"
                value={coursesProgramData.NRC}
                onChange={handleChange}
                name="NRC"
                id="NRC"
                type="text"
              />
              <label
                className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]"
                htmlFor="CICLE"
              >
                Ciclo
              </label>
              <select
                className="cursor-pointer appearance-none w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh]"
                title="Seleccione la carrera. Asegúrate de elegir una opción válida."
                name="CICLE"
                id="CICLE"
                type="text"
                value={coursesProgramData.CICLE}
                onChange={handleChange}
              >
                <option value="">Seleccione una ciclo</option>
                <option value="1">Primer ciclo</option>
                <option value="2">Segundo ciclo</option>
                <option value="V">Verano</option>
              </select>

              <label
                className="text-left ml-[1vw] mt-[3vh] font-bold text-[1.2vw]"
                htmlFor="NUM_CREDITS"
              >
                Número de créditos
              </label>

              <input
                className="w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh] :"
                autoComplete="off"
                spellCheck="false"
                title="Seleccione la cantidad de créditos"
                placeholder="Ingrese el número de créditos del plan de curso"
                value={coursesProgramData.NUM_CREDITS}
                onChange={handleChange}
                name="NUM_CREDITS"
                id="NUM_CREDITS"
                min={1}
                type="number"
              />

              <div className="flex items-center w-[94%] mt-[3vh] text-[0.9vw] h-[5vh] px-[1vw]">
                
                <input
                  type="checkbox"
                  id="SIGNATURE"
                  name="SIGNATURE"
                  checked={signature}
                  onChange={handleSignatureChange}
                  className="w-[4vh] h-[5vh] cursor-pointer "
                />

                <span className="text-[1.2vw] ml-[1vw] mt-[0.2vh] ">
                  {signature
                    ? "El programa de curso tiene firma digital"
                    : "El programa de curso no tiene firma digital"}
                </span>
              </div>

              <label
                className="text-left ml-[1vw] mt-[3vh] font-bold text-[1.2vw]"
                htmlFor="PDF_URL"
              >
                PDF asociado
              </label>

              <input
                className="mb-[3vh] border-black text-white  bg-UNA-Red w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] rounded-[1vh]  border-[0.3vh] cursor-pointer"
                value={
                  coursesProgramData.PDF_URL
                    ? "PDF cargado correctamente"
                    : "Seleccionar PDF"
                }
                name="PDF_URL"
                id="PDF_URL"
                type="button"
                onClick={modalChargePDF}
              />
            </div>
            <div className=" w-full h-[7vh] flex -bottom-[34vh] fixed border-white z-50 text-center justify-center items-center">
              <button
                className="border-[0.1vh] bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]
              "
                onClick={() => handleUpdate()}
              >
                Editar
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

export default CoursesProgramUpdate;
