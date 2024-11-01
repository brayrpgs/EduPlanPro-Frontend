import React, { useState } from "react";
import search from "../images/search.svg";
import deleteIcon from "../icons/ActionIcons/delete.svg";
import DeleteModal from "../modaldelete/DeleteModal"; 
import SearchInput from "../search/SearchInput";
import FilterOffIcon from "../icons/MainIcons/FilterOffIcon";
import "./CoursesPlanTable.css";

const dataExample = [
  {
    id: 1,
    Nombrecourse: "Ingenieria 2",
    Annio: 2024,
    Profesor: "Adan Carranza",
    PlanEstudio: "2022-2026",
    NRC: "RF764",
    Ciclo: "I Ciclo",
    NumeroCreditos: 4,
    Firma: true,
  },
  {
    id: 2,
    Nombrecourse: "Matematicas 1",
    Annio: 2024,
    Profesor: "Laura Gomez",
    PlanEstudio: "2021-2025",
    NRC: "MG112",
    Ciclo: "I Ciclo",
    NumeroCreditos: 3,
    Firma: true,
  },
  {
    id: 3,
    Nombrecourse: "Fisica General",
    Annio: 2024,
    Profesor: "Carlos Lopez",
    PlanEstudio: "2020-2024",
    NRC: "FG243",
    Ciclo: "II Ciclo",
    NumeroCreditos: 5,
    Firma: false,
  },
  {
    id: 4,
    Nombrecourse: "Programacion Avanzada",
    Annio: 2024,
    Profesor: "Ana Perez",
    PlanEstudio: "2022-2026",
    NRC: "PA311",
    Ciclo: "III Ciclo",
    NumeroCreditos: 4,
    Firma: true,
  },
  {
    id: 5,
    Nombrecourse: "Estructuras de Datos",
    Annio: 2024,
    Profesor: "Jorge Martinez",
    PlanEstudio: "2021-2025",
    NRC: "ED654",
    Ciclo: "I Ciclo",
    NumeroCreditos: 4,
    Firma: true,
  },
  {
    id: 6,
    Nombrecourse: "Bases de Datos",
    Annio: 2024,
    Profesor: "Sandra Lopez",
    PlanEstudio: "2020-2024",
    NRC: "BD101",
    Ciclo: "II Ciclo",
    NumeroCreditos: 3,
    Firma: false,
  },
  {
    id: 7,
    Nombrecourse: "Redes de Computadoras",
    Annio: 2024,
    Profesor: "Juan Morales",
    PlanEstudio: "2023-2027",
    NRC: "RC523",
    Ciclo: "III Ciclo",
    NumeroCreditos: 5,
    Firma: true,
  },
  {
    id: 8,
    Nombrecourse: "Sistemas Operativos",
    Annio: 2024,
    Profesor: "Felix Rivas",
    PlanEstudio: "2022-2026",
    NRC: "SO785",
    Ciclo: "II Ciclo",
    NumeroCreditos: 4,
    Firma: true,
  },
  {
    id: 9,
    Nombrecourse: "Algoritmos",
    Annio: 2024,
    Profesor: "Mariana Torres",
    PlanEstudio: "2021-2025",
    NRC: "AL980",
    Ciclo: "I Ciclo",
    NumeroCreditos: 3,
    Firma: false,
  },
  {
    id: 10,
    Nombrecourse: "Ingenieria de Software",
    Annio: 2024,
    Profesor: "Ricardo Vargas",
    PlanEstudio: "2020-2024",
    NRC: "IS124",
    Ciclo: "III Ciclo",
    NumeroCreditos: 5,
    Firma: true,
  },
];
const MainTable = () => {
  const [courses, setcourses] = useState(dataExample);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cursoToDelete, setCursoToDelete] = useState(null);

  const handleDelete = (id) => {
    setcourses(courses.filter((course) => course.id !== id));
  };

  const openModal = (course) => {
    setCursoToDelete(course );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCursoToDelete(null);
  };

  const [searchTerms, setSearchTerms] = useState({
    nc: '',
    y: '',
    p: '',
    ep: '',
    nrc: '',
    c: '',
    ncr: '',
    f: ''
  });
  
  

  const handleSearch = (value, column) => {
    switch (column) {
      case 'nc':
        setSearchTerms((prev) => ({ ...prev, nc: value }));
        break;
      case 'y':
        setSearchTerms((prev) => ({ ...prev, y: value }));
        break;
      case 'p':
        setSearchTerms((prev) => ({ ...prev, p: value }));
        break;
      case 'ep':
        setSearchTerms((prev) => ({ ...prev, ep: value }));
        break;
      case 'nrc':
        setSearchTerms((prev) => ({ ...prev, nrc: value }));
        break;
      case 'c':
        setSearchTerms((prev) => ({ ...prev, c: value }));
        break;
      case 'ncr':
        setSearchTerms((prev) => ({ ...prev, ncr: value }));
        break;
      case 'f':
        setSearchTerms((prev) => ({ ...prev, f: value }));
        break;
      default:
        break;
    }
  };

  const filteredcourses = courses.filter((course) => {

const matchesNombrecourse = searchTerms.nc
  ? course.Nombrecourse?.toString().toLowerCase().includes(searchTerms.nc.toString().toLowerCase())
  : true;

  const matchesYear = searchTerms.y
  ? course.Annio?.toString().includes(searchTerms.y.toString())
  : true;

const matchesProfesor = searchTerms.p
  ? course.Profesor?.toString().toLowerCase().includes(searchTerms.p.toString().toLowerCase())
  : true;

const matchesPlanEstudio = searchTerms.ep
  ? course.PlanEstudio?.toString().toLowerCase().includes(searchTerms.ep.toString().toLowerCase())
  : true;

  const matchesNRC = searchTerms.nrc
  ? course.NRC?.toString().toUpperCase().includes(searchTerms.nrc.toString().toUpperCase())
  : true;

const matchesCiclo = searchTerms.c
  ? course.Ciclo?.toString().toUpperCase().includes(searchTerms.c.toString().toUpperCase())
  : true;

const matchesNumeroCreditos = searchTerms.ncr
  ? course.NumeroCreditos?.toString().includes(searchTerms.ncr.toString())
  : true;

  const matchesFirma = searchTerms.f
  ? (course.Firma ? "Sí" : "No").toString().toLowerCase().includes(searchTerms.f.toLowerCase())
  : true;

    return (
      matchesNombrecourse &&
      matchesYear &&
      matchesProfesor &&
      matchesPlanEstudio &&
      matchesNRC &&
      matchesCiclo &&
      matchesNumeroCreditos &&
      matchesFirma
    );
  });

  const handleIconClick = () => {
    
    window.location.reload();
};

