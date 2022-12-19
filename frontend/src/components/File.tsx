import { useState } from 'react'
import { Prisma } from '@prisma/client'
import TimeAgo from 'react-timeago'
import { useSingleExperiment } from '@hooks/useSingleExperiment'
import Modal from './Modal'
import PaperModal from './PaperModal'
import FileReviews from './FileReviews'
import FileLikeButton from './buttons/FileLikeButton'
import { usePaperLikes } from '@hooks/usePaperLikes'
import { useReviews } from '@hooks/useReviews'

export type PaperWithInfo = Prisma.PaperGetPayload<{
    include: { user: true, experiment: true }
}>

type Props = {
    paper: PaperWithInfo
}

function File({ paper }: Props) {

    const [showModal, setShowModal] = useState(false)
    const { experiment, isLoadingExperiment } = useSingleExperiment(paper.experiment.tokenId)
    const image = "data:image/.webp;base64," + experiment?.image
    const { numOfLikes } = usePaperLikes(paper.id)
    const { numberOfReviews } = useReviews(paper.id)

    const fileModal = (
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
            <div className='flex flex-col space-y-5 p-4'>
                <div className='flex items-center space-x-10 pb-4 border-b-2 border-black'>
                    <img className="h-24 w-24 object-cover"
                        src={paper.user?.image ?? "https://links.papareact.com/gll"} />
                    <div className='h-24 flex-1 flex justify-center items-center '>
                        <p className='text-acid text-3xl text-center'>{experiment?.style ?? "Collection name"}</p>
                    </div>
                </div>
                <div className="flex flex-1 flex-col space-y-4" >
                    <div className='border-b-2 pb-2 border-black'>
                        <p className="p-2  italic bg-transparent text-center text-xl outline-none text-acid">{paper.title}</p>
                        <div className='flex justify-end mr-4'><FileLikeButton paperId={paper.id} /></div>
                    </div>
                    <div className='flex space-x-6'>
                        <img src={image} alt="experiment" className='w-96 h-96 object-contain' />
                        <FileReviews paperId={paper.id} />
                    </div>
                </div>
            </div>
            <p className="p-2 mt-6 flex-1  italic text-center text-xl outline-none text-acid">{paper.text}</p>
        </Modal>
    )

    return (
        <>
            {fileModal}
            <button className='bg-transparent hover:bg-slate-800 hover:shadow-xl w-full'
                onClick={() => setShowModal(true)}>
                <div className="flex flex-1 items-center justify-between font-semibold">
                    <img className='h-10 w-10 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:h-10 xl:w-10 2xl:h-14 2xl:w-14 object-cover'
                        src={paper.user?.image ?? "https://links.papareact.com/gll"} alt="profile picture" />
                    <div className='flex flex-1 flex-col items-center justify-between h-full'>
                        <div className='flex w-full items-center justify-center space-x-6'>
                            <div className='flex items-center space-x-2'>
                                <p className='text-acid lg:text-sm xl:text-md 2xl:text-lg'>{paper.user?.name}</p>
                                <TimeAgo
                                    className='hidden lg:text-sm xl:text-md 2xl:text-lg text-gray-500 '
                                    date={paper.createdAt}
                                />
                            </div>
                        </div>
                        <p className='text-[0.5rem] lg:text-sm xl:text-md 2xl:text-lg text-acid italic'>&quot;{paper.title}&quot;</p>
                        <div className='flex w-full -m-1 items-center justify-evenly'>
                            <div className='flex items-center space-x-2'>
                                <img src="post.png" className="w-4 h-5 2xl:w-5 2xl:h-6" />
                                <p className=' text-white lg:text-sm xl:text-md 2xl:text-lg'>{numberOfReviews}</p>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <img src="heart.png" className="w-6 h-5 2xl:w-7 2xl:h-6" />
                                <p className=' text-white lg:text-sm xl:text-md 2xl:text-lg'>{numOfLikes}</p>
                            </div>
                        </div>
                    </div>
                    {isLoadingExperiment ? <div className='animation-pulse w-20 h-20 2xl:w-28 2xl:h-28 bg-paper' /> : <img src={image} className='w-16 h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 2xl:w-28 2xl:h-28 object-contain border-[#EBCB00] border-4' />}
                </div>
            </button>
        </>
    )
}

export default File