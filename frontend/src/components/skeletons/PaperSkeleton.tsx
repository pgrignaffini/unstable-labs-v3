type Props = {
    cards: number
}

function PaperSkeleton({ cards }: Props) {
    return (
        <>
            {Array(cards).fill(0).map((_, i) =>
            (
                <div key={i} className='bg-transparent w-full border-b -mb-1 border-[#592323] animate-pulse'>
                    <div className="flex flex-1 items-center justify-between font-semibold">
                        <div className='h-14 w-14 object-cover bg-[#BBA46A]' />
                        <div className='flex flex-1 flex-col space-y-2 items-center justify-between h-full'>
                            <div className='flex w-full items-center justify-center space-x-6'>
                                <div className='flex items-center space-x-2'>
                                    <div className='w-24 h-8 text-xl bg-[#BBA46A]' />
                                    <div className='w-24 h-8 text-xl bg-[#BBA46A]' />
                                </div>
                            </div>
                            <div className='w-24 h-12 text-xl bg-[#BBA46A]' />
                        </div>
                        <div className='w-28 h-28 bg-[#BBA46A] border-[#EBCB00] border-4' />
                    </div>
                </div>
            ))}
        </>
    )
}

export default PaperSkeleton