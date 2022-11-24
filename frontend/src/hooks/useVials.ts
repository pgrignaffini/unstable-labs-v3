import vialContractInfo from "@abi/vial.json"
import { useContractRead, useAccount } from "wagmi"
import type { NftURI, Vial } from "../types/types";
import { useQuery } from 'react-query'
import axios from 'axios'

export const useVials = () => {

    const { address } = useAccount()

    const { data: ownedTokenIds, refetch: refetchVials, isLoading, isFetching } = useContractRead({
        address: vialContractInfo.address,
        abi: vialContractInfo.abi,
        functionName: 'getVialsOwnedByMe',
        args: [{ from: address }],
        onSuccess(data) {
            // console.log('Vial ids: ', data)
        }
    })

    const { data: ownedTokenURIs, isLoading: isLoadingURIs, isFetching: isFetchingURIs } = useContractRead({
        address: vialContractInfo.address,
        abi: vialContractInfo.abi,
        functionName: 'getTokenURIs',
        args: [ownedTokenIds],
        enabled: !!ownedTokenIds,
        onSuccess(data) {
            // console.log('Vial uris: ', data)
        }
    })

    const getOwnedVials = async (): Promise<Vial[]> => {
        const ownedNfts = await Promise.all(
            (ownedTokenURIs as NftURI[])?.map(async (nftURI): Promise<Vial> => {
                const { data: nft } = await axios.get(nftURI.tokenURI)
                const tokenId = nftURI.tokenId.toString()
                return { tokenId, ...nft }
            })
        )
        // console.log("Owned vials: ", ownedNfts)
        return ownedNfts
    }

    const { data: vials, isLoading: isLoadingVials, isFetching: isFetchingVials } = useQuery(['your-vials', address], getOwnedVials, {
        enabled: !!ownedTokenURIs,
        staleTime: 10000
    })

    const isLoadingVialsData = isLoading || isLoadingURIs || isLoadingVials
    const isFetchingVialsData = isFetching || isFetchingURIs || isFetchingVials

    return { vials, refetchVials, isLoadingVialsData, isFetchingVialsData }
}