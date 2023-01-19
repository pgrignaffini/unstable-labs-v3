import { useState } from "react";
import experimentContractInfo from "@abi/experiment.json";
import {
  useContractWrite,
  useFeeData,
  useWaitForTransaction,
  useContractEvent,
  useAccount,
} from "wagmi";
import { Metadata, uploadMetadataToIPFS } from "@utils/pinata";
import TxHash from "@components/TxHash";
import { trpc } from "@utils/trpc";
import type { BigNumber } from "ethers";
import { useExperiments } from "@hooks/useExperiments";
import SolidButton from "@components/SolidButton";

type Props = {
  image: string;
  id: string;
  className?: string;
};

const MintExperimentButton = ({ image, id, className }: Props) => {
  const { refetchAllExperiments, refetchExperiments } = useExperiments();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { data: feeData } = useFeeData();
  const [isMinting, setIsMinting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected } = useAccount();

  const createExperimentMutation =
    trpc.experiment.createExperiment.useMutation();

  const {
    write: createToken,
    data: tokenData,
    error: errorMintToken,
  } = useContractWrite({
    mode: "recklesslyUnprepared",
    address: experimentContractInfo.address,
    abi: experimentContractInfo.abi,
    functionName: "mintToken",
    onError: (error) => {
      console.log(error);
      setIsMinting(false);
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsMinting(true);
    },
  });

  useContractEvent({
    address: experimentContractInfo.address,
    abi: experimentContractInfo.abi,
    eventName: "TokenMinted",
    once: true,
    listener: (id: BigNumber) => {
      const tokenId = id.toNumber();
      createExperimentMutation.mutate({ tokenId });
    },
  });

  useWaitForTransaction({
    hash: tokenData?.hash,
    onError(error) {
      console.log(error);
      setIsMinting(false);
      setIsLoading(false);
    },
    onSuccess() {
      setIsMinting(false);
      setIsLoading(false);
      refetchAllExperiments();
      refetchExperiments();
    },
  });

  const mintModal = (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <div className="h-full w-full lg:h-1/2 lg:w-1/2">
          <div className="w-full bg-white bg-opacity-50 p-8 backdrop-blur-xl">
            <div className="flex flex-col items-center space-x-10 space-y-4 lg:flex-row lg:items-start">
              <img
                className="mx-auto w-1/2 lg:w-1/3"
                src={"data:image/.webp;base64," + image}
                alt="image"
              />
              <form className="flex flex-1 flex-col space-y-6 ">
                <input
                  type="text"
                  value={name}
                  className="bg-white bg-opacity-50 p-2 text-sm
                             text-black outline-none backdrop-blur-xl placeholder:text-sm"
                  placeholder="Enter name..."
                  onChange={(e) => setName(e.target.value)}
                />
                <textarea
                  value={description}
                  rows={5}
                  className="bg-white bg-opacity-50 p-2 text-sm
                              text-black outline-none backdrop-blur-xl placeholder:text-sm"
                  placeholder="Enter description..."
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="mx-auto flex flex-col space-y-4">
                  <SolidButton
                    type="button"
                    color="green"
                    error={!isConnected}
                    onClick={async () => {
                      setIsLoading(true);
                      const metadata: Metadata = { image, name, description };
                      const tokenUri = await uploadMetadataToIPFS(metadata);
                      createToken?.({
                        recklesslySetUnpreparedArgs: [
                          tokenUri,
                          { gasPrice: feeData?.gasPrice },
                        ],
                      });
                    }}
                    className="bg-acid text-white"
                    text="Mint"
                    loading={isLoading}
                  />
                  {isMinting && (
                    <TxHash
                      className="text-black "
                      hash={`${tokenData?.hash}`}
                    />
                  )}{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </label>
    </>
  );

  return (
    <>
      {mintModal}
      <label htmlFor={id} className={className}>
        Brew
      </label>
    </>
  );
};

export default MintExperimentButton;
