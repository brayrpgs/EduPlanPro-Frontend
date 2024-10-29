import { useState } from "react";
import { SweetAlertSuccess, SweetAlertError } from "../../assets/js/sweetalert.js";

async function fetchTeacherCreate(data) {
  try {

    
    const response = await fetch("http://localhost:3001/teacher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const jsonResponse = await response.json();
    document.getElementById("closeTeacherModalAdd").click();
    SweetAlertSuccess(jsonResponse.data || "Registro exitoso!");

    return jsonResponse.data;
  } catch (error) {
    console.error("Error al crear el docente:", error);
    SweetAlertError(`Error al crear el docente: ${error.message}`);
  }
}

const TeacherModalAdd = () => {
  const [data, setData] = useState({
    name: "",
    secName: "",
    idcard: "",
    email: "",
  });

  const [error, setError] = useState(""); // Estado para el mensaje de error
  const [firstSubmit, setFirstSubmit] = useState(true); // Estado para verificar el primer envío

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidate = () => {
    if (data.name.trim() === "") {
      setError("Nombre vacío");
      return false;
    }
    if (data.secName.trim() === "") {
      setError("Apellido vacío");
      return false;
    }
    if (data.idcard.trim() === "") {
      setError("Cédula vacía");
      return false;
    }
    if (data.email.trim() === "") {
      setError("Correo vacío");
      return false;
    }

    setError(""); // Sin errores
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirstSubmit(false); // Se marca que se ha intentado enviar por primera vez
    if (handleValidate()) {
      // Procede con la creación si pasa la validación
      fetchTeacherCreate(data);
    } else {
      SweetAlertError("Verifique Datos Ingresados"); // Muestra el error si falla la validación
    }
  };

  return (
    <div
      className="modal fade"
      id="teacherModalAdd"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h4 className="modal-title text-white" id="exampleModalLabel">
              Agregar un Docente
            </h4>
            <button
              type="button"
              className="btn-close bg-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="closeTeacherModalAdd"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input
                  value={data.name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  className="form-control placeholder-black"
                  id="name"
                  placeholder="Ingrese un nombre"
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="secName" className="form-label">Apellido</label>
                <input
                  value={data.secName}
                  onChange={handleChange}
                  type="text"
                  name="secName"
                  className="form-control placeholder-black"
                  id="secName"
                  placeholder="Ingrese Apellidos"
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="idcard" className="form-label">Cédula de Identidad</label>
                <input
                  value={data.idcard}
                  onChange={handleChange}
                  type="text"
                  name="idcard"
                  className="form-control placeholder-black"
                  id="idcard"
                  placeholder="Ingrese la cédula"
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  value={data.email}
                  onChange={handleChange}
                  type="email"
                  name="email"
                  className="form-control placeholder-black"
                  id="email"
                  placeholder="Ingrese el correo electrónico"
                />
              </div>

              <div className="d-flex justify-content-center">
                <button className="btn btn-danger mt-3" type="submit" style={{ maxWidth: "100px" }}>
                  Guardar
                </button>
              </div>

              {error && <p className="text-danger text-center mt-3">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherModalAdd;
