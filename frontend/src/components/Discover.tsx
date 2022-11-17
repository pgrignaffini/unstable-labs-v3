import Card from '@components/Card'
import type { Experiment } from "../types/types"
import { useExperiments } from '@hooks/useExperiments'

function Experiments() {

    const { allExperiments } = useExperiments()

    return (
        <>
            {allExperiments?.map((experiment: Experiment, index: number) => (
                <Card key={index} nft={experiment} />
            ))}
        </>
    )
}

export default Experiments