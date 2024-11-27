import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

const DeleteModal = ({ isOpen, onClose, onDelete, itemName }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

  if (!isOpen) return null;

  return (
    <>
      <div
        className="modal-backdrop"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1040
        }}
        onClick={onClose}
      />
      <div
        className="modal"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1050
        }}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" style={{ position: 'relative', width: 'auto', margin: '1.75rem', maxWidth: '500px' }}>
          <div className="modal-content" style={{ position: 'relative', backgroundColor: 'white', borderRadius: '0.3rem' }}>
            <div className="modal-header" style={{ backgroundColor: '#A31E32', padding: '1rem', borderTopLeftRadius: '0.3rem', borderTopRightRadius: '0.3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 className="modal-title" style={{ color: 'white', margin: 0 }}>
                Eliminar: {itemName}
              </h4>
              <button
                type="button"
                onClick={onClose}
                style={{
                  width: '3rem',
                  height: '2.3rem',
                  padding: 0,
                  backgroundColor: 'white',
                  border: 0,
                  borderRadius: '0.375rem',
                  opacity: '0.5',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'opacity 0.15s ease-in-out'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '0.5'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  style={{
                    fill: 'currentColor',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
              </button>
            </div>
            <div className="modal-body" style={{ padding: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
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
    </>
  );
};

export default DeleteModal;