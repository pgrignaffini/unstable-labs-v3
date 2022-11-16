import React from 'react'
import Card from '@components/Card'
import type { Vial, Style, Base } from "../types/types"
import { ConceptVialImageURL, CollectionVialImageURL, CollectionPreviewImageURL, ConceptPreviewImageURL, RemixPreviewImageURL, RemixVialImageURL } from "@utils/images"
import MintVialButton from '@components/MintVialButton'
import { base } from "@data/base"

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

function VialBrewery({ concepts, collections }: Props) {

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
                            <img className='w-1/3' src={baseToShow?.image} alt="banner" />
                            <div className='flex flex-col space-y-10 items-start'>
                                <p className=' text-lg text-black'>{baseToShow?.name} vial</p>
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
                                        type={type}
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
                        <label htmlFor='buy-vial-modal' onClick={() => {
                            setVial(RemixVial)
                            setType('remix')
                        }}>
                            <Card nft={base[3] as BaseVial} isVial />
                        </label>
                        <label htmlFor="info-vial-modal" onClick={() => setBaseToShow(base[4])} >
                            <Card nft={base[4] as BaseVial} isVial />
                        </label>
                        <label htmlFor="info-vial-modal" onClick={() => setBaseToShow(base[5])} >
                            <Card nft={base[5] as BaseVial} isVial />
                        </label>
                        <label htmlFor="info-vial-modal" onClick={() => setBaseToShow(base[6])} >
                            <Card nft={base[6] as BaseVial} isVial />
                        </label>
                    </>

                )

            }
            {showConcepts &&
                <div className='border-2 cursor-pointer hover:border-4 my-auto h-1/2 flex justify-center items-center hover:border-acid'
                    onClick={() => setShowConcepts(false)}>
                    <p className='text-2xl'>Back</p>
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
                    }} className='cursor-pointer mt-4'>
                        <Card nft={vial} isVial />
                    </label>
                )
            })}
            {showCollections &&
                <div className='border-2 cursor-pointer hover:border-4 my-auto h-1/2 flex justify-center items-center hover:border-acid'
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
                        }} className='cursor-pointer mt-4'>
                            <Card nft={vial} isVial />
                        </label>
                    )
                })}
        </>
    )
}

export default VialBrewery