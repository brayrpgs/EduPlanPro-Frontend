
/**
 * @description This is the component for the backup.
 * @author Brayan rosales perez
 * 2024-04-23
 * @returns 
 */
export default function Backup(isOpen) {
    /**
     * 
     */
    return (
        <>
            <div
                className={`${!isOpen && "hidden"
                    } bg-gray-600/50 min-h-screen w-full z-40 flex fixed top-0 right-0 left-0 backdrop-blur-[0.3vh]`}
                /*onClick={() => closeActions()}*/
            ></div>
            <div
                className={`${isOpen
                    ? "w-[35vw] min-h-[30vh] overflow-hidden bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-start border-[-1vh] border-gray-400 rounded-[1vh] transition-[width] duration-300"
                    : "w-[15%]"
                    }`}
            >
                prueba de concepto
            </div>
        </>
    );
}