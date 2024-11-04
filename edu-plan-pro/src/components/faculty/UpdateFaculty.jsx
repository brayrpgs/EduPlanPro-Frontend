import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import IconUpdate from '../icons/ModalUpdateIcons/IconUpdate.jsx';
import './UpdateFaculty.css';

const UpdateFaculty = ({ faculty }) => {
    const [desc, setNombreFacultad] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputError, setInputError] = useState('');

    useEffect(() => {
        if (faculty) {
            setNombreFacultad(faculty['NOMBRE FACULTAD'] || '');
        }
    }, [faculty]);

    useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => {
                setIsModalVisible(true);
            }, 10);
        }
    }, [isModalOpen]);

    if (!faculty) return null;

    // Función para validar el texto
    const validateInput = (text) => {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/;
        return regex.test(text);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setNombreFacultad(value);
        
        if (inputError) {
            setInputError('');
        }
    };

    const updateFaculty = async e => {
        e.preventDefault();

        // Validar que el campo no esté vacío
        if (!desc.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Campo vacío',
                text: 'El nombre de la facultad no puede estar vacío',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

        // Validar que solo contenga texto
        if (!validateInput(desc)) {
            Swal.fire({
                icon: 'warning',
                title: 'Formato inválido',
                text: 'El nombre solo puede contener letras, espacios y puntos',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

        try {
            const body = {
                desc: desc.trim(),
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
                closeModal();
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                throw new Error('Error al actualizar la facultad');
            }
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
        setInputError(''); // Limpiar cualquier mensaje de error
    }

    const closeModal = () => {
        setIsModalVisible(false);
        setTimeout(() => {
            setIsModalOpen(false);
        }, 300);
        resetFields();
    }

    return (
        <div>
            <button 
                type="button" 
                className="update-button"
                onClick={() => setIsModalOpen(true)}
            >
                <IconUpdate />
            </button>

            {isModalOpen && (
                <div className={`modal-overlay ${isModalVisible ? 'show' : ''}`}>
                    <div className={`modal-container ${isModalVisible ? 'show' : ''}`} 
                         onClick={e => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Actualizar Facultad</h2>
                                <button 
                                    type="button" 
                                    className="close-button"
                                    onClick={closeModal}
                                >
                                    X
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Nombre de la Facultad</label>
                                    <input 
                                        type="text" 
                                        value={desc} 
                                        onChange={handleInputChange}
                                        className={inputError ? 'error' : ''}
                                    />
                                    {inputError && (
                                        <span className="error-message">{inputError}</span>
                                    )}
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="save-button"
                                    onClick={updateFaculty}
                                >
                                    Guardar Cambios
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