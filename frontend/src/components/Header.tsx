import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { ConnectKitButton } from "connectkit";
import { useState } from "react";
import Modal from "@components/Modal";
import HamburgerButton from "@components/HamburgerButton";
// import { NovuProvider } from "@novu/notification-center";
// import Notifications from "@components/Notifications";

function Header() {
  const { data: session } = useSession();
  const { isConnected } = useAccount();
  const { asPath } = useRouter();
  const [showModal, setShowModal] = useState(false);

  const logOutModal = (
    <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
      <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
        <img src={session?.user?.image as string} className="h-auto w-auto" />
        <p className="text-md text-center">
          Logged in as: {session?.user?.name}
        </p>
        <button
          className="bg-acid p-2 text-white hover:bg-dark-acid"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </Modal>
  );

  return (
    <>
      {logOutModal}
      <div className="flex items-center justify-between py-2 px-4 lg:items-end lg:py-4 lg:px-8">
        <Link href="/" className="hidden md:inline">
          <div className="group relative flex cursor-pointer items-end">
            <p className="absolute inset-x-auto border bg-red-500 text-[0.4rem] text-white lg:top-4 lg:right-7 lg:px-1 lg:text-[0.5rem]">
              beta
            </p>
            <p className="hidden text-sm text-acid lg:inline lg:text-lg xl:text-xl 2xl:text-3xl">
              {" "}
              Unstable<span className="text-white">Labs</span>
            </p>
            <div className="group-hover:animate-tremble">
              <img src="/flask.png" alt="flask" className="w-10" />
            </div>
          </div>
        </Link>
        <div className="md:hidden">
          <HamburgerButton />
        </div>
        {asPath === "/brewery" ? (
          <Link
            className="xl:text-md hidden cursor-pointer items-center space-x-1 border-acid text-[0.5rem] text-white hover:border-b-2 sm:text-sm md:inline-flex 2xl:text-lg "
            href="/"
          >
            <div className="flex items-start space-x-2">
              <p>Lab</p>
              <img src="pc-animated-left.gif" alt="pc" className="w-6" />
            </div>
          </Link>
        ) : (
          <Link
            className="xl:text-md hidden cursor-pointer border-acid text-[0.5rem] text-white hover:border-b-2 sm:text-sm md:inline-flex 2xl:text-lg "
            href="/brewery"
          >
            <div className="flex items-start space-x-2">
              <p>Brewery</p>
              <img src="brewery-animated.gif" alt="brewery" className="w-6" />
            </div>
          </Link>
        )}
        <Link
          className="xl:text-md hidden cursor-pointer border-acid text-[0.5rem] text-white hover:border-b-2 sm:text-sm md:inline-flex 2xl:text-lg "
          href="/library"
        >
          <div className="flex items-center space-x-2">
            <p>Library</p>
            <img src="book-animated.gif" alt="book" className="w-8" />
          </div>
        </Link>
        {isConnected && !session && (
          <p
            className="xl:text-md hidden cursor-pointer border-acid text-[0.5rem] text-white hover:border-b-2 sm:text-sm md:inline 2xl:text-lg"
            onClick={() => signIn("discord")}
          >
            Log in
          </p>
        )}
        {session && (
          <div className="hidden items-center space-x-4 md:inline-flex lg:items-end">
            {/* <NovuProvider subscriberId={session?.user?.id} applicationIdentifier={process.env.NEXT_PUBLIC_APP_ID}>
                            <Notifications /> */}
            <img
              onClick={() => setShowModal(true)}
              src={session?.user?.image as string}
              className="h-8 w-8 cursor-pointer"
            />
            {/* </NovuProvider> */}
          </div>
        )}
        <ConnectKitButton showAvatar={false} />
      </div>
    </>
  );
}

export default Header;
