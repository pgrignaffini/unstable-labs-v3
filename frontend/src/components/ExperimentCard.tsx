import type { Experiment } from '../types/types'
import Image from 'next/image'
import LikeButton from '@components/LikeButton'

type Props = {
    experiment: Experiment
}

function ExperimentCard({ experiment }: Props) {

    const src = "data:image/.webp;base64," + experiment?.image

    const showExperimentModal = (
        <>
            <input type="checkbox" id={experiment.name} className="modal-toggle" />
            <div className="modal h-full w-full">
                <div className="flex flex-col space-y-3  text-white">
                    <label htmlFor={experiment.name} className="text-2xl cursor-pointer">X</label>
                    <img src={src} alt={experiment?.name} className="w-full" />
                    <div className="flex flex-col items-center justify-center bg-black" >
                        <h1 className="text-sm lg:text-lg 2xl:text-2xl font-bold">{experiment?.name}</h1>
                        {experiment?.description && <p className="text-[0.6rem] lg:text-md 2xl:text-lg italic">&quot;{experiment.description}&quot;</p>}
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <>
            {showExperimentModal}
            <label htmlFor={experiment.name} className='cursor-pointer space-y-2'>
                <div className='h-72 lg:h-64 xl:h-72 2xl:h-96 w-auto flex flex-col justify-between items-center border-2 hover:border-4 hover:border-acid hover:-m-1 p-4'>
                    <div className='relative w-full h-full'>
                        <Image src={src} alt={experiment?.name} placeholder='blur' blurDataURL='/blur.jpeg' fill sizes='100vw' style={{ objectFit: 'contain' }} />
                    </div>
                    <div className='flex items-center'>
                        <div className="text-white text-[0.6rem] lg:text-sm 2xl:text-md font-bold">{experiment?.name}</div>
                        {experiment?.tokenId && <LikeButton tokenId={experiment.tokenId} />}
                    </div>
                </div>
            </label>
        </>
    )
}

export default ExperimentCard