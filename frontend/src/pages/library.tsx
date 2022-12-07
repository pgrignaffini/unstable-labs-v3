import React, { useEffect, useState } from 'react'
import { usePapers } from "@hooks/usePapers";
import Paper from '@components/Paper';
import { useSound } from 'use-sound';
import { trpc } from "@utils/trpc";
import PaperSkeleton from '@components/skeletons/PaperSkeleton';

function Library() {

    // const [playSound] = useSound('/sounds/book-flipping.wav', { sprite: { flip: [0, 1100] } });
    const { numberOfPapers } = usePapers()
    const [scroll, setScroll] = useState(false)
    const [scrollBack, setScrollBack] = useState(false)
    const scrolling = scroll || scrollBack

    useEffect(() => {
        if (scroll || scrollBack) {
            setTimeout(() => {
                setScroll(false)
                setScrollBack(false)
            }, 600)
        }
    }, [scroll, scrollBack])

    const [currentPage, setCurrentPage] = useState(1)
    const [visitedPages, setVisitedPages] = useState<number[]>([1])
    const limit = 10
    const { data: paginatedPapers, fetchNextPage, fetchPreviousPage, isLoading, isFetchingNextPage } = trpc.paper.getPaginatedPapers.useInfiniteQuery({
        limit,
    }, {
        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor
        },
        getPreviousPageParam: (firstPage) => {
            return firstPage.prevCursor
        }
    })

    return (
        <div className='flex flex-col'>
            <div className='flex items-center px-14'>
                <button disabled={scrolling} className='bg-acid p-2 hover:bg-dark-acid' onClick={() => {
                    setScrollBack(true)
                    // playSound({ id: 'flip' })
                    if (currentPage > 1) {
                        if (!visitedPages.includes(currentPage - 1)) {
                            setVisitedPages([...visitedPages, currentPage - 1])
                            fetchPreviousPage()
                        }
                        setCurrentPage(currentPage - 1)
                    }
                }}>
                    <img src="/arrow.png" className='w-12 h-8 md:w-20 md:h-14 -scale-x-95' />
                </button>
                <div className='overflow-hidden w-2/3 h-auto mx-auto -mt-6'>
                    <div className={`w-full h-screen m-auto bg-contain bg-center bg-no-repeat flex flex-col items-center justify-center px-14
                ${scroll ? "bg-[url('/book-animated.gif')]" : scrollBack ? "bg-[url('/book-animated-back.gif')]" : "bg-[url('/book.png')]"} `}>
                        <div className='w-full h-fit px-2 mt-14 grid grid-cols-2 grid-rows-5 gap-2 lg:gap-6 xl:gap-8 2xl:gap-10 3xl:gap-12 grid-flow-col '>
                            {scrolling ? null :
                                isLoading || isFetchingNextPage ? (<PaperSkeleton cards={limit} />) :
                                    paginatedPapers?.pages[currentPage - 1]?.papers.map((paper, index) => (
                                        <Paper key={index} paper={paper} />
                                    ))}
                        </div>
                    </div>
                </div>
                <button disabled={scrolling} className='bg-acid p-2 hover:bg-dark-acid' onClick={() => {
                    setScroll(true)
                    // playSound({ id: 'flip' })
                    if (currentPage < Math.ceil(numberOfPapers as number / limit)) {
                        if (!visitedPages.includes(currentPage + 1)) {
                            setVisitedPages([...visitedPages, currentPage + 1])
                            fetchNextPage()
                        }
                        setCurrentPage(currentPage + 1)
                    }
                }}>
                    <img src="/arrow.png" className='w-12 h-8 md:w-20 md:h-14' />
                </button>
            </div>
            <p className='text-3xl font-tinos text-center text-[#EBCB00]'>{currentPage}</p>
        </div>

    )
}

export default Library