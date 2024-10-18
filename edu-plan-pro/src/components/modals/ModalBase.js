import React from 'react'

{/* clindren contenido dinamico, titulo, idmodal con el que se llama, boton para una posible accion*/}
const ModalBase = ({ children, title, idModal, idBtnClose }) => {
  return (
      <div
        className="modal fade "
        id={idModal}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
      <div className="modal-dialog  modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header bg-danger ">
            <h4 className="modal-title text-white" id="exampleModalLabel">
              {title}
            </h4>
            <button
              type="button"
              className="btn-close bg-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              id={idBtnClose}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>

  )
}

export default ModalBase