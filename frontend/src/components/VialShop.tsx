import { useState } from "react";
import { ConceptVialImageURL, CollectionVialImageURL, CollectionPreviewImageURL, ConceptPreviewImageURL } from "@utils/images"
import { FreestyleVial, RemixVial, CollectionVial, ConceptVial, AlterationVial, PersonalizeVial, StylizeVial } from "@data/base"
import { concepts } from "@data/concepts";
import { collections } from "@data/collections";
import { useVials } from '@hooks/useVials'
import { groupBy } from '@utils/helpers'
import VialCard from '@components/VialCard'

function VialShop() {

    const { vials } = useVials()
    const groupedVials = vials ? groupBy(vials, 'style') : []
    const hasFreestyle = groupedVials["freestyle"]?.length > 0
    const [showConcepts, setShowConcepts] = useState<boolean>(false)
    const [showCollections, setShowCollections] = useState<boolean>(false)

    const backToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <>
            {!showConcepts && !showCollections &&
                <><VialCard vial={FreestyleVial} name={FreestyleVial.name} buy={!hasFreestyle} />
                    <div onClick={() => { setShowCollections(true); backToTop() }}>
                        <VialCard vial={CollectionVial} name={CollectionVial.name} />
                    </div>
                    <div onClick={() => { setShowConcepts(true); backToTop() }}>
                        <VialCard vial={ConceptVial} name={ConceptVial.name} />
                    </div>
                    <VialCard vial={RemixVial} name={RemixVial.name} buy />
                    <VialCard vial={AlterationVial} name={AlterationVial.name} />
                    <VialCard vial={PersonalizeVial} name={PersonalizeVial.name} />
                    <VialCard vial={StylizeVial} name={StylizeVial.name} /></>}
            {showConcepts &&
                <>
                    <div className='w-fit sticky z-10 top-20 md:top-5 bg-black text-acid border-acid border-2 cursor-pointer flex justify-center items-center p-1 h-14 lg:h-24'
                        onClick={() => { setShowConcepts(false); backToTop() }}>
                        <img src="/arrow.png" className='w-12 h-8 md:w-20 md:h-14 -scale-x-95' />
                    </div>
                    {concepts.map((concept, index) => {
                        const base = concept.name
                        const image = ConceptVialImageURL + `/${index}.png`
                        const preview = ConceptPreviewImageURL + `/${base}.png`
                        const name = base.replaceAll("-", " ")
                        const vial = { image, name, preview, type: index, style: concept.name }
                        return (<VialCard key={index} name={vial.name} vial={vial} buy />)
                    })}
                </>}
            {showCollections &&
                <>
                    <div className='w-fit sticky z-10 top-20 md:top-5 bg-black text-acid border-acid border-2 cursor-pointer flex justify-center items-center p-1 h-14 lg:h-24'
                        onClick={() => { setShowCollections(false); backToTop() }}>
                        <img src="/arrow.png" className='w-12 h-8 md:w-20 md:h-14 -scale-x-95' />
                    </div>
                    {collections.map((collection, index) => {
                        const base = collection.name
                        const image = CollectionVialImageURL + `/${index}.png`
                        const preview = CollectionPreviewImageURL + `/${base}.png`
                        const name = base.replaceAll("-", " ")
                        const vial = { image, name, preview, type: index, style: collection.name }
                        return (<VialCard key={index} name={vial.name} vial={vial} buy />)
                    })}
                </>}
        </>
    )
}

export default VialShop