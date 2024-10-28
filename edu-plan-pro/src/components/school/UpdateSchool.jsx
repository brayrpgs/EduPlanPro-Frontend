import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import IconUpdate from '../icons/ModalUpdateIcons/IconUpdate.jsx';

const UpdateSchool = ({ school }) => {
    const [desc, setSchoolName] = useState('');
    const [facu, setSelectedFacultyId] = useState(''); // para la facultad seleccionada
    const [faculties, setFaculties] = useState([]); // para el fetch que carga las facultades

    // Cargar las facultades
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

    // Inicializar los estados cuando el componente se monta o school cambia
    useEffect(() => {
        if (school) {
            setSchoolName(school['NOMBRE ESCUELA'] || '');
            setSelectedFacultyId(school.ID_FACULTY || '');
        }
    }, [school]);

    if (!school) {
        return null;
    }

    const updateSchool = async e => {
        e.preventDefault();
        try {
            const body = {
                desc,
                facu,
                'stat':1,
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
            } else {
                throw new Error('Error al actualizar la escuela');
            }
            setTimeout(() => {
                window.location.reload();
            }, 1500);
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

    return (
        <div>
            <button 
                type="button" 
                className="btn btn-warning" 
                data-bs-toggle="modal" 
                data-bs-target={`#id${school.ID_SCHOOL}`}
                style={{marginTop: 0}}
            >
                <IconUpdate />
            </button>

            <div 
                className="modal fade" 
                id={`id${school.ID_SCHOOL}`} 
                tabIndex="-1" 
                aria-labelledby="exampleModalLabel" 
                aria-hidden="true" 
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* Cabecera del modal */}
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Actualizar Escuela
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
                                <label className="form-label">Nombre de la Escuela</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={desc} 
                                    onChange={e => setSchoolName(e.target.value)} 
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Facultad</label>
                                <select 
                                    className="form-select"
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

                        {/* Pie del modal */}
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-warning" 
                                data-bs-dismiss="modal" 
                                onClick={e => updateSchool(e)}
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

export default UpdateSchool;