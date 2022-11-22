import { useState, useEffect } from 'react'
import experimentContractInfo from "@abi/experiment.json"
import { useContractWrite, useFeeData, useWaitForTransaction, useContractEvent } from "wagmi"
import { Metadata, uploadMetadataToIPFS } from '@utils/pinata'
import TxHash from '@components/TxHash'
import { trpc } from '@utils/trpc'
import { BigNumber } from 'ethers'
import { useExperiments } from '@hooks/useExperiments'
import SolidButton from '@components/SolidButton'

type Props = {
    image: string
    id: string
    className?: string
}

const MintExperimentButton = ({ image, id, className }: Props) => {

    const { refetchAllExperiments, refetchExperiments } = useExperiments()
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const { data: feeData } = useFeeData()
    const [isMinting, setIsMinting] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const createExperimentMutation = trpc.experiment.createExperiment.useMutation()

    const { write: createToken, data: tokenData, error: errorMintToken } = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: experimentContractInfo.address,
        abi: experimentContractInfo.abi,
        functionName: 'mintToken',
        onError: (error) => {
            console.log(error)
            setIsMinting(false)
            setIsLoading(false)
        },
        onSuccess: () => {
            setIsMinting(true)
        }
    })


    useContractEvent({
        address: experimentContractInfo.address,
        abi: experimentContractInfo.abi,
        eventName: 'TokenMinted',
        once: true,
        listener: (id: BigNumber) => {
            const tokenId = id.toNumber()
            createExperimentMutation.mutate({ tokenId })
        }
    })

    useWaitForTransaction({
        hash: tokenData?.hash,
        onError(error) {
            console.log(error)
            setIsMinting(false)
            setIsLoading(false)
        },
        onSuccess() {
            setIsMinting(false)
            setIsLoading(false)
            refetchAllExperiments()
            refetchExperiments()
        }
    })

    const mintModal = (
        <>
            <input type="checkbox" id={id} className="modal-toggle" />
            <div className="modal">
                <div className="w-1/2">
                    <label htmlFor={id} className="text-2xl text-white cursor-pointer" onClick={() => {
                        setName("")
                        setDescription("")
                    }}>X</label>
                    <div className="bg-white bg-opacity-50 backdrop-blur-xl p-8">
                        <div className="flex items-start space-x-10">
                            <img className='w-1/3' src={"data:image/.webp;base64," + image} alt="image" />
                            <form className="flex flex-1 flex-col space-y-6 ">
                                <input
                                    type="text"
                                    value={name}
                                    className="bg-white bg-opacity-50 backdrop-blur-xl p-2
                             outline-none text-black text-sm placeholder:text-sm"
                                    placeholder="Enter name..." onChange={(e) => setName(e.target.value)} />
                                <textarea
                                    value={description}
                                    rows={5}
                                    className="bg-white bg-opacity-50 backdrop-blur-xl p-2
                              outline-none text-black text-sm placeholder:text-sm"
                                    placeholder="Enter description..." onChange={(e) => setDescription(e.target.value)} />
                                <div className="mx-auto flex flex-col space-y-4">
                                    <SolidButton type='button' color="green" onClick={async () => {
                                        setIsLoading(true)
                                        const metadata: Metadata = { image, name, description }
                                        const tokenUri = await uploadMetadataToIPFS(metadata)
                                        createToken?.({
                                            recklesslySetUnpreparedArgs: [tokenUri, { gasPrice: feeData?.gasPrice }]
                                        })
                                    }} className="bg-acid text-white" text='Mint' loading={isLoading} />
                                    {isMinting &&
                                        <TxHash className='text-black ' hash={`${tokenData?.hash}`} />}                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <>
            {mintModal}
            <label htmlFor={id} className={className}>
                Brew
            </label>
        </>
    )
}


export default MintExperimentButton