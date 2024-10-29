import { useState, useEffect } from "react";
import { SweetAlertSuccess, SweetAlertError } from "../../assets/js/sweetalert.js";

//funcionn donde se envia los datos del formulario mas el string de los datos de la sesion
async function fetchUsuarioCreate(data) {
  try {
    const response = await fetch("http://localhost:3001/user", {
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
    document.getElementById("closeUsuarioModalAdd").click();
    SweetAlertSuccess(jsonResponse.data || "Registro exitoso!");

    return jsonResponse.data;
  } catch (error) {
    console.error("Error al crear el docente:", error);
    SweetAlertError(`Error al crear el docente: ${error.message}`);
  }
}
//incializa las variables, ademas le paso quemado el rol
const UserModalAdd = () => {
  const [data, setData] = useState({
    name: "",
    secName: "",
    idcard: "",
    pass:"",
    idRol:"5",
  });

  const [error, setError] = useState("");
  const [firstSubmit, setFirstSubmit] = useState(true);
/*
  useEffect(() => {
    // Limpia los campos al abrir el modal
    setData({
      name: "",
      secName: "",
      idcard: "",
      pass: "",
    });
  }, []);*/

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
      setError("Cédula inválida");
      return false;
    }
    if (data.pass.trim() === "" || data.pass.length < 4) {
      setError("Contraseña no cumple requsitos minimos");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirstSubmit(false);
    if (handleValidate()) {
      fetchUsuarioCreate(data);
    } else {
      SweetAlertError("Verifique Datos Ingresados.");
    }
  };

  return (
    <div
      className="modal fade"
      id="userModalAdd"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h4 className="modal-title text-white" id="exampleModalLabel">
              Agregar un usuario
            </h4>
            <button
              type="button"
              className="btn-close bg-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="closeUsuarioModalAdd"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} autoComplete="off">
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
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="new-password"
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="pass" className="form-label">Contraseña</label>
                <input
                  value={data.pass}
                  onChange={handleChange}
                  type="password"
                  name="pass"
                  className="form-control placeholder-black"
                  id="pass"
                  placeholder="Ingrese la contraseña"
                  autoComplete="new-password"
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

export default UserModalAdd;
