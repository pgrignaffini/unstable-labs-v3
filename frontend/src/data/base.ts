import { ConceptVialImageURL, CollectionVialImageURL, RemixPreviewImageURL, RemixVialImageURL, FreestylePreviewImageURL, FreestyleVialImageURL } from "@utils/images"
import type { Vial } from "../types/types"

const RemixVial: Vial = {
    name: "Remix",
    image: RemixVialImageURL,
    preview: RemixPreviewImageURL,
    type: 0,
    style: "remix"
}

const FreestyleVial: Vial = {
    name: "Freestyle",
    image: FreestyleVialImageURL,
    preview: FreestylePreviewImageURL,
    type: 6,
    style: "freestyle"
}

const ConceptVial: Vial = {
    name: "Concept",
    image: `${ConceptVialImageURL}/1.png`,
    preview: "/concept-collage.jpg",
    type: 1,
    style: "concept"
}

const CollectionVial: Vial = {
    name: "Collection",
    image: `${CollectionVialImageURL}/1.png`,
    preview: "/collections-collage.jpg",
    type: 2,
    style: "collection"
}

const AlterationVial: Vial = {
    name: "Alteration",
    image: "/alteration.png",
    preview: "/alteration-collage.png",
    style: "alteration"
}

const PersonalizeVial: Vial = {
    name: "Personalize",
    image: "/personalize.png",
    preview: "/personalize-collage.png",
    style: "personalize"
}

const StylizeVial: Vial = {
    name: "Stylize",
    image: "/stylize.png",
    preview: "/stylize-collage.png",
    style: "stylize"
}

export { RemixVial, FreestyleVial, ConceptVial, CollectionVial, AlterationVial, PersonalizeVial, StylizeVial }