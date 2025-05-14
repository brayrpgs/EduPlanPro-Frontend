import React from 'react'

export const RecyclingBinTable = ({ data, setData }) => {
    return (
        <div className=' h-[70vh] overflow-y-auto'>
            <div className="flex justify-center items-center mt-0 w-full overflow-x-auto ">
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red">
                                Elementos
                            </th>
                            <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-center text-[1vw] text-UNA-Red">
                                Categoria
                            </th>
                            <th className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] w-[10vw] text-[1vw] text-UNA-Red">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((value, index) => (
                                <tr key={index}>
                                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                                        {["DATA", "DATA2", "DATA3", "DATA4", "DATA5"]
                                            .filter(key => value[key] !== undefined && value[key] !== null)
                                            .map(key => value[key])
                                            .join(" - ")}
                                    </td>
                                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1.5vh] text-[0.9vw] text-center items-center break-words whitespace-normal max-w-[15vw]">
                                        {
                                        
                                        {
                                            career: "Carrera",
                                            school: "Escuela",
                                            faculty: "Facultad",
                                            teacher: "Docente",
                                            user: "Usuario",
                                            study_plan: "Plan de estudios",
                                            course_program: "Programa de curso"
                                        }[value.table] || "Desconocido"}
                                    </td>
                                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-[0.9vw]">
                                        <div className="flex items-center flex-row justify-center w-full h-full gap-[0.2vw]">

                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
