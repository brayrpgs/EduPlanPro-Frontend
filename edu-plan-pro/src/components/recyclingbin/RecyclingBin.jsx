import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { RecyclingBinHead } from './RecyclingBinTable'

export const RecyclingBin = () => {
    return (
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen h-screen">
            <Header />
            <RecyclingBinHead />
            <Footer />
        </div>
    )
}
