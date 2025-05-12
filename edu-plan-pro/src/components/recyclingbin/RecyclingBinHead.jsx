import data from './fields.json'

export const RecyclingBinHead = () => {

    const fields = data
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

    return (
        <div className='bg-UNA-Blue-Dark w-[100%] flex rounded-[0.5vh] items-center text-white mt-[3vh] p-[1vh] justify-around'>
            <h1 className='ml-[1vw] my-[0.5vh] text-xl text-white text-center'>Papelera de reciclaje</h1>
            {
                fields.map((value) => (
                    <div key={value.id} className='flex flex-col justify-center content-center items-center'>
                        <label htmlFor={value.id} className='cursor-pointer hover:scale-110 opacity-50' onClick={(event) => { changeColorItem(event, value.id) }}>{value.name}</label>
                        <input id={value.id} type="checkbox" hidden onChange={() => { console.log("hola") }} />
                    </div>
                ))
            }
        </div >
    )
}
