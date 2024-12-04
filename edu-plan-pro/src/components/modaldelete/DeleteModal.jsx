import React, { useState } from "react";
import DeleteIcon from "../icons/DeleteIcons/DeleteIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import Swal from "sweetalert2";

const DeleteModal = ({
  item,
  itemName,
  fields,
  items,
  setItems,
  totalItems,
  currentPage,
  loadData,
  destination,
  
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const infoCancel = () => {
    Swal.fire({
      title: "Acción cancelada.",
      text: "La acción fue cancelada.",
      icon: "info",
      iconColor: "#2B385A",
      confirmButtonColor: "#A31E32",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsOpen(false);
        setItemToDelete(null);
      }
    });
  };

  const handleDelete = async () => {

    const dataToSend = { stat: 0 };

    fields.forEach(({field, value}) => {
      dataToSend[value] = item[field]
    })

    try {
      const response = await fetch(`http://localhost:3001/${destination}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const result = await response.json();

      if (result.code === "200") {
        Swal.fire({
          title: "¡Eliminado!",
          text: "El elemento fue eliminado exitosamente.",
          icon: "success",
          confirmButtonColor: "#A31E32",
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            const updatedItems = items.filter(
              (item) => item[itemName] !== fields.find(field => field.value === "id")
            );
            setItems(updatedItems);

            const remainingItems = totalItems - 1;
            const lastPage = Math.ceil(remainingItems / 8);
            const newPage = Math.min(currentPage, lastPage);
            loadData(newPage);

            setIsOpen(false);
            setItemToDelete(null);
          }
        });
      } else {
        Swal.fire({
          title: "Error al eliminar.",
          text: "El elemento no se ha podido eliminar, intenta de nuevo más tarde.",
          icon: "error",
          confirmButtonColor: "#A31E32",
          confirmButtonText: "Aceptar",
        });
        console.log(result);
      }
    } catch (error) {
      console.error("Error al eliminar la facultad:", error);
    }
  };

  return (
    <div>
      <button
        className="h-[2vh] w-[1.5vw] flex items-center justify-center"
        onClick={() => {
          setIsOpen(true);
          setItemToDelete(item);
        }}
      >
        <DeleteIcon />
      </button>

      <div
        className={`${
          !isOpen && "hidden"
        } bg-gray-600/50 min-h-screen w-full z-40 flex fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]`}
        onClick={() => {
          setIsOpen(false);
          setItemToDelete(null);
        }}
      ></div>

      <div
        className={`${
          isOpen
            ? "transition-all duration-500 ease-in-out w-[30vw] h-[30vh] bg-white fixed top-0 left-0 right-0 bottom-0 m-auto z-50 flex items-center justify-center border-[0.1vh] border-gray-400 rounded-[1vh] shadow-2xl"
            : "w-[0%] h-[0%]"
        } 
            `}
      >
        {isOpen && (
          <div className="w-full flex flex-col justify-center items-center">
            <div className="bg-UNA-Red w-full h-[7vh] flex top-0 absolute border-white z-50 rounded-t-[1vh] text-start items-center">
              <h1 className="text-[3vh] ml-[1vw] text-white">
                Eliminar elemento
              </h1>
              <div className="w-[5vw] right-0 h-full absolute flex text-center justify-center items-center">
                <button
                  className="flex w-[60%] h-[60%] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
                  onClick={() => {
                    setIsOpen(false);
                    setItemToDelete(null);
                  }}
                >
                  <div className="flex w-[75%] h-[75%]">
                    <CancelActionIcon />
                  </div>
                </button>
              </div>
            </div>

            <h1 className="text-[1.1vw] flex items-center text-center">
              ¿Estás seguro que deseas eliminar el siguiente elemento?
            </h1>
            <div className="w-full flex flex-wrap items-center text-center justify-center">
              <p className="ml-[1vw] mr-[1vw] text-[1.0vw] text-center break-words mt-[3vh] max-w-full overflow-auto max-h-[6vh]">
                {itemToDelete[itemName]}
              </p>
            </div>

            <div className="w-full h-[7vh] flex bottom-0 absolute border-white z-50 text-center justify-center items-center">
              <button
                className="border-[0.1vh] bg-UNA-Red text-white rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]"
                onClick={() => handleDelete()}
              >
                Eliminar
              </button>
              <button
                className="border-[0.1vh] bg-UNA-Blue-Dark text-white rounded-[0.3vw] h-[60%] border-black w-[50%] mr-[1vw] ml-[0.1vw]
              "
                onClick={() => infoCancel()}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteModal;
