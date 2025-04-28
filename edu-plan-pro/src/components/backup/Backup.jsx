import CancelActionIcon from "../icons/MainIcons/CancelActionIcon";

/**
 * @description This is the component for the backup.
 * @author Brayan rosales perez
 * 2024-04-23
 * @returns 
 */
export default function Backup({ isOpen, setOpen }) {
    /**
     * 
     */
    return (
        <>
            <div
                className={`${!isOpen && "hidden"
                    } bg-gray-600/50 min-h-screen w-full z-40 flex fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]`}
                onClick={() => { setOpen(false) }}
            ></div>
            <div
                className={`${isOpen
                    ? "w-[35vw] min-h-[30vh] overflow-hidden bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300"
                    : "w-[15%]"
                    }`}
            >
                {isOpen && (
                    <div className="w-full flex flex-col justify-center items-center ">
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
                        <div className="w-full max-w-full mt-[7vh] mb-[7vh] flex flex-col items-start relative">
                            <label className="text-left ml-[1vw] mt-[3vh] font-bold text-[1.2vw]" htmlFor="name">
                                Nombre de la escuela
                            </label>

                            <input
                                className="w-[94%] mt-[1.1vh] text-[0.9vw] ml-[1vw] h-[5vh] px-[1vw] focus:border-UNA-Red rounded-[1vh] outline-none  border-[0.1vh]"
                                autoComplete="off"
                                spellCheck="false"
                                title="Ingrese un nombre. Asegurate que no incluya números ni carácteres especiales."
                                placeholder="Ingrese el nombre de la escuela"
                                value={1}
                                onChange={() => { }}
                                name="desc"
                                id="desc"
                                type="text"
                            />
                            <label className="text-left ml-[1vw] mt-[2vh] font-bold text-[1.2vw]" htmlFor="facultad">
                                Facultad
                            </label>
                        </div>
                        <div className="w-full h-[7vh] flex bottom-0 fixed border-white z-50 text-center justify-center items-center">
                            <button
                                className="border-[0.1vh] bg-UNA-Red text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[1vw] mr-[0.1vw]"
                                onClick={(f) => { console.log(f) }}
                            >
                                Agregar
                            </button>
                            <button
                                className="border-[0.1vh] bg-UNA-Blue-Dark text-white text-[0.9vw] rounded-[0.3vw] h-[60%] border-black w-[50%] ml-[0.1vw] mr-[1vw]"
                                onClick={(f) => { console.log(f) }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}