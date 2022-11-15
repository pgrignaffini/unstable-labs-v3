import React from 'react'
// import Star from './icons/Star'
// import Rocket from './icons/Rocket'
// import Nfts from './icons/Nfts'

type Props = {
    title: string
    onClick?: () => void
    type?: "blob" | "vial" | "brewery"
}

function CollectionSideBarRow({ title, onClick, type }: Props) {
    return (
        <div onClick={() => onClick?.()} className="flex items-end justify-center space-x-2 px-4 py-3 cursor-pointer text-white hover:border-2 border-acid transition-all duration-200 group w-full">
            <p className="hidden font-light md:inline-flex lg:text-xl whitespace-nowrap">{title}</p>
            {type === "blob" && <img src="/blob-animated.gif" className="w-8 h-8" />}
            {type === "vial" && <img src="/flask-animated.gif" className="w-6 h-8" />}
            {type === "brewery" && <img src="/brewery-animated.gif" className="w-8 h-8" />}
        </div>
    )
}

export default CollectionSideBarRow