import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './UpdateUser.css'; 

const UserEditModal = ({ isOpen, user, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
      id: '',
      name: '',
      secName: '',
      idcard: '',
      idrol: 1,
      stat: 1,
      flagPass: false
    });
  
    useEffect(() => {
      if (user) {
        setFormData({
          id: user.ID_USER || '',  
          name: user.DSC_NAME || '', 
          secName: user.DSC_SECOND_NAME || '', 
          idcard: user.IDCARD || '',  
          idrol: user.IDROL || 1,  
          stat: user.ESTADO || 1,  
          flagPass: false  
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
      const response = await fetch('http://localhost:3001/user', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
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
        text: error.message || 'Error al actualizar el usuario',
        icon: 'error',
        confirmButtonColor: '#CD1719',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: 'Cancelado',
      text: 'Acción cancelada',
      icon: 'info',
      confirmButtonColor: '#CD1719',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      onClose();
    });
  };

  return (
    <div className='modal-edit'>
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Editar Usuario</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Apellidos:</label>
              <input
                type="text"
                name="secName"
                value={formData.secName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Cédula:</label>
              <input
                type="text"
                name="idcard"
                value={formData.idcard}
                onChange={handleChange}
                required
              />
            </div>
            <div className="modal-buttons">
              <button type="submit" className="confirm-button">
                Guardar
              </button>
              <button type="button" className="cancel-button" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;