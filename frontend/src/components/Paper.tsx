import React from 'react'
import { Prisma } from '@prisma/client'
import TimeAgo from 'react-timeago'
import { useSingleExperiment } from '@hooks/useSingleExperiment'

export type PaperWithInfo = Prisma.PaperGetPayload<{
    include: { user: true, experiment: true }
}>

type Props = {
    paper: PaperWithInfo
}

function Paper({ paper }: Props) {

    const { experiment } = useSingleExperiment(paper.experiment.tokenId)
    const image = "data:image/.webp;base64," + experiment?.image

    return (
        <button className='bg-[#F0E1B2] hover:bg-[#e6d6ac] hover:shadow-xl w-full p-4 border-b border-[#592323]'>
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
                    <p className='font-tinos text-3xl text-black italic'>"{paper.title}"</p>
                </div>
                <img src={image} className='w-28 h-28 object-contain border-[#EBCB00] border-4' />

            </div>
        </button>
    )
}

export default Paper