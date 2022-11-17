import { useState } from 'react'
import experimentContractInfo from "@abi/experiment.json"
import { useContractWrite, useFeeData } from "wagmi"
import { Metadata, uploadMetadataToIPFS } from '@utils/pinata'
import TxHash from './TxHash'

type Props = {
    image: string
    id: string
    className?: string
}

const MintExperimentButton = ({ image, id, className }: Props) => {

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const { data: feeData } = useFeeData()

    const { write: createToken, data: tokenData, error: errorMintToken } = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: experimentContractInfo.address,
        abi: experimentContractInfo.abi,
        functionName: 'mintToken',
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
                                    <button className='p-4 text-white bg-acid hover:bg-dark-acid' type='button'
                                        onClick={async () => {
                                            const metadata: Metadata = { image, name, description }
                                            const tokenUri = await uploadMetadataToIPFS(metadata)
                                            createToken?.({
                                                recklesslySetUnpreparedArgs: [tokenUri, { gasPrice: feeData?.gasPrice }]
                                            })
                                        }}>Mint</button>
                                    {tokenData && <TxHash className='text-black' hash={tokenData?.hash} />}
                                </div>
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