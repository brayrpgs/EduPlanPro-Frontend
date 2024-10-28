import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import IconUpdate from '../icons/ModalUpdateIcons/IconUpdate.jsx';

const UpdateFaculty = ({ faculty }) => {
    const [desc, setNombreFacultad] = useState('');

    // Inicializar los estados cuando el componente se monta o faculty cambia
    useEffect(() => {
        if (faculty) {
            setNombreFacultad(faculty['NOMBRE FACULTAD'] || '');
        }
    }, [faculty]);

    // Validar que faculty existe antes de proceder
    if (!faculty) {
        return null; 
    }

    const updateFaculty = async e => {
        e.preventDefault();
        try {
            const body = {
                desc,
                'id':faculty.ID_FACULTY,
                'stat':1        
            };

            const response = await fetch(`http://localhost:3001/faculty`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: "include",
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Facultad actualizada',
                    text: 'La información de la facultad se actualizó correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                throw new Error('Error al actualizar la facultad');
            }

            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar la facultad. Por favor, intenta de nuevo.',
            });
            console.error(err.message);
        }
    }

    const resetFields = () => {
        if (faculty) {
            setNombreFacultad(faculty['NOMBRE FACULTAD'] || '');
        }
    }

    return (
        <div>
            <button 
                type="button" 
                className="btn btn-warning" 
                data-bs-toggle="modal" 
                data-bs-target={`#id${faculty.ID_FACULTY}`}
                style={{marginTop:0}}
            >
                <IconUpdate />
            </button>

            <div 
                className="modal fade" 
                id={`id${faculty.ID_FACULTY}`} 
                tabIndex="-1" 
                aria-labelledby="exampleModalLabel" 
                aria-hidden="true" 
                onClick={resetFields}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Cabecera del modal */}
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Actualizar Facultad
                            </h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close" 
                                onClick={resetFields}
                            ></button>
                        </div>

                        {/* Cuerpo del modal */}
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Nombre de la Facultad</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={desc} 
                                        onChange={e => setNombreFacultad(e.target.value)} 
                                    />
                                </div>
                            </div>

                            {/* Pie del modal */}
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-warning" 
                                    data-bs-dismiss="modal" 
                                    onClick={e => updateFaculty(e)}
                                >
                                    Guardar Cambios
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger" 
                                    data-bs-dismiss="modal" 
                                    onClick={resetFields}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default UpdateFaculty;