import { useState, useEffect } from "react";
import {
  SweetAlertSuccess,
  SweetAlertError,
} from "../../assets/js/sweetalert.js";

// Función para obtener facultades desde la API
const fetchFacultyData = async () => {
  try {
    const response = await fetch("http://localhost:3001/faculty", {
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
    return []; // Siempre retorna un array
  }
};

const SchoolModalAdd = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [schoolName, setSchoolName] = useState(""); // Estado para el nombre de la escuela
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    const loadFaculties = async () => {
      const data = await fetchFacultyData();
      setFaculties(data);
    };
    loadFaculties();
  }, []); // Cargar facultades al montar el componente

  useEffect(() => {
    if (showAlert) {
      SweetAlertSuccess("Registro exitoso!");
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [showAlert]);

  // Función para manejar el envío de datos a través del POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que se haya seleccionado una facultad y que el nombre de la escuela no esté vacío o tenga solo espacios en blanco
    if (!selectedFaculty || !schoolName.trim()) {
      SweetAlertError("Por favor, completa todos los campos correctamente.");
     
      return;
    }

    // Crear el objeto con los datos a enviar
    const schoolData = {
      desc: schoolName, // Nombre de la escuela
      id: parseInt(selectedFaculty), // ID de la facultad seleccionada, Recordar que es necesario para insertar en tabla School
    };

    try {
      
      const response = await fetch("http://localhost:3001/school", {
        // URL de tu API para insertar escuela
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // Indicar que se envían datos JSON
        },
        body: JSON.stringify(schoolData), // Enviar los datos como JSON
      });

      const jsonResponse = await response.json(); // Obtener la respuesta del servidor
      console.log(jsonResponse);
      if (!response.ok) {
        throw new Error(jsonResponse.data || "Error al insertar la escuela");
      }

      // Si la inserción es exitosa
      setShowAlert(true);
      setSchoolName(""); // Reiniciar el campo de nombre de escuela
      setSelectedFaculty(""); // Reiniciar la selección de facultad

      // Cerrar el modal usando el método click
      SweetAlertSuccess("Escuela agregada correctamente!");
    } catch (error) {
      console.error("Error al insertar la escuela:", error);
      SweetAlertError("Error al registrar la escuela.");
    }
  };

  return (
    <div
      className="modal fade "
      id={"schoolModalAdd"}
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header bg-danger ">
            <h4 className="modal-title text-white" id="exampleModalLabel">
              {"Agregar una escuela"}
            </h4>
            <button
              type="button"
              className="btn-close bg-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              id={"closeFacultyModalAdd"}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="facultySelect">Facultad</label>
                <select
                  className="form-control"
                  id="facultySelect"
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                >
                  <option value="">Seleccione Facultad</option>
                  {faculties.map((faculty) => (
                    <option key={faculty.ID_FACULTY} value={faculty.ID_FACULTY}>
                      {faculty["NOMBRE FACULTAD"]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mt-3">
                <label htmlFor="schoolName">Escuela</label>
                <input
                  type="text"
                  className="form-control placeholder-black"
                  id="schoolName"
                  placeholder="Ingrese un nombre"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)} // Captura el nombre de la escuela
                />
              </div>

              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-danger mt-3"
                  type="submit"
                  style={{ maxWidth: "100px" }}
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolModalAdd;
