import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import IconUpdate from '../icons/ModalUpdateIcons/IconUpdate.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateSchool = ({ school }) => {
    const [desc, setSchoolName] = useState('');
    const [facu, setSelectedFacultyId] = useState('');
    const [faculties, setFaculties] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                    confirmButtonColor: '#dc3545'
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

    const validateInput = (text) => {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/;
        return regex.test(text);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSchoolName(value);
        
        if (inputError) {
            setInputError('');
        }
    };

    const updateSchool = async e => {
        e.preventDefault();

        if (!desc.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Campo vacío',
                text: 'El nombre de la escuela no puede estar vacío',
                confirmButtonColor: '#dc3545'
            });
            return;
        }

        if (!validateInput(desc)) {
            Swal.fire({
                icon: 'warning',
                title: 'Formato inválido',
                text: 'El nombre solo puede contener letras, espacios y puntos',
                confirmButtonColor: '#dc3545'
            });
            return;
        }

        if (!facu) {
            Swal.fire({
                icon: 'warning',
                title: 'Debe seleccionar una facultad',
                confirmButtonColor: '#dc3545'
            });
            return;
        }

        try {
            const body = {
                desc: desc.trim(),
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

            const jsonResponse = await response.json();
            if (jsonResponse.code === "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Escuela actualizada',
                    text: 'La información de la escuela se actualizó correctamente.',
                    showConfirmButton: false,
                    timer: 1500,
                    confirmButtonColor: '#dc3545'
                });
                handleClose();
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
                text: 'No se pudo actualizar la escuela, ya existe una con ese nombre',
                confirmButtonColor: '#dc3545'
            });
            console.error(err.message);
        }
    }

    const resetFields = () => {
        if (school) {
            setSchoolName(school['NOMBRE ESCUELA'] || '');
            setSelectedFacultyId(school.ID_FACULTY || '');
        }
        setInputError('');
    }

    const handleClose = () => {
        setIsModalOpen(false);
        resetFields();
    }

    return (
        <>
            <button 
                type="button" 
                 className="update-button"
                onClick={() => setIsModalOpen(true)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", transition: "opacity 0.2s"}}
            >
                <IconUpdate />
            </button>

            <div
                className={`modal fade ${isModalOpen ? 'show' : ''}`}
                style={{ display: isModalOpen ? 'block' : 'none' }}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="updateSchoolModal"
                aria-hidden={!isModalOpen}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header bg-danger">
                            <h4 className="modal-title text-white" id="updateSchoolModal">
                                Actualizar Escuela
                            </h4>
                            <button
                                type="button"
                                className="btn-close bg-white"
                                aria-label="Close"
                                onClick={handleClose}
                            />
                        </div>
                        
                        <div className="modal-body">
                            <form onSubmit={updateSchool}>
                                <div className="mb-3">
                                    <label htmlFor="schoolName" className="form-label">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${inputError ? 'is-invalid' : ''}`}
                                        id="schoolName"
                                        value={desc}
                                        onChange={handleInputChange}
                                        placeholder="Ingrese un nombre"
                                    />
                                    {inputError && (
                                        <div className="invalid-feedback">
                                            {inputError}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="faculty" className="form-label">
                                        Facultad
                                    </label>
                                    <select 
                                        id="faculty"
                                        className={`form-select ${!facu && inputError ? 'is-invalid' : ''}`}
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

                                <div className="d-flex justify-content-center gap-2 mt-3">
                                    <button
                                        type="button"
                                        className="cancel-button"
                                        onClick={handleClose}
                                        style={{
                                            width: "100px",
                                            backgroundColor: "#A7A7A9",
                                            color: "white",
                                            border: "none",
                                            padding: "10px 20px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            marginLeft: "10px",
                                            marginTop: "40px" }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-danger"
                                        style={{ width: "100px" }}
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            {isModalOpen && (
                <div className="modal-backdrop fade show"></div>
            )}
        </>
    );
}

export default UpdateSchool;