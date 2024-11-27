import { useState, useEffect } from "react";
import {
  SweetAlertSuccess,
  SweetAlertError,
  BotonCancelar
} from "../../assets/js/sweetalert.js";

async function fetchRoles() {
  try {
    const response = await fetch("http://localhost:3001/rol", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const jsonResponse = await response.json();
    return Array.isArray(jsonResponse.data) ? jsonResponse.data : [];
  } catch (error) {
    console.error("Error al obtener los roles:", error);
    return [];
  }
}

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
      throw new Error("Error en la solicitud.");
    }

    const jsonResponse = await response.json();

    if (jsonResponse.code === "501") {
      SweetAlertError("Campos Invalidos.");
      return;
    }

    document.getElementById("closeUserModalAdd").click();
    SweetAlertSuccess("Registro exitoso!");
    window.location.reload();
    return jsonResponse.data;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    SweetAlertError(`Error al crear el usuario: ${error.message}`);
  }
}

const UserModalAdd = () => {
  const [data, setData] = useState({
    name: "",
    secName: "",
    idcard: "",
    pass: "",
    idRol: "", 
  });

  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  const [firstSubmit, setFirstSubmit] = useState(true);

  useEffect(() => {
    const loadRoles = async () => {
      const fetchedRoles = await fetchRoles();
      setRoles(fetchedRoles);
    };
    loadRoles();
  }, []);

  useEffect(() => {
    const modal = document.getElementById("userModalAdd");

    const handleModalOpen = () => {
      setData({
        name: "",
        secName: "",
        idcard: "",
        pass: "",
        idRol: "", 
      });
      setError("");
      setFirstSubmit(true);
    };
    //se usa para restablecer el formulario cada vez que se abre el modal
    modal.addEventListener("show.bs.modal", handleModalOpen);

    return () => {
      modal.removeEventListener("show.bs.modal", handleModalOpen);
    };
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  //enviar a traves del post y se realiza un parseo al id rol para que vaya int
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirstSubmit(false);

    if (handleValidate()) {
      const formattedData = {
        ...data,
        idRol: parseInt(data.idRol, 10),
      };
      fetchUsuarioCreate(formattedData);
    }
  };
  //validaciones basicas
  const handleValidate = () => {
    if (data.name.trim() === "") {
      SweetAlertError("Nombre vacío.");
      return false;
    }
    if (/\d/.test(data.name)) {
      SweetAlertError("El nombre no debe contener números.");
      return false;
    }
    if (data.secName.trim() === "") {
      SweetAlertError("Apellido vacío.");
      return false;
    }
    if (/\d/.test(data.secName)) {
      SweetAlertError("El apellido no debe contener números.");
      return false;
    }
    if (data.idcard.trim() === "") {
      SweetAlertError("Cédula inválida");
      return false;
    }
    if (data.pass.trim() === "" || data.pass.length < 4) {
      SweetAlertError("Contraseña vacia o no cumple con minimo de 4 caracteres.");
      return false;
    }
    if (data.idRol === "") {
      SweetAlertError("Seleccione un rol.");
      return false;
    }

    setError("");
    return true;
  };

  return (
    <div
      className="modal fade"
      id="userModalAdd"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      
    
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" >
        <div className="modal-content" >
          <div className="modal-header "style={{     
                backgroundColor: "#A31E32",
              }}>
            
            <h4 className="modal-title text-white" id="exampleModalLabel">
              Agregar un usuario
            </h4>
            <button
              type="button"
              className="btn-close bg-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              id="closeUserModalAdd"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} autoComplete="off">

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
                  autoComplete="off"
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
                  autoComplete="off"
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
                  autoComplete="new-password"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="roleSelect" className="form-label">Rol</label>
                <select
                  className="form-control"
                  id="roleSelect"
                  name="idRol"
                  value={data.idRol}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Seleccione rol
                  </option>
                  {roles.map((role) => (
                    <option key={role.ID_ROL} value={role.ID_ROL}>
                      {role.NOMBRE}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
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


              {error && <p className="text-danger text-center mt-3">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModalAdd;