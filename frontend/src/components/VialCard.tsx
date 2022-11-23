import { useState } from 'react'
import type { Vial } from '../types/types'
import Image from 'next/image'
import MintVialButton from '@components/MintVialButton'

type Props = {
    vial: Vial
    name: string
    multiple?: number
    buy?: boolean
    info?: boolean
}

function VialCard({ vial, name, multiple, buy, info }: Props) {

    const [numVials, setNumVials] = useState<number>(1)
    const price = (0.0001 * numVials)
    const style =
        vial.style.includes("concept") ? "concept" :
            vial.style.includes("collection") ? "collection" :
                vial.style.includes("remix") ? "remix" :
                    vial.style.includes("freestyle") ? "freestyle" : undefined
    const htmlFor = buy ? `buy-${name}` : info ? `info-${name}` : ""

    const infoVialModal = (
        <>
            <input type="checkbox" id={`info-${name}`} className="modal-toggle" />
            <div className="modal">
                <div className="w-1/2 m-auto">
                    <label htmlFor={`info-${name}`} className="text-2xl text-white cursor-pointer">X</label>
                    <div className="bg-white bg-opacity-50 backdrop-blur-xl p-8">
                        <div className="flex items-center space-x-10">
                            <img className='w-1/4' src={vial?.image} alt="banner" />
                            <div className='flex flex-col space-y-10 items-center'>
                                <p className='text-sm lg:text-lg 2xl:text-2xl text-black'>{vial?.name}</p>
                                <img className='w-full' src={vial?.preview} alt="preview" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    const buyVialModal = (
        <>
            <input type="checkbox" id={`buy-${name}`} className="modal-toggle" />
            <div className="modal w-full h-full ">
                <div className='flex flex-col w-1/2 h-auto'>
                    <label htmlFor={`buy-${name}`} className="text-2xl text-white cursor-pointer">X</label>
                    <div className='bg-white bg-opacity-50 backdrop-blur-xl w-full h-full p-4'>
                        <div className='w-3/4 mx-auto flex flex-col space-y-8'>
                            <div className="flex items-center">
                                <img src={vial.image} alt="banner" className='h-16 lg:h-24 2xl:h-32' />
                                <p className='text-black flex-1 text-center text-sm lg:text-lg 2xl:text-2xl'>{vial.name}</p>
                            </div>
                            <div className='flex justify-between'>
                                <div className='relative w-48 h-32 lg:w-64 lg:h-48 2xl:w-96 2xl:h-80'>
                                    <Image src={vial.preview} alt="preview" layout="fill" />
                                </div>
                                <div className='flex flex-col space-y-4 items-center justify-evenly'>
                                    <div className="flex items-center justify-evenly">
                                        <p className='text-sm lg:text-md 2xl:text-lg text-black'>Quantity:</p>
                                        <input type="number" placeholder="Price" step={1}
                                            value={numVials}
                                            className="bg-white w-1/3 bg-opacity-50 backdrop-blur-xl p-2
                                    outline-none text-black placeholder:font-pixel text-sm lg:text-md 2xl:text-lg"
                                            onChange={(e) => setNumVials(parseInt(e.target.value))} />
                                    </div>
                                    <div className="flex flex-col items-center space-x-8">
                                        <p className='text-sm lg:text-md 2xl:text-lg text-black'>Price: {price.toFixed(4)}</p>
                                        {price > 0 &&
                                            <MintVialButton index={vial.type as number} style={style} numberOfVials={numVials} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <>
            {info && infoVialModal}
            {buy && buyVialModal}
            <label htmlFor={htmlFor} className='cursor-pointer'>
                <div className='border-2 hover:border-4  hover:border-acid hover:-m-1 p-4'>
                    <div className='flex flex-col justify-between items-center'>
                        <div className='flex items-center justify-between'>
                            <p className='text-sm text-std'>{vial?.name} {multiple && `${multiple}x`}</p>
                            <img className='w-12 h-12 object-contain' src={vial.image} alt="image" />
                            {/* onSale && <p className='font-pixel text-sm'>{parseNftPrice(nft as Nft & MarketItem)}</p> */}
                        </div>
                        {vial.name === "Freestyle" ? <img src="/freestyle-collage.jpg" className='w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-48 xl:h-48 2xl:h-64 2xl:w-64 mt-4' /> :
                            <div className='w-64 h-64 relative mt-4'>
                                <Image src={vial?.preview as string} alt="preview" placeholder='blur'
                                    blurDataURL='/blur.jpeg'
                                    fill objectFit='contain' />
                            </div>}
                    </div>
                </div>
            </label>
        </>
    )
}

export default VialCard