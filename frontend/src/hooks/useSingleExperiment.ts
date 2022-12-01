import { useQuery } from 'react-query'
import experimentContractInfo from "@abi/experiment.json"
import { useContractRead } from 'wagmi'
import axios from 'axios'
import type { Experiment, NftURI } from "../types/types"

export const useSingleExperiment = (tokenId: number) => {

    const { data: tokenURI, isLoading: isLoadingTokenURI }
        = useContractRead({
            address: experimentContractInfo.address,
            abi: experimentContractInfo.abi,
            functionName: 'getTokenURI',
            args: [tokenId],
            enabled: !!tokenId,
            onSuccess(data) {
                // console.log('Token uris: ', data)
            }
        })

    const getExperiment = async (tokenURI: NftURI) => {
        const { data: nft } = await axios.get(tokenURI.tokenURI)
        return { tokenId, ...nft } as Experiment
    }

    const { data: experiment, isLoading } = useQuery(['experiment', tokenId], () => getExperiment(tokenURI as NftURI), {
        enabled: !!tokenURI,
    })

    const isLoadingExperiment = isLoading || isLoadingTokenURI

    return { experiment, isLoadingExperiment }
}