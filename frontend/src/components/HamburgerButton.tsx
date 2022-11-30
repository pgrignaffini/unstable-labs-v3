import { useState } from 'react'
import Modal from './Modal';
import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from "next-auth/react";

function HamburgerButton() {

    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();
    const { isConnected } = useAccount();
    const { asPath } = useRouter()
    const genericHamburgerLine = `h-1 w-6 my-1 bg-acid transition ease transform duration-300`;

    const menuModal = (
        <Modal isVisible={isOpen} onClose={() => setIsOpen(false)}>
            <div className="flex flex-col items-center justify-center space-y-4 w-full h-full">
                <Link href='/'>
                    <div className="flex items-end cursor-pointer group relative">
                        <p className='absolute -bottom-1 right-4 bg-red-500 border text-white text-[0.4rem]'>beta</p>
                        <p className='text-xl text-acid'> Unstable<span className="text-white">Labs</span></p>
                        <div className="group-hover:animate-tremble">
                            <img src="/flask.png" alt="flask" className="w-6" />
                        </div>
                    </div>
                </Link>
                {asPath === "/brewery" ?
                    <Link onClick={() => setIsOpen(false)} className='text-lg  text-white' href="/">
                        <div className='space-x-4 flex items-center border-2 border-acid p-2'>
                            <p >Go to Lab</p>
                            <img src="pc-animated-left.gif" alt="pc" className="w-6" />
                        </div>
                    </Link> :
                    <Link onClick={() => setIsOpen(false)} className='text-lg text-white' href="/brewery">
                        <div className='space-x-4 flex items-center border-2 border-acid p-2'>
                            <p >Go to Brewery</p>
                            <img src="brewery-animated.gif" alt="brewery" className="w-6" />
                        </div>
                    </Link>}
                {isConnected && !session &&
                    <button className="bg-acid hover:bg-dark-acid text-white p-2"
                        onClick={() => signIn()}>Log in</button>}
                {session &&
                    (<>
                        <img src={session?.user?.image as string} className="w-auto h-auto" />
                        <p className='text-md text-center'>Logged in as: {session?.user?.name}</p>
                        <button className="bg-acid hover:bg-dark-acid text-white p-2"
                            onClick={() => signOut()}>Logout</button>
                    </>)}
            </div>
        </Modal>
    )

    return (
        <>
            {menuModal}
            <button
                className="flex flex-col h-10 w-10 border-2 border-acid justify-center items-center group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div
                    className={`${genericHamburgerLine} ${isOpen
                        ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
                        : "opacity-50 group-hover:opacity-100"
                        }`}
                />
                <div
                    className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
                        }`}
                />
                <div
                    className={`${genericHamburgerLine} ${isOpen
                        ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                        : "opacity-50 group-hover:opacity-100"
                        }`}
                />
            </button>
        </>
    );
}

export default HamburgerButton