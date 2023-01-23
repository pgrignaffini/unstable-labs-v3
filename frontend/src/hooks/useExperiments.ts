import { useQuery } from "react-query";
import { useAccount } from "wagmi";
import experimentContractInfo from "@abi/experiment.json";
import { useContractRead } from "wagmi";
import axios from "axios";
import type { Experiment, NftURI } from "../types/types";

export const useExperiments = () => {
  const { address } = useAccount();

  const {
    data: tokenIds,
    refetch: refetchAllIds,
    isLoading: isLoadingAllTokenIds,
  } = useContractRead({
    address: experimentContractInfo.address,
    abi: experimentContractInfo.abi,
    functionName: "getTokenIds",
    onSuccess(data) {
      // console.log('Token ids: ', data)
    },
  });

  const {
    data: tokenURIs,
    refetch: refetchAllTokenURIs,
    isLoading: isLoadingAllTokenURIs,
  } = useContractRead({
    address: experimentContractInfo.address,
    abi: experimentContractInfo.abi,
    functionName: "getTokenURIs",
    args: [tokenIds],
    enabled: !!tokenIds,
    onSuccess(data) {
      console.log("Token uris: ", data);
    },
  });

  const getAllExperiments = async (): Promise<Experiment[]> => {
    const allExperiments = await Promise.all(
      (tokenURIs as NftURI[])?.map(async (nftURI): Promise<Experiment> => {
        const { data: nft } = await axios.get(nftURI.tokenURI);
        const tokenId = nftURI.tokenId.toNumber();
        return { tokenId, ...nft } as Experiment;
      })
    );
    return allExperiments.reverse();
  };

  const {
    data: ownedTokenIds,
    refetch: refetchIDs,
    isLoading: isLoadingTokenIds,
  } = useContractRead({
    address: experimentContractInfo.address,
    abi: experimentContractInfo.abi,
    functionName: "getTokensOwnedByMe",
    args: [{ from: address }],
    onSuccess(data) {
      // console.log('Token ids: ', data)
    },
  });

  const {
    data: ownedTokenURIs,
    refetch: refetchTokenURIs,
    isLoading: isLoadingTokenURIs,
  } = useContractRead({
    address: experimentContractInfo.address,
    abi: experimentContractInfo.abi,
    functionName: "getTokenURIs",
    args: [ownedTokenIds],
    enabled: !!ownedTokenIds,
    onSuccess(data) {
      // console.log('Token uris: ', data)
    },
  });

  const getOwnedExperiments = async (): Promise<Experiment[]> => {
    const ownedExperiments = await Promise.all(
      (ownedTokenURIs as NftURI[])?.map(async (nftURI): Promise<Experiment> => {
        const { data: nft } = await axios.get(nftURI.tokenURI);
        const tokenId = nftURI.tokenId.toNumber();
        return { tokenId, ...nft } as Experiment;
      })
    );
    return ownedExperiments;
  };

  const {
    data: allExperiments,
    refetch: refetchAllExp,
    isLoading: isLoadingAllExperiments,
  } = useQuery("all-experiments", getAllExperiments, {
    enabled: !!tokenURIs,
    refetchOnWindowFocus: true,
    refetchInterval: 10000,
  });

  const {
    data: experiments,
    refetch: refetchExp,
    isLoading: isLoadingExperiments,
  } = useQuery(["your-experiments", address], getOwnedExperiments, {
    enabled: !!ownedTokenURIs,
    refetchOnWindowFocus: true,
    refetchInterval: 10000,
  });

  const refetchAllExperiments = async () => {
    await refetchAllIds();
    await refetchAllTokenURIs();
    await refetchAllExp();
  };

  const refetchExperiments = async () => {
    await refetchIDs();
    await refetchTokenURIs();
    await refetchExp();
  };

  const isLoading =
    isLoadingTokenIds || isLoadingTokenURIs || isLoadingExperiments;
  const isLoadingAll =
    isLoadingAllTokenIds || isLoadingAllTokenURIs || isLoadingAllExperiments;

  return {
    experiments,
    refetchExperiments,
    isLoading,
    allExperiments,
    refetchAllExperiments,
    isLoadingAll,
  };
};
