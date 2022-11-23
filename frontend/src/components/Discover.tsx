import type { Experiment } from "../types/types"
import { useExperiments } from '@hooks/useExperiments'
import ExperimentCard from './ExperimentCard'

function Experiments() {

    const { allExperiments, isLoadingAll } = useExperiments()

    return (
        <>
            {isLoadingAll ?
                <div className='flex justify-center items-center'>
                    <img src='/blob-animated.gif' className='w-12 ' />
                </div> :
                allExperiments?.map((experiment: Experiment, index: number) => (
                    <ExperimentCard key={index} experiment={experiment} />
                ))}
        </>
    )
}

export default Experiments