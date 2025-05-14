import { useEffect, useState } from 'react';
import data from './fields.json'

export const RecyclingBinHead = ({ setData, datas }) => {

    /**optiene los datos de un json llamado
     * fields.json en el mismo directorio
     */
    const fields = data

    const [school, setSchool] = useState([])
    const [faculty, setFaculty] = useState([])
    const [carrer, setCarrer] = useState([])
    const [profesor, setProfesor] = useState([])
    const [user, setUser] = useState([])
    const [studyPlan, setStudyPlan] = useState([])
    const [courseProgram, setCourseProgram] = useState([])

    useEffect(() => {
        setData(school.concat(faculty))
    }, [school, faculty, carrer, profesor, user, studyPlan, courseProgram])


    /**
     * Brayan rosales perez 12-05-2025
     * funcion que se encarga de cambiar los
     * colores del criterio de busqueda selecionado
     * @param {*} event 
     * @param {*} idCheckbox 
     */
    function changeColorItem(event, idCheckbox) {
        const checkbox = document.getElementById(idCheckbox)
        if (!checkbox.checked) {
            event.target.classList.value = "cursor-pointer hover:scale-110 opacity-100 text-UNA-Yellow"
        }
        else {
            event.target.classList.value = "cursor-pointer hover:scale-110 opacity-50"
        }
    }

    function cleanDataSchool(origin) {
        const newOrigin = origin.map((value) => (
            {
                "data": value["NOMBRE ESCUELA"],
                "id": value["ID_SCHOOL"],
                "module": "Escuela"
            })
        )
        return newOrigin
    }

    function cleanDataFaculty(origin) {
        const newOrigin = origin.map((value) => (
            {
                "data": value["NOMBRE FACULTAD"],
                "id": value["ID_FACULTY"],
                "module": "Facultad"
            })
        )
        return newOrigin
    }

    function cleanDataCarreer(origin) {
        const newOrigin = origin.map((value) => (
            {
                "data": value["NOMBRE DE CARRERA"],
                "id": value["ID_CAREER"],
                "module": "Carrera"
            })
        )
        return newOrigin
    }


    async function handleFilterCheckbox(event) {

        console.log(event.target.id);
        console.log(event.target.checked);

        //para traer y setear los datos de las ecuelas
        if (event.target.id === "school") {
            if (event.target.checked) {
                const req = await (await fetch(
                    fields[0].url,
                    {
                        credentials: "include",
                    }
                )).json()
                setSchool(cleanDataSchool(req.data))
            } else {
                setSchool([])
            }
        }

        //para facultades
        if (event.target.id === "faculty") {
            if (event.target.checked) {
                const req = await (await fetch(
                    fields[1].url,
                    {
                        credentials: "include",
                    }
                )).json()
                setFaculty(cleanDataFaculty(req.data))
            } else {
                setFaculty([])
            }
        }
        //para carreras 
        if (event.target.id !== "carrer") {
            if (event.target.checked) {
                const req = await (await fetch(
                    fields[2].url,
                    {
                        credentials: "include",
                    }
                )).json()
                setCarrer(cleanDataCarreer(req.data))
            } else {
                setCarrer([])
            }
        }
        //para profesores
        if (event.target.id !== "profesor") {
            if (event.target.checked) {
                const req = await (await fetch(
                    fields[3].url,
                    {
                        credentials: "include",
                    }
                )).json()
                setProfesor(req.data)
            } else {
                setProfesor([])
            }
        }
        //para usuarios
        if (event.target.id !== "user") {
            if (event.target.checked) {
                const req = await (await fetch(
                    fields[4].url,
                    {
                        credentials: "include",
                    }
                )).json()
                setUser(req.data)
            } else {
                setUser([])
            }
        }
        //para planes de estudio
        if (event.target.id !== "study-plan") {
            if (event.target.checked) {
                const req = await (await fetch(
                    fields[5].url,
                    {
                        credentials: "include",
                    }
                )).json()
                setStudyPlan(req.data)
            } else {
                setStudyPlan([])
            }
        }
        //para programas del curso
        if (event.target.id !== "course-program") {
            if (event.target.checked) {
                const req = await (await fetch(
                    fields[6].url,
                    {
                        credentials: "include",
                    }
                )).json()
                setCourseProgram(req.data)
            } else {
                setCourseProgram([])
            }
        }
    }

    return (
        <div className='bg-UNA-Blue-Dark w-[100%] flex rounded-[0.5vh] items-center text-white mt-[3vh] p-[1vh] justify-around'>
            <h1 className='ml-[1vw] my-[0.5vh] text-xl text-white text-center'>Papelera de reciclaje</h1>
            {
                fields.map((value) => (
                    <div key={value.id} className='flex flex-col justify-center content-center items-center'>
                        <label htmlFor={value.id} className='cursor-pointer hover:scale-110 opacity-50' onClick={(event) => { changeColorItem(event, value.id) }}>{value.name}</label>
                        <input id={value.id} type="checkbox" hidden onChange={(event) => { handleFilterCheckbox(event) }} />
                    </div>
                ))
            }
        </div >
    )
}
