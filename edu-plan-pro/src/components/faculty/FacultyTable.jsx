import React, { useState, useEffect } from "react";
import "./FacultyTable.css";
import search from "../images/search.svg";
import deleteIcon from "../icons/ActionIcons/delete.svg";
import DeleteModal from "../modaldelete/DeleteModal";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import AddIcon from "../icons/ActionIcons/AddIcon";
import FacultyModalAdd from "./FacultyModalAdd";
import UpdateFaculty from "./UpdateFaculty";
import MainSearch from "../search/MainSearch";
import Pagination from "../pagination/Pagination";

async function fetchFacultyData(page) {
  try {
    const response = await fetch(
      `http://localhost:3001/searchfaculty?name=search-page&numPage=${page}&search=`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const jsonResponse = await response.json();

    return Array.isArray(jsonResponse.data.rows) ? jsonResponse.data : [];
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}

const FacultyTable = () => {
  const [faculties, setFaculties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState(null);
  const [filteredFaculty, setFilteredFaculty] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [infoPage, setInfoPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchFacultyData(currentPage);
      setFilteredFaculty(data.rows);
    };
    loadData();
  }, []);

  const loadFacultyData = async (page) => {
    const data = await fetchFacultyData(page);
    setInfoPage(data.rows);
    setFilteredFaculty(data.rows);
    setTotalItems(data.totalMatches);
  };

  useEffect(() => {
    loadFacultyData(currentPage);
  }, [currentPage], [searchTerm]);

  const handlePageChange = async (page) => {
    setCurrentPage(page);

    if (searchTerm) {
      // Si hay un término de búsqueda activo, busca en la página correspondiente de los resultados de búsqueda
      const response = await fetch(
        `http://localhost:3001/searchfaculty?name=search-page&numPage=${page}&search=${searchTerm}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const jsonResponse = await response.json();
      setFilteredFaculty(jsonResponse.data.rows);
    } else {
      // Si no hay búsqueda activa, carga los datos de la página seleccionada
      loadFacultyData(page);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch("http://localhost:3001/faculty", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: facultyToDelete.ID_FACULTY,
          desc: facultyToDelete["NOMBRE FACULTAD"],
          stat: "0",
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const result = await response.json();

      if (result.code === "200") {
        setFaculties(faculties.filter((faculty) => faculty.ID_FACULTY !== id));
        window.location.reload();
        return true;
      } else {
        console.error("Error al eliminar:", result.data);
        return false;
      }
    } catch (error) {
      console.error("Error al eliminar la facultad:", error);
      return false;
    }
  };

  const openModal = (faculty) => {
    setFacultyToDelete(faculty);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFacultyToDelete(null);
  };

  const handleSearch = async (value) => {
    setSearchTerm(value);
    if (value) {
      try {
        const response = await fetch(
          `http://localhost:3001/searchfaculty?name=search-page&numPage=1&search=${value}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const jsonResponse = await response.json();

        const data = Array.isArray(jsonResponse.data.rows)
          ? jsonResponse.data
          : [];

        if (jsonResponse.code === "200") {
          setFilteredFaculty(data.rows);
          setTotalItems(data.totalMatches);
          setCurrentPage(1);
        } else {
          console.log(jsonResponse.code);
          setFilteredFaculty([]);
        }
      } catch (error) {
        console.error("Error al buscar en el servidor:", error);
      }
    } else {
      loadFacultyData(1);
    }
  };

  const handleIconClick = () => {
    window.location.reload();
  };

  const disableInputSearch = true;

  return (
    <div>
      <h1 className="h1-faculty">Facultades</h1>
      <div className="faculty-container">
        <div className="container mt-5, input " title="Buscar facultades.">
          <MainSearch
            placeholder={"Ingrese el nombre de una facultad"}
            onSearch={handleSearch}
          />

          <img
            src={search}
            alt="Buscar"
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
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
            title="Agregar Facultad"
            data-bs-toggle="modal"
            data-bs-target="#facultyModalAdd"
          >
            <AddIcon />
          </button>
        </div>

        <div className="container mt-3">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th className="th f-th">
                  Facultad
                  <div
                    title="Filtrar por facultad."
                    style={{ position: "relative" }}
                  >
                    <SearchInput
                      onSearch={(value) => handleSearch(value)}
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
              {filteredFaculty.length > 0 ? (
                filteredFaculty.map((faculty) => (
                  <tr key={faculty.ID_FACULTY}>
                    <td className="bg-light">{faculty["NOMBRE FACULTAD"]}</td>
                    <td className="bg-light">
                      <div
                        style={{
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <UpdateFaculty faculty={faculty} />
                        <img
                          title="Eliminar facultad."
                          src={deleteIcon}
                          alt="Eliminar"
                          style={{ cursor: "pointer" }}
                          onClick={() => openModal(faculty)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No se encontraron facultades registradas.
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
            facultyToDelete ? facultyToDelete["NOMBRE FACULTAD"] : "facultad"
          }
        />
        <FacultyModalAdd />
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

export default FacultyTable;
