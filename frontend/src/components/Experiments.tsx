import Card from '@components/Card'
import type { Experiment, NftURI } from "../types/types"
import { useExperiments } from '@hooks/useExperiments'

function Experiments() {

    const { experiments, isLoadingExperiments } = useExperiments()

    return (
        <>
            {
                !experiments?.length ? <p>No experiments found</p> :
                    experiments?.map((experiment: Experiment, index: number) => (
                        <Card key={index} nft={experiment} />
                    ))
            }
            {isLoadingExperiments &&
                <div className='flex justify-center items-center'>
                    <img src='/blob-animated.gif' className='w-12 ' />
                </div>}
        </>
    )
}

export default Experiments