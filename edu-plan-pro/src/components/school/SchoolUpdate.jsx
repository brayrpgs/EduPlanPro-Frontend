import React, { useState, useEffect } from "react";
import UpdateIcon from "../icons/CrudIcons/UpdateIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FetchValidate } from "../../utilities/FetchValidate";
import Loading from "../componentsgeneric/Loading";

const SchoolUpdate = ({ school, loadData, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [schoolData, setSchoolData] = useState({
    desc: school["NOMBRE ESCUELA"],
    facu: school["ID_FACULTY"],
    stat: 1,
    id: school["ID_SCHOOL"]
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/faculty", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === "200") {
          setFaculties(data.data);
        }
      })
      .catch((error) => console.error("Error al cargar las facultades:", error));
  }, []);

  function finallyActions() {
    loadData(currentPage);
    setIsOpen(false);
  }

  function closeActions() {
    setIsOpen(false);
    setSchoolData({
      desc: school["NOMBRE ESCUELA"],
      facu: school["ID_FACULTY"],
      stat: 1,
      id: school["ID_SCHOOL"]
    });
  }

  function validateData() {
    const patternString = /^[A-Za-zÁ-ÿ\s]*$/;

    if (schoolData.desc === "" || schoolData.facu === "") {
      Swal.fire({
        icon: "error",
        iconColor: "#A31E32",
        title: "No se pudo actualizar la escuela",
        text: "Los campos del formulario no pueden ir vacíos, completa todos los campos e intenta de nuevo.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#A31E32",
      });
      return false;
    } else {
      if (!patternString.test(schoolData.desc)) {
        Swal.fire({
          icon: "error",
          iconColor: "#a31e32",
          title: "No se pudo actualizar la escuela",
          text: "El nombre de la escuela debe contener solo letras, sin números ni caracteres especiales.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#A31E32",
        });
        return false;
      }
      return true;
    }
  }

  const handleUpdate = async () => {
    const url = "http://localhost:3001/school";

    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(schoolData),
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
            title: "Escuela actualizada",
            text: "La escuela se actualizó correctamente.",
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
        } else if (response.code === "400") {
          Swal.fire({
            icon: "error",
            iconColor: "#a31e32",
            title: "No se pudo actualizar la escuela",
            text: "No se pudo actualizar la escuela, el nombre ya está registrado.",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#A31E32",
          });
        }
      } catch (error) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error al actualizar la escuela",
          text: "Intenta de nuevo mas tarde.",
          confirmButtonColor: "#A31E32",
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchoolData({
      ...schoolData,
      [name]: value,
    });
  };

  return (
    <div>
      <button
        title="Editar escuela."
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

      <div
        className={`${
          isOpen
            ? "w-[35vw] min-h-[30vh] overflow-hidden bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300"
            : "w-[15%]"
        }`}
      >
        {isOpen && (
          <div className="w-full flex flex-col justify-center items-center">
            <div className="bg-UNA-Red w-full h-[7vh] flex top-0 fixed border-white z-50 rounded-t-[1vh] text-start items-center">
              <h1 className="text-[3vh] ml-[1vw] text-white">
                Actualizar escuela
              </h1>
              <div className="w-[5vw] right-0 h-full absolute flex text-center justify-center items-center">
                <button
                  className="flex w-[60%] h-[60%] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
                  onClick={() => closeActions()}
                >
                  <div className="flex w-[75%] h-[75%]">
                    <CancelActionIcon />
                  </div>
                </button>
              </div>
            </div>
            <div className="w-full max-w-full mt-[7vh] mb-[7vh] flex flex-col items-start relative">
              <label
                className="text-left ml-[1vw] mt-[3vh] font-bold text-[1.2vw]"
                htmlFor="desc"
              >
                Nombre de la escuela
              </label>

              <input
                className="w-[93%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh]"
                autoComplete="off"
                spellCheck="false"
                title="Ingrese un nombre. Asegurate que no incluya números ni carácteres especiales."
                placeholder="Ingrese el nombre de la escuela"
                value={schoolData.desc}
                onChange={handleChange}
                name="desc"
                id="desc"
                type="text"
              />

              <label
                className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]"
                htmlFor="facu"
              >
                Facultad
              </label>

              <select
                className="w-[93%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none border-[0.1vh]"
                name="facu"
                id="facu"
                value={schoolData.facu}
                onChange={handleChange}
              >
                <option value="">Seleccione una facultad</option>
                {faculties.map((faculty) => (
                  <option key={faculty.ID_FACULTY} value={faculty.ID_FACULTY}>
                    {faculty["NOMBRE FACULTAD"]}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full h-[7vh] flex bottom-0 fixed border-white z-50 text-center justify-center items-center">
              <button
                className="border-[0.1vh] bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]"
                onClick={() => handleUpdate()}
              >
                Actualizar
              </button>
              <button
                className="border-[0.1vh] bg-UNA-Blue-Dark text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] mr-[1vw] ml-[0.1vw]"
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

export default SchoolUpdate;