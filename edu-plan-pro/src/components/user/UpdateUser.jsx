import React, { useState, useEffect } from 'react';
import { SweetAlertSuccess, SweetAlertError } from "../../assets/js/sweetalert.js";

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

const UserEditModal = ({ isOpen, user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    secName: '',
    idcard: '',
    idrol: '',
    pass: '',
    stat: 1,
    flagPass: false
  });

  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRoles = async () => {
      const fetchedRoles = await fetchRoles();
      setRoles(fetchedRoles);
    };
    loadRoles();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.ID_USER || '',
        name: user.NOMBRE || '',
        secName: user.APELLIDOS || '',
        idcard: user.IDENTIFICACION || '',
        idrol: user.IDROL || 1,
        pass: '',
        stat: 1,
        flagPass: false
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const hasNumber = /\d/;

    if ((name === "name" || name === "secName") && hasNumber.test(value)) {
      setError("Los nombres y apellidos no deben contener números.");
      return;
    }

    setError("");
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderedFormData = {
        "id": formData.id,
        "name": formData.name,
        "secName": formData.secName,
        "idcard": formData.idcard,
        "idrol": Number(formData.idrol),
        "pass": formData.pass,
        "stat": formData.stat,
        "flagPass": formData.flagPass
      };

      const response = await fetch('http://localhost:3001/user', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderedFormData)
      });

      const data = await response.json();

      if (data.code === "200") {
        SweetAlertSuccess('El usuario fue actualizado correctamente');
        onUpdate();
        onClose();
      } else {
        throw new Error(data.data || 'Error al actualizar el usuario');
      }
    } catch (error) {
      SweetAlertError(error.message);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: isOpen ? 'block' : 'none' }}
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h4 className="modal-title text-white" id="exampleModalLabel">
              Editar Usuario
            </h4>
            <button
              type="button"
              className="btn-close bg-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input
                  value={formData.name}
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
                  value={formData.secName}
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
                  value={formData.idcard}
                  onChange={handleChange}
                  type="text"
                  name="idcard"
                  className="form-control placeholder-black"
                  id="idcard"
                  placeholder="Ingrese la cédula"
                  autoComplete="off"
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="idrol" className="form-label">Rol</label>
                <select
                  className="form-control placeholder-black"
                  id="idrol"
                  name="idrol"
                  value={formData.idrol}
                  onChange={handleChange}
                >
                  <option value="" disabled>Seleccione un rol</option>
                  {roles.map((role) => (
                    <option key={role.ID_ROL} value={role.ID_ROL}>
                      {role.NOMBRE}
                    </option>
                  ))}
                </select>
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

export default UserEditModal;