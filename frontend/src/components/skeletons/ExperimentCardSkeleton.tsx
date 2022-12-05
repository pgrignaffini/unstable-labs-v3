type Props = {
    cards: number
}

function ExperimentCardSkeleton({ cards }: Props) {
    return (
        <>
            {Array(cards).fill(0).map((_, i) =>
            (
                <div key={i} className='h-72 lg:h-64 xl:h-72 2xl:h-96 w-auto flex flex-col space-y-2 justify-between items-center border-2 p-4 animate-pulse'>
                    <div className='w-full h-full bg-slate-800' />
                    <div className='flex w-full items-center justify-center space-x-2 md:justify-between'>
                        <div className="w-40 h-8 bg-slate-800" />
                        <div className="w-8 h-8 bg-slate-800" />
                    </div>
                </div>
            ))}
        </>
    )
}

export default ExperimentCardSkeleton