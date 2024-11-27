import { useState } from "react";
import {
  SweetAlertSuccess,
  SweetAlertError,
  BotonCancelar
} from "../../assets/js/sweetalert.js";

import "./FacultyModalAdd.css";

async function fetchFacultyCreate(data) {
  try {
    const response = await fetch("http://localhost:3001/faculty", {
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
      SweetAlertError("La facultad ya está registrada.");
      return;
    } else if (jsonResponse.code === "501") {
      SweetAlertError("Campos inválidos.");
      return;
    }

    document.getElementById("closeFacultyModalAdd").click();
    SweetAlertSuccess("¡Registro exitoso!");
    window.location.reload();
    return jsonResponse.data;
  } catch (error) {
    console.error("Error al crear la facultad:", error);
    SweetAlertError(`Error al crear la facultad: ${error.message}`);
  }
}

const FacultyModalAdd = () => {
  const [data, setData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = data.name.trim();

    // Validación para evitar números en el campo de nombre
    if (name === "") {
      SweetAlertError("El nombre no puede estar vacío.");
      return;
    }
    if (/\d/.test(name)) {
      SweetAlertError("El nombre no puede contener números.");
      return;
    }

    fetchFacultyCreate(data);
  };

  return (
    <div
      className="modal fade"
      id={"facultyModalAdd"}
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
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
              {"Agregar una facultad"}
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
              <label htmlFor={"name"} className="form-label">
                {"Nombre"}
              </label>
              <input
                value={data.name}
                onChange={(e) => handleChange(e)}
                type={"text"}
                name={"name"}
                className="form-control placeholder-black"
                id={"name"}
                placeholder={"Ingrese un nombre"}
              />
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
                    backgroundColor:"#2b3843",
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

export default FacultyModalAdd;