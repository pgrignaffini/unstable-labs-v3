import type { Vial } from "../types/types"
import { useState } from "react"
import vialContractInfo from "@abi/vial.json"
import { usePrepareContractWrite, useContractWrite } from "wagmi"
import type { SendTransactionResult } from "@wagmi/core"

type Props = {
    vialToBurn: Vial | undefined
}

export const useBurnVial = ({ vialToBurn }: Props) => {

    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [isError, setIsError] = useState<Error | undefined>(undefined)
    const [isPending, setIsPending] = useState<boolean>(false)
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
        onMutate() {
            setIsPending(true)
            setIsError(undefined)
            setIsSuccess(false)
        },
        onError(error) {
            setIsError(error)
            setIsPending(false)
            setIsSuccess(false)
        },
        onSuccess(data) {
            setBurnData(data)
            setIsSuccess(true)
            setIsPending(false)
            setIsError(undefined)
        }
    })

    return { burnData, setBurnData, burnVial, isSuccess, isError, isPending }
}