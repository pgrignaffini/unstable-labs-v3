import type { Experiment } from "../types/types"
import { useExperiments } from '@hooks/useExperiments'
import ExperimentCard from './ExperimentCard'
import ExperimentCardSkeleton from "@components/skeletons/ExperimentCardSkeleton"

function Experiments() {

    const { experiments, isLoading } = useExperiments()

    return (
        <>
            {isLoading ?
                <ExperimentCardSkeleton cards={10} /> :
                !experiments?.length ? <p>No experiments found</p> :
                    experiments?.map((experiment: Experiment, index: number) => (
                        <ExperimentCard key={index} experiment={experiment} owner />
                    ))}
        </>
    )
}

export default Experiments