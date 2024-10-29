import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import IconUpdate from '../icons/ModalUpdateIcons/IconUpdate.jsx';
import './UpdateSchool.css';

const UpdateSchool = ({ school }) => {
    const [desc, setSchoolName] = useState('');
    const [facu, setSelectedFacultyId] = useState('');
    const [faculties, setFaculties] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    if (!school) return null;

    const updateSchool = async e => {
        e.preventDefault();
        try {
            const body = {
                desc,
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
                setIsModalOpen(false);
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
    }

    const closeModal = () => {
        setIsModalOpen(false);
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
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-container" onClick={e => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Actualizar Escuela</h2>
                                <button 
                                    type="button" 
                                    className="close-button"
                                    onClick={closeModal}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Nombre de la Escuela</label>
                                    <input 
                                        type="text" 
                                        value={desc} 
                                        onChange={e => setSchoolName(e.target.value)} 
                                    />
                                    <label className="label-select">Facultad</label>
                                    <select 
                                        value={facu}
                                        onChange={e => setSelectedFacultyId(e.target.value)}
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
                                <button 
                                    type="button" 
                                    className="cancel-button"
                                    onClick={closeModal}
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

export default UpdateSchool;