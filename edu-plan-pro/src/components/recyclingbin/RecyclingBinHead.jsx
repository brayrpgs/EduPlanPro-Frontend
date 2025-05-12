import React from 'react'

export const RecyclingBinHead = () => {
    return (
        <div className='bg-UNA-Blue-Dark w-[100%] flex rounded-[0.5vh] items-center text-white mt-[3vh] p-[1vh] justify-around'>

            <h1 className='ml-[1vw] my-[0.5vh] text-xl text-white text-center'>Papelera de reciclaje</h1>

            <div className='flex flex-col justify-center content-center items-center w-[8vw]'>
                <label htmlFor="school">Escuela</label>
                <input id='school' type="checkbox" />
            </div>

            <div className='flex flex-col justify-center content-center items-center text-center '>
                <label htmlFor="faculty">Facultad</label>
                <input id='faculty' type="checkbox" className='text-white' />
            </div>

            <div className='flex flex-col justify-center content-center items-center text-center '>
                <label htmlFor="carrer">Carrera</label>
                <input id='carrer' type="checkbox" />
            </div>

            <div className='flex flex-col justify-center content-center items-center text-center'>
                <label htmlFor="profesor">Docente</label>
                <input id='profesor' type="checkbox" />
            </div>

            <div className='flex flex-col justify-center content-center items-center text-center '>
                <label htmlFor="user">Usuario</label>
                <input id='user' type="checkbox" />
            </div>

            <div className='flex flex-col justify-center content-center items-center text-center '>
                <label htmlFor="study-plan">Plan de estudio</label>
                <input id='study-plan' type="checkbox" />
            </div>

            <div className='flex flex-col justify-center content-center items-center text-center '>
                <label htmlFor="course-program">Programa de cursos</label>
                <input id='course-program' type="checkbox" />
            </div>
        </div>
    )
}
