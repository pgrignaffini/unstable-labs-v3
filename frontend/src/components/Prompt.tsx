import { useState, useEffect } from 'react'
import type { Vial } from "../types/types"
import SolidButton from '@components/SolidButton';
import { usePrepareContractWrite, useContractWrite } from "wagmi"
import type { SendTransactionResult } from "@wagmi/core"
import vialContractInfo from "@abi/vial.json"
import { FormEvent, SetStateAction, Dispatch } from "react";
import { useVials } from '@hooks/useVials';
import { groupBy } from '@utils/helpers';

type Props = {
    setBurnData: Dispatch<SetStateAction<SendTransactionResult | undefined>>
}

// TO-DO: implement this component and replace it in index.tsx

function Prompt({ setBurnData }: Props) {

    const { vials, refetchVials } = useVials()
    const groupedVials = vials ? groupBy(vials, 'style') : []
    const [vialToBurn, setVialToBurn] = useState<Vial | undefined>(undefined);
    const [selectedImages, setSelectedImages] = useState<string[]>([])
    const [selectedImage, setSelectedImage] = useState<string>("")
    const [prompt, setPrompt] = useState<string>('')
    const [promptState, setPromptState] = useState<"remix" | "freestyle" | "std">("std")
    const [promptError, setPromptError] = useState<string | undefined>(undefined)

    useEffect(() => {
        // to replace with remix vial
        if (selectedImage) {
            // setSelectedImage(selectedImages[0] as string)
            const remixVials = groupedVials["remix"]
            if (!remixVials.length) setPromptError("No remix vials available")
            if (remixVials?.length) setVialToBurn(remixVials[0])
        }
        else if (!selectedImage &&
            vialToBurn?.name === "Remix Vial") {
            setVialToBurn(undefined)
        }
    }, [selectedImage])

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
        onSuccess(data) {
            setBurnData(data)
        }
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!vialToBurn) return
        burnVial?.()
    }

    return (
        <div className={`${selectedImage ? "bg-blue-400" : "bg-gray-400"} p-6 mx-auto row-start-3 col-start-3`}>
            <div className="flex items-center space-x-3 justify-between">
                <label htmlFor="select-vial-modal" className="cursor-pointer" >
                    {vialToBurn ? <img src={vialToBurn.image} alt="vial" className="h-12 w-12 object-contain border-2 border-black" /> :
                        <SolidButton text="Press Me!" className='w-16 text-white text-[0.6rem]' rounded label="select-vial-modal" onClick={() => refetchVials()} />
                    }
                </label>
                {vialToBurn && <p className="text-[0.7rem] w-24 whitespace-pre-line text-black">{vialToBurn.name}</p>}
                {vialToBurn && vialToBurn.name !== "Remix Vial" ?
                    <form className='flex space-x-5 items-center' onSubmit={(e) => {
                        setPromptState("std")
                        handleSubmit(e)
                    }}>
                        <input onChange={(e) => setPrompt(e.target.value)} className='w-full p-4 bg-white text-black outline-none font-pixel' required placeholder="prompt..." />
                        <SolidButton text="Brew" type="submit" className='text-white' />
                        {/* <button type="submit" className="p-4 bg-acid text-white">Brew</button> */}
                    </form> : vialToBurn && vialToBurn.name === "Remix Vial" && selectedImage.length ? (
                        <form className='flex space-x-5 items-center' onSubmit={(e) => {
                            setPromptState("remix")
                            handleSubmit(e)
                        }}>
                            <button type="submit" className="p-4 bg-blue-600 text-white">Remix</button>
                        </form>
                    ) :
                        <p className="text-sm lg:text-md 2xl:text-lg text-center text-white bg-gray-600 px-4 py-6 shadow-md">Select a vial to start</p>}
            </div>
        </div>
    )
}

export default Prompt