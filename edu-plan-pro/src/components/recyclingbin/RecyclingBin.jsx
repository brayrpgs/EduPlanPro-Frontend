import React, { useState } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { RecyclingBinHead } from './RecyclingBinHead'
import { RecyclingBinSearch } from './RecyclingBinSearch'
import { RecyclingBinTable } from './RecyclingBinTable'

export const RecyclingBin = () => {
    const [data, setData] = useState([])

    return (
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen">
            <Header />
            <div className='pr-[15vw] pl-[15vw]'>
                <RecyclingBinHead setData={setData} datas={data}/>
                <RecyclingBinSearch data={data} setFilteredData={setData} />
                <RecyclingBinTable data={data} setData={setData} />
            </div>
            <Footer />
        </div>
    )
}
