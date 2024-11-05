import React from 'react';
import Swal from 'sweetalert2';

const DeleteModal = ({ isOpen, onClose, onDelete, itemName }) => {
  const handleDelete = () => {
    Swal.fire({
      title: '¡Eliminado!',
      text: 'El elemento fue eliminado',
      icon: 'success',
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      onDelete();
      
        window.location.reload();

      onClose();
    });
  };

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

  return (
    <div
      className="modal fade show"
      id="deleteModal"
      tabIndex={-1}
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
      style={{ display: isOpen ? 'block' : 'none' }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h4 className="modal-title text-white" id="deleteModalLabel">
              Eliminar: {itemName}
            </h4>
            <button
              type="button"
              className="btn-close bg-white"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="text-center">
              <p>¿Estás seguro de que deseas eliminar este elemento?</p>
              
              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: "40px",
                marginTop: "20px"
              }}>
                <button
                  type="button"
                  onClick={handleDelete}
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
                  Eliminar
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;