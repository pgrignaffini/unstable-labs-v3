type Props = {
    title: string
    onClick?: () => void
    type?: "blob" | "vial" | "brewery" | "microscope"
    selected?: boolean
}

function CollectionSideBarRow({ title, onClick, type, selected }: Props) {
    return (
        <div onClick={() => onClick?.()}
            className="flex items-end justify-center space-x-2 px-4 py-3 cursor-pointer text-white hover:border-2 border-acid transition-all duration-200 group w-full ">
            <p className={`hidden font-light md:inline-flex lg:text-xl whitespace-nowrap ${selected && "border-b-2 border-acid"}`}>{title}</p>
            {type === "blob" && <img src="/blob-animated.gif" className="w-8 h-8" />}
            {type === "vial" && <img src="/flask-animated.gif" className="w-6 h-8" />}
            {type === "brewery" && <img src="/brewery-animated.gif" className="w-8 h-8" />}
            {type === "microscope" && <img src="/microscope-animated.gif" className="w-8 h-10" />}
        </div>
    )
}

export default CollectionSideBarRow