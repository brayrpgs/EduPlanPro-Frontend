import React, { useEffect, useState } from "react";
import SettingServerErrorIcon from "../icons/ServerErrorIcons/SettingServerErrorIcon";

const ServerError = () => {
  const [visible, setVisible] = useState(false);
  const [serverAvailable, setServerAvailable] = useState(false); 

  const checkServerStatus = async () => {
    try {
      
      const response = await fetch("http://localhost:3001/session", {
        method: "GET",
        credentials: "include",
      });  
      if (response.ok) {
        setServerAvailable(true);  
      } else {
        setServerAvailable(false);  
      }
    } catch (error) {
      setServerAvailable(false); 
    }
  };

  useEffect(() => {
    
    checkServerStatus();

    const timer = setTimeout(() => {
      setVisible(true);
    }, 100); 

    return () => clearTimeout(timer); 
  }, []); 

  useEffect(() => {
    if (serverAvailable) {
      
      window.location.assign("/login");
    }
  }, [serverAvailable]); 

  return (
    <div className="flex flex-col items-center w-full h-screen bg-UNA-Blue-Dark justify-center text-center relative">
      <div
        className={`h-[15vh] w-[15vw] flex items-center justify-center relative transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        <div className="inset-0 w-full flex items-center justify-center animate-slow-spin">
          <SettingServerErrorIcon />
        </div>
      </div>
      <div
        className={`flex flex-col justify-center items-center mt-[10vh] text-[1.5vw] animate-pulse text-white transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        Lo sentimos, no podemos acceder al servicio en este momento. El servicio no está disponible en este momento. Por favor, inténtalo de nuevo más tarde.
        
        <button
          className="flex w-[15vw] h-[6vh] border-black border-[0.1vh] mt-[1vh] text-center items-center justify-center bg-UNA-Red rounded-[1vh]"
          onClick={() => { window.location.assign("/login"); }}
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
};

export default ServerError;
