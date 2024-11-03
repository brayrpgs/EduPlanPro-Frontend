
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import IconUpdate from '../icons/ModalUpdateIcons/IconUpdate.jsx';
import './UpdateSchool.css';

const UpdateSchool = ({ school }) => {
    const [desc, setSchoolName] = useState('');
    const [facu, setSelectedFacultyId] = useState('');
    const [faculties, setFaculties] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputError, setInputError] = useState('');

    useEffect(() => {
        const getFaculties = async () => {
            try {
                const response = await fetch(`http://localhost:3001/faculty`, { 
                    method: "GET", 
                    credentials: 'include'
                });
                
                if (response.ok) {
                    const facultiesData = await response.json();
                    setFaculties(facultiesData.data);
                } else {
                    throw new Error('Error al cargar las facultades');
                }
            } catch (err) {
                console.error("Error cargando facultades:", err.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar las facultades. Por favor, recarga la página.',
                });
            }
        };

        getFaculties();
    }, []);

    useEffect(() => {
        if (school) {
            setSchoolName(school['NOMBRE ESCUELA'] || '');
            setSelectedFacultyId(school.ID_FACULTY || '');
        }
    }, [school]);

    useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => {
                setIsModalVisible(true);
            }, 10);
        }
    }, [isModalOpen]);

    if (!school) return null;

    // Función para validar el texto
    const validateInput = (text) => {
        // Expresión regular que solo permite letras (incluyendo tildes y ñ), espacios y puntos
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/;
        return regex.test(text);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSchoolName(value);
        
        // Limpiar el mensaje de error cuando el usuario empieza a escribir
        if (inputError) {
            setInputError('');
        }
    };

    const updateSchool = async e => {
        e.preventDefault();

        // Validar que el campo no esté vacío
        if (!desc.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Campo vacío',
                text: 'El nombre de la escuela no puede estar vacío',
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

        // Validar que se haya seleccionado una facultad
        if (!facu) {
            Swal.fire({
                icon: 'warning',
                title: 'Debe seleccionar una facultad',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

        try {
            const body = {
                desc: desc.trim(), // Eliminar espacios al inicio y final
                facu,
                'stat': 1,
                'id': school.ID_SCHOOL
            };

            const response = await fetch(`http://localhost:3001/school`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: "include",
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Escuela actualizada',
                    text: 'La información de la escuela se actualizó correctamente.',
                    showConfirmButton: false,
                    timer: 1500
                });
                closeModal();
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                throw new Error('Error al actualizar la escuela');
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar la escuela. Por favor, intenta de nuevo.',
            });
            console.error(err.message);
        }
    }

    const resetFields = () => {
        if (school) {
            setSchoolName(school['NOMBRE ESCUELA'] || '');
            setSelectedFacultyId(school.ID_FACULTY || '');
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
                <div className={`modal-overlay ${isModalVisible ? 'show' : ''}`} >
                    <div className={`modal-container ${isModalVisible ? 'show' : ''}`} 
                         onClick={e => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Actualizar Escuela</h2>
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
                                    <label>Nombre de la Escuela</label>
                                    <input 
                                        type="text" 
                                        value={desc} 
                                        onChange={handleInputChange}
                                        className={inputError ? 'error' : ''}
                                    />
                                    {inputError && (
                                        <span className="error-message">{inputError}</span>
                                    )}
                                    <label className="label-select">Facultad</label>
                                    <select 
                                        value={facu}
                                        onChange={e => setSelectedFacultyId(e.target.value)}
                                        className={!facu && inputError ? 'error' : ''}
                                    >
                                        <option value="">Seleccione una facultad</option>
                                        {faculties.map(faculty => (
                                            <option 
                                                key={faculty.ID_FACULTY} 
                                                value={faculty.ID_FACULTY}
                                            >
                                                {faculty['NOMBRE FACULTAD']}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="save-button"
                                    onClick={updateSchool}
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

export default UpdateSchool;
