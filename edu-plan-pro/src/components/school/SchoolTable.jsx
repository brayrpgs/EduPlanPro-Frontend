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

async function fetchSchoolData() {
  try {
    const response = await fetch("http://localhost:3001/school", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const jsonResponse = await response.json();
    return Array.isArray(jsonResponse.data) ? jsonResponse.data : [];
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}

const SchoolTable = () => {
  const [schools, setSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);
  const [filteredSchool, setFilteredSchool] = useState([]);

  const [schoolValue, setSchoolValue] = useState("");
  const [facultyValue, setFacultyValue] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSchoolData();
      setFilteredSchool(data);
    };
    loadData();
  }, []);

  useEffect(() => {
    const combinedValue = `${schoolValue} ${facultyValue}`.trim();
    handleSearch(combinedValue);
  }, [schoolValue, facultyValue]);

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
        setSchools(schools.filter((school) => school.ID_SCHOOL !== id));
        window.location.reload();
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

  const handleSearch = async (value) => {
    if (value) {
      try {
        const response = await fetch(
          `http://localhost:3001/searchschool?name=search&data=${value}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();
        if (data.code === "200") {
          setFilteredSchool(data.data);
        } else {
          console.log(data.code);
          setFilteredSchool([]);
        }
      } catch (error) {
        console.error("Error al buscar en el servidor:", error);
      }
    } else {
      // Si no hay valor de búsqueda, volver a cargar todos los datos
      const data = await fetchSchoolData();
      setFilteredSchool(data);
    }
  };

  const handleIconClick = () => {
    window.location.reload();
  };

  const disableInputSearch = true;

  return (
    <div>
      <h1 className="h1-school">Escuelas</h1>

      <div className="school-container">
        <div className="container mt-5">
          <input
            title="Buscar escuelas."
            placeholder="Ingrese el nombre de una escuela"
            type="text"
            className="form-control pl-5 input2"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Tab") {
                setSchoolValue(e.target.value);
              }
            }}
            onBlur={(e) => setSchoolValue(e.target.value)}
            style={{
              backgroundColor: "#A31E32",
              color: "white",
            }}
          />
          <img className="img-search" src={search} alt="Buscar" />
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
                      onSearch={(value) => setSchoolValue(value)}
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
                      onSearch={(value) => setFacultyValue(value)}
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
      </div>
    </div>
  );
};

export default SchoolTable;
