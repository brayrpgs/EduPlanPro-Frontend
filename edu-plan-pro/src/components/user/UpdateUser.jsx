import React, { useState, useEffect } from 'react';
/*
import Swal from 'sweetalert2';
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

  const handleCancel = () => {
    Swal.fire({
      title: 'Cancelado',
      text: 'Acción cancelada',
      icon: 'info',
      iconColor: '#2B385A',
      confirmButtonColor: '#A31E32',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      onClose(); 
    });
  };

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

  const validateForm = () => {
    // Validate required fields
    const requiredFields = ['name', 'secName', 'idcard', 'idrol'];
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        SweetAlertError(`El campo ${getFieldName(field)} es requerido`);
        return false;
      }
    }

    // Validate name and surname (no numbers)
    const hasNumber = /\d/;
    if (hasNumber.test(formData.name)) {
      SweetAlertError('El nombre no puede contener números');
      return false;
    }

    if (hasNumber.test(formData.secName)) {
      SweetAlertError('Los apellidos no pueden contener números');
      return false;
    }


    // Validate role selection
    if (!formData.idrol) {
      SweetAlertError('Debe seleccionar un rol');
      return false;
    }

    return true;
  };

  const getFieldName = (field) => {
    const fields = {
      name: 'nombre',
      secName: 'apellidos',
      idcard: 'cédula',
      idrol: 'rol'
    };
    return fields[field];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
        window.location.reload();
        onClose();
      } else {
        throw new Error(data.data || 'Error al actualizar el usuario');
      }
    } catch (error) {
      SweetAlertError(error.message || 'Error al actualizar el usuario');
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
          <div className="modal-header"style={{     
                backgroundColor: "#A31E32",
              }}>
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
            <div className="flex flex-row items-center space-x-4">
                <label htmlFor="name" className="w-24">Nombre</label>
                <input
                  type="text"
                  name="name"
                  className="flex-1 form-control placeholder-black"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ingrese un nombre"
                  autoComplete="off"
                  
                />
              </div>

              <div className="grid grid-cols-[100px_1fr] items-center gap-4 mt-3">
                <label htmlFor="secName">Apellidos</label>
                <input
                  type="text"
                  name="secName"
                  className="form-control placeholder-black"
                  id="secName"
                  value={formData.secName}
                  onChange={handleChange}
                  placeholder="Ingrese Apellidos"
                  autoComplete="off"
                  
                />
              </div>

              <div className="grid grid-cols-[100px_1fr] items-center gap-4 mt-3">
                <label htmlFor="idcard">Cédula de Identidad</label>
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

              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "40px",
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
                  onClick={handleCancel}
                  style={{
                    width: "100px",
                    backgroundColor: "#2b3843",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
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
};*/

function UserEditModal(){

  return (
    <div>Hola</div>
  );

}

export default UserEditModal;