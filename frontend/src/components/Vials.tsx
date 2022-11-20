import React from 'react'
import type { Vial } from "../types/types";
import Card from '@components/Card';
import { groupBy } from '@utils/helpers'
import { useVials } from "@hooks/useVials"
import Image from 'next/image';


function Vials() {

    const [selectedVial, setSelectedVial] = React.useState<Vial | undefined>(undefined)
    const { vials, isLoadingVials } = useVials()

    const vialInfoModal = (vial: Vial) => {
        return (
            <>
                <input type="checkbox" id="info-vial-modal" className="modal-toggle" />
                <div className="modal w-full h-full ">
                    <div className='flex flex-col w-1/3 h-auto'>
                        <label htmlFor="info-vial-modal" className="text-2xl text-white cursor-pointer">X</label>
                        <div className='bg-white bg-opacity-50 backdrop-blur-xl w-full h-full p-4'>
                            <div className='flex flex-col space-y-4 items-center'>
                                <div className="flex items-center space-x-8">
                                    <img src={vial?.image} alt="vial" className='h-16 lg:h-24 2xl:h-32' />
                                    <p className='text-black text-sm lg:text-lg 2xl:text-2xl'>{vial?.name}</p>
                                </div>
                                <div className='relative w-48 h-32 lg:w-64 lg:h-48 2xl:w-96 2xl:h-80'>
                                    <Image src={vial?.preview} alt="preview" layout="fill" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const groupedVials = vials ? groupBy(vials, 'style') : []

    return (
        <>
            {vialInfoModal(selectedVial as Vial)}
            {Object.keys(groupedVials).map((key, index) => {
                const vials: Vial[] = groupedVials[key]
                return (
                    vials.length > 0 &&
                    <label key={index} htmlFor="info-vial-modal" className='cursor-pointer' onClick={() => setSelectedVial(vials[0])}>
                        <Card nft={vials[0] as Vial} multiple={vials.length} isVial={true} />
                    </label>
                )
            })}
            {isLoadingVials &&
                <div className='flex justify-center items-center'>
                    <img src='/flask-animated.gif' className='w-12 ' />
                </div>}
        </>
    )
}

export default Vials