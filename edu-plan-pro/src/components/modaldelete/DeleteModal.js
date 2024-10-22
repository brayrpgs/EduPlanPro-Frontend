import React from 'react';
import './DeleteModal.css';
import Swal from 'sweetalert2';

const DeleteModal = ({ isOpen, onClose, onDelete, itemName }) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    Swal.fire({
      title: '¡Eliminado!',
      text: 'El elemento fue eliminado',
      icon: 'success',
      confirmButtonColor: '#CD1719',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      onDelete();
      onClose();
    });
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
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Eliminar {itemName}</h2>
        <p>¿Estas seguro de que deseas eliminar este elemento?</p>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleDelete}>
            Eliminar
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;