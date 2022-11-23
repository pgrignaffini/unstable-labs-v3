import { useState } from "react";
import { ConceptVialImageURL, CollectionVialImageURL, CollectionPreviewImageURL, ConceptPreviewImageURL } from "@utils/images"
import { FreestyleVial, RemixVial, CollectionVial, ConceptVial, AlterationVial, PersonalizeVial, StylizeVial } from "@data/base"
import { concepts } from "@data/concepts";
import { collections } from "@data/collections";
import { useVials } from '@hooks/useVials'
import { groupBy } from '@utils/helpers'
import VialCard from '@components/VialCard'

function VialBrewery() {

    const { vials } = useVials()
    const groupedVials = vials ? groupBy(vials, 'style') : []
    const hasFreestyle = groupedVials["freestyle"]?.length > 0
    const [showConcepts, setShowConcepts] = useState<boolean>(false)
    const [showCollections, setShowCollections] = useState<boolean>(false)

    return (
        <>
            {!showConcepts && !showCollections &&
                <><VialCard vial={FreestyleVial} name={FreestyleVial.name} info={hasFreestyle} buy={!hasFreestyle} />
                    <div onClick={() => setShowCollections(true)}>
                        <VialCard vial={CollectionVial} name={CollectionVial.name} />
                    </div>
                    <div onClick={() => setShowConcepts(true)}>
                        <VialCard vial={ConceptVial} name={ConceptVial.name} />
                    </div>
                    <VialCard vial={RemixVial} name={RemixVial.name} buy />
                    <VialCard vial={AlterationVial} name={AlterationVial.name} info />
                    <VialCard vial={PersonalizeVial} name={PersonalizeVial.name} info />
                    <VialCard vial={StylizeVial} name={StylizeVial.name} info /></>}
            {showConcepts &&
                <div className='border-2 hover:text-acid cursor-pointer hover:border-4 my-auto h-1/2 flex justify-center items-center hover:border-acid'
                    onClick={() => setShowConcepts(false)}>
                    <p className='text-2xl '>Back</p>
                </div>}
            {showConcepts &&
                concepts.map((concept, index) => {
                    const base = concept.name
                    const image = ConceptVialImageURL + `/${index}.png`
                    const preview = ConceptPreviewImageURL + `/${base}.png`
                    const name = base.replaceAll("-", " ")
                    const vial = { image, name, preview, type: index, style: concept.name }
                    return (<VialCard key={index} name={vial.name} vial={vial} buy />)
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
                    return (<VialCard key={index} name={vial.name} vial={vial} buy />)
                })}
        </>
    )
}

export default VialBrewery