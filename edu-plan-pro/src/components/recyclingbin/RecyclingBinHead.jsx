import React from 'react'
import data from './fields.json'

export const RecyclingBinHead = () => {

    const fields = data

    return (
        <div className='bg-UNA-Blue-Dark w-[100%] flex rounded-[0.5vh] items-center text-white mt-[3vh] p-[1vh] justify-around'>
            <h1 className='ml-[1vw] my-[0.5vh] text-xl text-white text-center'>Papelera de reciclaje</h1>
            {
                fields.map((value) => (
                    <div className='flex flex-col justify-center content-center items-center'>
                        <label htmlFor={value.id} className='cursor-pointer hover:scale-110'>{value.name}</label>
                        <input id={value.id} type="checkbox" hidden />
                    </div>
                ))
            }
        </div>
    )
}
