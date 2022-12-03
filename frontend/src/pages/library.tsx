import React, { useEffect } from 'react'
import { usePapers } from "@hooks/usePapers";
import Paper from '@components/Paper';
import { useSound } from 'use-sound';

function Library() {

    const [playSound] = useSound('/sounds/book-flipping.wav', { sprite: { flip: [0, 1100] } });
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

    return (
        <div className='flex items-center px-14'>
            <button disabled={scrolling} className='bg-acid p-2 hover:bg-dark-acid' onClick={() => { setScrollBack(true); playSound({ id: 'flip' }) }}>
                <img src="/arrow.png" className='w-12 h-8 md:w-20 md:h-14 -scale-x-95' />
            </button>
            <div className='overflow-hidden w-2/3 h-auto mx-auto -mt-6'>
                <div className={`w-full h-screen m-auto bg-contain bg-center bg-no-repeat flex flex-col items-center justify-center px-14
                ${scroll ? "bg-[url('/book-animated.gif')]" : scrollBack ? "bg-[url('/book-animated-back.gif')]" : "bg-[url('/book.png')]"} `}>
                    <div className='w-full px-2 h-3/4 mt-14 grid grid-cols-2 grid-rows-3 xl:grid-rows-4 2xl:grid-rows-5 gap-12'>
                        {!scrolling && allPapers?.map(paper => (
                            <div key={paper.id}>
                                <Paper paper={paper} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button disabled={scrolling} className='bg-acid p-2 hover:bg-dark-acid' onClick={() => { setScroll(true); playSound({ id: 'flip' }) }}>
                <img src="/arrow.png" className='w-12 h-8 md:w-20 md:h-14' />
            </button>
        </div>

    )
}

export default Library