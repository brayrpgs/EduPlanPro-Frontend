import React, { useState } from "react";
import search from "../images/search.svg";
import "./MainTable.css";

const dataExample = [
  {
    id: 1,
    NombreCurso: "Ingenieria 2",
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
    NombreCurso: "Matematicas 1",
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
    NombreCurso: "Fisica General",
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
    NombreCurso: "Programacion Avanzada",
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
    NombreCurso: "Estructuras de Datos",
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
    NombreCurso: "Bases de Datos",
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
    NombreCurso: "Redes de Computadoras",
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
    NombreCurso: "Sistemas Operativos",
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
    NombreCurso: "Algoritmos",
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
    NombreCurso: "Ingenieria de Software",
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
  const [cursos, setCursos] = useState(dataExample);
  const [searchTerm, setSearchTerm] = useState("");

  // cursos filtrados por el input de búsqueda
  const filteredCursos = cursos.filter((curso) =>
    curso.NombreCurso.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>

      <div className="container mt-5, input">
        <input
          type="text"
          className="form-control pl-5"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
      </div>

      <div className="container mt-3">
        {/* Aquí va la paginación */}

        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th className="th">Id</th>
              <th className="th">Nombre Curso</th>
              <th className="th">Año</th>
              <th className="th">Profesor</th>
              <th className="th">Plan Estudio</th>
              <th className="th">NRC</th>
              <th className="th">Ciclo</th>
              <th className="th">Número Créditos</th>
              <th className="th">Firma</th>
            </tr>
          </thead>
          <tbody>
            {filteredCursos.map(
              (
                curso // filteredCursos
              ) => (
                <tr key={curso.id} style={{ color: "#CD1719" }}>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {curso.id}
                    </a>
                  </td>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {curso.NombreCurso}
                    </a>{" "}
                  </td>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {curso.Annio}
                    </a>
                  </td>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {curso.Profesor}
                    </a>
                  </td>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {curso.PlanEstudio}
                    </a>
                  </td>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {curso.NRC}
                    </a>
                  </td>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {curso.Ciclo}
                    </a>
                  </td>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {curso.NumeroCreditos}
                    </a>
                  </td>
                  <td className="bg-light">
                    <a className="a" href="#">
                      {curso.Firma ? "Sí" : "No"}
                    </a>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainTable;
