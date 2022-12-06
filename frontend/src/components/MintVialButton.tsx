import { useState } from 'react'
import vialContractInfo from "@abi/vial.json"
import TxHash from '@components/TxHash'
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite, useContractRead, useFeeData, useBalance, useAccount } from 'wagmi'
import { CollectionMetadataURL, ConceptMetadataURL, RemixMetadataURL, FreestyleMetadataURL } from "@utils/metadata"
import { BigNumber } from 'ethers'
import { useVials } from '@hooks/useVials'
import SolidButton from '@components/SolidButton'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import Toast from '@components/Toast'

type Props = {
    index: number;
    numberOfVials: number;
    style: "concept" | "collection" | "remix" | "freestyle" | undefined;
}

function MintVialButton({ index, numberOfVials, style }: Props) {

    const [vialPrice, setVialPrice] = useState<BigNumber>()
    const [isMinting, setIsMinting] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { address } = useAccount()
    const { data: feeData } = useFeeData()
    const { data: balance } = useBalance({ address })
    const { refetchVials } = useVials()
    const txValue = (vialPrice?.mul(BigNumber.from(numberOfVials)))?.add(BigNumber.from(500000000000000))

    const tokenURI =
        style === "remix" ? RemixMetadataURL :
            style === "concept" ? `${ConceptMetadataURL}/${index}.json` :
                style === "collection" ? `${CollectionMetadataURL}/${index}.json` :
                    style === "freestyle" ? FreestyleMetadataURL : ""

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
        args: [tokenURI, numberOfVials, { value: vialPrice?.mul(BigNumber.from(numberOfVials)), gasPrice: feeData?.gasPrice }],
    })

    const { write: mintVials, data: vialData } = useContractWrite({
        ...config,
        onError: (error) => {
            console.log(error)
            setIsMinting(false)
            setIsLoading(false)
        },
        onSuccess: () => {
            setIsMinting(true)
        }
    })


    useWaitForTransaction({
        hash: vialData?.hash,
        onError(error) {
            console.log(error)
            setIsMinting(false)
            setIsLoading(false)
        },
        onSuccess() {
            setIsMinting(false)
            setIsLoading(false)
            refetchVials()
        }
    })

    const notEnoughBalanceMessage = "You don't have enough balance to mint this vial and pay for tx fees"

    return (
        <div className='py-4'>
            <div className='flex flex-col space-y-4 items-center justify-evenly pt-3'>
                <SolidButton type='submit' color="green" onClick={() => {
                    if (balance?.value && txValue && balance?.value.lt(txValue)) {
                        toast.custom((t) => <Toast toastInfo={t} message={notEnoughBalanceMessage} error />)
                        return
                    }
                    setIsLoading(true)
                    mintVials?.()
                }} className="bg-acid text-white" text='Mint' loading={isLoading} />
            </div>
            {isMinting &&
                <div className='mt-4'><TxHash className='text-black' hash={`${vialData?.hash}`} /></div>}
        </div>
    )
}

export default MintVialButton