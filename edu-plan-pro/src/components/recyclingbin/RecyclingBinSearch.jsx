import React from 'react'
import FilterOffIcon from '../icons/MainIcons/FilterOffIcon'
import MainSearch from '../search/MainSearch'

export const RecyclingBinSearch = ({ data, setFilteredData }) => {
    const [mainFilter, setMainFilter] = React.useState('')

    const handleSearch = () => {
        try {
            // Validar que data sea un array
            if (!Array.isArray(data)) {
                console.error("El prop 'data' no es un array válido.")
                setFilteredData([]) // Si no es válido, devolver un array vacío
                return
            }

            // Filtrar los datos basados en el término de búsqueda
            const filtered = data.filter(item => {
                const dataValue = item.DATA?.toLowerCase() || '' // Manejar valores nulos o indefinidos
                const stateValue = item.STATE?.toLowerCase() || '' // Manejar valores nulos o indefinidos
                return (
                    dataValue.includes(mainFilter.toLowerCase()) ||
                    stateValue.includes(mainFilter.toLowerCase())
                )
            })

            setFilteredData(filtered) // Actualizar los datos filtrados
        } catch (error) {
            console.error("Error durante el filtrado:", error)
            setFilteredData([]) // En caso de error, devolver un array vacío
        }
    }

    const clearFilter = () => {
        setMainFilter('') // Limpiar el filtro
        setFilteredData(data) // Restaurar los datos originales
    }

    return (
        <div className='flex justify-center content-center items-center'>
            <MainSearch
                placeholder={"Ingrese algún criterio de búsqueda"}
                onSearch={handleSearch}
                mainFilter={mainFilter}
                setMainFilter={setMainFilter}
            />
            <div
                title="Limpiar filtros."
                className="flex h-[3.8vh] items-center cursor-pointer hover:scale-110"
                onClick={clearFilter}
            >
                <FilterOffIcon />
            </div>
        </div>
    )
}