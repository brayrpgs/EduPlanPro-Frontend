import React, { useState } from "react";
import DeleteIcon from "../icons/CrudIcons/DeleteIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import Swal from "sweetalert2";
import { FetchValidate } from "../../utilities/FetchValidate";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

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
  componentName,
  componentPrefix,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function finallyActions() {
    const updatedItems = items.filter(
      (item) => item[itemName] !== fields.find((field) => field.value === "id")
    );
    setItems(updatedItems);

    const remainingItems = totalItems - 1;
    const lastPage = Math.ceil(remainingItems / 8);
    const newPage = Math.min(currentPage, lastPage);
    loadData(newPage);

    setIsOpen(false);
    setItemToDelete(null);
  }

  const handleDelete = async () => {
    const dataToSend = { stat: 0 };

    fields.forEach(({ field, value }) => {
      dataToSend[value] = item[field];
    });

    const url = `http://localhost:3001/${destination}`;

    const options = {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    try {
      setLoading(true);
      const response = await FetchValidate(url, options, navigate);
      console.log(response)
      if (!response) {
        throw new Error("Error en la solicitud");
      }

      if (response.code === "200") {
        Swal.fire({
          title: "Se eliminó con éxito.",
          text: `${
            componentPrefix.charAt(0).toUpperCase() + componentPrefix.slice(1)
          } ${componentName} fue eliminado exitosamente.`,
          icon: "success",
          iconColor: "#7cda24",
          confirmButtonColor: "#a31e32",
          confirmButtonText: "Aceptar",
          willClose: () => {
            finallyActions();
          },
        }).then((result) => {
          if (result.isConfirmed) {
            finallyActions();
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
      }
    } catch (error) {
      setLoading(false);
      console.error("Error al eliminar la facultad:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        title={`Eliminar ${componentName}`}
        className="h-[3vh] w-[1.5vw] flex items-center justify-center hover:scale-125"
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
            ? "w-[30vw] h-[30vh] bg-white fixed top-0 left-0 right-0 bottom-0 m-auto z-50 flex items-center justify-center border-[0.1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300"
            : "w-[10%]"
        } 
            `}
      >
        {isOpen && (
          <div className="w-full flex flex-col justify-center items-center">
            <div className="bg-UNA-Red w-full h-[7vh] flex top-0 absolute border-white z-50 rounded-t-[1vh] text-start items-center">
              <h1 className="text-[3vh] ml-[1vw] text-white">
                Eliminar {componentName}
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
              ¿Estás seguro que deseas eliminar {componentPrefix} siguiente{" "}
              {componentName}?
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
                onClick={() => {
                  setIsOpen(false);
                  setItemToDelete(null);
                }}
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

export default DeleteModal;
