import Card from '@components/Card'
import type { Experiment } from "../types/types"
import { useExperiments } from '@hooks/useExperiments'
import ExperimentCard from './ExperimentCard'

function Experiments() {

    const { experiments, isLoadingExperiments } = useExperiments()

    return (
        <>
            {isLoadingExperiments ?
                <div className='flex justify-center items-center'>
                    <img src='/blob-animated.gif' className='w-12 ' />
                </div> :
                !experiments?.length ? <p>No experiments found</p> :
                    experiments?.map((experiment: Experiment, index: number) => (
                        <ExperimentCard key={index} experiment={experiment} />
                    ))}
        </>
    )
}

export default Experiments