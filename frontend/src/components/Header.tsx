import Link from 'next/link'
import ConnectWallet from '@components/ConnectWallet'
import { signIn, signOut, useSession } from "next-auth/react";
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router';
import { ConnectKitButton } from 'connectkit';

function Header() {

    const { data: session } = useSession();
    const { isConnected } = useAccount();
    const { asPath } = useRouter()

    console.log("asPath", asPath)

    return (
        <div className='flex justify-between items-center lg:items-end py-2 lg:py-4 px-4 lg:px-8'>
            <div className="flex items-end cursor-pointer group relative">
                <p className='absolute inset-x-auto lg:top-4 lg:right-7 bg-red-500 border text-white text-[0.4rem] lg:text-[0.5rem] lg:px-1'>beta</p>
                <p className='hidden lg:inline text-sm lg:text-lg xl:text-xl 2xl:text-3xl text-acid'> Unstable<span className="text-white">Labs</span></p>
                <div className="group-hover:animate-tremble">
                    <img src="/flask.png" alt="flask" className="w-10" />
                </div>
            </div>
            {asPath === "/brewery" ?
                <Link className='text-[0.5rem] flex space-x-1 items-center sm:text-sm xl:text-md 2xl:text-lg text-white cursor-pointer border-acid hover:border-b-2 ' href="/">
                    <p>Lab</p>
                </Link> : <Link className='text-[0.5rem] sm:text-sm xl:text-md 2xl:text-lg text-white cursor-pointer border-acid hover:border-b-2 ' href="/collections">
                    Brewery
                </Link>}
            {isConnected && !session &&
                <p className="text-white cursor-pointer text-[0.5rem] sm:text-sm xl:text-md 2xl:text-lg border-acid hover:border-b-2" onClick={() => signIn("discord")}>
                    Log in
                </p>}
            {session &&
                (<div className="flex space-x-4 lg:items-end">
                    <button className="text-white cursor-pointer text-[0.5rem] sm:text-sm xl:text-md 2xl:text-lg border-acid hover:border-b-2" onClick={() => signOut()}>
                        <p>Log out</p>
                    </button>
                    <img src={session?.user?.image as string} className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>)}
            <ConnectKitButton />
        </div>
    )
}

export default Header