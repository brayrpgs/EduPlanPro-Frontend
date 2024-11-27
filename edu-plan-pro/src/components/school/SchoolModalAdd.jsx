import { useState, useEffect } from "react";
import {
  SweetAlertSuccess,
  SweetAlertError,
  BotonCancelar
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


  // Función para manejar el envío de datos a través del POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que se haya seleccionado una facultad y que el nombre de la escuela no esté vacío o tenga solo espacios en blanco
    if (!selectedFaculty.trim()) {
      SweetAlertError("Seleccione una Facultad.");
      return;
    }
    if (!schoolName.trim()) {
      SweetAlertError("Campo escuela vacío.");
      return;
    }
    if (/\d/.test(schoolName)) { // Validación para evitar números en el nombre de la escuela
      SweetAlertError("El nombre de la escuela no debe contener números.");
      return;
    }

    // Crear el objeto con los datos a enviar y convertir selectedFaculty a un entero
    const schoolData = {
      desc: schoolName, // Nombre de la escuela
      id: parseInt(selectedFaculty, 10), // ID de la facultad como número entero esto porque me estada dando error al pasarlo como string
    };

    // Enviar a backend a través del método POST
    try {
      const response = await fetch("http://localhost:3001/school", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(schoolData), // Enviar los datos como JSON
      });

      // Primero obtenemos la respuesta JSON
      const jsonResponse = await response.json();

      // Verificar el estado de respuesta o el código de error devuelto por el backend
      if (!response.ok || jsonResponse.code === "500" || jsonResponse.code === "501") {
        if (jsonResponse.code === "500") {
          SweetAlertError("Ya existe la escuela.");
        } else if (jsonResponse.code === "501") {
          SweetAlertError("Error, Campos Invalidos.");
        } else {
          SweetAlertError(jsonResponse.data || "Error al insertar la escuela");
        }
        return; // Salimos si hay un error, sin ejecutar el mensaje de éxito
      }

      // Si la inserción es exitosa
      document.getElementById("closeSchoolModalAdd").click();
      SweetAlertSuccess("Registro exitoso!");
      window.location.reload();
      setSchoolName(""); // Reiniciar el campo de nombre de escuela
      setSelectedFaculty(""); // Reiniciar la selección de facultad
    } catch (error) {
      console.error("Error al insertar la escuela:", error);
      SweetAlertError("Error al registrar la escuela.");
    }
  };


  return (
    <div
      className="modal fade"
      id="schoolModalAdd"
      tabIndex={-1}
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header"style={{     
                backgroundColor: "#A31E32",
              }}>
            <h4 className="modal-title text-white" id="exampleModalLabel">
              {"Agregar una escuela"}
            </h4>
            <button
              type="button"
              className="btn-close bg-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="closeSchoolModalAdd"
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
              <div className="mb-3">
             
              </div>     
              <div className="mb-3">
                <label htmlFor="schoolName">Escuela</label>
                <input
                  type="text"
                  className="form-control placeholder-black"
                  id="schoolName"
                  placeholder="Ingrese un nombre"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
              </div>

              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "40px", // Espacio entre los botones
                marginTop: "20px"
              }}>
                <button
                  type="submit"
                  style={{
                    width: "100px",
                    backgroundColor: "#A31E32",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Guardar
                </button>

                <button
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{
                    width: "100px",
                    backgroundColor: "#2b3843",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                  onClick={() => BotonCancelar('Acción cancelada.')}
                >
                  Cancelar
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