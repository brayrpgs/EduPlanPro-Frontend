import { useState, useEffect } from "react"
import ModalBase from "../modals/ModalBase"
import InputForm from "../form/InputForm"
import { SweetAlertSuccess, SweetAlertError } from "../../assets/js/sweetalert.js"



async function fetchFacultyCreate(data) {
    try {
        const response = await fetch('http://localhost:3001/faculty', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Asegura que el servidor sepa que es JSON
            },
            body: JSON.stringify(data),  // Convierte el objeto a un string JSON
            credentials: 'include'  // Mantiene las cookies o credenciales en la solicitud
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const jsonResponse = await response.json();
        console.log(jsonResponse);
        document.getElementById("closeFacultyModalAdd").click()
        SweetAlertSuccess("Registro exitoso!")
        // Asegúrate de que jsonResponse.data sea un array
        return jsonResponse.data;

    } catch (error) {
        console.error('Error al crear la facultad:', error);
        SweetAlertError(`Error al crear la facultad :${error.message}`)

    }
}

const FacultyModalAdd = () => {

    const [data, setData] = useState({
        name: ""
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault()
        fetchFacultyCreate(data)

    }



    /*  ahi en el modalbase, le paso el nombre del modal, el id del mae y el nombre del boton para cerrarlo*/

    return (
        <ModalBase
            title={"Crear Facultad"}
            idModal={"facultyModalAdd"}
            idBtnClose={"closeFacultyModalAdd"}
        >
            <form onSubmit={handleSubmit}><InputForm valueInput={data.name} setValueInput={handleChange} typeInput={"text"} nameInput={"name"} label={"Nombre"} placeholder={"nombre de la facultad"} />
                <div className="d-flex justify-content-center">
                    <button className="btn btn-danger mt-3" type="submit" style={{ maxWidth: "100px" }}>Guardar</button>

                </div>
            </form>



        </ModalBase>
    )
}

export default FacultyModalAdd