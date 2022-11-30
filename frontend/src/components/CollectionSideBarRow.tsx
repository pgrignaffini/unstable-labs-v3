type Props = {
    title: string
    onClick?: () => void
    type?: "blob" | "vial" | "brewery" | "microscope"
    selected?: boolean
}

function CollectionSideBarRow({ title, onClick, type, selected }: Props) {
    return (
        <div onClick={() => onClick?.()}
            className="p-2 flex flex-col-reverse space-y-reverse space-y-2 justify-center items-center md:flex-row md:space-x-2 md:px-4 md:py-3 cursor-pointer text-white md:hover:border-2 border-acid transition-all duration-200 group w-full">
            <p className={`text-[0.4rem] md:text-md 2xl:text-lg whitespace-nowrap ${selected && "border-b-2 border-acid"}`}>{title}</p>
            {type === "blob" && <img src="/blob-animated.gif" className="w-6 h-6 lg:w-8 lg:h-8 bg-blue-" />}
            {type === "vial" && <img src="/flask-animated.gif" className="w-4 h-6 lg:w-6 lg:h-8" />}
            {type === "brewery" && <img src="/brewery-animated.gif" className="w-6 h-6 lg:w-8 lg:h-8" />}
            {type === "microscope" && <img src="/microscope-animated.gif" className="w-6 h-8 lg:w-8 lg:h-10" />}
        </div>
    )
}

export default CollectionSideBarRow