import { type NextPage } from "next";
import React from "react";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount } from "wagmi"
import vialContractInfo from "@abi/vial.json"
import type { Vial, Style, Request, Progress } from "../types/types"
import { useQuery } from 'react-query'
import { checkProgress, getImages, text2Image, image2Image } from "@utils/stableDiffusion"
import type { SendTransactionResult } from "@wagmi/core"
import { trpc } from "../utils/trpc";
import { groupBy } from '@utils/helpers'
import TxHash from "@components/TxHash";
import ResultGrid from "@components/ResultGrid";
import { useVials } from "@hooks/useVials";
import VialSelectionContainer from "@components/VialSelectionContainer";
import MintExperimentButton from "@components/MintExperimentButton";

const Home: NextPage = () => {

  const { vials, refetchVials } = useVials()
  const groupedVials = vials ? groupBy(vials, 'style') : []
  const [vialToBurn, setVialToBurn] = React.useState<Vial | undefined>(undefined);
  const [request, setRequest] = React.useState<Request | undefined>(undefined)
  const [progress, setProgress] = React.useState<Progress | undefined>(undefined)
  const [selectedImages, setSelectedImages] = React.useState<string[]>([])
  const [selectedImage, setSelectedImage] = React.useState<string>("")
  const [prompt, setPrompt] = React.useState<string>('')
  const [burnData, setBurnData] = React.useState<SendTransactionResult | undefined>(undefined)
  const [originalStyleToRemix, setOriginalStyleToRemix] = React.useState<string | undefined>(undefined)
  const [originalPrompt, setOriginalPrompt] = React.useState<string | undefined>(undefined)
  const [isRemixing, setIsRemixing] = React.useState<boolean>(false)

  React.useEffect(() => {
    // to replace with remix vial
    if (selectedImages.length > 0) {
      setSelectedImage(selectedImages[0] as string)
      const remixVials = groupedVials["space-hologram-collection"]
      setVialToBurn(remixVials[0])
    }
    else if (selectedImages.length === 0 &&
      vialToBurn?.name === "Space Hologram Vial") {
      setVialToBurn(undefined)
    }
  }, [selectedImages])

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!vialToBurn) return
    burnVial?.()
  }

  useWaitForTransaction({
    hash: burnData?.hash,
    enabled: !!burnData?.hash,
    onSuccess: async () => {
      if (vialToBurn?.name !== "Space Hologram Vial") {
        setOriginalStyleToRemix(vialToBurn?.style as string)
        setOriginalPrompt(prompt)
      }
      const req: Request = isRemixing ?
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

  const selectVialModal = (
    <>
      <input type="checkbox" id="select-vial-modal" className="modal-toggle" />
      <div className="modal">
        <div className="w-1/3 h-1/2">
          <label htmlFor="select-vial-modal" className="font-pixel text-2xl text-white cursor-pointer"
            onClick={() => setVialToBurn(undefined)}>X</label>
          <div className="bg-gray-400 bg-opacity-50 backdrop-blur-xl p-8">
            <div className="flex flex-col space-y-4 overflow-y-scroll">
              {Object.keys(groupedVials).map((key, index) => {
                const vials = groupedVials[key]
                return (vials.length > 0 &&
                  <div key={index} onClick={() => setVialToBurn?.(vials[0] as Vial)}>
                    <VialSelectionContainer selected={vialToBurn === (vials[0] as Vial)} vial={vials[0]} multiple={vials.length} />
                  </div>
                )
              })}
              <div className="flex sm:text-center justify-end">
                <label htmlFor="select-vial-modal"
                  className="p-2 border-acid border-2 w-fit font-pixel text-lg text-white cursor-pointer hover:bg-slate-400">Select</label>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )


  return (
    <>
      <Head>
        <title>UnstableLabs</title>
        <meta name="description" content="Generated by create-t3-app" />
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
        <div className="flex mt-10 justify-center items-center ">
          <p className="font-bold text-3xl text-white">Step into the Lab!</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <img src="/pc-animated-left.gif" alt="pc-animated-left" className="w-48 h-48" />
          <div className={`${selectedImages.length > 0 ? "bg-blue-400" : "bg-gray-400"} p-6 mx-auto row-start-3 col-start-3`}>
            <div className="flex items-center space-x-3 justify-between">
              <label htmlFor="select-vial-modal" className="cursor-pointer" >
                <div className="h-12 w-12 border-2 border-acid bg-white">
                  {vialToBurn ? <img src={vialToBurn.image} alt="vial" className="pb-1 h-12 w-12 object-contain" /> : <p className="text-black pt-2 text-[0.55rem]">Press Me!</p>}
                </div>
              </label>
              {vialToBurn && <p className="text-[0.7rem] text-black">{vialToBurn.name}</p>}
              {/* this should be the remix vial */}
              {vialToBurn && vialToBurn.name !== "Space Hologram Vial" ?
                <form className='flex space-x-5 items-center' onSubmit={(e) => {
                  setIsRemixing(false)
                  handleSubmit(e)
                }}>
                  <input onChange={(e) => setPrompt(e.target.value)} className='w-full p-4 bg-white text-black outline-none font-pixel' required placeholder="prompt..." />
                  <button type="submit" className="p-4 bg-acid text-white">Brew</button>
                </form> : vialToBurn && vialToBurn.name === "Space Hologram Vial" && selectedImage.length ? (
                  <form className='flex space-x-5 items-center' onSubmit={(e) => {
                    setIsRemixing(true)
                    handleSubmit(e)
                  }}>
                    <button type="submit" className="p-4 bg-blue-600 text-white">Remix</button>
                  </form>
                ) :
                  <p className="text-sm text-center text-dark-acid">Select a vial to start</p>}
            </div>
          </div>
          <img src="/pc-animated-right.gif" alt="pc-animated-left" className="w-48 h-48" />
        </div>
        <div className="container mx-auto">
          {selectedImages.length > 0 ?
            <div className='bg-gray-400 p-4 overflow-x-auto flex space-x-4'>
              {selectedImages.map((image, index) => (
                <div key={index} className="flex flex-col space-y-2">
                  <div className="relative" >
                    <p className='absolute -top-4 left-0 text-2xl text-red-500 cursor-pointer' onClick={() => removeImage(index)}>X</p>
                    <img onClick={() => setSelectedImage(image)} src={"data:image/.webp;base64," + image} alt="images" className={`h-32 w-32 object-contain cursor-pointer ${selectedImage === image ? "border-4 border-acid" : null}`} />
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
        <img src="/lab-bottom.png" className="w-full" />
      </main>
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
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

type TechnologyCardProps = {
  name: string;
  description: string;
  documentation: string;
};


