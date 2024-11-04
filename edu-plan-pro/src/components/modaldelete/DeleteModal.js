import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteModal = ({ isOpen, onClose, onDelete, itemName }) => {
  useEffect(() => {
    const modalElement = document.getElementById('deleteModal');
    const modal = new window.bootstrap.Modal(modalElement);
    
    if (isOpen) {
      modal.show();
    } else {
      modal.hide();
    }

     return () => {
      modal.hide();
    };
  }, [isOpen]);

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
    <div
      className="modal fade"
      id="deleteModal" 
      tabIndex={-1}
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h5 className="modal-title text-white" id="deleteModalLabel">
              Eliminar: {itemName}
            </h5>
            <button
              type="button"
              className="btn-close bg-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body text-center">
            <p>¿Estás seguro de que deseas eliminar este elemento?</p>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              className="btn btn-danger mt-3"
              type="button"
              onClick={handleDelete}
              style={{ maxWidth: "100px" }}
            >
              Eliminar
            </button>
            <button
              type="button"
              className="btn btn-secondary mt-3"
              onClick={handleCancel}
              style={{ maxWidth: "100px" }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
