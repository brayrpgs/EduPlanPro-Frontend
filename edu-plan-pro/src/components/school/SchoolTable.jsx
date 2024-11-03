import React, { useState, useEffect } from "react";
import "./SchoolTable.css";
import search from "../images/search.svg";
import deleteIcon from "../icons/ActionIcons/delete.svg";
import DeleteModal from "../modaldelete/DeleteModal";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import UpdateSchool from "./UpdateSchool";
import AddIcon from "../icons/ActionIcons/AddIcon";
import SchoolModalAdd from "./SchoolModalAdd";
import MainSearch from "../search/MainSearch";
import Pagination from "../pagination/Pagination";

const SchoolTable = () => {
  const [schools, setSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);
  const [filteredSchool, setFilteredSchool] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");     
  const [searchTerm2, setSearchTerm2] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const loadSchoolData = async (page) => {
    const searchQuery = `&search=${searchTerm}&search2=${searchTerm2}`;
    const response = await fetch(
      `http://localhost:3001/searchschool?name=search-page&numPage=${page}${searchQuery}`,
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
    setFilteredSchool(jsonResponse.data.rows || []);
    setTotalItems(jsonResponse.data.totalMatches || 0);
  };

  useEffect(() => {
    loadSchoolData(currentPage);
  }, [currentPage, searchTerm, searchTerm2]);


  const handleDelete = async (id) => {
    try {
      const response = await fetch("http://localhost:3001/school", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: schoolToDelete.ID_SCHOOL,
          desc: schoolToDelete["NOMBRE ESCUELA"],
          facu: schoolToDelete.ID_FACULTY,
          stat: "0",
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const result = await response.json();

      if (result.code === "200") {
        const updatedSchools = schools.filter(
          (school) => school.ID_SCHOOL !== id
        );
        setSchools(updatedSchools);

        const remainingItems = totalItems - 1;
        const lastPage = Math.ceil(remainingItems / 8);
        setCurrentPage(Math.min(currentPage, lastPage));

        loadSchoolData(Math.min(currentPage, lastPage));

        return true;

      } else {
        console.error("Error al eliminar:", result.data);
        return false;
      }
    } catch (error) {
      console.error("Error al eliminar la escuela:", error);
      return false;
    }
  };

  const openModal = (school) => {
    setSchoolToDelete(school);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSchoolToDelete(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reinicia a la página 1 al buscar
  };

  const handleSearch2 = (value) => {
    setSearchTerm2(value);
    setCurrentPage(1); // Reinicia a la página 1 al buscar
  };

  const handleIconClick = () => {
    setSearchTerm(""); // Restablecer la búsqueda
    setSearchTerm2(""); // Restablecer el segundo término de búsqueda
    setCurrentPage(1); // Reiniciar a la página 1
  };

  const disableInputSearch = true;

  return (
    <div>
      <h1 className="h1-school">Escuelas</h1>

      <div className="school-container">
        <div className="container mt-5" title="Buscar escuelas.">
          
          <MainSearch placeholder={"Ingrese el nombre de una escuela"} onSearch={handleSearch}/>
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
            data-bs-target="#schoolModalAdd"
          >
            <AddIcon />
          </button>
        </div>

        <div className="container mt-3">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th className="th s-th">
                  Escuela
                  <div
                    title="Filtrar por escuela."
                    style={{ position: "relative" }}
                  >
                    <SearchInput
                      onSearch={(value) => handleSearch(value)}
                      inputClassName="search-input pl-3"
                    />
                  </div>
                </th>
                <th className="th f-th">
                  Facultad
                  <div
                    title="Filtrar por facultad."
                    style={{ position: "relative" }}
                  >
                    <SearchInput
                      onSearch={(value) => handleSearch2(value)}
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
              {filteredSchool.length > 0 ? (
                filteredSchool.map((school) => (
                  <tr key={school.ID_SCHOOL} style={{ color: "#CD1719" }}>
                    <td className="bg-light">{school["NOMBRE ESCUELA"]}</td>
                    <td className="bg-light">{school["NOMBRE FACULTAD"]}</td>
                    <td className="bg-light">
                      <div
                        style={{
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <UpdateSchool school={school} />
                        <img
                          title="Eliminar curso."
                          src={deleteIcon}
                          alt="Eliminar"
                          style={{ cursor: "pointer" }}
                          onClick={() => openModal(school)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No se encontraron escuelas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <DeleteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onDelete={handleDelete}
          itemName={
            schoolToDelete ? schoolToDelete["NOMBRE ESCUELA"] : "school"
          }
        />
        <SchoolModalAdd />
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

export default SchoolTable;
