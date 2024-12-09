import React, { useState, useEffect } from "react";
import "./TeacherTable.css";
import search from "../images/search.svg";
import TeacherEditModal from './UpdateTeacher.jsx';
import DeleteModal from "../componentsgeneric/DeleteModal"
import deleteIcon from "../icons/ActionIcons/delete.svg";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import AddIcon from "../icons/CrudIcons/AddIcon";
import TeacherModalAdd from "./TeacherModalAdd";
import MainSearch from "../search/MainSearch";
import Pagination from "../pagination/Pagination";

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);
  const [filteredTeacher, setFilteredTeacher] = useState([]);
  const [nameTeach, setNameTeach] = useState("");
  const [secName, setSecName] = useState("");
  const [idCard, setIdCard] = useState("");
  const [email, setEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const loadTeacherData = async (page) => {
    const searchQuery = `&nameTeach=${nameTeach}&secName=${secName}&idCard=${idCard}&email=${email}`;
    const response = await fetch(
      `http://localhost:3001/searchteacher?name=search-page&numPage=${page}${searchQuery}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.error("Error en la solicitud");
      return;
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse)
    setFilteredTeacher(jsonResponse.data.rows || []);
    setTotalItems(jsonResponse.data.totalMatches || 0);
  };

  useEffect(() => {
    loadTeacherData(currentPage);
  }, [currentPage, nameTeach, secName, idCard, email]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleUpdateSuccess = () => {
    loadTeacherData().then(data => setTeachers(data));
  };

  const handleEditTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedTeacher(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNameTeach = (value) => {
    setNameTeach(value);
    setCurrentPage(1); // Reinicia a la página 1 al buscar
  };

  const handleSecName = (value) => {
    setSecName(value);
    setCurrentPage(1); // Reinicia a la página 1 al buscar
  };

  const handleIdCard = (value) => {
    setIdCard(value);
    setCurrentPage(1); // Reinicia a la página 1 al buscar
  };

  const handleEmail = (value) => {
    setEmail(value);
    setCurrentPage(1); // Reinicia a la página 1 al buscar
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("http://localhost:3001/teacher", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: teacherToDelete.ID_TEACHER, 
          name: teacherToDelete.NOMBRE,
          secName: teacherToDelete.APELLIDOS ,
          idcard: teacherToDelete.CEDULA,
          "email": teacherToDelete.CORREO,
          stat: "0", 
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const result = await response.json();

      if (result.code === "200") {
        // Actualizar la lista de profesores después de eliminar
        const updatedTeachers = teachers.filter(
          (teacher) => teacher.ID_TEACHER !== teacherToDelete.ID_TEACHER
        );
        setTeachers(updatedTeachers);
        return true;
      } else {
        console.error("Error al eliminar:", result.data);
        return false;
      }
    } catch (error) {
      console.error("Error al eliminar el profesor:", error);
      return false;
    }
  };

  const openModal = (teacher) => {
    setTeacherToDelete(teacher);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTeacherToDelete(null);
  };

  const handleIconClick = () => {
    window.location.reload();
  };

  const disableInputSearch = true;

  return (
    <div>
      <h1 className="h1-teacher">Profesores</h1>

      <div className="teacher-container" title="Buscar profesores.">
        <div className="container mt-5">
          <MainSearch
            placeholder={
              "Ingrese el nombre de un profesor"
            } onSearch={handleNameTeach}
          />
          <button
            className="button-filter"
            title="Restablecer filtros"
            onClick={handleIconClick}
          >
            <FilterOffIcon />
          </button>

          <button
            className="button-filter"
            title="Agregar Escuela"
            data-bs-toggle="modal"
            data-bs-target="#teacherModalAdd"
          >
            <AddIcon />
          </button>
        </div>

        <div className="container mt-3">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th className="th s-th">
                  Nombre
                  <div
                    title="Filtrar por nombre."
                    style={{ position: "relative" }}
                  >
                    <SearchInput
                      onSearch={(value) => handleNameTeach(value)}
                      inputClassName="search-input pl-3"
                    />
                  </div>
                </th>
                <th className="th f-th">
                  Apellidos
                  <div
                    title="Filtrar por apellidos."
                    style={{ position: "relative" }}
                  >
                    <SearchInput
                      onSearch={(value) => handleSecName(value)}
                      inputClassName="search-input pl-3"
                    />
                  </div>
                </th>
                <th className="th f-th">
                  Cédula
                  <div
                    title="Filtrar por cédula."
                    style={{ position: "relative" }}
                  >
                    <SearchInput
                      onSearch={(value) => handleIdCard(value)}
                      inputClassName="search-input pl-3"
                    />
                  </div>
                </th>
                <th className="th f-th">
                  Correo electrónico
                  <div
                    title="Filtrar por correo electrónico."
                    style={{ position: "relative" }}
                  >
                    <SearchInput
                      onSearch={(value) => handleEmail(value)}
                      inputClassName="search-input pl-3"
                    />
                  </div>
                </th>
                <th className="th a-th">
                  Acciones
                  <div style={{ position: "relative" }}>
                    <SearchInput
                      disabled={disableInputSearch}
                      inputClassName="search-input pl-3"
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTeacher.length > 0 ? (
                filteredTeacher.map((teacher) => (
                  <tr key={teacher.ID_TEACHER} style={{ color: "#CD1719" }}>
                    <td className="bg-light">{teacher["NOMBRE"]}</td>
                    <td className="bg-light">{teacher["APELLIDOS"]}</td>
                    <td className="bg-light">{teacher["IDENTIFICACION"]}</td>
                    <td className="bg-light">{teacher["CORREO"]}</td>
                    <td className="bg-light">
                      <div style={{ textAlign: "center" }}>
                      <div
                          onClick={() => handleEditTeacher(teacher)}
                          style={{
                            display: 'inline-block',
                            cursor: 'pointer',
                            marginRight: '10px'
                          }}
                        >
                          
                        </div>
                        <img
                          title="Eliminar profesor."
                          src={deleteIcon}
                          alt="Eliminar"
                          style={{ cursor: "pointer" }}
                          onClick={() => openModal(teacher)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No se encontraron profesores.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <TeacherModalAdd />
        <TeacherEditModal
          isOpen={isEditModalOpen}
          teacher={selectedTeacher}
          onClose={handleCloseModal}
          onUpdate={handleUpdateSuccess}
        />
        <DeleteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onDelete={handleDelete}
          itemName={teacherToDelete ? `${teacherToDelete["NOMBRE"]} ${teacherToDelete["APELLIDOS"]}` : "profesor"}
        />
        <Pagination
          totalItems={totalItems}
          itemsPerPage={"8"}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      
    </div>
  );
};

export default TeacherTable;
