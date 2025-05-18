import React from 'react'
import FilterOffIcon from '../icons/MainIcons/FilterOffIcon'
import MainSearch from '../search/MainSearch'

export const RecyclingBinSearch = () => {
    return (
        <div className='flex justify-center content-center items-center'>
            <MainSearch
                placeholder={"Ingrese algun criterio de busqueda"}
                onSearch={() => { }}
                mainFilter={() => { }}
                setMainFilter={() => { }}
            />
            <div
                title="Limpiar filtros."
                className="flex h-[3.8vh] items-center cursor-pointer hover:scale-110"
                onClick={() => { }}
            >
                <FilterOffIcon />
            </div>
        </div>
    )
}

