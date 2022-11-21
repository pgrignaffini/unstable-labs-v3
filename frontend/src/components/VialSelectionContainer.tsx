type Props = {
    vial: {
        image: string
        name: string
        description: string
    }
    multiple: number
    selected?: boolean
}

function VialSelectionContainer({ vial, multiple, selected }: Props) {

    return (
        <div className={`${selected ? "border-4 border-acid" : "border-2"} cursor-pointer hover:bg-gray-400`}>
            <div className="p-2 flex items-center justify-between">
                <img className='w-12 h-16 object-contain' src={vial?.image} alt="image" />
                <p className='text-black text-[0.7rem] whitespace-normal'>{vial?.name}</p>
                {multiple && <p className=' text-black text-[0.7rem]'>{multiple}x</p>}
            </div>
        </div>
    )
}

export default VialSelectionContainer