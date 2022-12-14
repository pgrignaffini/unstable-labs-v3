import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react";
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router';
import { ConnectKitButton, } from 'connectkit';
import { useState } from 'react'
import Modal from '@components/Modal';
import HamburgerButton from '@components/HamburgerButton';

function Header() {

    const { data: session } = useSession();
    const { isConnected } = useAccount();
    const { asPath } = useRouter()
    const [showModal, setShowModal] = useState(false)

    const logOutModal = (
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
            <div className="flex flex-col items-center justify-center space-y-4 w-full h-full">
                <img src={session?.user?.image as string} className="w-auto h-auto" />
                <p className='text-md text-center'>Logged in as: {session?.user?.name}</p>
                <button className="bg-acid hover:bg-dark-acid text-white p-2"
                    onClick={() => signOut()}>Logout</button>
            </div>
        </Modal>
    )

    return (
        <>
            {logOutModal}
            <div className='flex justify-between items-center lg:items-end py-2 lg:py-4 px-4 lg:px-8'>
                <Link href='/' className='hidden md:inline'>
                    <div className="flex items-end cursor-pointer group relative">
                        <p className='absolute inset-x-auto lg:top-4 lg:right-7 bg-red-500 border text-white text-[0.4rem] lg:text-[0.5rem] lg:px-1'>beta</p>
                        <p className='hidden lg:inline text-sm lg:text-lg xl:text-xl 2xl:text-3xl text-acid'> Unstable<span className="text-white">Labs</span></p>
                        <div className="group-hover:animate-tremble">
                            <img src="/flask.png" alt="flask" className="w-10" />
                        </div>
                    </div>
                </Link>
                <div className='md:hidden'>
                    <HamburgerButton />
                </div>
                {asPath === "/brewery" ?
                    <Link className='hidden md:inline-flex text-[0.5rem] space-x-1 items-center sm:text-sm xl:text-md 2xl:text-lg text-white cursor-pointer border-acid hover:border-b-2 ' href="/">
                        <div className='space-x-2 flex items-start'>
                            <p>Lab</p>
                            <img src="pc-animated-left.gif" alt="pc" className="w-6" />
                        </div>
                    </Link> : <Link className='hidden md:inline-flex text-[0.5rem] sm:text-sm xl:text-md 2xl:text-lg text-white cursor-pointer border-acid hover:border-b-2 ' href="/brewery">
                        <div className='space-x-2 flex items-start'>
                            <p>Brewery</p>
                            <img src="brewery-animated.gif" alt="brewery" className="w-6" />
                        </div>
                    </Link>}
                <Link className='hidden md:inline-flex text-[0.5rem] sm:text-sm xl:text-md 2xl:text-lg text-white cursor-pointer border-acid hover:border-b-2 ' href="/library">
                    <div className='space-x-2 flex items-center'>
                        <p>Library</p>
                        <img src="book-animated.gif" alt="book" className="w-8" />
                    </div>
                </Link>
                {isConnected && !session &&
                    <p className="hidden md:inline text-white cursor-pointer text-[0.5rem] sm:text-sm xl:text-md 2xl:text-lg border-acid hover:border-b-2" onClick={() => signIn("discord")}>
                        Log in
                    </p>}
                {session &&
                    (<div className="hidden md:inline-flex space-x-4 items-center lg:items-end">
                        <button className="text-white cursor-pointer text-[0.5rem] sm:text-sm xl:text-md 2xl:text-lg border-acid hover:border-b-2" onClick={() => signOut()}>
                            <p>Log out</p>
                        </button>
                        <img onClick={() => setShowModal(true)} src={session?.user?.image as string} className="w-8 h-8 cursor-pointer" />
                    </div>)}
                <div className='w-min bg-blue-500'>
                    <ConnectKitButton showAvatar={false} />
                </div>
            </div>
        </>
    )
}

export default Header