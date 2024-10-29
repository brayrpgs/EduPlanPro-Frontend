import React, { useState, useEffect } from "react";
import "./UserTable.css";
import search from "../images/search.svg";
import deleteIcon from "../icons/ActionIcons/delete.svg";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import AddIcon from "../icons/ActionIcons/AddIcon";
import UserModalAdd from "./UserModalAdd.jsx";

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

    return Array.isArray(jsonResponse.data) ? jsonResponse.data : [];

  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return [];
  }
}

const UserTable = () => {
  const [Users, setUsers] = useState([]);
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

  const filteredUser = Users.filter((User) => {
    const matchesName = searchTerms.n
      ? User["DSC_NAME"]
          ?.toString()
          .toLowerCase()
          .includes(searchTerms.n.toString().toLowerCase())
      : true;

    const matchesLastName = searchTerms.a
      ? User["DSC_SECOND_NAME"]
          ?.toString()
          .toLowerCase()
          .includes(searchTerms.a.toString().toLowerCase())
      : true;

      const matchesIdCard = searchTerms.c
      ? User["IDCARD"]
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
      <h1 className="h1">Usuarios</h1>

      <div className="container mt-5">
        <input
          title="Buscar usuarios."
          placeholder="Ingrese el nombre de un usuario"
          type="text"
          className="form-control pl-5 input2"
          onChange={(e) => handleSearch(e.target.value, "n")}
          style={{
            backgroundColor: "#CD1719",
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

        <button className="button-filter"  title="Agregar Usuario"  data-bs-toggle="modal" data-bs-target="#userModalAdd" >
          <AddIcon color={"rgb(255, 0, 0)"}/>
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
      <UserModalAdd/>
    </div>
  );
};

export default UserTable;
