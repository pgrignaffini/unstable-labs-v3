import { type NextPage } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import { FormEvent } from "react";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from "wagmi"
import vialContractInfo from "@abi/vial.json"
import type { Vial, Request, Progress } from "../types/types"
import { useQuery } from 'react-query'
import { checkProgress, getImages, text2Image, image2Image } from "@utils/stableDiffusion"
import type { SendTransactionResult } from "@wagmi/core"
import { groupBy } from '@utils/helpers'
import TxHash from "@components/TxHash";
import ResultGrid from "@components/ResultGrid";
import { useVials } from "@hooks/useVials";
import VialSelectionContainer from "@components/VialSelectionContainer";
import MintExperimentButton from "@components/MintExperimentButton";
import SolidButton from "@components/SolidButton";
import Link from "next/link";
import Airdrop from "@components/Airdrop";
import { useLoggedUser } from "@hooks/useLoggedUser";

const Home: NextPage = () => {

  const { user } = useLoggedUser()
  const { vials, refetchVials } = useVials()
  const groupedVials = vials ? groupBy(vials, 'style') : []
  const [vialToBurn, setVialToBurn] = useState<Vial | undefined>(undefined);
  const [request, setRequest] = useState<Request | undefined>(undefined)
  const [progress, setProgress] = useState<Progress | undefined>(undefined)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [prompt, setPrompt] = useState<string>('')
  const [burnData, setBurnData] = useState<SendTransactionResult | undefined>(undefined)
  const [originalStyleToRemix, setOriginalStyleToRemix] = useState<string | undefined>(undefined)
  const [originalPrompt, setOriginalPrompt] = useState<string | undefined>(undefined)
  const [promptState, setPromptState] = useState<"remix" | "freestyle" | "std">("std")
  const [promptError, setPromptError] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!selectedImage.length) {
      setPromptState("std")
      setPromptError(undefined)
    }
    if (selectedImage) {
      const remixVials = groupedVials["remix"]
      if (!remixVials?.length) setPromptError("No remix vials available")
      if (remixVials?.length) {
        setPromptState("remix")
        setVialToBurn(remixVials[0])
      }
    }
    else if (!selectedImage &&
      vialToBurn?.name === "Remix Vial") {
      setVialToBurn(undefined)
    }

  }, [selectedImage])

  const { data: progressData } = useQuery("progress", () => checkProgress(request as Request), {
    enabled: !!request && (progress?.state.done === false || progress === undefined),
    refetchInterval: 1000,
    onSuccess(data) {
      setProgress(data)
    },
  })

  const { data: images, isLoading: isLoadingImages } = useQuery("images", () => getImages(request as Request), {
    enabled: !!progress && !!request && progress.state.done,
    onSuccess: () => {
      setRequest(undefined)
      setProgress(undefined)
    }
  })

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

  const handleFreeStyle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!prompt) return
    const req: Request = await text2Image(prompt, "")
    setRequest(req)
  }


  useWaitForTransaction({
    hash: burnData?.hash,
    enabled: !!burnData?.hash,
    onSuccess: async () => {
      if (vialToBurn?.name !== "Remix Vial") {
        setOriginalStyleToRemix(vialToBurn?.style as string)
        setOriginalPrompt(prompt)
      }
      const req: Request = promptState === "remix" ?
        await image2Image(originalPrompt!, originalStyleToRemix!, selectedImage) :
        await text2Image(prompt, vialToBurn?.style as string)
      setRequest(req)
      setVialToBurn(undefined)
      setBurnData(undefined)
      refetchVials()
    }
  })

  const removeImage = (index: number) => {
    if (selectedImage === selectedImages[index]) setSelectedImage('')
    setSelectedImages(selectedImages.filter((_, i) => i !== index))
  }

  console.log("promptState", promptState)

  const selectVialModal = (
    <>
      <input type="checkbox" id="select-vial-modal" className="modal-toggle" />
      <div className="modal">
        <div className={`w-1/3 h-2/3 ${vials?.length ? "overflow-y-scroll" : null} `}>
          <label htmlFor="select-vial-modal" className="font-pixel text-2xl text-white cursor-pointer"
            onClick={() => setVialToBurn(undefined)}>X</label>
          <div className="bg-gray-400 bg-opacity-50 backdrop-blur-xl p-8 relative">
            {vials?.length ? <div className="flex flex-col space-y-4 ">
              {Object.keys(groupedVials).map((key, index) => {
                const vials = groupedVials[key]
                return (
                  <div key={index} onClick={() => {
                    setVialToBurn?.(vials[0] as Vial)
                    if (key === "freestyle") {
                      setPromptState("freestyle")
                    }
                    else {
                      setPromptState("std")
                    }
                  }}>
                    <VialSelectionContainer selected={vialToBurn === (vials[0] as Vial)} vial={vials[0]} multiple={vials.length} />
                  </div>
                )
              })}
              <div className="flex justify-end sticky bottom-4 ">
                <label htmlFor="select-vial-modal"
                  className="p-2 border-acid bg-gray-700 border-2 w-fit font-pixel text-lg sticky text-white cursor-pointer hover:bg-slate-400">Select</label>
              </div>
            </div> : <div className="flex flex-col space-y-4 justify-center items-center">
              <p className="text-white text-lg">It seems there aren&apos;t any vials here...go grab some in the{' '}
                <Link href="/collections" className="underline text-acid">Brewery!</Link></p>
              {user && !user.hasClaimedVials &&
                <>
                  <p className="text-md text-white">Did you know that by logging in with Discord you can claim a <span className="text-acid font-xl">FREE</span> vial airdrop?</p>
                  <p className="text-md text-white">The airdrop consists of: <br />
                    <ul>
                      <li>2x Remix Vials</li>
                      <li>1x Freestyle Vial</li>
                      <li>3x Random Vials</li>
                    </ul></p>
                  <p className="text-md text-white">After a successful login go to the bottom of the page to claim it!</p>
                </>}
            </div>}
          </div>
        </div>
      </div>
    </>
  )


  return (
    <>
      <Head>
        <title>UnstableLabs</title>
        <meta name="description" content="" />
        <link rel="icon" href="/flask.png" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center space-y-10 justify-center p-4">
        {selectVialModal}
        <div className="relative w-full">
          <img src="/lab-top.png" alt="lab-top" className="w-full" />
          <div className="w-full absolute bg-black bottom-1/2 ">
            <p className="font-bold text-3xl text-white text-center">Welcome to <span className="text-acid">Unstable</span>Labs!</p>
            <p className="font-bold text-lg text-gray-400 text-center">a lab to brew AI-generated NFTs</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center ">
          <p className="font-bold text-3xl text-white">Step into the Lab!</p>
          <p className="text-[0.6rem]">Don&apos;t know where to find some Aurora ETH? Check out <Link href="https://aurora.dev/faucet" target="_blank" className="underline text-acid">here</Link></p>
        </div>
        <div className="flex items-center justify-between w-full">
          <img src="/pc-animated-left.gif" alt="pc-animated-left" className="w-48 h-48" />
          <div className={`${promptState === "remix" ? "bg-blue-400" : promptState === "freestyle" ? "bg-red-300" : "bg-gray-400"} p-6 mx-auto row-start-3 col-start-3`}>
            <div className="flex items-center space-x-3 justify-between">
              <label htmlFor="select-vial-modal" className="cursor-pointer" >
                {vialToBurn ? <img src={vialToBurn.image} alt="vial" className="h-12 w-12 object-contain border-2 border-black" /> :
                  <SolidButton color="green" text="Press Me!" className='w-16 text-white text-[0.6rem]' rounded label="select-vial-modal" onClick={() => refetchVials()} />
                }
              </label>
              {vialToBurn && <p className="text-[0.7rem] w-24 whitespace-pre-line text-black">{vialToBurn.name}</p>}
              {vialToBurn && vialToBurn.name !== "Remix Vial" && vialToBurn.name !== "Freestyle Vial" ?
                <form className='flex space-x-5 items-center' onSubmit={(e) => {
                  setPromptState("std")
                  handleSubmit(e)
                }}>
                  <input onChange={(e) => setPrompt(e.target.value)} className='w-full p-4 bg-white text-black outline-none font-pixel' required placeholder="prompt..." />
                  <SolidButton color="green" text="Brew" type="submit" className='text-white' />
                  {/* <button type="submit" className="p-4 bg-acid text-white">Brew</button> */}
                </form> : vialToBurn && vialToBurn.name === "Remix Vial" && selectedImage.length ? (
                  <form className='flex space-x-5 items-center' onSubmit={(e) => {
                    setPromptState("remix")
                    handleSubmit(e)
                  }}>
                    <SolidButton color="blue" text="Remix" type="submit" className='text-white' />
                  </form>
                ) : vialToBurn && vialToBurn.name === "Freestyle Vial" ? (
                  <form className='flex space-x-5 items-center' onSubmit={(e) => {
                    handleFreeStyle(e)
                  }}>
                    <input onChange={(e) => setPrompt(e.target.value)} className='w-full p-4 bg-white text-black outline-none font-pixel' required placeholder="prompt..." />
                    <SolidButton color="red" text="Freestyle" type="submit" className='text-white' />
                  </form>
                ) :
                  <div>
                    <p className="text-sm lg:text-md 2xl:text-lg text-center text-white bg-gray-600 px-4 py-6 shadow-md">Select a vial to start</p>
                    {promptError && <p className="text-red-700 text-[0.6rem] text-center">{promptError}</p>}
                  </div>}
            </div>
          </div>
          <img src="/pc-animated-right.gif" alt="pc-animated-left" className="w-48 h-48" />
        </div>
        {vialToBurn && !progressData?.eta_relative &&
          <div className="container mx-auto flex flex-col space-y-4">
            <p className="text-center">Like this pic?</p>
            <img src={vialToBurn?.preview} alt="preview" className="mx-auto w-1/6" />
          </div>}
        <div className="container mx-auto">
          {selectedImages.length > 0 ?
            <div className='bg-gray-400 p-4 overflow-x-auto flex space-x-4'>
              {selectedImages.map((image, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <div className="relative" >
                    <p className='absolute -top-4 left-0 text-2xl text-red-500 cursor-pointer' onClick={() => removeImage(index)}>X</p>
                    <img onClick={() => {
                      image === selectedImage ? setSelectedImage("") : setSelectedImage(image)
                    }
                    } src={"data:image/.webp;base64," + image} alt="images" className={`h-32 w-32 object-contain cursor-pointer ${selectedImage === image ? "border-4 border-acid" : null}`} />
                  </div>
                  <MintExperimentButton
                    className="p-2 text-[0.8rem] text-white text-center bg-acid cursor-pointer"
                    id={index.toString()} image={image} />
                </div>
              ))}
            </div> : null
          }
        </div>
        <div className="container mx-auto">
          {burnData?.hash && <TxHash className="text-center text-md text-white" hash={burnData?.hash} />}
          {progressData?.eta_relative ?
            <div className="flex flex-col space-y-4 items-center justify-center">
              <p className="text-sm text-center">Wait time: {progressData.eta_relative.toFixed(0)}s</p>
              <img src="/flask-combining.gif" alt="loading" className="w-64" />
            </div>
            : null}
          {isLoadingImages ? <div className="flex flex-col space-y-4 items-center justify-center">
            <img src="/flask-combining.gif" alt="loading" className="w-64" />
            <p className="text-sm text-center">We are fetching your images, hang in there!</p>
          </div> : null}
          {images ? <ResultGrid selectedImages={selectedImages} setSelectedImages={setSelectedImages} images={images} /> : null}
        </div>
        <div className="relative w-full">
          <img src="/lab-bottom.png" className="w-full" />
          <div className="w-full absolute p-4 bottom-1/3 ">
            <Airdrop />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

// const AuthShowcase: FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-2">
//       {sessionData && (
//         <p className="text-2xl text-blue-500">
//           Logged in as {sessionData?.user?.name}
//         </p>
//       )}
//       {secretMessage && (
//         <p className="text-2xl text-blue-500">{secretMessage}</p>
//       )}
//       <button
//         className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
//         onClick={sessionData ? () => signOut() : () => signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };


