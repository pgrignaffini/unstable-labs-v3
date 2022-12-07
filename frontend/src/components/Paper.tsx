import { useState } from 'react'
import { Prisma } from '@prisma/client'
import TimeAgo from 'react-timeago'
import { useSingleExperiment } from '@hooks/useSingleExperiment'
import Modal from './Modal'
import PaperModal from './PaperModal'
import Reviews from './Reviews'
import PaperLikeButton from './buttons/PaperLikeButton'
import { usePaperLikes } from '@hooks/usePaperLikes'
import { useReviews } from '@hooks/useReviews'

export type PaperWithInfo = Prisma.PaperGetPayload<{
    include: { user: true, experiment: true }
}>

type Props = {
    paper: PaperWithInfo
}

function Paper({ paper }: Props) {

    const [showModal, setShowModal] = useState(false)
    const { experiment, isLoadingExperiment } = useSingleExperiment(paper.experiment.tokenId)
    const image = "data:image/.webp;base64," + experiment?.image
    const { numOfLikes } = usePaperLikes(paper.id)
    const { numberOfReviews } = useReviews(paper.id)

    const paperModal = (
        <PaperModal isVisible={showModal} onClose={() => setShowModal(false)}>
            <div className='bg-paper p-4'>
                <div className='flex flex-col space-y-5'>
                    <div className='flex items-center space-x-10 pb-4 border-b-2 border-black'>
                        <img className="h-24 w-24 object-cover"
                            src={paper.user?.image ?? "https://links.papareact.com/gll"} />
                        <div className='h-24 flex-1 flex justify-center items-center bg-[#665053] '>
                            <p className='font-tinos text-black text-5xl text-center'>{experiment?.style ?? "Collection name"}</p>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col space-y-4" >
                        <div className='border-b-2 pb-2 border-black'>
                            <p className="p-2 font-tinos italic bg-transparent text-center text-4xl outline-none text-black">{paper.title}</p>
                            <div className='flex justify-end mr-4'><PaperLikeButton paperId={paper.id} /></div>
                        </div>
                        <div className='flex space-x-6'>
                            <img src={image} alt="experiment" className='w-96 h-96 object-contain' />
                            <Reviews paperId={paper.id} />
                        </div>
                    </div>
                </div>
                <p className="p-2 mt-6 flex-1 font-tinos italic text-center text-xl outline-none text-black">{paper.text}</p>
            </div>
        </PaperModal>
    )

    return (
        <>
            {paperModal}
            <button className='bg-transparent hover:bg-[#e6d6ac] hover:shadow-xl w-full border-b -mb-1 border-[#592323]'
                onClick={() => setShowModal(true)}>
                <div className="flex flex-1 items-center justify-between font-semibold">
                    <img className='h-10 w-10 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:h-10 xl:w-10 2xl:h-14 2xl:w-14 object-cover'
                        src={paper.user?.image ?? "https://links.papareact.com/gll"} alt="profile picture" />
                    <div className='flex flex-1 flex-col items-center justify-between h-full'>
                        <div className='flex w-full items-center justify-center space-x-6'>
                            <div className='flex items-center space-x-2'>
                                <p className='text-black font-tinos text-md xl:text-lg 2xl:text-xl'>{paper.user?.name}</p>
                                <TimeAgo
                                    className='hidden lg:text-md xl:text-lg 2xl:text-xl text-gray-500 font-tinos'
                                    date={paper.createdAt}
                                />
                            </div>
                        </div>
                        <p className='font-tinos text-md lg:text-lg xl:text-xl 2xl:text-2xl text-black italic'>&quot;{paper.title}&quot;</p>
                        <div className='flex w-full -m-1 items-center justify-evenly'>
                            <div className='flex items-center space-x-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>
                                <p className='font-tinos text-black text-md xl:text-lg 2xl:text-xl'>{numberOfReviews}</p>
                            </div>
                            <div className='flex items-center space-x-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                                <p className='font-tinos text-black text-md xl:text-lg 2xl:text-xl'>{numOfLikes}</p>
                            </div>
                        </div>
                    </div>
                    {isLoadingExperiment ? <div className='animation-pulse w-20 h-20 2xl:w-28 2xl:h-28 bg-paper' /> : <img src={image} className='w-16 h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 2xl:w-28 2xl:h-28 object-contain border-[#EBCB00] border-4' />}
                </div>
            </button>
        </>
    )
}

export default Paper