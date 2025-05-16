import DeleteForever from "../icons/recyclingBinIcons/DeleteForever"
import RecycleIcon from '../icons/DashboardIcons/RecycleIcon'
import Swal from "sweetalert2";

export const RecyclingBinTable = ({ data, setData }) => {

    const URL_MAP = {
        school: "http://localhost:3001/school",
        faculty: "http://localhost:3001/faculty",
        carreer: "http://localhost:3001/carreer",
        teacher: "http://localhost:3001/teacher",
        study_plan: "http://localhost:3001/studyplan",
        course_program: "http://localhost:3001/courseprogram",
    };

    const school = {
        desc: "",
        facu: "",
        stat: "",
        id: ""
    }

    const faculty = {
        desc: "",
        id: "",
        stat: ""
    }
    const carreer = {
        DSC_CARRER: "",
        DSC_CODE: "",
        ID_SCHOOL: "",
        STATE: "",
        ID_CAREER: ""
    }
    const teacher = {
        id: "",
        name: "",
        secName: "",
        idcard: "",
        email: "",
        stat: ""
    }
    const study_plan = {
        DSC_NAME: "",
        DAT_INIT: "",
        DAT_MAX: "",
        ID_CAREER: "",
        PDF_URL: "",
        STATE: "",
        ID_STUDY_PLAN: ""
    }
    const course_program = {
        ID_COURSE_PROGRAM: "",
        DSC_NAME: "",
        DAT_YEAR: "1",
        ID_STUDY_PLAN: "",
        NRC: "",
        CICLE: "",
        NUM_CREDITS: "",
        SIGNATURE: "",
        PDF_URL: "",
        STATE: ""
    }


    async function deleteElement(value) {
        try {
            const url = URL_MAP[value.table];
            if (!url) {
                console.error(`No URL definida para la tabla: ${value.table}`);
                return;
            }

            const res = await fetch(url, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: value.id }),
            });

            const result = await res.json();
            console.log(result);
            Swal.fire({
                icon: "info",
                iconColor: "#FCBC6D",
                title: "Resultado",
                text: result.data,
                confirmButtonText: "Aceptar",
                confirmButtonColor: " #A31E32",
                willClose: () => {
                },
            }).then((result) => {
                if (result.isConfirmed) {
                }
            });
        } catch (error) {
            console.error("Error al eliminar elemento:", error);
        }
    }

    async function recoveryElement(value, obj) {
        console.log(value, obj);
        try {
            const url = URL_MAP[value.table];
            if (!url) {
                console.error(`No URL definida para la tabla: ${value.table}`);
                return;
            }
            const res = await fetch(url, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });

            const result = await res.json();
            console.log(result);
            Swal.fire({
                icon: "info",
                iconColor: "#FCBC6D",
                title: "Resultado",
                text: result.data,
                confirmButtonText: "Aceptar",
                confirmButtonColor: " #A31E32",
                willClose: () => {
                },
            }).then((result) => {
                if (result.isConfirmed) {
                }
            });

        } catch (error) {
            console.error("Error al Editar elemento:", error);
        }
    }

    function getElement(value) {
        console.log(value);
        if (value.table === "school") {
            school.id = value.id
            school.desc = value.DATA
            school.facu = value.DATA2
            school.stat = 1
            console.log(school)
            return school
        }

        if (value.table === "faculty") {
            faculty.id = value.id
            faculty.desc = value.DATA
            faculty.stat = 1
            console.log(school)
            return faculty
        }

        if (value.table === "carreer") {
            carreer.DSC_CARRER = value.DATA
            carreer.DSC_CODE = value.DSC_CODE
            carreer.ID_CAREER = value.id
            carreer.ID_SCHOOL = value.ID_SCHOOL
            carreer.STATE = 1
            console.log(carreer)
            return carreer
        }

        if (value.table === "teacher") {
            teacher.id = value.id
            teacher.name = value.DATA
            teacher.secName = value.DATA2
            teacher.email = value.DATA4
            teacher.idcard = value.DATA3
            teacher.stat = 1
            console.log(teacher)
            return teacher
        }

        if (value.table === "study_plan") {
            study_plan.DSC_NAME = value.DATA
            study_plan.DAT_INIT = value.DATA2
            study_plan.DAT_MAX = value.DAT_MAX
            study_plan.ID_CAREER = value.ID_CAREER
            study_plan.PDF_URL = value.PDF_URL
            study_plan.STATE = 1
            study_plan.ID_STUDY_PLAN = value.id
            console.log(study_plan)
            return study_plan
        }

        if (value.table === "course_program") {
            course_program.ID_COURSE_PROGRAM = value.id
            course_program.DSC_NAME = value.DATA
            course_program.DAT_YEAR = value.DATA2
            course_program.ID_STUDY_PLAN = value.ID_STUDY_PLAN
            course_program.NRC = value.DATA3
            course_program.CICLE = value.CICLE
            course_program.NUM_CREDITS = value.NUM_CREDITS
            course_program.SIGNATURE = value.SIGNATURE
            course_program.PDF_URL = value.id
            course_program.STATE = 1
            console.log(course_program)
            return course_program
        }




    }


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
                                                carreer: "Carrera",
                                                school: "Escuela",
                                                faculty: "Facultad",
                                                teacher: "Docente",
                                                user: "Usuario",
                                                study_plan: "Plan de estudios",
                                                course_program: "Programa de curso"
                                            }[value.table] || "Desconocido"
                                        }
                                    </td>
                                    <td className="border-[0.1vh] border-gray-400 px-[1vw] py-[1vh] text-[0.9vw]">
                                        <div className="flex items-center flex-row justify-center w-full h-full gap-[0.2vw]">
                                            <div title='Destruir' onClick={() => {
                                                Swal.fire({
                                                    icon: "question",
                                                    iconColor: "#FCBC6D",
                                                    title: "Destruir elemento",
                                                    text: "¿Desea destruir el elemento?",
                                                    confirmButtonText: "Destruir",
                                                    confirmButtonColor: " #A31E32",
                                                    cancelButtonText: "Cancelar",
                                                    cancelButtonColor: " #2b3843",
                                                    showCancelButton: true,
                                                    willClose: () => {
                                                    },
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        deleteElement(value)
                                                        const newData = data.filter((_, i) => i !== index);
                                                        setData(newData);
                                                    }
                                                });
                                            }}>
                                                <DeleteForever color={"#A31E32"} height={"5vh"} width={"5vw"} />
                                            </div>
                                            <div title='Restaurar' onClick={() => {
                                                Swal.fire({
                                                    icon: "question",
                                                    iconColor: "#FCBC6D",
                                                    title: "Restaurar elemento",
                                                    text: "¿Desea restaurar el elemento?",
                                                    confirmButtonText: "Restaurar",
                                                    confirmButtonColor: " #2b3843",
                                                    cancelButtonText: "Cancelar",
                                                    cancelButtonColor: " #A31E32",
                                                    showCancelButton: true,
                                                    willClose: () => {
                                                    },
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        recoveryElement(value, getElement(value))
                                                        const newData = data.filter((_, i) => i !== index);
                                                        setData(newData);
                                                    }
                                                });
                                            }}>
                                                <RecycleIcon color={"#0C71C3"} height={"4vh"} width={"2vw"} />
                                            </div>
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
