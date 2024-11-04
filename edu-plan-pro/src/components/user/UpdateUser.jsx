import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './UpdateUser.css'; 

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
    pass: '',  // Contraseña vacía, no se muestra en el formulario
    stat: 1,
    flagPass: false  // flagPass siempre es false
  });

  const [roles, setRoles] = useState([]); 

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
        idrol: user.IDROL || 1, // Mantenemos el valor como un número
        pass: '',  // Siempre vacío al cargar el usuario
        stat: 1, 
        flagPass: false  // Siempre false al cargar el usuario
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    const hasNumber = /\d/;

    if ((name === "name" || name === "secName") && hasNumber.test(value)) {
      Swal.fire({
        title: 'Error',
        text: 'Los nombres y apellidos no deben contener números.',
        icon: 'error',
        confirmButtonColor: '#CD1719',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderedFormData = {
        id: formData.id,
        name: formData.name,
        secName: formData.secName,
        idcard: formData.idcard,
        idrol: Number(formData.idrol), 
        pass: formData.pass,  
        stat: formData.stat,
        flagPass: formData.flagPass
      };

      const response = await fetch('http://localhost:3001/user', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderedFormData) // Enviar el objeto con el orden definido
      });

      const data = await response.json();

      if (data.code === "200") {
        Swal.fire({
          title: '¡Actualizado!',
          text: 'El usuario fue actualizado correctamente',
          icon: 'success',
          confirmButtonColor: '#CD1719',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          onUpdate();
          onClose();
        });
      } else {
        throw new Error(data.data || 'Error al actualizar el usuario');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#CD1719',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="modal" style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Usuario</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="secName">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  id="secName"
                  name="secName"
                  value={formData.secName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="idcard">Cédula de Identidad</label>
                <input
                  type="text"
                  className="form-control"
                  id="idcard"
                  name="idcard"
                  value={formData.idcard}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="idrol">Rol</label>
                <select
                  className="form-control"
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

              <button type="submit" className="btn btn-primary">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;
