import React, { useState, useEffect } from "react";
import "./FacultyTable.css";
import search from "../images/search.svg";
import deleteIcon from "../icons/ActionIcons/delete.svg";
import DeleteModal from "../modaldelete/DeleteModal";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";

async function fetchFacultyData() {
  try {
    const response = await fetch('http://localhost:3001/faculty', {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    // Asegúrate de que jsonResponse.data sea un array
    return Array.isArray(jsonResponse.data) ? jsonResponse.data : [];
    
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return []; // Siempre retorna un array
  }
}

const FacultyTable = () => {
  const [faculties, setfaculties] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchFacultyData();
      setfaculties(data); 
    };
    loadData();
  }, []); 

  const handleDelete = (id) => {
    setfaculties(faculties.filter((faculty) => faculty.ID_FACULTY !== id));
  };

  const openModal = (faculty) => {
    setFacultyToDelete(faculty);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFacultyToDelete(null);
  };

  const [searchTerms, setSearchTerms] = useState({
    f: ''
  });

  const handleSearch = (value, column) => {
    switch (column) {
      case 'f':
        setSearchTerms((prev) => ({ ...prev, f: value }));
        break;
      default:
        break;
    }
  };

  const filteredFaculty = faculties.filter((faculty) => {

    const matchesFaculty = searchTerms.f
      ? faculty["NOMBRE FACULTAD"]?.toString().toLowerCase().includes(searchTerms.f.toString().toLowerCase())
      : true;

    return matchesFaculty;
  });

  const handleIconClick = () => {
    window.location.reload();
  };

  const disableInputSearch = true;

  return (
    <div>
      <h1 className="h1">Facultades</h1>

      <div className="container mt-5, input">
        <input
          title="Buscar facultades."
          placeholder="Ingrese el nombre de una facultad"
          type="text"
          className="form-control pl-5"
          onChange={(e) => handleSearch(e.target.value, 'f')}
          style={{
            backgroundColor: "#CD1719",
            color: "white",
          }}
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

        <button className="button-filter" title="Restablecer filtros" onClick={handleIconClick}>
          <FilterOffIcon />
        </button>
      </div>

      <div className="container mt-3">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              
              <th className="th f-th">Facultad
                <div title="Filtrar por facultad." style={{ position: 'relative' }}>
                  <SearchInput onSearch={(value) => handleSearch(value, 'f')} inputClassName="search-input pl-3" />
                </div>
              </th>
              <th className="th a-th">Acciones
                <div style={{ position: 'relative' }}>
                  <SearchInput disabled={disableInputSearch} inputClassName="search-input pl-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFaculty.length > 0 ? (
              filteredFaculty.map((faculty) => (
                <tr key={faculty.ID_FACULTY} style={{ color: "#CD1719" }}>
                  
                  <td className="bg-light">
                    <a className="a" href="#">
                      {faculty["NOMBRE FACULTAD"]}
                    </a>
                  </td>
                  <td className="bg-light">
                    <div style={{ textAlign: "center" }}>
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
                  No se encontraron facultades.
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
        itemName={facultyToDelete ? facultyToDelete["NOMBRE FACULTAD"] : "facultad"}
      />
    </div>
  );
};

export default FacultyTable;
