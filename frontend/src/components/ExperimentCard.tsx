import type { Experiment } from '../types/types'
import Image from 'next/image'
import LikeButton from '@components/LikeButton'
import { useState } from 'react'
import Modal from '@components/Modal'
import NewPaper from '@components/NewPaper'
import NewFile from '@components/NewFile'
import FileModal from './FileModal'

type Props = {
    experiment: Experiment
    owner?: boolean
}

function ExperimentCard({ experiment, owner }: Props) {

    const src = "data:image/.webp;base64," + experiment?.image
    const [showPaperModal, setShowPaperModal] = useState(false)

    const paperModal = (
        <Modal isVisible={showPaperModal} onClose={() => setShowPaperModal(false)}>
            <NewPaper tokenId={experiment.tokenId as number} />
            {/* <NewFile tokenId={experiment.tokenId as number} /> */}
        </Modal>
    )

    const showExperimentModal = (
        <>
            <input type="checkbox" id={experiment.name} className="modal-toggle" />
            <label htmlFor={experiment.name} className="modal cursor-pointer">
                <div className="h-2/3 w-full lg:w-2/3 lg:h-3/4 flex flex-col items-center justify-center text-white">
                    <div className='relative h-full w-full'>
                        <Image src={src} alt={experiment?.name} placeholder='blur' blurDataURL='/blur.jpeg' fill sizes='100vw' style={{ objectFit: 'contain' }} />
                    </div>
                    <div className='flex flex-col space-y-3 items-center p-2 w-full lg:w-fit bg-gray-900'>
                        <h1 className="text-sm lg:text-lg 2xl:text-2xl">{experiment?.name}</h1>
                        {experiment?.description && <p className="text-[0.6rem] lg:text-md 2xl:text-lg italic">&quot;{experiment.description}&quot;</p>}
                    </div>
                </div>
            </label>
        </>
    )

    return (
        <>
            {paperModal}
            {showExperimentModal}
            <div className='h-72 lg:h-64 xl:h-72 2xl:h-96 w-auto flex flex-col space-y-2 justify-between items-center border-2 hover:border-4 hover:border-acid hover:-m-1 p-4'>
                {owner ? <img src="/post.png" onClick={() => setShowPaperModal(true)} className='z-10 w-6 h-8 place-self-end hover:border-2 hover:border-white p-1 cursor-pointer' /> : null}
                <div className='relative w-full h-full'>
                    <label htmlFor={experiment.name} className='cursor-pointer'>
                        <Image src={src} alt={experiment?.name} placeholder='blur' blurDataURL='/blur.jpeg' fill sizes='100vw' style={{ objectFit: 'contain' }} />
                    </label>
                </div>
                <div className='flex w-full items-center justify-center space-x-2 md:justify-between px-2'>
                    <div className="text-white text-sm 2xl:text-md font-bold">{experiment?.name}</div>
                    {experiment?.tokenId && <LikeButton tokenId={experiment.tokenId} />}
                </div>
            </div>
        </>
    )
}

export default ExperimentCard