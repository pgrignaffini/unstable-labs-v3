import { useState, useEffect, useContext } from 'react'
import type { Vial, Request } from "../types/types"
import SolidButton from '@components/SolidButton';
import type { FormEvent } from "react";
import { useVials } from '@hooks/useVials';
import { groupBy } from '@utils/helpers';
import { useBurnVial } from '@hooks/useBurnVial';
import TxHash from '@components/TxHash';
import { useWaitForTransaction } from 'wagmi';
import { image2Image, text2Image } from '@utils/stableDiffusion'
import { useLoadingImages } from '@hooks/useLoadingImages';
import { useLoggedUser } from '@hooks/useLoggedUser';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import AppContext from "@context/AppContext";

function Prompt() {

    const { data: session } = useSession()
    const { selectedImage, setRequest, selectedImages } = useContext(AppContext)
    const { vials, refetchVials, isLoading } = useVials()
    const groupedVials = vials ? groupBy(vials, 'style') : []
    const [vialToBurn, setVialToBurn] = useState<Vial | undefined>(undefined);
    const [prompt, setPrompt] = useState<string>('')
    const [promptState, setPromptState] = useState<"remix" | "freestyle" | "std">("std")
    const [promptError, setPromptError] = useState<string | undefined>(undefined)
    const [originalStyleToRemix, setOriginalStyleToRemix] = useState<string | undefined>(undefined)
    const [originalPrompt, setOriginalPrompt] = useState<string | undefined>(undefined)

    const { hasClaimedVials, user } = useLoggedUser()

    const { burnData, burnVial, setBurnData, isPending } = useBurnVial({ vialToBurn })
    const { progressData, isLoading: isLoadingImages } = useLoadingImages()

    useEffect(() => {
        if (selectedImage) {
            const remixVials = groupedVials["remix"]
            if (!remixVials?.length) setPromptError("No remix vials available")
            if (remixVials?.length) {
                setVialToBurn(remixVials[0])
            }
        }
        else if (!selectedImage &&
            vialToBurn?.style === "remix") {
            setVialToBurn(undefined)
            setPromptState("std")
        }
        else {
            setPromptState("std")
            setPromptError(undefined)
        }
    }, [selectedImage])

    useEffect(() => {
        if (vialToBurn?.style === "freestyle") {
            setPromptState("freestyle")
            setPromptError(undefined)
        }
        else if (vialToBurn?.style === "remix") {
            setPromptState("remix")
        }
        else {
            setPromptState("std")
            setPromptError(undefined)
        }
    }, [vialToBurn])

    useEffect(() => {
        if (!selectedImages?.length) {
            setPromptState("std")
        }
    }, [selectedImages])

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!vialToBurn) return
        burnVial?.()
    }

    const handleFreestyle = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!prompt) return
        const req: Request = await text2Image(prompt, "")
        setRequest(req)
    }

    const { isLoading: isLoadingTx } = useWaitForTransaction({
        hash: burnData?.hash,
        enabled: !!burnData?.hash,
        onSuccess: async () => {
            if (vialToBurn?.style !== "remix") {
                setOriginalStyleToRemix(vialToBurn?.style as string)
                setOriginalPrompt(prompt)
            }
            const req: Request = promptState === "remix" ?
                await image2Image(originalPrompt!, originalStyleToRemix!, selectedImage!) :
                await text2Image(prompt, vialToBurn?.style as string)
            setRequest(req)
            setVialToBurn(undefined)
            setBurnData(undefined)
            refetchVials()
        }
    })

    const selectVialModal = (
        <>
            <input type="checkbox" id="select-vial-modal" className="modal-toggle" />
            <div className="modal">
                <div className="w-full lg:w-1/3 h-full">
                    <label htmlFor="select-vial-modal" className="text-2xl text-white cursor-pointer"
                        onClick={() => { setVialToBurn(undefined); setPromptState("std") }}>X</label>
                    <div className={`bg-gray-400 bg-opacity-50 h-4/5 backdrop-blur-xl p-8 relative ${vials?.length ? "overflow-y-scroll" : null}`} >
                        {vials?.length ? <div className="flex flex-col space-y-4 ">
                            {Object.keys(groupedVials).map((key, index) => {
                                const vials = groupedVials[key]
                                return (
                                    <div key={index} onClick={() => {
                                        setVialToBurn?.(vials[0] as Vial)
                                    }}>
                                        {key !== "remix" &&
                                            <div className={`${vialToBurn === (vials[0] as Vial) ? "border-4 border-acid" : "border-2"} cursor-pointer hover:bg-gray-400`}>
                                                <div className="p-2 flex items-center justify-between">
                                                    <img className='w-12 h-16 object-contain' src={vials[0].image} alt="image" />
                                                    <p className='text-black text-[0.7rem] whitespace-normal'>{vials[0].name}</p>
                                                    {vials.length && <p className=' text-black text-[0.7rem]'>{vials.length}x</p>}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                            <div className="w-full flex justify-center">
                                {(isLoading) ?
                                    <img src="/flask.png" className="animate-tremble w-8" />
                                    : null}
                            </div>
                            <div className="flex justify-end sticky bottom-4 ">
                                <label htmlFor="select-vial-modal"
                                    className="p-2 border-acid bg-gray-500 border-2 w-fit text-md sticky text-white cursor-pointer hover:bg-slate-400">Select</label>
                            </div>
                        </div> : <div className="flex flex-col space-y-4 justify-center items-center">
                            <p className="text-white text-lg">It seems there aren&apos;t any vials here...go grab some in the{' '}
                                <Link href="/brewery" className="underline text-acid">Brewery!</Link></p>
                        </div>}
                        {/* {!session &&
                            <>
                                <p className="text-md text-white">Did you know that by logging in with Discord you can claim a <span className="text-acid font-xl">FREE</span> vial airdrop?</p>
                                <p className="text-md text-white">The airdrop consists of: <br />
                                    <ul>
                                        <li>2x Remix Vials</li>
                                        <li>1x Freestyle Vial</li>
                                        <li>3x Random Vials</li>
                                    </ul></p>
                                <p className="text-md text-white">After a successful login go to the bottom of the page to claim it!</p>
                            </>} */}
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <>
            {selectVialModal}
            <div className="flex items-center justify-between w-full">
                <img src="/pc-animated-left.gif" alt="pc-animated-left" className="hidden lg:inline lg:w-48 lg:h-48" />
                <div className={`${promptState === "remix" ? "bg-blue-400" : promptState === "freestyle" ? "bg-red-300" : "bg-gray-400"} p-6 mx-auto relative`}>
                    <img src="/cat-animated.gif" alt="cat-animated" className="w-20 absolute -top-16 right-2 " />
                    <div className="flex items-center space-x-3 justify-between">
                        <label htmlFor="select-vial-modal" className="cursor-pointer" >
                            {vialToBurn ? <img src={vialToBurn.image} alt="vial" className="h-12 w-12 object-contain border-2 border-black" /> :
                                <SolidButton color="green" text="Press Me!" className='w-16 text-white text-[0.6rem]' rounded label="select-vial-modal" onClick={() => refetchVials()} />
                            }
                        </label>
                        {vialToBurn && <p className="hidden lg:inline text-[0.7rem] w-24 whitespace-pre-line text-black">{vialToBurn.name}</p>}
                        {vialToBurn && promptState !== "remix" && promptState !== "freestyle" ?
                            <form className='flex space-x-5 items-center' onSubmit={(e) => {
                                handleSubmit(e)
                            }}>
                                <input onChange={(e) => setPrompt(e.target.value)} className='w-fit p-4 bg-white text-black outline-none' required placeholder="prompt..." />
                                <SolidButton loading={isPending || isLoadingTx || isLoadingImages} color="green" text="Brew" type="submit" className='text-white' />
                            </form> :
                            vialToBurn && promptState === "remix" && selectedImage?.length ? (
                                <form className='flex space-x-5 items-center' onSubmit={(e) => {
                                    handleSubmit(e)
                                }}>
                                    <input className='w-fit p-4 bg-blue-300 placeholder:text-white outline-none' disabled placeholder="remixing current img" />
                                    <SolidButton loading={isPending || isLoadingTx || isLoadingImages} color="blue" text="Brew" type="submit" className='text-white' />
                                </form>
                            ) : vialToBurn && promptState === "freestyle" ? (
                                <form className='flex space-x-5 items-center' onSubmit={(e) => {
                                    handleFreestyle(e)
                                }}>
                                    <input onChange={(e) => setPrompt(e.target.value)} className='w-fit p-4 bg-white text-black outline-none' required placeholder="prompt..." />
                                    <SolidButton loading={isLoadingImages} color="red" text="Brew" type="submit" className='text-white' />
                                </form>
                            ) :
                                <div className='w-full'>
                                    <p className='p-4 bg-gray-600 text-white outline-none text-sm lg:text-md'>Select a vial to start...</p>
                                    {promptError && <p className="text-red-700 text-[0.6rem] text-center">{promptError}</p>}
                                </div>}
                    </div>
                </div>
                <img src="/pc-animated-left.gif" alt="pc-animated-right" className="hidden lg:inline lg:w-48 lg:h-48 lg:-scale-x-95" />
            </div>
            <div className="container mx-auto mt-4">
                {vialToBurn && vialToBurn.style !== "remix" && vialToBurn.style !== "freestyle" && !progressData?.eta_relative &&
                    <div className="flex flex-col space-y-4">
                        <p className="text-center text-sm lg:text-md">Like this pic?</p>
                        <img src={vialToBurn?.preview} alt="preview" className="mx-auto w-1/2 lg:w-1/4" />
                    </div>}
            </div>
            <div className="container mx-auto">
                {burnData?.hash && <TxHash className="text-center text-md text-white" hash={burnData?.hash} />}
                {isLoadingImages &&
                    <div className="flex flex-col space-y-4 items-center justify-center">
                        <img src="/flask-combining.gif" alt="loading" className="w-32 lg:w-64" />
                        {progressData?.eta_relative ?
                            <p className="text-sm text-center">Wait time: {progressData.eta_relative.toFixed(0)}s</p>
                            :
                            <p className="text-sm text-center">We are fetching your images, hang in there!</p>}
                    </div>}
            </div>
        </>
    )
}

export default Prompt