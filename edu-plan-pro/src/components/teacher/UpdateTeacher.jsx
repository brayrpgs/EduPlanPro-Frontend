import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const TeacherEditModal = ({ isOpen, teacher, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    secName: '',
    idcard: '',
    email: '',
    id: '',
    stat: 1
  });
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
    if (teacher) {
      setFormData({
        name: teacher.NOMBRE || '',
        secName: teacher.APELLIDOS || '',
        idcard: teacher.IDENTIFICACION || '',
        email: teacher.CORREO || '',
        id: teacher.ID_TEACHER || '',
        stat: teacher.ESTADO || 1
      });
    }
  }, [teacher]);

  if (!isOpen) return null;

  const validateForm = () => {
    // Check for empty fields
    for (const [key, value] of Object.entries(formData)) {
      if (key !== 'stat' && key !== 'id' && !value.trim()) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          iconColor: "#A31E32",
          title: 'Campo requerido',
          text: `El campo ${getFieldName(key)} no puede estar vacío`,
          confirmButtonColor: "#A31E32",
          confirmButtonText: 'Aceptar'
        });
        return false;
      }
    }

    // Validate name and surname (no numbers)
    const hasNumber = /\d/;
    if (hasNumber.test(formData.name)) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        iconColor: "#A31E32",
        title: 'Error en el nombre',
        text: 'El nombre no puede contener números',
        confirmButtonColor: "#A31E32",
        confirmButtonText: 'Aceptar'
      });
      return false;
    }

    if (hasNumber.test(formData.secName)) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        iconColor: "#A31E32",
        title: 'Error en los apellidos',
        text: 'Los apellidos no pueden contener números',
        confirmButtonColor: "#A31E32",
        confirmButtonText: 'Aceptar'
      });
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        iconColor: "#A31E32",
        title: 'Error en el correo',
        text: 'Por favor ingrese un correo electrónico válido',
        confirmButtonColor: "#A31E32",
        confirmButtonText: 'Aceptar'
      });
      return false;
    }

    return true;
  };

  const getFieldName = (key) => {
    const fields = {
      name: 'nombre',
      secName: 'apellidos',
      idcard: 'cédula',
      email: 'correo electrónico'
    };
    return fields[key];
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
      const response = await fetch('http://localhost:3001/teacher', {
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
          position: 'center',
          icon: 'success',
          iconColor: "#7CDA24",
          title: '¡Actualizado!',
          text: 'El profesor fue actualizado correctamente',
          confirmButtonColor: "#A31E32",
          confirmButtonText: 'Aceptar'
        }).then(() => {
          onUpdate();
          window.location.reload();
          onClose();
        });
      } else {
        throw new Error(data.data || 'Error al actualizar el profesor');
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        iconColor: "#A31E32",
        title: 'Error',
        text: error.message || 'Error al actualizar el profesor',
        confirmButtonColor: "#dc3545",
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div
      className="modal fade show"
      id="teacherEditModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header"style={{     
                backgroundColor: "#A31E32",
              }}>
            <h4 className="modal-title text-white" id="exampleModalLabel">
              Editar Docente
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

              <div className="grid grid-cols-[100px_1fr] items-center gap-4 mt-3">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  className="form-control placeholder-black"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ingrese el correo electrónico"
                  autoComplete="off"

                />
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
};

export default TeacherEditModal;