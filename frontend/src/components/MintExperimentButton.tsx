import React from 'react'
import experimentContractInfo from "@abi/experiment.json"
import { useContractWrite, useWaitForTransaction, useFeeData } from "wagmi"
import { Metadata, uploadMetadataToIPFS } from '@utils/pinata'
import TxHash from './TxHash'

type Props = {
    metadata: Metadata
}

function MintExperimentButton({ metadata }: Props) {

    const { data: feeData } = useFeeData()

    const { write: createToken, data: tokenData, error: errorMintToken } = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: experimentContractInfo.address,
        abi: experimentContractInfo.abi,
        functionName: 'mintToken',
    })

    return (
        <div className='flex flex-col space-y-10'>
            {
                tokenData &&
                <TxHash hash={tokenData?.hash} />
            }
            <button className='p-4 text-white bg-acid' type='button'
                onClick={async () => {
                    const tokenUri = await uploadMetadataToIPFS(metadata)
                    createToken?.({
                        recklesslySetUnpreparedArgs: [tokenUri, { gasPrice: feeData?.gasPrice }]
                    })
                }}>Mint</button>
        </div>
    )
}

export default MintExperimentButton