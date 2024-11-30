import React, { useState } from "react";
import OpenSideBar from "../icons/AsideIcons/OpenSideBar";
import CloseSideBar from "../icons/AsideIcons/CloseSideBar";
import AccountCircleAdmin from "../icons/AsideIcons/AccountCircleAdmin";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex fixed w-[2vw] h-[3vh]">
      <button onClick={() => setIsOpen(true)}>
        <OpenSideBar />
      </button>

      <div
        className={`${
          !isOpen && "hidden"
        } bg-gray-600/50 min-h-screen w-full flex fixed top-0 right-0 left-0 backdrop-blur-[0.2vh]`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div 
        className={`${
          isOpen ? "w-[17vw]" : "w-[0%]"
        } bg-white min-h-screen w-[17vw] top-0 right-0 fixed transition-all duration-300`}
      >
        <div className={`${!isOpen && "hidden"}`}>
          <div className="flex fixed w-[2vw] h-[3vh] right-[2vh] top-[2.5vh]">
            <button onClick={() => setIsOpen(false)}>
              <CloseSideBar />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center w-[13vw] h-[17vh] mt-[4vh]">
              <AccountCircleAdmin />
            </div>

            <div className="flex justify-center overflow-hidden w-[80%] ">
              <h1 className="text-[1.3vw] truncate">Usuario Administrador</h1>
            </div>
          </div>

          <div className="text-center text-[1.1vw] cursor-pointer py-[1vh] mt-[2vh] hover:bg-UNA-Red hover:text-white">
            Mi perfil
          </div>
          <div className="text-center text-[1.1vw] cursor-pointer py-[1vh] mt-[1vh] hover:bg-UNA-Red hover:text-white">
            Cambiar Clave
          </div>
          <div className="text-center text-[1.1vw] cursor-pointer py-[1vh] mt-[1vh] hover:bg-UNA-Red hover:text-white">
            Preferencias
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
