import { Vial } from "../types/types"
import { useState } from "react"
import vialContractInfo from "@abi/vial.json"
import { usePrepareContractWrite, useContractWrite } from "wagmi"
import { SendTransactionResult } from "@wagmi/core"

type Props = {
    vialToBurn: Vial | undefined
}

export const useBurnVial = ({ vialToBurn }: Props) => {

    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [isError, setIsError] = useState<Error | undefined>(undefined)
    const [burnData, setBurnData] = useState<SendTransactionResult | undefined>(undefined)

    const { config } = usePrepareContractWrite({
        address: vialContractInfo.address,
        abi: vialContractInfo.abi,
        functionName: 'burnVial',
        args: [vialToBurn?.tokenId],
        enabled: !!vialToBurn,
        onSuccess(data) {
            console.log('Success', data)
        },
        onError(error) {
            console.log('Error', error)
        }
    })

    const { write: burnVial } = useContractWrite({
        ...config,
        onError(error) {
            setIsError(error)
        },
        onSuccess(data) {
            setBurnData(data)
            setIsSuccess(true)
        }
    })

    return { burnData, setBurnData, burnVial, isSuccess, isError }
}