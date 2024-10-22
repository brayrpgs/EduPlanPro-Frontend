import React, { useState, useRef } from "react";
import Swal from 'sweetalert2';
import IconUpdate from '../icons/ModalUpdateIcons/IconUpdate.jsx';

import FacultiesComponent from './GetAllFaculties.jsx';

const UpdateModal = ({ object, baseUrl, attributeNameId, JsonToEndpoint, keysJsonToEndpoint }) => {
    const [editedObject, setEditedObject] = useState({ ...object });
    const modalRef = useRef(null);

    /*  const facultiesData = getAllFaculties(); */

    const handleInputChange = (e, key) => {
        setEditedObject({ ...editedObject, [key]: e.target.value });
    };

    // obtengo solo los atributos que necesito para enviar al endpoint
    const arrayJSON = JsonToEndpoint.reduce((acc, key) => {
        acc[key] = editedObject[key];
        return acc;
    }, {})

    // le cambio el nombre a los keys para que se llamen igual a los del endpoint
    const values = Object.values(arrayJSON);
    const jsonDef = keysJsonToEndpoint.reduce((acc, key, index) => {
        acc[key] = values[index];
        return acc;
    }, {});
    jsonDef.stat = 1;

    const updateObject = async e => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseUrl}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonDef),
                credentials: 'include'
            });
            
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Objeto actualizado',
                    text: 'El objeto se actualizó correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                });
                const data = await response.json();
                console.log(data);

                /*                 setTimeout(() => {
                                    window.location.reload();
                                }, 1500); */
            } else {
                throw new Error('Error al actualizar el objeto');
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar. Por favor, intenta de nuevo.',
            });
            console.error(err.message);
        }
    };

/*      const getAllFaculties = () => {
        try {
            const response = fetch(`http://localhost:3001/faculty`, {
                credentials: 'include'
            }).then(
                res => res.json()
            )
            .then(data => (data.data));
            return response;
        } catch (err) {
            console.error(err.message);
        }
    } */

    const handleClose = () => {
        setEditedObject({ ...object });
        // Asegurarse de que el foco se maneje correctamente
        if (modalRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length) {
                focusableElements[0].focus();
            }
        }
    };

    return (
        <div>
            <button
                type="button"
                className="btn"
                data-bs-toggle="modal"
                data-bs-target={`#id${object[attributeNameId]}`}
                title="Editar"
                style={{ marginTop: 0 }}
            >
                <IconUpdate />
            </button>

            <div
                className="modal fade"
                id={`id${object[attributeNameId]}`}
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="false"
                ref={modalRef}
                role="dialog"
                aria-modal="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Actualizar Objeto</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handleClose}
                            />
                        </div>
                        <div className="modal-body">
                            {Object.keys(editedObject).map((key) => (
                                <div className="mb-3" key={key} style={{ display: editedObject[key] === editedObject[attributeNameId] ? 'none' : 'block' }}>
                                    <label className="form-label" htmlFor={`input-${key}`}>{key}</label>
                                    <input
                                        id={`input-${key}`}
                                        type={typeof editedObject[key] === 'number' ? 'number' : 'text'}
                                        className="form-control"
                                        value={editedObject[key]}
                                        onChange={(e) => handleInputChange(e, key)}
                                    />
                                </div>
                            ))}
                                                      
                            <label htmlFor="idFaculty">ID Facultad</label>
                            <select id="idFaculty">
                                <option selected="true" value={object.ID_FACULTY} > Hola id facultades </option>
                            </select> 
                            

                       {/*      <select
                                id="idFaculty"
                                value={object.ID_FACULTY} // Si necesitas controlar el valor seleccionado
                                onChange={(e) => {
                                    // Manejar el cambio si es necesario
                                }}
                            >
                                <option value="">Seleccione una facultad</option>
                                {getAllFaculties().map(faculty => (
                                    <option
                                        key={faculty.ID_FACULTY}
                                        value={faculty.ID_FACULTY}
                                    >
                                        {faculty['NOMBRE FACULTAD']}
                                    </option>
                                ))}
                            </select> */}

                         {/*    {console.log(<FacultiesComponent/>)} */}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-bs-dismiss="modal"
                                onClick={updateObject}
                            >
                                Editar
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={handleClose}
                            >
                                Cerrar
                            </button>
                            <FacultiesComponent/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateModal;