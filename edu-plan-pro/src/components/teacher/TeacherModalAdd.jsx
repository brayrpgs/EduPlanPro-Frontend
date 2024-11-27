import { useState } from "react";
import {
  SweetAlertSuccess,
  SweetAlertError,
  BotonCancelar
} from "../../assets/js/sweetalert.js";
import "./TeacherModalAdd.css"

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

    if (jsonResponse.code === "500") {
      SweetAlertError("Correo ya registrado.");
      return;
    } else if (jsonResponse.code === "501") {
      SweetAlertError("Campos inválidos.");
      return;
    }

    document.getElementById("closeTeacherModalAdd").click();
    SweetAlertSuccess("Registro exitoso!");
    window.location.reload();
    return jsonResponse.data;
  } catch (error) {
    console.error("Error al crear docente:", error);
    SweetAlertError(`Error al crear docente: ${error.message}`);
  }
}
//aca es sumamente respetar este orden de eventos para no icurrir en errores XD recordar att David
 const TeacherModalAdd = () => {
  const [data, setData] = useState({
    name: "",
    secName: "",
    idcard: "",
    email: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidate()) {
      // Procede con la creación si pasa la validación
      await fetchTeacherCreate(data);
    } else {
      // Los errores se manejan dentro de handleValidate
    }
  };

  const handleValidate = () => {
    if (data.name.trim() === "") {
      SweetAlertError("Nombre vacío");
      return false;
    }
    if (/\d/.test(data.name)) {
      SweetAlertError("El nombre no puede llevar números");
      return false;
    }
    if (data.secName.trim() === "") {
      SweetAlertError("Apellido vacío");
      return false;
    }
    if (/\d/.test(data.secName)) {
      SweetAlertError("El apellido no puede llevar números");
      return false;
    }
    if (data.idcard.trim() === "") {
      SweetAlertError("Cédula vacía");
      return false;
    }
    if (data.email.trim() === "") {
      SweetAlertError("Correo vacío");
      return false;
    }

    return true; // Sin errores
  };

  


  return (
    <div
      className="modal fade"
      id="teacherModalAdd"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
     // data-bs-backdrop="static"
      data-bs-keyboard="false"
      
 
      
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable ">
        <div className="modal-content">
          <div className="modal-header"style={{     
                backgroundColor: "#A31E32",
              }}>
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
              <div className="mb-3">
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

              <div className="mb-3">
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

              <div className="mb-3">
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

              <div className="mb-3">
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

export default TeacherModalAdd;


