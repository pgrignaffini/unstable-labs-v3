import { type NextPage } from "next";
import Head from "next/head";
import ResultGrid from "@components/ResultGrid";
import Link from "next/link";
import Airdrop from "@components/Airdrop";
import Prompt from "@components/Prompt";
import { useLoadingImages } from "@hooks/useLoadingImages";
import SelectedImages from "@components/SelectedImages";
import SoundButton from "@components/SoundButton";

const Home: NextPage = () => {
  const { images } = useLoadingImages();

  return (
    <>
      <Head>
        <title>UnstableLabs</title>
        <meta name="description" content="" />
        <link rel="icon" href="/flask.png" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-evenly space-y-10 p-4 lg:justify-center">
        <div className="relative w-full">
          <img src="/lab-top.png" alt="lab-top" className="w-full" />
          <div className="w-full bg-black lg:absolute lg:bottom-1/2 ">
            <p className="text-center text-lg text-white lg:text-3xl">
              Welcome to <span className="text-acid">Unstable</span>Labs!
            </p>
            <p className="text-center text-sm text-std lg:text-lg">
              a lab to brew AI-generated NFTs
            </p>
          </div>
          <p className="absolute top-0 right-2 text-[0.5rem] text-white lg:bottom-2">
            artwork by{" "}
            <Link
              className="text-acid underline"
              href="https://www.pixilart.com/w0ah"
              target="_blank"
            >
              w0ah
            </Link>
          </p>
          <SoundButton className="absolute top-4 left-2 hidden md:inline" />
        </div>
        <div className="flex flex-col items-center justify-center ">
          <p className="text-lg font-bold text-white lg:text-3xl">
            Step into the Lab!
          </p>
          <p className="text-[0.4rem] text-std lg:text-[0.6rem] ">
            Don&apos;t know where to find some Mumbai MATIC? Check out{" "}
            <Link
              href="https://mumbaifaucet.com/"
              target="_blank"
              className="text-acid underline"
            >
              here
            </Link>
          </p>
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
          <div className="absolute bottom-1/3 w-full p-4 ">
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
