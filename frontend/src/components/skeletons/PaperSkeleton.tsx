type Props = {
    cards: number
}

function PaperSkeleton({ cards }: Props) {
    return (
        <>
            {Array(cards).fill(0).map((_, i) =>
            (
                <div className='bg-paper p-4 ' key={i}>
                    <div className='flex flex-col animate-pulse'>
                        <div className='flex items-center space-x-10 pb-4 border-b-2 border-black'>
                            <div className="h-16 w-16 bg-dark-paper" />
                            <div className='h-16 flex-1 flex justify-center items-center bg-[#665053] ' />
                        </div>
                        <div className="flex flex-1 flex-col space-y-4" >
                            <div className='border-b-2 pb-2 mt-2 border-black flex items-center justify-between'>
                                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-dark-paper " />
                                <div className="w-12 h-6 lg:w-16 lg:h-8 bg-dark-paper " />
                                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-dark-paper " />
                            </div>
                            <div className="flex flex-1 justify-center animate-pulse">
                                <div className='w-full h-96 bg-dark-paper' />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 justify-center animate-pulse">
                        <div className="p-2 mt-6 w-32 h-6 bg-dark-paper" />
                    </div>
                </div>
            ))}
        </>
    )
}

export default PaperSkeleton