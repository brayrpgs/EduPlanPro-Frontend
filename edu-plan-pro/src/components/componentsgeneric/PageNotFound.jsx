import React from "react";
import InfoIcon from "../icons/MainIcons/InfoIcon";

const PageNotFound = () => {
  return (
    <div className="min-h-screen  bg-gray-100 flex flex-col justify-center items-center p-[1vw]">
      <div className="max-w-[40vw] w-full bg-white shadow-[0_0.5vh_1vh_rgba(0,0,0,0.5)] rounded-[1vw] overflow-hidden">
        <div className="flex flex-row">
          <div className="w-1/2 bg-UNA-Red mt-[-5vh] p-[1vw] flex flex-col justify-center items-center text-white">
            <h1 className="text-[7.5vw] font-extrabold">404</h1>
            <p className="text-[1.3vw] mt-[1vh]">Página no encontrada</p>
          </div>
          <div className="w-1/2 p-[1vw]">
            <div className="text-center mb-[3vh] w-[10vw] h-[10vh] mx-[25%] text-UNA-Red">
              <InfoIcon />
            </div>
            <h2 className="text-[1.5vw] font-bold text-gray-800 mb-[2vh] text-center">
              EduPlanPro Manage Academic Plans & Course Programs
            </h2>
            <p className="text-gray-600 mb-[4vh] text-center text-[1vw]">
              Lo sentimos, la página que estás buscando no existe o ha sido
              eliminada.
            </p>
            <div className="flex justify-center">
              <button
              onClick={() => { window.location.assign("/login"); }}
              className="bg-UNA-Red/95 hover:bg-UNA-Red/100 text-white text-[1vw] font-bold py-[0.8vw] px-[2.5vw] rounded-[1vw] transition duration-300 ease-in-out transform hover:scale-105">
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[2.5vh] text-center">
        <p className="text-[0.9vw] text-gray-500">
          © {new Date().getFullYear()} EduPlanPro. Todos los derechos
          reservados.
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
