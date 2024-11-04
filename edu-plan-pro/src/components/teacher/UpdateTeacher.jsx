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

  const [error, setError] = useState("");

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.NOMBRE || '',
        secName: teacher.APELLIDOS || '',
        idcard: teacher.CEDULA || '',
        email: teacher.CORREO || '',
        id: teacher.ID_TEACHER || '',
        stat: teacher.ESTADO || 1
      });
    }
  }, [teacher]);

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
          title: '¡Actualizado!',
          text: 'El profesor fue actualizado correctamente',
          icon: 'success',
          confirmButtonColor: '#CD1719',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          onUpdate();
          onClose();
        });
      } else {
        throw new Error(data.data || 'Error al actualizar el profesor');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message || 'Error al actualizar el profesor',
        icon: 'error',
        confirmButtonColor: '#CD1719',
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
          <div className="modal-header bg-danger">
            <h4 className="modal-title text-white" id="exampleModalLabel">
              Editar Profesor
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
                  type="text"
                  name="name"
                  className="form-control placeholder-black"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ingrese un nombre"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="secName" className="form-label">Apellidos</label>
                <input
                  type="text"
                  name="secName"
                  className="form-control placeholder-black"
                  id="secName"
                  value={formData.secName}
                  onChange={handleChange}
                  placeholder="Ingrese Apellidos"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="idcard" className="form-label">Cédula de Identidad</label>
                <input
                  type="text"
                  name="idcard"
                  className="form-control placeholder-black"
                  id="idcard"
                  value={formData.idcard}
                  onChange={handleChange}
                  placeholder="Ingrese la cédula"
                  autoComplete="off"
                  required
                />
              </div>

              <div className="form-group mt-3">
                <label htmlFor="email" className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  className="form-control placeholder-black"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ingrese el correo electrónico"
                  autoComplete="off"
                  required
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

export default TeacherEditModal;