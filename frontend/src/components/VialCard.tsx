import { useState } from 'react'
import type { Vial } from '../types/types'
import Image from 'next/image'
import MintVialButton from '@components/MintVialButton'

type Props = {
    vial: Vial
    name: string
    multiple?: number
    buy?: boolean
}

function VialCard({ vial, name, multiple, buy }: Props) {

    const [numVials, setNumVials] = useState<number>(1)
    const price = (0.0001 * numVials)
    const style =
        vial.style.includes("concept") ? "concept" :
            vial.style.includes("collection") ? "collection" :
                vial.style.includes("remix") ? "remix" :
                    vial.style.includes("freestyle") ? "freestyle" : undefined
    const htmlFor = buy ? `buy-${name}` : `info-${name}`

    const infoVialModal = (
        <>
            <input type="checkbox" id={`info-${name}`} className="modal-toggle" />
            <label htmlFor={`info-${name}`} className="modal cursor-pointer">
                <div className='w-full lg:w-1/3 h-2/3 px-10'>
                    <div className='flex flex-col bg-white bg-opacity-50 backdrop-blur-xl w-full h-full p-4 space-y-4'>
                        <div className="flex items-center justify-center space-x-4">
                            <img src={vial.image} alt="vial" className='h-16 lg:h-24 2xl:h-32' />
                            <p className='text-black text-sm lg:text-lg 2xl:text-2xl'>{vial.name} {multiple && `${multiple}x`}</p>
                        </div>
                        <div className='w-full h-3/4'>
                            <div className='relative w-full h-full'>
                                <Image src={vial.preview} alt="preview" fill sizes='100vw' style={{ objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </label>
        </>
    )

    const buyVialModal = (
        <>
            <input type="checkbox" id={`buy-${name}`} className="modal-toggle" />
            <label htmlFor={`buy-${name}`} className="modal cursor-pointer ">
                <div className='w-full h-full my-auto lg:w-2/3 lg:h-2/3'>
                    <div className='flex flex-col space-y-4 bg-white bg-opacity-50 backdrop-blur-xl px-10 p-4'>
                        <div className="flex items-center justify-center space-x-4">
                            <img src={vial.image} alt="vial" className='h-16 lg:h-24 2xl:h-32' />
                            <p className='text-black text-sm lg:text-lg 2xl:text-2xl'>{vial.name} {multiple && `${multiple}x`}</p>
                        </div>
                        <div className='flex flex-col space-y-4 xl:flex-row items-center w-full h-full lg:h-3/4'>
                            <div className='relative h-72 w-72 xl:flex-1 xl:h-96'>
                                <Image src={vial.preview} alt="preview" fill sizes='100vw' style={{ objectFit: 'contain' }} />
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <div className="flex items-center justify-evenly">
                                    <p className='text-sm lg:text-md 2xl:text-lg text-black'>Quantity:</p>
                                    <input type="number" placeholder="Price" step={1}
                                        min={1}
                                        value={numVials}
                                        className="bg-white w-1/3 bg-opacity-50 backdrop-blur-xl p-2
                                        outline-none text-black placeholder:font-pixel text-sm lg:text-md 2xl:text-lg"
                                        onChange={(e) => {
                                            const num = parseInt(e.target.value)
                                            num > 999 ? setNumVials(999) : setNumVials(num)
                                        }} />
                                </div>
                                <div className="flex flex-col items-center space-x-8">
                                    <p className='text-sm lg:text-md 2xl:text-lg text-black'>Price: {price.toFixed(4)}</p>
                                    {price > 0 && <MintVialButton index={vial.type as number} style={style} numberOfVials={numVials} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </label>
        </>
    )

    return (
        <>
            {buy ? buyVialModal : infoVialModal}
            <label htmlFor={htmlFor} className='cursor-pointer'>
                <div className='h-72 lg:h-64 xl:h-72 2xl:h-96 w-auto flex flex-col justify-between items-center border-2 hover:border-4 hover:border-acid hover:-m-1 p-4'>
                    <div className='flex w-full items-center justify-between'>
                        <p className='text-sm text-std'>{vial?.name} {multiple && `${multiple}x`}</p>
                        <img className='w-12 h-12 object-contain' src={vial.image} alt="image" />
                        {/* onSale && <p className='font-pixel text-sm'>{parseNftPrice(nft as Nft & MarketItem)}</p> */}
                    </div>
                    <div className="relative w-full h-full">
                        <Image src={vial?.preview} alt="preview" placeholder='blur' blurDataURL='/blur.jpeg'
                            fill sizes='100vw' style={{ objectFit: 'contain' }} />
                    </div>
                </div>
            </label>
        </>
    )
}

export default VialCard