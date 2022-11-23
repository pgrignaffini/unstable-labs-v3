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

const Test: NextPage = () => {

    const { images } = useLoadingImages()
    const [clicked, setClicked] = useState(false)

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
            <main className="container mx-auto flex min-h-screen flex-col items-center space-y-10 justify-center p-4">
                <img src="/ramen.png" alt="ramen"
                    className={`w-24 cursor-pointer ${clicked ? "transform scale-125 animate-tremble" : ""}`}
                    onClick={() => setClicked(!clicked)} />
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


