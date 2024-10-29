import { useState, useEffect } from "react";
import {
  SweetAlertSuccess,
  SweetAlertError,
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
    document.getElementById("closeFacultyModalAdd").click();
    SweetAlertSuccess("Registro exitoso!");

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
    if (data.name.trim() === "") {
      SweetAlertError("Verifique Datos Ingresados.");
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
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header bg-danger ">
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

export default FacultyModalAdd;
