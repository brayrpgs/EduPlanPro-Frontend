import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import IconUpdate from '../icons/ModalUpdateIcons/IconUpdate.jsx';

const UpdateFaculty = ({ faculty }) => {
    const [desc, setNombreFacultad] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputError, setInputError] = useState('');

    useEffect(() => {
        if (faculty) {
            setNombreFacultad(faculty['NOMBRE FACULTAD'] || '');
        }
    }, [faculty]);

    if (!faculty) return null;

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

    const BotonCancelar = (message) => {
        Swal.fire({
          title: 'Cancelado',
          text: 'Acción cancelada',
          icon: 'info',
          iconColor: '#2B385A',
          confirmButtonColor: '#A31E32',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          
          setIsModalOpen(false);
        });
      };

    const updateFaculty = async e => {
        e.preventDefault();

        if (!desc.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'El nombre de la facultad no puede estar vacío',
                confirmButtonColor: '#A31E32'
            });
            return;
        }

        if (!validateInput(desc)) {
            Swal.fire({
                icon: 'error',
                title: 'El nombre solo puede contener letras, espacios y puntos',
                confirmButtonColor: '#A31E32'
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

            const jsonResponse = await response.json();
            if (jsonResponse.code === "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Facultad actualizada',
                    text: 'La información de la facultad se actualizó correctamente.',
                    showConfirmButton: false,
                    timer: 1500,
                    confirmButtonColor: '#A31E32'
                });
                handleClose();
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            else {
                throw new Error('Error al actualizar la facultad');
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar la facultad, ya existe una con ese nombre',
                confirmButtonColor: '#A31E32'
            });
            handleClose();
            console.error(err.message);
        }
    }

    const resetFields = () => {
        if (faculty) {
            setNombreFacultad(faculty['NOMBRE FACULTAD'] || '');
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
                style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", transition: "opacity 0.2s" }}
            >
                <IconUpdate />
            </button>

            <div
                className={`modal fade ${isModalOpen ? 'show' : ''}`}
                style={{ display: isModalOpen ? 'block' : 'none' }}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="updateFacultyModal"
                aria-hidden={!isModalOpen}
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header" style={{     
                backgroundColor: "#A31E32",
              }}>
                            <h4 className="modal-title text-white" id="updateFacultyModal">
                                Actualizar Facultad
                            </h4>
                            <button
                                type="button"
                                className="btn-close bg-white"
                                aria-label="Close"
                                onClick={handleClose}
                            />
                        </div>

                        <div className="modal-body">
                            <form onSubmit={updateFaculty}>
                                <label htmlFor="facultyName" className="form-label">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    className="form-control placeholder-black"
                                    id="facultyName"
                                    value={desc}
                                    onChange={handleInputChange}
                                    placeholder="Ingrese un nombre"
                                />
                                <div className="d-flex justify-content-center gap-2 mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-danger"
                                        style={{
                                            width: "100px",
                                            backgroundColor: "#A31E32"
                                        }}
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Close"
                                        
                                        style={{
                                            width: "100px",
                                            backgroundColor: "#2b3843",
                                            color: "white",
                                            border: "none",
                                            padding: "10px 20px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            marginLeft: "10px",
                                            marginTop: "40px"
                                        }}
                                        onClick={() => BotonCancelar('Acción cancelada')}
                                        
                                    >
                                        Cancelar
                                       
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-backdrop fade"></div>
            )}
        </>
    );
}

export default UpdateFaculty;