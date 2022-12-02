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

    const [showFullPaper, setShowFullPaper] = React.useState(false)
    const { experiment } = useSingleExperiment(paper.experiment.tokenId)
    const image = "data:image/.webp;base64," + experiment?.image

    return (
        <button className='bg-slate-200 w-full p-4 border-t border-r border-l border-gray-500 group focus:outline-none '>
            <div className="flex flex-1 items-center justify-between h-24 px-3 font-semibold">
                <img src={image} className='w-28 h-28 object-contain' />
                <div className='flex flex-1 flex-col items-center justify-between h-full'>
                    <div className='flex w-full items-center justify-center space-x-6'>
                        <img className='h-14 w-14 object-cover'
                            src={paper.user?.image ?? "https://links.papareact.com/gll"} alt="profile picture" />
                        <div className='flex items-center space-x-2'>
                            <p className='text-black'>{paper.user?.name}</p>
                            <TimeAgo
                                className='text-[0.6rem] text-gray-500'
                                date={paper.createdAt}
                                arabicForm="medial" />
                        </div>
                    </div>
                    <p className='font-tinos text-3xl text-black'>Title: {paper.title}</p>
                </div>
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </div>
            <div className="max-h-0 mt-6 overflow-hidden duration-700 group-focus:max-h-screen">
                <div className='flex flex-col space-y-5'>
                    <div className='flex items-center space-x-10 '>
                        <div className='h-24 flex-1 flex justify-center items-center bg-slate-400'>
                            <p className='font-tinos text-black text-5xl text-center'>{experiment?.style}</p>
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
        </button>
    )
}

export default Paper