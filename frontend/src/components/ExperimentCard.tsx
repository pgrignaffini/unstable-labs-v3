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
                <div className="flex flex-col space-y-3">
                    <label htmlFor={experiment.name} className="text-2xl text-white cursor-pointer">X</label>
                    <img src={src} alt={experiment?.name} className="w-full" />
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-sm lg:text-lg 2xl:text-2xl font-bold">{experiment?.name}</h1>
                        {experiment?.description && <p className="text-sm lg:text-md 2xl:text-lg italic">&quot;{experiment.description}&quot;</p>}
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <>
            {showExperimentModal}
            <div className='border-2 hover:border-4  hover:border-acid hover:-m-1 p-4'>
                <div className="flex flex-col">
                    <label htmlFor={experiment.name} className='cursor-pointer space-y-2'>
                        <div className='w-auto h-32 md:h-48 2xl:h-60 relative'>
                            <Image src={src} alt={experiment?.name} fill objectFit='cover' />
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className="text-white text-sm lg:text-lg 2xl:text-xl font-bold">{experiment?.name}</div>
                            {experiment?.tokenId && <LikeButton tokenId={experiment.tokenId} />}
                        </div>
                    </label>
                </div>
            </div>
        </>
    )
}

export default ExperimentCard