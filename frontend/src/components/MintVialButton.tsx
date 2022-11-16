import React from 'react'
import vialContractInfo from "@abi/vial.json"
import TxHash from '@components/TxHash'
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite, useContractRead, useFeeData } from 'wagmi'
import { CollectionMetadataURL, ConceptMetadataURL, RemixMetadataURL } from "@utils/metadata"
import { BigNumber } from 'ethers'
import { useVials } from '@hooks/useVials'

type Props = {
    index: number;
    numberOfVials: number;
    type: "concept" | "collection" | "remix" | undefined;
}

function MintVialButton({ index, numberOfVials, type }: Props) {

    const [vialPrice, setVialPrice] = React.useState<BigNumber>()
    const [isMinting, setIsMinting] = React.useState<boolean>(false)
    const { data: feeData } = useFeeData()
    const { refetchVials } = useVials()

    const tokenURI = type === "remix" ? RemixMetadataURL : type === "concept" ? `${ConceptMetadataURL}/${index}.json` : type === "collection" ? `${CollectionMetadataURL}/${index}.json` : ''

    useContractRead({
        address: vialContractInfo.address,
        abi: vialContractInfo.abi,
        functionName: "getVialPrice",
        onSuccess: (data) => {
            const vialPrice = BigNumber.from(data)
            setVialPrice(vialPrice)
        }
    })

    const { config } = usePrepareContractWrite({
        address: vialContractInfo.address,
        abi: vialContractInfo.abi,
        functionName: 'mintVials',
        args: [tokenURI, numberOfVials, { value: (vialPrice?.mul(BigNumber.from(numberOfVials))), gasPrice: feeData?.gasPrice }],
        onSuccess: () => {
            setIsMinting(false)
        },
        onError: () => {
            setIsMinting(false)
        }
    })

    const { write: mintVials, data: vialData } = useContractWrite(config)

    useWaitForTransaction({
        hash: vialData?.hash,
        onError(error) {
            console.log("Error: ", error)
        },
        onSuccess() {
            setIsMinting(false)
            refetchVials()
        }
    })


    return (
        <div className='flex flex-col space-y-2 items-center justify-center'>
            <button className='p-4 bg-acid text-white hover:bg-dark-acid' type='button' onClick={() => mintVials?.()}>
                Mint
            </button>
            {vialData && <TxHash className='text-black' hash={vialData?.hash} />}
        </div>
    )
}

export default MintVialButton