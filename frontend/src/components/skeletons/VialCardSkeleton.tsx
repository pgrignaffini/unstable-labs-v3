type Props = {
    cards: number
}

function VialCardSkeleton({ cards }: Props) {
    return (
        <>
            {Array(cards).fill(0).map((_, i) =>
            (
                <div key={i} className='h-72 lg:h-64 xl:h-72 2xl:h-96 w-auto flex flex-col space-y-2 justify-between items-center border-2 p-4 animate-pulse'>
                    <div className='flex w-full items-center justify-between'>
                        <div className='w-40 h-8 bg-slate-800' />
                        <div className='w-12 h-12 bg-slate-800' />
                        {/* onSale && <p className='font-pixel text-sm'>{parseNftPrice(nft as Nft & MarketItem)}</p> */}
                    </div>
                    <div className="w-full h-full bg-slate-800" />
                </div>
            ))}
        </>
    )
}

export default VialCardSkeleton