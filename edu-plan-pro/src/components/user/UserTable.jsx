import React, { useState, useEffect } from "react";
import "./UserTable.css";
import search from "../images/search.svg";
import UpdateIcon from '../icons/ModalUpdateIcons/IconUpdate';
import deleteIcon from "../icons/ActionIcons/delete.svg";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import AddIcon from "../icons/ActionIcons/AddIcon";
import UserModalAdd from "./UserModalAdd.jsx";
import UpdateUser from "./UpdateUser.jsx";
import MainSearch from "../search/MainSearch.jsx";

async function fetchUserData() {
  try {
    const response = await fetch("http://localhost:3001/user", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const jsonResponse = await response.json();
    console.log(jsonResponse)
    return Array.isArray(jsonResponse.data) ? jsonResponse.data : [];
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}

const UserTable = () => {
  const [Users, setUsers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerms, setSearchTerms] = useState({
    n: "",
    a: "",
    a: "",
  });

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUserData();
      setUsers(data);
    };
    getUsers();
  }, []);

  const handleSearch = (value, column) => {
    switch (column) {
      case "n":
        setSearchTerms((prev) => ({ ...prev, n: value }));
        break;
      case "a":
        setSearchTerms((prev) => ({ ...prev, a: value }));
        break;
      case "c":
        setSearchTerms((prev) => ({ ...prev, c: value }));
        break;
      default:
        break;
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleUpdateSuccess = () => {
    fetchUserData().then(data => setUsers(data));
  };


  const filteredUser = Users.filter((User) => {
    const matchesName = searchTerms.n
      ? User["NOMBRE"]
        ?.toString()
        .toLowerCase()
        .includes(searchTerms.n.toString().toLowerCase())
      : true;

    const matchesLastName = searchTerms.a
      ? User["APELLIDOS"]
        ?.toString()
        .toLowerCase()
        .includes(searchTerms.a.toString().toLowerCase())
      : true;

    const matchesIdCard = searchTerms.c
      ? User["IDENTIFICACION"]
        ?.toString()
        .toLowerCase()
        .includes(searchTerms.c.toString().toLowerCase())
      : true;

    return matchesName && matchesLastName && matchesIdCard;
  });

  const handleIconClick = () => {
    window.location.reload();
  };

  const disableInputSearch = true;

  return (
    <div>
      <h1 className="h1-user">Usuarios</h1>

      <div className="user-container">
        <div className="container mt-5" title="Buscar usuarios.">
          <MainSearch placeholder={"Ingrese el nombre de un usuario"} /*onSearch={handleSearch}*/ />
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
                      onSearch={(value) => handleSearch(value, "n")}
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
                      onSearch={(value) => handleSearch(value, "a")}
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
                      onSearch={(value) => handleSearch(value, "c")}
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
                    <td className="bg-light">{User["DSC_NAME"]}</td>
                    <td className="bg-light">{User["DSC_SECOND_NAME"]}</td>
                    <td className="bg-light">{User["IDCARD"]}</td>
                    <td className="bg-light">
                      <div style={{ textAlign: "center" }}>
                        <div
                          onClick={() => handleEditUser(User)}
                          style={{
                            display: 'inline-block',
                            cursor: 'pointer',
                            marginRight: '10px'
                          }}
                        >
                          <UpdateIcon />
                        </div>
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
        <UpdateUser
          isOpen={isEditModalOpen}
          user={selectedUser}
          onClose={handleCloseModal}
          onUpdate={handleUpdateSuccess}
        />
      </div>
    </div>
  );
};

export default UserTable;
