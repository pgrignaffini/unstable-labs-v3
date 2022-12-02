import { useState } from 'react'
import { Prisma } from '@prisma/client'
import TimeAgo from 'react-timeago'
import { useSingleExperiment } from '@hooks/useSingleExperiment'
import Modal from './Modal'
import PaperModal from './PaperModal'

export type PaperWithInfo = Prisma.PaperGetPayload<{
    include: { user: true, experiment: true }
}>

type Props = {
    paper: PaperWithInfo
}

function Paper({ paper }: Props) {

    const [showModal, setShowModal] = useState(false)
    const { experiment } = useSingleExperiment(paper.experiment.tokenId)
    const image = "data:image/.webp;base64," + experiment?.image

    const paperModal = (
        <PaperModal isVisible={showModal} onClose={() => setShowModal(false)}>
            <div className='bg-[#F0E1B2] p-4'>
                <div className='flex flex-col space-y-5'>
                    <div className='flex items-center space-x-10 '>
                        <img className="h-24 w-24 object-cover"
                            src={paper.user?.image ?? "https://links.papareact.com/gll"} />
                        <div className='h-24 flex-1 flex justify-center items-center bg-[#665053]'>
                            <p className='font-tinos text-black text-5xl text-center'>{experiment?.style ?? "Collection name"}</p>
                        </div>
                    </div>
                    <div className='w-full bg-black h-1' />
                    <div className="flex flex-1 flex-col space-y-4" >
                        <p className="p-2 font-tinos italic bg-transparent text-4xl outline-none border-b-2 border-black text-center text-black">{paper.title}</p>
                        <div className='flex space-x-6'>
                            <img src={image} alt="experiment" className='w-96 h-96 object-contain' />
                            <p className="p-2 flex-1 font-tinos italic bg-slate-100 text-xl outline-none text-black">{paper.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </PaperModal>
    )

    return (
        <>
            {paperModal}
            <button className='bg-[#F0E1B2] hover:bg-[#e6d6ac] hover:shadow-xl w-full p-4 border-b border-[#592323]'
                onClick={() => setShowModal(true)}>
                <div className="flex flex-1 items-center justify-between font-semibold">
                    <img className='h-14 w-14 object-cover'
                        src={paper.user?.image ?? "https://links.papareact.com/gll"} alt="profile picture" />
                    <div className='flex flex-1 flex-col items-center justify-between h-full'>
                        <div className='flex w-full items-center justify-center space-x-6'>
                            <div className='flex items-center space-x-2'>
                                <p className='text-black font-tinos text-xl'>{paper.user?.name}</p>
                                <TimeAgo
                                    className='text-xl text-gray-500 font-tinos'
                                    date={paper.createdAt}
                                />
                            </div>
                        </div>
                        <p className='font-tinos text-3xl text-black italic'>&quot;{paper.title}&quot;</p>
                    </div>
                    <img src={image} className='w-28 h-28 object-contain border-[#EBCB00] border-4' />
                </div>
            </button>
        </>
    )
}

export default Paper