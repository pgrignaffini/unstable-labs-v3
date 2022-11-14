import React from 'react'
import Card from '@components/Card'
import type { Vial, Style } from "../types/types"
import { VialImageURL, PreviewImageURL } from "@utils/images"
import MintVialButton from '@components/MintVialButton'

type Props = {
    styles: Style[]
}

function VialBrewery({ styles }: Props) {

    const [numVials, setNumVials] = React.useState<number>(1)
    const [vial, setVial] = React.useState<Vial>()
    const price = (0.0001 * numVials)

    console.log("Styles", styles)

    const buyVialModal = vial && (
        <>
            <input type="checkbox" id="buy-vial-modal" className="modal-toggle" />
            <div className="modal">
                <div className="w-1/2 m-auto">
                    <label htmlFor="buy-vial-modal" className="text-2xl text-white cursor-pointer">X</label>
                    <div className="bg-white bg-opacity-50 backdrop-blur-xl p-8">
                        <div className="flex items-center space-x-10">
                            <img className='w-1/3' src={vial.image} alt="banner" />
                            <div className='flex flex-col space-y-10 items-start'>
                                <p className=' text-lg text-black'>{vial.name} vial</p>
                                <img className='w-full' src={vial?.preview} alt="preview" />
                                <div className="flex items-center space-x-4">
                                    <p className='text-md text-black'>Quantity:</p>
                                    <input type="number" placeholder="Price" step={1}
                                        value={numVials}
                                        className="bg-white w-1/3 bg-opacity-50 backdrop-blur-xl p-2
                                    outline-none text-black placeholder:font-pixel text-sm placeholder:text-sm"
                                        onChange={(e) => setNumVials(parseInt(e.target.value))} />
                                </div>
                                <p className='text-md text-black'>Price: {price.toFixed(4)}</p>
                                {price > 0 &&
                                    <MintVialButton
                                        index={vial.type}
                                        numberOfVials={numVials}
                                    />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )


    return (
        <>
            {buyVialModal}
            <div className="col-span-2 grid grid-rows-4 gap-8 grid-cols-3 2xl:grid-cols-4">
                {styles.map((style, index) => {
                    let base = style.name.replace("-collection", "").toLowerCase()
                    base = base.replace("-concept", "")
                    const image = VialImageURL + `/${index}.png`
                    const preview = PreviewImageURL + `/${base}.png`
                    const name = base.replaceAll("-", " ")
                    const vial = { image, name, preview, type: index, style: style.name }
                    return (
                        <label htmlFor="buy-vial-modal" onClick={() => setVial(vial)} className='cursor-pointer mt-4'>
                            <Card key={index} nft={vial} isVial />
                        </label>
                    )
                })}
            </div>
        </>
    )
}

export default VialBrewery