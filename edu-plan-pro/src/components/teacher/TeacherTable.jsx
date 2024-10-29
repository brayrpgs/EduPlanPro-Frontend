import React, { useState, useEffect } from "react";
import "./TeacherTable.css";
import search from "../images/search.svg";
import deleteIcon from "../icons/ActionIcons/delete.svg";
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import AddIcon from "../icons/ActionIcons/AddIcon";
import TeacherModalAdd from "./TeacherModalAdd";
import UsuarioModalAdd from "../usuarios/UsuarioModalAdd";


async function fetchTeacherData() {
  try {
    const response = await fetch("http://localhost:3001/teacher", {
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

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    n: "",
    a: "",
    a: "",
    ce: "",
  });

  useEffect(() => {
    const getTeachers = async () => {
      const data = await fetchTeacherData();
      setTeachers(data);
    };
    getTeachers();
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
      case "ce":
        setSearchTerms((prev) => ({ ...prev, ce: value }));
        break;
      default:
        break;
    }
  };

  const filteredTeacher = teachers.filter((teacher) => {
    const matchesName = searchTerms.n
      ? teacher["NOMBRE"]
          ?.toString()
          .toLowerCase()
          .includes(searchTerms.n.toString().toLowerCase())
      : true;

    const matchesLastName = searchTerms.a
      ? teacher["APELLIDOS"]
          ?.toString()
          .toLowerCase()
          .includes(searchTerms.a.toString().toLowerCase())
      : true;

      const matchesIdCard = searchTerms.c
      ? teacher["CEDULA"]
          ?.toString()
          .toLowerCase()
          .includes(searchTerms.c.toString().toLowerCase())
      : true;

      const matchesEmail = searchTerms.ce
      ? teacher["CORREO"]
          ?.toString()
          .toLowerCase()
          .includes(searchTerms.ce.toString().toLowerCase())
      : true;

    return matchesName && matchesLastName && matchesIdCard && matchesEmail;
  });

  const handleIconClick = () => {
    window.location.reload();
  };

  const disableInputSearch = true;

  return (
    <div>
      <h1 className="h1">Profesores</h1>

      <div className="container mt-5">
        <input
          title="Buscar profesores."
          placeholder="Ingrese el nombre de un profesor"
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

        <button className="button-filter"  title="Agregar Escuela"  data-bs-toggle="modal" data-bs-target="#teacherModalAdd" >
          <AddIcon color={"rgb(255, 0, 0)"}/>
        </button>
        <button className="button-filter"  title="Agregar Usuario"  data-bs-toggle="modal" data-bs-target="#usuarioModalAdd" >
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
              <th className="th f-th">
                Correo electrónico
                <div
                  title="Filtrar por correo electrónico."
                  style={{ position: "relative" }}
                >
                  <SearchInput
                    onSearch={(value) => handleSearch(value, "ce")}
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
                  <td className="bg-light">{teacher["CEDULA"]}</td>
                  <td className="bg-light">{teacher["CORREO"]}</td>
                  <td className="bg-light">
                    <div style={{ textAlign: "center" }}>
                      <img
                        title="Eliminar profesor."
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
                  No se encontraron profesores.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <TeacherModalAdd/>
      <UsuarioModalAdd/>
    </div>
    
  );
};

export default TeacherTable;