const disableInputSearch = true;

  return (
    <div>
      
      <h1 className="h1">Planes de Estudio</h1>  

      <div className="container mt-5, input">
          <input
            title="Buscar cursos."
            placeholder="Ingrese el nombre de un curso"
            type="text"
            className="form-control pl-5"
            onChange={(e) => handleSearch(e.target.value, 'nc')}  
            style={{
              backgroundColor: "#A31E32",
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
          <FilterOffIcon title="Desactivar filtro"></FilterOffIcon> 
          </button>

       
      </div>

      <div className="container mt-3">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th className="th nc-th">Nombre Curso
                <div title="Filtrar por nombre del curso."  style={{ position: 'relative' }}>
                  <SearchInput onSearch={(value) => handleSearch(value, 'nc')} inputClassName="search-input pl-3" />
                </div>
              </th>
              <th className="th y-th">Año
                <div title="Filtrar por año."  style={{ position: 'relative' }}>
                  <SearchInput onSearch={(value) => handleSearch(value, 'y')} inputClassName="search-input pl-3" />
                </div>
              </th>
              <th className="th p-th">Profesor
                <div title="Filtrar por profesor." style={{ position: 'relative' }}>
                  <SearchInput onSearch={(value) => handleSearch(value, 'p')} inputClassName="search-input pl-3" />
                </div>
              </th>
              <th className="th ep-th">Plan Estudio
                <div title="Filtrar por fecha" style={{ position: 'relative' }}>
                  <SearchInput onSearch={(value) => handleSearch(value, 'ep')} inputClassName="search-input pl-3" />
                </div>
              </th>
              <th className="th nrc-th">NRC
                <div title="Filtrar por NRC" style={{ position: 'relative' }}>
                  <SearchInput onSearch={(value) => handleSearch(value, 'nrc')} inputClassName="search-input pl-3" />
                </div>
              </th>
              <th className="th c-th">Ciclo
                <div title="Filtrar por ciclo. i, ii, iii." style={{ position: 'relative' }}>
                  <SearchInput onSearch={(value) => handleSearch(value, 'c')} inputClassName="search-input pl-3" />
                </div>
              </th>
              <th className="th ncr-th">Número Créditos
                <div title="Filtrar por número de créditos" style={{ position: 'relative' }}>
                  <SearchInput onSearch={(value) => handleSearch(value, 'ncr')} inputClassName="search-input pl-3" />
                </div>
              </th>
              <th className="th f-th">Firma
                <div title="Filtrar por firma. Sí, No." style={{ position: 'relative' }}>
                  <SearchInput onSearch={(value) => handleSearch(value, 'f')} inputClassName="search-input pl-3" />
                </div>
              </th>
              <th className="th  f-th">Acciones
              <div style={{ position: 'relative' }} >
                  <SearchInput disabled={disableInputSearch} inputClassName="search-input pl-3"   />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredcourses.map(
              (
                course 
              ) => (
                <tr key={course.id} style={{ color: "#CD1719" }}>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {course.Nombrecourse}
                    </a>{" "}
                  </td>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {course.Annio}
                    </a>
                  </td>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {course.Profesor}
                    </a>
                  </td>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {course.PlanEstudio}
                    </a>
                  </td>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {course.NRC}
                    </a>
                  </td>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {course.Ciclo}
                    </a>
                  </td>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {course.NumeroCreditos}
                    </a>
                  </td>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {course.Firma ? "Sí" : "No"}
                    </a>
                  </td>
                  <td className="bg-light">
                  <div style={{ textAlign: "center" }}>
                      <img

                        title="Eliminar curso."
                        src={deleteIcon}
                        alt="Eliminar"
                        style={{ cursor: "pointer" }}
                        onClick={() => openModal(course)}
                      />
                    </div>
                </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDelete}
        itemName={cursoToDelete ? cursoToDelete.Nombrecourse : "course"} 
      />
    </div>
  );
};

export default MainTable;