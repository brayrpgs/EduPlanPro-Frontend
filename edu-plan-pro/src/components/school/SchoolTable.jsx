import React, { useState, useEffect } from "react";
import "./SchoolTable.css";
import search from "../images/search.svg";
import deleteIcon from "../icons/ActionIcons/delete.svg";
import DeleteModal from "../modaldelete/DeleteModal";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import UpdateModal from "../modalupdate/UpdateModalSchool"
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

    // Asegúrate de que jsonResponse.data sea un array
    return Array.isArray(jsonResponse.data) ? jsonResponse.data : [];

  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return []; // Siempre retorna un array
  }
}

const SchoolTable = () => {
  const [schools, setSchools] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);
  const [searchTerms, setSearchTerms] = useState({
    s: "",
    f: "",
  });

  useEffect(() => {
    const getSchools = async () => {
      const data = await fetchSchoolData();
      setSchools(data); // Cargar los datos desde la API
    };
    getSchools();
  }, []);

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
        // Only update the UI if the server operation was successful
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

  const handleSearch = (value, column) => {
    switch (column) {
      case "s":
        setSearchTerms((prev) => ({ ...prev, s: value }));
        break;
      case "f":
        setSearchTerms((prev) => ({ ...prev, f: value }));
        break;
      default:
        break;
    }
  };

  const filteredSchool = schools.filter((school) => {
    const matchesSchool = searchTerms.s
      ? school["NOMBRE ESCUELA"]
          ?.toString()
          .toLowerCase()
          .includes(searchTerms.s.toString().toLowerCase())
      : true;

    const matchesFaculty = searchTerms.f
      ? school["NOMBRE FACULTAD"]
          ?.toString()
          .toLowerCase()
          .includes(searchTerms.f.toString().toLowerCase())
      : true;

    return matchesSchool && matchesFaculty;
  });

  const handleIconClick = () => {
    window.location.reload();
  };

  const disableInputSearch = true;

  return (
    <div>
      <h1 className="h1">Escuelas</h1>

      <div className="container mt-5">
        <input
          title="Buscar escuelas."
          placeholder="Ingrese el nombre de una escuela"
          type="text"
          className="form-control pl-5 input2"
          onChange={(e) => handleSearch(e.target.value, "s")}
          style={{
            backgroundColor: "#CD1719",
            color: "white",
          }}
        />
        <img className="img-search"
          src={search}
          alt="Buscar"
          
        />
        <button
          className="button-filter"
          title="Restablecer filtros"
          onClick={handleIconClick}
        >
          <FilterOffIcon />
        </button>

        <button className="button-filter"  title="Agregar Escuela"  data-bs-toggle="modal" data-bs-target="#schoolModalAdd" >
          <AddIcon color={"rgb(255, 0, 0)"}/>
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
                    onSearch={(value) => handleSearch(value, "s")}
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
                    onSearch={(value) => handleSearch(value, "f")}
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
                  <td className="bg-light">
                    {school["NOMBRE ESCUELA"]}
                  </td>
                  <td className="bg-light">
                    {school["NOMBRE FACULTAD"]}
                  </a>
                </td>
                <td className="bg-light">
                  <div style={{ textAlign: "center" }}>
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
            ))}
          </tbody>
        </table>
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDelete}
        itemName={schoolToDelete ? schoolToDelete["NOMBRE ESCUELA"] : "school"}
      />
      <SchoolModalAdd/>
    </div>
  );
};

export default SchoolTable;
