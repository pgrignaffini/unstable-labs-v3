import type { Experiment } from "../types/types"
import { useExperiments } from '@hooks/useExperiments'
import ExperimentCard from '@components/ExperimentCard'
import ExperimentCardSkeleton from "@components/skeletons/ExperimentCardSkeleton"

function Experiments() {

    const { allExperiments, isLoadingAll } = useExperiments()

    return (
        <>
            {isLoadingAll ?
                <ExperimentCardSkeleton cards={10} /> :
                allExperiments?.map((experiment: Experiment, index: number) => (
                    <ExperimentCard key={index} experiment={experiment} />
                ))}
        </>
    )
}

export default Experiments