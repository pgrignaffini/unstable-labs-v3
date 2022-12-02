import React, { useEffect } from 'react'
import { usePapers } from "@hooks/usePapers";
import Paper from '@components/Paper';


function Library() {

    const { allPapers } = usePapers()
    const [scroll, setScroll] = React.useState(false)
    const [scrollBack, setScrollBack] = React.useState(false)
    const scrolling = scroll || scrollBack


    useEffect(() => {
        if (scroll || scrollBack) {
            setTimeout(() => {
                setScroll(false)
                setScrollBack(false)
            }, 600)
        }
    }, [scroll, scrollBack])

    //             <div className={`grid grid-cols-2 w-4/5 min-h-screen mx-auto ${scroll ? "bg-[url('/book-animated.gif')]" : "bg-[url('/book.png')]"} bg-cover bg-no-repeat`}>


    return (
        <div className='flex items-center px-14'>
            <button disabled={scrolling} className='bg-acid p-2 hover:bg-dark-acid' onClick={() => setScrollBack(true)}>
                <img src="/arrow.png" className='w-12 h-8 md:w-20 md:h-14 -scale-x-95' />
            </button>
            <div className='overflow-hidden w-2/3 h-auto mx-auto -mt-6'>
                <div className={`w-full h-screen m-auto bg-contain bg-center bg-no-repeat flex flex-col items-center justify-center px-14
                ${scroll ? "bg-[url('/book-animated.gif')]" : scrollBack ? "bg-[url('/book-animated-back.gif')]" : "bg-[url('/book.png')]"} `}>
                    <div className='w-full px-2 h-3/4 mt-14 grid grid-cols-2 gap-12'>
                        {!scrolling && allPapers?.map(paper => (
                            <div key={paper.id}>
                                <Paper paper={paper} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button disabled={scrolling} className='bg-acid p-2 hover:bg-dark-acid' onClick={() => setScroll(true)}>
                <img src="/arrow.png" className='w-12 h-8 md:w-20 md:h-14' />
            </button>
        </div>

    )
}

export default Library