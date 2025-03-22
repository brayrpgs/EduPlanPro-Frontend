import React, { useState } from "react";
import AttachIcon from "../icons/MainIcons/AttachIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import { useNavigate } from "react-router-dom";
import Loading from "../componentsgeneric/Loading";
import { FetchValidate } from "../../utilities/FetchValidate";
import SearchIcon from "../icons/SearchIcons/SearchIcon";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon.jsx";

export const AttachmentTeachers = ({ idCourseProgram }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    nameTeach: "",
    secName: "",
    idCard: "",
    email: "",
  });

  const navigate = useNavigate();

  function closeActions() {
    setSearchQuery({
      nameTeach: "",
      secName: "",
      idCard: "",
      email: "",
    });
    setSelectedTeachers([]);
    setTeachers([]);
    setIsOpen(false);
  }

  const handleSelectChange = (event) => {
    const selectedId = Number(event.target.value);
    const selectedTeacher = teachers.find((t) => t.ID_TEACHER === selectedId);

    if (
      selectedTeacher &&
      !selectedTeachers.some((t) => t.ID_TEACHER === selectedId)
    ) {
      setSelectedTeachers([...selectedTeachers, selectedTeacher]);
    }
  };

  const handleRemoveTeacher = (teacherId) => {
    setSelectedTeachers((prev) =>
      prev.filter((teacher) => teacher.ID_TEACHER !== teacherId)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({
      ...searchQuery,
      [name]: value,
    });
  };

  const clearSearch = () => {
    setSearchQuery({
      nameTeach: "",
      secName: "",
      idCard: "",
      email: "",
    });
    setTeachers([]);
  };

  const asociateTeachersAndCoursesPrograms = async () => {
    const url = "http://localhost:3001/teachercourseprogram";
  
    try {
      setLoading(true);

      for (let i = 0; i < selectedTeachers.length; i++) {
        
        const teacher = selectedTeachers[i];
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ID_TEACHER: teacher.ID_TEACHER,
            ID_COURSE_PROGRAM: idCourseProgram
          }),
          credentials: "include",
          
        };

        const response = await FetchValidate(url, options, navigate);
        console.log(`Respuesta del profesor ${teacher.ID_TEACHER}:`, response);

        if (!response) {
          console.error(
            "Error en la solicitud para el profesor:",
            teacher.ID_TEACHER
          );
          continue; 
        }
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const url = `http://localhost:3001/searchteacher?name=search-page&numPage=1&nameTeach=${searchQuery["nameTeach"]}&secName=${searchQuery["secName"]}&idCard=${searchQuery["idCard"]}&email=${searchQuery["email"]}`;
    const options = {
      method: "GET",
      credentials: "include",
    };
    try {
      setLoading(true);
      const response = await FetchValidate(url, options, navigate);
      console.log(response);
      if (!response) {
        console.error("Error en la solicitud");
        return;
      }
      setTeachers(response.data.rows || []);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        title="Asociar profesores"
        className="h-[3.5vh] w-[2vw] flex items-center justify-center hover:scale-125"
        onClick={() => setIsOpen(true)}
      >
        <AttachIcon />
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
          <div className="w-full flex justify-between items-center">
            <div className="bg-UNA-Red w-full h-[7vh] flex top-0 fixed border-white z-50 rounded-t-[1vh] text-start items-center justify-between">
              <h1 className="text-[3vh] ml-[1vw] text-white">
                Asociar profesores a programas de curso
              </h1>
              <button
                className="flex mr-[1vw] w-[8%] h-[60%] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
                onClick={closeActions}
              >
                <div className="flex w-[75%] h-[75%]">
                  <CancelActionIcon />
                </div>
              </button>
            </div>

            <div className=" w-full h-[70vh] z-60 mt-[10vh] flex flex-col mx-[1vw]">
              <h1 className="text-center text-[1.1vw]">Buscar profesor</h1>
              <div className="w-full h-[10%] flex flex-row mt-[0.5vh] justify-center gap-[1%] ">
                <div className="flex flex-col w-[20%] h-full items-center justify-center">
                  <input
                    autoComplete="off"
                    spellCheck="false"
                    title="Buscar por nombre"
                    placeholder="Nombre del profesor"
                    className="w-full items-center justify-center text-[0.9vw] h-[4vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.3vh] border-black/75"
                    type="text"
                    value={searchQuery.nameTeach}
                    onChange={handleChange}
                    name="nameTeach"
                    id="nameTeach"
                  />
                </div>
                <div className="flex flex-col w-[20%] h-full items-center justify-center">
                  <input
                    autoComplete="off"
                    spellCheck="false"
                    title="Buscar por apellidos"
                    placeholder="Apellidos del profesor"
                    className="w-full items-center justify-center text-[0.9vw] h-[4vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.3vh] border-black/75"
                    type="text"
                    value={searchQuery.secName}
                    onChange={handleChange}
                    name="secName"
                    id="secName"
                  />
                </div>
                <div className="flex flex-col w-[20%] h-full items-center justify-center">
                  <input
                    autoComplete="off"
                    spellCheck="false"
                    title="Buscar por cédula"
                    placeholder="Cédula del profesor"
                    className="w-full items-center justify-center text-[0.9vw] h-[4vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.3vh] border-black/75"
                    type="text"
                    value={searchQuery.idCard}
                    onChange={handleChange}
                    name="idCard"
                    id="idCard"
                  />
                </div>
                <div className="flex flex-col w-[20%] h-full items-center justify-center">
                  <input
                    autoComplete="off"
                    spellCheck="false"
                    title="Buscar por correo"
                    placeholder="Correo del profesor"
                    className="w-full items-center justify-center text-[0.9vw] h-[4vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.3vh] border-black/75"
                    type="email"
                    value={searchQuery.email}
                    onChange={handleChange}
                    name="email"
                    id="email"
                  />
                </div>
                <div className="flex flex-col w-[3%] h-full items-center justify-center">
                  <button
                    title="Buscar"
                    className="w-[1.9vw] bg-UNA-Red rounded-[0.4vw]"
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                  </button>
                </div>
                <div className="flex flex-col w-[3%] h-full items-center justify-center">
                  <button
                    title="Limpiar campos de busqueda"
                    className="w-[2.2vw]"
                    onClick={clearSearch}
                  >
                    <FilterOffIcon />
                  </button>
                </div>
              </div>
              <h1 className="mt-[3vh] text-center text-[1.1vw]">
                Profesores encontrados
              </h1>

              <div className="h-[18vh] w-full flex flex-col items-center">
                <select
                  name="foundedTeachers"
                  id="foundedTeachers"
                  title="Seleccionar profesor"
                  className="cursor-pointer w-[50%] h-full justify-center rounded-[0.5vw] border-black border-[0.1vw] outline-none appearance-none"
                  size={3}
                  onChange={handleSelectChange}
                >
                  {teachers.map((teacher) => (
                    <option
                      className="py-[0.5vh]"
                      key={teacher.ID_TEACHER}
                      value={teacher.ID_TEACHER}
                    >
                      {teacher["NOMBRE"] +
                        " " +
                        teacher["APELLIDOS"] +
                        " - " +
                        teacher["IDENTIFICACION"]}
                    </option>
                  ))}
                </select>
              </div>
              <h1 className="mt-[3vh] text-center text-[1.1vw]">
                Profesores seleccionados
              </h1>

              <div className=" h-full w-full flex flex-row justify-center border-black border-[0.2vw] overflow-y-auto gap-[0.6%] flex-wrap">
                {selectedTeachers.map((teacher) => (
                  <div
                    key={teacher.ID_TEACHER}
                    className="gap-[0.5vw] relative bg-white overflow-x-hidden border-[0.2vw] rounded-[0.5vw] text-black flex items-center justify-center w-[32%] h-[5vh]"
                  >
                    <span className="whitespace-nowrap overflow-hidden text-ellipsis text-[0.8vw] pl-[1vw] pr-[2vw] w-[57vw]">
                      {teacher["NOMBRE"] +
                        " " +
                        teacher["APELLIDOS"] +
                        " - " +
                        teacher["IDENTIFICACION"]}
                    </span>

                    <div
                      onClick={() => handleRemoveTeacher(teacher.ID_TEACHER)}
                      className="cursor-pointer w-[2vw] h-full absolute right-0 top-0 mr-[0.5vw] flex items-center justify-center bg-white"
                    >
                      <CancelActionIcon red={true} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" w-full h-[7vh] -mb-[87vh] flex fixed border-white z-70 text-center justify-center items-center">
              <button
                className="border-[0.1vh]  bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]
              "
                onClick={asociateTeachersAndCoursesPrograms}
              >
                Asociar
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
