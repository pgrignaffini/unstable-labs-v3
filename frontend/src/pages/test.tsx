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
import Modal from "@components/Modal";
import HamburgerButton from "@components/HamburgerButton";
import { usePapers } from "@hooks/usePapers";
import { useSession } from "next-auth/react";
import Paper from "@components/Paper";
import NewPaper from "@components/NewPaper";
import { useSingleExperiment } from "@hooks/useSingleExperiment";
import PlayBgSoundButton from "@components/SoundButton";

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
            <main className="container mx-auto min-h-screen flex flex-col items-center justify-center p-4">
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
                <PlayBgSoundButton />
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


