import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import IconUpdate from '../icons/ModalUpdateIcons/IconUpdate.jsx';
import './UpdateFaculty.css';

const UpdateFaculty = ({ faculty }) => {
    const [desc, setNombreFacultad] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (faculty) {
            setNombreFacultad(faculty['NOMBRE FACULTAD'] || '');
        }
    }, [faculty]);

    if (!faculty) {
        return null;
    }

    const updateFaculty = async e => {
        e.preventDefault();
        try {
            const body = {
                desc,
                'id': faculty.ID_FACULTY,
                'stat': 1
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
                setIsModalOpen(false);
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

    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetFields();
    }

    return (
        <div>
            <button 
                className="update-button"
                onClick={() => setIsModalOpen(true)}
            >
                <IconUpdate />
            </button>

            {isModalOpen && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-container" onClick={e => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Actualizar Facultad</h2>
                                <button 
                                    className="close-button"
                                    onClick={handleCloseModal}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Nombre de la Facultad</label>
                                    <input 
                                        type="text" 
                                        value={desc} 
                                        onChange={e => setNombreFacultad(e.target.value)} 
                                    />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button 
                                    className="save-button"
                                    onClick={updateFaculty}
                                >
                                    Guardar Cambios
                                </button>
                                <button 
                                    className="cancel-button"
                                    onClick={handleCloseModal}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UpdateFaculty;