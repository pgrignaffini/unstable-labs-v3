import { useQuery } from 'react-query'
import { useAccount } from "wagmi"
import experimentContractInfo from "@abi/experiment.json"
import { useContractRead } from 'wagmi'
import axios from 'axios'
import type { Experiment, NftURI } from "../types/types"

export const useExperiments = () => {

    const { address } = useAccount()

    const { data: tokenIds, refetch: refetchAllExperiments } = useContractRead({
        address: experimentContractInfo.address,
        abi: experimentContractInfo.abi,
        functionName: 'getTokenIds',
        onSuccess(data) {
            // console.log('Token ids: ', data)
        }
    })

    const { data: tokenURIs } = useContractRead({
        address: experimentContractInfo.address,
        abi: experimentContractInfo.abi,
        functionName: 'getTokenURIs',
        args: [tokenIds],
        enabled: !!tokenIds,
        onSuccess(data) {
            // console.log('Token uris: ', data)
        }
    })

    const getAllExperiments = async (): Promise<Experiment[]> => {
        const allExperiments = await Promise.all(
            (tokenURIs as NftURI[])?.map(async (nftURI): Promise<Experiment> => {
                const { data: nft } = await axios.get(nftURI.tokenURI)
                const tokenId = nftURI.tokenId.toNumber()
                return { tokenId, ...nft }
            })
        )
        return allExperiments
    }

    const { data: ownedTokenIds, refetch: refetchExperiments } = useContractRead({
        address: experimentContractInfo.address,
        abi: experimentContractInfo.abi,
        functionName: 'getTokensOwnedByMe',
        args: [{ from: address }],
        onSuccess(data) {
            // console.log('Token ids: ', data)
        }
    })

    const { data: ownedTokenURIs } = useContractRead({
        address: experimentContractInfo.address,
        abi: experimentContractInfo.abi,
        functionName: 'getTokenURIs',
        args: [ownedTokenIds],
        enabled: !!ownedTokenIds,
        onSuccess(data) {
            // console.log('Token uris: ', data)
        }
    })

    const getOwnedExperiments = async (): Promise<Experiment[]> => {
        const ownedExperiments = await Promise.all(
            (ownedTokenURIs as NftURI[])?.map(async (nftURI): Promise<Experiment> => {
                const { data: nft } = await axios.get(nftURI.tokenURI)
                const tokenId = nftURI.tokenId.toNumber()
                return { tokenId, ...nft }
            })
        )
        return ownedExperiments
    }

    const { data: allExperiments, isLoading: isLoadingAllExperiments } = useQuery('all-experiments', getAllExperiments, {
        enabled: !!tokenURIs,
        refetchOnWindowFocus: true,
        refetchInterval: 10000,
    })

    const { data: experiments, isLoading: isLoadingExperiments } = useQuery(['your-experiments', address], getOwnedExperiments, {
        enabled: !!ownedTokenURIs,
        refetchOnWindowFocus: true,
        refetchInterval: 10000,
    })

    return { experiments, refetchExperiments, isLoadingExperiments, allExperiments, refetchAllExperiments, isLoadingAllExperiments }
}