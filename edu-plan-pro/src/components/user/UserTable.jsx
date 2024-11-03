import React, { useState, useEffect } from "react";
import "./UserTable.css";
import search from "../images/search.svg";
import deleteIcon from "../icons/ActionIcons/delete.svg";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import AddIcon from "../icons/ActionIcons/AddIcon";
import UserModalAdd from "./UserModalAdd.jsx";
import MainSearch from "../search/MainSearch.jsx";
import Pagination from "../pagination/Pagination.jsx";


const UserTable = () => {
  
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [filteredUser, setFilteredUser] = useState([]);
  const [nameUser, setNameUser] = useState("");
  const [secName, setSecName] = useState("");
  const [idCard, setIdCard] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const loadUserData = async (page) => {
    const searchQuery = `&nameUser=${nameUser}&secName=${secName}&idCard=${idCard}`;
    const response = await fetch(
      `http://localhost:3001/searchuser?name=search-page&numPage=${page}${searchQuery}`,
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
    setFilteredUser(jsonResponse.data.rows || []);
    setTotalItems(jsonResponse.data.totalMatches || 0);
  };

  useEffect(() => {
    loadUserData(currentPage);
  }, [currentPage, nameUser, secName, idCard]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNameUser = (value) => {
    setNameUser(value);
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

  const handleIconClick = () => {
    window.location.reload();
  };

  const disableInputSearch = true;

  return (
    <div>
      <h1 className="h1-user">Usuarios</h1>

      <div className="user-container">
        <div className="container mt-5" title="Buscar usuarios.">
        <MainSearch placeholder={"Ingrese el nombre de un usuario"} onSearch={handleNameUser}/>
          <button
            className="button-filter"
            title="Restablecer filtros"
            onClick={handleIconClick}
          >
            <FilterOffIcon />
          </button>

          <button
            className="button-filter"
            title="Agregar Usuario"
            data-bs-toggle="modal"
            data-bs-target="#userModalAdd"
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
                      onSearch={(value) => handleNameUser(value)}
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
              {filteredUser.length > 0 ? (
                filteredUser.map((User) => (
                  <tr key={User.ID_USER} style={{ color: "#CD1719" }}>
                    <td className="bg-light">{User["NOMBRE"]}</td>
                    <td className="bg-light">{User["APELLIDOS"]}</td>
                    <td className="bg-light">{User["IDENTIFICACION"]}</td>
                    <td className="bg-light">
                      <div style={{ textAlign: "center" }}>
                        <img
                          title="Eliminar usuario."
                          src={deleteIcon}
                          alt="Eliminar"
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <UserModalAdd />
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

export default UserTable;
