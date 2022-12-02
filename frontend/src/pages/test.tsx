import { type NextPage } from "next";
import Head from "next/head";
import ResultGrid from "@components/ResultGrid";
import MintExperimentButton from "@components/MintExperimentButton";
import Link from "next/link";
import Airdrop from "@components/Airdrop";
import Prompt from "@components/Prompt";
import { useLoadingImages } from "@hooks/useLoadingImages";
import SelectedImages from "@components/SelectedImages";
import { useEffect, useState } from "react";
import PlayBackgroundMusic from "@components/PlayBackgroundMusic";
import Modal from "@components/Modal";
import HamburgerButton from "@components/HamburgerButton";
import { usePapers } from "@hooks/usePapers";
import { useSession } from "next-auth/react";
import Paper from "@components/Paper";
import NewPaper from "@components/NewPaper";
import { useSingleExperiment } from "@hooks/useSingleExperiment";

const Test: NextPage = () => {

    const { images } = useLoadingImages()
    const [clicked, setClicked] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const { allPapers } = usePapers()

    const { experiment } = useSingleExperiment(1)

    useEffect(() => {
        if (clicked) {
            setTimeout(() => {
                setClicked(false)
            }, 500)
        }
    }, [clicked])

    return (
        <>
            <Head>
                <title>UnstableLabs</title>
                <meta name="description" content="" />
                <link rel="icon" href="/flask.png" />
            </Head>
            <main className="container mx-auto min-h-screen flex-col items-center justify-center p-4 grid grid-cols-1 bg-slate-300">
                {/* <img src="/ramen.png" alt="ramen"
                    classNameName={`w-24 cursor-pointer ${clicked ? "transform scale-125 animate-tremble" : ""}`}
                    onClick={() => setClicked(!clicked)} /> */}
                {/* <button classNameName="bg-slate-900 text-white p-2 rounded"
                    onClick={() => setShowModal(true)}>Open Modal</button>
                <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                    <NewPaper tokenId={1} />
                </Modal> */}
                {/* <HamburgerButton /> */}
                {/* <div classNameName="w-1/2 space-y-10">
                    {allPapers?.map(paper => (
                        <Paper paper={paper} key={paper.id} />
                    ))}
                </div> */}
                {/* <div classNameName={`h-48 w-48 bg-red-500 transition-all duration-500 ${showModal && " scale-y-150"}  col-span-1 `}
                    onClick={(prev) => setShowModal(!prev)}>

                </div> */}

                <div className="flex flex-col w-56">
                    <button className="group border-t border-r border-l border-black focus:outline-none">
                        <div className="flex items-center justify-between h-12 px-3 font-semibold hover:bg-gray-200">
                            <span className="truncate">Heading One</span>
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div className="max-h-0 overflow-hidden duration-300 group-focus:max-h-96">
                            <a className="flex items-center h-8 px-4 text-sm hover:bg-gray-200" href="#">Item A</a>
                            <a className="flex items-center h-8 px-4 text-sm hover:bg-gray-200" href="#">Item B</a>
                            <a className="flex items-center h-8 px-4 text-sm hover:bg-gray-200" href="#">Item C</a>
                        </div>
                    </button>
                    <button className="group border-t border-r border-l border-black focus:outline-none">
                        <div className="flex items-center justify-between h-12 px-3 font-semibold hover:bg-gray-200">
                            <span className="truncate">Heading One</span>
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div className="max-h-0 overflow-hidden duration-300 group-focus:max-h-96">
                            <a className="flex items-center h-8 px-4 text-sm hover:bg-gray-200" href="#">Item A</a>
                            <a className="flex items-center h-8 px-4 text-sm hover:bg-gray-200" href="#">Item B</a>
                            <a className="flex items-center h-8 px-4 text-sm hover:bg-gray-200" href="#">Item C</a>
                        </div>
                    </button>
                    <button className="group border-t border-r border-l border-black focus:outline-none">
                        <div className="flex items-center justify-between h-12 px-3 font-semibold hover:bg-gray-200">
                            <span className="truncate">Heading One</span>
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div className="max-h-0 overflow-hidden duration-300 group-focus:max-h-96">
                            <a className="flex items-center h-8 px-4 text-sm hover:bg-gray-200" href="#">Item A</a>
                            <a className="flex items-center h-8 px-4 text-sm hover:bg-gray-200" href="#">Item B</a>
                            <a className="flex items-center h-8 px-4 text-sm hover:bg-gray-200" href="#">Item C</a>
                        </div>
                    </button>
                    <button className="group border-t border-r border-l border-black focus:outline-none">
                        <div className="flex items-center justify-between h-12 px-3 font-semibold hover:bg-gray-200">
                            <span className="truncate">Heading One</span>
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div className="max-h-0 overflow-hidden duration-300 group-focus:max-h-96">
                            <a className="flex items-center h-8 px-4 text-sm hover:bg-gray-200" href="#">Item A</a>
                            <a className="flex items-center h-8 px-4 text-sm hover:bg-gray-200" href="#">Item B</a>
                            <a className="flex items-center h-8 px-4 text-sm hover:bg-gray-200" href="#">Item C</a>
                        </div>
                    </button>
                </div>
            </main>
        </>
    );
};

export default Test;

// const AuthShowcase: FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined },
//   );

//   return (
//     <div classNameName="flex flex-col items-center justify-center gap-2">
//       {sessionData && (
//         <p classNameName="text-2xl text-blue-500">
//           Logged in as {sessionData?.user?.name}
//         </p>
//       )}
//       {secretMessage && (
//         <p classNameName="text-2xl text-blue-500">{secretMessage}</p>
//       )}
//       <button
//         classNameName="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
//         onClick={sessionData ? () => signOut() : () => signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };


