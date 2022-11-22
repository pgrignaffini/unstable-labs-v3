import { type NextPage } from "next";
import Head from "next/head";
import ResultGrid from "@components/ResultGrid";
import Link from "next/link";
import Airdrop from "@components/Airdrop";
import Prompt from "@components/Prompt";
import { useLoadingImages } from "@hooks/useLoadingImages";
import SelectedImages from "@components/SelectedImages";

const Home: NextPage = () => {

  const { images } = useLoadingImages()

  return (
    <>
      <Head>
        <title>UnstableLabs</title>
        <meta name="description" content="" />
        <link rel="icon" href="/flask.png" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center space-y-10 justify-center p-4">
        <div className="relative w-full">
          <img src="/lab-top.png" alt="lab-top" className="w-full" />
          <div className="w-full absolute bg-black bottom-1/2 ">
            <p className="font-bold text-3xl text-white text-center">Welcome to <span className="text-acid">Unstable</span>Labs!</p>
            <p className="font-bold text-lg text-std text-center">a lab to brew AI-generated NFTs</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center ">
          <p className="font-bold text-3xl text-white">Step into the Lab!</p>
          <p className="text-std text-[0.6rem] ">Don&apos;t know where to find some Aurora ETH? Check out <Link href="https://aurora.dev/faucet" target="_blank" className="underline text-acid">here</Link></p>
        </div>
        <div className="container mx-auto">
          <Prompt />
        </div>
        <div className="container mx-auto">
          <SelectedImages />
        </div>
        <div className="container mx-auto">
          {images ? <ResultGrid images={images} /> : null}
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


