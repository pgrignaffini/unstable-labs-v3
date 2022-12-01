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
        <div tabIndex={0} className='collapse bg-slate-200 p-4'>
            <input type="checkbox" className="peer" />
            <div className='collapse-title flex items-start space-x-3 peer-checked:hidden'>
                <img src={image} className='w-28 h-28 object-contain' />
                <div className='flex flex-1 flex-col items-center justify-between h-28'>
                    <div className='flex w-full items-center justify-center space-x-6'>
                        <img className='h-14 w-14 object-cover'
                            src={paper.user?.image ?? "https://links.papareact.com/gll"} alt="profile picture" />
                        <div className='flex items-center space-x-2'>
                            <p className='text-black'>{paper.user?.name}</p>
                            <TimeAgo
                                className='text-[0.6rem] text-gray-500'
                                date={paper.createdAt} />
                        </div>
                    </div>
                    <p className='font-tinos text-3xl text-black'>Title: {paper.title}</p>
                </div>
            </div>
            <div className="collapse-content">
            <div className='container flex flex-col space-y-5 bg-slate-200 p-6'>
            <div className='flex items-center space-x-10 '>
                <img className="h-24 w-24 object-cover"
                    src={paper.user?.image ?? "https://links.papareact.com/gll"} />
                <div className='h-24 flex-1 flex justify-center items-center bg-slate-400'>
                    <p className='font-tinos text-black text-5xl text-center'>{experiment?.style}</p>
                </div>
            </div>
            <div className='w-full bg-black h-1' />
            <div className="flex flex-1 flex-col space-y-4" >
                <p className="p-2 font-tinos italic bg-transparent text-4xl outline-none border-b-2 border-black text-center text-black">{paper.title}</p>
                <div className='flex iems-center space-x-6'>
                     <img src={image} alt="experiment" className='w-96 h-96 object-contain' />
                    <p className="p-2 flex-1 font-tinos italic bg-slate-100 text-xl outline-none text-black">{paper.text}</p>
                </div>
            </div>
        </div>
            </div>
        </div>
    )
}

export default Paper