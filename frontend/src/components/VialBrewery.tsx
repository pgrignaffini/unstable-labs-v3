import React from 'react'
import Card from '@components/Card'
import type { Vial, Style, Base } from "../types/types"
import { ConceptVialImageURL, CollectionVialImageURL, CollectionPreviewImageURL, ConceptPreviewImageURL, RemixPreviewImageURL, RemixVialImageURL } from "@utils/images"
import MintVialButton from '@components/MintVialButton'
import { base } from "@data/base"
import { concepts } from "@data/concepts";
import { collections } from "@data/collections";
import Image from 'next/image'

type Props = {
    concepts: Style[],
    collections: Style[],
}

type BaseVial = {
    image: string
    name: string
    description?: string
    preview?: string
}

function VialBrewery() {

    const [numVials, setNumVials] = React.useState<number>(1)
    const [vial, setVial] = React.useState<Vial>()
    const price = (0.0001 * numVials)
    const [showConcepts, setShowConcepts] = React.useState<boolean>(false)
    const [showCollections, setShowCollections] = React.useState<boolean>(false)
    const [baseToShow, setBaseToShow] = React.useState<Base>()
    const [type, setType] = React.useState<"collection" | "concept" | "remix" | undefined>(undefined)

    const RemixVial: Vial = {
        name: "Remix",
        image: RemixVialImageURL,
        preview: RemixPreviewImageURL,
        type: 0,
        style: ""
    }


    const infoVialModal = (
        <>
            <input type="checkbox" id="info-vial-modal" className="modal-toggle" />
            <div className="modal">
                <div className="w-1/2 m-auto">
                    <label htmlFor="info-vial-modal" className="text-2xl text-white cursor-pointer">X</label>
                    <div className="bg-white bg-opacity-50 backdrop-blur-xl p-8">
                        <div className="flex items-center space-x-10">
                            <img className='w-1/4' src={baseToShow?.image} alt="banner" />
                            <div className='flex flex-col space-y-10 items-center'>
                                <p className='text-sm lg:text-lg 2xl:text-2xl text-black'>{baseToShow?.name}</p>
                                <img className='w-full' src={baseToShow?.preview} alt="preview" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    const buyVialModal = vial && (
        <>
            <input type="checkbox" id="buy-vial-modal" className="modal-toggle" />
            <div className="modal w-full h-full ">
                <div className='flex flex-col w-1/2 h-auto'>
                    <label htmlFor="buy-vial-modal" className="text-2xl text-white cursor-pointer">X</label>
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
                                <div className='flex flex-col items-center justify-evenly'>
                                    <div className="flex items-center justify-evenly">
                                        <p className='text-sm lg:text-md 2xl:text-lg text-black'>Quantity:</p>
                                        <input type="number" placeholder="Price" step={1}
                                            value={numVials}
                                            className="bg-white w-1/3 bg-opacity-50 backdrop-blur-xl p-2
                                    outline-none text-black placeholder:font-pixel text-sm lg:text-md 2xl:text-lg"
                                            onChange={(e) => setNumVials(parseInt(e.target.value))} />
                                    </div>
                                    <p className='text-sm lg:text-md 2xl:text-lg text-black'>Price: {price.toFixed(4)}</p>
                                    {price > 0 &&
                                        <MintVialButton
                                            index={vial.type}
                                            type={type}
                                            numberOfVials={numVials} />}
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
            {infoVialModal}
            {buyVialModal}
            {
                !showConcepts && !showCollections &&
                (
                    <>
                        <Card nft={base[0] as BaseVial} isVial />
                        <div onClick={() => setShowCollections(true)}>
                            <Card nft={base[1] as BaseVial} isVial />
                        </div>
                        <div onClick={() => setShowConcepts(true)}>
                            <Card nft={base[2] as BaseVial} isVial />
                        </div>
                        <label htmlFor='buy-vial-modal' className='cursor-pointer'
                            onClick={() => {
                                setVial(RemixVial)
                                setType('remix')
                            }}>
                            <Card nft={base[3] as BaseVial} isVial />
                        </label>
                        <label htmlFor="info-vial-modal" className='cursor-pointer' onClick={() => setBaseToShow(base[4])} >
                            <Card nft={base[4] as BaseVial} isVial />
                        </label>
                        <label htmlFor="info-vial-modal" className='cursor-pointer' onClick={() => setBaseToShow(base[5])} >
                            <Card nft={base[5] as BaseVial} isVial />
                        </label>
                        <label htmlFor="info-vial-modal" className='cursor-pointer' onClick={() => setBaseToShow(base[6])} >
                            <Card nft={base[6] as BaseVial} isVial />
                        </label>
                    </>

                )

            }
            {showConcepts &&
                <div className='border-2 hover:text-acid cursor-pointer hover:border-4 my-auto h-1/2 flex justify-center items-center hover:border-acid'
                    onClick={() => setShowConcepts(false)}>
                    <p className='text-2xl '>Back</p>
                </div>}
            {showConcepts && concepts.map((concept, index) => {
                const base = concept.name
                const image = ConceptVialImageURL + `/${index}.png`
                const preview = ConceptPreviewImageURL + `/${base}.png`
                const name = base.replaceAll("-", " ")
                const vial = { image, name, preview, type: index, style: concept.name }
                return (
                    <label key={index} htmlFor="buy-vial-modal" onClick={() => {
                        setVial(vial)
                        setType('concept')
                    }} className='cursor-pointer'>
                        <Card nft={vial} isVial />
                    </label>
                )
            })}
            {showCollections &&
                <div className='border-2  hover:text-acid cursor-pointer hover:border-4 my-auto h-1/2 flex justify-center items-center hover:border-acid'
                    onClick={() => setShowCollections(false)}>
                    <p className='text-2xl'>Back</p>
                </div>}
            {showCollections &&
                collections.map((collection, index) => {
                    const base = collection.name
                    const image = CollectionVialImageURL + `/${index}.png`
                    const preview = CollectionPreviewImageURL + `/${base}.png`
                    const name = base.replaceAll("-", " ")
                    const vial = { image, name, preview, type: index, style: collection.name }
                    return (
                        <label key={index} htmlFor="buy-vial-modal" onClick={() => {
                            setVial(vial)
                            setType('collection')
                        }} className='cursor-pointer'>
                            <Card nft={vial} isVial />
                        </label>
                    )
                })}
        </>
    )
}

export default VialBrewery