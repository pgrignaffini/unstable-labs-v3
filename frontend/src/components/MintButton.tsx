import React from 'react'
import experimentContractInfo from "@abi/experiment.json"
import vialContractInfo from "@abi/vial.json"
import TxHash from '@components/TxHash'
import { useContractWrite, useWaitForTransaction, useContractRead, useFeeData } from 'wagmi'
import { Metadata, uploadMetadataToIPFS } from "@utils/pinata"
import { BigNumber } from 'ethers'

type Props = {
    metadata: Metadata,
    isVial?: boolean;
    numVials?: number;
}

function MintButton({ metadata, isVial, numVials }: Props) {

    const [minted, setMinted] = React.useState<boolean>(false)
    const [isMinting, setIsMinting] = React.useState<boolean>(false)
    const [vialPrice, setVialPrice] = React.useState<BigNumber>()
    const { data: feeData } = useFeeData()

    if (isVial && numVials) {
        useContractRead({
            address: vialContractInfo.address,
            abi: vialContractInfo.abi,
            functionName: "getVialPrice",
            onSuccess: (data) => {
                const vialPrice = BigNumber.from(data)
                setVialPrice(vialPrice)
            }
        })
    }


    const { write: createToken, data: tokenData, error: errorMintToken } = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: experimentContractInfo.address,
        abi: experimentContractInfo.abi,
        functionName: 'mintToken',
        onMutate() {
            setIsMinting(true)
        }
    })

    const { write: createVials, data: vialData, error: errorMintVials } = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: vialContractInfo.address,
        abi: vialContractInfo.abi,
        functionName: 'mintVials',
        onMutate() {
            setIsMinting(true)
        },
        onError(error) {
            console.log("Error minting vials: ", error.message)
        }
    })

    let data = isVial ? vialData : tokenData
    const error = isVial ? errorMintVials : errorMintToken

    useWaitForTransaction({
        hash: data?.hash,
        onError(error) {
            console.log("Error: ", error)
        },
        onSuccess() {
            setIsMinting(false)
            setMinted(true)
            setTimeout(() => {
                setMinted(false)
            }, 5000)
        }
    })

    return (
        <div className='flex flex-col space-y-2 items-center justify-center'>
            {data &&
                <TxHash hash={data?.hash} />
            }
            <button className='p-4 bg-acid text-white hover:bg-dark-acid' type='button' onClick={async () => {
                const tokenUri = await uploadMetadataToIPFS(metadata)
                isVial && numVials && vialPrice ? createVials?.({
                    recklesslySetUnpreparedArgs: [tokenUri, numVials, { value: (vialPrice.mul(BigNumber.from(numVials))), gasPrice: feeData?.gasPrice }]
                }) :
                    createToken?.({
                        recklesslySetUnpreparedArgs: [tokenUri, { gasPrice: feeData?.gasPrice }]
                    })
            }}>
                Mint
            </button>
        </div>
    )
}

export default MintButton