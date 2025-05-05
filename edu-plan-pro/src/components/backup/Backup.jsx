import Swal from "sweetalert2";
import ExportIcon from "../icons/BackupIcons/ExportIcon";
import ImportIcon from "../icons/BackupIcons/ImportIcon";
import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";
import InfoIcon from "../icons/BackupIcons/InfoIcon";

/**
 * @description este componente tiene la responsabilidad
 *  de manejar las peticiones de respaldos automaticos y 
 *  manuales
 * @author Brayan rosales perez
 * 2024-04-23
 * @returns this component
 */
export default function Backup({ isOpen, setOpen }) {

    //restaura la base de datos 
    async function restoreDB() {

        const FILE = {
            "fileName": "backup.sql"
        }

        const input = new Request("http://localhost:3001/restore")
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const init = {
            method: 'POST',
            headers: headers,
            credentials: "include",
            body: JSON.stringify(FILE)
        };

        const respond = await fetch(input, init);
        if (!respond) return;
        if (respond.status === 200) {
            Swal.fire({
                icon: "success",
                iconColor: "#7cda24",
                title: "Restauracion completada",
                text: "El respaldo interno fue cargado correctamente",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#A31E32"
            });
        } else if (respond.status !== 200) {
            Swal.fire({
                icon: "error",
                iconColor: "#a31e32",
                title: "Restauracion incompletada",
                text: "No se encontró el archivo de respaldo. Por favor, verifique que exista un archivo de respaldo en la carpeta [C:/respaldosBD/].",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#A31E32"
            });

        }
    }


    //funcion manejadora de la informacion de las restauraciones!
    function showInfo() {
        const info = document.getElementById("info");

        info.style.opacity = "0";
        info.style.transform = "translateY(0%)";
        info.hidden = false;
        info.style.transition = "all 0.5s ease";
        info.style.textAlign = "center";
        info.style.position = "fixed";
        info.style.zIndex = "51";
        info.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        info.style.padding = "2ch";
        info.style.width = "30ch";
        info.style.top = "50%";
        info.style.left = "70%";
        info.style.borderStyle = "solid";
        info.style.borderWidth = "1px";
        info.style.borderColor = "white";
        info.style.borderRadius = "10px";
        info.style.backdropFilter = "blur(30px)";
        info.style.webkitBackdropFilter = "blur(30px)";

        setTimeout(() => {
            info.style.opacity = "1";
            info.style.transform = "translateY(-50%)";
        }, 10);
    }

    function closeInfo() {
        const info = document.getElementById("info");

        info.style.transition = "all 0.5s ease";
        info.style.opacity = "0";
        info.style.transform = "translateY(-100%)";

        setTimeout(() => {
            info.hidden = true;
        }, 500);
    }


    return (
        <>
            {/**
            * este es el blur de la ventana
            */}
            <div
                className={`${!isOpen && "hidden"
                    } bg-gray-600/50 min-h-screen w-full z-40 flex fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]`}
                onClick={() => { setOpen(false) }}
            ></div>

            <div id="info" hidden> Los respaldos se generan automáticamente cada lunes a las 10: 00 a.m. Sin embargo, si lo desea, puede cargar el respaldo más reciente presionando el ícono 'Restaurar Respaldo'.</div>

            {/**
             * este es el contenedor de la ventana popUP
             */}
            <div
                className={`${isOpen
                    ? "w-[35vw] min-h-[30vh] overflow-hidden bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300"
                    : "w-[15%]"
                    }`}
            >
                {isOpen && (
                    <div className="w-full flex flex-col justify-center items-center ">
                        {/**
                         * este es el encabezado de la ventana popUp
                         */}
                        <div className="bg-UNA-Red w-full h-[7vh] flex top-0 fixed border-white z-50 rounded-t-[1vh] text-start items-center">
                            <h1 className="text-[3vh] ml-[1vw] text-white">Gestionar los respaldos del sistema</h1>
                            <div className="w-[5vw] right-0 h-full absolute flex text-center justify-center items-center">
                                <button
                                    className="flex w-[60%] h-[60%] bg-UNA-Pink-Light rounded-[0.5vh] items-center justify-center"
                                    onClick={() => { setOpen(false) }}
                                >
                                    <div className="flex w-[75%] h-[75%] ">
                                        <CancelActionIcon />
                                    </div>
                                </button>
                            </div>
                        </div>
                        {/**
                         * este el el fin de el encabezado de la ventana popUp
                         */}

                        {/**
                         * este es el contenido de la ventana popUp
                         */}
                        <div className="w-full max-w-full mt-[10vh] mb-[2vh] flex justify-around relative">

                            {/**
                             * icono con acion de Exportar
                             */}
                            <div className="flex flex-col justify-center">
                                <label className="text-left font-bold text-[1.2vw] m-auto" htmlFor="export">
                                    Exportar Respaldo
                                </label>
                                <a className="m-auto " href="http://localhost:3001/backup" download id="export">
                                    <ExportIcon size={"3vw"} />
                                </a>
                            </div>

                            {/**
                             * icono con acion de Importar
                             */}
                            <div className="flex flex-col justify-center">
                                <label className="text-left font-bold text-[1.2vw] m-auto" htmlFor="import">
                                    Restaurar Respaldo
                                </label>
                                <div className="m-auto cursor-pointer flex" id="import">
                                    <div onClick={() => { restoreDB() }}>
                                        <ImportIcon size={"3vw"} />
                                    </div>
                                    <div
                                        className="h-min"
                                        onMouseOver={() => { showInfo() }}
                                        onMouseLeave={() => { closeInfo() }}
                                    >
                                        <InfoIcon size={"1vw"} />
                                    </div>

                                </div>
                            </div>

                        </div>
                        {/**
                         * este el el fin de el contenido de la ventana popUP
                         */}


                        {/**
                         * este es el footer de la ventana popUp
                         */}
                        <div className="w-full h-[7vh] flex bottom-0 fixed border-white z-50 text-center justify-center items-center">
                            <button
                                className="border-[0.1vh] bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]"
                                onClick={() => { setOpen(false) }}
                            >
                                Aceptar
                            </button>
                            <button
                                className="border-[0.1vh] bg-UNA-Blue-Dark text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[0.1vw] mr-[1vw]"
                                onClick={() => { setOpen(false) }}
                            >
                                Cancelar
                            </button>
                        </div>
                        {/**
                         * este el el fin de el footer
                         */}

                    </div>
                )}
            </div >
            {/**
             * este es el fin de el contenedor de la ventana popUP
             */}
        </>
    );
}