import { useEffect, useState } from 'react';
import data from './fields.json'

export const RecyclingBinHead = ({ setData, datas }) => {

    /**optiene los datos de un json llamado
     * fields.json en el mismo directorio
     */
    const fields = data

    const [school, setSchool] = useState(false)
    const [faculty, setFaculty] = useState(false)
    const [carrer, setCarrer] = useState(false)
    const [profesor, setProfesor] = useState(false)
    const [user, setUser] = useState(false)
    const [studyPlan, setStudyPlan] = useState(false)
    const [courseProgram, setCourseProgram] = useState(false)


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

    function handleFilterCheckbox(event) {
        if (event.target.id === "school") {
            event.target.checked === true ? setSchool(true) : setSchool(false)
        }

        if (event.target.id === "faculty") {
            event.target.checked === true ? setFaculty(true) : setFaculty(false)
        }

        if (event.target.id === "carreer") {
            event.target.checked === true ? setCarrer(true) : setCarrer(false)
        }

        if (event.target.id === "profesor") {
            event.target.checked === true ? setProfesor(true) : setProfesor(false)
        }

        if (event.target.id === "user") {
            event.target.checked === true ? setUser(true) : setUser(false)
        }

        if (event.target.id === "study-plan") {
            event.target.checked === true ? setStudyPlan(true) : setStudyPlan(false)
        }

        if (event.target.id === "course-program") {
            event.target.checked === true ? setCourseProgram(true) : setCourseProgram(false)
        }
    }

    useEffect(() => {
        setData([])
        if (school || faculty || carrer || profesor || user || studyPlan || courseProgram) {
            fetchItems();
        }
    }, [school, faculty, carrer, profesor, user, studyPlan, courseProgram])

    async function fetchItems() {
        const params = new URLSearchParams();

        if (school) params.append("school", "0");
        if (faculty) params.append("faculty", "0");
        if (carrer) params.append("carrer", "0");
        if (profesor) params.append("teacher", "0");
        if (user) params.append("user", "0");
        if (studyPlan) params.append("study", "0");
        if (courseProgram) params.append("course", "0");

        const url = `http://localhost:3001/recyclebin?${params.toString()}`;

        try {
            const response = await fetch(url, { "credentials": 'include' });
            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();
            console.log("datos fetch", data)
            setData(data.data)
        } catch (error) {
            console.error("Error fetching items:", error);
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
