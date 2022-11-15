import { useQuery } from 'react-query'
import { useAccount } from "wagmi"
import experimentContractInfo from "@abi/experiment.json"
import { useContractRead } from 'wagmi'
import axios from 'axios'
import type { Experiment, NftURI } from "../types/types"

export const useExperiments = () => {

    const { address } = useAccount()

    const { data: ownedTokenIds } = useContractRead({
        address: experimentContractInfo.address,
        abi: experimentContractInfo.abi,
        functionName: 'getTokensOwnedByMe',
        args: [{ from: address }],
        onSuccess(data) {
            console.log('Token ids: ', data)
        }
    })

    const { data: ownedTokenURIs } = useContractRead({
        address: experimentContractInfo.address,
        abi: experimentContractInfo.abi,
        functionName: 'getTokenURIs',
        args: [ownedTokenIds],
        enabled: !!ownedTokenIds,
        onSuccess(data) {
            console.log('Token uris: ', data)
        }
    })

    const getOwnedExperiments = async (): Promise<Experiment[]> => {
        const ownedExperiments = await Promise.all(
            (ownedTokenURIs as NftURI[])?.map(async (nftURI): Promise<Experiment> => {
                const { data: nft } = await axios.get(nftURI.tokenURI)
                const tokenId = nftURI.tokenId.toString()
                return { tokenId, ...nft }
            })
        )
        return ownedExperiments
    }

    const { data: experiments, isLoading: isLoadingExperiments, refetch: refetchExperiments } = useQuery(['your-experiments', address], getOwnedExperiments, {
        enabled: !!ownedTokenURIs,
        refetchOnWindowFocus: true,
        refetchInterval: 10000,
    })

    return { experiments, refetchExperiments, isLoadingExperiments }
}