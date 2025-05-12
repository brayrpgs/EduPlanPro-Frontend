import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { RecyclingBinHead } from './RecyclingBinHead'
import { RecyclingBinSearch } from './RecyclingBinSearch'
import { RecyclingBinTable } from './RecyclingBinTable'

export const RecyclingBin = () => {
    return (
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen">
            <Header />
            <div className='pr-[15vw] pl-[15vw]'>
                <RecyclingBinHead />
                <RecyclingBinSearch />
                <div className=' h-[70vh] overflow-y-auto'>
                    <RecyclingBinTable />
                </div>
            </div>
            <Footer />
        </div>
    )
}
