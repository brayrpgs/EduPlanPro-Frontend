import React, { useState } from "react";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import Swal from "sweetalert2";

export const ChargePDF = ({ setIsChargePDF, title, handleChange }) => {
  const [fileName, setFileName] = useState("Selecciona un archivo");
  const [pdfUrl, setPdfUrl] = useState("");
  const [blobURL, setBlobURL] = useState("");

  const updateLabel = (event) => {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      setFileName(`Archivo seleccionado: ${file.name}`);
      if (file.type === "application/pdf") {
        pdfToBase64(file, (base64) => {
          const pdfUrl = "data:application/pdf;base64," + base64;
          setPdfUrl(pdfUrl);

          const base64Data = base64; 
          const binaryString = atob(base64Data); 

          const byteArray = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
          }

          const blob = new Blob([byteArray], { type: "application/pdf" });
          const blobUrl = URL.createObjectURL(blob);

          setBlobURL(blobUrl);
        });
      } else {
        console.error("Por favor, selecciona un archivo PDF válido.");
      }
    } else {
      setFileName("Selecciona un archivo");
      setBlobURL("");
    }
  };

  const handleClick = (type) => {
    if (type === "continue") {
      if (fileName !== "Selecciona un archivo") {
        const mockEvent = {
          target: {
            name: "PDF_URL",
            value: pdfUrl,
          },
        };
        Swal.fire({
          icon: "success",
          iconColor: "#7cda24",
          title: "PDF cargado exitosamente",
          text: "El PDF se ha subido correctamente. Serás redirigido al formulario.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
        }).then(() => {
          handleChange(mockEvent);
          setIsChargePDF(false);
        });
      } else {
        Swal.fire({
          icon: "info",
          iconColor: "#A31E32",
          title: "Carga un PDF para continuar",
          text: "Si prefieres no subir un PDF, puedes cancelar esta acción.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
        });
      }
    } else {
      const mockEvent = {
        target: {
          name: "PDF_URL",
          value: "",
        },
      };
      handleChange(mockEvent);
      setIsChargePDF(false);
    }
  };

  function pdfToBase64(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const base64String = reader.result.split(",")[1];
      callback(base64String);
    };
    reader.onerror = function (error) {
      console.error("Error al leer el archivo:", error);
    };
  }

  return (
    <div className="w-full flex flex-row justify-center items-center">
      <div className="bg-white w-full h-full flex top-0 fixed border-white z-70 rounded-t-[1vh] text-start items-center">
        <div className="bg-UNA-Red w-full h-[7vh] flex top-0 fixed border-white z-50 rounded-t-[1vh] text-start items-center">
          <h2 className="text-[3vh] ml-[1vw] text-white">{title}</h2>
          <div className="w-[5vw] right-0 h-full absolute flex text-center justify-center items-center">
            <button
              className="flex w-[60%] h-[60%] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
              onClick={() => {
                handleClick("cancel");
              }}
            >
              <div className="flex w-[75%] h-[75%]">
                <CancelActionIcon />
              </div>
            </button>
          </div>
        </div>

        <div className="mt-[5vh] h-[59vh] w-full max-w-full flex flex-col items-center relative">
          <label
            htmlFor="file-upload"
            className="bg-UNA-Red text-[1vw] truncate max-w-[33vw] px-[1vw] rounded-[0.56vh] text-white cursor-pointer hover:bg-UNA-Blue-Dark"
            title={fileName}
          >
            {fileName}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={updateLabel}
          />

          <div className="bg- w-[94%] h-full mt-[2vh]">
            <p className="text-[0.9vw] text-center">
              Visualización previa del PDF
            </p>
            {pdfUrl ? (
              <iframe
                id="pdfViewer"
                className="w-full h-[50vh] border-[0.2vw] border-black"
                src={blobURL}
              ></iframe>
            ) : (
              <p className="w-full h-[50vh] border-[0.2vw] border-black"></p>
            )}
          </div>
        </div>

        <div className="w-full h-[7vh] flex bottom-0 fixed border-white z-50 text-center justify-center items-center">
          <button
            onClick={() => {
              handleClick("continue");
            }}
            className="border-[0.1vh] bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]"
          >
            Continuar
          </button>
          <button
            onClick={() => {
              handleClick("cancel");
            }}
            className="border-[0.1vh] bg-UNA-Blue-Dark text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] mr-[1vw] ml-[0.1vw]"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
