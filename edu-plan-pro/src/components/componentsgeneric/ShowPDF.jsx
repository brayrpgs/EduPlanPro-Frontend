import React, { useEffect, useState } from "react";
import ShowIcon from "../icons/CrudIcons/ShowIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";

export const ShowPDF = ({ title, pdfUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeActions() {
    setIsOpen(false);
  }

  useEffect(() => {
    console.log(pdfUrl);
  }, []);

  return (
    <div>
      <button
        title="Mostrar PDF"
        className="h-[3.5vh] w-[2vw] flex items-center justify-center hover:scale-125"
        onClick={() => setIsOpen(true)}
      >
        <ShowIcon />
      </button>

      <div
        className={`${
          !isOpen && "hidden"
        } bg-gray-600/50 min-h-screen w-full z-40 flex fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]`}
        onClick={() => closeActions()}
      ></div>

      <div
        className={`${
          isOpen
            ? "w-[60vw] min-h-[87vh] overflow-hidden bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300"
            : "w-[15%]"
        }`}
      >
        {isOpen && (
          <div className="w-full flex justify-between items-center ">
            <div className="bg-UNA-Red w-full h-[7vh] flex top-0 fixed border-white z-50 rounded-t-[1vh] text-start items-center justify-between">
              <h1 className="text-[3vh] ml-[1vw] text-white">{title}</h1>
              <button
                className="flex mr-[1vw] w-[8%] h-[60%] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <div className="flex w-[75%] h-[75%]">
                  <CancelActionIcon />
                </div>
              </button>
            </div>
            <iframe
              id="pdfViewer"
              className="w-[58vw] mt-[9vh] h-[76vh] mx-[1vw] border-[0.2vw] border-black"
              src={pdfUrl}
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};
