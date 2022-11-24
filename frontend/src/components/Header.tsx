import Link from 'next/link'
import ConnectWallet from '@components/ConnectWallet'
import { signIn, signOut, useSession } from "next-auth/react";
import { useAccount } from 'wagmi'

function Header() {

    const { data: session } = useSession();
    const { isConnected, address } = useAccount();

    return (
        <div className='flex justify-between items-end py-4 px-8 '>
            <div className="flex items-end cursor-pointer group relative">
                <p className='absolute top-4 right-7 bg-red-500 border text-white text-[0.5rem] px-1'>beta</p>
                <Link href="/">
                    <p className='text-sm lg:text-lg xl:text-xl 2xl:text-3xl text-acid'> Unstable<span className="text-white">Labs</span></p>
                </Link>
                <div className="group-hover:animate-tremble">
                    <img src="/flask.png" alt="flask" className="w-10" />
                </div>
            </div>
            <Link className='text-sm xl:text-md 2xl:text-lg text-white cursor-pointer border-acid hover:border-b-2' href="/collections">
                Lab Collections
            </Link>
            {isConnected && address && !session &&
                <p className="text-white cursor-pointer text-sm xl:text-md 2xl:text-lg border-acid hover:border-b-2" onClick={() => signIn("discord")}>
                    Log in
                </p>}
            {session &&
                (<div className="flex space-x-8 items-end">
                    <button className="text-white cursor-pointer text-sm xl:text-md 2xl:text-lg border-acid hover:border-b-2" onClick={() => signOut()}>
                        <p>Log out</p>
                    </button>
                    <img src={session?.user?.image as string} className="w-8 h-8" />
                </div>)}
            <ConnectWallet />
        </div>
    )
}

export default Header