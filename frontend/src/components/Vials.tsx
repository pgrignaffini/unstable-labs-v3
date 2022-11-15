import React from 'react'
import type { Vial } from "../types/types";
import Card from '@components/Card';
import { groupBy } from '@utils/helpers'
import { useVials } from "@hooks/useVials"


function Vials() {

    const [selectedVial, setSelectedVial] = React.useState<Vial | undefined>(undefined)
    const { vials } = useVials()

    const vialInfoModal = (vial: Vial) => {
        return (
            <>
                <input type="checkbox" id="info-vial-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="w-1/3">
                        <label htmlFor="info-vial-modal" className="font-pixel text-2xl text-white cursor-pointer">X</label>
                        <div className="bg-white bg-opacity-50 backdrop-blur-xl p-8">
                            <div className="flex items-center space-x-10">
                                <img className='w-1/3' src={vial?.image} alt="banner" />
                                <div className='flex flex-col space-y-10 items-start'>
                                    <p className='font-pixel text-sm text-black'>{vial?.name} vial</p>
                                    <img className='w-full' src={vial?.preview} alt="preview" />
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
                    <label key={index} htmlFor="info-vial-modal" onClick={() => setSelectedVial(vials[0])}>
                        <Card nft={vials[0] as Vial} multiple={vials.length} isVial={true} />
                    </label>
                )
            })}
        </>
    )
}

export default Vials